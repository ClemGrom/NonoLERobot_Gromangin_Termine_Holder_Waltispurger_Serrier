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
let sensor1, sensor2, midSensor;
let rightsideSensor = new Phaser.Geom.Triangle();
let leftsideSensor = new Phaser.Geom.Triangle();
let graphics;
let stopRobot = false;
let sensor1Active = true;
let sensor2Active = true;
let midSensorActive = false;
let rightsideSensorActive = false;
let leftsideSensorActive = false;
let targetRotation = 0;
let walls = [];

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

  walls.push(new Phaser.Geom.Rectangle(0,0 , 1000, 1000));

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
  midSensor = new Phaser.Geom.Line();
  rightsideSensor = new Phaser.Geom.Triangle.BuildEquilateral(robot.x, robot.y, 100);
leftsideSensor = new Phaser.Geom.Triangle.BuildEquilateral(robot.x, robot.y, 100);
  

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

  // Déplace le robot en fonction des entrées de l'utilisateur
moveRobot(cursors);

// Vérifie si les capteurs du robot intersectent un obstacle
checkSensorIntersections();

// Met à jour la position des capteurs du robot
updateSensors();

// Dessine les capteurs du robot sur l'écran
drawSensors(graphics);

// Met à jour la vitesse du robot en fonction de son orientation et de l'état du drapeau stopRobot
updateRobotVelocity();

}

//########################
//###### Fonctions #######
//########################

function updateSensors() {
  // Mettez à jour la position et l'angle des capteurs
  let angle1 = Phaser.Math.DegToRad(robot.angle - 30);
  let angle2 = Phaser.Math.DegToRad(robot.angle + 30);
  let angleMid = Phaser.Math.DegToRad(robot.angle);
  let angleRight = Phaser.Math.DegToRad(robot.angle - 45);
  let angleLeft = Phaser.Math.DegToRad(robot.angle + 45);

  // Mise à jour des capteurs seulement si leur variable active est true
  if (sensor1Active) {
    //200 à la fin est la longueur du capteur
    Phaser.Geom.Line.SetToAngle(sensor1, robot.x, robot.y, angle1, 150);
  }
  if (sensor2Active) {
    Phaser.Geom.Line.SetToAngle(sensor2, robot.x, robot.y, angle2, 150);
  }
  if (midSensorActive) {
    Phaser.Geom.Line.SetToAngle(midSensor, robot.x, robot.y, angleMid, 100);
  }
  if (rightsideSensorActive) {
    rightsideSensor.setTo(robot.x, robot.y, robot.x + Math.cos(angleRight) * 100, robot.y + Math.sin(angleRight) * 100, robot.x + Math.cos(angleRight - Math.PI / 2) * 100, robot.y + Math.sin(angleRight - Math.PI / 2) * 100);
  }
  if (leftsideSensorActive) {
    leftsideSensor.setTo(robot.x, robot.y, robot.x + Math.cos(angleLeft) * 100, robot.y + Math.sin(angleLeft) * 100, robot.x + Math.cos(angleLeft + Math.PI / 2) * 100, robot.y + Math.sin(angleLeft + Math.PI / 2) * 100);
  }
}

function checkSensorIntersections() {
  stopRobot = false; // Réinitialisez le drapeau à chaque mise à jour
  for (let i = 0; i < asteroid.length; i++) {
    if (sensor1Active && Phaser.Geom.Intersects.LineToRectangle(sensor1, asteroid[i].getBounds())){
      // Si sensor1 intersecte un astéroïde, faites tourner le robot de 45 degrés vers la droite
      targetRotation += 45;
      // Set the flag to stop the robot
      stopRobot = true;
    }
    if (sensor2Active && Phaser.Geom.Intersects.LineToRectangle(sensor2, asteroid[i].getBounds())) {
      // Si sensor2 intersecte un astéroïde, faites tourner le robot de 45 degrés vers la gauche
      targetRotation -= 45;
      // Set the flag to stop the robot
      stopRobot = true;
    }
    if (midSensorActive && Phaser.Geom.Intersects.LineToRectangle(midSensor, asteroid[i].getBounds())){
      // Si midSensor intersecte un astéroïde, arrêtez le robot
      stopRobot = true;
      robot.angle += 180;
    }
    if (rightsideSensorActive && triangleIntersectsRectangle(rightsideSensor, asteroid[i].getBounds())) {
      // Si rightsideSensor intersecte un astéroïde, faites tourner le robot de 10 degrés vers la gauche
      robot.angle -= 10;
      // Set the flag to stop the robot
      stopRobot = true;
    }
    if (leftsideSensorActive && triangleIntersectsRectangle(leftsideSensor, asteroid[i].getBounds())) {
      // Si leftsideSensor intersecte un astéroïde, faites tourner le robot de 10 degrés vers la droite
      robot.angle += 10;
      // Set the flag to stop the robot
      stopRobot = true;
    }
    
  }
}

function drawSensors(graphics) {
  graphics.clear();
  // Dessin des capteurs seulement si leur variable active est true
  if (sensor1Active) {
    graphics.strokeLineShape(sensor1);
  }
  if (sensor2Active) {
    graphics.strokeLineShape(sensor2);
  }
  if (midSensorActive) {
    graphics.strokeLineShape(midSensor);
  }
  if (rightsideSensorActive) {
    graphics.strokeTriangleShape(rightsideSensor);
  }
  if (leftsideSensorActive) {
    graphics.strokeTriangleShape(leftsideSensor);
  }
}

function moveRobot(cursors) {
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
}

function updateRobotVelocity() {
  let vx = 0;
  let vy = 0;
  // Only set the robot's velocity if the stop flag is not set
  if (!stopRobot) {
    // Calculate the velocity components based on the robot's angle
    let angleInRadians = Phaser.Math.DegToRad(robot.angle);
    vx = Math.cos(angleInRadians) * 100;
    vy = Math.sin(angleInRadians) * 100;

    // Update the robot's velocity
    robot.setVelocity(vx, vy);
  } else {
    // Tourner progressivement vers la direction cible
    let currentAngle = Phaser.Math.DegToRad(robot.angle);
    let targetAngle = Phaser.Math.DegToRad(robot.angle + targetRotation);
    let newAngle = lerpAngle(currentAngle, targetAngle, 0.05);

    robot.angle = Phaser.Math.RadToDeg(newAngle);

    // Réinitialiser la direction cible après chaque rotation
    targetRotation = 0;
    robot.setVelocity(0, 0);
  }
}

function lineIntersectsTriangle(line, triangle) {
  let triangleLines = [
    new Phaser.Geom.Line(triangle.x1, triangle.y1, triangle.x2, triangle.y2),
    new Phaser.Geom.Line(triangle.x2, triangle.y2, triangle.x3, triangle.y3),
    new Phaser.Geom.Line(triangle.x3, triangle.y3, triangle.x1, triangle.y1)
  ];

  for (let i = 0; i < triangleLines.length; i++) {
    if (Phaser.Geom.Intersects.LineToLine(line, triangleLines[i])) {
      return true;
    }
  }

  return false;
}

function triangleIntersectsRectangle(triangle, rectangle) {
  let rectangleLines = [
    new Phaser.Geom.Line(rectangle.x, rectangle.y, rectangle.x + rectangle.width, rectangle.y),
    new Phaser.Geom.Line(rectangle.x, rectangle.y, rectangle.x, rectangle.y + rectangle.height),
    new Phaser.Geom.Line(rectangle.x + rectangle.width, rectangle.y, rectangle.x + rectangle.width, rectangle.y + rectangle.height),
    new Phaser.Geom.Line(rectangle.x, rectangle.y + rectangle.height, rectangle.x + rectangle.width, rectangle.y + rectangle.height)
  ];

  for (let i = 0; i < rectangleLines.length; i++) {
    if (lineIntersectsTriangle(rectangleLines[i], triangle)) {
      return true;
    }
  }

  return false;
}
function lerpAngle(a, b, t) {
  let delta = Phaser.Math.Angle.Wrap(b - a);

  // If delta > 180, go the other way instead
  if (delta > Math.PI) delta -= Math.PI * 2;

  return a + delta * t;
}