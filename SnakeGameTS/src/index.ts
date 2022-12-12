import { Food } from "./objects/Food";
import { Snake } from "./objects/Snake";
import * as signalR from "@microsoft/signalr";
import { Player } from "./objects/Player";
import { SyncDto } from "./models/syncdto";


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

server.on("tick", (data: SyncDto) => {

    ctx.clearRect(0, 0, APP_WIDTH, APP_HEIGHT);

    food.sync(data.food);

    if (food.x != 0 && food.y != 0)
        food.draw(ctx);

    for (let p in data.players) {

        let syncPlayer = data.players[p];
        let playerId = syncPlayer.id;

        let clientPlayer = clientPlayers[playerId];
        clientPlayer.sync(syncPlayer);

        //if (clientPlayer.isGameOver && currentPlayerId == playerId)
          //  GameOver();

        clientPlayer.snake.draw(ctx);
    }
    
    drawScore();

    setTimeout(() => server.send("tick"), 150);
});

server.start().then(async () => {
    await server.send("gameStart", currentPlayerId);

    server.send("tick")

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
        }
    }
});

server.on("playerConnectedSync", (playerId) => {
    clientPlayers[playerId] = new Player(new Snake(20, 20));
});


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