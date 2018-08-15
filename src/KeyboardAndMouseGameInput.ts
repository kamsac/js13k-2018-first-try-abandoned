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

function getFriendlyMouseButtonKeyName(event: MouseEvent): string {
    switch(event.button) {
        case 0: return 'LMB';
        case 2: return 'RMB';
        default: return 'MB';
    }
}

export default class KeyboardAndMouseGameInput implements GameInput {
    public bindings: AllInputBindings = {
        moveForward: getInitialInputBindingValue('moveForward', ['w', 'W']),
        moveBackward: getInitialInputBindingValue('moveBackward', ['s', 'S']),
        shoot: getInitialInputBindingValue('shoot', ['LMB']),
    };

    private canvas: HTMLCanvasElement;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.initKeyboard();
        this.initMouse();
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

    private initKeyboard(): void {
        window.addEventListener('keydown', (event: KeyboardEvent) => {
            const buttonName: string = getKeyFromKeyboardEvent(event);
            if (!event.repeat) {
                this.updateInput(buttonName, true);
            }
        });

        window.addEventListener('keyup', (event: KeyboardEvent) => {
            const buttonName: string = getKeyFromKeyboardEvent(event);
            this.updateInput(buttonName, false);
        });
    }

    private initMouse(): void {
        this.canvas.oncontextmenu = () => false;

        this.canvas.addEventListener('mousemove', (event: MouseEvent) => {
            // console.log('move');
        });

        this.canvas.addEventListener('mousedown', (event: MouseEvent) => {
            const buttonName: string = getFriendlyMouseButtonKeyName(event);
            this.updateInput(buttonName, true);
        });

        this.canvas.addEventListener('mouseup', (event: MouseEvent) => {
            const buttonName: string = getFriendlyMouseButtonKeyName(event);
            this.updateInput(buttonName, false);
        });
    }
}
