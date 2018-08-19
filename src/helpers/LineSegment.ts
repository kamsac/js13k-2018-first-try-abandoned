import Point from './Point';

export default class LineSegment {
    public a: Point;
    public b: Point;

    constructor(a: Point, b: Point) {
        this.a = a;
        this.b = b;
    }

    public middle(): Point {
        return new Point(
            (this.a.x + this.b.x) / 2,
            (this.a.y + this.b.y) / 2,
        );
    }

    public sub(t: number): Point {
        return new Point(
            this.a.x + t*(this.b.x-this.a.x),
            this.a.y + t*(this.b.y-this.a.y),
        );
    }

    public length(): number {
        return Math.hypot(this.a.x - this.b.x, this.a.y - this.b.y);
    }

    toString(): string {
        return `(${this.a.toString()}${this.b.toString()})`;
    }
}
