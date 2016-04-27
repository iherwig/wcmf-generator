using ESSC.Domain.Generated.Enums;
using System.Collections.Generic;

namespace ESSC.Domain.Common
{
    public abstract class BaseRelation
    {
        public abstract void Add(Node node);        
        public abstract int Count();
        public abstract RelationTypes RelationType { get; }
        public abstract IEnumerable<Node> Nodes { get; }
    }
}
