import Size from './interfaces/Size';
import MainCharacter from './MainCharacter';
import KeyboardAndMouseGameInput from './KeyboardAndMouseGameInput';
import PlayerCharacterInputManager from './PlayerCharacterInputManager';
import WorldEntitiesStructure from './interfaces/WorldEntitiesStructure';
import Point from './helpers/Point';

export default class World {
    public size: Size;
    public entities: WorldEntitiesStructure;

    public constructor() {
        this.size = {
            width: 800,
            height: 600,
        };
        this.entities = {
            player: this.createPlayer(),
            walls: [],
        };
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
                inputManager: new PlayerCharacterInputManager(new KeyboardAndMouseGameInput()),
            },
        );
    }
}
