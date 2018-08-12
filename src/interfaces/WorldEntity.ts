import World from './World';
import WorldPosition from './WorldPosition';
import Vector2D from "./Vector2D";

export default interface WorldEntity {
    readonly id: string;
    readonly position: WorldPosition;
    readonly world: World;
    readonly speed: Vector2D;
    move: (velocity: Vector2D) => void;
    remove: () => void;
    update: () => void;
}
