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
    ],
    scale: {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH
    }
};


const StartGame = (parent: string) => {
    const game = new Game({ ...config, parent });
    const resize = () => {
        const newWidth = window.innerWidth;
        const newHeight = window.innerHeight;
        game.scale.resize(newWidth, newHeight);
        game.scene.scenes.forEach(scene => {
            scene.events.emit('resize', { width: newWidth, height: newHeight });
        });
    };

    window.addEventListener('resize', resize);

    // Ajout d'une vérification périodique pour les redimensionnements non détectés
    setInterval(resize, 500);

    return game;
};
export default StartGame;
