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
    this.stopRobot = false;

    // Initialisez la rotation cible du robot
    this.targetRotation = 90;
    this.sensor1 = null;
    this.sensor2 = null;

    this.degresSensorGauche = localStorage.getItem("degresGauche") || 90;
    this.degresSensorDroit = localStorage.getItem("degresDroit") || -90;
    this.degres2SensorsTouche = localStorage.getItem("degres2Touche") || false;
    this.vitesseRobot = 100;

    this.health = 4;

    // this.energy = 100;
    // this.stopEnergy = false;

    this.defaultangleGauche = 45;
    this.defaultangleDroit = 45;
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
    this.robot = this.physics.add.image(500, 100, "robot");

    //  this.robot.body.collideWorldBounds = true;
    this.robot.setDepth(1);
    this.robot.angle += 180; // Ajoutez cette ligne pour augmenter l'angle initial du robot de 10 degrés

   // Supposons que la largeur et la hauteur de votre niveau soient stockées dans les variables niveauLargeur et niveauHauteur
let niveauLargeur = 1300; // Remplacez par la largeur réelle de votre niveau
let niveauHauteur = 750; // Remplacez par la hauteur réelle de votre niveau

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
    this.robot.setVelocityX(this.vitesseRobot);

    this.longueurSensor1 = this.maxlongueurSensor1;
    this.longueurSensor2 = this.maxlongueurSensor2;

    EventBus.emit("current-scene-ready", this);

    // this.batteries = this.physics.add.group(); // Créer un groupe pour les batteries

    // let batterie = this.physics.add.image(500, 75, "batterie");
    // let batterie2 = this.physics.add.image(800, 200, "batterie");
    // let batterie3 = this.physics.add.image(500, 300, "batterie");
    // let batterie4 = this.physics.add.image(100, 200, "batterie");

    // this.batteries.add(batterie);
    // this.batteries.add(batterie2);
    // this.batteries.add(batterie3);
    // this.batteries.add(batterie4);

    // this.physics.add.overlap(
    //   this.robot,
    //   this.batteries,
    //   function (robot, batterie) {
    //     batterie.destroy();
    //     this.energy += 20; // Augmenter l'énergie lorsque le robot ramasse une batterie
    //   },
    //   null,
    //   this
    // );

    // // Créez l'objet graphics
    // this.vieGraphics = this.add.graphics({
    //   lineStyle: { width: 2, color: 0x00ff00 },
    //   fillStyle: { color: 0xff0000 },
    // });

    // // Dessinez la barre de santé initiale
    // this.drawHealthBar();

    // this.energy = 100;
    // this.stopEnergy = false;
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

    if (
      this.robot.x > 700 &&
      this.robot.x < 800 &&
      this.robot.y > 0 &&
      this.robot.y < 300
    ) {
      this.changeScene();
    }

    // if (!this.stopEnergy) {
    //   this.consumeEnergy(); // Consommer de l'énergie à chaque mise à jour
    // }

    // this.drawHealthBar(); // Dessiner la barre de santé
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
      }else{
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
    // Only set the robot's velocity if the stop flag is not set
    if (!this.stopRobot) {
      // Calculate the velocity components based on the robot's angle
      let angleInRadians = Phaser.Math.DegToRad(this.robot.angle);
      vx = Math.cos(angleInRadians) * this.vitesseRobot;
      vy = Math.sin(angleInRadians) * this.vitesseRobot;

      // Update the robot's velocity
      this.robot.setVelocity(vx, vy);
    } else {
      this.robot.setVelocity(0, 0);
    }
  }

  // drawHealthBar() {
  //   // Clear the previous health bar
  //   this.vieGraphics.clear();

  //   // Calculate the number of health bars to draw
  //   let healthBars = Math.floor(this.energy / 20);

  //   // Draw new health bar
  //   for (let i = 0; i < healthBars; i++) {
  //     this.vieGraphics.fillStyle(0xff0000); // Red color
  //     this.vieGraphics.fillRect(925 - i * 20, 5, 15, 15);
  //   }
  // }

  // consumeEnergy() {
  //   this.energy -= 0.1; // Consommer une certaine quantité d'énergie
  //   // console.log(this.energy);
  //   if (this.energy <= 0) {
  //     this.stopEnergy = true; // Arrêter le robot lorsque l'énergie atteint 0
  //     this.scene.start("GameOver");
  //   }
  // }
  changeScene() {
    this.stopEnergy = true;
    this.scene.start("Niveau4");
  }
}