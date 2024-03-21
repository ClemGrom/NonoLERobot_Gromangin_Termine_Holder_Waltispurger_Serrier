import { Scene } from 'phaser';

export class Boot extends Scene
{
    constructor ()
    {
        super('Boot');
    }

    preload ()
    {
        // La scène Boot est généralement utilisée pour charger les ressources nécessaires pour votre Preloader, comme le logo du jeu ou un arrière-plan.
        // Plus la taille des fichiers des ressources est petite, mieux c'est, car la scène Boot elle-même n'a pas de preloader.

        this.load.image('background', 'assets/bg.jpg');
    }

    create ()
    {
        this.scene.start('Preloader');
    }
}
