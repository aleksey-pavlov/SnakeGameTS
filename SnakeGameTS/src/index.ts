import { Food } from "./objects/Food";
import { Snake } from "./objects/Snake";
import * as signalR from "@microsoft/signalr";
import { Player } from "./objects/Player";
import { SyncDto, PlayerSyncDto, FoodSyncDto } from "./models/syncdto";


let clientPlayers: { [x: number]: Player } = {}

let canvas = document.getElementById("canvas") as HTMLCanvasElement;

var ctx = canvas.getContext("2d");

const APP_WIDTH = 600;
const APP_HEIGHT = 600;

const currentPlayerId = GetPlayerId();

const server = new signalR.HubConnectionBuilder()
    .withUrl("/hub")
    .build();

let food = new Food(20, 20);


function GameOver() {
    alert("Game Over")
}

function GetPlayerId() {

    let storagePlayerId = Number(localStorage.getItem("playerId"));

    if (!storagePlayerId)
        storagePlayerId = Math.round(Date.now() / 1000);

    localStorage.setItem("playerId", String(storagePlayerId));

    return storagePlayerId;

}

function drawScore() {
    let scoreEl = document.getElementById("score");
    scoreEl.innerHTML = JSON.stringify(clientPlayers);
}

function createPlayer(playerId: number) {

    let player = new Player(new Snake(20, 20));

    clientPlayers[playerId] = player;

    player.snake.draw(ctx);

    console.log(`Connected player ${playerId}`);
}

function playerSync(player: PlayerSyncDto) {

    let playerId = player.id;

    if (!clientPlayers[playerId])
        createPlayer(playerId);

    let clientPlayer = clientPlayers[playerId];
    clientPlayer.sync(player);

    if (clientPlayer.isGameOver && currentPlayerId == playerId)
        GameOver();

    clientPlayer.snake.draw(ctx);

    drawScore();
}

function foodSync(data: FoodSyncDto) {

    food.sync(data);

    if (food.x != 0 && food.y != 0)
        food.draw(ctx);
}

function syncGame(data: SyncDto) {

    foodSync(data.food);

    for (let p in data.players) {
        playerSync(data.players[p]);
    }    
}

server.on("syncGame", (data: SyncDto) => syncGame(data));

server.on("playerSync", (player: PlayerSyncDto) => playerSync(player));

server.on("playerConnectedSync", (playerId: number) => createPlayer(playerId));

server.on("foodSync", (data: FoodSyncDto) => foodSync(data));


server.start().then(async () => {

    await server.send("gameStart", currentPlayerId);

    document.onkeyup = (e) => {
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

            case "Space":
                server.send("controlCmd", currentPlayerId, "Move");
                break;
        }
    }
}).catch(err => document.write(err));