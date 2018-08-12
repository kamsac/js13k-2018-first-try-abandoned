import World from './interfaces/World';
import Size2D from './interfaces/Size2D';
import WorldEntity from "./interfaces/WorldEntity";

export default class GameWorld implements World {
    public size: Size2D;
    public entities: WorldEntity[];

    public constructor() {
        this.size = {
            width: 800,
            height: 600,
        };
        this.entities = [];
    }

    public getEntityById(entityId: string): WorldEntity | undefined {
        return this.entities.find((entity) => entity.id === entityId)
    }

    public addEntity(entity: WorldEntity): void {
        this.entities.push(entity);
    }

    public removeEntity(entityId: string): void {
        this.entities = this.entities.filter((entity) => {
            return entity.id !== entityId;
        })
    }

}