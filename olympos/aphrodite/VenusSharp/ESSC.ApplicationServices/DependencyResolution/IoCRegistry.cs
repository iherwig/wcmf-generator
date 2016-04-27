using ESSC.ApplicationServices.DionysosActionHandlers;
using ESSC.ApplicationServices.Enums;
using ESSC.ApplicationServices.Services.Concrete;
using ESSC.ApplicationServices.Services.Contracts;
using ESSC.Domain.Contracts;
using StructureMap;

namespace ESSC.ApplicationServices.DependencyResolution
{
    public class IoCRegistry : Registry
    {
        public IoCRegistry()
        {
            For<IApplicationConfiguration>().Use<ApplicationConfiguration>();
            For<IPersistenceManager>().Use<PersistenceManager>();
            For<IDionysosLogService>().Use<DionysosLogService>();
            For<ITokenManager>().Use<TokenManager>();
            For<IPasswordHasher>().Use<PasswordHasher>();
            For<IDionysosAction>().Use<AssociateActionHandler>().Named(ModelActions.Update.ToString());
            For<IDionysosAction>().Use<CreateActionHandler>().Named(ModelActions.Create.ToString());
            For<IDionysosAction>().Use<DeleteActionHandler>().Named(ModelActions.Delete.ToString());
            For<IDionysosAction>().Use<AssociateActionHandler>().Named(ModelActions.Associate.ToString());
            For<IDionysosAction>().Use<DisassociateActionHandler>().Named(ModelActions.Disassociate.ToString());
            For<IDionysosAction>().Use<ListActionHandler>().Named(ModelActions.List.ToString());
            For<IDionysosAction>().Use<LoginActionHandler>().Named(ModelActions.Login.ToString());
            For<IDionysosAction>().Use<ReadActionHandler>().Named(ModelActions.Read.ToString());
            For<IDionysosAction>().Use<UpdateActionHandler>().Named(ModelActions.Update.ToString());
        }
    }
}