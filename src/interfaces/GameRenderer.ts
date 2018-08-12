import World from './World';

export default interface WorldRenderer {
    render: (world: World) => void;
}
