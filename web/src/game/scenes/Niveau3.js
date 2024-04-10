import { EventBus } from "../EventBus";
import { Scene } from "phaser";

export class Niveau3 extends Scene {
  constructor() {
    super("Niveau3");

    //Conteur de frame
    this.frameCount = 0;

    // Initialisation des capteurs actifs ou non
    this.sensor1Active = true;
    this.sensor2Active = true;
    this.sensor3Active = false;
    this.sensor4Active = false;

    // Initialisation des longueurs des capteurs
    this.maxlongueurSensor1 = localStorage.getItem("tailleSensorGauche") || 50;
    this.maxlongueurSensor2 = localStorage.getItem("tailleSensorDroit") || 50;
    this.maxlongueurSensor3 = 50;
    this.maxlongueurSensor4= 50;
    this.longueurSensor1 = 0;
    this.longueurSensor2 = 0;
    this.longueurSensor3 = 0;
    this.longueurSensor4 = 0;

    // Capteurs
    this.sensor1 = null;
    this.sensor2 = null;
    this.sensor3 = null;
    this.sensor4 = null;

    // Initialisation des angles des capteurs
    this.degresSensorGauche = localStorage.getItem("degresGauche") || 90;
    this.degresSensorDroit = localStorage.getItem("degresDroit") || -90;
    this.degres2SensorsToucher = localStorage.getItem("degres2Touche") || false;
    this.degresSensor3 = 50;
    this.degresSensor4 = -50;

    // Initialisation de la vitesse du robot
    this.vitesseRobot = 100;

    // Initialisation de la santé du robot
    this.health = 4;

    // Initialisation des angles des capteurs par défaut
    this.defaultangleGauche = 45;
    this.defaultangleDroit = 45;
    this.defaultangle3 = 135;
    this.defaultangle4 = 135;

    // Initialisation du score
    this.score = 0;
  }

  create() {
    this.carteDuNiveau = this.make.tilemap({ key: "niveau3" });

    // Création du robot
    this.robot = this.physics.add.image(145, 176, "robot");
    //comme un calque le robot est au dessus
    this.robot.setDepth(1);
    //Direction et vitese du robot
    this.robot.setVelocityX(this.vitesseRobot);

    // Créer le tileset pour les calques "Niveau" et "Props"
    const tilesetVaisseau = this.carteDuNiveau.addTilesetImage(
      "vaisseau",
      "tuilesJeu"
    );
    const tilesetProps = this.carteDuNiveau.addTilesetImage(
      "Props",
      "tuilesProps"
    );

    // Créer les calques
    this.calqueNiveau = this.carteDuNiveau.createLayer("Niveau",tilesetVaisseau);
    this.calqueProps = this.carteDuNiveau.createLayer("Props", tilesetProps);

    // Définir les collisions
    this.calqueNiveau.setCollisionByProperty({ estSolide: true });
    this.calqueProps.setCollisionByProperty({ estSolide: true });
    this.robot.body.collideWorldBounds = true;
  
    // collision entre le robot et le calque de niveau
    this.physics.add.collider(this.robot, this.calqueNiveau);
    // collision entre le robot et le calque de props
    this.physics.add.collider(this.robot, this.calqueProps);


    // Créez l'objet graphics pour les capteurs
    this.graphics = this.add.graphics({
      lineStyle: { width: 2, color: 0x00ff00 },
    });

     
     //
    // Batteries
    //
    this.batteries = this.physics.add.group(); // Créer un groupe
    this.energy = 100;
    this.stopEnergy = false;

    // Met les batteries sur la cartes
    let batterie = this.physics.add.image(280, 100, "batterie");
    let batterie2 = this.physics.add.image(500, 240 , "batterie");
    let batterie3 = this.physics.add.image(600, 100, "batterie");
    let batterie4 = this.physics.add.image(750, 320, "batterie");

    this.batteries.add(batterie);
    this.batteries.add(batterie2);
    this.batteries.add(batterie3);
    this.batteries.add(batterie4);

    this.physics.add.collider(this.robot, this.calqueNiveau);

    // Batteries qui disparaissent au contact du robot
    this.physics.add.overlap(
      this.robot,
      this.batteries,
      function (robot, batterie) {
        batterie.destroy();
        this.energy += 20;
        this.score += 100;
      },
      null,
      this
    );

    // Créer l'objet graphics pour la barre de santé
    this.vieGraphics = this.add.graphics({
      lineStyle: { width: 2, color: 0x00ff00 },
      fillStyle: { color: 0xff0000 },
    });

    // Initialisation des touches du clavier
    this.cursors = this.input.keyboard.createCursorKeys();
    this.spaceKey = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    ); 

    // Création du group de lasers
    this.lasers = this.physics.add.group(); // Création du groupe de lasers

    // Création des capteurs
    this.sensor1 = new Phaser.Geom.Line();
    this.sensor2 = new Phaser.Geom.Line();
    this.sensor3 = new Phaser.Geom.Line();
    this.sensor4 = new Phaser.Geom.Line();
    
    // Initialisation des longueurs des capteurs
    this.longueurSensor1 = this.maxlongueurSensor1;
    this.longueurSensor2 = this.maxlongueurSensor2;
    this.longueurSensor3 = this.maxlongueurSensor3;
   this.longueurSensor4 = this.maxlongueurSensor4;
   

    // Créez l'objet graphics
    this.graphics = this.add.graphics({
      lineStyle: { width: 2, color: 0x00ff00 },
    });

    // Crée le texte du score
    this.scoreText = this.add.text(650, 0, "Score : 0", {
      fontSize: "28px",
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
    
    EventBus.emit("current-scene-ready", this);
  }

  update() {

    this.frameCount++;

    // Si la touche espace est enfoncée, tire un laser
    if (Phaser.Input.Keyboard.JustDown(this.spaceKey)) {
      const laser = this.lasers.create(this.robot.x, this.robot.y, "laser");
      laser.setVelocityX(300); // Vitesse du laser
    }

    // Supprime les lasers qui sont sortis de l'écran
    this.lasers.children.each(function (laser) {
      if (laser.x > 960) {
        laser.destroy();
      }
    }, this);

    // Définis à chaque frame la position et l'angle des capteurs
    this.updateSensors();

    // Déplacement du robot
    this.moveRobot(this.cursors);

    // Vérifie si les capteurs du robot touchent un obstacle
    this.checkSensorIntersections();

    // Dessine les capteurs du robot sur l'écran
    this.drawSensors(this.graphics);
    this.drawHealthBar();

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
      if (this.longueurSensor3 < this.maxlongueurSensor3) {
        this.longueurSensor3+= 5;
      }
      if (this.longueurSensor4 < this.maxlongueurSensor4) {
        this.longueurSensor4 += 5;
      }
      if (!this.stopEnergy) {

        this.consumeEnergy(); 
      }
    }

    // Mettez à jour le texte chaque fois que le score change
    this.scoreText.setText('Score: ' + this.score);

    // Change de niveau si le robot atteint la fin du niveau
    if (this.robot.x > 900) {
      this.changeScene();
    }
  }

  //########################
  //###### Fonctions #######
  //########################

  updateSensors() {
    //Mets à jour la position et l'angle des capteurs
    let angle1 = Phaser.Math.DegToRad(this.robot.angle - this.defaultangleGauche);
    let angle2 = Phaser.Math.DegToRad(this.robot.angle + this.defaultangleDroit);
    let angle3= Phaser.Math.DegToRad(this.robot.angle + this.defaultangle3);
    let angle4 = Phaser.Math.DegToRad(this.robot.angle - this.defaultangle4);
    

    // Si le capteur est actif alors on le met à jour
    if (this.sensor1Active) {
      Phaser.Geom.Line.SetToAngle(this.sensor1,this.robot.x,this.robot.y,angle1,this.longueurSensor1);
    }
    if (this.sensor2Active) {
      Phaser.Geom.Line.SetToAngle(this.sensor2,this.robot.x,this.robot.y,angle2,this.longueurSensor2);
    }
    if (this.sensor3Active) {
      Phaser.Geom.Line.SetToAngle(this.sensor3,this.robot.x,this.robot.y,angle3,this.longueurSensor3);
    }
    if (this.sensor4Active) {
      Phaser.Geom.Line.SetToAngle(this.sensor4,this.robot.x,this.robot.y,angle4,this.longueurSensor4);
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
    if (sensorName === "sensor3" && this.longueurSensor3 > 0) {
      this.longueurSensor3 -= 5;
    }
    if (sensorName === "sensor4" && this.longueurSensor4 > 0) {
      this.longueurSensor4 -= 5;
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
      {
        isActive: this.sensor3Active,
        sensor: this.sensor3,
        angleChange: this.degresSensor3,
        name: "sensor3",
        maxLength: this.maxlongueurSensor3,
      },
      {
        isActive: this.sensor4Active,
        sensor: this.sensor4,
        angleChange: this.degresSensor4,
        name: "sensor4",
        maxLength: this.maxlongueurSensor4,
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
      let props = this.calqueProps.getTilesWithinShape(sensor);

      let combined = tiles.concat(props);

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
    // Efface les capteurs précédents
    this.graphics.clear();
    // Dessine des capteurs seulement si leur variable active est true
    if (this.sensor1Active) {
      this.graphics.strokeLineShape(this.sensor1);
    }
    if (this.sensor2Active) {
      this.graphics.strokeLineShape(this.sensor2);
    }
    if (this.sensor3Active) {
      this.graphics.strokeLineShape(this.sensor3);
    }
    if (this.sensor4Active) {
      this.graphics.strokeLineShape(this.sensor4);
    }
   
  }

  // Déplace le robot en fonction des entrées claviers de l'utilisateur
  moveRobot() {
    // Rotation du robot
    let keyK = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.K);
    let keyL = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.L);

    if (keyK.isDown) {this.robot.angle -= 10;}

    if (keyL.isDown) {this.robot.angle += 10;}
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

  // Dessine la barre de santé du robot
  drawHealthBar() {
    // Efface la barre de santé précédente
    this.vieGraphics.clear();

// Calcule le nombre de barres de santé à dessiner
    let healthBars = Math.floor(this.energy / 20);

    // Dessine la nouvelle barre de santé
    for (let i = 0; i < healthBars; i++) {
      this.vieGraphics.fillStyle(0xff0000); 
      this.vieGraphics.fillRect(925 - i * 20, 5, 15, 15);
    }
  }

  // Consomme de l'énergie à chaque frame
  consumeEnergy() {
    this.energy -= 1; 
    // console.log(this.energy);
    // Si l'énergie est inférieure ou égale à 0, arrête le robot
    if (this.energy <= 0) {
      this.stopEnergy = true; 
      this.scene.start("GameOver");
    }
  }
  
  changeScene() {
    this.stopEnergy = true;
    let scoreTotal=this.score+this.energy;
    localStorage.setItem("score", scoreTotal);
    localStorage.setItem("currentSceneIndex", 2);
    this.scene.stop("niveau3");
    this.scene.start("LevelFinish");
  }
}
