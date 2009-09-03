package net.sourceforge.olympos.dionysus.json.test.base;

import static org.junit.Assert.*

import org.junit.Test;

import net.sourceforge.olympos.dionysus.json.test.DionysusTest;
import net.sourceforge.olympos.dionysus.json.test.Cfg;

public class DeleteTest extends DionysusTest {
	public DeleteTest(String method) {
		super(method)
	}
	
	@Test
	public void simple() {
		ensureLogin()

		request(
			[
			 	action: 'delete',
			 	oid: Cfg.deleteOid,
			 	 
			],
			{req, json ->
				assertTrue(json.success)
				assertEquals('delete', json.action)
				assertEquals(Cfg.deleteOid, json.oid)
				
				 
			},
			this.method
		)
	}

	@Test
	public void invalidOid() {
		ensureLogin()

		request(
			[
			 	action: 'delete',
			 	oid: 'MyClass:MyOid',
			 	 
			],
			{req, json ->
				assertTrue(json.success)
				assertEquals('delete', json.action)
				assertEquals('MyClass:MyOid', json.oid)
				assertEquals('OID_INVALID', json.errorCode)
				 
			},
			this.method
		)
	}

	 

	private void assertObject(json, oid, boolean isReference) {
		assertNotNull(json)
		assertEquals(oid, json.oid)
		assertEquals(getClassNameFromOid(oid), json.className)
		assertNotNull(json.lastChange)
		assertEquals(isReference, json.isReference)
	}
	
	private String getClassNameFromOid(String oid) {
		return oid.split(':')[0]
	}
}
