import Point from './Point';

export default class LineSegment {
    public a: Point;
    public b: Point;

    constructor(a: Point, b: Point) {
        this.a = a;
        this.b = b;
    }
}
