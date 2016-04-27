using System.Web.Http.Controllers;
using System.Web.Http.ModelBinding;

namespace ESSC.ApplicationServices.Models
{
    public class DionysosModelBinder : IModelBinder
    {
        public bool BindModel(HttpActionContext actionContext, ModelBindingContext bindingContext)
        {
            var val = bindingContext.ValueProvider.GetValue(bindingContext.ModelName);
            if (val == null)
                return false;

            var key = val.RawValue as string;
            if (key == null)
            {
                bindingContext.ModelState.AddModelError(bindingContext.ModelName, "Wrong value type");
                return false;
            }

            //GeoPoint result;
            //if (_locations.TryGetValue(key, out result) || GeoPoint.TryParse(key, out result))
            //{
            //    bindingContext.Model = result;
            //    return true;
            //}

            bindingContext.ModelState.AddModelError(
                bindingContext.ModelName, "Cannot convert value to Location");

            return false;
        }
    }
}