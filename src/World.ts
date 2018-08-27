import Size from './interfaces/Size';
import MainCharacter from './MainCharacter';
import PlayerCharacterInputManager from './PlayerCharacterInputManager';
import WorldEntitiesStructure from './interfaces/WorldEntitiesStructure';
import Point from './helpers/Point';
import Room from './Room';
import Camera from './Camera';
import FogOfWar from './FogOfWar';

const lightTurnOffDelay = 999999; // temporary 99999

export default class World {
    public static size: Size = {
        width: 1600,
        height: 1200,
    };
    public entities: WorldEntitiesStructure;
    public rooms: Room[];
    public static roomMaxIndexPosition: Point = new Point(
        World.size.width / Room.size.width,
        World.size.height / Room.size.height,
    );
    public isLightOn!: boolean;
    public lastLightTurnOn!: number;
    public fogOfWar: FogOfWar;
    public tick: number = 0;

    public constructor() {
        this.rooms = [];
        this.applyRoom(new Room(this, new Point(
            Math.ceil(World.roomMaxIndexPosition.x / 2),
            Math.ceil(World.roomMaxIndexPosition.y / 2),
        )));

        const player: MainCharacter = this.createPlayer();
        const camera: Camera = this.createCamera(player);

        this.entities = {
            player: player,
            camera: camera,
        };

        this.fogOfWar = new FogOfWar();

        this.turnTheLightOn();
    }

    public update(deltaTimeInSeconds: number): void {
        this.tick++;
        this.entities.player.update(deltaTimeInSeconds);
        this.entities.camera.update();
        this.createAdjacentRooms();
        this.updateLight();
        if (this.tick % 2 === 0) {
            this.fogOfWar.update(this);
        }
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
            indexPosition.x > World.roomMaxIndexPosition.x-1 ||
            indexPosition.y > World.roomMaxIndexPosition.y-1
        );
    }

    public turnTheLightOn(): void {
        this.lastLightTurnOn = Date.now();
        this.isLightOn = true;
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

    private createCamera(mainCharacter: MainCharacter): Camera {
        return new Camera({
            world: this,
            position: mainCharacter.position,
            velocity: mainCharacter.velocity,
        })
    }

    private updateLight(): void {
        if (this.lastLightTurnOn + lightTurnOffDelay < Date.now()) {
            this.isLightOn = false;
        }
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
