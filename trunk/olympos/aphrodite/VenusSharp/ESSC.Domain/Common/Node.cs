using ESSC.Domain.Contracts;
using ESSC.Domain.Enums.Generated;
using ESSC.Domain.Serializers;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;

namespace ESSC.Domain.Common
{
    [JsonConverter(typeof(NodeJsonConverter))]
    public abstract class Node:PersistenceObject,IEquatable<Node>
    { 
        public Node(IPersistenceManager persistenceManager, Oid oid):base(persistenceManager)
        {
            Children = new Dictionary<DomainTypes, BaseRelation>();
            Parents = new Dictionary<DomainTypes, BaseRelation>();
            Oid = Oid.Empty;
            Oid.Id = oid!=null?oid.Id:Oid.Id;
            Oid.Type = oid != null ? oid.Type:Oid.Type;
        }
        public Node(IPersistenceManager persistenceManager, int id) : this(persistenceManager, new Oid(id))
        {
        }
        public Node(IPersistenceManager persistenceManager):this(persistenceManager,0)
        {            
        }
        public Dictionary<DomainTypes,BaseRelation> Children { get; protected set; }
        public Dictionary<DomainTypes, BaseRelation> Parents { get; protected set; }
        public Oid Oid { get; protected set; }

        /// <summary>
        /// display name of the node
        /// </summary>
        public virtual string GetObjectDisplayName()
        {
            return string.Empty;
        }
        /// <summary>
        /// description of the node
        /// </summary>
        public virtual string GetObjectDescription()
        {
             return string.Empty;
        }
        /// <summary>
        /// display name of the property
        /// </summary>
        /// <param name="propertyName">property name</param>
        /// <returns></returns>
        public virtual string GetValueDisplayName(string propertyName)
        {
            return "";
        }
        /// <summary>
        /// description of a property
        /// </summary>
        /// <param name="propertyName">property name</param>
        /// <returns></returns>
        public virtual string GetValueDescription(string propertyName)
        {
            return "?";
        }
        /// <summary>
        /// is this entity a joint in many to many relations
        /// </summary>
        /// <returns></returns>
        public virtual bool IsManyToMany()
        {
            return false;
        }
        /// <summary>
        /// Add child node to the current node
        /// </summary>
        /// <param name="node">child node</param>
        public void AddChild(Node node)
        {            
            base.AddChild(this, node);
        }
        /// <summary>
        /// create this node in the persistence
        /// </summary>
        public void Create()
        {
            base.Create(this);
        }
        /// <summary>
        /// delete this node from persistence
        /// </summary>
        public void Delete()
        {
            base.Delete(this);
        }
        /// <summary>
        /// delete child node from the current node
        /// </summary>
        /// <param name="node">child node</param>
        /// <param name="reallyDelete">delete the node or just disassocaite</param>
        public void DeleteChild(Node node, bool reallyDelete = false)
        {
            base.DeleteChild(this, node, reallyDelete);           
        }
        /// <summary>
        /// load all child nodes of specific type
        /// </summary>
        /// <param name="childType">child type</param>
        /// <returns></returns>
        public List<Node> LoadAllChildren(DomainTypes childType)
        {
            return base.LoadAllChildren(this, childType);
        }
        /// <summary>
        /// load child nodes with some filtering criteria
        /// </summary>
        /// <param name="childType">children type</param>
        /// <param name="pagination">pagination ifnormation</param>
        /// <param name="depth">depth value</param>
        /// <returns></returns>
        public List<Node> LoadChildren(DomainTypes childType, Pagination pagination, int? depth)
        {
            return base.LoadChildren(this, childType, pagination, depth);
        }
        /// <summary>
        /// load the parent of specific type
        /// </summary>
        /// <param name="type">type of the parent</param>
        /// <returns></returns>
        public override List<Node> LoadParent(DomainTypes type)
        {
            return base.LoadParent(type);
        }
        /// <summary>
        /// Check if two nodes are equal
        /// </summary>
        /// <param name="other"></param>
        /// <returns></returns>
        public bool Equals(Node other)
        {
            if (other == null) return false;
            if (other.Oid == null) return false;
            return Oid.Equals(other.Oid);
        }
        /// <summary>
        /// Get the count of the children of specific type
        /// </summary>
        /// <param name="childType">Children type</param>
        /// <returns></returns>
        public int CountChildren(DomainTypes childType)
        {
            return PersistenceManager.CountChildren(this, childType);
        }
        /// <summary>
        /// Specify the names of the property used during serialization
        /// </summary>
        /// <returns></returns>
        public virtual Dictionary<string,string> GetPropoertiesSerializedNames()
        {
            return new Dictionary<string, string>();
        }
        /// <summary>
        /// The value of the class name to be used in the serializer
        /// </summary>
        /// <returns></returns>
        public virtual string GetClassNameSerializationValue()
        {
            return this.GetType().Name;
        }
        /// <summary>
        /// Used to detect the last change property and provide optimistic concurrency
        /// </summary>
        public long Timestamp
        {
            get; set;
        }
    }
}
