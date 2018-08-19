import Size from '../interfaces/Size';

export default class LightRenderer {
    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;

    constructor(canvasSize: Size) {
        this.canvas = document.createElement('canvas');
        this.context = this.canvas.getContext('2d')!;
        this.canvas.width = canvasSize.width;
        this.canvas.height = canvasSize.height;
    }

    public getSprite(isLightOn: boolean): HTMLCanvasElement {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        if (isLightOn) {
            this.context.globalAlpha = 0.1;
            this.context.fillStyle = '#cdd';
        } else {
            this.context.globalAlpha = 0.7;
            this.context.fillStyle = '#223';
        }
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

        return this.canvas;
    }
}
