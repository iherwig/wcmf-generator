using ESSC.Domain.Common;
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
    public abstract class EntityBase : Node
    {
        public EntityBase(IPersistenceManager persistenceManager,int id):base(persistenceManager,id)
        {

        }
        public virtual string Created { get; set; }       
        public virtual string Creator { get; set; }
        public virtual string Modified { get; set; }
        public virtual string LastEditor { get; set; }        
    }
}
