using ESSC.Domain.Enums;

namespace ESSC.Domain.Exceptions
{
    public class DomainInvalidOidException:DomainBaseException
    {
        public DomainInvalidOidException(string message):base(ErrorCodes.OidInvalid,message)
        {
        }
    }
}
