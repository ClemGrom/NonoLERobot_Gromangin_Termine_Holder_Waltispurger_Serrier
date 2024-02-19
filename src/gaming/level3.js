const config = {
    width: 1500,
    height: 600,
    type: Phaser.AUTO,
    physics: {
        default: "arcade",
        arcade: {
            gravity: {x: 0},
        },
    },
    scene: {
        preload: preload,
        create: create,
        update: update,
    },
};

let game = new Phaser.Game(config);
let robot;
let cursors;
let background;
let batterie;
let caisses;
let garfi;
let garfiShpeed = 100;
let gh;
let graphicsSensors
let angle;
let startAngle = -30; // Angle de départ
let angleIncrement = 30; // Incrément d'angle pour chaque capteur

function preload() {
    this.load.image("robot", "images/wall-e.png");
    this.load.image("background", "images/galaxie.jpg");
    this.load.image("asteroide", "images/asteroid.png");
    this.load.image("batterie", "images/petitgarfield.png");
    this.load.image("caisse", "images/chad.jpg");
    this.load.image("garfi", "images/fusee.png");
}

function create() {
    // Background
    background = this.add.image(0, 0, "background");
    background.setOrigin(0, 0);

    // Définit la taille du monde à la taille du background
    this.physics.world.setBounds(0, 0, background.width, background.height);

    // Création des entités

    // Création du robot
    robot = this.physics.add.image(750, 300, "robot");

    // Création des caisses
    caisses = this.physics.add.group({
        key: "caisse",
        repeat: 5,
        setXY: {x: 100, y: 100, stepX: 150},
    });

    // Création de l'objet batterie
    batterie = this.physics.add.image(400, 300, "batterie");

    // Création de la fusée garfi
    garfi = this.physics.add.image(400, 300, "garfi");

    // Création des astéroides
    asteroides = this.physics.add.group({
        key: "asteroide",
        repeat: 5,
        setXY: {x: 400, y: 400, stepX: 150},
    });

    robot.setCollideWorldBounds(true);
    robot.setDepth(1);

    // Caméra
    this.cameras.main.startFollow(robot);
    this.cameras.main.setBounds(0, 0, background.width, background.height);

    // Collisions
    this.physics.add.overlap(robot, batterie, collectBatterie, null, this);
    this.physics.add.collider(robot, caisses, pushCaisse, null, this);
    this.physics.add.collider(caisses, caisses);
    this.physics.add.collider(asteroides, asteroides, null, null, this);

    // Empêche les caisses de sortir du fond
    caisses.children.iterate(function (caisse) {
        caisse.setCollideWorldBounds(true);
    });

    // Crée les entrées de clavier pour Q, Z, S, D
    cursors = this.input.keyboard.addKeys({
        up: Phaser.Input.Keyboard.KeyCodes.Z,
        down: Phaser.Input.Keyboard.KeyCodes.S,
        left: Phaser.Input.Keyboard.KeyCodes.Q,
        right: Phaser.Input.Keyboard.KeyCodes.D,
    });

    // Définit la vitesse maximale de garfi
    this.sensorGraphics = [];

    for (let i = 0; i < 3; i++) {
        // Crée 4 capteurs
        let graphicSensor = this.add.graphics();
        graphicSensor.setDepth(0);
        graphicSensor.lineStyle(1, 0x00ff00);
        this.sensorGraphics.push(graphicSensor);
    }
}

function update() {
    // Fait bouger le robot avec les touches Q, Z, S, D
    robot.setVelocity(0);
    if (cursors.left.isDown) robot.setVelocityX(-500);
    if (cursors.right.isDown) robot.setVelocityX(500);
    if (cursors.up.isDown) robot.setVelocityY(-500);
    if (cursors.down.isDown) robot.setVelocityY(500);

    angle = Phaser.Math.DegToRad(startAngle); // Convertit l'angle de départ en radians

    for (let i = 0; i < this.sensorGraphics.length; i++) {
        let sensorGraphic = this.sensorGraphics[i];
        sensorGraphic.clear();
        sensorGraphic.lineStyle(2, 0x00ff00);
        sensorGraphic.beginPath();
        sensorGraphic.moveTo(robot.x, robot.y);
        sensorGraphic.lineTo(
            robot.x + Math.cos(angle) * 100,
            robot.y + Math.sin(angle) * 100
        );
        sensorGraphic.strokePath();

        // Crée un rayon à partir de la position du robot jusqu'à la fin du capteur
        let ray = new Phaser.Geom.Line(
            robot.x,
            robot.y,
            robot.x + Math.cos(angle) * 100,
            robot.y + Math.sin(angle) * 100
        );

        // Booléen de vérification
        robot.hasCollided = false;
        // Si une caisse est détectée
        caisses.children.iterate(function (caisse) {
            if (Phaser.Geom.Intersects.LineToRectangle(ray, caisse.getBounds())) {
                if (!robot.hasCollided) {
                    console.log("Caisse détectée !");
                    robot.setVelocity(
                        robot.body.velocity.x / 2,
                        robot.body.velocity.y / 2
                    );
                    robot.hasCollided = true;
                }
            }
        });

        // Si un astéroide est détecté
        asteroides.children.iterate(function (asteroide) {
            if (Phaser.Geom.Intersects.LineToRectangle(ray, asteroide.getBounds())) {
                console.log("Asteroide détecté !");
                let position = determinePosition(robot, asteroide);
                if (position === "up" && cursors.up.isDown)
                    robot.setVelocity(robot.body.velocity.x, 0);
                if (position === "down" && cursors.down.isDown)
                    robot.setVelocity(robot.body.velocity.x, 0);
                if (position === "left" && cursors.left.isDown)
                    robot.setVelocity(0, robot.body.velocity.y);
                if (position === "right" && cursors.right.isDown)
                    robot.setVelocity(0, robot.body.velocity.y);
            }
        });

        angle += Phaser.Math.DegToRad(angleIncrement); // Augmente l'angle pour le prochain capteur
    }

    // Fait en sorte que garfi se déplace vers le robot
    this.physics.velocityFromAngle(
        Phaser.Math.Angle.Between(garfi.x, garfi.y, robot.x, robot.y),
        garfiShpeed,
        garfi.body.velocity
    );
}

/**
 * Fait disparaître la batterie et termine la partie
 * @param robot
 * @param batterie
 */
function collectBatterie(robot, batterie) {
    batterie.disableBody(true, true);
    console.log("Partie terminée");
}

/**
 * Pousse la caisse dans la direction de déplacement du robot
 * @param robot
 * @param caisse
 */
function pushCaisse(robot, caisse) {
    let robotDirection = new Phaser.Math.Vector2();
    if (cursors.left.isDown) robotDirection.x = -1;
    if (cursors.right.isDown) robotDirection.x = 1;
    if (cursors.up.isDown) robotDirection.y = -1;
    if (cursors.down.isDown) robotDirection.y = 1;

    caisse.setVelocity(robotDirection.x * 10, robotDirection.y * 10);
    caisse.setVelocity(0, 0);
}

/**
 * Determine la position relative de l'entité par rapport au robot
 * @param robot
 * @param entity
 * @returns {string}
 */
function determinePosition(robot, entity) {
    let x = robot.x - entity.x;
    let y = robot.y - entity.y;
    if (Math.abs(x) > Math.abs(y)) {
        return x > 0 ? "left" : "right";
    } else {
        return y > 0 ? "up" : "down";
    }
}
