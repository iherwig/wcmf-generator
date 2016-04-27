using ESSC.Domain.Enums;
using Newtonsoft.Json;

namespace ESSC.ApplicationServices.Models
{
    public class DionysosListRequest : DionysosBaseRequest
    {
        [JsonProperty("limit")]
        public int Limit { get; set; }

        [JsonProperty("offset")]
        public int Offset { get; set; }

        [JsonProperty("sortFieldName")]
        public string SortFieldName { get; set; }

        [JsonProperty("sortDirection")]
        public SortDirection SortDirection { get; set; }
    }
}