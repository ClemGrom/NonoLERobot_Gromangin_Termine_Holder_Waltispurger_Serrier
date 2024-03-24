import { Boot } from './scenes/Boot';
import { Niveau1 } from './scenes/Niveau1';
import { GameOver } from './scenes/GameOver';
import { MainMenu } from './scenes/MainMenu';
import Phaser from 'phaser';
import { Preloader } from './scenes/Preloader';
import { Niveau2 } from './scenes/Niveau2.js';
import { Niveau3 } from './scenes/Niveau3.js';
import { NiveauTest } from './scenes/NiveauTest.js';

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
        GameOver,
        NiveauTest
    ]
};

const StartGame = (parent) => {

    return new Phaser.Game({...config, parent: parent});
}

export default StartGame;