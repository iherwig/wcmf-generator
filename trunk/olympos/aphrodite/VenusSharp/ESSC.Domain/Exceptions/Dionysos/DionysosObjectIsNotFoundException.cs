using ESSC.Domain.Common;
using ESSC.Domain.Enums;

namespace ESSC.Domain.Exceptions.Dionysos
{
    public class DionysosObjectIsNotFoundException : DionysosException
    {
        public DionysosObjectIsNotFoundException(string className, int id) : base(ErrorCodes.GeneralError,string.Format("({0}) with id ({1}) is not found",className,id))
        {
        }
        public DionysosObjectIsNotFoundException(Oid oid)
            : base(ErrorCodes.GeneralError, string.Format("({0}) with id ({1}) is not found", oid.Type, oid.Id))
        {
        }
    }
}