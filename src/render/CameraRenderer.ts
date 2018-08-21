import Camera from '../Camera';
import Size from '../interfaces/Size';

export default class CameraRenderer {
    public canvas!: HTMLCanvasElement;
    private context!: CanvasRenderingContext2D;

    constructor(canvasSize: Size) {
        this.createCanvas(canvasSize);
    }

    public render(worldCanvas: HTMLCanvasElement, camera: Camera): HTMLCanvasElement {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.drawImage(
            worldCanvas,
            camera.position.x - camera.rotatePoint.x, camera.position.y - camera.rotatePoint.y,
            camera.displaySize.width, camera.displaySize.height,
            0, 0,
            this.canvas.width, this.canvas.height,
        );

        return this.canvas;
    }

    private createCanvas(canvasSize: Size): void {
        this.canvas = document.createElement('canvas');
        this.context = this.canvas.getContext('2d')!;
        this.canvas.width = canvasSize.width;
        this.canvas.height = canvasSize.height;
    }
}
