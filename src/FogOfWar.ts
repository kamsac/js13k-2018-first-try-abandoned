import Point from './helpers/Point';
import World from './World';
import LineSegment from './helpers/LineSegment';
import MainCharacter from './MainCharacter';
import Room from './Room';

export default class FogOfWar {
    public polygon: Point[];

    constructor() {
        this.polygon = [];
    }

    public update(world: World): void {
        const segments: LineSegment[] = [];
        world.rooms.forEach((room) => {
            room.walls.forEach((wall) => {
                wall.segments.forEach((segment) => {
                    segments.push(segment);
                });
            });
        });

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

        this.polygon = getSightPolygon(segments.concat(worldEdgeSegments), world.entities.player, Room.wallWidth);
    }

}

function getIntersection(ray: LineSegment, segment: LineSegment, wallSeenDepth: number): Intersect | null {
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
        point: new Point(
            rayPointX + rayDirectionX * (T1 + wallSeenDepth),
            rayPointY + rayDirectionY * (T1 + wallSeenDepth),
        ),
        param: T1,
        angle: 0,
    };
}

function getSightPolygon(segments: LineSegment[], player: MainCharacter, wallSeenDepth: number): Point[] {
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
            angle: Math.atan2(uniquePoints[j].y - sightPoint.y, uniquePoints[j].x - sightPoint.x),
        };
        uniquePointsWithAngles.push(uniquePointWithAngle);
        uniqueAngles.push(
            uniquePointWithAngle.angle - 0.00001,
            uniquePointWithAngle.angle,
            uniquePointWithAngle.angle + 0.00001,
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
            const intersect: Intersect | null = getIntersection(ray, segments[i], wallSeenDepth);
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

interface PointWithAngle {
    point: Point,
    angle: number;
}

interface Intersect {
    point: Point;
    param: number;
    angle: number;
}
