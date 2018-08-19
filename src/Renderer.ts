import Size from './interfaces/Size';
import World from './World';
import WorldEntity from './WorldEntity';
import PlayerRenderer from './render/PlayerRenderer';
import MainCharacter from './MainCharacter';
import WallRenderer from './render/WallRenderer';
import Room from './Room';
import LightRenderer from './render/LightRenderer';

const canvasSize: Size = {
    width: 800,
    height: 600,
};

export default class Renderer {
    public canvas!: HTMLCanvasElement;
    private context!: CanvasRenderingContext2D;
    private playerRenderer: PlayerRenderer = new PlayerRenderer();
    private lightRenderer: LightRenderer;

    public constructor() {
        this.createCanvas();
        this.setResolution(canvasSize);
        this.attachCanvas();

        this.lightRenderer = new LightRenderer(canvasSize);
    }

    public render(world: World): void {
        this.resetTransform();
        this.clearCanvas();

        this.renderPlayer(world.entities.player);
        this.renderWalls(world.rooms);
        this.renderLight(world.isLightOn);
    }

    private resetTransform(): void {
        this.context.setTransform(1,0,0,1,0,0);
    }

    private renderWalls(rooms: Room[]): void {
        this.resetTransform();
        rooms.forEach((room) => {
            room.walls.forEach((wall) => {
                WallRenderer.render(this.context, wall);
            });
        });
    }

    private renderPlayer(player: MainCharacter): void {
        this.renderWorldEntity(player, this.playerRenderer.getSprite());
    }

    private drawImage(image: HTMLCanvasElement, x: number, y: number, scale: number, rotation: number): void {
        this.context.setTransform(scale, 0, 0, scale, x, y); // sets scale and origin
        this.context.rotate(rotation);
        this.context.drawImage(image, -image.width / 2, -image.height / 2);
    }

    private renderWorldEntity(worldEntity: WorldEntity, sprite: HTMLCanvasElement) {
        this.drawImage(sprite, worldEntity.position.x, worldEntity.position.y, 1, worldEntity.rotation.angle());
    }

    private renderLight(isLightOn: boolean): void {
        this.context.drawImage(
            this.lightRenderer.getSprite(isLightOn),
            0, 0,
            this.canvas.width, this.canvas.height,
        );
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
