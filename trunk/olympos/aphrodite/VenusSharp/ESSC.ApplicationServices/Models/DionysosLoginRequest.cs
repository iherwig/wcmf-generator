using Newtonsoft.Json;

namespace ESSC.ApplicationServices.Models
{
    public class DionysosLoginRequest:DionysosBaseRequest
    {
        [JsonProperty("user")]
        public string UserName { get; set; }
        [JsonProperty("password")]
        public string Password { get; set; }

    }
}