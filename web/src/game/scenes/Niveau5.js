import { EventBus } from "../EventBus";
import { Scene } from "phaser";

export class Niveau5 extends Scene {
  constructor() {
    super("Niveau5");

    this.frameCount = 0;

    // Initialisation des capteurs actifs ou non
    this.sensor1Active = true;
    this.sensor2Active = true;

    // Initialisation des longueurs des capteurs
    this.maxlongueurSensor1 = localStorage.getItem("tailleSensorGauche") || 50;
    this.maxlongueurSensor2 = localStorage.getItem("tailleSensorDroit") || 50;
    this.longueurSensor1 = 0;
    this.longueurSensor2 = 0;

    //Capteurs
    this.sensor1 = null;
    this.sensor2 = null;

    // Initialisation des angles des capteurs
    this.degresSensorGauche = localStorage.getItem("degresGauche") || 90;
    this.degresSensorDroit = localStorage.getItem("degresDroit") || -90;
    this.degres2SensorsTouche = localStorage.getItem("degres2Touche") || false;

    // Initialisation de la vitesse du robot
    this.vitesseRobot = 130;

    // Initialisation des angles des capteurs par défaut
    this.defaultangleGauche = 45;
    this.defaultangleDroit = 45;

    // Timer
    this.timer = 0;
  }

  create() {

    let niveauLargeur = 1600;
    let niveauHauteur = 960;

    this.carteDuNiveau = this.make.tilemap({ key: "niveau5" });

    // Création du robot
    this.robot = this.physics.add.image(50, 75, "robot");
    //comme un calque le robot est au dessus
    this.robot.setDepth(1);
    //Direction et vitese du robot
    this.robot.setVelocityX(this.vitesseRobot);

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

    // Définir la caméra
    this.cameras.main.startFollow(this.robot);
    this.cameras.main.setBounds(0, 0, niveauLargeur, niveauHauteur);

    // Définir les collisions
    this.calqueNiveau.setCollisionByProperty({ estSolide: true });
    // collision entre le robot et le calque de niveau
    this.physics.add.collider(this.robot, this.calqueNiveau);

    // Création des capteurs
    this.sensor1 = new Phaser.Geom.Line();
    this.sensor2 = new Phaser.Geom.Line();

    // Initialisation des longueurs des capteurs
    this.longueurSensor1 = this.maxlongueurSensor1;
    this.longueurSensor2 = this.maxlongueurSensor2;
    // Créez l'objet graphics pour les lignes du capteurs
    this.graphics = this.add.graphics({
      lineStyle: { width: 2, color: 0x00ff00 },
    });

    //Clavier
    this.cursors = this.input.keyboard.createCursorKeys();

    // Crée le texte du timer
    this.TimerText = this.add.text(700, 2, "Timer : 0s", {
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

    EventBus.emit("current-scene-ready", this);
  }

  update() {
    this.frameCount++;
    // Définis à chaque frame la position et l'angle des capteurs
    this.updateSensors();

    // Déplacement du robot
    this.moveRobot(this.cursors);

    // Vérifie si les capteurs du robot touchent un obstacle
    this.checkSensorIntersections();

    // Dessine les capteurs du robot sur l'écran
    this.drawSensors(this.graphics);

    // Met à jour la vitesse du robot en fonction de son orientation
    this.updateRobotVelocity();

    // Met à jour le joueur toutes les 10 frames
    if (this.frameCount % 10 === 0) {
      if (this.longueurSensor1 < this.maxlongueurSensor1) {
        this.longueurSensor1 += 5;
      }
      if (this.longueurSensor2 < this.maxlongueurSensor2) {
        this.longueurSensor2 += 5;
      }
      if (this.longueurMidSensor < this.maxlongueurMidSensor) {
        this.longueurMidSensor += 5;
      }
    }

    // Met à jour le timer
    this.timer += 1 / 60;
    this.TimerText.setText("Timer : " + Math.floor(this.timer) + "s");

    if (
      this.robot.x > 1408 &&
      this.robot.x < 1536 &&
      this.robot.y > 768 &&
      this.robot.y < 896
    ) {
      this.changeScene();
    }
  }

  //########################
  //###### Fonctions #######
  //########################

  updateSensors() {
    //Mets à jour la position et l'angle des capteurs
    let angle1 = Phaser.Math.DegToRad(
      this.robot.angle - this.defaultangleGauche
    );
    let angle2 = Phaser.Math.DegToRad(
      this.robot.angle + this.defaultangleDroit
    );

    // Si le capteur est actif alors on le met à jour
    if (this.sensor1Active) {
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
  // Fonction pour ajuster la longueur des capteurs
  adjustSensorLength(sensorName) {
    if (sensorName === "sensor1" && this.longueurSensor1 > 0) {
      this.longueurSensor1 -= 5;
    }
    if (sensorName === "sensor2" && this.longueurSensor2 > 0) {
      this.longueurSensor2 -= 5;
    }
  }

  // Fonction pour vérifier si les capteurs touchent un obstacle
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

    // Compteur pour les capteurs activés
    let sensorsActivated = 0;
    // Pour chaque capteur actif, vérifie s'il touche un obstacle
    for (let i = 0; i < activeSensors.length; i++) {
      let sensorData = activeSensors[i];
      if (!sensorData.isActive) continue;
      // Récupère les données du capteur
      let sensor = sensorData.sensor;
      let angleChange = sensorData.angleChange;
      let sensorName = sensorData.name;
      let maxSensorLength = sensorData.maxLength;

      // Récupère les tuiles touchées par le capteur
      let tiles = this.calqueNiveau.getTilesWithinShape(sensor);
      let combined = tiles;

      // Pour chaque tuile touchée, ajuste l'angle du robot
      for (let j = 0; j < combined.length; j++) {
        if (combined[j].properties.estSolide) {
          // Récupère la distance entre le robot et l'obstacle
          let distance = Phaser.Geom.Line.Length(sensor);
          // Normalise la distance pour obtenir une valeur entre 0 et 1
          let normalizedDistance = 1 - distance / maxSensorLength;
          // Ajuste l'angle du robot en fonction de la distance
          this.robot.angle += angleChange * normalizedDistance;
          // Ajuste la longueur du capteur
          this.adjustSensorLength(sensorName);
          sensorsActivated++;
          break;
        }
      }
    }
    // Si les deux capteurs sont activés, ajuste l'angle du robot en fonction de leur état
    if (sensorsActivated === 2) {
      console.log(this.degres2SensorsTouche);
      if (this.degres2SensorsTouche) {
        this.robot.angle += 40;
      } else {
        this.robot.angle += -40;
      }
    }
  }

  // Dessine les capteurs sur l'écran
  drawSensors() {
    this.graphics.clear();
    // Dessine des capteurs seulement si leur variable active est true
    if (this.sensor1Active) {
      this.graphics.strokeLineShape(this.sensor1);
    }
    if (this.sensor2Active) {
      this.graphics.strokeLineShape(this.sensor2);
    }
  }

  // Déplace le robot en fonction des entrées claviers de l'utilisateur
  moveRobot() {
    // Rotation du robot
    let keyK = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.K);
    let keyL = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.L);

    if (keyK.isDown) {
      this.robot.angle -= 10;
    }
    if (keyL.isDown) {
      this.robot.angle += 10;
    }
  }

  // Met à jour la vitesse du robot en fonction de son orientation
  updateRobotVelocity() {
    let vx = 0;
    let vy = 0;

    //Met à jour la direction du robot
    let angleInRadians = Phaser.Math.DegToRad(this.robot.angle);
    vx = Math.cos(angleInRadians) * this.vitesseRobot;
    vy = Math.sin(angleInRadians) * this.vitesseRobot;

    // Met à jour la vitesse du robot
    this.robot.setVelocity(vx, vy);
    
  }
  
  changeScene() {
    localStorage.setItem("score", 0); // Réinitialiser le score pour afficher uniquement le timer
    localStorage.setItem("timer", this.timer);
    localStorage.setItem("currentSceneIndex", 4);
    this.scene.stop("Niveau5");
    this.scene.start("LevelFinish");
  }
}
