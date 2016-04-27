using System.Collections.Generic;
using ESSC.Domain.Generated.Enums;
using System.Linq;

namespace ESSC.Domain.Common
{
    public class ParentRelation<T>:BaseRelation where T :Node
    {
        public ParentRelation()
        {
            Items = new List<T>();
        }
        public List<T> Items { get; set; }
        public T First
        {
            get { return Items[0]; }
        }

        public override RelationTypes RelationType
        {
            get
            {
                return RelationTypes.Parent;
            }
        }

        public override IEnumerable<Node> Nodes
        {
            get
            {
                return Items.OfType<Node>();
            }
        }

        public override int Count()
        {
            return Items.Count;
        }

        public override void Add(Node node)
        {
            if (node is T)
                Items.Add(node as T);
        }
    }
}
