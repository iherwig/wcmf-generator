using System.Collections.Generic;
using Newtonsoft.Json;
using ESSC.Domain.Enums;
using ESSC.Domain.Common;

namespace ESSC.ApplicationServices.Models
{
    public class DionysosSearchResponse : DionysosBaseResponse
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

        //Output Parameters name: list as per specification doc
        [JsonProperty("list")]
        public List<Node> List { get; set; }

        [JsonProperty("totalCount")]
        public int TotalCount { get; set; }

        public DionysosSearchResponse()
        {
            this.List = new List<Node>();
        }
    }
}