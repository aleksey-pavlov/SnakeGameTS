import { SnakeSyncDto } from "../models/syncdto";

export class Snake {

    parts: { x: number, y: number }[];
    width: number;
    height: number;

    constructor(width: number, height: number) {

        this.parts = [
            { x: 60, y: 20 },
            { x: 40, y: 20 },
            { x: 20, y: 20 }
        ]

        this.width = width;
        this.height = height;
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath()
        ctx.fillStyle = "red"
        this.parts.forEach((part) => ctx.fillRect(part.x, part.y, this.width, this.height));
        ctx.closePath();
    }

    sync(snake: SnakeSyncDto) {
        this.parts = snake.parts;
    }
}