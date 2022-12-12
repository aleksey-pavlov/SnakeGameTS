"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Food = void 0;
var Food = /** @class */ (function () {
    function Food(width, height) {
        this.width = width;
        this.height = height;
        this.x = 0;
        this.y = 0;
    }
    Food.prototype.draw = function (ctx) {
        ctx.beginPath();
        ctx.fillStyle = "green";
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.closePath();
    };
    Food.prototype.sync = function (food) {
        this.x = food.x;
        this.y = food.y;
    };
    return Food;
}());
exports.Food = Food;
