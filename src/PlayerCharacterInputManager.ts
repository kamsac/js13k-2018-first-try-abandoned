import GameInput from './interfaces/GameInput';
import MainCharacter from "./MainCharacter";

export default class PlayerCharacterInputManager {
    private gameInput: GameInput;

    constructor(gameInput: GameInput) {
        this.gameInput = gameInput;
    }

    public update(character: MainCharacter): void {
        if (this.gameInput.bindings.moveForward.isPressed) {
            character.moveForward();
        }

        if (this.gameInput.bindings.moveBackward.isPressed) {
            character.moveBackward();
        }
    }
}
