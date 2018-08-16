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
    private forwardDirection: Vector;

    constructor(entityOptions: WorldEntityOptions, mainCharacterOptions: MainCharacterOptions) {
        super(entityOptions);
        this.type = 'player';
        this.inputManager = mainCharacterOptions.inputManager;
        this.forwardDirection = new Vector(0, -1).normalized();
    }

    public update(deltaTimeInSeconds: number): void {
        this.inputManager.update(this);
        this.velocity = this.velocity.multiply(MOVEMENT_DUMP);
        this.position = this.position.addVector(this.velocity);
    }

    public moveForward(): void {
        const playerInputVelocity: Vector = this.forwardDirection.multiply(MOVEMENT_ACCELERATION);
        this.velocity = this.velocity.add(playerInputVelocity);
    }

    public moveBackward(): void {
        const playerInputVelocity: Vector = this.forwardDirection.rotate(Math.PI).multiply(MOVEMENT_STRAFE_ACCELERATION);
        this.velocity = this.velocity.add(playerInputVelocity);
    }

    public strafeLeft(): void {
        const playerInputVelocity: Vector = this.forwardDirection.rotate(-Math.PI/2).multiply(MOVEMENT_STRAFE_ACCELERATION);
        this.velocity = this.velocity.add(playerInputVelocity);
    }

    public strafeRight(): void {
        const playerInputVelocity: Vector = this.forwardDirection.rotate(Math.PI/2).multiply(MOVEMENT_STRAFE_ACCELERATION);
        this.velocity = this.velocity.add(playerInputVelocity);
    }

    public rotateLeft(speed: number): void {
        this.forwardDirection = this.forwardDirection.rotate(speed / 100);
        this.rotation = this.forwardDirection;
    }

    public rotateRight(speed: number): void {
        this.forwardDirection = this.forwardDirection.rotate(speed / 100);
        this.rotation = this.forwardDirection;
    }

    public shoot(): void {
        console.log('shoot');
    }
}
