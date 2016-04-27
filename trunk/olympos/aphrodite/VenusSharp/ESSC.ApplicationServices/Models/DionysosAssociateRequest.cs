using Newtonsoft.Json;

namespace ESSC.ApplicationServices.Models
{
    public class DionysosAssociateRequest:DionysosBaseRequest
    {
        /// <summary>
        /// "ObjectTypeName:1"
        /// </summary>
        [JsonProperty("sourceOid")]
        public string SourceOid { get; set; }
        /// <summary>
        /// "ObjectTypeName:2"
        /// </summary>
        [JsonProperty("targetOid")] 
        public string TargetOid { get; set; }
        [JsonProperty("role")]
        public string Role { get; set; }
    }
}