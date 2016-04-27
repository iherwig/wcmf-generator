using ESSC.Domain.Enums;
using System;

namespace ESSC.Domain.Exceptions
{
    public class DomainBaseException:ApplicationException
    {
        public ErrorCodes ErrorCode { get; private set; }
        public DomainBaseException(ErrorCodes errorCode, string message):base(message)
        {
            ErrorCode = errorCode;
        }
    }
}
