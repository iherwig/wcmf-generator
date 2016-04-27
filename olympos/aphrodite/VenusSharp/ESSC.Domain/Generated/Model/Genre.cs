using ESSC.Domain.Common;
using ESSC.Domain.Contracts;
using ESSC.Domain.Enums.Generated;

namespace ESSC.Domain.Generated.Model
{
    /// <summary>
    /// <para>Alias: Chi1845Nod</para>
    /// <para>Created: 2016-04-13 11:52:15</para> 
    /// <para>Creator: admin</para>
    /// <para>Last Editor: </para>
    /// <para>Modified: </para>
    /// <para>Status: Proposed</para> 
    /// </summary>
    public class Genre : EntityBaseExtended
    {
        public Genre(): this(null)
        {

        }
        public Genre(int id) : this(null, id)
        {

        }
        public Genre(IPersistenceManager persistenceManager)
            : this(persistenceManager, 0)
        {

        }
        public Genre(IPersistenceManager persistenceManager, int id)
            : base(persistenceManager, id)
        {
            Oid.Type = DomainTypes.Genre;
            Movies = new ParentRelation<Movie>();
        }
        public ParentRelation<Movie> Movies { get; set; }
    }
}
