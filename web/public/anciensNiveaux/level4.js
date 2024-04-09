var config = {
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
    parent: "game-container"
};
new Phaser.Game(config);
var robot;
var cursors;
var background;
var angle;
var startAngle = -30; // Angle de départ
var angleIncrement = 30; // Incrément d'angle pour chaque capteur

function preload() {
    this.load.image("robot", "../assets/wall-e.png");
    this.load.image("background", "../assets/galaxie.jpg");
    this.load.image("asteroide", "../assets/asteroid.png");
}

function create() {
    // Background
    background = this.add.image(0, 0, "background");
    background.setOrigin(0, 0);

    // Définit la taille du monde à la taille du background
    this.physics.world.setBounds(0, 0, background.width, background.height);

    // Création des entités

    // Création du robot
    robot = this.physics.add.image(50, 550, "robot");

    // Création des astéroides
    asteroidesHaut = this.physics.add.group({
        key: "asteroide",
        repeat: 5,
        setXY: {x: 400, y: 300, stepX: 200},
    });

    asteroidesBas = this.physics.add.group({
        key: "asteroide",
        repeat: 5,
        setXY: {x: 300, y: 600, stepX: 200},
    });

    // Collisions du robot avec le monde
    robot.setCollideWorldBounds(true);
    robot.setDepth(1);

    // Caméra
    this.cameras.main.startFollow(robot);
    this.cameras.main.setBounds(0, 0, background.width, background.height);

    // Crée les entrées de clavier pour Q, Z, S, D
    cursors = this.input.keyboard.addKeys({
        up: Phaser.Input.Keyboard.KeyCodes.Z,
        down: Phaser.Input.Keyboard.KeyCodes.S,
        left: Phaser.Input.Keyboard.KeyCodes.Q,
        right: Phaser.Input.Keyboard.KeyCodes.D,
    });

    // Définit la vitesse maximale de garfi
    this.sensorGraphics = [];

    let capteurHaut = this.add.graphics();
    capteurHaut.setDepth(0);
    capteurHaut.lineStyle(1, 0x00ff00);
    this.sensorGraphics.push(capteurHaut);
    let capteurMilieu = this.add.graphics();
    capteurMilieu.setDepth(0);
    capteurMilieu.lineStyle(1, 0x00ff00);
    this.sensorGraphics.push(capteurMilieu);
    let capteurBas = this.add.graphics();
    capteurBas.setDepth(0);
    capteurBas.lineStyle(1, 0x00ff00);
    this.sensorGraphics.push(capteurBas);


    Vl = 250;
    Vr = 250;
    angleInRadians = Phaser.Math.DegToRad(robot.angle);
    vx = Math.cos(angleInRadians) * Vl;
    vy = Math.sin(angleInRadians) * Vr;
}

function update() {
    //Initie le déplacement du robot à chaque frame
    robot.setVelocity(vx, vy);

    // Fait bouger le robot avec les touches Q, Z, S, D
    if (cursors.left.isDown) robot.setVelocityX(-500);
    if (cursors.right.isDown) robot.setVelocityX(500);
    if (cursors.up.isDown) robot.setVelocityY(-500);
    if (cursors.down.isDown) robot.setVelocityY(500);

    angle = Phaser.Math.DegToRad(startAngle); // Convertit l'angle de départ en radians

    // Dessine les capteurs du robot et vérifie les collisions
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
        new Phaser.Geom.Line(
            robot.x,
            robot.y,
            robot.x + Math.cos(angle) * 100,
            robot.y + Math.sin(angle) * 100
        );

        asteroidesHaut.children.iterate(function (asteroide) {
            let data = determineFuturePoint(robot, asteroide, 1, null)
            if ((data != null) && i === data.infos.rayon) moveTo(data, i)
        });

        asteroidesBas.children.iterate(function (asteroide) {
            let data = determineFuturePoint(robot, asteroide, 1, null);
            if ((data != null) && i === data.infos.rayon) moveTo(data, i)
        });

        angle += Phaser.Math.DegToRad(angleIncrement); // Augmente l'angle pour le prochain capteur
    }
}

function determineFuturePoint(robot, asteroide, index, infos) {
    if (infos != null) {
        return {index: index, infos: infos};
    }
    if (index > 3) {
        return null;
    } else {
        let teta = determineAngleFromOrigin(robot);
        let l = robot.width;
        let omega = (this.Vr - this.Vl) / l;
        let ICC2 = {x: asteroide.x, y: asteroide.y};
        let matrice1 = math.matrix([[Math.cos(omega), -Math.sin(omega), 0], [Math.sin(omega), Math.cos(omega), 0], [0, 0, 1]]);
        let matrice2 = math.matrix([robot.x - ICC2.x, robot.y - ICC2.y, teta]);
        let matrice3 = math.matrix([ICC2.x, ICC2.y, omega]);
        let result = math.add(math.multiply(matrice1, matrice2), matrice3);
        let futureRobot = {x: result.get([0]), y: result.get([1])};
        for (let j = 0; j < 3; j++) {
            let Iangle = Phaser.Math.DegToRad(startAngle + 30 * j);
            let ray = new Phaser.Geom.Line(
                futureRobot.x,
                futureRobot.y,
                futureRobot.x + Math.cos(Iangle) * 100,
                futureRobot.y + Math.sin(Iangle) * 100
            );
            if (Phaser.Geom.Intersects.LineToRectangle(ray, asteroide.getBounds())) {
                return determineFuturePoint(futureRobot, asteroide, index, {
                    x: futureRobot.x,
                    y: futureRobot.y,
                    rayon: j
                })
            }
        }
        return determineFuturePoint(futureRobot, asteroide, index + 1, null);

    }
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
    Math.sqrt(x * x + y * y);
    return x > 0 ? "left " : "right " + y > 0 ? "up " : "down";
}

/**
 * Determine l'angle entre le robot et l'origine
 * @param robot :Object les données du robot
 * @returns number
 */
function determineAngleFromOrigin(robot) {
    let x = robot.x;
    let y = robot.y;
    return Math.atan2(y, x);
}

/**
 * Oriente et déplace le robot vers la position donnée
 * @param data :Object  les données de la position future du robot
 * @param i : int l'index du capteur
 */
function moveTo(data, i) {
    if (i === 0) {
        let Nangle = Phaser.Math.DegToRad(-15 * (data.index + 1));
        vx = Math.cos(Nangle) * Vl;
        vy = -Math.sin(Nangle) * Vr;
        robot.angle = Phaser.Math.RadToDeg(-Nangle);
    }
    if (i === 1) {
        let Nangle = Phaser.Math.DegToRad(180);
        vx = -Math.cos(Nangle) * Vl;
        vy = -Math.sin(Nangle) * Vr;
        robot.angle = Phaser.Math.RadToDeg(-Nangle);
    }
    if (i === 2) {
        let Nangle = Phaser.Math.DegToRad(15 * (data.index + 1));
        vx = Math.cos(Nangle) * Vl;
        vy = -Math.sin(Nangle) * Vr;
        robot.angle = Phaser.Math.RadToDeg(-Nangle);
    }
}