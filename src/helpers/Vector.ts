import Point from './Point';

export default class Vector {
    public x: number;
    public y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    public add(vector: Vector): Vector {
        return new Vector(
            this.x + vector.x,
            this.y + vector.y,
        );
    }

    public subtract(vector: Vector): Vector {
        return new Vector(
            this.x - vector.x,
            this.y - vector.y,
        );
    }

    public multiply(scale: number): Vector {
        return new Vector(
            this.x * scale,
            this.y * scale,
        );
    }

    public static addPoints(point1: Point, point2: Point): Vector {
        return new Vector(
            point1.x + point2.x,
            point1.y + point2.y,
        );
    }

    public static subtractPoints(point1: Point, point2: Point): Vector {
        return new Vector(
            point1.x - point2.x,
            point1.y - point2.y,
        );
    }

    public length(): number {
        return Math.sqrt(this.x*this.x + this.y*this.y);
    }

    public lengthSqrt(): number {
        return this.x*this.x + this.y*this.y;
    }

    public normalized(): Vector {
        const length: number = this.length();
        return new Vector(
            this.x / length,
            this.y / length,
        );
    }

    public toString(): string {
        return `(${this.x}, ${this.y})`;
    }
}
