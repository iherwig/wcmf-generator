using ESSC.ApplicationServices.Models;
using ESSC.ApplicationServices.Services.Contracts;
using ESSC.Domain.Contracts;

namespace ESSC.ApplicationServices.DionysosActionHandlers
{
    public class CreateActionHandler : BaseDionysosAction
    {
        readonly DionysosBaseRequest _request;

        public CreateActionHandler(IPersistenceManager persistenceManager, DionysosBaseRequest request):base(persistenceManager)
        {
            _request = request;
        }

        public override DionysosBaseResponse Execute()
        {
            var response = new DionysosResponse();           
            return response;
        }
    }
}