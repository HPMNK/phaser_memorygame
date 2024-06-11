import { Scene } from 'phaser';
import { GameUI } from './GameUI'; // Importation de la scène GameUI
import { EventBus } from '../EventBus';
import Phaser from 'phaser';

export class Game extends Phaser.Scene {
    private cards: Phaser.GameObjects.Sprite[] = [];
    private firstCard: Phaser.GameObjects.Sprite | null = null;
    private secondCard: Phaser.GameObjects.Sprite | null = null;
    private canFlip: boolean = true;
    private playerScore: number = 0; // Compteur de score
    private baseScore: number = 100; // Score de base pour chaque paire trouvée
    private cardTextures = [0, 1, 2, 3]; // Indices des cartes dans le spritesheet
    private cardBackIndex = 4; // Index du dos de la carte dans le spritesheet

    constructor() {
        super({ key: 'Game' });
    }

    preload() {
        this.load.spritesheet('cards', 'assets/cards.png', { frameWidth: 48, frameHeight: 64 });
    }

    create() {
        this.scene.launch('GameUI'); // Lancement de la scène GameUI

        // Écouter l'événement "start" de la scène GameUI pour s'assurer qu'elle est prête
        this.scene.get('GameUI').events.on('start', () => {
            const screenWidth = this.scale.width;
            const screenHeight = this.scale.height;

            const numCols = 4;
            const numRows = 2;
            const spacing = 20; // Espacement entre les cartes

            const cardWidth = 144;
            const cardHeight = 192;
            const cardScaleX = cardWidth / 48;
            const cardScaleY = cardHeight / 64;

            const offsetX = (screenWidth - (cardWidth * numCols + spacing * (numCols - 1))) / 2;
            const offsetY = (screenHeight - (cardHeight * numRows + spacing * (numRows - 1))) / 2;

            const positions = Phaser.Utils.Array.Shuffle([
                ...this.cardTextures, ...this.cardTextures
            ]);

            for (let i = 0; i < positions.length; i++) {
                const col = i % numCols;
                const row = Math.floor(i / numCols);
                const x = offsetX + col * (cardWidth + spacing) + cardWidth / 2;
                const y = offsetY + row * (cardHeight + spacing) + cardHeight / 2;

                const card = this.add.sprite(x, y, 'cards', this.cardBackIndex).setInteractive();
                card.setData('cardType', positions[i]);
                card.setScale(cardScaleX, cardScaleY);
                card.texture.setFilter(Phaser.Textures.FilterMode.NEAREST);
                this.cards.push(card);
                card.on('pointerdown', () => this.onCardClicked(card));
            }
        });
    }

    onCardClicked(card: Phaser.GameObjects.Sprite) {
        if (!this.canFlip || card === this.firstCard || card === this.secondCard || !card.input?.enabled) return;

        this.flipCard(card);

        if (!this.firstCard) {
            this.firstCard = card;
        } else if (!this.secondCard) {
            this.secondCard = card;
            this.checkForMatch();
        }
    }

    flipCard(card: Phaser.GameObjects.Sprite) {
        this.tweens.add({
            targets: card,
            scaleX: 0,
            duration: 150,
            ease: 'Linear',
            onComplete: () => {
                card.setTexture('cards', card.getData('cardType'));
                this.tweens.add({
                    targets: card,
                    scaleX: card.scaleY, // Retrouver la taille d'origine
                    duration: 150,
                    ease: 'Linear'
                });
            }
        });
    }

    checkForMatch() {
        if (!this.firstCard || !this.secondCard) return;

        this.canFlip = false;

        if (this.firstCard.getData('cardType') === this.secondCard.getData('cardType')) {
            // Les cartes correspondent, les rendre non interactables
            this.firstCard.removeInteractive();
            this.secondCard.removeInteractive();
            this.playerScore += this.baseScore;



            // Émettre l'événement après s'être assuré que la scène GameUI est prête
            this.events.emit('updatePlayerScore', this.playerScore);
            this.firstCard = null;
            this.secondCard = null;
            this.canFlip = true;
        } else {
            // Les cartes ne correspondent pas, les retourner après un délai
            this.time.delayedCall(700, () => {
                if (this.firstCard) {
                    this.flipBackCard(this.firstCard);
                }
                if (this.secondCard) {
                    this.flipBackCard(this.secondCard);
                }
                this.firstCard = null;
                this.secondCard = null;
                this.canFlip = true;
            });
        }
    }

    flipBackCard(card: Phaser.GameObjects.Sprite) {
        this.tweens.add({
            targets: card,
            scaleX: 0,
            duration: 150,
            ease: 'Linear',
            onComplete: () => {
                card.setTexture('cards', this.cardBackIndex);
                this.tweens.add({
                    targets: card,
                    scaleX: card.scaleY, // Retrouver la taille d'origine
                    duration: 150,
                    ease: 'Linear'
                });
            }
        });
    }
}