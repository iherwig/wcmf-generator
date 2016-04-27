using System.Runtime.Serialization;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace ESSC.ApplicationServices.Enums
{
    [JsonConverter(typeof (StringEnumConverter))]
    public enum ModelActions
    {
        Unknown,
        [EnumMember(Value = "login")] Login,
        [EnumMember(Value = "list")] List,
        [EnumMember(Value = "read")] Read,
        [EnumMember(Value = "update")] Update,
        [EnumMember(Value = "create")] Create,
        [EnumMember(Value = "delete")] Delete,
        [EnumMember(Value = "associate")] Associate,
        [EnumMember(Value = "disassociate")] Disassociate,
        [EnumMember(Value = "executeActionSet")] ExecuteActionSet,
        [EnumMember(Value = "log")] Log,
        [EnumMember(Value = "ver")] Ver,
        [EnumMember(Value = "search")] Search,
    }
}