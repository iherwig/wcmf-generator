using ESSC.Domain.Common;
using ESSC.Domain.Contracts;
using ESSC.Domain.Enums.Generated;

namespace ESSC.Domain.Generated.Model
{
    public class Language : EntityBaseExtended
    {
        public Language(): this(null)
        {

        }
        public Language(int id) : this(null, id)
        {

        }
        public Language(IPersistenceManager persistenceManager)
            : this(persistenceManager, 0)
        {

        }
        public Language(IPersistenceManager persistenceManager, int id)
            : base(persistenceManager, id)
        {
            Oid.Type = DomainTypes.Language;
            Movies = new ParentRelation<Movie>();
        }
        /// <summary>
        /// <remarks>language short anotation</remarks>
        /// </summary>
        public string ShortForm { get; set; }

        /// <summary>
        /// <remarks>relationship of language with movie entity</remarks>
        /// </summary>
        public ParentRelation<Movie> Movies { get; set; }
    }
}
