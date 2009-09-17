package net.sourceforge.olympos.dionysos.json.test.base;

import static org.junit.Assert.*

import org.junit.Test;

import net.sourceforge.olympos.dionysos.json.test.Cfg;
import net.sourceforge.olympos.dionysos.json.test.DionysosTest;

public class CloneTest extends DionysosTest {
	public CloneTest(String method) {
		super(method)
	}
	
	@Test
	public void simple() {
		ensureLogin()

		request(
			[
			 	action: 'clone',
			 	oid: Cfg.readBaseOid,
			 	 
			],
			{req, json ->
				assertTrue(json.success)
				assertEquals('clone', json.action)
				assertNotNull(json.oid)
				assertNotEqual(Cfg.readBaseOid, json.oid)
				
				 
			},
			this.method
		)
	}

	@Test
	public void depth0() {
		ensureLogin()

		request(
			[
			 	action: 'clone',
			 	oid: Cfg.readBaseOid,
			 	depth: 0
			],
			{req, json ->
				assertTrue(json.success)
				assertEquals('clone', json.action)
				assertNotEqual(Cfg.readBaseOid, json.oid)
				assertEquals(0, json.depth)
				
				//assertObject(json.object, Cfg.readBaseOid, false)
				
				//def firstLevel = json.object.attributes[Cfg.readBaseAttributeName]
				//assertObject(firstLevel, Cfg.readFirstLevelOid, true)
			},
			this.method
		)
	}

	@Test
	public void depth2() {
		ensureLogin()

		request(
			[
			 	action: 'clone',
			 	oid: Cfg.readBaseOid,
			 	depth: 2
			],
			{req, json ->
				assertTrue(json.success)
				assertEquals('clone', json.action)
				assertNotEqual(Cfg.readBaseOid, json.oid)
				assertEquals(2, json.depth)
				
				//assertObject(json.object, Cfg.readBaseOid, false)
				
				//def firstLevel = json.object.attributes[Cfg.readBaseAttributeName]
				//assertObject(firstLevel, Cfg.readFirstLevelOid, false)
			
				//def firstLevelParent = firstLevel.attributes[Cfg.readFirstLevelParentAttributeName]
			    //assertObject(firstLevelParent, Cfg.readBaseOid, true)
			
				//def secondLevel = firstLevel.attributes[Cfg.readFirstLevelAttributeName]
			    //assertObject(secondLevel, Cfg.readSecondLevelOid, false)
			},
			this.method
		)
	}
	
	@Test
	public void invalidOid() {
		ensureLogin()

		request(
			[
			 	action: 'clone',
			 	oid: Cfg.baseClassName + ':MyId',
			 	 
			],
			{req, json ->
				assertFalse(json.success)
				assertEquals('clone', json.action)
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
