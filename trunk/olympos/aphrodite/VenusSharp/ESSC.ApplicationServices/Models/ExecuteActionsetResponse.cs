using System.Collections.Generic;
using Newtonsoft.Json;

namespace ESSC.ApplicationServices.Models
{
    public class ExecuteActionsetResponse : DionysosBaseResponse
    {
        [JsonProperty("actionSet")]
        public List<DionysosBaseRequest> ActionSet { get; set; }

        [JsonProperty("resultSet")]
        public List<DionysosBaseResponse> ResultSet { get; set; }

        public ExecuteActionsetResponse()
        {
            this.ActionSet = new List<DionysosBaseRequest>();
            this.ResultSet = new List<DionysosBaseResponse>();
        }
    }
}