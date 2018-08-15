import GameInput from './interfaces/GameInput';
import MainCharacter from './MainCharacter';
import Locator from './Locator';

export default class PlayerCharacterInputManager {
    private gameInput: GameInput = Locator.getGameInput();

    public update(character: MainCharacter): void {
        if (this.gameInput.bindings.moveForward.isPressed) {
            character.moveForward();
        }

        if (this.gameInput.bindings.moveBackward.isPressed) {
            character.moveBackward();
        }

        if (this.gameInput.bindings.shoot.isPressed) {
            character.shoot();
        }
    }
}
