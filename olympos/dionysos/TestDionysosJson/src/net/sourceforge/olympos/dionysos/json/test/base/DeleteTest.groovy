package net.sourceforge.olympos.dionysos.json.test.base;

import static org.junit.Assert.*

import org.junit.Test;

import net.sourceforge.olympos.dionysos.json.test.Cfg;
import net.sourceforge.olympos.dionysos.json.test.DionysosTest;

public class DeleteTest extends DionysosTest {
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
			 	oid: Cfg.deleteInvalidOid,
			 	 
			],
			{req, json ->
				assertTrue(json.success)
				assertEquals('delete', json.action)
				assertEquals(Cfg.deleteInvalidOid, json.oid)
				assertEquals('OID_INVALID', json.errorCode)
				 
			},
			this.method
		)
	}

	@Test
	public void invalidClassName() {
		ensureLogin()

		request(
			[
			 	action: 'delete',
			 	oid: Cfg.deleteInvalidClass,
			 	 
			],
			{req, json ->
				assertTrue(json.success)
				assertEquals('delete', json.action)
				assertEquals(Cfg.deleteInvalidClass, json.oid)
				assertEquals('CLASS_NAME_INVALID', json.errorCode)
				 
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
