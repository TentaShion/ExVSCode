using PatternViewerWasm.Entities;
using System.Collections.Generic;
using System.Linq;
using System.Numerics;

namespace PatternViewerWasm.Models
{
    public class GraphModel
    {
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
