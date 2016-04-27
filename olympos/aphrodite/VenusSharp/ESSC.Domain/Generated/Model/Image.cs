using ESSC.Domain.Common;
using ESSC.Domain.Contracts;
using ESSC.Domain.Enums.Generated;

namespace ESSC.Domain.Generated.Model
{
    /// <summary>
    /// <para>Alias: Chi1845Nod</para>
    /// <para>Created: 2016-04-13 11:51:15</para> 
    /// <para>Creator: admin</para>
    /// <para>Last Editor: </para>
    /// <para>Modified: </para>
    /// <para>Status: Proposed</para> 
    /// </summary>
    public class Image : EntityBaseExtended
    {
        public Image() : this(null)
        {

        }
        public Image(int id) : this(null, id)
        {

        }
        public Image(IPersistenceManager persistenceManager)
           : this(persistenceManager, 0)
        {
        }
        public Image(IPersistenceManager persistenceManager, int id)
           : base(persistenceManager, id)
        {
            Oid.Type = DomainTypes.Image;
        }

        /// <summary>
        /// <remarks>name of the file</remarks>
        /// </summary>
        public string FileName { get; set; }
    }
}
