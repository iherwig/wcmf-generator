using ESSC.Domain.Enums;
using Newtonsoft.Json;

namespace ESSC.Domain.Microservice
{
    public class ServiceResult<T>
    {
        [JsonProperty("result")]
        public T Result { get; set; }
        [JsonProperty("displayErrorMessage")]
        public string DisplayErrorMessage { get; set; }
        [JsonProperty("errorCode")]
        public ErrorCodes ErrorCode { get; set; }
        [JsonProperty("logMessage")]
        public string LogMessage { get; set; }
    }
}