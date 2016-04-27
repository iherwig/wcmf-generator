using ESSC.Domain.Enums;

namespace ESSC.Domain.Exceptions.Dionysos
{
    public class DionysosSearchException : DionysosException
    {
        public DionysosSearchException(ErrorCodes errorCode, string message = null) : base(errorCode, message)
        {
        }
    }
}