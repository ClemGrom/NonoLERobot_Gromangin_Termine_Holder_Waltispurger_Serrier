import { EventBus } from '../EventBus';
import { Scene } from 'phaser';

export class Game extends Scene
{
    constructor ()
    {
        super('Game');

        // Initialisez les variables des capteurs à true pour les activer par défaut
        this.sensor1Active = true;
        this.sensor2Active = true;
        this.midSensorActive = false;
        this.rightsideSensorActive = false;
        this.leftsideSensorActive = false;

        // Initialisez le drapeau pour arrêter le robot à false
        this.stopRobot = false;

        // Initialisez la rotation cible du robot
        this.targetRotation = 0;
        this.asteroid = [];
        this.sensor1 = null;
        this.sensor2 = null;
        this.midSensor = null;
        
    }

    create() {

        this.carteDuNiveau = this.make.tilemap({ key: "niveau1" });
        const tileset = this.carteDuNiveau.addTilesetImage("vaisseau", "tuilesJeu");
        this.calqueNiveau = this.carteDuNiveau.createLayer("Niveau", tileset);
        this.calqueNiveau.setCollisionByProperty({ estSolide: true });
    
        // Création du robot
        this.robot = this.physics.add.image(145, 176, 'robot');
        this.robot.body.collideWorldBounds = true;
        this.robot.setDepth(1);

        for (let i = 0; i < 5; i++) {
            let newAsteroid = this.physics.add.image(
                Phaser.Math.Between(250, 700), Phaser.Math.Between(100, 300), 'asteroide'
            );
            this.asteroid.push(newAsteroid);
          }
        
      
        // -- Généré plusieurs batteries à des endroits aléatoires --

        this.batteries = this.physics.add.group(); // Créer un groupe pour les batteries

        // Générer plusieurs batteries à des endroits aléatoires
        for (let i = 0; i < 5; i++) {
            let batterie = this.physics.add.image(Phaser.Math.Between(250, 700), Phaser.Math.Between(100, 300), 'batterie');
            this.batteries.add(batterie);
            this.physics.add.collider(this.robot, this.calqueNiveau);
        }

        // Batteries qui disparaissent au contact du robot
        this.physics.add.overlap(this.robot, this.batteries, function (robot, batterie) {
            batterie.destroy();
        }, null, this);
        

        this.cursors = this.input.keyboard.createCursorKeys();
    
        this.lasers = this.physics.add.group(); // Création du groupe de lasers
    
        this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE); // Ajout de la touche espace

        // Création des capteurs
        this.sensor1 = new Phaser.Geom.Line();
        this.sensor2 = new Phaser.Geom.Line();
        this.midSensor = new Phaser.Geom.Line();
        this.rightsideSensor = new Phaser.Geom.Triangle.BuildEquilateral(this.robot.x, this.robot.y, 100);
        this.leftsideSensor = new Phaser.Geom.Triangle.BuildEquilateral(this.robot.x, this.robot.y, 100);

        // Créez l'objet graphics
        this.graphics = this.add.graphics({ lineStyle: { width: 2, color: 0x00ff00 } });
        this.robot.setVelocityX(50);

        EventBus.emit('current-scene-ready', this);
    }

    update() {
        // Si la touche espace est enfoncée, tire un laser
        if (Phaser.Input.Keyboard.JustDown(this.spaceKey)) {
            const laser = this.lasers.create(this.robot.x, this.robot.y, 'laser');
            laser.setVelocityX(300); // Vitesse du laser
        }
    
        // Supprime les lasers qui sont sortis de l'écran
        this.lasers.children.each(function(laser) {
            if (laser.x > 960) {
                laser.destroy();
            }
        }, this);

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
    }

    //########################
    //###### Fonctions #######
    //########################
    
    updateSensors() {
        // Mettez à jour la position et l'angle des capteurs
        let angle1 = Phaser.Math.DegToRad(this.robot.angle - 30);
        let angle2 = Phaser.Math.DegToRad(this.robot.angle + 30);
        let angleMid = Phaser.Math.DegToRad(this.robot.angle);
        let angleRight = Phaser.Math.DegToRad(this.robot.angle - 45);
        let angleLeft = Phaser.Math.DegToRad(this.robot.angle + 45);
        
        // Mise à jour des capteurs seulement si leur variable active est true
        if (this.sensor1Active) {
            // 200 à la fin est la longueur du capteur
            Phaser.Geom.Line.SetToAngle(this.sensor1, this.robot.x, this.robot.y, angle1, 50);
        }
        if (this.sensor2Active) {
            Phaser.Geom.Line.SetToAngle(this.sensor2, this.robot.x, this.robot.y, angle2, 50);
        }
        if (this.midSensorActive) {
            Phaser.Geom.Line.SetToAngle(this.midSensor, this.robot.x, this.robot.y, angleMid, 75);
        }
        if (this.rightsideSensorActive) {
            this.rightsideSensor.setTo(this.robot.x, this.robot.y, this.robot.x + Math.cos(angleRight) * 100, this.robot.y + Math.sin(angleRight) * 100, this.robot.x + Math.cos(angleRight - Math.PI / 2) * 100, this.robot.y + Math.sin(angleRight - Math.PI / 2) * 100);
        }
        if (this.leftsideSensorActive) {
            this.leftsideSensor.setTo(this.robot.x, this.robot.y, this.robot.x + Math.cos(angleLeft) * 100, this.robot.y + Math.sin(angleLeft) * 100, this.robot.x + Math.cos(angleLeft + Math.PI / 2) * 100, this.robot.y + Math.sin(angleLeft + Math.PI / 2) * 100);
        }
    }

    checkSensorIntersections() {
        this.stopRobot = false; // Réinitialisez le drapeau à chaque mise à jour

        // Créez un tableau pour stocker les capteurs actifs
        let activeSensors = [];
        if (this.sensor1Active) activeSensors.push({ sensor: this.sensor1, angleChange: 45 });
        if (this.sensor2Active) activeSensors.push({ sensor: this.sensor2, angleChange: -45 });
        if (this.midSensorActive) activeSensors.push({ sensor: this.midSensor, angleChange: 180 });
        if (this.rightsideSensorActive) activeSensors.push({ sensor: this.rightsideSensor, angleChange: -10 });
        if (this.leftsideSensorActive) activeSensors.push({ sensor: this.leftsideSensor, angleChange: 10 });

        // Vérifiez chaque capteur actif
        for (let i = 0; i < activeSensors.length; i++) {
            let sensor = activeSensors[i].sensor;
            let angleChange = activeSensors[i].angleChange;

            // Obtenez les tuiles à l'intérieur du capteur
            let tiles = this.calqueNiveau.getTilesWithinShape(sensor);

            // Vérifiez si l'une des tuiles a la propriété 'estSolide'
            for (let j = 0; j < tiles.length; j++) {
                if (tiles[j].properties.estSolide) {
                    // Si oui, faites tourner le robot et arrêtez-le
                    this.robot.angle += angleChange;
                    this.targetRotation = this.robot.angle; // Mettez à jour la rotation cible
                    this.stopRobot = true;
                    break;
                }
            }

            // Si le robot a été arrêté, sortez de la boucle
            if (this.stopRobot) break;
        }

        for (let i = 0; i < this.asteroid.length; i++) {
            if (this.sensor1Active && Phaser.Geom.Intersects.LineToRectangle(this.sensor1, this.asteroid[i].getBounds())){
                // Si sensor1 intersecte un astéroïde, faites tourner le robot de 45 degrés vers la droite
                this.targetRotation += 45;
      
                this.stopRobot = true;
            }
            if (this.sensor2Active && Phaser.Geom.Intersects.LineToRectangle(this.sensor2, this.asteroid[i].getBounds())) {
                // Si sensor2 intersecte un astéroïde, faites tourner le robot de 45 degrés vers la gauche
                this.targetRotation -= 45;
                this.stopRobot = true;
            }
          if (this.midSensorActive && Phaser.Geom.Intersects.LineToRectangle(this.midSensor, this.asteroid[i].getBounds())){
            // Si midSensor intersecte un astéroïde, arrêtez le robot
            this.stopRobot = true;
            this.robot.angle += 180;
          }
          if (this.rightsideSensorActive && triangleIntersectsRectangle(this.rightsideSensor, this.asteroid[i].getBounds())) {
            // Si rightsideSensor intersecte un astéroïde, faites tourner le robot de 10 degrés vers la gauche
            this.robot.angle -= 10;
            // Set the flag to stop the robot
            this.stopRobot = true;
          }
          if (this.leftsideSensorActive && triangleIntersectsRectangle(this.leftsideSensor, this.asteroid[i].getBounds())) {
            // Si leftsideSensor intersecte un astéroïde, faites tourner le robot de 10 degrés vers la droite
            this.robot.angle += 10;
            // Set the flag to stop the robot
            this.stopRobot = true;
          }
          
        }
      }
    
    drawSensors(graphics) {
        this.graphics.clear();
        // Dessin des capteurs seulement si leur variable active est true
        if (this.sensor1Active) {
            this.graphics.strokeLineShape(this.sensor1);
        }
        if (this.sensor2Active) {
            this.graphics.strokeLineShape(this.sensor2);
        }
        if (this.midSensorActive) {
            this.graphics.strokeLineShape(this.midSensor);
        }
        if (this.rightsideSensorActive) {
            this.graphics.strokeTriangleShape(this.rightsideSensor);
        }
        if (this.leftsideSensorActive) {
            this.graphics.strokeTriangleShape(this.leftsideSensor);
        }
    }
    
    moveRobot(cursors) {
    
        // Rotation du robot
        let keyK = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.K);
        let keyL = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.L);
    
        if (keyK.isDown) {
            // Si la touche 'K' est enfoncée, faites tourner le robot vers la droite
            this.robot.angle += 10;
        }
        if (keyL.isDown) {
            // Si la touche 'L' est enfoncée, faites tourner le robot vers la gauche
            this.robot.angle -= 10;
        }
    

    }

    aqfuihsdg


    updateRobotVelocity() {
        let vx = 0;
        let vy = 0;
        // Only set the robot's velocity if the stop flag is not set
        if (!this.stopRobot) {
          // Calculate the velocity components based on the robot's angle
          let angleInRadians = Phaser.Math.DegToRad(this.robot.angle);
          vx = Math.cos(angleInRadians) * 100;
          vy = Math.sin(angleInRadians) * 100;
      
          // Update the robot's velocity
          this.robot.setVelocity(vx, vy);
        } else {
          // Tourner progressivement vers la direction cible
          let currentAngle = Phaser.Math.DegToRad(this.robot.angle);
          let targetAngle = Phaser.Math.DegToRad(this.robot.angle + this.targetRotation);
          let newAngle = this.lerpAngle(currentAngle, targetAngle, 0.05);
      
          this.robot.angle = Phaser.Math.RadToDeg(newAngle);
      
          // Réinitialiser la direction cible après chaque rotation
          this.targetRotation = 0;
          this.robot.setVelocity(0, 0);
        }
      }
    
    lineIntersectsTriangle(line, triangle) {
        let triangleLines = [
        new Phaser.Geom.Line(triangle.x1, triangle.y1, triangle.x2, triangle.y2),
        new Phaser.Geom.Line(triangle.x2, triangle.y2, triangle.x3, triangle.y3),
        new Phaser.Geom.Line(triangle.x3, triangle.y3, triangle.x1, triangle.y1),
        ];
    
        for (let i = 0; i < triangleLines.length; i++) {
            if (Phaser.Geom.Intersects.LineToLine(line, triangleLines[i])) {
                return true;
            }
        }
    
        return false;
    }
    
    triangleIntersectsRectangle(triangle, rectangle) {
        let rectangleLines = [
        new Phaser.Geom.Line(
            rectangle.x,
            rectangle.y,
            rectangle.x + rectangle.width,
            rectangle.y
        ),
        new Phaser.Geom.Line(
            rectangle.x,
            rectangle.y,
            rectangle.x,
            rectangle.y + rectangle.height
        ),
        new Phaser.Geom.Line(
            rectangle.x + rectangle.width,
            rectangle.y,
            rectangle.x + rectangle.width,
            rectangle.y + rectangle.height
        ),
        new Phaser.Geom.Line(
            rectangle.x,
            rectangle.y + rectangle.height,
            rectangle.x + rectangle.width,
            rectangle.y + rectangle.height
        ),
        ];
    
        for (let i = 0; i < rectangleLines.length; i++) {
            if (this.lineIntersectsTriangle(rectangleLines[i], triangle)) {
                return true;
            }
        }
    
        return false;
    }
    lerpAngle(a, b, t) {
        let delta = Phaser.Math.Angle.Wrap(b - a);
      
        // If delta > 180, go the other way instead
        if (delta > Math.PI) delta -= Math.PI * 2;
      
        return a + delta * t;
      }

    changeScene(){
        this.scene.start('GameOver');
    }
}


class Level2 extends Phaser.Scene {
    constructor() {
        super({ key: 'Level2' });
    }

    create(data) {
        // Utilisez le robot, les capteurs, etc. du niveau précédent
        this.robot = data.robot;
        this.sensors = data.sensors;
    }

}