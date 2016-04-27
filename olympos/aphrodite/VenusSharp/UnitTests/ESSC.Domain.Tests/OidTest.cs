using Microsoft.VisualStudio.TestTools.UnitTesting;
using ESSC.Domain.Common;
using ESSC.Domain.Enums.Generated;
using ESSC.Domain.Exceptions;

namespace ESSC.Domain.Tests
{
    [TestClass]
    public class OidTest
    {
        [TestMethod]
        public void Oid_Should_Return_Empty()
        {
            var empty = Oid.Empty;
            Assert.AreEqual(DomainTypes.Unknown, empty.Type);
            Assert.AreEqual(0, empty.Id);
        }
        [TestMethod]
        public void Oid_Should_Construct_With_Id()
        {
            var oid = new Oid(10);
            Assert.AreEqual(10, oid.Id);
            Assert.AreEqual(DomainTypes.Unknown, oid.Type);
        }

        [TestMethod]
        public void Oid_Should_Construct_With_String()
        {
            var oid = new Oid("Movie:100");
            Assert.AreEqual(100, oid.Id);
            Assert.AreEqual(DomainTypes.Movie, oid.Type);
        }
        [TestMethod]
        [ExpectedException(typeof(DomainInvalidOidException))]
        public void Oid_Constructor_With_Invalid_OidType_Should_Throw_Exception()
        {
            var oid = new Oid("A:9");
        }
        [TestMethod]
        [ExpectedException(typeof(DomainInvalidOidException))]
        public void Oid_Constructor_With_Invalid_OidId_Should_Throw_Exception()
        {
            var oid = new Oid("A:a");
        }
        [TestMethod]
        [ExpectedException(typeof(DomainInvalidOidException))]
        public void Oid_Constructor_With_Invalid_OidString_Should_Throw_Exception()
        {
            var oid = new Oid("A!a");
        }
        [TestMethod]
        public void Equals_Should_Equates_Two_Oids()
        {
            var oid1 = new Oid("Movie:1");
            var oid2 = new Oid("Movie:1");
            Assert.IsTrue(oid1.Equals(oid2));
        }
    }
}
