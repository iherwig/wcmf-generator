using ESSC.Domain.Enums;

namespace ESSC.Domain.Exceptions.Dionysos
{
    public class DionysosListOffsetOutOfBoundException : DionysosListException
    {
        public DionysosListOffsetOutOfBoundException(int offset) : base(ErrorCodes.OffsetOutOfBounds,string.Format("offset ({0}) is invalid",offset))
        {
        }
    }
}