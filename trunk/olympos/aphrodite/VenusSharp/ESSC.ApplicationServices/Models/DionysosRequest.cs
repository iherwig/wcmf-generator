using Newtonsoft.Json;

namespace ESSC.ApplicationServices.Models
{
    public class DionysosRequest : DionysosBaseRequest
    {
        [JsonProperty("oid")]
        public string Oid { get; set; }

        [JsonProperty("lastChange")]
        public string LastChange { get; set; }

        //in case of update request
        //TODO: To be removed, the update request should inherit this class and add any custom properties
        [JsonProperty("attributes")]
        public object Attributes { get; set; }
    }
}