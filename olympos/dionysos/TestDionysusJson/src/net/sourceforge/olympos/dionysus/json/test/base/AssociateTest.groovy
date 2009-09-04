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
			 	sourceOid: 'Movie:999',
			 	targetOid: Cfg.readFirstLevelOid,
			 	role: Cfg.readBaseAttributeName
			],
			{req, json ->
				assertFalse(json.success)
				assertEquals('associate', json.action)
				assertEquals('Movie:999', json.sourceOid)
				assertEquals(Cfg.readFirstLevelOid, json.targetOid)
				assertEquals('OID_INVALID', json.errorCode)
				assertEquals(Cfg.readBaseAttributeName, json.role)
				
			},
			this.method
		)
	}

	@Test
	public void invalidSourceClass() {
		ensureLogin()

		request(
			[
			 	action: 'associate',
			 	sourceOid: 'Foo:1',
			 	targetOid: Cfg.readFirstLevelOid,
			 	role: Cfg.readBaseAttributeName
			],
			{req, json ->
				assertFalse(json.success)
				assertEquals('associate', json.action)
				assertEquals('Foo:1', json.sourceOid)
				assertEquals(Cfg.readFirstLevelOid, json.targetOid)
				assertEquals('CLASS_NAME_INVALID', json.errorCode)
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
			 	targetOid: 'Director:999',
			 	role: Cfg.readBaseAttributeName
			],
			{req, json ->
				assertFalse(json.success)
				assertEquals('associate', json.action)
				assertEquals(Cfg.readBaseOid, json.sourceOid)
				assertEquals('Director:999', json.targetOid)
				assertEquals('OID_INVALID', json.errorCode)
				assertEquals(Cfg.readBaseAttributeName, json.role)
				
			},
			this.method
		)
	}

	@Test
	public void invalidTargetClass() {
		ensureLogin()

		request(
			[
			 	action: 'associate',
			 	sourceOid: Cfg.readBaseOid,
			 	targetOid: 'Foo:1',
			 	role: Cfg.readBaseAttributeName
			],
			{req, json ->
				assertFalse(json.success)
				assertEquals('associate', json.action)
				assertEquals(Cfg.readBaseOid, json.sourceOid)
				assertEquals('Foo:1', json.targetOid)
				assertEquals('CLASS_NAME_INVALID', json.errorCode)
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
