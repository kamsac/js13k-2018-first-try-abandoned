import Line from './Line';
import LineSegment from './LineSegment';

export default function segmentToGeneralForm(segment: LineSegment): Line {
    const a: number = segment.a.y - segment.b.y;
    const b: number = segment.b.x - segment.a.x;
    const c: number = segment.b.x * segment.a.y - segment.a.x * segment.b.y;
    return new Line(a, b, c);
}
