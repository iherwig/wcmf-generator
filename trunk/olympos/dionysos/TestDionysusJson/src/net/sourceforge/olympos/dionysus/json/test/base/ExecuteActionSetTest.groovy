package net.sourceforge.olympos.dionysus.json.test.base;

import static org.junit.Assert.*

import org.junit.Test;
import net.sourceforge.olympos.dionysus.json.test.DionysusTest;
import net.sourceforge.olympos.dionysus.json.test.Cfg;

public class ExecuteActionSetTest extends DionysusTest {
	public ExecuteActionSetTest(String method) {
		super(method)
	}
	
	@Test
	public void simple() {
		ensureLogin()

		request(
			[
			 	action: 'executeActionSet',
			 	actionSet: [
			 	            	action0: [
			 	            	          		action: 'create',
			 	            	          		className: Cfg.executeActionSetcreateClassName

				 	            	         ],
				 	            action1: [
				 	                      		action: 'update',
				 	                      		oid: Cfg.executeActionSetUpdateOid,
				 	                      		attributes:  Cfg.executeActionSetAttributes

				 	                      ]
             

			 	            ]
			 	 
			],
			{req, json ->
				assertTrue(json.success)
				assertEquals('executeActionSet', json.action)
				assertEquals('create',json.actionSet.action0.action)
				assertEquals(Cfg.executeActionSetcreateClassName,json.actionSet.action0.className)
				assertEquals('update',json.actionSet.action0.action)
				assertEquals(Cfg.executeActionSetUpdateOid,json.actionSet.action1.oid)
				assertEquals(Cfg.executeActionSetAttributes,json.actionSet.action1.attributes)
				
				assertTrue(json.resultSet.action0.success)
				assertEquals('create',json.resultSet.action0.action)
				assertEquals(Cfg.executeActionSetcreateClassName,json.resultSet.action0.className)
				assertNotNull(json.resultSet.action0.oid)

				assertTrue(json.resultSet.action1.success)
				assertEquals(json.resultSet.action0.oid,json.resultSet.action1.oid)
				assertEquals(Cfg.executeActionSetAttributes,json.resultSet.action1.attributes)
				assertEquals('update',json.resultSet.action1.action)
				 
				
				
			},
			this.method
		)
	}
}
