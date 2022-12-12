"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Player = void 0;
var Player = /** @class */ (function () {
    function Player(snake) {
        this.snake = snake;
        this.score = 0;
        this.isGameOver = false;
    }
    Player.prototype.sync = function (player) {
        this.score = player.score;
        this.isGameOver = player.isGameOver;
        this.snake.sync(player.snake);
    };
    return Player;
}());
exports.Player = Player;
