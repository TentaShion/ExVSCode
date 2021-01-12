namespace PatternViewerWasm.Entities
{
    /// <summary>
    /// Gumowski Mira を描画する際のパラメータ
    /// </summary>
    public class GumowskiMiraEntity
    {
        public double A { get; set; }

        /// <summary>
        /// 最大計算回数
        /// </summary>
        public int GiveUpBorder { get; set; }

        public double Mu { get; set; }

        /// <summary>
        /// 座標の分割数
        /// </summary>
        public int PartitionCount { get; set; }
    }
}
