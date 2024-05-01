using Microsoft.AspNetCore.SignalR;
using SnakeGameTS.Models;
using SnakeGameTS.Services;
using System;
using System.Threading.Tasks;

namespace SnakeGameTS.Hubs
{
    public class GameHub : Hub
    {
        IGameService Game;

        public GameHub(IGameService game, IHubContext<GameHub> _hubContext) : base()
        {
            if (game == null)
                throw new NullReferenceException(nameof(game));

            Game = game;

            Game.Subcsribe((food) => _hubContext.Clients.All.SendAsync("foodSync", food));
        }

        public async Task ControlCmd(long playerId, string cmd)
        {
            var player = Game.PlayerControlCmd(playerId, cmd);

            await Clients.All.SendAsync("playerSync", player);
        }

        public async Task GameStart(long playerId)
        {
            Game.JoinGame(playerId);

            await Clients.Caller.SendAsync("syncGame", Game.GetSyncData());

            await Clients.Others.SendAsync("playerConnectedSync", playerId);      
        }
    }
}
