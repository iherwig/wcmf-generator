using ESSC.Domain.Enums;
using System;

namespace ESSC.Domain.Exceptions.Dionysos
{
    public class DionysosDependencyException : DionysosException
    {
        public DionysosDependencyException(Type serviceType) : base(ErrorCodes.GeneralFatal,string.Format("Can't resolve type {0}",serviceType.FullName))
        {
        }
    }
}