package net.sourceforge.olympos.dionysus.json.test.base;

import static org.junit.Assert.*

import org.junit.Test;

import net.sourceforge.olympos.dionysus.json.test.DionysusTest;
import net.sourceforge.olympos.dionysus.json.test.Cfg;

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
			 	oid: Cfg.readBaseOid,			 	 
			 	attributes: Cfg.attributes
			],
			{req, json ->
				assertTrue(json.success)
				assertEquals('update', json.action)
				assertEquals(Cfg.readBaseOid, json.oid)
				assertEquals(Cfg.lastChange, json.lastChange)
				assertEquals(Cfg.attributes, json.attributes)
				
				
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
			 	oid: 'MyClass:MyId',
			 	attributes: Cfg.attributes
			],
			{req, json ->
				assertFalse(json.success)
				assertEquals('update', json.action)
				assertEquals('MyClass:MyId', json.oid)
				assertEquals(Cfg.lastChange, json.lastChange)
				assertEquals(Cfg.attributes, json.attributes)
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
			 	oid: Cfg.readBaseOid,
			 	attributes: Cfg.wrongAttributeName
			],
			{req, json ->
				assertFalse(json.success)
				assertEquals('update', json.action)
				assertEquals(Cfg.readBaseOid, json.oid)
				assertEquals(Cfg.lastChange, json.lastChange)
				assertEquals(Cfg.wrongAttributeName, json.attributes)
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
			 	oid: Cfg.readBaseOid,
			 	attributes: Cfg.wrongAttributeValue
			],
			{req, json ->
				assertTrue(json.success)
				assertEquals('update', json.action)
				assertEquals(Cfg.readBaseOid, json.oid)
				assertEquals(Cfg.lastChange, json.lastChange)
				assertEquals(Cfg.wrongAttributeValue, json.attributes)
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
