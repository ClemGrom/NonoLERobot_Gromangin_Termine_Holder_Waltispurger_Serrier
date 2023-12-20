const config = {
  width: 1500,
  height: 600,
  type: Phaser.AUTO,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { x: 0 },
    },
  },
  wallephysics: {
    default: "arcade",
    arcade: {
      gravity: { x: 0 },
    },
  },
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
};

var game = new Phaser.Game(config);
let walle;
let garfi;
let cursors;
let qzsd;
let hitSound;
let asteroid;
let background;
let obstacle2;

function preload() {
  this.load.image("fusee", "images/fusee.png");
  this.load.image("background", "images/space.jpg");
  this.load.image("obstacle", "images/petitgarfield.png");
  this.load.image("obstacle2", "images/asteroid.png");
  this.load.image("asteroid", "images/asteroid.png");
  this.load.audio("hit", "images/boum.mp3");
}

function create() {
  hitSound = this.sound.add("hit");
  background = this.add
    .tileSprite(0, 0, config.width, config.height, "background")
    .setOrigin(0, 0);

  walle = this.physics.add.image(50, 350, "fusee");
  garfi = this.physics.add.image(300, 200, "obstacle");
  walle.body.collideWorldBounds = true;
  garfi.body.collideWorldBounds = true;

  asteroid = this.physics.add.image(
    800, // Position x à la largeur de l'écran
    Phaser.Math.Between(0, 600), // Position y aléatoire
    "asteroid"
);
asteroid.setVelocityX(-100); // Déplace l'obstacle vers la gauche
  asteroid.setVelocity(
    Phaser.Math.Between(-100, 100),
    Phaser.Math.Between(-100, 100)
  );
  asteroid.setBounce(1, 1);
  asteroid.setCollideWorldBounds(true);

  cursors = this.input.keyboard.createCursorKeys();
  qzsd = this.input.keyboard.addKeys("Q,Z,S,D");

  this.physics.add.collider(walle, garfi);

  obstacles = this.physics.add.group({
    key: "obstacle2",
    repeat: 10,
    setXY: { x: 0, y: 0, stepX: 200, stepY: 150 },
  });

  this.physics.add.collider(walle, obstacles, function () {
    walle.setTint(0xff0000);
    setTimeout(function () {
      walle.clearTint();
    }, 200);
  });

  this.physics.add.collider(garfi, obstacles);
  this.physics.add.collider(garfi, asteroid);
  this.physics.add.collider(obstacles, asteroid);

  this.physics.add.collider(walle, garfi, function () {
    hitSound.play();
  });

  this.physics.add.collider(walle, asteroid, function () {
    walle.setTint(0xff0000);
    setTimeout(function () {
      walle.clearTint();
    }, 200);
  });

  obstacles.children.iterate(function (obstacle) {
    obstacle.body.setImmovable(true);
  });


//   walle.setVelocityY(100); // Déplace l'obstacle vers la gauche

}

function update() {
    
//   // Gestion des mouvements de walle
 
//   let direction = new Phaser.Math.Vector2(garfi.x- walle.x, garfi.y - walle.y);
// direction.normalize();
// direction.scale(700); // Vitesse de la fusée
// walle.setVelocity(direction.x, direction.y);

walle.setVelocity(cursors.left.isDown ? -700 : cursors.right.isDown ? 700 : 0, cursors.up.isDown ? -360 : cursors.down.isDown ? 360 : 0);

  // Gestion des mouvements de garfi
  garfi.setVelocity(
    qzsd.Q.isDown ? -700 : qzsd.D.isDown ? 700 : 0,
    qzsd.Z.isDown ? -360 : qzsd.S.isDown ? 360 : 0
  );

  // Gestion des collisions avec l'asteroïde
  if (
    Phaser.Geom.Intersects.RectangleToRectangle(
      walle.getBounds(),
      asteroid.getBounds()
    )
  ) {
    asteroid.setVelocity(
      Phaser.Math.Between(-100, 100),
      Phaser.Math.Between(-100, 100)
    );
  }

  // Fait avancer walle vers la droite

  // Déplacement du fond
  background.tilePositionX += 1;

  // Mise à jour de la position de tous les obstacles
  obstacles.children.iterate(function (obstacle) {
    obstacle.x -= 2;
    if (obstacle.x < 0) {
      obstacle.x = config.width;
      obstacle.y = Phaser.Math.Between(0, config.height);
    } else if (obstacle.x > config.width) {
      obstacle.x = 0;
        obstacle.y = Phaser.Math.Between(0, config.height);
    } else if (obstacle.y < 0) {
      obstacle.y = config.height;
      
    } else if (obstacle.y > config.height) {
      obstacle.y = 0;
    }


    //////IMPORTANT////////

    let distance = Phaser.Math.Distance.Between(
      walle.x,
      walle.y,
      obstacle.x,
      obstacle.y
    );
    if (distance < 100) {
      // Si l'obstacle est proche
      // Fait tourner walle
      if (walle.y < obstacle.y) {
        // Si walle est au-dessus de l'obstacle

        walle.setVelocityY(-50); // Fait descendre walle
      } else {
        // Si walle est en dessous de l'obstacle
        walle.setVelocityY(50); // Fait monter walle
      }
    }
  });
  
}
