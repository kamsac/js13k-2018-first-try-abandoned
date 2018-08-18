import LineSegment from './helpers/LineSegment';
import Point from "./helpers/Point";

export default class Wall {
    public readonly segments: LineSegment[];

    constructor(segment: LineSegment, width: number) {
        const halfWidth: number = width / 2;
        this.segments = [
            new LineSegment(
                new Point(segment.a.x, segment.a.),
                new Point(450, 350),
            ),
            new LineSegment(
                new Point(450, 350),
                new Point(450, 450),
            ),
            new LineSegment(
                new Point(450, 450),
                new Point(350, 450),
            ),
            new LineSegment(
                new Point(350, 450),
                new Point(350, 350),
            )
        ]
    }
}
