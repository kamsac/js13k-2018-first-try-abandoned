import Size from './interfaces/Size';
import World from './World';
import CameraRenderer from './render/CameraRenderer';
import WorldRenderer from './render/WorldRenderer';
import drawImage from './helpers/drawImage';

const canvasSize: Size = {
    width: 800,
    height: 600,
};

export default class GameRenderer {
    public canvas!: HTMLCanvasElement;
    private context!: CanvasRenderingContext2D;
    private worldRenderer: WorldRenderer;
    private cameraRenderer: CameraRenderer;

    public constructor() {
        this.createCanvas();
        this.setResolution(canvasSize);
        this.attachCanvas();

        this.worldRenderer = new WorldRenderer(World.size);
        this.cameraRenderer = new CameraRenderer(canvasSize);
    }

    public render(world: World): void {
        this.clearCanvas();
        const worldCanvas: HTMLCanvasElement = this.worldRenderer.render(world);
        const cameraCanvas: HTMLCanvasElement = this.cameraRenderer.render(worldCanvas, world.entities.camera);
        drawImage(this.context, cameraCanvas, this.canvas.width / 2, this.canvas.height / 2, 1, 0);
    }

    private clearCanvas(): void {
        this.context.setTransform(1,0,0,1,0,0);
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.fillStyle = '#111';
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    private setResolution(dimensions: Size) {
        this.canvas.width = dimensions.width;
        this.canvas.height = dimensions.height;
    }

    private createCanvas(): void {
        this.canvas = document.createElement('canvas');
        this.context = this.canvas.getContext('2d')!;
    }

    private attachCanvas(): void {
        document.body.appendChild(this.canvas);
    }
}
