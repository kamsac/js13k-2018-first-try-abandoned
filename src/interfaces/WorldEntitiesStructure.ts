import MainCharacter from '../MainCharacter';
import WorldEntity from '../WorldEntity';

export default interface WorldEntitiesStructure {
    player: MainCharacter;
    walls: WorldEntity[];
}
