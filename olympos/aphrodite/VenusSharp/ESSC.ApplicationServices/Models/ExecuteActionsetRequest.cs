using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace ESSC.ApplicationServices.Models
{
    public class ExecuteActionsetRequest : DionysosBaseRequest
    {
        [JsonProperty("sid")]
        public string Sid { get; set; }

        [JsonProperty("actionSet")]
        public JObject ActionSet { get; set; }
    }
}