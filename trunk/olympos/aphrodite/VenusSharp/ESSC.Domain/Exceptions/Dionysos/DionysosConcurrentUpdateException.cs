using ESSC.Domain.Enums;

namespace ESSC.Domain.Exceptions.Dionysos
{
    public class DionysosConcurrentUpdateException : DionysosException
    {
        public DionysosConcurrentUpdateException()
            : base(ErrorCodes.ActionInvalid, "The server detected an concurrent update (refer to section 3.7 for details of Specification Doc)")
        {
        }
    }
}
