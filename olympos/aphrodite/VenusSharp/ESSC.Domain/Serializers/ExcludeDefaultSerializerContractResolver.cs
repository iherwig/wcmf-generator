using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using System;

namespace ESSC.Domain.Serializers
{
    class ExcludeDefaultSerializerContractResolver : DefaultContractResolver
    {
        protected override JsonConverter ResolveContractConverter(Type objectType)
        {
            var baseConverter = base.ResolveContractConverter(objectType);
            if (baseConverter != null && baseConverter.GetType() == typeof(NodeJsonConverter))
            {
                return null;
            }
            return baseConverter;
        }
    }
}
