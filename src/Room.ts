import Wall from './Wall';
import Point from './helpers/Point';
import World from './World';
import LineSegment from "./helpers/LineSegment";
import Size from "./interfaces/Size";

export default class Room {
    public readonly world: World;
    public walls: Wall[];
    private roomSize: Size;

    constructor(world: World) {
        this.world = world;
        this.walls = this.getSomeWalls();

        this.roomSize = {
            width: 800,
            height: 600,
        };
    }

    private getSomeWalls(): Wall[] {
        return [
            new Wall([
                new LineSegment(
                    new Point(80, 400),
                    new Point(40, 100)
                ),
                new LineSegment(
                    new Point(40, 100),
                    new Point(230, 130),
                ),
                new LineSegment(
                    new Point(230, 130),
                    new Point(80, 400),
                )
            ]),
            new Wall([
                new LineSegment(
                    new Point(350, 350),
                    new Point(450, 350),
                ),
                new LineSegment(
                    new Point(450, 350),
                    new Point(450, 450),
                ),
                new LineSegment(
                    new Point(450, 450),
                    new Point(350, 450),
                ),
                new LineSegment(
                    new Point(350, 450),
                    new Point(350, 350),
                )
            ])
        ];
    }

    private getEdgeWalls(): Wall[] {
        const wallWidth: number = 10;
        new Wall([
            new LineSegment(
                new Point(80, 400),
                new Point(40, 100)
            ),
            new LineSegment(
                new Point(40, 100),
                new Point(230, 130),
            ),
            new LineSegment(
                new Point(230, 130),
                new Point(80, 400),
            ),
            new LineSegment(
                new Point(230, 130),
                new Point(80, 400),
            )
        ]);
    }
}
