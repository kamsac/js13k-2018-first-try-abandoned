import Size from '../../interfaces/Size';
import FloorTileSprite from './FloorTileSprite';
import SpriteBase from './SpriteBase';
import drawImage from '../../helpers/drawImage';

const floorSize: Size = {
    width: 25,
    height: 25,
};

export default class FloorSprite extends SpriteBase {
    private floorSpriteVariants: HTMLCanvasElement[];

    constructor(size: Size) {
        super(size);

        this.floorSpriteVariants = [];

        for(let i = 0; i < 20; i++) {
            this.floorSpriteVariants[i] = new FloorTileSprite(floorSize).getSprite();
        }

        this.createSprite();
    }

    public createSprite(): void {
        this.context.fillStyle = '#0c0800';
        this.context.fillRect(0,0, this.canvas.width, this.canvas.height);
        let tileRotation = 0;
        let tileRotationRandomVariant = 0.02;
        for (let y = 0; y < this.canvas.height; y += floorSize.height) {
            for (let x = 0; x < this.canvas.width; x += floorSize.width) {
                const sprite: HTMLCanvasElement = this.getRandomSpriteVariant();
                tileRotation += Math.PI / 2;
                drawImage(
                    this.context, sprite,
                    x + floorSize.width / 2,
                    y + floorSize.height / 2,
                    1, tileRotation + tileRotationRandomVariant
                );
            }
        }
    };

    private getRandomSpriteVariant(): HTMLCanvasElement {
        return this.floorSpriteVariants[Math.floor(Math.random() * this.floorSpriteVariants.length)];
    }
}
