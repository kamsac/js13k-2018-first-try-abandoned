import Size from './interfaces/Size';
import World from './World';
import Renderer from './interfaces/GameRenderer';
import WorldEntity from './WorldEntity';

export default class CanvasRenderer implements Renderer {
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
        this.renderPlayer(world.entities.player);
    }

    private renderPlayer(player: WorldEntity): void {
        this.context.beginPath();
        this.context.arc(player.position.x, player.position.y, 10, 0, Math.PI*2);
        this.context.fillStyle = '#4c4';
        this.context.fill();
    }

    private clearCanvas(): void {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
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
