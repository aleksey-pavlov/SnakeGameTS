using SnakeGameTS.Objects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SnakeGameTS.Models
{
 
    public class SnakeSyncDto 
    {
        public PositionDto[] Parts { get; set; }
    }

    public class PlayerSyncDto {
        public long Id { get; set; }
        public SnakeSyncDto Snake { get; set; }
        public int Score { get; set; }
        public bool IsGameOver { get; set; }
    }

    public class SyncDto {
        public PlayerSyncDto[] Players { get; set; }
        public PositionDto Food { get; set; }
    }
}
