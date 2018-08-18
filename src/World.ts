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

    public constructor() {
        this.size = {
            width: 800,
            height: 600,
        };
        this.entities = {
            player: this.createPlayer(),
        };
        this.rooms = [
            new Room(this)
        ]
    }

    public update(deltaTimeInSeconds: number): void {
        this.entities.player.update(deltaTimeInSeconds);
    }

    private createPlayer(): MainCharacter {
        return new MainCharacter(
            {
                world: this,
                position: new Point(this.size.width / 2, this.size.height / 2),
            },
            {
                inputManager: new PlayerCharacterInputManager(),
            },
        );
    }
}
