package net.sourceforge.olympos.dionysos.json.test.base;

import static org.junit.Assert.*

import org.junit.Test;

import net.sourceforge.olympos.dionysos.json.test.Cfg;
import net.sourceforge.olympos.dionysos.json.test.DionysosTest;

public class AssociateTest extends DionysosTest {
	public AssociateTest(String method) {
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
				assertEquals(Cfg.associateRelation, json.role)
				
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
			 	sourceOid: Cfg.associateWrongSourceOid,
			 	targetOid: Cfg.associateTargetOid,
			 	role: Cfg.associateRelation
			],
			{req, json ->
				assertFalse(json.success)
				assertEquals('associate', json.action)
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
			 	action: 'associate',
			 	sourceOid: Cfg.associateWrongSourceClass,
			 	targetOid: Cfg.associateTargetOid,
			 	role: Cfg.associateRelation
			],
			{req, json ->
				assertFalse(json.success)
				assertEquals('associate', json.action)
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
			 	action: 'associate',
			 	sourceOid: Cfg.associateSourceOid,
			 	targetOid: Cfg.associateWrongTargetOid,
			 	role: Cfg.associateRelation
			],
			{req, json ->
				assertFalse(json.success)
				assertEquals('associate', json.action)
				assertEquals(Cfg.associateSourceOid, json.sourceOid)
				assertEquals(Cfg.associateWrongTargetOid, json.targetOid)
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
			 	action: 'associate',
			 	sourceOid: Cfg.associateSourceOid,
			 	targetOid: Cfg.associateWrongTargetClass,
			 	role: Cfg.associateRelation
			],
			{req, json ->
				assertFalse(json.success)
				assertEquals('associate', json.action)
				assertEquals(Cfg.associateSourceOid, json.sourceOid)
				assertEquals(Cfg.associateWrongTargetClass, json.targetOid)
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
			 	action: 'associate',
			 	sourceOid: Cfg.associateSourceOid,
			 	targetOid: Cfg.associateTargetOid,
			 	role: Cfg.associateWrongRelation
			],
			{req, json ->
				assertFalse(json.success)
				assertEquals('associate', json.action)
				assertEquals(Cfg.associateSourceOid, json.sourceOid)
				assertEquals(Cfg.associateTargetOid, json.targetOid)
				assertEquals('ROLE_INVALID', json.errorCode)
				assertEquals(Cfg.associateWrongRelation, json.role)
				
			},
			this.method
		)
	}

	/*//@Test
	 public void invalidAssociation() {
		ensureLogin()

		request(
			[
			 	action: 'associate',
			 	sourceOid: Cfg.associateSourceOid,
			 	targetOid: 'com.ibm.eenergy.core.moma.objects.Preis:12520543019684',  
			 	role: Cfg.Cfg.associateRealation
			],
			{req, json ->
				assertFalse(json.success)
				assertEquals('associate', json.action)
				assertEquals(Cfg.associateSourceOid, json.sourceOid)
				assertEquals(Cfg.associateTargerOid, json.targetOid)
				assertEquals('ASSOCIATION_INVALID', json.errorCode)
				assertEquals( Cfg.Cfg.associateRealation, json.role)
				
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
