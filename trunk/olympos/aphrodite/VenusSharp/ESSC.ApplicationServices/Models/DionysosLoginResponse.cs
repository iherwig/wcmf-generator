using Newtonsoft.Json;

namespace ESSC.ApplicationServices.Models
{
    public class DionysosLoginResponse:DionysosBaseResponse
    {
        [JsonProperty("user")]
        public string UserName { get; set; }
        [JsonProperty("password")]
        public string Password { get; set; }
        [JsonProperty("roles")]
        public string[] Roles { get; set; }
    }
}