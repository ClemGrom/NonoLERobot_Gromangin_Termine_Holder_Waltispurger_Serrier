const config = {
    width:1500,
    height:600,
    type: Phaser.AUTO,
    physics:{
        default:'arcade',
        arcade: {
            gravity:{x:0},
        }
    },
    scene:{
        preload:preload,
        create:create,
        update:update
    }
    
}
var game = new Phaser.Game(config);
let dude;
let cursors;
let qzsd;
let hitSound;

function preload() {
    this.load.image('wall-e', 'images/wall-e.png');
    this.load.image('background', 'images/space.jpg'); // Charger l'image de fond
    this.load.image('obstacle', 'images/petitgarfield.png');
    this.load.image('obstacle2', 'images/chad.jpg');
    this.load.image('asteroid', 'images/asteroid.png');
    this.load.audio('hit', 'images/boum.mp3'); // Charger le son 'hit'
}

function create() {

    hitSound = this.sound.add('hit'); // Ajouter le son 'hit'

    this.add.image(0, 0, 'background').setOrigin(0, 0); // Ajouter l'image de fond
    dude = this.physics.add.image(150, 50, 'wall-e');
    garfi= this.physics.add.image(300, 200, 'obstacle');
    obstacle2 = this.physics.add.staticImage(800, 500, 'obstacle2'); // Ajouter obstacle2 comme un objet statique
    dude.body.collideWorldBounds = true;
    garfi.body.collideWorldBounds = true;

    asteroid = this.physics.add.image(Phaser.Math.Between(0, 800), Phaser.Math.Between(0, 600), 'asteroid');
    asteroid.setVelocity(Phaser.Math.Between(-100, 100), Phaser.Math.Between(-100, 100));
    asteroid.setBounce(1, 1);
    asteroid.setCollideWorldBounds(true);
    
    cursors = this.input.keyboard.createCursorKeys();
    qzsd = this.input.keyboard.addKeys('Q,Z,S,D');

    this.physics.add.collider(dude, garfi); // Ajouter des collisions entre dude et garfi
    this.physics.add.collider(dude, obstacle2); // Ajouter des collisions entre dude et obstacle2
    this.physics.add.collider(garfi, obstacle2); // Ajouter des collisions entre garfi et obstacle2

    this.physics.add.collider(dude, asteroid); // Ajouter des collisions entre dude et asteroid
    this.physics.add.collider(garfi, asteroid); // Ajouter des collisions entre garfi et asteroid
    this.physics.add.collider(obstacle2, asteroid); // Ajouter des collisions entre obstacle2 et asteroid

    this.physics.add.collider(dude, garfi, function() { // Ajouter des collisions entre dude et garfi
        hitSound.play(); // Jouer le son 'hit' lors de la collision
    });
}

function update() {
    if(cursors.left.isDown){
        dude.setVelocityX(-700);}
    else if(cursors.right.isDown){
        dude.setVelocityX(700);}
    else if(cursors.up.isDown){
        dude.setVelocityY(-360);}
    else if(cursors.down.isDown){
        dude.setVelocityY(360);}

    if(qzsd.Q.isDown){
        garfi.setVelocityX(-700);}
    else if(qzsd.D.isDown){
        garfi.setVelocityX(700);}
    else if(qzsd.Z.isDown){
        garfi.setVelocityY(-360);}
    else if(qzsd.S.isDown){
        garfi.setVelocityY(360);}


        if (Phaser.Geom.Intersects.RectangleToRectangle(dude.getBounds(), asteroid.getBounds())) {
            asteroid.setVelocity(Phaser.Math.Between(-100, 100), Phaser.Math.Between(-100, 100));
        }


  
    


}