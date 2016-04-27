using ESSC.ApplicationServices.Enums;
using ESSC.Domain.Enums.Generated;
using Newtonsoft.Json;

namespace ESSC.ApplicationServices.Models
{
    public abstract class DionysosBaseRequest
    {
        [JsonProperty("action")]
        public ModelActions Action { get; set; }
        [JsonProperty("className")]
        public DomainTypes ClassName { get; set; }
        [JsonProperty("sid")]
        public string Sid { get; set; }
    }
}
