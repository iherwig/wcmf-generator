using ESSC.ApplicationServices.Enums;
using ESSC.ApplicationServices.Models;
using ESSC.Domain.Contracts;
using ESSC.Domain.Enums;
using ESSC.Domain.Exceptions.Dionysos;

namespace ESSC.ApplicationServices.DionysosActionHandlers
{
    public class SearchActionHandler : BaseDionysosAction
    {
        readonly DionysosSearchRequest _request;

        public SearchActionHandler(IPersistenceManager persistenceManager, DionysosSearchRequest request):base(persistenceManager)
        {
            _request = request;
        }

        public override DionysosBaseResponse Execute()
        {
            var response = new DionysosSearchResponse();

            if (_request.Limit < 0)
                throw new DionysosSearchException(ErrorCodes.ParameterInvalid,
                    "The passed limit is a negative number");

            if (_request.Offset < 0)
                throw new DionysosSearchException(ErrorCodes.ParameterInvalid, "The passed offset is negative");

            return response;
        }
    }
}