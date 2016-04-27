using ESSC.ApplicationServices.Models;
using ESSC.ApplicationServices.Services.Contracts;
using ESSC.Domain.Common;
using ESSC.Domain.Contracts;
using ESSC.Domain.Exceptions.Dionysos;

namespace ESSC.ApplicationServices.DionysosActionHandlers
{
    public class AssociateActionHandler : BaseDionysosAction
    {
        readonly DionysosAssociateRequest _request;

        public AssociateActionHandler(IPersistenceManager persistenceManager, DionysosAssociateRequest request):base(persistenceManager)
        {
            _request = request;
        }

        public override DionysosBaseResponse Execute()
        {
            var response = new DionysosAssociateResponse();

            var sourceOidObj = new Oid(_request.SourceOid);
            var targetOidObj = new Oid(_request.TargetOid);

            var sourceNode = PersistenceManager.Read(sourceOidObj);
            if (sourceNode == null)
                throw new DionysosObjectIsNotFoundException(sourceOidObj.Type.ToString(), sourceOidObj.Id);

            var targetNode = PersistenceManager.Read(targetOidObj);
            if (targetNode == null)
                throw new DionysosObjectIsNotFoundException(targetOidObj.Type.ToString(), targetOidObj.Id);          

            response.Action = _request.Action;
            response.SourceOid = _request.SourceOid;
            response.TargetOid = _request.TargetOid;
            response.Role = _request.Role;

            return response;
        }
    }
}