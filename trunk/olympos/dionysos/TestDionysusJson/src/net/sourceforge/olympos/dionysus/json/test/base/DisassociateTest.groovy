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
			 	sourceOid: Cfg.readBaseOid,
			 	targetOid: Cfg.readFirstLevelOid,
			 	role: Cfg.readBaseAttributeName
			],
			{req, json ->
				assertTrue(json.success)
				assertEquals('associate', json.action)
				assertEquals(Cfg.readBaseOid, json.sourceOid)
				assertEquals(Cfg.readFirstLevelOid, json.targetOid)
				
			},
			this.method
		)
		
		request(
			[
			 	action: 'disassociate',
			 	sourceOid: Cfg.readBaseOid,
			 	targetOid: Cfg.readFirstLevelOid,
			 	role: Cfg.readBaseAttributeName
			],
			{req, json ->
				assertTrue(json.success)
				assertEquals('disassociate', json.action)
				assertEquals(Cfg.readBaseOid, json.sourceOid)
				assertEquals(Cfg.readFirstLevelOid, json.targetOid)
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
