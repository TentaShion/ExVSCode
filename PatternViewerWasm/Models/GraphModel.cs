using PatternViewerWasm.Entities;
using System.Linq;
using System.Numerics;

namespace PatternViewerWasm.Models
{
    public class GraphModel
    {
        /// <summary>
        /// Gumowski Mira の算出
        /// </summary>
        public int[][] CaluclateGumowskiMira(GumowskiMiraEntity condition)
        {
            var a = condition.A;
            var mu = condition.Mu;
            var u = new double[condition.GiveUpBorder];
            var v = new double[condition.GiveUpBorder];

            u[0] = 0.1;
            v[0] = 0.1;
            for (var t = 1; t < condition.GiveUpBorder; t++)
            {
                u[t] = v[t - 1] + v[t - 1] * a * (1 - 0.05 * v[t - 1] * v[t - 1]) + mu * u[t - 1] + (2 * (1 - mu) * u[t - 1] * u[t - 1]) / (1 + u[t - 1] * u[t - 1]);
                v[t] = -u[t - 1] + mu * u[t] + (2 * (1 - mu) * u[t] * u[t]) / (1 + u[t] * u[t]);
            }
            var umin = u.Min();
            var vmin = v.Min();

            var result = new int[condition.PartitionCount][];
            for (var y = 0; y < condition.PartitionCount; y++)
            {
                result[y] = new int[condition.PartitionCount];
            }

            var scale = condition.GiveUpBorder - 1;
            var uscale = u.Max() - umin;
            var vscale = v.Max() - vmin;
            for (var t = 1; t < condition.GiveUpBorder; t++)
            {
                var x = (int)(scale * (u[t] - umin) / uscale);
                var y = (int)(scale * (v[t] - vmin) / vscale);
                result[y][x] = 1;
            }
            return result;
        }

        /// <summary>
        /// マンデルブロ集合の算出
        /// </summary>
        public int[][] CaluclateMandelbrotSet(MandelbrotEntity condition)
        {
            var scaleIm = (condition.PointMaximum.Imaginary - condition.PointMinimum.Imaginary) / condition.PartitionCount;
            var scaleRe = (condition.PointMaximum.Real - condition.PointMinimum.Real) / condition.PartitionCount;

            var range = Enumerable.Range(0, condition.PartitionCount);
            var rangeIm = range.Select(point => scaleIm * point + condition.PointMinimum.Imaginary).ToArray();
            var rangeRe = range.Select(point => scaleRe * point + condition.PointMinimum.Real).ToArray();

            var result = new int[condition.PartitionCount][];
            for (var iIm = 0; iIm < condition.PartitionCount; iIm++)
            {
                result[iIm] = new int[condition.PartitionCount];
            }

            for (var iIm = 0; iIm < rangeIm.Length; iIm++)
            {
                for (var iRe = 0; iRe < rangeRe.Length; iRe++)
                {
                    var constant = new Complex(
                        rangeRe[iRe],
                        rangeIm[iIm]
                    );

                    var history = new Complex[condition.GiveUpBorder];
                    history[0] = new Complex(0, 0);
                    for (var trial = 1; trial < condition.DivergenceBorder; trial++)
                    {
                        history[trial] = Complex.Pow(history[trial - 1], 2f) + constant;
                        if (condition.DivergenceBorder <= Complex.Abs(history[trial]))
                        {
                            result[iIm][iRe] = (trial % 255) + 1;
                            break;
                        }
                    }
                }
            }
            return result;
        }
    }
}
