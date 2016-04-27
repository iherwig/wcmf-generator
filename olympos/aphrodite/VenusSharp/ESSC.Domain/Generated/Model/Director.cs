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
    public class Director:Person
    {
        public Director():this(null)
        {

        }
        public Director(int id) : this(null, id)
        {

        }
        public Director(IPersistenceManager persistenceManager) : this(persistenceManager, 0)
        {

        }
        public Director(IPersistenceManager persistenceManager,int id) : base(persistenceManager,id)
        {
            Oid.Type = DomainTypes.Director;
            Movies = new ParentRelation<Movie>();
        }
        public ParentRelation<Movie> Movies { get; set; }       
    }
}
