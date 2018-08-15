import jamid from 'jamid';
import WorldEntityOptions from './interfaces/WorldEntityOptions';
import Vector from './helpers/Vector';
import Point from './helpers/Point';
import World from './World';
import WorldEntityType from './types/WorldEntityType';

export default class WorldEntity {
    public readonly id: string;
    public world: World;
    public position: Point;
    public velocity: Vector;
    public type: WorldEntityType;

    constructor(entityOptions: WorldEntityOptions) {
        this.id = jamid.create();
        this.world = entityOptions.world;
        this.position = entityOptions.position ? entityOptions.position : new Point(0,0);
        this.velocity = entityOptions.velocity ? entityOptions.velocity : new Vector(0,0);
        this.type = 'undefined';
    }

    public update(deltaTimeInSeconds: number): void {
        this.position = this.position.addVector(this.velocity.multiply(deltaTimeInSeconds));
    }
}
