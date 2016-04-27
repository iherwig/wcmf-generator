using ESSC.Domain.Enums;

namespace ESSC.Domain.Exceptions.Dionysos
{
    public class DionysosGenericFatalException : DionysosException
    {
        public DionysosGenericFatalException(string message) : base(ErrorCodes.GeneralFatal,message)
        {
        }
    }
}