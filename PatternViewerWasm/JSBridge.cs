using Microsoft.JSInterop;
using PatternViewerWasm.Entities;
using PatternViewerWasm.Models;
using System.Collections.Generic;
using System.Linq;
using System.Numerics;
using System.Threading.Tasks;

namespace PatternViewerWasm
{
    /// <summary>
    /// JavaScript へ公開するブリッジ関数
    /// </summary>
    public class JSBridge
    {
        /// <summary>
        /// マンデルブロ集合生成の呼び出し
        /// </summary>
        /// <param name="divergenceBorder">発散判定のための閾値</param>
        /// <param name="giveUpBorder">最大計算回数</param>
        /// <param name="partitionCount">座標の分割数</param>
        /// <param name="pointImageMaximum">虚部の描画座標(最大)</param>
        /// <param name="pointImageMinimum">虚部の描画座標(最小)</param>
        /// <param name="pointRealMaximum">実部の描画座標(最大)</param>
        /// <param name="pointRealMinimum">実部の描画座標(最小)</param>
        [JSInvokable]
        public static Task<int[][]> CallMandelbrotSetMaker(
            int divergenceBorder,
            int giveUpBorder,
            int partitionCount,
            double pointImageMaximum,
            double pointImageMinimum,
            double pointRealMaximum,
            double pointRealMinimum
        )
        {
            var condition = new MandelbrotEntity
            {
                DivergenceBorder = divergenceBorder,
                GiveUpBorder = giveUpBorder,
                PartitionCount = partitionCount,
                PointMaximum = new Complex(pointRealMaximum, pointImageMaximum),
                PointMinimum = new Complex(pointRealMinimum, pointImageMinimum)
            };

            var model = new GraphModel();
            var result = model.CaluclateMandelbrotSet(condition);

            // var mapped = Enumerable.Range(0, result.GetLength(1))
            //     .Select(x => result[0, x])
            //     .ToArray();

            return Task.FromResult(result);
        }

        /// <summary>
        /// Hello World
        /// </summary>
        [JSInvokable]
        public static Task<string> SayHello(string name)
        {
            return Task.FromResult($"Hello Blazor World, {name}!");
        }
    }
}
