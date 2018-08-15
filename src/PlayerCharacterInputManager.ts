import GameInput from './interfaces/GameInput';
import MainCharacter from './MainCharacter';
import Locator from './Locator';

export default class PlayerCharacterInputManager {
    private gameInput: GameInput = Locator.getGameInput();

    public update(character: MainCharacter): void {
        if (this.gameInput.bindings.moveForward.pressed) {
            character.moveForward();
        }
        if (this.gameInput.bindings.moveBackward.pressed) {
            character.moveBackward();
        }
        if (this.gameInput.bindings.strafeLeft.pressed) {
            character.strafeLeft();
        }
        if (this.gameInput.bindings.strafeRight.pressed) {
            character.strafeRight();
        }

        if (this.gameInput.bindings.rotateLeft.pressed) {
            character.rotateLeft(+this.gameInput.bindings.rotateLeft.pressed);
        }
        if (this.gameInput.bindings.rotateRight.pressed) {
            character.rotateRight(+this.gameInput.bindings.rotateRight.pressed);
        }

        if (this.gameInput.bindings.shoot.pressed) {
            character.shoot();
        }
    }
}
