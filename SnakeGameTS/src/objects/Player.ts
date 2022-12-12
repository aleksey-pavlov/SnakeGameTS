import { PlayerSyncDto } from "../models/syncdto";
import { Snake } from "./Snake";

export class Player {

    snake: Snake;
    score: number;
    isGameOver: boolean;

    constructor(snake: Snake) {
        this.snake = snake;
        this.score = 0;
        this.isGameOver = false;
    }

    public sync(player: PlayerSyncDto)
    {
        this.score = player.score;
        this.isGameOver = player.isGameOver;
        this.snake.sync(player.snake);
    }
}