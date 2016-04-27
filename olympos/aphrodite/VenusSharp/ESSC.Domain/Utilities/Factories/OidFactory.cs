using ESSC.Domain.Common;
using ESSC.Domain.Enums.Generated;
using System;

namespace ESSC.Domain.Utilities.Factories
{
    public static class OidFactory
    {
        public static Oid Create(string oid)
        {
            if (string.IsNullOrEmpty(oid))
                return null;
            var parts = oid.Split(':');
            if (parts == null || parts.Length != 2)
                return null;
            int id = 0;
            DomainTypes type = DomainTypes.Unknown;
            if (int.TryParse(parts[1], out id) && Enum.TryParse<DomainTypes>(parts[0], out type))
            {
                return new Oid(id, type);
            }
            return null;
        }
    }
}
