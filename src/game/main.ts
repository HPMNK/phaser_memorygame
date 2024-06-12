import { Game as MainGame } from './scenes/Game';
import { GameUI } from './scenes/GameUI';
import { AUTO, Game, Types, Math as PhaserMath } from "phaser";

const isMobile = () => window.innerWidth < 768;



//  Find out more information about the Game Config at:
//  https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
const config: Types.Core.GameConfig = {
    type: AUTO,
    width: window.innerWidth,
    height: window.innerHeight,

    parent: 'game-container',
    backgroundColor: '#028af8',
    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { x: 0, y: 300 },
            debug: false
        }
    },
    scene: [
        MainGame, GameUI
    ]
};

const StartGame = (parent: string) => {
    return new Game({ ...config, parent });
}

export default StartGame;
