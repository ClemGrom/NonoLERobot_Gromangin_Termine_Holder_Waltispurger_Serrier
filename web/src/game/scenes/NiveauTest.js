import { EventBus } from "../EventBus";
import { Scene } from "phaser";
import { drawSensors, moveRobot,updateSensors} from "./BaseJeu";

export class NiveauTest extends Scene {
  constructor() {
    super("NiveauTest");

    this.frameCount = 0;

    // Initialisez les variables des capteurs à true pour les activer par défaut
    this.sensor1Active = true;
    this.sensor2Active = true;
    
    this.maxlongueurSensor1 = localStorage.getItem("tailleSensorGauche") || 50;
    this.maxlongueurSensor2 = localStorage.getItem("tailleSensorDroit") || 50;
    this.longueurSensor1 = 0;
    this.longueurSensor2 = 0;
   
    // Initialisez la rotation cible du robot
    this.targetRotation = 0;
    this.sensor1 = null;
    this.sensor2 = null;

    this.degresSensorGauche = localStorage.getItem("degresGauche") || 90;
    this.degresSensorDroit = localStorage.getItem("degresDroit") || -90;
    this.degres2SensorsToucher = localStorage.getItem("degres2Touche") || 50;
    this.vitesseRobot = 100;

    this.health = 4;

    this.energy = 100; 
    this.stopEnergy = false;

    
    this.defaultangleGauche = 45;
    this.defaultangleDroit = 45;
    
  }

  create() {
    this.carteDuNiveau = this.make.tilemap({ key: "niveau3" });

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
     this.robot = this.physics.add.image(50, 75, "robot");
     this.robot.body.collideWorldBounds = true;
     this.robot.setDepth(1);
    //  this.robot.angle += 10; 
 
     // collision entre le robot et le calque de niveau
     this.physics.add.collider(this.robot, this.calqueNiveau);

    this.cursors = this.input.keyboard.createCursorKeys();


    this.spaceKey = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    ); // Ajout de la touche espace

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


    this.batteries = this.physics.add.group(); // Créer un groupe pour les batteries

    let batterie = this.physics.add.image(500, 75, "batterie");
    let batterie2 = this.physics.add.image(800, 200, "batterie");
    let batterie3 = this.physics.add.image(500, 300, "batterie");
    let batterie4 = this.physics.add.image(100, 200, "batterie");
    
      this.batteries.add(batterie);
      this.batteries.add(batterie2);
      this.batteries.add(batterie3);
      this.batteries.add(batterie4);
    

    
      this.physics.add.overlap(
        this.robot,
        this.batteries,
        function (robot, batterie) {
          batterie.destroy();
          this.energy += 20; // Augmenter l'énergie lorsque le robot ramasse une batterie
        },
        null,
        this
      );

    // Créez l'objet graphics
    this.vieGraphics = this.add.graphics({
      lineStyle: { width: 2, color: 0x00ff00 },
      fillStyle: { color: 0xff0000 }
    });

        // Dessinez la barre de santé initiale
        this.drawHealthBar();

    this.energy = 100; 
    this.stopEnergy = false;

  }

  update() {
    
    // Définissez la position initiale des capteurs
    updateSensors(this.sensor1Active, this.sensor1, this.sensor2Active, this.sensor2, this.robot, this.defaultangleGauche, this.defaultangleDroit, this.longueurSensor1, this.longueurSensor2);

    // Déplacement du robot
    moveRobot(this.input, this.robot);

    // Vérifiez si les capteurs intersectent les astéroïdes
    this.checkSensorIntersections();

    // Dessine les capteurs du robot sur l'écran
    drawSensors(this.sensor1Active, this.sensor2Active, this.graphics, this.sensor1, this.sensor2);

    // Met à jour la vitesse du robot en fonction de son orientation
    this.updateRobotVelocity();

    
    this.frameCount++;

    // Met à jour le joueur toutes les 10 frames
    if (this.frameCount % 10 === 0) {
      if (this.longueurSensor1 < this.maxlongueurSensor1) {
        this.longueurSensor1 += 5;
      }
      if (this.longueurSensor2 < this.maxlongueurSensor2) {
        this.longueurSensor2 += 5;
      }
    }

    if (this.robot.x > 640 && this.robot.x < 704 && this.robot.y > 160 && this.robot.y < 224) {
      this.changeScene();
  }

  if (!this.stopEnergy) {
    this.consumeEnergy(); // Consommer de l'énergie à chaque mise à jour
  }
 
  this.drawHealthBar(); // Dessiner la barre de santé
  }

  //########################
  //###### Fonctions #######
  //########################


  adjustSensorLength(sensorName) {
    if (sensorName === "sensor1" && this.longueurSensor1 > 0) {
      this.longueurSensor1 -= 5;
    }
    if (sensorName === "sensor2" && this.longueurSensor2 > 0) {
      this.longueurSensor2 -= 5;
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
          break;
        }
      }
    }
  
    if (sensorsActivated === 2) {
      this.robot.angle += 50;
    }
  }



  updateRobotVelocity() {
    let vx = 0;
    let vy = 0;
    // Only set the robot's velocity if the stop flag is not set
    
      // Calculate the velocity components based on the robot's angle
      let angleInRadians = Phaser.Math.DegToRad(this.robot.angle);
      vx = Math.cos(angleInRadians) * this.vitesseRobot;
      vy = Math.sin(angleInRadians) * this.vitesseRobot;

      // Update the robot's velocity
      this.robot.setVelocity(vx, vy);
    
  }

  drawHealthBar() {
    // Clear the previous health bar
    this.vieGraphics.clear();

    // Calculate the number of health bars to draw
    let healthBars = Math.floor(this.energy / 20);

    // Draw new health bar
    for (let i = 0; i < healthBars; i++) {
        this.vieGraphics.fillStyle(0xff0000); // Red color
        this.vieGraphics.fillRect(800 - (i * 20), 20, 15, 15); // Draw a rectangle for each health point
    }
}

  consumeEnergy() {
    this.energy -= 0.1; // Consommer une certaine quantité d'énergie
    if (this.energy <= 0) {
      this.stopEnergy = true; // Arrêter le robot lorsque l'énergie atteint 0
      this.scene.start("GameOver");
    }
  }
  changeScene() {
    this.stopEnergy = true;
    this.scene.start("NiveauTest");
  }
  
}




