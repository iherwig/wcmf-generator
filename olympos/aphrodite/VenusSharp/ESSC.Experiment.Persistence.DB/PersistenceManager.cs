using ESSC.Domain.Contracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ESSC.Domain.Common;
using ESSC.Domain.Common.Models;
using ESSC.Domain.Enums.Generated;

namespace ESSC.Experiment.Persistence.DB
{
    public class PersistenceManager : IPersistenceManager
    {
        public void AddChild(Node parent, Node node)
        {
            throw new NotImplementedException();
        }

        public int CountChildren(Node parent, DomainTypes childType)
        {
            throw new NotImplementedException();
        }

        public int CountChildren(Node parent, DomainTypes childType, Pagination pagination)
        {
            throw new NotImplementedException();
        }

        public Node Create(Node node)
        {
            throw new NotImplementedException();
        }

        public void Delete(Node node)
        {
            throw new NotImplementedException();
        }

        public void DeleteChild(Node parent, Node child, bool reallyDelete)
        {
            throw new NotImplementedException();
        }

        public void Dispose()
        {
            throw new NotImplementedException();
        }

        public DionysosUser FindUser(string userName, string password)
        {
            throw new NotImplementedException();
        }

        public PaginatedResult<Node> Load(DomainTypes nodeType, Pagination pagination)
        {
            throw new NotImplementedException();
        }

        public List<Node> LoadAllChildren(Node parent, DomainTypes childType)
        {
            throw new NotImplementedException();
        }

        public List<Node> LoadChildren(Node parent, DomainTypes childType, Pagination pagination, int? depth)
        {
            throw new NotImplementedException();
        }

        public List<Node> LoadPAge()
        {
            throw new NotImplementedException();
        }

        public Node Read(Oid oid, int? depth = default(int?))
        {            
            throw new NotImplementedException();
        }
    }
}
