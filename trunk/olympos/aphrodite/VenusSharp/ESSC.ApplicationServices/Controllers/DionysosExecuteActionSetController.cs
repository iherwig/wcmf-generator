using System;
using System.Collections.Generic;
using System.Web.Http;
using System.Web.Http.Results;
using ESSC.ApplicationServices.Enums;
using ESSC.ApplicationServices.Models;
using ESSC.ApplicationServices.Services.Contracts;
using Newtonsoft.Json.Linq;
using System.Linq;
using ESSC.Domain.Contracts;

namespace ESSC.ApplicationServices.Controllers
{
    [RoutePrefix("api/dionysos")]
    public class DionysosExecuteActionSetController : BaseApiController
    {
        public DionysosExecuteActionSetController(IDionysosLogService logService, IPersistenceManager persistenceManager,
            ITokenManager tokenManager) : base(logService, persistenceManager, tokenManager)
        {
        }

        [HttpPost]
        [Route("executeActionSet")]
        public IHttpActionResult Post(ExecuteActionsetRequest request)
        {
            var response = new ExecuteActionsetResponse();

            try
            {

                var actionResultList = new List<IHttpActionResult>();
                ModelActions previouseAction = ModelActions.Unknown;

                //execute all actions
                foreach (var jAction in request.ActionSet)
                {
                    
                    //cast to action request type
                    var dionysosRequest = ConvertToActionRequest(jAction.Value);
                    dionysosRequest.Sid = request.Sid;
                    //collect request objects to be returned with final response
                    response.ActionSet.Add(dionysosRequest);

                    //if executeActionSet is for create+update Model from UI; ensure to pass newly create id to update
                    if (dionysosRequest.Action == ModelActions.Update && previouseAction == ModelActions.Create)
                        prepareUpdateRequest(dionysosRequest, actionResultList);

                    //collect action results
                    var actionResult = ProcessAction((action) =>
                     {
                         return action.Execute();

                     }, dionysosRequest, dionysosRequest.Action, requiredClassName: false);

                    actionResultList.Add(actionResult);
                    previouseAction = dionysosRequest.Action;
                }

                //Prepare final Response
                response.Action = ModelActions.ExecuteActionSet;
                response.Sid = request.Sid;
                foreach (var actionResult in actionResultList)
                {
                    var dionysosResponse = actionResult as OkNegotiatedContentResult<DionysosBaseResponse>;
                    if (dionysosResponse != null)
                    {
                        response.ResultSet.Add(dionysosResponse.Content);
                    }
                }
            }
            catch (Exception ex)
            {
                AttachErrorToResponse(response, ex);
            }

            return Ok(response);
        }

        private void prepareUpdateRequest(DionysosBaseRequest dionysosRequest, List<IHttpActionResult> actionResultList)
        {
            var updateRequest = dionysosRequest as DionysosRequest;

            ////get create result to fetch oid of newliy created Model
            var createResult = actionResultList.Select(o => (o as OkNegotiatedContentResult<DionysosBaseResponse>))
                    .Where(o => o.Content.Action == ModelActions.Create).SingleOrDefault();
            if (createResult == null)
                return;

            //if update needs id from previouse create-result by looking for ? sign
            //also ensure not to change updateRequest Oid if Update className is different from Create ClassName
            if (updateRequest.Oid.Trim('{').Trim('}') == createResult.Content.ClassName.ToString() + ":?")
            {
                updateRequest.Oid = createResult.Content.Oid;
                updateRequest.ClassName = createResult.Content.ClassName.Value;
            } 

        }

        private DionysosBaseRequest ConvertToActionRequest(JToken jAction)
        {
            //extract action type
            var tempRequest = jAction.ToObject<DionysosRequest>();

            switch (tempRequest.Action)
            {
                case ModelActions.Create:
                    return jAction.ToObject<DionysosRequest>();
                case ModelActions.Read:
                    return jAction.ToObject<DionysosReadRequest>();
                case ModelActions.Delete:
                    return jAction.ToObject<DionysosRequest>();
                case ModelActions.Associate:
                    return jAction.ToObject<DionysosAssociateRequest>();
                case ModelActions.Disassociate:
                    return jAction.ToObject<DionysosAssociateRequest>();
                case ModelActions.List:
                    return jAction.ToObject<DionysosListRequest>();
                case ModelActions.Update:
                    return jAction.ToObject<DionysosRequest>();
                case ModelActions.Login:
                    return jAction.ToObject<DionysosLoginRequest>();
                default:
                    throw new InvalidOperationException(tempRequest.Action.ToString());
            }
        }
    }
}