import { EventBus } from "../EventBus";
import { Scene } from "phaser";
import synaptic from "synaptic";

export class Synaptic extends Scene {
    constructor() {
        super("Synaptic");

        this.frameCount = 0;

        // Initialisation des capteurs actifs ou non
        this.sensor1Active = true;
        this.sensor2Active = true;

        // Initialisation des longueurs des capteurs en dur pas variable modifiable par l'utilisateur
        //action sur les capteurs
        this.maxlongueurSensor1 = 100;
        this.maxlongueurSensor2 = 100;
        localStorage.setItem("maxlongueurSensor1", this.maxlongueurSensor1);
        localStorage.setItem("maxlongueurSensor2", this.maxlongueurSensor2);
        localStorage.setItem("tailleSensorDroit", this.maxlongueurSensor1);
        localStorage.setItem("tailleSensorGauche", this.maxlongueurSensor2);
        this.longueurSensor1 = 0;
        this.longueurSensor2 = 0;

        //Capteurs
        this.sensor1 = null;
        this.sensor2 = null;

        //calcule des angles avec synaptic /////////////////////////////////////////////////////////////////////////////////////////////////

// Fonction pour mapper les valeurs normalisées dans une plage donnée
        const mapValueToRange = (value, min, max) => {
            return (max - min) * value + min;
        };

// Définition des poids des connexions entre la couche d'entrée et la couche cachée
        const inputHiddenWeights = [
            [localStorage.getItem('weigthA') || "0", localStorage.getItem('weigthB') || "0"], // Poids pour la première connexion entre l'entrée et le neurone caché 1
            [localStorage.getItem('weigthC') || "0", localStorage.getItem('weigthD') || "0"]  // Poids pour la deuxième connexion entre l'entrée et le neurone caché 2
        ];
        console.log("Poids des connexions entre l'entrée et la couche cachée:", inputHiddenWeights);
// Définition des valeurs des capteurs
        const sensorValues = [0.5,0.5];

// Calcul des entrées pondérées par les poids des connexions
        const inputs = inputHiddenWeights.map((weights, index) => {
            return sensorValues.reduce((acc, value, i) => {
                return acc + value * weights[i];
            }, 0);
        });

// Normalisation des valeurs des entrées
        const minInputValue = -1; // Valeur minimale des entrées
        const maxInputValue = 1; // Valeur maximale des entrées
        const normalizedInputs = inputs.map(input => {
            return (input - minInputValue) / (maxInputValue - minInputValue);
        });

// Définition des angles minimum et maximum
        const minAngle = -90; // Angle minimum
        const maxAngle = 90; // Angle maximum

// Calcul des angles à partir des valeurs normalisées des entrées
        const mappedAngles = normalizedInputs.map(input => {
            return mapValueToRange(input, minAngle, maxAngle);
        });

// Affichage des angles calculés
        console.log("Angles calculés:", mappedAngles);



        // Initialisation des angles des capteurs
        //sert aussi à faire tourner le robot plus tard dans le code fonction : checkSensorIntersections()
        this.degresSensorGauche = localStorage.getItem("degresGauche") || 90;
        this.degresSensorDroit = localStorage.getItem("degresDroit") || -90;


        // Initialisation de la vitesse du robot
        this.vitesseRobot = 100;

        // Initialisation de la santé du robot
        this.health = 4;

        // Initialisation des angles des capteurs par défaut
        this.defaultangleGauche = 45;
        this.defaultangleDroit = 45;
    }

    create() {
        this.carteDuNiveau = this.make.tilemap({ key: "niveau3" });

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

        //
        // Batteries
        //
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

        // Créez l'objet graphics  pour la vie
        this.vieGraphics = this.add.graphics({
            lineStyle: { width: 2, color: 0x00ff00 },
            fillStyle: { color: 0xff0000 },
        });

        // Dessinez la barre de santé initiale
        this.drawHealthBar();

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
            if (this.longueurMidSensor < this.maxlongueurMidSensor) {
                this.longueurMidSensor += 5;
            }
            if (!this.stopEnergy) {
                this.consumeEnergy();
            }
        }

        if (
            this.robot.x > 640 &&
            this.robot.x < 704 &&
            this.robot.y > 160 &&
            this.robot.y < 224
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

    // Dessine la barre de santé du robot
    drawHealthBar() {
        // Efface la barre de santé précédente
        this.vieGraphics.clear();

        // Calcule le nombre de barres de santé à dessiner
        let healthBars = Math.floor(this.energy / 20);

        // Dessine la nouvelle barre de santé
        for (let i = 0; i < healthBars; i++) {
            this.vieGraphics.fillStyle(0xff0000); // Red color
            this.vieGraphics.fillRect(925 - i * 20, 5, 15, 15);
        }
    }

    // Consomme de l'énergie à chaque frame
    consumeEnergy() {
        this.energy -= 1;
        // Si l'énergie est inférieure ou égale à 0, arrête le robot
        if (this.energy <= 0) {
            this.stopEnergy = true;
            this.scene.start("GameOver");
        }
    }
    changeScene() {
        this.stopEnergy = true;
        this.scene.start("Niveau4");
    }
}
