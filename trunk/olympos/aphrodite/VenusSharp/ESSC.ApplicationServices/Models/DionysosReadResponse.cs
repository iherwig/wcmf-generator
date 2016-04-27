using Newtonsoft.Json;

namespace ESSC.ApplicationServices.Models
{
    public class DionysosReadResponse:DionysosBaseResponse
    {
        [JsonProperty("depth",NullValueHandling = NullValueHandling.Ignore)]
        public int? Depth { get; set; }

        [JsonProperty("object")]
        public object Object { get; set; }       
    }
}