using ESSC.Domain.Common;
using ESSC.Domain.Contracts;
using ESSC.Domain.Enums.Generated;

namespace ESSC.Domain.Generated.Model
{
    public class Production:EntityBase
    {
        public Production(): this(null)
        {

        }
        public Production(int id) : this(null, id)
        {

        }
        public Production(IPersistenceManager persistenceManager) : this(persistenceManager, 0)
        {

        }
        public Production(IPersistenceManager persistenceManager,int id) : base(persistenceManager,id)
        {
            Oid.Type = DomainTypes.Production;
            Movies = new ChildRelation<Movie>(this,Domain.Enums.Generated.DomainTypes.Movie);
            Movies.Multiplicity.Minimum = 1;
            Movies.Multiplicity.Maximum = 5;
            Movies.Type = Enums.RelationTypes.Aggregation;

        }
        public ChildRelation<Movie> Movies { get; set; }

        
    }
}
