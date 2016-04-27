using ESSC.Domain.Enums;

namespace ESSC.Domain.Exceptions.Dionysos
{
    public class DionysosInvalidDepthException : DionysosException
    {
        public DionysosInvalidDepthException(int depth) : base(ErrorCodes.InvalidDepth,string.Format("Provided depth paramter ({0}) is not valid",depth))
        {
        }
    }
}