using ESSC.Domain.Contracts;
using ESSC.Domain.Enums.Generated;
using System.Collections.Generic;
using System;

namespace ESSC.Domain.Common
{
    public class PersistenceObject
    {
        protected IPersistenceManager PersistenceManager;
        public PersistenceObject(IPersistenceManager persistenceManager)
        {
            PersistenceManager = persistenceManager;
        }       
        public virtual List<Node> LoadChildren(Node parent, DomainTypes childType, Pagination pagination, int? depth)
        {
            depth = depth ?? 1;
            var children = PersistenceManager.LoadChildren(parent, childType, pagination, depth);
            return children;
        }       
        public virtual List<Node> LoadAllChildren(Node parent, DomainTypes childType)
        {
            return PersistenceManager.LoadAllChildren(parent, childType);
        }      
        public virtual List<Node> LoadParent(DomainTypes type)
        {
            return new List<Node>();
        }       
        public virtual void AddChild(Node parent,Node child)
        {
            if (child == null || parent == null) return;
            if(PersistenceManager!= null)
                PersistenceManager.AddChild(parent, child);            
        }
        public virtual void Create(Node node)
        {
            if (node == null || PersistenceManager == null) return;
            PersistenceManager.Create(node);
        }
        public virtual void Delete(Node node)
        {
            if (node == null || PersistenceManager == null) return;
            PersistenceManager.Delete(node);
        }      
        public virtual void DeleteChild(Node parent,Node child, bool reallyDelete = false)
        {
            if (parent == null) throw new ArgumentNullException(nameof(parent));
            if (child == null) throw new ArgumentNullException(nameof(child));
            PersistenceManager.DeleteChild(parent, child, reallyDelete);
        }
        public int CountChildren(Node parent, DomainTypes childType)
        {
            if (parent == null) throw new ArgumentNullException(nameof(parent));
            return PersistenceManager.CountChildren(parent, childType);
        }
        public int CountChildren(Node parent, DomainTypes childType, Pagination pagination)
        {           
            return PersistenceManager.CountChildren(parent, childType, pagination);
        }
        public virtual List<string> GetOrderByFields()
        {
            return new List<string>();
        }
    }
}
