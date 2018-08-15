import GameInput from './interfaces/GameInput';
import AllInputBindings from './interfaces/AllInputBindings';
import InputBinding from './interfaces/InputBinding';

function getInitialInputBindingValue(actionName: string, assignedKeys: string[]): InputBinding {
    return {
        assignedKeys,
        isPressed: false,
        lastChange: 0,
        actionName,
    };
}

function getKeyFromKeyboardEvent(event: KeyboardEvent): string {
    return event.key;
}

export default class KeyboardAndMouseGameInput implements GameInput {
    public bindings: AllInputBindings = {
        moveForward: getInitialInputBindingValue('moveForward', ['w', 'W']),
        moveBackward: getInitialInputBindingValue('moveBackward', ['s', 'S']),
    };

    constructor() {
        this.initKeyboard();
    }

    private updateInput(pressedKey: string, isPressed: boolean) {
        for (const actionName in this.bindings) {
            if (this.bindings.hasOwnProperty(actionName)) {
                if (this.bindings[actionName].assignedKeys.includes(pressedKey)) {
                    this.bindings[actionName].isPressed = isPressed;
                    this.bindings[actionName].lastChange = Date.now();
                }
            }
        }
    }

    private onKeydown(event: KeyboardEvent): void {
        const key: string = getKeyFromKeyboardEvent(event);

        if (!event.repeat) {
            this.updateInput(key, true);
        }
    }

    private onKeyup(event: KeyboardEvent): void {
        const key: string = getKeyFromKeyboardEvent(event);

        this.updateInput(key, false);
    }

    private initKeyboard(): void {
        window.addEventListener('keydown', (event: KeyboardEvent) => {
            this.onKeydown(event);
        });

        window.addEventListener('keyup', (event: KeyboardEvent) => {
            this.onKeyup(event);
        });
    }
}
