using ESSC.Domain.Common;
using ESSC.Domain.Contracts;
using ESSC.Domain.Enums.Generated;

namespace ESSC.Domain.Generated.Model
{
    public class Person : EntityBaseExtended
    {
        public Person(): this(null)
        {

        }
        public Person(int id) : this(null, id)
        {

        }
        public Person(IPersistenceManager persistenceManager)
            : this(persistenceManager, 0)
        {

        }
        public Person(IPersistenceManager persistenceManager, int id)
            : base(persistenceManager, id)
        {
            Oid.Type = DomainTypes.Person;
        }

        /// <summary>
        /// <remarks>date of birth of the person</remarks>
        /// </summary>
        public string Birth
        {
            get;
            set;
        }

        /// <summary>
        /// <remarks>specify the nationality of the person</remarks>
        /// </summary>
        public string Nationality
        {
            get;
            set;
        }

        /// <summary>
        /// <remarks>?The Social Insurance Number (SIN) is a nine-digit number that you need to work or to have access to government programs and benefits.</remarks>
        /// </summary>
        public string Sin
        {
            get;
            set;
        }

        /// <summary>
        /// <remarks>surname of the person</remarks>
        /// </summary>
        public string SurName
        {
            get;
            set;
        }
    }
}
