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
    let dude;
    let cursors;
    let hitSound;
    let carteDuNiveau;
    let calqueNiveau;
    let isMoving = false;
    // let lasers;
    // let spaceKey;

    function preload() {
        this.load.image('robot', 'images/robot.png');
        this.load.image("tuilesJeu", "images/TileSet.png"); // Chargement des tuiles de jeu
        // this.load.image('laser', 'images/laser.png');
        this.load.tilemapTiledJSON("niveau1", "images/niveau1.json"); // Chargement de la carte
    }

    function create() {
        carteDuNiveau = this.make.tilemap({ key: "niveau1" }); // Charge la carte
        const tileset = carteDuNiveau.addTilesetImage("vaisseau", "tuilesJeu"); // Charge les tuiles de jeu
        calqueNiveau = carteDuNiveau.createLayer("Niveau", tileset); // Crée un calque de niveau
        calqueNiveau.setCollisionByProperty({ estSolide: true }); // Définit les tuiles solides

        dude = this.physics.add.image(145, 176, 'robot');
        dude.body.collideWorldBounds = true;

        this.physics.add.collider(dude, calqueNiveau);

        cursors = this.input.keyboard.createCursorKeys();

        // lasers = this.physics.add.group(); // Création du groupe de lasers

        // spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE); // Ajout de la touche espace
    }

    function update() {
        const speed = 150; // Vitesse de déplacement (en pixels par seconde)
        const tileSize = 32; // Taille de la tuile (en pixels)
        const moveTime = tileSize / (speed / 1000); // Temps nécessaire pour se déplacer d'une tuile (en millisecondes)

        if (!isMoving) {
            if (Phaser.Input.Keyboard.JustDown(cursors.left)) {
                isMoving = true;
                dude.setVelocityX(-speed);
                setTimeout(() => { dude.setVelocityX(0); isMoving = false; }, moveTime);
            }
            else if (Phaser.Input.Keyboard.JustDown(cursors.right)) {
                isMoving = true;
                dude.setVelocityX(speed);
                setTimeout(() => { dude.setVelocityX(0); isMoving = false; }, moveTime);
            }
            else if (Phaser.Input.Keyboard.JustDown(cursors.up)) {
                isMoving = true;
                dude.setVelocityY(-speed);
                setTimeout(() => { dude.setVelocityY(0); isMoving = false; }, moveTime);
            }
            else if (Phaser.Input.Keyboard.JustDown(cursors.down)) {
                isMoving = true;
                dude.setVelocityY(speed);
                setTimeout(() => { dude.setVelocityY(0); isMoving = false; }, moveTime);
            }
        }

        // // FONCTION LASER

        // // Si la touche espace est enfoncée, tire un laser
        // if (Phaser.Input.Keyboard.JustDown(spaceKey)) {
        //     const laser = lasers.create(dude.x, dude.y, 'laser');
        //     laser.setVelocityX(300); // Vitesse du laser
        // }

        // // Supprime les lasers qui sont sortis de l'écran
        // lasers.children.each(function(laser) {
        //     if (laser.x > config.width) {
        //         laser.destroy();
        //     }
        // }, this);
    }