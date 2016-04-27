using System.Collections.Generic;
using Newtonsoft.Json;

namespace ESSC.ApplicationServices.Models
{
    /// <summary>
    /// Response is collection of ActionSet & Result set
    /// </summary>
    public class ExecuteActionResponse:DionysosBaseResponse
    {
        [JsonProperty("actionSet")]
        public List<DionysosRequest> ActionSet { get; set; }

        [JsonProperty("resultSet")]
        public List<DionysosResponse> ResultSet { get; set; }

        public ExecuteActionResponse()
        {
            this.ActionSet = new List<DionysosRequest>();
            this.ResultSet = new List<DionysosResponse>();
        }
    }
}