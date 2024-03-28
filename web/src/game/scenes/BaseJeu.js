export function drawSensors(
  sensor1Active,
  sensor2Active,
  graphics,
  sensor1,
  sensor2
) {
  graphics.clear();
  // Dessin des capteurs seulement si leur variable active est true
  if (sensor1Active) {
    graphics.strokeLineShape(sensor1);
  }
  if (sensor2Active) {
    graphics.strokeLineShape(sensor2);
  }
}

export function moveRobot(input, robot) {
  // Rotation du robot
  let keyK = input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.K);
  let keyL = input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.L);

  if (keyK.isDown) {
    // Si la touche 'K' est enfoncée, faites tourner le robot vers la gauche
    robot.angle -= 10;
  }
  if (keyL.isDown) {
    // Si la touche 'L' est enfoncée, faites tourner le robot vers la droite
    robot.angle += 10;
  }
}

export function updateSensors(
  sensor1Active,
  sensor1,
  sensor2Active,
  sensor2,
  robot,
  defaultangleGauche,
  defaultangleDroit,
  longueurSensor1,
  longueurSensor2
) {
  let angle1 = Phaser.Math.DegToRad(robot.angle - defaultangleGauche);
  let angle2 = Phaser.Math.DegToRad(robot.angle + defaultangleDroit);

  if (sensor1Active) {
    Phaser.Geom.Line.SetToAngle(
      sensor1,
      robot.x,
      robot.y,
      angle1,
      longueurSensor1
    );
  }
  if (sensor2Active) {
    Phaser.Geom.Line.SetToAngle(
      sensor2,
      robot.x,
      robot.y,
      angle2,
      longueurSensor2
    );
  }
}

