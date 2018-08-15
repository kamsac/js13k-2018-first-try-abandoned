import MainCharacterOptions from './interfaces/MainCharacterOptions';
import WorldEntity from './WorldEntity';
import WorldEntityOptions from './interfaces/WorldEntityOptions';
import PlayerCharacterInputManager from './PlayerCharacterInputManager';
import Vector from './helpers/Vector';

const MOVEMENT_ACCELERATION: number = 0.6;
const MOVEMENT_STRAFE_ACCELERATION = MOVEMENT_ACCELERATION * 0.67;
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
        const playerInputVelocity: Vector = new Vector(0, MOVEMENT_STRAFE_ACCELERATION);
        this.velocity = this.velocity.add(playerInputVelocity);
    }

    public strafeLeft(): void {
        const playerInputVelocity: Vector = new Vector(-MOVEMENT_STRAFE_ACCELERATION, 0);
        this.velocity = this.velocity.add(playerInputVelocity);
    }

    public strafeRight(): void {
        const playerInputVelocity: Vector = new Vector(MOVEMENT_STRAFE_ACCELERATION, 0);
        this.velocity = this.velocity.add(playerInputVelocity);
    }

    public rotateLeft(speed: number): void {
        console.log('look left', speed);
    }

    public rotateRight(speed: number): void {
        console.log('look right', speed);
    }

    public shoot(): void {
        console.log('shoot');
    }
}
