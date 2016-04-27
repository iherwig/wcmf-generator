using ESSC.Domain.Enums;
using Newtonsoft.Json;

namespace ESSC.Domain.Common
{
    public class Pagination
    {
        [JsonProperty("sortField")]
        public string SortField { get; set; }
        [JsonProperty("offset")]
        public int Offset { get; set; }
        [JsonProperty("limit")]
        public int Limit { get; set; }
        [JsonProperty("sortDirection")]
        public SortDirection SortDirection { get; set; }
        [JsonProperty("keyword")]
        public string Keyword { get; set; }
    }
}
