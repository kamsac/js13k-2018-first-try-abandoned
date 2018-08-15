import Stats from 'stats.js';
import CanvasRenderer from './CanvasRenderer';
import World from './World';
import GameRenderer from './interfaces/GameRenderer';
import KeyboardAndMouseGameInput from './KeyboardAndMouseGameInput';

export default class Game {
    private readonly ticksPerSecond: number;
    private readonly tickTime: number; // ms
    private lastTickTime: number; // ms
    private currentUpdateLag: number; // ms
    private readonly maxUpdateLag: number; // ms
    private fpsStats!: Stats;
    private readonly gameRenderer: GameRenderer;
    private readonly world: World;

    public constructor() {
        this.ticksPerSecond = 30;
        this.tickTime = 1000 / this.ticksPerSecond;
        this.lastTickTime = 0;
        this.currentUpdateLag = 0;
        this.maxUpdateLag = 500;
        this.gameRenderer = new CanvasRenderer();
        this.world = new World();
        this.initFpsStats();
        this.initInput();
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
    }

    private render(): void {
        this.gameRenderer.render(this.world);
    }

    private initInput(): void {
        new KeyboardAndMouseGameInput();
    }

    private initFpsStats(): void {
        this.fpsStats = new Stats();
        this.fpsStats.showPanel(0);
        document.body.appendChild(this.fpsStats.dom);
    }
}
