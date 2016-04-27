using System.Linq;
using ESSC.ApplicationServices.Models;
using ESSC.Domain.Contracts;
using ESSC.Domain.Enums;
using ESSC.Domain.Generated.Factories;
using ESSC.Domain.Exceptions.Dionysos;

namespace ESSC.ApplicationServices.DionysosActionHandlers
{
    public class ListActionHandler : BaseDionysosAction
    {
        readonly DionysosListRequest _request;

        public ListActionHandler(IPersistenceManager persistenceManager, DionysosListRequest request):base(persistenceManager)
        {
            _request = request;
        }

        public override DionysosBaseResponse Execute()
        {
            var response = new DionysosListResponse();

            if (_request.Limit < 0) throw new DionysosListNegativeLimitException(_request.Limit);
            if (_request.Offset < 0) throw new DionysosListOffsetOutOfBoundException(_request.Offset);
            var node = NodeFactory.CreateObject(_request.ClassName,PersistenceManager);
            if (node.GetOrderByFields().Count == 0 ||
                !node.GetOrderByFields().Select(i => i.ToLower()).Contains(_request.SortFieldName.ToLower()))
                throw new DionysosListSortFieldUnknownException(_request.SortFieldName);
            if (_request.SortDirection == SortDirection.Unkown)
                throw new DionysosSortDirectionUnknownException();          

            response.Limit = _request.Limit;
            response.Offset = _request.Offset;
            response.SortDirection = _request.SortDirection;
            response.SortFieldName = _request.SortFieldName;
            //response.List = page.Items;
            //response.Total = page.TotalCount;
            response.Sid = _request.Sid;

            return response;
        }
    }
}