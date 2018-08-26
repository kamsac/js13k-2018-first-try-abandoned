import World from '../World';
import LineSegment from '../helpers/LineSegment';
import Point from '../helpers/Point';
import Size from '../interfaces/Size';
import MainCharacter from '../MainCharacter';

export default class FogOfWarRenderer {
    public canvas!: HTMLCanvasElement;
    private context!: CanvasRenderingContext2D;

    constructor(canvasSize: Size) {
        this.createCanvas(canvasSize);
    }

    render(world: World): HTMLCanvasElement {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

        const segments: LineSegment[] = [];
        world.rooms.forEach((room) => {
            room.walls.forEach((wall) => {
                wall.segments.forEach((segment) => {
                    segments.push(segment);
                });
            });
        });

        const polygon: Point[] = getSightPolygon(segments.concat(worldEdgeSegments), world.entities.player);
        drawSightPolygon(polygon, this.context, '#fff');

        return this.canvas;
    };

    private createCanvas(canvasSize: Size): void {
        this.canvas = document.createElement('canvas');
        this.context = this.canvas.getContext('2d')!;
        this.canvas.width = canvasSize.width;
        this.canvas.height = canvasSize.height;
    }
}

const topLeft: Point = new Point(0, 0);
const topRight: Point = new Point(World.size.width, 0);
const bottomRight: Point = new Point(World.size.width, World.size.height);
const bottomLeft: Point = new Point(0, World.size.height);

const worldEdgeSegments = [
    new LineSegment(topLeft, topRight),
    new LineSegment(topRight, bottomRight),
    new LineSegment(bottomRight, bottomLeft),
    new LineSegment(bottomLeft, topLeft),
];

function getIntersection(ray: LineSegment, segment: LineSegment): Intersect | null {
    const rayPointX: number = ray.a.x;
    const rayPointY: number = ray.a.y;
    const rayDirectionX: number = ray.b.x - ray.a.x;
    const rayDirectionY: number = ray.b.y - ray.a.y;

    const segmentPointX: number = segment.a.x;
    const segmentPointY: number = segment.a.y;
    const segmentDirectionX: number = segment.b.x - segment.a.x;
    const segmentDirectionY: number = segment.b.y - segment.a.y;

    const rayMag: number = Math.sqrt(rayDirectionX * rayDirectionX + rayDirectionY * rayDirectionY);
    const segmentMag: number = Math.sqrt(segmentDirectionX * segmentDirectionX + segmentDirectionY * segmentDirectionY);

    if (
        rayDirectionX / rayMag === segmentDirectionX / segmentMag &&
        rayDirectionY / rayMag === segmentDirectionY / segmentMag
    ) {
        return null;
    }

    const T2 =
        (rayDirectionX * (segmentPointY - rayPointY) + rayDirectionY * (rayPointX - segmentPointX)) /
        (segmentDirectionX * rayDirectionY - segmentDirectionY * rayDirectionX);
    const T1 = (segmentPointX + segmentDirectionX * T2 - rayPointX) / rayDirectionX;

    if (T1 < 0) return null;
    if (T2 < 0 || T2 > 1) return null;

    return {
        point: new Point(rayPointX + rayDirectionX * T1, rayPointY + rayDirectionY * T1),
        param: T1,
        angle: 0,
    };
}

function getSightPolygon(segments: LineSegment[], player: MainCharacter): Point[] {
    const sightPoint: Point = player.position.addVector(player.rotation.multiply(MainCharacter.sizeRadius / 4));

    const points: Point[] = segments.reduce<Point[]>((acc, segment) => {
        acc.push(segment.a);
        acc.push(segment.b);
        return acc;
    }, []);
    const uniquePoints: Point[] = ((points) => {
        const set: any = {};
        return points.filter(function (p) {
            const key = `${p.x},${p.y}`;
            if (key in set) {
                return false;
            } else {
                set[key] = true;
                return true;
            }
        });
    })(points);

    const uniqueAngles: number[] = [];
    const uniquePointsWithAngles = [];
    for (let j = 0; j < uniquePoints.length; j++) {
        const uniquePointWithAngle: PointWithAngle = {
            point: uniquePoints[j],
            angle: Math.atan2(uniquePoints[j].y - sightPoint.y, uniquePoints[j].x - sightPoint.x)
        };
        uniquePointsWithAngles.push(uniquePointWithAngle);
        uniqueAngles.push(
            uniquePointWithAngle.angle - 0.00001,
            uniquePointWithAngle.angle,
            uniquePointWithAngle.angle + 0.00001
        );
    }

    let intersects: Intersect[] = [];
    for (let j = 0; j < uniqueAngles.length; j++) {
        const angle = uniqueAngles[j];

        const dx = Math.cos(angle);
        const dy = Math.sin(angle);

        const ray = new LineSegment(
            sightPoint,
            new Point(sightPoint.x + dx, sightPoint.y + dy),
        );

        let closestIntersect: Intersect | null = null;
        for (let i = 0; i < segments.length; i++) {
            const intersect: Intersect | null = getIntersection(ray, segments[i]);
            if (!intersect) continue;
            if (!closestIntersect || intersect.param < closestIntersect.param) {
                closestIntersect = intersect;
            }
        }

        if (!closestIntersect) continue;

        closestIntersect.angle = angle;

        intersects.push(closestIntersect);
    }

    return intersects
        .sort((a, b) => a.angle - b.angle)
        .map((intersect) => intersect.point);
}

function drawSightPolygon(polygon: Point[], ctx: CanvasRenderingContext2D, fillStyle: string): void {
    ctx.fillStyle = fillStyle;
    ctx.beginPath();
    ctx.moveTo(polygon[0].x,polygon[0].y);
    for (let i = 1; i < polygon.length; i++) {
        ctx.lineTo(polygon[i].x, polygon[i].y);
    }
    ctx.fill();
}

interface PointWithAngle {
    point: Point,
    angle: number;
}

interface Intersect {
    point: Point;
    param: number;
    angle: number;
}
