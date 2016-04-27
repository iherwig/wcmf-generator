using Newtonsoft.Json;

namespace ESSC.ApplicationServices.Models
{
    public class DionysosAssociateResponse : DionysosBaseResponse
    {
        public string SourceOid { get; set; }

        [JsonProperty("targetOid")]
        public string TargetOid { get; set; }

        [JsonProperty("role")]
        public string Role { get; set; }
    }
}