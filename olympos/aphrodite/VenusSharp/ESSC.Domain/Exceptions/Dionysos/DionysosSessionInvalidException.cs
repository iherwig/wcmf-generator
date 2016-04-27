using ESSC.Domain.Enums;

namespace ESSC.Domain.Exceptions.Dionysos
{
    public class DionysosSessionInvalidException : DionysosException
    {
        public DionysosSessionInvalidException() : base(ErrorCodes.SessionInvalid, "invalid session")
        {
        }
    }
}