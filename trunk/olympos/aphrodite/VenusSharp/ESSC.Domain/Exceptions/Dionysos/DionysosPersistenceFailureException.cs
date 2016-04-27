using ESSC.Domain.Enums;

namespace ESSC.Domain.Exceptions.Dionysos
{
    public class DionysosPersistenceFailureException : DionysosException
    {
        public DionysosPersistenceFailureException(string message) : base(ErrorCodes.PersistenceFailed, message)
        {

        }
    }
}