using System;
using System.Web.Http;
using ESSC.ApplicationServices.Enums;
using ESSC.ApplicationServices.Models;
using ESSC.ApplicationServices.Services.Contracts;
using ESSC.Domain.Contracts;

namespace ESSC.ApplicationServices.Controllers
{
    [RoutePrefix("api/dionysos")]
    public class DionysosVerController : BaseApiController
    {
        public DionysosVerController(IDionysosLogService logService, IPersistenceManager persistenceManager, ITokenManager tokenManager)
            : base(logService, persistenceManager, tokenManager)
        {
        }

        [HttpGet]
        [Route("ver")]
        public IHttpActionResult Get()
        {
            var response = new DionysosResponse();
            try
            {
                response.Action = ModelActions.Ver;
                response.Oid = "1.0";
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