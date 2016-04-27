using ESSC.Domain.Enums.Generated;
using ESSC.Domain.Generated.Enums;
using System.Collections.Generic;
using System.Linq;

namespace ESSC.Domain.Common
{
    public class ChildRelation<T>:BaseRelation where T :Node
    {
        protected Node Parent;
        protected DomainTypes ChildType;

        public ChildRelation(Node parent,DomainTypes childType)
        {
            Multiplicity = new RelationMultiplicity();
            Items = new List<T>();
            Parent = parent;
            ChildType = childType;
        }
        public List<T> Items { get; private set; }
        public RelationMultiplicity Multiplicity { get; private set; }
        public RelationTypes Type { get; set; }

        public override RelationTypes RelationType
        {
            get
            {
                return Type;
            }
        }

        public override IEnumerable<Node> Nodes
        {
            get
            {
                return Items.OfType<Node>();
            }
        }

        public void Load(Pagination pagination, int? depth, string keyword)
        {
            Items.AddRange(Parent.LoadChildren(Parent,ChildType, pagination, depth).OfType<T>().ToList());           
        }
        public void LoadAll()
        {
            Items.AddRange(Parent.LoadAllChildren(ChildType).OfType<T>());
        }
        public override void Add(Node child)
        {
            Parent.AddChild(child);
            if(child is T)
                Items.Add(child as T);
        } 
        public void Delete(Node child,bool reallyDelete)
        {
            Parent.DeleteChild(child, reallyDelete);
            if(child is T && Items.Contains(child))
                Items.Remove(child as T);
        }

        public override int Count()
        {
            return Items.Count;
        }

        public int LoadCount()
        {
            return Parent.CountChildren(ChildType);
        }
        public T this[int index]
        {
            get { return Items[0]; }
        }
    }
}
