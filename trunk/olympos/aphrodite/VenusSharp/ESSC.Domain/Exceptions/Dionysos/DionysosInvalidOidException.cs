using ESSC.Domain.Enums;

namespace ESSC.Domain.Exceptions.Dionysos
{
    public class DionysosInvalidOidException : DionysosException
    {
        public DionysosInvalidOidException(string oid) : base(ErrorCodes.OidInvalid,string.Format("({0}) is invalid Oid",oid))
        {
        }
    }
}