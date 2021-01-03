using System.Numerics;

namespace PatternViewerWasm.Entities
{
    /// <summary>
    /// マンデルブロ集合を描画する際のパラメータ
    /// </summary>
    public class MandelbrotEntity
    {
        /// <summary>
        /// 発散判定のための閾値
        /// </summary>
        public int DivergenceBorder { get; set; }

        /// <summary>
        /// 最大計算回数
        /// </summary>
        public int GiveUpBorder { get; set; }

        /// <summary>
        /// 座標の分割数
        /// </summary>
        public int PartitionCount { get; set; }

        /// <summary>
        /// 描画座標(最大)
        /// </summary>
        public Complex PointMaximum { get; set; }

        /// <summary>
        /// 描画座標(最小)
        /// </summary>
        public Complex PointMinimum { get; set; }
    }
}
