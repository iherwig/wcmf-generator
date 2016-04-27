using ESSC.Domain.Enums;
using System;

namespace ESSC.Domain.Exceptions.Dionysos
{
    public abstract class DionysosException:ApplicationException
    {
        public DionysosException(ErrorCodes errorCode, string message = null):base(message)
        {
            this.ErrorCode = errorCode;
        }

        public ErrorCodes ErrorCode { get; set; }
        public string DisplayErrorMessage { get; set; }
        public object ErrorData { get; set; }
    }

   
}