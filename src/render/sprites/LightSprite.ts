import Size from '../../interfaces/Size';
import SpriteBase from './SpriteBase';
import LightSpriteOptions from '../../interfaces/LightSpriteOptions';

export default class LightSprite extends SpriteBase {
    constructor(canvasSize: Size, options: LightSpriteOptions) {
        super(canvasSize, options);

        this.createSprite(options);
    }

    protected createSprite(options: LightSpriteOptions): HTMLCanvasElement {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        if (options.isLightOn) {
            this.context.globalAlpha = 0.01;
            this.context.fillStyle = '#cdd';
        } else {
            this.context.globalAlpha = 0.7;
            this.context.fillStyle = '#223';
        }
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

        return this.canvas;
    }
}
