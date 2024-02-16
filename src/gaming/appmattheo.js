const config = {
    width:960,
    height:384,
    type: Phaser.AUTO,
    physics:{
        default:'arcade',
        arcade: {
            gravity:{x:0},
        }
    },
    scene:{
        preload:preload,
        create:create,
        update:update
    }
}

var game = new Phaser.Game(config);
let cursors;
let hitSound;
let carteDuNiveau;
let calqueNiveau;
let isMoving = false;
let lasers;
let spaceKey;
let healthBar;
let health = 20;

function preload() {
    this.load.image('robot', 'images/robot.png');
    this.load.image("tuilesJeu", "images/TileSet.png"); // Chargement des tuiles de jeu
    this.load.image('laser', 'images/laser.png');
    this.load.image('batterie', 'images/batterie.png');
    this.load.tilemapTiledJSON("niveau1", "images/niveau1.json"); // Chargement de la carte
}

function create() {
    this.carteDuNiveau = this.make.tilemap({ key: "niveau1" });
    const tileset = this.carteDuNiveau.addTilesetImage("vaisseau", "tuilesJeu");
    this.calqueNiveau = this.carteDuNiveau.createLayer("Niveau", tileset);
    this.calqueNiveau.setCollisionByProperty({ estSolide: true });

    this.robot = this.physics.add.image(145, 176, 'robot');
    this.robot.body.collideWorldBounds = true;

    this.batterie = this.physics.add.image(400, 300, 'batterie');

    this.physics.add.collider(this.robot, this.calqueNiveau);
    this.physics.add.overlap(this.robot, this.batterie, this.collectBatterie, null, this);

    this.cursors = this.input.keyboard.createCursorKeys();

    this.lasers = this.physics.add.group(); // Création du groupe de lasers

    this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE); // Ajout de la touche espace

    healthBar = this.add.graphics(); // Création de la barre de vie
    updateHealthBar();

    this.physics.add.overlap(this.robot, this.batterie, function () {
        this.batterie.destroy();
        health = Math.min(health + 10, 20);
        updateHealthBar();
    }, null, this);
}

function updateHealthBar() {
    healthBar.clear();
    healthBar.fillStyle(0x00ff00);
    healthBar.fillRect(10, 10, health * 5, 20);
}

function update() {
    // Déplacement du robot
    const speed = 150;
    const tileSize = 32;
    const moveTime = tileSize / (speed / 1000);

    if (!this.isMoving) {
        if (Phaser.Input.Keyboard.JustDown(this.cursors.left)) {
            this.isMoving = true;
            this.robot.setVelocityX(-speed);
            setTimeout(() => { this.robot.setVelocityX(0); this.isMoving = false; }, moveTime);
            health -= 1; // Diminution de la vie
            updateHealthBar();
        }
        else if (Phaser.Input.Keyboard.JustDown(this.cursors.right)) {
            this.isMoving = true;
            this.robot.setVelocityX(speed);
            setTimeout(() => { this.robot.setVelocityX(0); this.isMoving = false; }, moveTime);
            health -= 1; // Diminution de la vie
            updateHealthBar();
        }
        else if (Phaser.Input.Keyboard.JustDown(this.cursors.up)) {
            this.isMoving = true;
            this.robot.setVelocityY(-speed);
            setTimeout(() => { this.robot.setVelocityY(0); this.isMoving = false; }, moveTime);
            health -= 1; // Diminution de la vie
            updateHealthBar();
        }
        else if (Phaser.Input.Keyboard.JustDown(this.cursors.down)) {
            this.isMoving = true;
            this.robot.setVelocityY(speed);
            setTimeout(() => { this.robot.setVelocityY(0); this.isMoving = false; }, moveTime);
            health -= 1; // Diminution de la vie
            updateHealthBar();
        }
    }

     // Si la touche espace est enfoncée, tire un laser
     if (Phaser.Input.Keyboard.JustDown(this.spaceKey)) {
        const laser = this.lasers.create(this.robot.x, this.robot.y, 'laser');
        laser.setVelocityX(300); // Vitesse du laser
    }

    // Supprime les lasers qui sont sortis de l'écran
    this.lasers.children.each(function(laser) {
        if (laser.x > config.width) {
            laser.destroy();
        }
    }, this);

    if (health <= 0) {
        this.scene.start('GameOver');
    }

    // Passage au niveau suivant
    if (this.robot.x > 800) {
        this.scene.start('Level2');
    }
}