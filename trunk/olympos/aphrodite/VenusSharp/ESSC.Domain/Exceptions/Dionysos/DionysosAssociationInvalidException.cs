using ESSC.Domain.Enums;

namespace ESSC.Domain.Exceptions.Dionysos
{
    public class DionysosAssociationInvalidException : DionysosException
    {
        public DionysosAssociationInvalidException()
            : base(ErrorCodes.ActionInvalid, "There is no association between the source and the target class.")
        {
        }
    }
}
