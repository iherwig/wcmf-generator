package net.sourceforge.olympos.dionysus.json.test.base;

import static org.junit.Assert.*

import org.junit.Test;
import net.sourceforge.olympos.dionysus.json.test.DionysusTest;
import net.sourceforge.olympos.dionysus.json.test.Cfg;
public class UpdateTest extends DionysusTest {
	public UpdateTest(String method) {
		super(method)
	}
	
	/*
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
				
				def firstLevel = json.object.attributes[Cfg.readBaseAttributeName]
				assertObject(firstLevel, Cfg.readFirstLevelOid, false)

				def firstLevelParent = firstLevel.attributes[Cfg.readFirstLevelParentAttributeName]
                assertObject(firstLevelParent, Cfg.readBaseOid, true)

				def secondLevel = firstLevel.attributes[Cfg.readFirstLevelAttributeName]
                assertObject(secondLevel, Cfg.readSecondLevelOid, true)
			},
			this.method
		)
	}
	*/
}
