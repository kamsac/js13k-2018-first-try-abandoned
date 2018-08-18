import Wall from '../Wall';

export default class WallRenderer {
    public static render(context: CanvasRenderingContext2D, wall: Wall): void {
        wall.segments.forEach((segment) => {
            context.beginPath();
            context.moveTo(segment.a.x, segment.a.y);
            context.lineTo(segment.b.x, segment.b.y);
            context.strokeStyle = '#468';
            context.lineWidth = 2;
            context.stroke();
        });
    }
}
