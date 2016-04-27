using System.Collections.Generic;
using Newtonsoft.Json;
using ESSC.Domain.Enums;
using ESSC.Domain.Common;

namespace ESSC.ApplicationServices.Models
{
    public class DionysosListResponse : DionysosResponse
    {
        [JsonProperty("limit")]
        public int Limit { get; set; }
        [JsonProperty("offset")]
        public int Offset { get; set; }
        [JsonProperty("sortFieldName")]
        public string SortFieldName { get; set; }
        [JsonProperty("sortDirection")]
        public SortDirection SortDirection { get; set; }
        [JsonProperty("totalCount")]
        public long Total { get; set; }
        [JsonProperty("list")]
        public IList<Node> List { get; set; }

    }
}