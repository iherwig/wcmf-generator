using System.Collections.Generic;
using ESSC.Domain.Common;
using ESSC.Domain.Contracts;
using ESSC.Domain.Enums.Generated;
using ESSC.Domain.Generated.Enums;

namespace ESSC.Domain.Generated.Model
{
    /// <summary>
    /// <para>Alias: Chi1845Nod</para>
    /// <para>Created: 2016-04-13 12:06:15</para> 
    /// <para>Creator: admin</para>
    /// <para>Last Editor: </para>
    /// <para>Modified: </para>
    /// <para>Status: Proposed</para> 
    /// </summary>
    public class Movie : EntityBaseExtended
    {
        public Movie():this(null)
        {

        }
        public Movie(int id) : this(null, id)
        {

        }
        public Movie(IPersistenceManager persistenceManager)
            : this(persistenceManager, 0)
        {

        }
        public Movie(IPersistenceManager persistenceManager, int id)
            : base(persistenceManager, id)
        {
            Oid.Type = DomainTypes.Movie;

            Actors = new ChildRelation<Actor>(this, DomainTypes.Actor);
            Actors.Multiplicity.Maximum = 5;
            Actors.Multiplicity.Minimum = 1;
            Actors.Type = RelationTypes.Composition;

            Productions = new ParentRelation<Production>();

            Directors = new ChildRelation<Director>(this, DomainTypes.Director);
            Directors.Multiplicity.Minimum = 1;
            Directors.Multiplicity.Maximum = 20;
            Directors.Type = RelationTypes.Aggregation;

            PosterPrimaries = new ChildRelation<PosterPrimary>(this, DomainTypes.PosterPrimary);
            PosterPrimaries.Multiplicity.Minimum = 1;
            PosterPrimaries.Multiplicity.Maximum = 1;
            PosterPrimaries.Type = RelationTypes.Composition;

            PosterSecondaries = new ChildRelation<PosterSecondary>(this, DomainTypes.PosterSecondary);
            PosterSecondaries.Multiplicity.Minimum = 1;
            PosterSecondaries.Multiplicity.Maximum = 1;
            PosterSecondaries.Type = RelationTypes.Composition;

            Children[DomainTypes.Actor] = Actors;
            Children[DomainTypes.Director] = Directors;
            Children[DomainTypes.PosterPrimary] = PosterPrimaries;
            Children[DomainTypes.PosterSecondary] = PosterSecondaries;
            Parents[DomainTypes.Production] = Productions;
        }
        public ChildRelation<Actor> Actors { get; private set; }
        public ParentRelation<Production> Productions { get; private set; }
        public ChildRelation<Director> Directors { get; private set; }
        public ChildRelation<PosterPrimary> PosterPrimaries { get; private set; }
        public ChildRelation<PosterSecondary> PosterSecondaries { get; private set; }

        public string Alias { get; set; }
        public string Color { get; set; }
        public string Country { get; set; }
        public string Date { get; set; }
        public string Genre { get; set; }
        public string Language { get; set; }
        public string Plot { get; set; }
        public string Runtime { get; set; }
        public string Url { get; set; }

        public override Dictionary<string, string> GetPropoertiesSerializedNames()
        {
            var properties= base.GetPropoertiesSerializedNames();
            properties["Url"] = "url";
            properties["Runtime"] = "runtime";
            properties["Plot"] = "plot";
            properties["Language"] = "language";
            properties["Genre"] = "genre";
            properties["Date"] = "date";
            properties["Country"] = "country";
            properties["Color"] = "color";
            properties["Alias"] = "alias";
            properties["PosterSecondaries"] = "posterSecondaries";
            properties["PosterPrimaries"] = "posterPrimaries";
            properties["Directors"] = "directors";
            properties["Productions"] = "productions";
            properties["Actors"] = "actors";
            return properties;
        }

        public override bool IsManyToMany()
        {
            return false;
        }
        
    }
}
