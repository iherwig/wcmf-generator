namespace ESSC.Domain.Common
{
    public class RelationMultiplicity
    {
        public RelationMultiplicity()
        {
            Minimum = null;
            Maximum = null;
        }
        public int? Minimum { get; set; }
        public int? Maximum { get; set; }
    }
}
