using System;
using System.Threading;
using System.Web;
using System.Web.Http;
using ESSC.ApplicationServices.DependencyResolution;
using ESSC.ApplicationServices.Enums;
using ESSC.ApplicationServices.Models;
using ESSC.ApplicationServices.Services.Contracts;
using ESSC.Domain.Enums.Generated;
using ESSC.Domain.Contracts;
using ESSC.Domain.Exceptions.Dionysos;
using ESSC.Domain.Enums;

namespace ESSC.ApplicationServices.Controllers
{
    public abstract class BaseApiController : ApiController
    {
        protected ContextInformation ContextInformation;
        protected readonly IDionysosLogService LogService;
        protected readonly IPersistenceManager PersistenceManager;
        protected readonly ITokenManager TokenManager;
        
        public BaseApiController(IDionysosLogService logService, IPersistenceManager repository, ITokenManager tokenManager)
        {
            LogService = logService;
            PersistenceManager = repository;
            TokenManager = tokenManager;
        }

        protected void ValidateRequest(ModelActions requiredAction, DionysosBaseRequest request,
            DionysosBaseResponse response, bool isAuthorized=true, bool classNameRequired = true)
        {
            if (request == null)
                throw new DionysosGenericFatalException("request object is not valid");
            if (isAuthorized)
            {
                if(string.IsNullOrEmpty(request.Sid))
                    throw new DionysosSessionInvalidException();
                try
                {
                    var principle = TokenManager.ValidateToken(request.Sid);
                    Thread.CurrentPrincipal = principle;
                    HttpContext.Current.User = principle;
                }
                catch (Exception exception)
                {
                    throw new DionysosSessionInvalidException();
                }
            }
           
            if (request.Action == ModelActions.Unknown || request.Action != requiredAction)
                throw new DionysosInvalidActionException();
            if (classNameRequired && request.ClassName == DomainTypes.Unknown)
                throw new DionysosInvalidClassException();
            if (response != null)
            {
                response.ClassName = classNameRequired ? (DomainTypes?) request.ClassName : null;
                response.Action = request.Action;
            }
        }

        protected void AttachErrorToResponse(DionysosBaseResponse response, Exception exception)
        {
            LogService.LogException(exception);

            response.Success = false;

            if (exception is DionysosException)
            {
                var dionysosException = exception as DionysosException;

                response.ErrorCode = dionysosException.ErrorCode;
                response.ErrorMessage = dionysosException.Message;
                response.ErrorData = dionysosException.ErrorData;
            }
            else
            {
                response.ErrorCode = ErrorCodes.GeneralFatal;
                response.ErrorMessage = "Unknown error";
            }
        }

        [Obsolete]
        protected IHttpActionResult ProcessAction(Action actionLogic, DionysosBaseRequest request,
            DionysosBaseResponse response, ModelActions requiredActionName, bool isAuthroized=true, bool requiredClassName = true)
        {
            try
            {
                ValidateRequest(requiredActionName, request, response, isAuthroized, requiredClassName);
                actionLogic();
                response.Action = requiredActionName;
                response.ClassName = requiredClassName ? request.ClassName : (DomainTypes?) null;
                response.Success = true;
            }
            catch (Exception ex)
            {
                AttachErrorToResponse(response, ex);
            }

            return Ok(response);
        }

        //New ProcessAction that uses IDionysosAction. this will replace above ProcessAction
        protected IHttpActionResult ProcessAction(Func<IDionysosAction, DionysosBaseResponse> actionLogic, DionysosBaseRequest request,
           ModelActions requiredActionName, bool isAuthroized = true, bool requiredClassName = true)
        {
            DionysosBaseResponse response = new DionysosResponse();
            
            try
            {
                ValidateRequest(requiredActionName, request, response, isAuthroized, requiredClassName);

                //ActionHandlers must have parameter name "request"
                //We are creating ActionHandler instance with paramenter name not by parameter type
                // so that we can pass differenct types of DionysosRequest to ActionHandler
                var dionysosAction = IoC.container.With("request").EqualTo(request).GetInstance<IDionysosAction>(requiredActionName.ToString());

                response = actionLogic(dionysosAction);
                response.Action = requiredActionName;
                response.ClassName = request.ClassName;
                response.Success = true;
            }
            catch (Exception ex)
            {
                AttachErrorToResponse(response, ex);
            }

            return Ok(response);
        }
    }
}