import InputBinding from './InputBinding';

export default interface AllInputBindings {
    [actionNameHax: string]: InputBinding;
    moveForward: InputBinding;
    moveBackward: InputBinding;
    shoot: InputBinding;
}
