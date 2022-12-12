"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var Food_1 = require("./objects/Food");
var Snake_1 = require("./objects/Snake");
var signalR = require("@microsoft/signalr");
var Player_1 = require("./objects/Player");
var clientPlayers = {};
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var APP_WIDTH = 600;
var APP_HEIGHT = 600;
var currentPlayerId = GetPlayerId();
var server = new signalR.HubConnectionBuilder()
    .withUrl("/hub")
    .build();
var food = new Food_1.Food(20, 20);
server.on("tick", function (data) {
    ctx.clearRect(0, 0, APP_WIDTH, APP_HEIGHT);
    food.sync(data.food);
    if (food.x != 0 && food.y != 0)
        food.draw(ctx);
    for (var p in data.players) {
        var syncPlayer = data.players[p];
        var playerId = syncPlayer.id;
        var clientPlayer = clientPlayers[playerId];
        clientPlayer.sync(syncPlayer);
        //if (clientPlayer.isGameOver && currentPlayerId == playerId)
        //  GameOver();
        clientPlayer.snake.draw(ctx);
    }
    drawScore();
    setTimeout(function () { return server.send("tick"); }, 150);
});
server.start().then(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, server.send("gameStart", currentPlayerId)];
            case 1:
                _a.sent();
                server.send("tick");
                document.onkeyup = function (e) {
                    switch (e.code) {
                        case "ArrowUp":
                            server.send("controlCmd", currentPlayerId, "ArrowUp");
                            break;
                        case "ArrowDown":
                            server.send("controlCmd", currentPlayerId, "ArrowDown");
                            break;
                        case "ArrowLeft":
                            server.send("controlCmd", currentPlayerId, "ArrowLeft");
                            break;
                        case "ArrowRight":
                            server.send("controlCmd", currentPlayerId, "ArrowRight");
                            break;
                    }
                };
                return [2 /*return*/];
        }
    });
}); });
server.on("playerConnectedSync", function (playerId) {
    clientPlayers[playerId] = new Player_1.Player(new Snake_1.Snake(20, 20));
});
function GameOver() {
    alert("Game Over");
}
function GetPlayerId() {
    var storagePlayerId = Number(localStorage.getItem("playerId"));
    if (!storagePlayerId)
        storagePlayerId = Math.round(Date.now() / 1000);
    localStorage.setItem("playerId", String(storagePlayerId));
    return storagePlayerId;
}
function drawScore() {
    var scoreEl = document.getElementById("score");
    scoreEl.innerHTML = JSON.stringify(clientPlayers);
}
