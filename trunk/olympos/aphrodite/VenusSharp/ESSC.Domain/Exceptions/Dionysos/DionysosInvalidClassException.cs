using ESSC.Domain.Enums;

namespace ESSC.Domain.Exceptions.Dionysos
{
    public class DionysosInvalidClassException : DionysosException
    {
        public DionysosInvalidClassException() : base(ErrorCodes.ClassNameInvalid,"Invalid class name")
        {
        }
    }
}