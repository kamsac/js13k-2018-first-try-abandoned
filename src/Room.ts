import Wall from './Wall';
import Point from './helpers/Point';
import World from './World';
import LineSegment from './helpers/LineSegment';
import Size from './interfaces/Size';
import RoomExits from './interfaces/RoomExits';
import shuffle from "./helpers/shuffle";

const doorWidth: number = 80;
const wallWidth: number = 20;
const roomSize: Size = {
    width: 800,
    height: 600,
};

export default class Room {
    public readonly world: World;
    public walls: Wall[];
    public readonly worldPosition: Point;
    public readonly exits: RoomExits;

    constructor(world: World) {
        this.world = world;
        this.worldPosition = new Point(100,100);
        this.exits = this.randomizeRoomExits();
        this.walls = this.getEdgeWalls();
    }

    private randomizeRoomExits(): RoomExits {
        const allDirections: string[] = shuffle(['top', 'right', 'bottom', 'left']);
        const exitChances: number[] = [1, 0.9, 0.5, 0.2];
        const roomExits: RoomExits = {
            top: false,
            right: false,
            bottom: false,
            left: false,
        };

        allDirections.forEach((direction, index) => {
            roomExits[direction] = Math.random() <= exitChances[index];
        });

        return roomExits;
    }

    private getEdgeWalls(): Wall[] {
        const offset: number = 1;

        const topLeft: Point = new Point(0+offset, 0+offset);
        const topRight: Point = new Point(roomSize.width-offset, 0+offset);
        const bottomRight: Point = new Point(roomSize.width-offset, roomSize.height-offset);
        const bottomLeft: Point = new Point(0+offset, roomSize.height-offset);

        return [
            ...this.getOneEdgeWalls(new LineSegment(topLeft, topRight), wallWidth, this.exits.top),
            ...this.getOneEdgeWalls(new LineSegment(topRight, bottomRight), wallWidth, this.exits.right),
            ...this.getOneEdgeWalls(new LineSegment(bottomRight, bottomLeft), wallWidth, this.exits.bottom),
            ...this.getOneEdgeWalls(new LineSegment(bottomLeft, topLeft), wallWidth, this.exits.left),
        ];
    }

    private getWallsWithDoorEntry(lineSegment: LineSegment, wallWidth: number): Wall[] {
        const length: number = lineSegment.length();
        const s1: number = (length/2 - doorWidth/2)/length;
        const s2: number = (length/2 + doorWidth/2)/length;
        const doorEnd1: Point = lineSegment.sub(s1);
        const doorEnd2: Point = lineSegment.sub(s2);

        return [
            new Wall(new LineSegment(lineSegment.a, doorEnd1), wallWidth),
            new Wall(new LineSegment(doorEnd2, lineSegment.b), wallWidth),
        ]
    }

    private getOneEdgeWalls(lineSegment: LineSegment, wallWidth: number, withDoor: boolean): Wall[] {
        if (withDoor) {
            return this.getWallsWithDoorEntry(lineSegment, wallWidth);
        }

        return [new Wall(lineSegment, wallWidth)];
    }
}
