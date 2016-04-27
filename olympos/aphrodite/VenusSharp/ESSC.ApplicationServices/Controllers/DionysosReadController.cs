using System.Web.Http;
using ESSC.ApplicationServices.Enums;
using ESSC.ApplicationServices.Models;
using ESSC.ApplicationServices.Services.Contracts;
using ESSC.Domain.Contracts;

namespace ESSC.ApplicationServices.Controllers
{
    [RoutePrefix("api/dionysos")]
    public class DionysosReadController : BaseApiController
    {
        public DionysosReadController(IDionysosLogService logService, IPersistenceManager persistenceManager, ITokenManager tokenManager)
            : base(logService, persistenceManager, tokenManager)
        {
        }

        [HttpPost]
        [Route("read")]
        public IHttpActionResult Post(DionysosReadRequest request)
        {
            return ProcessAction((action) =>
            {
                return action.Execute();

            }, request, ModelActions.Read,requiredClassName:false);

        }
    }
}