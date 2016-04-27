using System.Linq;
using ESSC.Domain.Contracts;

namespace ESSC.Domain.Common.Models
{
    public class DionysosUser:Node
    {
        public DionysosUser():this(null)
        {

        }
        public DionysosUser(IPersistenceManager persistenceManager, int id):this(persistenceManager,new Oid(id))
        {

        }
        public DionysosUser(IPersistenceManager persistenceManager) : this(persistenceManager, Oid.Empty)
        {

        }
        public DionysosUser(IPersistenceManager persistenceManager, Oid oid) : base(persistenceManager, oid)
        {
        }

        public string Name { get; set; }
        public string PasswordHash { get; set; }
        public string Email { get; set; }
        public DionysosRoles Role { get; set; }

        public string[] RolesArray
        {
            get { return Role.ToString().Split(',').Select(i => i).ToArray(); }
        }
       
    }
}
