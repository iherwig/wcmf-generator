using ESSC.ApplicationServices.Models;
using ESSC.ApplicationServices.Services.Contracts;
using ESSC.Domain.Contracts;
using ESSC.Domain.Exceptions.Dionysos;

namespace ESSC.ApplicationServices.DionysosActionHandlers
{
    public class LoginActionHandler : BaseDionysosAction
    {
        readonly ITokenManager _tokenManager;
        readonly DionysosLoginRequest _request;

        public LoginActionHandler(IPersistenceManager persistenceManager, ITokenManager tokenManager, DionysosLoginRequest request):base(persistenceManager)
        {
            _tokenManager = tokenManager;
            _request = request;
        }

        public override DionysosBaseResponse Execute()
        {
            var response = new DionysosLoginResponse();
            
            var found = PersistenceManager.FindUser(_request.UserName, _request.Password);
            if (found == null)
                throw new DionysosAuthenticationException();
            //Create the token
            var token = _tokenManager.CreateToken(found.Name, found.Role);
            response.Sid = token;
            response.UserName = _request.UserName;
            response.Roles = found.RolesArray;
            response.Password = _request.Password;

            return response;
        }
    }
}