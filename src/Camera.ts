import WorldEntity from './WorldEntity';
import WorldEntityOptions from './interfaces/WorldEntityOptions';
import Size from './interfaces/Size';
import Point from './helpers/Point';

export default class Camera extends WorldEntity {
    public displaySize: Size;
    public rotatePoint: Point;

    constructor(entityOptions: WorldEntityOptions) {
        super(entityOptions);

        this.displaySize = {
            width: 800,
            height: 600,
        };

        this.rotatePoint = new Point(this.displaySize.width / 2, this.displaySize.height / 2);
    }

    public update() {
        this.rotation = this.world.entities.player.rotation;
        this.position = this.world.entities.player.position;
    }
}
