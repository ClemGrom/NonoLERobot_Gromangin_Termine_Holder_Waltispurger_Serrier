import { EventBus } from "../EventBus";
import { Scene } from "phaser";

export class Niveau4 extends Scene {
  constructor() {
    super("Niveau4");

    this.frameCount = 0;

    // Initialisez les variables des capteurs à true pour les activer par défaut
    this.sensor1Active = true;
    this.sensor2Active = true;

    this.maxlongueurSensor1 = localStorage.getItem("tailleSensorGauche") || 50;
    this.maxlongueurSensor2 = localStorage.getItem("tailleSensorDroit") || 0;
    this.longueurSensor1 = 0;
    this.longueurSensor2 = 0;

    // Initialisez le drapeau pour arrêter le robot à false
    // this.stopRobot = false;

    // Initialisez la rotation cible du robot
    this.targetRotation = 90;
    this.sensor1 = null;
    this.sensor2 = null;

    this.degresSensorGauche = localStorage.getItem("degresGauche") || 90;
    this.degresSensorDroit = localStorage.getItem("degresDroit") || -90;
    this.degres2SensorsTouche = localStorage.getItem("degres2Touche") || false;
    this.vitesseRobot = 130;
    this.vitesseRobotFantome = 110;

    this.health = 4;

    // this.energy = 100;
    // this.stopEnergy = false;

    this.defaultangleGauche = 45;
    this.defaultangleDroit = 45;

    // Timer
    this.timer = 0;

    // Score
    this.score = 0;
  }

  create() {
    this.carteDuNiveau = this.make.tilemap({ key: "niveau4" });

    // Créer le tileset pour le calque "Niveau"
    const tilesetVaisseau = this.carteDuNiveau.addTilesetImage(
      "vaisseau",
      "tuilesJeu"
    );

    // Créer les calques
    this.calqueNiveau = this.carteDuNiveau.createLayer(
      "Niveau",
      tilesetVaisseau
    );

    // Définir les collisions
    this.calqueNiveau.setCollisionByProperty({ estSolide: true });

    // Création du robot
    this.robot = this.physics.add.image(720, 140, "robot");

    // Création du robot fantôme
    this.robotFantome = this.physics.add.image(720, 80, "robotFantome");

    // Définir l'opacité du robot à 50%
    this.robotFantome.setAlpha(0.7);

    //  this.robot.body.collideWorldBounds = true; <- fait lag

    this.robot.setDepth(1);
    // this.robot.angle += 0; // Ajoutez cette ligne pour augmenter l'angle initial du robot de 10 degrés

    // Définir les limites du monde
    let niveauLargeur = 1300; // Remplacez par la largeur réelle du niveau
    let niveauHauteur = 750; // Remplacez par la hauteur réelle du niveau

    this.cameras.main.startFollow(this.robot);
    this.cameras.main.setBounds(0, 0, niveauLargeur, niveauHauteur); // Définir les limites de la caméra
    this.physics.add.collider(this.robot, this.calqueNiveau);
    this.cursors = this.input.keyboard.createCursorKeys();

    // Création des capteurs
    this.sensor1 = new Phaser.Geom.Line();
    this.sensor2 = new Phaser.Geom.Line();

    // Créez l'objet graphics
    this.graphics = this.add.graphics({
      lineStyle: { width: 2, color: 0x00ff00 },
    });

    // Je crois ça sert à rien mais pas sur
    // this.robot.setVelocityX(this.vitesseRobot);

    this.longueurSensor1 = this.maxlongueurSensor1;
    this.longueurSensor2 = this.maxlongueurSensor2;

    EventBus.emit("current-scene-ready", this);

    // Crée le chemin du Fantome
    this.cheminFantome = [
      { x: 1100, y: 110 },
      { x: 1200, y: 500 },
      { x: 1000, y: 650 },
      { x: 900, y: 620},
      { x: 200, y: 650},
      { x: 150, y: 300},
      { x: 200, y: 150},
      { x: 350, y: 100},
      { x: 550, y: 100}
    ];
    
    this.indexCheminFantome = 0;

    // Crée le texte du timer
    this.TimerText = this.add.text(750, 2, "Timer : 0s", {
      fontSize: "32px",
      fontFamily: "Arial",
      fill: "#ffffff",
      stroke: "#000000",
      strokeThickness: 4,
      shadow: {
        offsetX: 2,
        offsetY: 2,
        color: '#000',
        blur: 2,
        stroke: true,
        fill: true
      }
    });

    // Fixe le texte du timer pour qu'il ne défile pas avec la caméra
    this.TimerText.setScrollFactor(0);
  }

  update() {
    // Définissez la position initiale des capteurs
    this.updateSensors();

    // Déplacement du robot
    this.moveRobot(this.cursors);

    // Vérifiez si les capteurs intersectent les astéroïdes
    this.checkSensorIntersections();

    // Dessine les capteurs du robot sur l'écran
    this.drawSensors(this.graphics);

    // Met à jour la vitesse du robot en fonction de son orientation et de l'état du drapeau stopRobot
    this.updateRobotVelocity();

    // Déplacement du robot fantôme
    this.RobotFantomeCourse();

    this.frameCount++;

    // Met à jour le joueur toutes les 10 frames
    if (this.frameCount % 10 === 0) {
      if (this.longueurSensor1 < this.maxlongueurSensor1) {
        this.longueurSensor1 += 5;
        // console.log(this.longueurSensor1);
      }
      if (this.longueurSensor2 < this.maxlongueurSensor2) {
        this.longueurSensor2 += 5;
        // console.log(this.longueurSensor2);
      }
    }

    // Vérifiez si le robot a atteint la fin du niveau
    if (
      this.robot.x > 450 &&
      this.robot.x < 700 &&
      this.robot.y > 0 &&
      this.robot.y < 300
    ) {
      this.changeScene();
    }

    // Vérifiez si le robot Fantome a atteint la fin du niveau
    if (
      this.robotFantome.x > 450 &&
      this.robotFantome.x < 700 &&
      this.robotFantome.y > 0 &&
      this.robotFantome.y < 300
    ) {
      this.scene.start('GameOver');
    }

    // Met à jour le timer
    this.timer += 1 / 60;
    this.TimerText.setText("Timer : " + Math.floor(this.timer) + "s");
  }

  //########################
  //###### Fonctions #######
  //########################

  updateSensors() {
    // Mettez à jour la position et l'angle des capteurs
    let angle1 = Phaser.Math.DegToRad(
      this.robot.angle - this.defaultangleGauche
    );
    let angle2 = Phaser.Math.DegToRad(
      this.robot.angle + this.defaultangleDroit
    );

    // Mise à jour des capteurs seulement si leur variable active est true
    if (this.sensor1Active) {
      // 200 à la fin est la longueur du capteur
      Phaser.Geom.Line.SetToAngle(
        this.sensor1,
        this.robot.x,
        this.robot.y,
        angle1,
        this.longueurSensor1
      );
    }
    if (this.sensor2Active) {
      Phaser.Geom.Line.SetToAngle(
        this.sensor2,
        this.robot.x,
        this.robot.y,
        angle2,
        this.longueurSensor2
      );
    }
  }

  adjustSensorLength(sensorName) {
    if (sensorName === "sensor1" && this.longueurSensor1 > 0) {
      this.longueurSensor1 -= 5;
      // console.log(this.longueurSensor1);
    }
    if (sensorName === "sensor2" && this.longueurSensor2 > 0) {
      this.longueurSensor2 -= 5;
      // console.log(this.longueurSensor2);
    }
  }

  checkSensorIntersections() {
    let activeSensors = [
      {
        isActive: this.sensor1Active,
        sensor: this.sensor1,
        angleChange: this.degresSensorGauche,
        name: "sensor1",
        maxLength: this.maxlongueurSensor1,
      },
      {
        isActive: this.sensor2Active,
        sensor: this.sensor2,
        angleChange: this.degresSensorDroit,
        name: "sensor2",
        maxLength: this.maxlongueurSensor2,
      },
    ];

    let sensorsActivated = 0;

    for (let i = 0; i < activeSensors.length; i++) {
      let sensorData = activeSensors[i];
      if (!sensorData.isActive) continue;

      let sensor = sensorData.sensor;
      let angleChange = sensorData.angleChange;
      let sensorName = sensorData.name;
      let maxSensorLength = sensorData.maxLength;

      let tiles = this.calqueNiveau.getTilesWithinShape(sensor);
      let combined = tiles;

      for (let j = 0; j < combined.length; j++) {
        if (combined[j].properties.estSolide) {
          let distance = Phaser.Geom.Line.Length(sensor);
          let normalizedDistance = 1 - distance / maxSensorLength;
          this.robot.angle += angleChange * normalizedDistance;
          this.adjustSensorLength(sensorName);
          sensorsActivated++;
          // console.log(`${sensorName} is touching a tile or prop at distance ${distance}`);
          break;
        }
      }
    }

    if (sensorsActivated === 2) {
      console.log(this.degres2SensorsTouche)
      if (this.degres2SensorsTouche) {
        this.robot.angle += 40;
      } else{
        this.robot.angle += -40;
      }
     
     
    }
  }

  drawSensors() {
    this.graphics.clear();
    // Dessin des capteurs seulement si leur variable active est true
    if (this.sensor1Active) {
      this.graphics.strokeLineShape(this.sensor1);
    }
    if (this.sensor2Active) {
      this.graphics.strokeLineShape(this.sensor2);
    }
  }

  moveRobot() {
    // Rotation du robot
    let keyK = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.K);
    let keyL = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.L);

    if (keyK.isDown) {
      // Si la touche 'K' est enfoncée, faites tourner le robot vers la gauche
      this.robot.angle -= 10;
    }
    if (keyL.isDown) {
      // Si la touche 'L' est enfoncée, faites tourner le robot vers la droite
      this.robot.angle += 10;
    }
  }

  updateRobotVelocity() {
    let vx = 0;
    let vy = 0;
    
      // Calculate the velocity components based on the robot's angle
      let angleInRadians = Phaser.Math.DegToRad(this.robot.angle);
      vx = Math.cos(angleInRadians) * this.vitesseRobot;
      vy = Math.sin(angleInRadians) * this.vitesseRobot;

      // Update the robot's velocity
      this.robot.setVelocity(vx, vy);
   
  }

  // Fonction pour déplacer le robot fantôme
  RobotFantomeCourse() {
    if (this.indexCheminFantome < this.cheminFantome.length) {
      let prochainePosition = this.cheminFantome[this.indexCheminFantome];
      let distance = Phaser.Math.Distance.Between(
        this.robotFantome.x,
        this.robotFantome.y,
        prochainePosition.x,
        prochainePosition.y
      );
    
      if (distance < 1) {
        this.indexCheminFantome++;
      } else {
        let angle = Phaser.Math.Angle.BetweenPoints(this.robotFantome, prochainePosition);
        this.robotFantome.setVelocity(
          Math.cos(angle) * this.vitesseRobotFantome,
          Math.sin(angle) * this.vitesseRobotFantome
        );
      }
    } else {
      this.robotFantome.setVelocity(0, 0);
    }
  }
  
  changeScene() {
    localStorage.setItem("score", 0); // Réinitialiser le score pour afficher uniquement le timer
    localStorage.setItem("timer", this.timer);
    localStorage.setItem("currentSceneIndex", 3);
    this.scene.stop("Niveau4");
    this.scene.start("LevelFinish");
  }
}
