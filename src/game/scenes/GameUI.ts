import Phaser from 'phaser';

export class GameUI extends Phaser.Scene {
    private scoreContainer: Phaser.GameObjects.Container;
    private scoreLabelText: Phaser.GameObjects.Text;
    private playerScoreText: Phaser.GameObjects.Text;
    private playerScore: number = 0;

    constructor() {
        super({ key: 'GameUI' });
    }

    create() {
        // Définir un thème de style de texte commun
        const textStyle: Phaser.Types.GameObjects.Text.TextStyle = {
            fontFamily: 'Roboto Condensed',
            fontSize: '48px',
            color: '#fff',
            fontStyle: 'italic',
            stroke: '#000',
            strokeThickness: 8,
            shadow: {
                offsetX: 2,
                offsetY: 8,
                color: '#000',
                blur: 0,
                stroke: true,
                fill: true
            },
            padding: {
                left: 10,
                right: 10
            }
        };

        // Crée un texte pour afficher le label "Score:" en utilisant le thème de style
        this.scoreLabelText = this.add.text(0, 0, 'SCORE:', textStyle);

        // Crée un texte pour afficher le score du joueur en utilisant le thème de style
        this.playerScoreText = this.add.text(this.scoreLabelText.width + 10, 0, '0', textStyle);

        // Crée un conteneur pour contenir les deux textes
        this.scoreContainer = this.add.container(
            window.innerWidth / 2 - (this.scoreLabelText.width + this.playerScoreText.width) / 2
            , window.innerHeight * 0.03, [this.scoreLabelText, this.playerScoreText]);






        // Écoute l'événement 'updatePlayerScore' émis par la scène de jeu
        this.scene.get('Game').events.on('updatePlayerScore', this.updatePlayerScore, this);

        this.events.on('resize', this.resize, this);
    }

    updatePlayerScore(score: number) {
        this.playerScore = score;
        this.playerScoreText.setText(`${this.playerScore}`);

        // Réajuste la position du texte du score par rapport au label
        this.playerScoreText.setX(this.scoreLabelText.width + 10);

        console.log('Score updated:', this.playerScore);
    }

    resize() {
        this.scoreContainer.setPosition(
            window.innerWidth / 2 - (this.scoreLabelText.width + this.playerScoreText.width) / 2,
            window.innerHeight * 0.03
        );
    }
}
