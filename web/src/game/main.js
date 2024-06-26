import { Boot } from './scenes/Boot';
import { Niveau1 } from './scenes/Niveau1';
import { GameOver } from './scenes/GameOver';
import { MainMenu } from './scenes/MainMenu';
import Phaser from 'phaser';
import { Preloader } from './scenes/Preloader';
import { Niveau2 } from './scenes/Niveau2.js';
import { Niveau3 } from './scenes/Niveau3.js';
import { Niveau4 } from './scenes/Niveau4.js';
import { Niveau5 } from './scenes/Niveau5.js';
import { NiveauTest } from './scenes/NiveauTest.js';
import { LevelFinish } from './scenes/LevelFinish.js';

const config = {
    type: Phaser.AUTO,
    width:960,
    height:384,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { x : 0 }
        }
    },
    parent: 'game-container',
    backgroundColor: '#028af8',
    scene: [
        Boot,
        Preloader,
        MainMenu,
        Niveau1,
        Niveau2,
        Niveau3,
        Niveau4,
        Niveau5,
        GameOver,
        LevelFinish,
        NiveauTest
    ]
};

const StartGame = (parent) => {

    return new Phaser.Game({...config, parent: parent});
}

export default StartGame;