using ESSC.Domain.Common;
using ESSC.Domain.Contracts;
using ESSC.Domain.Enums.Generated;

namespace ESSC.Domain.Generated.Model
{
    /// <summary>
    /// <para>Alias: Chi1845Nod</para>
    /// <para>Created: 2016-04-13 11:55:10</para> 
    /// <para>Creator: admin</para>
    /// <para>Last Editor: </para>
    /// <para>Modified: </para>
    /// <para>Status: Proposed</para> 
    /// </summary>
    public class Actor:Person
    {
        public Actor():this(0)
        {

        }
        public Actor(int id):this(null,id)
        {

        }
        public Actor(IPersistenceManager persistenceManager):this(persistenceManager,0)
        {

        }
        public Actor(IPersistenceManager persistenceManager,int id) : base(persistenceManager,id)
        {
            Oid.Type = DomainTypes.Actor;
            Movies = new ParentRelation<Movie>();
        }
        public ParentRelation<Movie> Movies { get; set; }


    }
}
