using ESSC.Domain.Enums.Generated;
using ESSC.Domain.Exceptions;
using ESSC.Domain.Utilities.Factories;
using System;

namespace ESSC.Domain.Common
{
    public class Oid:IEquatable<Oid>
    {
        public static Oid Empty
        {
            get { return new Oid{ Id = 0, Type = DomainTypes.Unknown }; }
        }
        public Oid()
        {
            this.Type = DomainTypes.Unknown;
        }
        public Oid(int id)
        {
            Id = id;
            Type = DomainTypes.Unknown;
        }
        public Oid(string oid)
        {
            if (string.IsNullOrEmpty(oid))
            {
                Type = DomainTypes.Unknown;
                Id = 0;
            }
            else
            {
                var oidObj = OidFactory.Create(oid);
                if (oidObj == null)
                {
                    throw new DomainInvalidOidException(string.Format("Oid: ({0}) is invalid", oid));
                }
                Id = oidObj.Id;
                Type = oidObj.Type;
            }
        }
        public Oid(int id, DomainTypes type)
        {
            Id = id;
            Type = type;
        }
        public int Id { get; set; }
        public DomainTypes Type { get; set; }

        public bool Equals(Oid other)
        {
            if(other== null) return false;
            return Id.Equals(other.Id) && Type.Equals(other.Type); 
        }

        public override string ToString()
        {
            return string.Format("{0}:{1}", Type, Id);
        }
    }
}
