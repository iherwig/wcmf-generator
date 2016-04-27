using ESSC.Domain.Enums;

namespace ESSC.Domain.Exceptions.Dionysos
{
    public class DionysosInvalidActionException : DionysosException
    {
        public DionysosInvalidActionException() : base(ErrorCodes.ActionInvalid, "Invalid action")
        {
        }
    }
}