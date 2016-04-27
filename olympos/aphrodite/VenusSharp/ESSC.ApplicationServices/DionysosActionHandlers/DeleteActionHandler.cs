using ESSC.ApplicationServices.Models;
using ESSC.Domain.Contracts;

namespace ESSC.ApplicationServices.DionysosActionHandlers
{
    public class DeleteActionHandler : BaseDionysosAction
    {
        readonly DionysosRequest _request;

        public DeleteActionHandler(IPersistenceManager persistenceManager, DionysosRequest request):base(persistenceManager)
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
