import Wall from './Wall';
import Point from './helpers/Point';
import World, {exitIndexDeltaMap, oppositeDirectionsMap} from './World';
import LineSegment from './helpers/LineSegment';
import Size from './interfaces/Size';
import RoomExits from './interfaces/RoomExits';
import shuffle from "./helpers/shuffle";

const doorWidth: number = 50;
const wallWidth: number = 5;

export default class Room {
    public readonly world: World;
    public static size: Size = {
        width: 200,
        height: 150,
    };
    public walls: Wall[];
    public readonly indexPosition: Point;
    public readonly exits: RoomExits;
    public readonly topLeftOffsetRoomPosition: Point;
    public readonly centerPosition: Point;
    public lastTimeVisited: number;

    constructor(world: World, indexPosition: Point) {
        this.world = world;
        this.indexPosition = indexPosition;
        this.topLeftOffsetRoomPosition = new Point(
            this.indexPosition.x * Room.size.width,
            this.indexPosition.y * Room.size.height,
        );
        this.centerPosition = this.topLeftOffsetRoomPosition.add(new Point(Room.size.width / 2, Room.size.height / 2));
        this.lastTimeVisited = 0;
        this.exits = this.randomizeRoomExits();
        this.walls = this.getEdgeWalls();
        this.world.applyRoom(this);
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
            const doesAdjacentExitExists: boolean | undefined = this.doesAdjacentRoomHaveExitToThisRoom(direction);
            const forbidExit: boolean = this.wouldAdjacentRoomBeOutsideWorldBoundary(direction) || doesAdjacentExitExists === false;
            const forceExit: boolean = doesAdjacentExitExists === true;
            roomExits[direction] = (
                !forbidExit &&
                (
                    forceExit ||
                    Math.random() <= exitChances[index]
                )
            );
        });

        return roomExits;
    }

    private wouldAdjacentRoomBeOutsideWorldBoundary(direction: string): boolean {
        const adjacentIndexPosition: Point = this.indexPosition.add(exitIndexDeltaMap[direction]);
        return World.isRoomIndexPositionOutsideWorldBoundary(adjacentIndexPosition);
    }

    private doesAdjacentRoomHaveExitToThisRoom(direction: string): boolean | undefined {
        const adjacentRoom: Room | undefined = this.getAdjacentRoom(direction);
        if (!adjacentRoom) {
            return undefined;
        }

        return adjacentRoom.exits[oppositeDirectionsMap[direction]];
    }

    private getAdjacentRoom(direction: string): Room | undefined {
        const adjacentIndexPosition: Point = this.indexPosition.add(exitIndexDeltaMap[direction]);
        return this.world.getRoomByIndexPosition(adjacentIndexPosition);
    }

    private getEdgeWalls(): Wall[] {
        const topLeft: Point = new Point(0+this.topLeftOffsetRoomPosition.x, 0+this.topLeftOffsetRoomPosition.y);
        const topRight: Point = new Point(Room.size.width+this.topLeftOffsetRoomPosition.x, 0+this.topLeftOffsetRoomPosition.y);
        const bottomRight: Point = new Point(Room.size.width+this.topLeftOffsetRoomPosition.x, Room.size.height+this.topLeftOffsetRoomPosition.y);
        const bottomLeft: Point = new Point(0+this.topLeftOffsetRoomPosition.x, Room.size.height+this.topLeftOffsetRoomPosition.y);

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
