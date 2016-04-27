using ESSC.Domain.Enums;

namespace ESSC.Domain.Exceptions.Dionysos
{
    public class DionysosSortDirectionUnknownException : DionysosException
    {
        public DionysosSortDirectionUnknownException() : base(ErrorCodes.SortDirectionUnknown,"Unknown sort direction")
        {
        }
    }
}