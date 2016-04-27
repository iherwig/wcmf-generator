using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Web.Http;
using Microsoft.Owin.Security.OAuth;
using Newtonsoft.Json.Serialization;
using System.Web.Http.Dispatcher;
using ESSC.ApplicationServices.DependencyResolution;
using Newtonsoft.Json.Converters;
using Newtonsoft.Json;

namespace ESSC.ApplicationServices
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            var container = IoC.Initialize();
            config.Services.Replace(typeof(IHttpControllerActivator), new StructureMapActivator(container));

            // Web API configuration and services
            var formatters = GlobalConfiguration.Configuration.Formatters;
            var jsonFormatter = formatters.JsonFormatter;
            jsonFormatter.SerializerSettings.Converters.Add(new StringEnumConverter());
            var settings = jsonFormatter.SerializerSettings;
            settings.Formatting = Formatting.Indented;
            settings.ContractResolver = new CamelCasePropertyNamesContractResolver();

            // Web API routes
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );
        }
    }
}
