const config = {
    width: 1500,
    height: 600,
    type: Phaser.AUTO,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { x: 0 },
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }

}

var game = new Phaser.Game(config);
let walle;
let cursors;
let qzsd;
let hitSound;

function preload() {
    this.load.image('wall-e', 'images/wall-e.png');
    this.load.image('background', 'images/space.jpg');
    this.load.image('obstacle', 'images/petitgarfield.png');
    this.load.image('obstacle2', 'images/chad.jpg');
    this.load.image('asteroid', 'images/asteroid.png');
    this.load.audio('hit', 'images/boum.mp3');
}

function create() {

    hitSound = this.sound.add('hit');

    this.add.image(0, 0, 'background').setOrigin(0, 0);
    walle = this.physics.add.image(150, 50, 'wall-e');
    garfi = this.physics.add.image(300, 200, 'obstacle');
    obstacle2 = this.physics.add.staticImage(800, 500, 'obstacle2');
    walle.body.collideWorldBounds = true;
    garfi.body.collideWorldBounds = true;

    asteroid = this.physics.add.image(Phaser.Math.Between(0, 800), Phaser.Math.Between(0, 600), 'asteroid');
    asteroid.setVelocity(Phaser.Math.Between(-100, 100), Phaser.Math.Between(-100, 100));
    asteroid.setBounce(1, 1);
    asteroid.setCollideWorldBounds(true);

    cursors = this.input.keyboard.createCursorKeys();
    qzsd = this.input.keyboard.addKeys('Q,Z,S,D');

    this.physics.add.collider(walle, garfi);
    this.physics.add.collider(walle, obstacle2);
    this.physics.add.collider(garfi, obstacle2);

    this.physics.add.collider(garfi, asteroid);
    this.physics.add.collider(obstacle2, asteroid);

    this.physics.add.collider(walle, garfi, function () {
        hitSound.play();
    });

    this.physics.add.collider(walle, asteroid, function () {
        walle.setTint(0xff0000);
        setTimeout(function () {
            walle.clearTint();
        }, 200);
        
    });
}

function update() {
    if (cursors.left.isDown) {
        walle.setVelocityX(-700);
    } else if (cursors.right.isDown) {
        walle.setVelocityX(700);
    } else if (cursors.up.isDown) {
        walle.setVelocityY(-360);
    } else if (cursors.down.isDown) {
        walle.setVelocityY(360);
    }

    if (qzsd.Q.isDown) {
        garfi.setVelocityX(-700);
    } else if (qzsd.D.isDown) {
        garfi.setVelocityX(700);
    } else if (qzsd.Z.isDown) {
        garfi.setVelocityY(-360);
    } else if (qzsd.S.isDown) {
        garfi.setVelocityY(360);
    }

    if (Phaser.Geom.Intersects.RectangleToRectangle(walle.getBounds(), asteroid.getBounds())) {
        asteroid.setVelocity(Phaser.Math.Between(-100, 100), Phaser.Math.Between(-100, 100));
    }
}
