using ESSC.Domain.Common;
using Newtonsoft.Json;
using System;

namespace ESSC.Domain.Serializers
{
    public class NodeReferenceJsonConverter:NodeJsonConverter
    {
        public override bool CanConvert(Type objectType)
        {
            return typeof(Node).IsAssignableFrom(objectType);
        }

        public override object ReadJson(JsonReader reader, Type objectType, object existingValue, JsonSerializer serializer)
        {
            return null;
        }

        public override void WriteJson(JsonWriter writer, object value, JsonSerializer serializer)
        {
            writer.WriteStartObject();
            var obj = value as Node;
            writer.WritePropertyName("className");
            writer.WriteValue(obj.Oid.Type.ToString());
            writer.WritePropertyName("oid");
            writer.WriteValue(obj.Oid.ToString());
            writer.WritePropertyName("isReference");
            writer.WriteValue(true);
            writer.WriteEndObject();
        }
    }
}
