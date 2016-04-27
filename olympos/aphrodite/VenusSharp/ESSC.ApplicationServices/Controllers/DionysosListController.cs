﻿using System.Web.Http;
using ESSC.ApplicationServices.Enums;
using ESSC.ApplicationServices.Models;
using ESSC.ApplicationServices.Services.Contracts;
using ESSC.Domain.Contracts;

namespace ESSC.ApplicationServices.Controllers
{
    [RoutePrefix("api/dionysos")]
    public class DionysosListController : BaseApiController
    {
        public DionysosListController(IDionysosLogService logService, IPersistenceManager persistenceManager, ITokenManager tokenManager)
            : base(logService, persistenceManager, tokenManager)
        {
        }

        [HttpPost]
        [Route("list")]
        public IHttpActionResult Post(DionysosListRequest request)
        {
            return ProcessAction((action) =>
            {
                return action.Execute();

            }, request, ModelActions.List);
        }
    }
}