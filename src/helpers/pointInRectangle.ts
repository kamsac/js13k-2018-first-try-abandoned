import Point from './Point';
import LineSegment from './LineSegment';

export default function pointInRectangle(point: Point, rectangle: LineSegment): boolean {
    const x: number = Math.min(rectangle.a.x,rectangle.b.x);
    const X: number = Math.max(rectangle.a.x,rectangle.b.x);
    const y = Math.min(rectangle.a.y, rectangle.b.y);
    const Y = Math.max(rectangle.a.y, rectangle.b.y);
    return (
        x - Number.EPSILON <= point.x && point.x <= X + Number.EPSILON &&
        y - Number.EPSILON <= point.y && point.y <= Y + Number.EPSILON
    )
};
