import Size from './interfaces/Size';
import MainCharacter from './MainCharacter';
import PlayerCharacterInputManager from './PlayerCharacterInputManager';
import WorldEntitiesStructure from './interfaces/WorldEntitiesStructure';
import Point from './helpers/Point';
import Room from './Room';

export default class World {
    public size: Size;
    public entities: WorldEntitiesStructure;
    public rooms: Room[];
    public static roomMaxIndexPosition: number = 5;

    public constructor() {
        this.size = {
            width: 800,
            height: 600,
        };
        this.rooms = [];
        this.applyRoom(new Room(this, new Point(2, 2)));
        console.log(this.rooms[0].centerPosition);

        this.entities = {
            player: this.createPlayer(),
        };
    }

    public update(deltaTimeInSeconds: number): void {
        this.entities.player.update(deltaTimeInSeconds);
        this.createAdjacentRooms();
    }

    public applyRoom(room: Room): void {
        this.rooms.push(room);
    }

    public createAdjacentRooms(): void {
        const currentRoom: Room = this.entities.player.currentRoom;
        for (let exitDirection in currentRoom.exits) {
            const isThereRoomExit: boolean = currentRoom.exits[exitDirection];
            const adjacentRoomIndexPosition: Point = currentRoom.indexPosition.add(exitIndexDeltaMap[exitDirection]);
            const adjacentRoom: Room | undefined = this.getRoomByIndexPosition(adjacentRoomIndexPosition);
            if (isThereRoomExit && !adjacentRoom) {
                const newRoomIndexPosition: Point = currentRoom.indexPosition.add(exitIndexDeltaMap[exitDirection]);
                if (!World.isRoomIndexPositionOutsideWorldBoundary(newRoomIndexPosition)) {
                    this.applyRoom(
                        new Room(
                            this,
                            newRoomIndexPosition,
                        )
                    );
                }
            }
        }
    }

    public getRoomByIndexPosition(indexPosition: Point): Room | undefined {
        return this.rooms.find((room) => room.indexPosition.isEqual(indexPosition))
    }

    public purgeUnusedRooms(): void {
        this.rooms = this.rooms
            .sort((roomA, roomB) => roomB.lastTimeVisited - roomA.lastTimeVisited)
            .slice(0, 8);
    }

    public static isRoomIndexPositionOutsideWorldBoundary(indexPosition: Point): boolean {
        return (
            indexPosition.x < 0 ||
            indexPosition.y < 0 ||
            indexPosition.x >= World.roomMaxIndexPosition ||
            indexPosition.y >= World.roomMaxIndexPosition
        );
    }

    private createPlayer(): MainCharacter {
        const firstRoom: Room = this.rooms[0];
        return new MainCharacter(
            {
                world: this,
                position: new Point(firstRoom.centerPosition.x, firstRoom.centerPosition.y),
            },
            {
                inputManager: new PlayerCharacterInputManager(),
            },
        );
    }
}

export const exitIndexDeltaMap: ExitIndexDeltaMap = {
    top: new Point(0,-1),
    right: new Point(1,0),
    bottom: new Point(0,1),
    left: new Point(-1,0),
};

export const oppositeDirectionsMap: OppositeDirectionsMap = {
    top: 'bottom',
    right: 'left',
    bottom: 'top',
    left: 'right',
}

interface ExitIndexDeltaMap {
    [directionKeyHax: string]: Point;
    top: Point;
    right: Point;
    bottom: Point;
    left: Point;
}

interface OppositeDirectionsMap {
    [directionKeyHax: string]: string;
    top: string;
    right: string;
    bottom: string;
    left: string;
}
