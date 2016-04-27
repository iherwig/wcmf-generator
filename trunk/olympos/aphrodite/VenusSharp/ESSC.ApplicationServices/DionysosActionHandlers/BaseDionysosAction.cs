using ESSC.ApplicationServices.Models;
using ESSC.ApplicationServices.Services.Contracts;
using ESSC.Domain.Contracts;

namespace ESSC.ApplicationServices.DionysosActionHandlers
{
    public abstract class BaseDionysosAction:IDionysosAction
    {
        protected readonly IPersistenceManager PersistenceManager;

        public BaseDionysosAction(IPersistenceManager persistenceManager)
        {
            PersistenceManager = persistenceManager;
        }

        public void Dispose()
        {
           if(PersistenceManager!=null)
                PersistenceManager.Dispose();
        }

        public abstract DionysosBaseResponse Execute();
    }
}