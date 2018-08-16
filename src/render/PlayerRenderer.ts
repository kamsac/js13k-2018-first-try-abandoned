export default class PlayerRenderer {
    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;

    constructor() {
        this.canvas = document.createElement('canvas');
        this.context = this.canvas.getContext('2d')!;
        this.canvas.height = 50;
        this.canvas.width = 50;
    }

    public getSprite(): HTMLCanvasElement {
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
