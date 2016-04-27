using Newtonsoft.Json;
using System.Collections.Generic;

namespace ESSC.Domain.Common
{
    public class PaginatedResult<T>
    {
        [JsonProperty("items")]
        public List<T> Items { get; set; }
        [JsonProperty("pagination")]
        public Pagination Pagination { get; set; }
        [JsonProperty("total")]
        public int Total { get; set; }
    }
}
