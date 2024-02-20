import { Boot } from './scenes/Boot';
import { Game } from './scenes/Game';
import { GameOver } from './scenes/GameOver';
import { MainMenu } from './scenes/MainMenu';
import Phaser from 'phaser';
import { Preloader } from './scenes/Preloader';
import { Niveau2 } from './scenes/Niveau2.js';

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
        Game,
        Niveau2,
        GameOver,
    ]
};

const StartGame = (parent) => {

    return new Phaser.Game({...config, parent: parent});
}

export default StartGame;