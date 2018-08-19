import Line from './Line';
import Circle from './Circle';
import Point from './Point';

export default function circleLineIntersection(circle: Circle, line: Line): Point[] {
    const a = line.a;
    const b = line.b;
    const c = line.c;
    const x = circle.x;
    const y = circle.y;
    const r = circle.r;

    // Solve for the variable x with the formulas: ax + by = c (equation of line)
    // and (x-X)^2 + (y-Y)^2 = r^2 (equation of circle where X,Y are known) and expand to obtain quadratic:
    // (a^2 + b^2)x^2 + (2abY - 2ac + - 2b^2X)x + (b^2X^2 + b^2Y^2 - 2bcY + c^2 - b^2r^2) = 0
    // Then use quadratic formula X = (-b +- sqrt(a^2 - 4ac))/2a to find the
    // roots of the equation (if they exist) and this will tell us the intersection points

    // In general a quadratic is written as: Ax^2 + Bx + C = 0
    // (a^2 + b^2)x^2 + (2abY - 2ac + - 2b^2X)x + (b^2X^2 + b^2Y^2 - 2bcY + c^2 - b^2r^2) = 0
    const A = a * a + b * b;
    let B = 2 * a * b * y - 2 * a * c - 2 * b * b * x;
    const C = b * b * x * x + b * b * y * y - 2 * b * c * y + c * c - b * b * r * r;

    // Use quadratic formula x = (-b +- sqrt(a^2 - 4ac))/2a to find the
    // roots of the equation (if they exist).

    let D = B * B - 4 * A * C;
    let x1, y1, x2, y2;

    // Handle vertical line case with b = 0
    if (Math.abs(b) < Number.EPSILON) {
        // Line equation is ax + by = c, but b = 0, so x = c/a
        x1 = c/a;

        // No intersection
        if (Math.abs(x-x1) > r) return [];

        // Vertical line is tangent to circle
        if (Math.abs((x1-r)-x) < Number.EPSILON || Math.abs((x1+r)-x) < Number.EPSILON)
            return [new Point(x1, y)];

        const dx: number = Math.abs(x1 - x);
        const dy: number = Math.sqrt(r * r - dx * dx);

        // Vertical line cuts through circle
        return [
            new Point(x1,y+dy),
            new Point(x1,y-dy)
        ];

        // Line is tangent to circle
    } else if (Math.abs(D) < Number.EPSILON) {
        x1 = -B/(2*A);
        y1 = (c - a*x1)/b;

        return [new Point(x1,y1)];

        // No intersection
    } else if (D < 0) {
        return [];

    } else {
        D = Math.sqrt(D);

        x1 = (-B+D)/(2*A);
        y1 = (c - a*x1)/b;

        x2 = (-B-D)/(2*A);
        y2 = (c - a*x2)/b;

        return [
            new Point(x1, y1),
            new Point(x2, y2)
        ];
    }
}