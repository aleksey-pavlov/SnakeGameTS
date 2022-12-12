"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Snake = void 0;
var Snake = /** @class */ (function () {
    function Snake(width, height) {
        this.parts = [
            { x: 60, y: 20 },
            { x: 40, y: 20 },
            { x: 20, y: 20 }
        ];
        this.width = width;
        this.height = height;
    }
    Snake.prototype.draw = function (ctx) {
        var _this = this;
        ctx.beginPath();
        ctx.fillStyle = "red";
        this.parts.forEach(function (part) { return ctx.fillRect(part.x, part.y, _this.width, _this.height); });
        ctx.closePath();
    };
    Snake.prototype.sync = function (snake) {
        this.parts = snake.parts;
    };
    return Snake;
}());
exports.Snake = Snake;
