using Microsoft.AspNetCore.SignalR;
using SnakeGameTS.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SnakeGameTS.Hubs
{
    public class GameHub : Hub
    {
        IGameService Game;

        public GameHub(IGameService game) : base()
        {
            if (game == null)
                throw new NullReferenceException(nameof(game));

            Game = game;
        }

        public Task ControlCmd(long playerId, string cmd)
        {
            Game.PlayerControlCmd(playerId, cmd);

            return Task.CompletedTask;
        }

        public async Task GameStart(long playerId)
        {
            Game.JoinGame(playerId);

            await Clients.All.SendAsync("playerConnectedSync", playerId);           
        }


        public async Task Tick()
        {           
            var data = Game.GetSyncData();
            await Clients.Caller.SendAsync("tick", data);
        }
    }
}
