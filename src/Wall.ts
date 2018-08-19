import LineSegment from './helpers/LineSegment';
import Point from "./helpers/Point";

export default class Wall {
    public readonly segments: LineSegment[];

    constructor(segment: LineSegment, width: number) {
        let dx: number = segment.a.x - segment.b.x;
        let dy: number = segment.a.y - segment.b.y;
        const dist: number = Math.sqrt(dx*dx + dy*dy);
        dx /= dist;
        dy /= dist;

        const pointA1: Point = new Point(
            segment.a.x + (width/2)*dy,
            segment.a.y - (width/2)*dx,
        );

        const pointA2: Point = new Point(
            segment.a.x - (width/2)*dy,
            segment.a.y + (width/2)*dx,
        );

        const pointB1: Point = new Point(
            segment.b.x + (width/2)*dy,
            segment.b.y - (width/2)*dx,
        );

        const pointB2: Point = new Point(
            segment.b.x - (width/2)*dy,
            segment.b.y + (width/2)*dx,
        );

        this.segments = [
            new LineSegment(pointA1, pointA2),
            new LineSegment(pointA2, pointB2),
            new LineSegment(pointB2, pointB1),
            new LineSegment(pointB1, pointA1),
        ]
    }
}
