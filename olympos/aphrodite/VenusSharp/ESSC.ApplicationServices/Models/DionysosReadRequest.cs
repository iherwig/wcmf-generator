using Newtonsoft.Json;

namespace ESSC.ApplicationServices.Models
{
    public class DionysosReadRequest : DionysosBaseRequest
    {
        [JsonProperty("oid")]
        public string Oid { get; set; }
        [JsonProperty("depth")]
        public int? Depth { get; set; }
    }
}