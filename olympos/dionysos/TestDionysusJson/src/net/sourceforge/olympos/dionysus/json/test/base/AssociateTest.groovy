package net.sourceforge.olympos.dionysus.json.test.base;

import static org.junit.Assert.*

import org.junit.Test;

import net.sourceforge.olympos.dionysus.json.test.DionysusTest;
import net.sourceforge.olympos.dionysus.json.test.Cfg;

public class AssociateTest extends DionysusTest {
	public AssociateTest(String method) {
		super(method)
	}
	
	@Test
	public void simple() {
		ensureLogin()

		request(
			[
			 	action: 'associate',
			 	sourceOid: Cfg.readBaseOid,
			 	targetOid: Cfg.readFirstLevelOid,
			 	role: Cfg.readBaseAttributeName
			],
			{req, json ->
				assertTrue(json.success)
				assertEquals('associate', json.action)
				assertEquals(Cfg.readBaseOid, json.sourceOid)
				assertEquals(Cfg.readFirstLevelOid, json.targetOid)
				assertEquals(Cfg.readBaseAttributeName, json.role)
				
			},
			this.method
		)
	}

	@Test
	public void invalidSourceOid() {
		ensureLogin()

		request(
			[
			 	action: 'associate',
			 	sourceOid: 'Myclas:MyOid',
			 	targetOid: Cfg.readFirstLevelOid,
			 	role: Cfg.readBaseAttributeName
			],
			{req, json ->
				assertFalse(json.success)
				assertEquals('associate', json.action)
				assertEquals(Cfg.readBaseOid, json.sourceOid)
				assertEquals(Cfg.readFirstLevelOid, json.targetOid)
				assertEquals('OID_INVALID', json.errorCode)
				assertEquals(Cfg.readBaseAttributeName, json.role)
				
			},
			this.method
		)
	}

	@Test
	public void invalidTargetOid() {
		ensureLogin()

		request(
			[
			 	action: 'associate',
			 	sourceOid: Cfg.readBaseOid,
			 	targetOid: 'Myclas:MyOid',
			 	role: Cfg.readBaseAttributeName
			],
			{req, json ->
				assertFalse(json.success)
				assertEquals('associate', json.action)
				assertEquals(Cfg.readBaseOid, json.sourceOid)
				assertEquals('Myclas:MyOid', json.targetOid)
				assertEquals('OID_INVALID', json.errorCode)
				assertEquals(Cfg.readBaseAttributeName, json.role)
				
			},
			this.method
		)
	}

	@Test
	public void invalidRole() {
		ensureLogin()

		request(
			[
			 	action: 'associate',
			 	sourceOid: Cfg.readBaseOid,
			 	targetOid: Cfg.readFirstLevelOid,
			 	role: 'WrongRole'
			],
			{req, json ->
				assertFalse(json.success)
				assertEquals('associate', json.action)
				assertEquals(Cfg.readBaseOid, json.sourceOid)
				assertEquals(Cfg.readFirstLevelOid, json.targetOid)
				assertEquals('ROLE_INVALID', json.errorCode)
				assertEquals('WrongRole', json.role)
				
			},
			this.method
		)
	}

	//@Test
	/*public void invalidAssociation() {
		ensureLogin()

		request(
			[
			 	action: 'associate',
			 	sourceOid: Cfg.readBaseOid,
			 	targetOid: '', //Please enter the correct object Id for testing
			 	role: Cfg.readBaseAttributeName
			],
			{req, json ->
				assertFalse(json.success)
				assertEquals('associate', json.action)
				assertEquals(Cfg.readBaseOid, json.sourceOid)
				assertEquals(Cfg.readFirstLevelOid, json.targetOid)
				assertEquals('ASSOCIATION_INVALID', json.errorCode)
				assertEquals( Cfg.readBaseAttributeName, json.role)
				
			},
			this.method
		)
	}*/

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
