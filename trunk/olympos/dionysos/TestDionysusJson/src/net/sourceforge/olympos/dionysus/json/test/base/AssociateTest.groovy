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
			 	sourceOid: Cfg.associateSourceOid,
			 	targetOid: Cfg.associateTargerOid,
			 	role: Cfg.associateRealation
			],
			{req, json ->
				assertTrue(json.success)
				assertEquals('associate', json.action)
				assertEquals(Cfg.associateSourceOid, json.sourceOid)
				assertEquals(Cfg.associateTargerOid, json.targetOid)
				assertEquals(Cfg.associateRealation, json.role)
				
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
			 	targetOid: Cfg.associateTargerOid,
			 	role: Cfg.associateRealation
			],
			{req, json ->
				assertFalse(json.success)
				assertEquals('associate', json.action)
				assertEquals(Cfg.associateWrongSourceOid, json.sourceOid)
				assertEquals(Cfg.associateTargerOid, json.targetOid)
				assertEquals('OID_INVALID', json.errorCode)
				assertEquals(Cfg.associateRealation, json.role)
				
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
			 	targetOid: Cfg.associateTargerOid,
			 	role: Cfg.associateRealation
			],
			{req, json ->
				assertFalse(json.success)
				assertEquals('associate', json.action)
				assertEquals(Cfg.associateWrongSourceClass, json.sourceOid)
				assertEquals(Cfg.associateTargerOid, json.targetOid)
				assertEquals('CLASS_NAME_INVALID', json.errorCode)
				assertEquals(Cfg.associateRealation, json.role)
				
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
			 	targetOid: Cfg.associateWrongTargerOid,
			 	role: Cfg.associateRealation
			],
			{req, json ->
				assertFalse(json.success)
				assertEquals('associate', json.action)
				assertEquals(Cfg.associateSourceOid, json.sourceOid)
				assertEquals(Cfg.associateWrongTargerOid, json.targetOid)
				assertEquals('OID_INVALID', json.errorCode)
				assertEquals(Cfg.associateRealation, json.role)
				
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
			 	targetOid: Cfg.associateWrongTargerClass,
			 	role: Cfg.associateRealation
			],
			{req, json ->
				assertFalse(json.success)
				assertEquals('associate', json.action)
				assertEquals(Cfg.associateSourceOid, json.sourceOid)
				assertEquals(Cfg.associateWrongTargerClass, json.targetOid)
				assertEquals('CLASS_NAME_INVALID', json.errorCode)
				assertEquals(Cfg.associateRealation, json.role)
				
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
			 	targetOid: Cfg.associateTargerOid,
			 	role: Cfg.associateWrongRelation
			],
			{req, json ->
				assertFalse(json.success)
				assertEquals('associate', json.action)
				assertEquals(Cfg.associateSourceOid, json.sourceOid)
				assertEquals(Cfg.associateTargerOid, json.targetOid)
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
