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
			 	lastChange: '1234567890',
			 	attributes: "{title: 'Matrix 3',groundbreaking: true}"
			],
			{req, json ->
				assertTrue(json.success)
				assertEquals('update', json.action)
				assertEquals(Cfg.readBaseOid, json.oid)
				
				assertObject(json.object, Cfg.readBaseOid, false)
				
			},
			this.method
		)
	}

	

	private void assertObject(json, oid, boolean isReference) {
		assertNotNull(json)
		assertEquals(oid, json.oid)
		assertEquals(getClassNameFromOid(oid), json.className)
		assertNotNull(json.lastChange)
	}
	
	private String getClassNameFromOid(String oid) {
		return oid.split(':')[0]
	}
}
