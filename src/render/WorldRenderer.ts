import Size from '../interfaces/Size';
import World from '../World';
import WorldEntity from '../WorldEntity';
import PlayerSprite from './sprites/PlayerSprite';
import MainCharacter from '../MainCharacter';
import WallRenderer from './WallRenderer';
import Room from '../Room';
import LightRenderer from './LightRenderer';
import FloorSprite from './sprites/FloorSprite';
import drawImage from "../helpers/drawImage";

export default class WorldRenderer {
    public canvas!: HTMLCanvasElement;
    private context!: CanvasRenderingContext2D;
    private playerSprite: PlayerSprite;
    private lightRenderer: LightRenderer;
    private floorSprite: FloorSprite;

    public constructor(canvasSize: Size) {
        this.createCanvas(canvasSize);

        this.playerSprite = new PlayerSprite();
        this.lightRenderer = new LightRenderer(canvasSize);
        this.floorSprite = new FloorSprite(canvasSize);
    }

    public render(world: World): HTMLCanvasElement {
        this.resetTransform();
        this.clearCanvas();

        this.renderFloor();
        this.renderPlayer(world.entities.player);
        this.renderWalls(world.rooms);
        this.renderLight(world.isLightOn);

        return this.canvas;
    }

    private resetTransform(): void {
        this.context.setTransform(1,0,0,1,0,0);
    }

    private renderFloor(): void {
        this.context.drawImage(this.floorSprite.getSprite(), 0, 0);
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
        this.renderWorldEntity(player, this.playerSprite.getSprite());
    }

    private renderWorldEntity(worldEntity: WorldEntity, sprite: HTMLCanvasElement) {
        drawImage(this.context, sprite, worldEntity.position.x, worldEntity.position.y, 1, worldEntity.rotation.angle());
    }

    private renderLight(isLightOn: boolean): void {
        this.context.drawImage(
            this.lightRenderer.render(isLightOn),
            0, 0,
            this.canvas.width, this.canvas.height,
        );
    }

    private clearCanvas(): void {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    private createCanvas(canvasSize: Size): void {
        this.canvas = document.createElement('canvas');
        this.context = this.canvas.getContext('2d')!;
        this.canvas.width = canvasSize.width;
        this.canvas.height = canvasSize.height;
    }
}
