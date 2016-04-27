using System.Diagnostics;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
using System.Web.Http.Controllers;
using System.Web.Http.Filters;
using ESSC.ApplicationServices.Enums;
using ESSC.ApplicationServices.Models;

namespace ESSC.ApplicationServices.Filters
{
    public class PerformanceActionFilterAttribute:ActionFilterAttribute
    {
        public override void OnActionExecuting(HttpActionContext actionContext)
        {
            StartTimer(actionContext);
            base.OnActionExecuting(actionContext);
        }

        public override void OnActionExecuted(HttpActionExecutedContext actionExecutedContext)
        {
            StopTimer(actionExecutedContext);
            base.OnActionExecuted(actionExecutedContext);
        }

        public override Task OnActionExecutedAsync(HttpActionExecutedContext actionExecutedContext, CancellationToken cancellationToken)
        {
            StopTimer(actionExecutedContext);
            return base.OnActionExecutedAsync(actionExecutedContext, cancellationToken);
        }

        public override Task OnActionExecutingAsync(HttpActionContext actionContext, CancellationToken cancellationToken)
        {
            StartTimer(actionContext);
            return base.OnActionExecutingAsync(actionContext, cancellationToken);
        }

        private void StartTimer(HttpActionContext context)
        {
            var sw = new Stopwatch();
            context.Request.Properties[EnvironmentSettings.PerformanceCounterKey] = sw;
            sw.Start();
        }

        private void StopTimer(HttpActionExecutedContext context)
        {
            var sw = context.Request.Properties[EnvironmentSettings.PerformanceCounterKey] as Stopwatch;
            sw.Stop();
            var time= string.Format("({0}) ms", sw.Elapsed.TotalMilliseconds);
            if (context.Response != null && context.Response.Content is ObjectContent)
            {
                var content = context.Response.Content as ObjectContent;

                if (content.Value != null && content.Value is DionysosBaseResponse)
                    (content.Value as DionysosBaseResponse).ServerResponseTime = time;
            }
        }
    }
}