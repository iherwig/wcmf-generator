using ESSC.Domain.Common;
using ESSC.Domain.Contracts;
using ESSC.Domain.Enums.Generated;

namespace ESSC.Domain.Generated.Model
{
    public class Poster : Image
    {
        public Poster(): this(null)
        {

        }
        public Poster(int id) : this(null, id)
        {

        }
        public Poster(IPersistenceManager persistenceManager)
            : this(persistenceManager, 0)
        {

        }
        public Poster(IPersistenceManager persistenceManager, int id)
            : base(persistenceManager, id)
        {
            Oid.Type = DomainTypes.Poster;
        }
    }
}
