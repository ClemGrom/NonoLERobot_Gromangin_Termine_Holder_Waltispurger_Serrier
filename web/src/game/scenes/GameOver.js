import { EventBus } from '../EventBus';
import { Scene } from 'phaser';

export class GameOver extends Scene
{
    constructor ()
    {
        super('GameOver');
    }

    create ()
    {
        this.frame = 0;
        this.cameras.main.setBackgroundColor(0xff0000);

        this.add.image(700, 200, 'background').setAlpha(0.5);

        const gameOverText = this.add.text(500, 180, 'Game Over', {
            fontFamily: 'Arial Black', fontSize: 64, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5).setDepth(100);

        gameOverText.setInteractive();
        gameOverText.on('pointerdown', () => this.changeSceneInGameOver());

        EventBus.emit('current-scene-ready', this);
    }

    update() {
        this.frame++;
        if (this.frame === 200) {
            this.scene.start('MainMenu');
        }
    }

    changeSceneInGameOver ()
    {
        this.scene.start('MainMenu');
    }
}