using Microsoft.VisualStudio.TestTools.UnitTesting;
using ESSC.Domain.Generated.Model;
using Newtonsoft.Json.Linq;

namespace ESSC.Domain.Tests
{
    [TestClass]
    public class NodeJsonConverterTest
    {
        [TestMethod]
        public void NodeJsonConverterTest_Should_Serialize_Node()
        {
            var movie = new Movie(null, 1);
            movie.Actors.Add(new Actor(null, 1)
            {
                Name = "A",
                SurName = "B",
                Nationality = "CA",
                Birth = "1980-10-16",
                Description = "Great actor indeed :)"
            });
            var actual = JObject.FromObject(movie);
            var expected = JObject.Parse(@"
                                        {
                                              ""className"": ""Movie"",
                                              ""oid"": ""Movie:1"",
                                              ""isReference"": false,
                                              ""lastChange"": ""0"",
                                              ""attributes"": {
                                                ""actors"": [
                                                    {
                                                    ""className"": ""Actor"",
                                                    ""oid"": ""Actor:1"",
                                                    ""isReference"": true
                                                  }
                                                ],
                                                ""productions"": [],
                                                ""directors"": [],
                                                ""posterPrimaries"": [],
                                                ""posterSecondaries"": []
                                            }
                                        }
                                        ");
            Assert.IsTrue(JToken.DeepEquals(expected,actual));            
        }
    }
}
