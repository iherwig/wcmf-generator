package net.sourceforge.olympos.dionysus.json.test.base;

import static org.junit.Assert.*

import org.junit.Test;
import net.sourceforge.olympos.dionysus.json.test.DionysusTest;
import net.sourceforge.olympos.dionysus.json.test.Cfg;
public class ReadTest extends DionysusTest {
	public ReadTest(String method) {
		super(method)
	}
	
	@Test
	public void simple() {
		ensureLogin()

		request(
			[
			 	action: 'read',
			 	oid: Cfg.readBaseOid
			],
			{req, json ->
				assertTrue(json.success)
				assertEquals('read', json.action)
				assertEquals(Cfg.readBaseOid, json.oid)
				
				assertObject(json.object, Cfg.readBaseOid, false)
				
				//def firstLevel = json.object.attributes[Cfg.readBaseAttributeName]
				//assertObject(firstLevel, Cfg.readFirstLevelOid, false)

				//def firstLevelParent = firstLevel.attributes[Cfg.readFirstLevelParentAttributeName]
                //assertObject(firstLevelParent, Cfg.readBaseOid, true)

				//def secondLevel = firstLevel.attributes[Cfg.readFirstLevelAttributeName]
                //assertObject(secondLevel, Cfg.readSecondLevelOid, true)
			},
			this.method
		)
	}

	@Test
	public void depth0() {
		ensureLogin()

		request(
			[
			 	action: 'read',
			 	oid: Cfg.readBaseOid,
			 	depth: 0
			],
			{req, json ->
				assertTrue(json.success)
				assertEquals('read', json.action)
				assertEquals(Cfg.readBaseOid, json.oid)
				assertEquals(0, json.depth)
				
				assertObject(json.object, Cfg.readBaseOid, false)
				
				def firstLevel = json.object.attributes[Cfg.readBaseAttributeName]
				assertObject(firstLevel, Cfg.readFirstLevelOid, true)
			},
			this.method
		)
	}

	@Test
	public void depth2() {
		ensureLogin()

		request(
			[
			 	action: 'read',
			 	oid: Cfg.readBaseOid,
			 	depth: 2
			],
			{req, json ->
				assertTrue(json.success)
				assertEquals('read', json.action)
				assertEquals(Cfg.readBaseOid, json.oid)
				assertEquals(2, json.depth)
				
				assertObject(json.object, Cfg.readBaseOid, false)
				
				def firstLevel = json.object.attributes[Cfg.readBaseAttributeName]
				assertObject(firstLevel, Cfg.readFirstLevelOid, false)
			
				def firstLevelParent = firstLevel.attributes[Cfg.readFirstLevelParentAttributeName]
			    assertObject(firstLevelParent, Cfg.readBaseOid, true)
			
				def secondLevel = firstLevel.attributes[Cfg.readFirstLevelAttributeName]
			    assertObject(secondLevel, Cfg.readSecondLevelOid, false)
			},
			this.method
		)
	}

	@Test
	public void depthUnlimited() {
		ensureLogin()

		request(
			[
			 	action: 'read',
			 	oid: Cfg.readBaseOid,
			 	depth: -1
			],
			{req, json ->
				assertTrue(json.success)
				assertEquals('read', json.action)
				assertEquals(Cfg.readBaseOid, json.oid)
				assertEquals(-1, json.depth)
				
				assertObject(json.object, Cfg.readBaseOid, false)
				
				def firstLevel = json.object.attributes[Cfg.readBaseAttributeName]
				assertObject(firstLevel, Cfg.readFirstLevelOid, false)
			
				def firstLevelParent = firstLevel.attributes[Cfg.readFirstLevelParentAttributeName]
			    assertObject(firstLevelParent, Cfg.readBaseOid, true)
			
				def secondLevel = firstLevel.attributes[Cfg.readFirstLevelAttributeName]
			    assertObject(secondLevel, Cfg.readSecondLevelOid, false)
			},
			this.method
		)
	}
	
	@Test
	public void depthInvalid() {
		ensureLogin()

		request(
			[
			 	action: 'read',
			 	oid: Cfg.readBaseOid,
			 	depth: -2
			],
			{req, json ->
				assertFalse(json.success)
				assertEquals('read', json.action)
				assertEquals(Cfg.readBaseOid, json.oid)
				assertEquals(-2, json.depth)
				
				assertEquals('DEPTH_INVALID', json.errorCode)
			},
			this.method
		)
	}

	private void assertObject(json, oid, boolean isReference) {
		assertNotNull(json)
		assertEquals(oid, json.oid)
		assertEquals(getClassNameFromOid(oid), json.className)
		//assertNotNull(json.lastChange)
		//assertEquals(isReference as String, json.isReference)
	}
	
	private String getClassNameFromOid(String oid) {
		return oid.split(':')[0]
	}
}
