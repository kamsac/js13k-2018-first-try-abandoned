import Stats from 'stats.js';
import Renderer from './Renderer';
import World from './World';
import KeyboardAndMouseGameInput from './KeyboardAndMouseGameInput';
import Locator from './Locator';
import GameInput from './interfaces/GameInput';

export default class Game {
    private readonly ticksPerSecond: number;
    private readonly tickTime: number; // ms
    private lastTickTime: number; // ms
    private currentUpdateLag: number; // ms
    private readonly maxUpdateLag: number; // ms
    private fpsStats!: Stats;
    private readonly world: World;
    private readonly gameRenderer: Renderer;
    private readonly gameInput: GameInput;

    public constructor() {
        this.ticksPerSecond = 60;
        this.tickTime = 1000 / this.ticksPerSecond;
        this.lastTickTime = 0;
        this.currentUpdateLag = 0;
        this.maxUpdateLag = 500;
        this.gameRenderer = new Renderer();
        this.gameInput = new KeyboardAndMouseGameInput(this.gameRenderer.canvas);
        Locator.provideGameInput(this.gameInput);
        this.world = new World();
        this.initFpsStats();
        this.requestNextFrame();
    }

    private requestNextFrame(): void {
        window.requestAnimationFrame((timestamp: number) => { this.gameLoop(timestamp); });
    }

    private gameLoop(time: number): void {
        this.fpsStats.begin();
        const tickDeltaTime = Math.min(this.maxUpdateLag, time - this.lastTickTime);
        this.currentUpdateLag += tickDeltaTime;

        while (this.currentUpdateLag > this.tickTime) {
            this.currentUpdateLag -= this.tickTime;
            this.update(this.tickTime / 1000);
        }
        this.render();
        this.lastTickTime = time;
        this.fpsStats.end();
        this.requestNextFrame();
    }

    private update(deltaTimeInSeconds: number): void {
        this.world.update(deltaTimeInSeconds);
        this.gameInput.update();
    }

    private render(): void {
        this.gameRenderer.render(this.world);
    }

    private initFpsStats(): void {
        this.fpsStats = new Stats();
        this.fpsStats.showPanel(0);
        document.body.appendChild(this.fpsStats.dom);
    }
}
