import { EventBus } from '../EventBus';
import { Scene } from 'phaser';

export class LevelFinish extends Scene
{
    constructor ()
    {
        super('LevelFinish');
    }

    create() {
        this.scoreFinal = parseInt(localStorage.getItem('score'));

        this.frame = 0;
        this.cameras.main.setBackgroundColor(0x00ff00);

        this.add.image(700, 200, 'background').setAlpha(0.5);

        if (this.scoreFinal !== 0) {
            this.add.text(450, 130, 'Victoire', {
                fontFamily: 'Arial Black', fontSize: 64, color: '#ffffff',
                stroke: '#000000', strokeThickness: 8,
                align: 'center'
            }).setOrigin(0.5).setDepth(100);

            this.add.text(450, 250, `Score : ${this.scoreFinal}`, {
                fontFamily: 'Arial Black', fontSize: 48, color: '#ffffff',
                stroke: '#000000', strokeThickness: 8,
                align: 'center'
            }).setOrigin(0.5).setDepth(100);
        } else {
            this.add.text(450, 200, 'Victoire', {
                fontFamily: 'Arial Black', fontSize: 64, color: '#ffffff',
                stroke: '#000000', strokeThickness: 8,
                align: 'center'
            }).setOrigin(0.5).setDepth(100);
        }

        EventBus.emit('current-scene-ready', this);
    }

    update() {
        this.frame++;
        if (this.frame === 200) {
            this.changeScene();
        }
    }

    changeScene = () => {
        // Stop the current scene
        this.scene.stop('LevelFinish');
        this.currentSceneIndex = parseInt(localStorage.getItem('currentSceneIndex'));
        const scenes = ['Niveau1', 'Niveau2', 'Niveau3', 'Niveau4', 'Niveau5'];
        const nextSceneIndex = (this.currentSceneIndex + 1) % scenes.length;
        const nextScene = scenes[nextSceneIndex];
        this.scene.start(nextScene);
    };
}