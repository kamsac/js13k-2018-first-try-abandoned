import MainCharacter from '../../MainCharacter';
import SpriteBase from './SpriteBase';

export default class PlayerSprite extends SpriteBase {
    constructor() {
        super({
            width: MainCharacter.sizeRadius * 2,
            height: MainCharacter.sizeRadius * 2,
        });

        this.createSprite();
    }

    protected createSprite(): HTMLCanvasElement {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.context.beginPath();
        this.context.fillStyle = '#4c4';
        this.context.strokeStyle = '#000';
        this.context.lineWidth = 5;
        this.context.arc(this.canvas.width / 2, this.canvas.height / 2, this.canvas.width / 2 - this.context.lineWidth / 2, 0, Math.PI*2);
        this.context.fill();
        this.context.lineTo(this.canvas.width / 2, this.canvas.height / 2);
        this.context.stroke();

        return this.canvas;
    }
}
