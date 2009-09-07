package net.sourceforge.olympos.dionysus.json.test.base;

import static org.junit.Assert.*

import org.junit.Test;

import net.sourceforge.olympos.dionysus.json.test.DionysusTest;
import net.sourceforge.olympos.dionysus.json.test.Cfg;

public class DisassociateTest extends DionysusTest {
	public DisassociateTest(String method) {
		super(method)
	}
	
	@Test
	public void simple() {
		ensureLogin()

		request(
			[
			 	action: 'associate',
			 	sourceOid: Cfg.associateSourceOid,
			 	targetOid: Cfg.associateTargetOid,
			 	role: Cfg.associateRelation
			],
			{req, json ->
				assertTrue(json.success)
				assertEquals('associate', json.action)
				assertEquals(Cfg.associateSourceOid, json.sourceOid)
				assertEquals(Cfg.associateTargetOid, json.targetOid)
				
			},
			this.method
		)
		
		request(
			[
			 	action: 'disassociate',
			 	sourceOid: Cfg.associateSourceOid,
			 	targetOid: Cfg.associateTargetOid,
			 	role: Cfg.associateRelation
			],
			{req, json ->
				assertTrue(json.success)
				assertEquals('disassociate', json.action)
				assertEquals(Cfg.associateSourceOid, json.sourceOid)
				assertEquals(Cfg.associateTargetOid, json.targetOid)
			},
			this.method
		)
	}

	@Test
	public void invalidSourceOid() {
		ensureLogin()

		request(
			[
			 	action: 'disassociate',
			 	sourceOid: Cfg.associateWrongSourceOid,
			 	targetOid: Cfg.associateTargetOid,
			 	role: Cfg.associateRelation
			],
			{req, json ->
				assertFalse(json.success)
				assertEquals('disassociate', json.action)
				assertEquals(Cfg.associateWrongSourceOid, json.sourceOid)
				assertEquals(Cfg.associateTargetOid, json.targetOid)
				assertEquals('OID_INVALID', json.errorCode)
				assertEquals(Cfg.associateRelation, json.role)
				
			},
			this.method
		)
	}

	@Test
	public void invalidSourceClass() {
		ensureLogin()

		request(
			[
			 	action: 'disassociate',
			 	sourceOid: Cfg.associateWrongSourceClass,
			 	targetOid: Cfg.associateTargetOid,
			 	role: Cfg.associateRelation
			],
			{req, json ->
				assertFalse(json.success)
				assertEquals('disassociate', json.action)
				assertEquals(Cfg.associateWrongSourceClass, json.sourceOid)
				assertEquals(Cfg.associateTargetOid, json.targetOid)
				assertEquals('CLASS_NAME_INVALID', json.errorCode)
				assertEquals(Cfg.associateRelation, json.role)
				
			},
			this.method
		)
	}

	@Test
	public void invalidTargetOid() {
		ensureLogin()

		request(
			[
			 	action: 'disassociate',
			 	sourceOid: Cfg.associateSourceOid,
			 	targetOid: Cfg.associateWrongTargerOid,
			 	role: Cfg.associateRelation
			],
			{req, json ->
				assertFalse(json.success)
				assertEquals('disassociate', json.action)
				assertEquals(Cfg.associateSourceOid, json.sourceOid)
				assertEquals(Cfg.associateWrongTargerOid, json.targetOid)
				assertEquals('OID_INVALID', json.errorCode)
				assertEquals(Cfg.associateRelation, json.role)
				
			},
			this.method
		)
	}

	@Test
	public void invalidTargetClass() {
		ensureLogin()

		request(
			[
			 	action: 'disassociate',
			 	sourceOid: Cfg.associateSourceOid,
			 	targetOid: Cfg.associateWrongSourceClass,
			 	role: Cfg.associateRelation
			],
			{req, json ->
				assertFalse(json.success)
				assertEquals('disassociate', json.action)
				assertEquals(Cfg.associateSourceOid, json.sourceOid)
				assertEquals(Cfg.associateWrongSourceClass, json.targetOid)
				assertEquals('CLASS_NAME_INVALID', json.errorCode)
				assertEquals(Cfg.associateRelation, json.role)
				
			},
			this.method
		)
	}

	@Test
	public void invalidRole() {
		ensureLogin()

		request(
			[
			 	action: 'disassociate',
			 	sourceOid: Cfg.associateSourceOid,
			 	targetOid: Cfg.associateTargetOid,
			 	role: Cfg.associateWrongRelation
			],
			{req, json ->
				assertFalse(json.success)
				assertEquals('disassociate', json.action)
				assertEquals(Cfg.associateSourceOid, json.sourceOid)
				assertEquals(Cfg.associateTargetOid, json.targetOid)
				assertEquals('ROLE_INVALID', json.errorCode)
				assertEquals(Cfg.associateWrongRelation, json.role)
				
			},
			this.method
		)
	}

	 

	/*@Test
	public void invalidAssociation() {
		ensureLogin()

		request(
			[
			 	action: 'disassociate',
			 	sourceOid: Cfg.associateSourceOid,
			 	targetOid: '', //Please enter the correct object Id for testing
			 	role: Cfg.associateRelation
			],
			{req, json ->
				assertFalse(json.success)
				assertEquals('disassociate', json.action)
				assertEquals(Cfg.associateSourceOid, json.sourceOid)
				assertEquals(Cfg.associateTargetOid, json.targetOid)
				assertEquals('ASSOCIATION_INVALID', json.errorCode)
				assertEquals( Cfg.associateRelation, json.role)
				
			},
			this.method
		)
	}*/

	@Test
	public void associationNotFound() {
		ensureLogin()

		request(
			[
			 	action: 'disassociate',
			 	sourceOid: Cfg.associateSourceOid,
			 	targetOid: Cfg.associateTargetOid,
			 	role: Cfg.associateRelation
			],
			{req, json ->
				assertFalse(json.success)
				assertEquals('disassociate', json.action)
				assertEquals(Cfg.associateSourceOid, json.sourceOid)
				assertEquals(Cfg.associateTargetOid, json.targetOid)
				assertEquals('ASSOCIATION_NOT_FOUND', json.errorCode)
				
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
