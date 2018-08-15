import World from '../World';
import Point from '../helpers/Point';
import Vector from '../helpers/Vector';

export default interface WorldEntityOptions {
    world: World;
    position?: Point;
    velocity?: Vector;
}
