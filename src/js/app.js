const config = {
  width: 1500,
  height: 600,
  type: Phaser.AUTO,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { x: 20 },
    },
  },
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
};
var game = new Phaser.Game(config);
let dude;
let cursors;
let qzsd;

function preload() {
  this.load.image("wall-e", "images/wall-e.png");
  this.load.image("background", "images/space.jpg"); // Charger l'image de fond
  this.load.image("obstacle", "images/petitgarfield.png");
}

function create() {
  this.add.image(0, 0, "background").setOrigin(0, 0); // Ajouter l'image de fond
  dude = this.physics.add.image(150, 50, "wall-e");
  garfi = this.physics.add.image(200, 200, "obstacle");
  dude.body.collideWorldBounds = true;
  cursors = this.input.keyboard.createCursorKeys();
  qzsd = this.input.keyboard.addKeys("Q,Z,S,D");
}

function update() {
  if (cursors.left.isDown) {
    dude.setVelocityX(-700);
  } else if (cursors.right.isDown) {
    dude.setVelocityX(700);
  } else if (cursors.up.isDown) {
    dude.setVelocityY(-360);
  } else if (cursors.down.isDown) {
    dude.setVelocityY(360);
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
}
