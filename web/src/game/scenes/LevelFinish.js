import { EventBus } from '../EventBus';
import { Scene } from 'phaser';
import { useRobotStore } from "../../store/robotStore";


export class LevelFinish extends Scene
{
    constructor ()
    {
        super('LevelFinish');
    }

    create() {
      
        this.scoreFinal = useRobotStore().score;
        
        this.timerFinal = useRobotStore().temps;

        this.frame = 0;
        this.cameras.main.setBackgroundColor(0x00ff00);

        this.add.image(700, 200, 'background').setAlpha(0.5);

        this.add.text(450, 80, 'Victoire', {
            fontFamily: 'Arial Black', fontSize: 64, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5).setDepth(100);

        const timerParts = this.timerFinal.split(':');
        const hours = parseInt(timerParts[0]);
        const minutes = parseInt(timerParts[1]);
        const seconds = parseInt(timerParts[2]);

        let timerText = 'Finis en : ';
        if (hours > 0) {
            timerText += hours + ' heures ';
        }
        if (minutes > 0) {
            timerText += minutes + ' minutes ';
        }
        if (seconds > 0) {
            timerText += seconds + ' secondes';
        }

        this.add.text(480, 200, timerText, {
            fontFamily: 'Arial Black', fontSize: 48, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5).setDepth(100);

        this.add.text(450, 300, 'Score : ' + this.scoreFinal, {
            fontFamily: 'Arial Black', fontSize: 48, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5).setDepth(100);

        EventBus.emit('current-scene-ready', this);
    }

    update() {
        this.frame++;
        if (this.frame === 200) {
            this.changeScene();
        }
    }

    changeScene = () => {
        // Stop la scène actuelle
        this.scene.stop('LevelFinish');
        this.currentSceneIndex = parseInt(localStorage.getItem('currentSceneIndex'));
        const scenes = ['Niveau1', 'Niveau2', 'Niveau3', 'Niveau4', 'Niveau5'];
    
        // Stop toutes les scènes actives
        scenes.forEach(scene => {
            if (this.scene.isActive(scene)) {
                this.scene.stop(scene);
            }
        });
    
        const nextSceneIndex = (this.currentSceneIndex + 1) % scenes.length;
        const nextScene = scenes[nextSceneIndex];
        this.scene.start(nextScene);
    };
}