using ESSC.ApplicationServices.Models;
using ESSC.Domain.Common;
using ESSC.Domain.Contracts;
using ESSC.Domain.Exceptions.Dionysos;

namespace ESSC.ApplicationServices.DionysosActionHandlers
{
    public class ReadActionHandler : BaseDionysosAction
    {
        readonly DionysosReadRequest _request;

        public ReadActionHandler(IPersistenceManager persistenceManager, DionysosReadRequest request):base(persistenceManager)
        {
            _request = request;
        }

        public override DionysosBaseResponse Execute()
        {
            var response = new DionysosReadResponse();

            //if depth is 0 then it is assumed omitted
            _request.Depth = _request.Depth == 0 ? null : _request.Depth;

            //as per spec, If depth is omitted, 1 is assumed.
            _request.Depth = _request.Depth ?? 1;

            //The depth value -1 has the special meaning of unlimited depth.
            if (_request.Depth == 0 || _request.Depth.Value < -1)
                throw new DionysosInvalidDepthException(_request.Depth.Value);

            var oidObj = new Oid(_request.Oid);
            response.Action = _request.Action;
            response.Oid = oidObj.ToString();
            response.Sid = _request.Sid;
            response.Depth = _request.Depth;

            var node = _request.Depth.HasValue? PersistenceManager.Read(oidObj,_request.Depth.Value):PersistenceManager.Read(oidObj);
            response.Object = node;

            return response;
        }
    }
}