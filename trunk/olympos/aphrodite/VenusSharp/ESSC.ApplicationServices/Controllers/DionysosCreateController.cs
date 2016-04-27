using System.Web.Http;
using ESSC.ApplicationServices.Enums;
using ESSC.ApplicationServices.Models;
using ESSC.ApplicationServices.Services.Contracts;
using ESSC.Domain.Contracts;

namespace ESSC.ApplicationServices.Controllers
{
    [RoutePrefix("api/dionysos")]
    public class DionysosCreateController : BaseApiController
    {
        public DionysosCreateController(IDionysosLogService logService, IPersistenceManager persistenceManager,
            ITokenManager tokenManager) : base(logService, persistenceManager, tokenManager)
        {
        }

        [HttpPost]
        [Route("create")]
        public IHttpActionResult Post(DionysosRequest request)
        {
            //TODO: why do we have many savechanges? this code should be minimized to single call to the repostory Repository.Create
            return ProcessAction((action) =>
            {
                return action.Execute();

            }, request, ModelActions.Create);
        }
    }
}