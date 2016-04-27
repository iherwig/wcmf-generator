using ESSC.Domain.Common;
using ESSC.Domain.Contracts;
using ESSC.Domain.Enums.Generated;

namespace ESSC.Domain.Generated.Model
{
    public class PosterPrimary : Poster
    {
        public PosterPrimary(): this(null)
        {

        }
        public PosterPrimary(int id) : this(null, id)
        {

        }
        public PosterPrimary(IPersistenceManager persistenceManager)
            : this(persistenceManager, 0)
        {

        }
        public PosterPrimary(IPersistenceManager persistenceManager, int id)
            : base(persistenceManager, id)
        {
            Oid.Type = DomainTypes.PosterPrimary;
            Movies = new ParentRelation<Movie>();
        }

        public int MovieId { get; set; }
        public ParentRelation<Movie> Movies { get; set; }
    }
}
