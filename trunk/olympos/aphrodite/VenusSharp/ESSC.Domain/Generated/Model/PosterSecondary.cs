using ESSC.Domain.Common;
using ESSC.Domain.Contracts;
using ESSC.Domain.Enums.Generated;

namespace ESSC.Domain.Generated.Model
{
    public class PosterSecondary : Poster
    {
        public PosterSecondary(): this(null)
        {

        }
        public PosterSecondary(int id) : this(null, id)
        {

        }
        public PosterSecondary(IPersistenceManager persistenceManager)
            : this(persistenceManager, 0)
        {

        }
        public PosterSecondary(IPersistenceManager persistenceManager, int id)
            : base(persistenceManager, id)
        {
            Oid.Type = DomainTypes.PosterSecondary;
            Movies = new ParentRelation<Movie>();
        }

        public int MovieId { get; set; }
        public ParentRelation<Movie> Movies { get; set; }

    }
}
