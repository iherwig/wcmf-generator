using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using ESSC.Domain.Microservice;
using ESSC.Domain.Common;
using ESSC.Domain.Generated.Model;
using System.Diagnostics;
using Newtonsoft.Json.Linq;

namespace ESSC.Domain.Tests
{
    [TestClass]
    public class ServiceResultTest
    {
        [TestMethod]
        public void ServiceResult_Should_Serialize_Nodes()
        {
            var serviceResult = new ServiceResult<Movie>();
            serviceResult.Result = new Movie(12);
            serviceResult.Result.Name = "Wild";
            serviceResult.Result.Genre = "Adventure";
            serviceResult.Result.Language = "En";
            serviceResult.ErrorCode = Enums.ErrorCodes.ClassNameInvalid;
            var actual = JObject.FromObject(serviceResult);
            var expected = JObject.Parse(@"{
                                  ""result"": {
                                    ""className"": ""Movie"",
                                    ""oid"": ""Movie:12"",
                                    ""isReference"": false,
                                    ""lastChange"": ""0"",
                                    ""attributes"": {
                                      ""actors"": [],
                                      ""productions"": [],
                                      ""directors"": [],
                                      ""posterPrimaries"": [],
                                      ""posterSecondaries"": [],
                                      ""genre"": ""Adventure"",
                                      ""language"": ""En"",
                                      ""name"": ""Wild""
                                    }
                                  },
                                  ""displayErrorMessage"": null,
                                  ""errorCode"": 7,
                                  ""logMessage"": null
                                }");
            Assert.IsTrue(JToken.DeepEquals(expected, actual));
        }
    }
}
