import Size2D from './interfaces/Size2D';
import World from './interfaces/World';
import GameRenderer from './interfaces/WorldRenderer';

export default class CanvasGameRenderer implements GameRenderer {
    private canvas!: HTMLCanvasElement;
    private context!: CanvasRenderingContext2D;

    public constructor() {
        this.createCanvas();
        this.setResolution({
            width: 800,
            height: 600,
        });
        this.attachCanvas();
    }

    public render(world: World): void {
        this.clearCanvas();

        world.entities.forEach((entity) => {
            //
        });


    }

    private clearCanvas(): void {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    private setResolution(dimensions: Size2D) {
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
