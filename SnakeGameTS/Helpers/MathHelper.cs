using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SnakeGameTS.Helpers
{
    public static class MathHelper
    {

        public static int Random(int min, int max, int num)
        {
            return (new Random().Next(min, max) / num) * num;
        }

    }
}
