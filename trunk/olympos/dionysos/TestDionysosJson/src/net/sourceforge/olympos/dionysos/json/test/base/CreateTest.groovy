package net.sourceforge.olympos.dionysos.json.test.base;

import static org.junit.Assert.*

import org.junit.Test;

import net.sourceforge.olympos.dionysos.json.test.Cfg;
import net.sourceforge.olympos.dionysos.json.test.DionysusTest;

public class CreateTest extends DionysusTest {
	public CreateTest(String method) {
		super(method)
	}
	
	@Test
	public void simple() {
		ensureLogin()

		request(
			[
			 	action: 'create',
			 	className: Cfg.createClassName,
			 	 
			],
			{req, json ->
				assertTrue(json.success)
				assertEquals('create', json.action)
				assertNotNull(json.oid)
				
				 
			},
			this.method
		)
	}

	@Test
	public void invalidClassName() {
		ensureLogin()

		request(
			[
			 	action: 'create',
			 	className: 'MyClassName',
			 	 
			],
			{req, json ->
				assertFalse(json.success)
				assertEquals('create', json.action)
				assertNull(json.oid)
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
