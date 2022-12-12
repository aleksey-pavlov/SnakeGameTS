import { FoodSyncDto } from "../models/syncdto";

export class Food {

    width: number;
    height: number;
    x: number;
    y: number;

    constructor(width: number, height: number) {

        this.width = width;
        this.height = height;
        this.x = 0;
        this.y = 0;
    }

    draw(ctx: CanvasRenderingContext2D) {

        ctx.beginPath();
        ctx.fillStyle = "green";
        ctx.fillRect(this.x, this.y, this.width, this.height)
        ctx.closePath();
    }

    sync(food: FoodSyncDto) {
        this.x = food.x;
        this.y = food.y;
    }
}