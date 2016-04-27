using System.Collections.Generic;
using ESSC.Domain.Contracts;

namespace ESSC.Domain.Generated.Model
{
    /// <summary>
    /// <para>Alias: Chi1849Nod</para>
    /// <para>Created: 2010-12-06 20:49:34</para> 
    /// <para>Creator: admin</para>
    /// <para>Last Editor: admin</para>
    /// <para>Modified: 2011-03-22 07:12:58</para>
    /// <para>RSA Guid: _YE_WE3TMEeC6BJVq2iXpNA</para>
    /// <para>Status: Proposed</para> 
    /// </summary>
    public abstract class EntityBaseExtended : EntityBase
    {
        public EntityBaseExtended(IPersistenceManager persistenceManager,int id):base(persistenceManager,id)
        {
        }
        public virtual string Description { get; set; }
        public virtual string Name { get; set; }

        public override Dictionary<string, string> GetPropoertiesSerializedNames()
        {
            var result= base.GetPropoertiesSerializedNames();
            result["Name"] = "name";
            result["Description"] = "description";
            return result;
        }
    }
}
