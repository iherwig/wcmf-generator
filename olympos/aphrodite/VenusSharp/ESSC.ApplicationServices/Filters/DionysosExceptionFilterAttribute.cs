using System.Net.Http;
using System.Web.Http.Filters;
using ESSC.ApplicationServices.Enums;
using ESSC.ApplicationServices.Models;
using ESSC.ApplicationServices.Services.Contracts;
using ESSC.Domain.Enums.Generated;
using ESSC.Domain.Enums;

namespace ESSC.ApplicationServices.Filters
{
    public class DionysosExceptionFilterAttribute:ExceptionFilterAttribute
    {
        readonly IDionysosLogService _logService;

        public DionysosExceptionFilterAttribute(IDionysosLogService logService)
        {
            _logService = logService;
        }

        public override void OnException(HttpActionExecutedContext actionExecutedContext)
        {
            if (actionExecutedContext.Exception != null)
            {
                _logService.LogException(actionExecutedContext.Exception);
                actionExecutedContext.Response = actionExecutedContext.Request.CreateResponse(new DionysosResponse
                {
                    Action = ModelActions.Unknown,
                    ClassName = DomainTypes.Unknown,
                    ErrorCode = ErrorCodes.GeneralFatal,
                    ErrorMessage = "Fatal error hapened",
                    ErrorData = null,
                    Success = false
                });
            }
        }
    }
}