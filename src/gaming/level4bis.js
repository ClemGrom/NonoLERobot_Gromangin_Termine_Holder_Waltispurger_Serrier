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
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
};

let game = new Phaser.Game(config);
let robot;
let asteroid = [];
let sensor1, sensor2;
let graphics; 
// let walls;



function preload() {
  this.load.image("robot", "images/wall-e.png");
  this.load.image("background", "images/galaxie.jpg");
    this.load.image("asteroide", "images/asteroid.png");

}

function create() {
  // Background
  background = this.add.image(0, 0, "background");
  background.setOrigin(0, 0);

  // Définit la taille du monde à la taille du background
  this.physics.world.setBounds(0, 0, background.width, background.height);

//   // Créez un groupe de murs
//   walls = this.physics.add.staticGroup();

//     // Create walls at the edges of the game world
//     walls.create(0, game.config.height / 2, 'wall').setScale(1, game.config.height).refreshBody();
//     walls.create(game.config.width, game.config.height / 2, 'wall').setScale(1, game.config.height).refreshBody();
//     walls.create(game.config.width / 2, 0, 'wall').setScale(game.config.width, 1).refreshBody();
//     walls.create(game.config.width / 2, game.config.height, 'wall').setScale(game.config.width, 1).refreshBody();

  robot = this.physics.add.image(750, 300, "robot");
  //robot ne peut pas sortir du monde
  robot.setCollideWorldBounds(true);

  //comme un calque le robot est au dessus
  robot.setDepth(1);

  for (let i = 0; i < 5; i++) {
    let newAsteroid = this.physics.add.image(
      Phaser.Math.Between(100, 800), // Position x à la largeur de l'écran
      Phaser.Math.Between(400, 500), // Position y aléatoire
      "asteroide"
    );
    asteroid.push(newAsteroid);
  }

  // Caméra
  this.cameras.main.startFollow(robot);
  this.cameras.main.setBounds(0, 0, background.width, background.height);

   // Créez les capteurs comme des lignes
   sensor1 = new Phaser.Geom.Line();
   sensor2 = new Phaser.Geom.Line();

   // Créez l'objet graphics
  graphics = this.add.graphics({ lineStyle: { width: 2, color: 0x00ff00 } });

  // Crée les entrées de clavier pour Q, Z, S, D
  cursors = this.input.keyboard.addKeys({
    up: Phaser.Input.Keyboard.KeyCodes.Z,
    down: Phaser.Input.Keyboard.KeyCodes.S,
    left: Phaser.Input.Keyboard.KeyCodes.Q,
    right: Phaser.Input.Keyboard.KeyCodes.D,
 k: Phaser.Input.Keyboard.KeyCodes.K,
  l: Phaser.Input.Keyboard.KeyCodes.L,
  
  });

  robot.setVelocityX(100);

}

function update() {
    // Fait bouger le robot avec les touches Q, Z, S, D
  robot.setVelocity(0);
  if (cursors.left.isDown) robot.setVelocityX(-500);
  if (cursors.right.isDown) robot.setVelocityX(500);
  if (cursors.up.isDown) robot.setVelocityY(-500);
  if (cursors.down.isDown) robot.setVelocityY(500);

  if (cursors.k.isDown) {
    // Si la touche 'K' est enfoncée, faites tourner le robot vers la droite
    robot.angle += 10;
  }
  if (cursors.l.isDown) {
    // Si la touche 'L' est enfoncée, faites tourner le robot vers la gauche
    robot.angle -= 10;
  }

   // Calculez les composantes de vitesse en fonction de l'angle du robot
   let angleInRadians = Phaser.Math.DegToRad(robot.angle);
   let vx = Math.cos(angleInRadians) * 100;
   let vy = Math.sin(angleInRadians) * 100;

    // Mettez à jour la position et l'angle des capteurs
  let angle1 = Phaser.Math.DegToRad(robot.angle - 30);
  let angle2 = Phaser.Math.DegToRad(robot.angle + 30);
  Phaser.Geom.Line.SetToAngle(sensor1, robot.x, robot.y, angle1, 200);
  Phaser.Geom.Line.SetToAngle(sensor2, robot.x, robot.y, angle2, 200);

//   // Vérifiez si les capteurs intersectent un mur
//   walls.getChildren().forEach(function(wall) {
//     if (Phaser.Geom.Intersects.LineToRectangle(sensor1, wall.getBounds())) {
//       // Si le capteur 1 intersecte un mur, faites tourner le robot de 30 degrés vers la droite
//       robot.angle += 30;
//     }
//     if (Phaser.Geom.Intersects.LineToRectangle(sensor2, wall.getBounds())) {
//       // Si le capteur 2 intersecte un mur, faites tourner le robot de 30 degrés vers la gauche
//       robot.angle -= 30;
//     }
//   });


// Vérifiez si les capteurs intersectent un astéroïde
for (let i = 0; i < asteroid.length; i++) {
    if (Phaser.Geom.Intersects.LineToRectangle(sensor1, asteroid[i].getBounds())) {
      // If sensor1 intersects the asteroid, rotate the robot 10 degrees to the right
      robot.angle += 10;
    }
    if (Phaser.Geom.Intersects.LineToRectangle(sensor2, asteroid[i].getBounds())) {
      // If sensor2 intersects the asteroid, rotate the robot 10 degrees to the left
      robot.angle -= 10;
    }
  }



  // Dessinez les capteurs pour le débogage
  graphics.clear(); // Ajoutez cette ligne avant de dessiner les capteurs
  graphics.strokeLineShape(sensor1);
  graphics.strokeLineShape(sensor2);
 
   // Mettez à jour la vitesse du robot
   robot.setVelocity(vx, vy);

  

 
}
