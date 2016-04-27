using ESSC.Domain.Enums;

namespace ESSC.Domain.Exceptions.Dionysos
{
    public class DionysosListSortFieldUnknownException : DionysosException
    {
        public DionysosListSortFieldUnknownException(string sortField = null) : base(ErrorCodes.SortFieldUnknown,string.Format("sort field ({0}) is not supported",sortField))
        {
        }
    }
}