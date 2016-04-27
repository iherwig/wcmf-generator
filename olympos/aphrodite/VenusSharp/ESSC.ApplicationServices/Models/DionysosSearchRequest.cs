using ESSC.Domain.Enums;
using Newtonsoft.Json;

namespace ESSC.ApplicationServices.Models
{
    public class DionysosSearchRequest : DionysosBaseRequest
    {
        [JsonProperty("query")]
        public string Query { get; set; }

        [JsonProperty("limit")]
        public int Limit { get; set; }

        [JsonProperty("offset")]
        public int Offset { get; set; }

        [JsonProperty("sortByRelevance")]
        public bool SortByRelevance { get; set; }

        [JsonProperty("sortDirection")]
        public SortDirection SortDirection { get; set; }
    }
}