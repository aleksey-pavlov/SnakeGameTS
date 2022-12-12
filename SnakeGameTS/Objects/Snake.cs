using SnakeGameTS.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SnakeGameTS.Objects
{

    public interface ISnake
    {
        void Move();

        void TurnUp();

        void TurnDown();

        void TurnLeft();

        void TurnRight();

        PositionDto GetPosition();

        void SetPosition(int x, int y);

        SnakePart[] GetParts();

        void Eat(IFood food);

        SnakeSyncDto AsSyncDto();
    }

    public class Snake : ISnake
    {
        public List<SnakePart> Parts { get; set; }
        public int Width { get; set; }
        public int Height { get; set; }
        public int Dx { get; set; }
        public int Dy { get; set; }
        public int MaxY { get; set; }
        public int MaxX { get; set; }

        public Snake(int width, int height, int max_x, int max_y)
        {

            Parts = new List<SnakePart> {
                new SnakePart(60, 20),
                new SnakePart(40, 20),
                new SnakePart(20, 20),
            };

            Width = width;
            Height = height;
            Dx = 20;
            Dy = 0;
            MaxX = max_x;
            MaxY = max_y;
        }

        public void Move()
        {

            SnakePart head = new SnakePart(Parts[0].X + Dx, Parts[0].Y + Dy);
            Parts.Insert(0, head);
            Parts.Remove(Parts.Last());
        }

        public void TurnUp()
        {

            if (Dx == 0)
                return;

            Dy = -20;
            Dx = 0;
        }

        public void TurnDown()
        {

            if (Dx == 0)
                return;

            Dy = 20;
            Dx = 0;
        }

        public void TurnLeft()
        {

            if (Dy == 0)
                return;

            Dy = 0;
            Dx = -20;
        }

        public void TurnRight()
        {

            if (Dy == 0)
                return;

            Dy = 0;
            Dx = 20;
        }

        public PositionDto GetPosition()
        {
            return new PositionDto()
            {
                X = Parts[0].X,
                Y = Parts[0].Y
            };
        }

        public void SetPosition(int x, int y)
        {
            Parts[0].X = x;
            Parts[0].Y = y;
        }

        public SnakePart[] GetParts()
        {
            return Parts.ToArray();
        }

        public void Eat(IFood food)
        {
            food.Eaten();

            SnakePart head = new SnakePart(Parts[0].X + Dx, Parts[0].Y + Dy);

            Parts.Insert(0, head);
        }

        public SnakeSyncDto AsSyncDto()
        {
            return new SnakeSyncDto
            {
                Parts = Parts.Select(p => new PositionDto { X = p.X, Y = p.Y }).ToArray()
            };
        }
    }

    public class SnakePart
    {
        public int X { get; set; }

        public int Y { get; set; }

        public SnakePart(int x, int y)
        {
            X = x;
            Y = y;
        }
    }
}
