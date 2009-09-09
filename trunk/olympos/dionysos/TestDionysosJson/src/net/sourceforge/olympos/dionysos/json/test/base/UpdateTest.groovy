package net.sourceforge.olympos.dionysos.json.test.base;

import static org.junit.Assert.*

import org.junit.Test;

import net.sourceforge.olympos.dionysos.json.test.Cfg;
import net.sourceforge.olympos.dionysos.json.test.DionysusTest;

public class UpdateTest extends DionysusTest {
	public UpdateTest(String method) {
		super(method)
	}
	
	@Test
	public void simple() {
		ensureLogin()

		request(
			[
			 	action: 'update',
			 	oid: Cfg.updateOid,			 	 
			 	attributes: Cfg.attributes
			],
			{req, json ->
				assertTrue(json.success)
				assertEquals('update', json.action)
				assertEquals(Cfg.updateOid, json.oid)
				assertNotNull(json.attributes)
				
				
			},
			this.method
		)
	}

	@Test
	public void invalidClassName() {
		ensureLogin()

		request(
			[
			 	action: 'update',
			 	oid: 'MyClass:MyId',
			 	attributes: Cfg.attributes
			],
			{req, json ->
				assertFalse(json.success)
				assertEquals('update', json.action)
				assertEquals('MyClass:MyId', json.oid)				 
				assertNotNull(json.attributes)
				assertEquals('CLASS_NAME_INVALID', json.errorCode)
				
			},
			this.method
		)
	}

	@Test
	public void invalidOid() {
		ensureLogin()

		request(
			[
			 	action: 'update',
			 	oid: 'com.ibm.eenergy.core.moma.objects.Preis:MyId',
			 	attributes: Cfg.attributes
			],
			{req, json ->
				assertFalse(json.success)
				assertEquals('update', json.action)
				assertEquals('com.ibm.eenergy.core.moma.objects.Preis:MyId', json.oid)				 
				assertNotNull(json.attributes)
				assertEquals('OID_INVALID', json.errorCode)
				
			},
			this.method
		)
	}

	@Test
	public void invalidAttributeName() {
		ensureLogin()

		request(
			[
			 	action: 'update',
			 	oid: Cfg.updateOid,
			 	attributes: Cfg.wrongAttributeName
			],
			{req, json ->
				assertFalse(json.success)
				assertEquals('update', json.action)
				assertEquals(Cfg.updateOid, json.oid)
				assertNotNull(json.attributes)
				assertEquals('ATTRIBUTE_NAME_INVALID', json.errorCode)
				
			},
			this.method
		)
	}

	@Test
	public void invalidAttributeValue() {
		ensureLogin()

		request(
			[
			 	action: 'update',
			 	oid: Cfg.updateOid,
			 	attributes: Cfg.wrongAttributeValue
			],
			{req, json ->
				assertFalse(json.success)
				assertEquals('update', json.action)
				assertEquals(Cfg.updateOid, json.oid)
				assertNotNull(json.attributes)
				assertEquals('ATTRIBUTE_VALUE_INVALID', json.errorCode)
				
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
