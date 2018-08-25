import Wall from '../Wall';

export default class WallRenderer {
    public static render(context: CanvasRenderingContext2D, wall: Wall): void {
        context.beginPath();
        context.strokeStyle = '#210';
        context.fillStyle = '#210';
        context.lineWidth = 2;
        context.moveTo(wall.segments[0].a.x, wall.segments[0].a.y);
        for(let i = 1; i < wall.segments.length; i++) {
            context.lineTo(wall.segments[i].a.x, wall.segments[i].a.y);
            context.stroke();
        }
        context.fill();
    }
}
