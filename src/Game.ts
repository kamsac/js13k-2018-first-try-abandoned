import Stats from 'stats.js';
import CanvasGameRenderer from './CanvasGameRenderer';
import World from './interfaces/World';
import GameRenderer from './interfaces/GameRenderer';
import GameWorld from './GameWorld';

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
        this.ticksPerSecond = 144;
        this.tickTime = 1000 / this.ticksPerSecond;
        this.lastTickTime = 0;
        this.currentUpdateLag = 0;
        this.maxUpdateLag = 500;
        this.gameRenderer = new CanvasGameRenderer();
        this.world = new GameWorld();
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
            this.update();
        }
        this.render();
        this.lastTickTime = time;
        this.fpsStats.end();
        this.requestNextFrame();
    }

    private update(): void {

    }

    private render(): void {
        this.gameRenderer.render(this.world);
    }

    private initFpsStats(): void {
        this.fpsStats = new Stats();
        this.fpsStats.showPanel(0);
        document.body.appendChild(this.fpsStats.dom);
    }

    private initInput(): void {
        // const gameInput: GameInput = new GameInput();
        // Locator.provideGameInput(gameInput);
    }
}
