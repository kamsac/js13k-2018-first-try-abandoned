import World from '../World';

export default interface GameRenderer {
    render: (world: World) => void;
}
