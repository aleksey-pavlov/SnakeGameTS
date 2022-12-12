using SnakeGameTS.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SnakeGameTS.Objects
{
    public interface IPlayer
    {
        int ScoreInc();

        void GameOver();

        ISnake GetSnake();

        PlayerSyncDto AsSyncDto(long id);
        
    }

    public class Player : IPlayer
    {

        public ISnake Snake { get; set; }

        public int Score { get; set; } = 0;

        public bool IsGameOver { get; set; } = false;

        public Player(ISnake snake)
        {
            Snake = snake;
        }

        public int ScoreInc() => ++Score;

        public void GameOver() => IsGameOver = true;

        public ISnake GetSnake() => Snake;

        public PlayerSyncDto AsSyncDto(long id)
        {
            return new PlayerSyncDto
            {
                Id = id,
                IsGameOver = IsGameOver,
                Score = Score,
                Snake = Snake.AsSyncDto()
            };
        }
    }
}
