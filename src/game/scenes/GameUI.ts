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
        const textStyle = {
            fontSize: '32px',
            color: '#fff',
            fontFamily: 'Arial', // Vous pouvez spécifier la famille de police si nécessaire
            align: 'left'
        };

        // Crée un texte pour afficher le label "Score:" en utilisant le thème de style
        this.scoreLabelText = this.add.text(0, 0, 'Score:', textStyle);

        // Crée un texte pour afficher le score du joueur en utilisant le thème de style
        this.playerScoreText = this.add.text(this.scoreLabelText.width + 10, 0, '0', textStyle);

        // Crée un conteneur pour contenir les deux textes
        this.scoreContainer = this.add.container(10, 10, [this.scoreLabelText, this.playerScoreText]);

        // Écoute l'événement 'updatePlayerScore' émis par la scène de jeu
        this.scene.get('Game').events.on('updatePlayerScore', this.updatePlayerScore, this);
    }

    updatePlayerScore(score: number) {
        this.playerScore = score;
        this.playerScoreText.setText(`${this.playerScore}`);

        // Réajuste la position du texte du score par rapport au label
        this.playerScoreText.setX(this.scoreLabelText.width + 10);

        console.log('Score updated:', this.playerScore);
    }
}