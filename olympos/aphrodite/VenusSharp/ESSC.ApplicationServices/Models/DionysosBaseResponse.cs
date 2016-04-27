using ESSC.ApplicationServices.Enums;
using ESSC.Domain.Enums;
using ESSC.Domain.Enums.Generated;
using Newtonsoft.Json;

namespace ESSC.ApplicationServices.Models
{

    /// <summary>
    /// This class hold common properties among all responses
    /// </summary>
    public abstract class DionysosBaseResponse
    {
        [JsonProperty("action")]
        public ModelActions Action { get; set; }
        [JsonProperty("className", NullValueHandling = NullValueHandling.Ignore)]
        public DomainTypes? ClassName { get; set; }
        [JsonProperty("sid", NullValueHandling = NullValueHandling.Ignore)]
        public string Sid { get; set; }
        [JsonProperty("oid", NullValueHandling = NullValueHandling.Ignore)]
        public string Oid { get; set; }
        [JsonProperty("success")]
        public bool Success { get; set; }
        [JsonProperty("errorMessage", NullValueHandling = NullValueHandling.Ignore)]
        public string ErrorMessage { get; set; }

        [JsonProperty("errorCode", NullValueHandling = NullValueHandling.Ignore)]
        public ErrorCodes? ErrorCode { get; set; }
        [JsonProperty("errorData", NullValueHandling = NullValueHandling.Ignore)]
        public object ErrorData { get; set; }
        [JsonProperty("serverProcessingTime")]
        public string ServerResponseTime { get; set; }
    }
  
}
