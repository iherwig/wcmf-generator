using ESSC.Domain.Enums;

namespace ESSC.Domain.Exceptions.Dionysos
{
    public class DionysosListException : DionysosException
    {
        public DionysosListException(ErrorCodes errorCode, string message = null) : base(errorCode, message)
        {
        }
    }
}