using ESSC.Domain.Common;
using ESSC.Domain.Contracts;
using ESSC.Domain.Enums.Generated;
using ESSC.Domain.Generated.Model;
using System;

namespace ESSC.Domain.Generated.Factories
{
    public static class NodeFactory
    {
        public static Node CreateObject(DomainTypes typeName,IPersistenceManager persistenceManaer)
        {
            Node node = null;
            switch (typeName)
            {
                case DomainTypes.Movie:
                    node = new Movie(persistenceManaer);
                    break;
                case DomainTypes.Actor:
                    node = new Actor(persistenceManaer);
                    break;
                case DomainTypes.Director:
                    node = new Director(persistenceManaer);
                    break;
                case DomainTypes.Production:
                    return new Production(persistenceManaer);
                    break;
                case DomainTypes.Genre:
                    return new Genre(persistenceManaer);
                    break;
            }

            if (node == null)
                throw new ApplicationException(
                    "ExternalRef.ObjectFactory failed to initialize object of Invalid typeName" + typeName);

            return node;
        }
    }
}
