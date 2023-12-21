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

var game = new Phaser.Game(config);
let robot;
let cursors;
let background;
let baterie;
let caisses;
let garfi;
let garfiSpeed = 100;
let gh;

function preload() {
  this.load.image("robot", "images/wall-e.png");
  this.load.image("background", "images/galaxie.jpg");
  this.load.image("asteroid", "images/asteroid.png");
  this.load.image("baterie", "images/petitgarfield.png");
  this.load.image("caisse", "images/chad.jpg");
  this.load.image("garfi", "images/fusee.png");
}

function create() {
  // Crée le background
  background = this.add.image(0, 0, "background");
  background.setOrigin(0, 0); // Définit l'origine du background à son coin supérieur gauche

  // Définit la taille du monde à la taille du background
  this.physics.world.setBounds(0, 0, background.width, background.height);

  // Crée le robot
  robot = this.physics.add.image(750, 300, "robot");

  // Empêche le robot de sortir des limites du monde
  robot.setCollideWorldBounds(true);


  // Fait en sorte que la caméra suive le robot
  this.cameras.main.startFollow(robot);

  // Fait en sorte que la caméra ne dépasse pas les limites du monde
  this.cameras.main.setBounds(0, 0, background.width, background.height);

  // Crée l'objet baterie
  baterie = this.physics.add.image(400, 300, "baterie");

  // Vérifie les collisions entre le robot et la baterie
  this.physics.add.overlap(robot, baterie, collectBaterie, null, this);

  caisses = this.physics.add.group({
    key: "caisse",
    repeat: 100,
    setXY: { x: 100, y: 100, stepX: 150 },
  });
  // Ajoute des collisions entre les caisses
  this.physics.add.collider(caisses, caisses);

      // Empêche les caisses de sortir du fond
      caisses.children.iterate(function(caisse) {
        caisse.setCollideWorldBounds(true);
    });

  // Vérifie les collisions entre le robot et les caisses
  this.physics.add.collider(robot, caisses, pushCaisse, null, this);

  

  // Crée les entrées de clavier pour Q, Z, S, D
  cursors = this.input.keyboard.addKeys({
    up: Phaser.Input.Keyboard.KeyCodes.Z,
    down: Phaser.Input.Keyboard.KeyCodes.S,
    left: Phaser.Input.Keyboard.KeyCodes.Q,
    right: Phaser.Input.Keyboard.KeyCodes.D,
  });

   // Crée les écouteurs d'événements pour les touches 'g' et 'h'
   gh = this.input.keyboard.addKeys('G,H');


  // Crée garfi
  garfi = this.physics.add.image(400, 300, 'garfi');

  // Définit la vitesse maximale de garfi
  garfi.setMaxVelocity(100);
}

function update() {
  // Fait bouger le robot avec les touches Q, Z, S, D
  if (cursors.left.isDown) {
    robot.setVelocityX(-500);
  } else if (cursors.right.isDown) {
    robot.setVelocityX(500);
  } else {
    robot.setVelocityX(0);
  }

  if (cursors.up.isDown) {
    robot.setVelocityY(-500);
  } else if (cursors.down.isDown) {
    robot.setVelocityY(500);
  } else {
    robot.setVelocityY(0);
  }

  // Déplace les caisses poussées par le robot
  caisses.children.iterate(function (caisse) {
    if (caisse.body.touching.left && cursors.right.isDown) {
      caisse.setVelocityX(200);
    } else if (caisse.body.touching.right && cursors.left.isDown) {
      caisse.setVelocityX(-200);
    } else if (caisse.body.touching.up && cursors.down.isDown) {
      caisse.setVelocityY(200);
    } else if (caisse.body.touching.down && cursors.up.isDown) {
      caisse.setVelocityY(-200);
    } else {
      caisse.setVelocity(0);
    }
  });
  // Modifie la vitesse de garfi lorsque 'g' ou 'h' est enfoncé
  if (gh.G.isDown) {
    garfiSpeed -= 10;
} else if (gh.H.isDown) {
    garfiSpeed += 10;
}

// Fait en sorte que garfi se déplace vers le robot
this.physics.velocityFromAngle(Phaser.Math.Angle.Between(garfi.x, garfi.y, robot.x, robot.y), garfiSpeed, garfi.body.velocity);

}

function collectBaterie(robot, baterie) {
  // Fait disparaître la baterie
  baterie.disableBody(true, true);

  // Termine la partie
  // Vous pouvez remplacer cette ligne par le code pour terminer la partie
  console.log("Partie terminée");
}

function pushCaisse(robot, caisse) {
    // Cette fonction est appelée lorsque le robot entre en collision avec une caisse
    // Vous pouvez ajouter du code ici si nécessaire

    // Détermine la direction du robot
    let robotDirection = new Phaser.Math.Vector2();
    if (cursors.left.isDown) {
        robotDirection.x = -1;
    } else if (cursors.right.isDown) {
        robotDirection.x = 1;
    }

    if (cursors.up.isDown) {
        robotDirection.y = -1;
    } else if (cursors.down.isDown) {
        robotDirection.y = 1;
    }

    // Déplace la caisse dans la direction du robot
    caisse.body.velocity.x = robotDirection.x * 200;
    caisse.body.velocity.y = robotDirection.y * 200;


    
}