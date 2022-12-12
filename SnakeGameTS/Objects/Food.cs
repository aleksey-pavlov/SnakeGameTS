using SnakeGameTS.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SnakeGameTS.Objects
{
    public interface IFood
    {
        void Eaten();
        PositionDto GetPosition();
        void SetPosition(int x, int y);
    }

    public class Food : IFood
    {
        public int Width { get; set; }
        public int Height { get; set; }
        public int X { get; set; }
        public int Y { get; set; }
        public int MaxX { get; set; }
        public int MaxY { get; set; }

        public Food(int width, int height, int max_x, int max_y)
        {
            Width = width;
            Height = height;
            X = 0;
            Y = 0;
            MaxX = max_x;
            MaxY = max_y;
        }

        public void Eaten()
        {
            X = 0;
            Y = 0;
        }

        public void SetPosition(int x, int y)
        {
            X = x;
            Y = y;
        }

        public PositionDto GetPosition()
        {
            return new PositionDto
            {
               X = X,
               Y = Y
            };
        }
    }
}
