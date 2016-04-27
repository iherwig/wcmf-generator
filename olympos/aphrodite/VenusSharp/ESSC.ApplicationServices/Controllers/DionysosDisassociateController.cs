using System.Web.Http;
using ESSC.ApplicationServices.Enums;
using ESSC.ApplicationServices.Models;
using ESSC.ApplicationServices.Services.Contracts;
using ESSC.Domain.Contracts;

namespace ESSC.ApplicationServices.Controllers
{
    [RoutePrefix("api/dionysos")]
    public class DionysosDisassociateController : BaseApiController
    {
        public DionysosDisassociateController(IDionysosLogService logService, IPersistenceManager persistenceManager,
            ITokenManager tokenManager) : base(logService, persistenceManager, tokenManager)
        {
        }

        [HttpPost]
        [Route("Disassociate")]
        public IHttpActionResult Post(DionysosAssociateRequest request)
        {
            return ProcessAction((action) =>
            {
                return action.Execute();

            }, request, ModelActions.Disassociate, requiredClassName: false);
        }
    }
}