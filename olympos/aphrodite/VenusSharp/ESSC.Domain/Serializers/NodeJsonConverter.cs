using System;
using Newtonsoft.Json;
using ESSC.Domain.Common;
using Newtonsoft.Json.Linq;
using System.Reflection;

namespace ESSC.Domain.Serializers
{
    public class NodeJsonConverter : JsonConverter
    {
        JsonSerializer _referenceSerializer;        
           
        public override bool CanConvert(Type objectType)
        {
            return objectType == typeof(Node);
        }

        public override object ReadJson(JsonReader reader, Type objectType, object existingValue, JsonSerializer serializer)
        {
            throw new NotImplementedException();
        }

        public override void WriteJson(JsonWriter writer, object value, JsonSerializer serializer)
        {
            var obj = value as Node;

            var propertiesNames = obj.GetPropoertiesSerializedNames();

            writer.WriteStartObject();
            if (obj == null)
            {
                writer.WriteEndObject();
                return;
            }

            if(_referenceSerializer== null)
            {
                _referenceSerializer = new JsonSerializer();
                _referenceSerializer.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
                _referenceSerializer.ContractResolver = new ExcludeDefaultSerializerContractResolver();
                _referenceSerializer.Converters.Add(new NodeReferenceJsonConverter());
            }

            writer.WritePropertyName("className");
            writer.WriteValue(obj.GetClassNameSerializationValue());
            if (obj.Oid != null)
            {
                writer.WritePropertyName("oid");
                writer.WriteValue(obj.Oid.ToString());
            }
            writer.WritePropertyName("isReference");
            writer.WriteValue(false);
            writer.WritePropertyName("lastChange");
            writer.WriteValue(obj.Timestamp.ToString());
            writer.WritePropertyName("attributes");
            JObject propertiesJson = new JObject();

            var properties = value.GetType().GetProperties();
            foreach (var propertyInfo in properties)
            {
                if (propertyInfo.Name.Equals("Timestamp") || propertyInfo.Name.Equals("Oid")) continue;
                if(propertyInfo.CanRead)
                    SerializeProperty(propertiesJson, propertyInfo,obj);
            }

            propertiesJson.WriteTo(writer);
            writer.WriteEndObject();            
        }

        void SerializeProperty(JObject jo, PropertyInfo propertyInfo, Node node )
        {
            var propertiesNames = node.GetPropoertiesSerializedNames();
            var propertyName = propertiesNames.ContainsKey(propertyInfo.Name) ? propertiesNames[propertyInfo.Name] : propertyInfo.Name;
            var value = propertyInfo.GetValue(node);
            if(value !=null && value.GetType().IsValueType || value is string)
                jo.Add(propertyName, JToken.FromObject(value));
            if(value is BaseRelation)
            {
                var relation = value as BaseRelation;
                if(relation!= null)
                    jo.Add(propertyName, JArray.FromObject(relation.Nodes, _referenceSerializer));
            }
        }
    }
}
