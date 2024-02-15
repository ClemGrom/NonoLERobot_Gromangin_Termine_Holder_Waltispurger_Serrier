class Level1 extends Phaser.Scene
{
    constructor(){
        super({key:'Level1'});
        this.robotLife = 100;
    }

    preload() 
    {
        this.load.image('robot', 'images/robot.png');
        this.load.image("tuilesJeu", "images/TileSet.png"); // Chargement des tuiles de jeu
        this.load.image('laser', 'images/laser.png');
        this.load.image('batterie', 'images/batterie.png');
        this.load.tilemapTiledJSON("niveau1", "images/niveau1.json"); // Chargement de la carte
        this.robotLife = 100;
    }

    create() 
    {
        this.carteDuNiveau = this.make.tilemap({ key: "niveau1" });
        const tileset = this.carteDuNiveau.addTilesetImage("vaisseau", "tuilesJeu");
        this.calqueNiveau = this.carteDuNiveau.createLayer("Niveau", tileset);
        this.calqueNiveau.setCollisionByProperty({ estSolide: true });

        this.robot = this.matter.add.image(145, 176, 'robot');
        this.robot.setAngle(-90);
        this.robot.setFrictionAir(0.2);
        this.robot.setMass(10);

        this.matter.world.setBounds(0, 0, 960, 384);

        this.tracker1 = this.add.rectangle(0, 0, 4, 4, 0x00ff00);
        this.tracker2 = this.add.rectangle(0, 0, 4, 4, 0xff0000);

        this.batterie = this.physics.add.image(400, 300, 'batterie');

        this.physics.add.collider(this.robot, this.calqueNiveau);
        this.physics.add.overlap(this.robot, this.batterie, this.collectBatterie, null, this);

        this.cursors = this.input.keyboard.createCursorKeys();

        this.lasers = this.physics.add.group(); // Création du groupe de lasers

        this.robot.setAngle(-90);
        this.robot.setFrictionAir(0.2);
        this.robot.setMass(10);

        this.matter.world.setBounds(0, 0, 800, 600);

        this.tracker1 = this.add.rectangle(0, 0, 4, 4, 0x00ff00);
        this.tracker2 = this.add.rectangle(0, 0, 4, 4, 0xff0000);

        this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE); // Ajout de la touche espace
    }

    update() 
    {
        // Déplacement du robot
        const point1 = this.robot.getTopRight();
        const point2 = this.robot.getBottomRight();

        this.tracker1.setPosition(point1.x, point1.y);
        this.tracker2.setPosition(point2.x, point2.y);
        
        const speed = 0.03;
        const angle = this.vec.angle(point1, point2);
        const force = {x: Math.cos(angle) * speed, y: Math.sin(angle) * speed};
        if (this.cursors.up.isDown)
        {
            this.robot.thrust(0.05);
            this.steer(this.vec.neg(force));
        }
        else if (this.cursors.down.isDown)
        {
            this.robot.thrustBack(0.05);
            this.steer(force);
        }

        // Fin de partie si vie robot à 0
        if (this.robotLife <= 0) {
            this.scene.start('GameOver');
        }

        // Passage au niveau suivant
        if (this.robot.x > 800) {
            this.scene.start('Level2');
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
    }

    steer (force)
    {
        if (this.cursors.left.isDown)
        {
            Phaser.Physics.Matter.Matter.Body.applyForce(this.robot.body, this.robot.getTopRight(), force);
        }
        else if (this.cursors.right.isDown)
        {
            Phaser.Physics.Matter.Matter.Body.applyForce(this.robot.body, this.robot.getBottomRight(), this.vec.neg(force));
        }
    }
}

const config = {
    width:960,
    height:384,
    type: Phaser.AUTO,
    physics:{
        default:'matter',
        matter: {
            debug: false,
            gravity:{
                x:0,
                y:0
            },
        }
    },
    scene:{
        preload:preload,
        create:create,
        update:update
    }
};

const game = new Phaser.Game(config);