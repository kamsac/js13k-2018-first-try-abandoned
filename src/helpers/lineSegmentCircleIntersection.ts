import pointInRectangle from './pointInRectangle';
import circleLineIntersection from './circleLineIntersection';
import segmentToGeneralForm from './lineSegmentToLine';
import Point from './Point';
import Line from './Line';
import LineSegment from './LineSegment';
import Circle from './Circle';

export default function lineSegmentCircleIntersection(lineSegment: LineSegment, circle: Circle): Point[] {
    const line: Line = segmentToGeneralForm(lineSegment);
    const pts: Point[] = circleLineIntersection(circle, line);

    // No intersection
    if (pts.length === 0) return [];

    const pt1: Point = pts[0];
    const includePt1: boolean = pointInRectangle(pt1, lineSegment);

    // Check for unique intersection
    if (pts.length === 1) {
        if (includePt1) return [pt1];
        return [];
    }

    const pt2: Point = pts[1];
    const includePt2: boolean = pointInRectangle(pt2, lineSegment);

    // Check for remaining intersections
    if (includePt1 && includePt2) return [pt1, pt2];
    if (includePt1) return [pt1];
    if (includePt2) return [pt2];
    return [];
}
