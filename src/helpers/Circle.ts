import Point from './Point';

export default class Circle {
    public x: number;
    public y: number;
    public r: number;

    constructor(position: Point, radius: number) {
        this.x = position.x;
        this.y = position.y;
        this.r = radius;
    }
}
