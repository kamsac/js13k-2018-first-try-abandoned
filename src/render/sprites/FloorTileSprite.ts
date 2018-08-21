import SpriteBase from './SpriteBase';
import Size from '../../interfaces/Size';

export default class FloorTileSprite extends SpriteBase {
    constructor(size: Size) {
        super(size);

        this.createSprite();
    }

    protected createSprite(): void {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.strokeStyle = '#0c0800';
        this.context.lineWidth = 0.5;
        const rows: number = 3;
        const rowHeight: number = 1 / rows * this.canvasSize.height;
        for (let i = 0; i < rows; i++) {
            this.context.fillStyle = `hsl(35, 88%, ${this.getRandomTint()})`;
            this.context.fillRect(0, i * rowHeight, this.canvas.width, rowHeight);
            this.context.strokeRect(0, i * rowHeight, this.canvas.width, rowHeight);
        }
    }

    private getRandomTint(): string {
        return `${Math.random()*1+6}%`;
    }
}
