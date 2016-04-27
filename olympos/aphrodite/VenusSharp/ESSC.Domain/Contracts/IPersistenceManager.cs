using ESSC.Domain.Common;
using ESSC.Domain.Common.Models;
using ESSC.Domain.Enums.Generated;
using System;
using System.Collections.Generic;

namespace ESSC.Domain.Contracts
{
    public interface IPersistenceManager:IDisposable
    {
        void Delete(Node node);
        Node Create(Node node);
        void DeleteChild(Node parent, Node child, bool reallyDelete);
        int CountChildren(Node parent, DomainTypes childType, Pagination pagination);
        int CountChildren(Node parent, DomainTypes childType);
        void AddChild(Node parent, Node node);
        List<Node> LoadChildren(Node parent, DomainTypes childType, Pagination pagination, int? depth);
        List<Node> LoadAllChildren(Node parent, DomainTypes childType);
        List<Node> LoadPAge();
        Node Read(Oid oid, int? depth=null);
        PaginatedResult<Node> Load(DomainTypes nodeType, Pagination pagination);
        DionysosUser FindUser(string userName, string password);
    }
}
