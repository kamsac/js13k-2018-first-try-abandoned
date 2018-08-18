import Vector from './Vector';

export default class Point {
    public x: number;
    public y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    public add(point: Point): Point {
        return new Point(
            this.x + point.x,
            this.y + point.y,
        );
    }

    public subtract(point: Point): Point {
        return new Point(
            this.x - point.x,
            this.y - point.y,
        );
    }

    public addVector(vector: Vector): Point {
        return new Point(
            this.x + vector.x,
            this.y + vector.y,
        );
    }

    public isEqual(point: Point): boolean {
        return this.x === point.x && this.y === point.y;
    }

    public cross(point: Point): number {
        return this.x * point.y - this.y * point.x;
    }

    public toString(): string {
        return `(${this.x}, ${this.y})`;
    }

    public distance(point: Point): number {
        return Math.hypot(point.x - this.x, point.y - this.y);
    }
}
