import Size from '../../interfaces/Size';

export default abstract class SpriteBase {
    protected canvas: HTMLCanvasElement;
    protected context: CanvasRenderingContext2D;
    protected canvasSize: Size;

    constructor(canvasSize: Size, spriteOptions?: any) {
        this.canvas = document.createElement('canvas');
        this.context = this.canvas.getContext('2d')!;
        this.canvasSize = canvasSize;
        this.canvas.width = canvasSize.width;
        this.canvas.height = canvasSize.height;
    }

    public getSprite() {
        return this.canvas;
    }

    protected abstract createSprite(variantOptions?: unknown): void;
}
