using ESSC.Domain.Enums;

namespace ESSC.Domain.Exceptions.Dionysos
{
    public class DionysosListNegativeLimitException : DionysosListException
    {
        public DionysosListNegativeLimitException(int limit) : base(ErrorCodes.LimitNegative, string.Format("limit value ({0}) is invalid",limit))
        {
        }
    }
}