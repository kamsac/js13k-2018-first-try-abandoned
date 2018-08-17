import GameInput from './interfaces/GameInput';
import AllInputBindings from './interfaces/AllInputBindings';
import InputBinding from './interfaces/InputBinding';

export default class KeyboardAndMouseGameInput implements GameInput {
    public bindings: AllInputBindings = {
        moveForward: getInitialInputBindingValue('moveForward', ['w', 'W']),
        moveBackward: getInitialInputBindingValue('moveBackward', ['s', 'S']),
        strafeLeft: getInitialInputBindingValue('strafeLeft', ['a', 'A']),
        strafeRight: getInitialInputBindingValue('strafeRight', ['d', 'D']),
        rotateLeft: getInitialInputBindingValue('rotateLeft', ['MML']),
        rotateRight: getInitialInputBindingValue('rotateRight', ['MMR']),
        shoot: getInitialInputBindingValue('shoot', ['LMB']),
    };

    private canvas: HTMLCanvasElement;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.initKeyboard();
        this.initMouse();
    }

    public update(): void {
        this.resetMouseMovement();
    }

    private updateInput(pressedKey: string, pressed: boolean | number): void {
        for (const actionName in this.bindings) {
            if (this.bindings.hasOwnProperty(actionName)) {
                if (this.bindings[actionName].assignedKeys.includes(pressedKey)) {
                    this.bindings[actionName].pressed = pressed;
                    this.bindings[actionName].lastChange = Date.now();
                }
            }
        }
    }

    private initKeyboard(): void {
        window.addEventListener('keydown', (event: KeyboardEvent) => {
            this.canvas.requestPointerLock();
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
            if (event.movementX < 0) {
                this.updateInput('MML', event.movementX);
            } else {
                this.updateInput('MML', 0);
            }

            if (event.movementX > 0) {
                this.updateInput('MMR', event.movementX);
            } else {
                this.updateInput('MMR', 0);
            }
        });

        this.canvas.addEventListener('mousedown', (event: MouseEvent) => {
            this.canvas.requestPointerLock();
            const buttonName: string = getFriendlyMouseButtonKeyName(event);
            this.updateInput(buttonName, true);
        });

        this.canvas.addEventListener('mouseup', (event: MouseEvent) => {
            const buttonName: string = getFriendlyMouseButtonKeyName(event);
            this.updateInput(buttonName, false);
        });
    }

    private resetMouseMovement(): void {
        this.updateInput('MML', 0);
        this.updateInput('MMR', 0);
    }
}

function getInitialInputBindingValue(actionName: string, assignedKeys: string[]): InputBinding {
    return {
        assignedKeys,
        pressed: false,
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
