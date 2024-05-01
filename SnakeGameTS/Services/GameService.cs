using SnakeGameTS.Helpers;
using SnakeGameTS.Models;
using SnakeGameTS.Objects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SnakeGameTS.Services
{

    public delegate void FoodSyncAction(PositionDto data);

    public interface IGameService
    {
        void JoinGame(long playerId);

        PlayerSyncDto PlayerControlCmd(long playerId, string cmd);

        void Tick();

        Task GameLoop();

        SyncDto GetSyncData();

        void Subcsribe(FoodSyncAction call);

    }

    public class GameService : IGameService
    {
        const int APP_WIDTH = 600;
        const int APP_HEIGHT = 600;

        Dictionary<long, IPlayer> Players = new Dictionary<long, IPlayer>();

        IFood Food = new Food(20, 20, APP_WIDTH, APP_HEIGHT);

        FoodSyncAction FoodSync;

        public GameService()
        {

        }

        public void Subcsribe(FoodSyncAction call)
        {
            FoodSync = call;
        }

        public void JoinGame(long playerId)
        {
            if (Players.TryGetValue(playerId, out var player))
                return;

            var snake = new Snake(20, 20, APP_WIDTH, APP_HEIGHT);

            player = new Player(snake);

            Players.Add(playerId, player);
                
        }

        public PlayerSyncDto PlayerControlCmd(long playerId, string cmd)
        {
            if (!Players.TryGetValue(playerId, out var player))
                return null;

            var snake = player.GetSnake();

            switch (cmd)
            {
                case "ArrowUp":
                    snake.TurnUp();
                    break;

                case "ArrowDown":
                    snake.TurnDown();
                    break;

                case "ArrowLeft":
                    snake.TurnLeft();
                    break;

                case "ArrowRight":
                    snake.TurnRight();
                    break;

                case "Move":
                    snake.Move();
                    break;
            }

            return player.AsSyncDto(playerId);
        }

        public void Tick()
        {
            var foodPosition = Food.GetPosition();

            if (foodPosition.X == 0 && foodPosition.Y == 0)
            {
                Food.SetPosition(MathHelper.Random(20, APP_WIDTH - 20, 20), MathHelper.Random(20, APP_HEIGHT - 20, 20));
                if (FoodSync != null)
                {
                    FoodSync(Food.GetPosition());
                }
            }
            
            foreach (var pair in Players)
            {
                var player = pair.Value;

                var snake = player.GetSnake();
                var snakeParts = snake.GetParts();
                var snakePos = snake.GetPosition();

                for (var i = 0; i < snakeParts.Length; i++)
                {
                    if (i == 0)
                        continue;

                    var x = snakeParts[i].X;
                    var y = snakeParts[i].Y;

                    if (snakePos.X == x && snakePos.Y == y)
                    {
                        player.GameOver();
                        return;
                    }
                }

                if (snakePos.X > APP_WIDTH || snakePos.Y > APP_WIDTH || snakePos.X < 0 || snakePos.Y < 0)
                {
                    player.GameOver();
                    return;
                }

                if (snakePos.X == foodPosition.X && snakePos.Y == foodPosition.Y)
                {
                    snake.Eat(Food);
                    player.ScoreInc();
                }
            }
        }

        public SyncDto GetSyncData()
        {
            return new SyncDto
            {
                Food = Food.GetPosition(),
                Players = Players.Select(p => p.Value.AsSyncDto(p.Key)).ToArray()
            };
        }

        public async Task GameLoop()
        {
            while (true)
            {
                Tick();
                await Task.Delay(150);
            }
        }
    }
}
