import MainCharacterOptions from './interfaces/MainCharacterOptions';
import WorldEntity from './WorldEntity';
import WorldEntityOptions from './interfaces/WorldEntityOptions';
import PlayerCharacterInputManager from './PlayerCharacterInputManager';
import Vector from './helpers/Vector';
import lineSegmentCircleIntersection from './helpers/lineSegmentCircleIntersection';
import Circle from './helpers/Circle';
import Point from './helpers/Point';

const MOVEMENT_ACCELERATION: number = 0.6;
const MOVEMENT_STRAFE_ACCELERATION = MOVEMENT_ACCELERATION * 0.67;
const MOVEMENT_DUMP: number = 0.85;

export default class MainCharacter extends WorldEntity {
    private inputManager: PlayerCharacterInputManager;
    private forwardDirection: Vector;
    private inputVelocity: Vector;

    constructor(entityOptions: WorldEntityOptions, mainCharacterOptions: MainCharacterOptions) {
        super(entityOptions);
        this.type = 'player';
        this.inputManager = mainCharacterOptions.inputManager;
        this.forwardDirection = new Vector(0, -1).normalized();
        this.inputVelocity = new Vector(0, 0);
    }

    public update(deltaTimeInSeconds: number): void {
        this.inputVelocity = this.forwardDirection.multiply(0);
        this.inputManager.update(this);
        this.velocity = this.velocity.add(this.inputVelocity);
        this.velocity = this.velocity.multiply(MOVEMENT_DUMP);

        const targetPosition: Point = this.position.addVector(this.velocity);
        const playerCircleMask: Circle = new Circle(targetPosition, 25);

        this.world.rooms.forEach((room) => {
            room.walls.forEach((wall) => {
                wall.segments.forEach((segment) => {
                    const intersections: Point[] = lineSegmentCircleIntersection(segment, playerCircleMask);
                    if (intersections.length > 0) {
                        this.velocity = this.velocity.multiply(0);
                    }
                });
            });
        });

        this.position = this.position.addVector(this.velocity);
    }

    public moveForward(): void {
        this.inputVelocity = this.forwardDirection.multiply(MOVEMENT_ACCELERATION).add(this.inputVelocity);
    }

    public moveBackward(): void {
        this.inputVelocity = this.forwardDirection.rotate(Math.PI).multiply(MOVEMENT_STRAFE_ACCELERATION).add(this.inputVelocity);
    }

    public strafeLeft(): void {
        this.inputVelocity = this.forwardDirection.rotate(-Math.PI/2).multiply(MOVEMENT_STRAFE_ACCELERATION).add(this.inputVelocity);
    }

    public strafeRight(): void {
        this.inputVelocity = this.forwardDirection.rotate(Math.PI/2).multiply(MOVEMENT_STRAFE_ACCELERATION).add(this.inputVelocity);
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
