import Point from '../helpers/Point';
import Size from '../interfaces/Size';

export default class FogOfWarRenderer {
    public canvas!: HTMLCanvasElement;
    private context!: CanvasRenderingContext2D;

    constructor(canvasSize: Size) {
        this.createCanvas(canvasSize);
    }

    render(polygon: Point[]): HTMLCanvasElement {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

        if (polygon.length) {
            this.context.fillStyle = '#fff';
            this.context.beginPath();
            this.context.moveTo(polygon[0].x, polygon[0].y);
            for (let i = 1; i < polygon.length; i++) {
                this.context.lineTo(polygon[i].x, polygon[i].y);
            }
            this.context.fill();
        }

        return this.canvas;
    };

    private createCanvas(canvasSize: Size): void {
        this.canvas = document.createElement('canvas');
        this.context = this.canvas.getContext('2d')!;
        this.canvas.width = canvasSize.width;
        this.canvas.height = canvasSize.height;
    }
}
