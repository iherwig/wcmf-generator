using ESSC.ApplicationServices.Models;
using ESSC.Domain.Common;
using ESSC.Domain.Contracts;
using ESSC.Domain.Exceptions.Dionysos;
using Newtonsoft.Json.Linq;

namespace ESSC.ApplicationServices.DionysosActionHandlers
{
    public class UpdateActionHandler : BaseDionysosAction
    {
        readonly DionysosRequest _request;

        public UpdateActionHandler(IPersistenceManager persistenceManager, DionysosRequest request):base(persistenceManager)
        {
            _request = request;
        }

        public override DionysosBaseResponse Execute()
        {
            var response = new DionysosResponse();
            var oid = new Oid(_request.Oid);
            var jobject = JObject.FromObject(_request.Attributes);         

            var node = PersistenceManager.Read(oid);
            if (node == null)
                throw new DionysosObjectIsNotFoundException(oid.Type.ToString(), oid.Id);
           
            response.Oid = oid.ToString();
            return response;
        }
    }
}