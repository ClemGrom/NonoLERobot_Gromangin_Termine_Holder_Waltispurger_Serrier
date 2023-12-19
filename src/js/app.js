const config = {
    width:1650,
    height:600,
    type: Phaser.AUTO,
    physics:{
        default:'arcade',
        arcade: {
            gravity:{y:30},
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




function preload() {
    this.load.image('garfield', 'images/chad.jpg');
    

 
}
function create() {
    console.log(this);
    dude =this.physics.add.image(150, 50, 'garfield');
    dude.body.collideWorldBounds = true;
    cursors = this.input.keyboard.createCursorKeys();

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


}