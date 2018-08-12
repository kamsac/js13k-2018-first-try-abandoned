import Size2D from './Size2D';
import WorldEntity from './WorldEntity';

export default interface World {
    readonly size: Size2D;
    readonly entities: WorldEntity[];
    getEntityById: (id: string) => WorldEntity | undefined;
    addEntity: (worldEntity: WorldEntity) => void;
    removeEntity: (id: string) => void;
}
