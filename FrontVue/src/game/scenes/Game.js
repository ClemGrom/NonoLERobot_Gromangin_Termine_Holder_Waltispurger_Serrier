import { EventBus } from '../EventBus';
import { Scene } from 'phaser';

export class Game extends Scene
{
    constructor ()
    {
        super('Game');
        this.robot = null;
        this.asteroid = [];
        this.sensor1 = null;
        this.sensor2 = null;
        this.midSensor = null;
        this.rightsideSensor = new Phaser.Geom.Triangle();
        this.leftsideSensor = new Phaser.Geom.Triangle();
        this.graphics = null;
        this.stopRobot = false;
        this.sensor1Active = true;
        this.sensor2Active = true;
        this.midSensorActive = true;
        this.rightsideSensorActive = false;
        this.leftsideSensorActive = false;
        this.cursors = null;
    }

    create() {

        // Image de fond
        this.add.image(700, 200, 'background').setAlpha(0.5);

        // Créer le robot à une position aléatoire
        let robotX = Phaser.Math.Between(50, this.physics.world.bounds.width - 50);
        let robotY = Phaser.Math.Between(50, this.physics.world.bounds.height - 50);
        this.robot = this.physics.add.image(robotX, robotY, "robot");
        
        // Robot ne peut pas sortir du monde
        this.robot.setCollideWorldBounds(true);

        // Comme un calque le robot est au dessus
        this.robot.setDepth(1);

        for (let i = 0; i < 5; i++) {
            // Créer les astéroïdes à des positions aléatoires, en évitant les 50 pixels près des bords
            let asteroidX = Phaser.Math.Between(50, this.physics.world.bounds.width - 50);
            let asteroidY = Phaser.Math.Between(50, this.physics.world.bounds.height - 50);
            let newAsteroid = this.physics.add.image(asteroidX, asteroidY, "asteroide");
            this.asteroid.push(newAsteroid);
        }

        // Créez les capteurs comme des lignes
        this.sensor1 = new Phaser.Geom.Line();
        this.sensor2 = new Phaser.Geom.Line();
        this.midSensor = new Phaser.Geom.Line();
        this.rightsideSensor = new Phaser.Geom.Triangle.BuildEquilateral(
            this.robot.x,
            this.robot.y,
            100
        );
        this.leftsideSensor = new Phaser.Geom.Triangle.BuildEquilateral(
            this.robot.x,
            this.robot.y,
            100
        );

        // Créez l'objet graphics
        this.graphics = this.add.graphics({ lineStyle: { width: 2, color: 0x00ff00 } });

        // Crée les entrées de clavier pour Q, Z, S, D
        this.cursors = this.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.Z,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            left: Phaser.Input.Keyboard.KeyCodes.Q,
            right: Phaser.Input.Keyboard.KeyCodes.D,
            k: Phaser.Input.Keyboard.KeyCodes.K,
            l: Phaser.Input.Keyboard.KeyCodes.L,
        });

        this.robot.setVelocityX(100);

        EventBus.emit('current-scene-ready', this); 
    }

    update() {
        // Déplace le robot en fonction des entrées de l'utilisateur
        this.moveRobot(this.cursors);
    
        // Vérifie si les capteurs du robot intersectent un obstacle
        this.checkSensorIntersections();
    
        // Met à jour la position des capteurs du robot
        this.updateSensors();
    
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
            //200 à la fin est la longueur du capteur
            Phaser.Geom.Line.SetToAngle(this.sensor1, this.robot.x, this.robot.y, angle1, 200);
        }
        if (this.sensor2Active) {
            Phaser.Geom.Line.SetToAngle(this.sensor2, this.robot.x, this.robot.y, angle2, 100);
        }
        if (this.midSensorActive) {
            Phaser.Geom.Line.SetToAngle(this.midSensor, this.robot.x, this.robot.y, angleMid, 100);
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
        for (let i = 0; i < this.asteroid.length; i++) {
        if (
            this.sensor1Active &&
            Phaser.Geom.Intersects.LineToRectangle(this.sensor1, this.asteroid[i].getBounds())
        ) {
            // If sensor1 intersects the asteroid, rotate the robot 10 degrees to the right
            this.robot.angle += 10;
            // Set the flag to stop the robot
            this.stopRobot = true;
        }
        if (
            this.sensor2Active &&
            Phaser.Geom.Intersects.LineToRectangle(this.sensor2, this.asteroid[i].getBounds())
        ) {
            // If sensor2 intersects the asteroid, rotate the robot 10 degrees to the left
            this.robot.angle -= 10;
            // Set the flag to stop the robot
            this.stopRobot = true;
        }
        if (
            this.midSensorActive &&
            Phaser.Geom.Intersects.LineToRectangle(this.midSensor, this.asteroid[i].getBounds())
        ) {
            // Si midSensor intersecte un astéroïde, arrêtez le robot
            this.stopRobot = true;
            this.robot.angle += 180;
        }
        if (
            this.rightsideSensorActive &&
            triangleIntersectsRectangle(this.rightsideSensor, this.asteroid[i].getBounds())
        ) {
            // Si rightsideSensor intersecte un astéroïde, faites tourner le robot de 10 degrés vers la gauche
            this.robot.angle -= 10;
            // Set the flag to stop the robot
            this.stopRobot = true;
        }
        if (
            this.leftsideSensorActive &&
            this.triangleIntersectsRectangle(this.leftsideSensor, this.asteroid[i].getBounds())
        ) {
            // Si leftsideSensor intersecte un astéroïde, faites tourner le robot de 10 degrés vers la droite
            this.robot.angle += 10;
            // Set the flag to stop the robot
            this.stopRobot = true;
        }
        }
    }
    
    drawSensors(graphics) {
        graphics.clear();
        // Dessin des capteurs seulement si leur variable active est true
        if (this.sensor1Active) {
        graphics.strokeLineShape(this.sensor1);
        }
        if (this.sensor2Active) {
        graphics.strokeLineShape(this.sensor2);
        }
        if (this.midSensorActive) {
        graphics.strokeLineShape(this.midSensor);
        }
        if (this.rightsideSensorActive) {
        graphics.strokeTriangleShape(this.rightsideSensor);
        }
        if (this.leftsideSensorActive) {
        graphics.strokeTriangleShape(this.leftsideSensor);
        }
    }
    
    moveRobot(cursors) {
        // Fait bouger le robot avec les touches Q, Z, S, D
        this.robot.setVelocity(0);
        if (cursors.left.isDown) this.robot.setVelocityX(-500);
        if (cursors.right.isDown) this.robot.setVelocityX(500);
        if (cursors.up.isDown) this.robot.setVelocityY(-500);
        if (cursors.down.isDown) this.robot.setVelocityY(500);
    
        if (cursors.k.isDown) {
        // Si la touche 'K' est enfoncée, faites tourner le robot vers la droite
        this.robot.angle += 10;
        }
        if (cursors.l.isDown) {
        // Si la touche 'L' est enfoncée, faites tourner le robot vers la gauche
        this.robot.angle -= 10;
        }
    }
    
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

    changeScene ()
    {
        this.scene.start('GameOver');
    }
}