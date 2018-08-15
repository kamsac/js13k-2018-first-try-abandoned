import MainCharacterOptions from './interfaces/MainCharacterOptions';
import WorldEntity from './WorldEntity';
import WorldEntityOptions from './interfaces/WorldEntityOptions';
import PlayerCharacterInputManager from './PlayerCharacterInputManager';
import Vector from './helpers/Vector';

const MOVEMENT_ACCELERATION: number = 0.6;
const MOVEMENT_DUMP: number = 0.85;

export default class MainCharacter extends WorldEntity {
    private inputManager: PlayerCharacterInputManager;

    constructor(entityOptions: WorldEntityOptions, mainCharacterOptions: MainCharacterOptions) {
        super(entityOptions);
        this.inputManager = mainCharacterOptions.inputManager;
        this.type = 'player';
    }

    public update(deltaTimeInSeconds: number): void {
        this.inputManager.update(this);
        this.velocity = this.velocity.multiply(MOVEMENT_DUMP);
        this.position = this.position.addVector(this.velocity);
    }

    public moveForward(): void {
        const playerInputVelocity: Vector = new Vector(0, -MOVEMENT_ACCELERATION);
        this.velocity = this.velocity.add(playerInputVelocity);
    }

    public moveBackward(): void {
        const playerInputVelocity: Vector = new Vector(0, MOVEMENT_ACCELERATION);
        this.velocity = this.velocity.add(playerInputVelocity);
    }

    public shoot(): void {
        console.log('shoot');
    }
}
