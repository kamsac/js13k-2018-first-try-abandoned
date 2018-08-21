import LightSprite from './sprites/LightSprite';
import Size from '../interfaces/Size';

export default class LightRenderer {
    private lightOnSprite: HTMLCanvasElement;
    private lightOffSprite: HTMLCanvasElement;

    constructor(size: Size) {
        this.lightOnSprite = new LightSprite(size, {isLightOn: true}).getSprite();
        this.lightOffSprite = new LightSprite(size, {isLightOn: false}).getSprite();
    }

    public render(isLightOn: boolean): HTMLCanvasElement {
        return isLightOn ? this.lightOnSprite : this.lightOffSprite;
    }
}
