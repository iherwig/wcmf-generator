using ESSC.Domain.Enums;

namespace ESSC.Domain.Exceptions.Dionysos
{
    public class DionysosAuthenticationException : DionysosException
    {
        public DionysosAuthenticationException() : base(ErrorCodes.AuthenticationFailed, "authentication failed")
        {
        }
    }
}