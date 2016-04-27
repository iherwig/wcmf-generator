using ESSC.Domain.Common;
using ESSC.Domain.Contracts;
using ESSC.Domain.Enums.Generated;

namespace ESSC.Domain.Generated.Model
{
    public class MovieDate : EntityBase
    {
        public MovieDate(): this(null)
        {

        }
        public MovieDate(int id) : this(null, id)
        {

        }
        public MovieDate(IPersistenceManager persistenceManager)
            : this(persistenceManager, 0)
        {

        }
        public MovieDate(IPersistenceManager persistenceManager, int id)
            : base(persistenceManager, id)
        {
            Oid.Type = DomainTypes.MovieDate;
            Movies = new ParentRelation<Movie>();            
        }
        /// <summary>
        /// <remarks>year of the  movie</remarks>
        /// </summary>
        public string Year { get; set; }

        /// <summary>
        /// <remarks>relationship of language with movie entity</remarks>
        /// </summary>
        public ParentRelation<Movie> Movies { get; set; }
    }
}
