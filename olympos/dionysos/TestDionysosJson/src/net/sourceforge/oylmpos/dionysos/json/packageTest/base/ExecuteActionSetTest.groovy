package net.sourceforge.oylmpos.dionysos.json.packageTest.base
;

import static org.junit.Assert.*

import org.junit.Test;

import net.sourceforge.oylmpos.dionysos.json.packageTest.Cfg;
import net.sourceforge.oylmpos.dionysos.json.packageTest.DionysosTest;

public class ExecuteActionSetTest extends DionysosTest {
	public ExecuteActionSetTest(String method) {
		super(method)
	}
	
	//Simple two actions, not related
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
				                      ]
				]	
				
				],
				{req, json ->
					assertTrue(json.success)
					assertEquals('executeActionSet', json.action)
					
					/*assertTrue(json.resultSet.action0.success)
					assertEquals('create',json.resultSet.action0.action)
					assertEquals(Cfg.executeActionSetcreateClassName,json.resultSet.action0.className)
					assertNotNull(json.resultSet.action0.oid)
					
					assertTrue(json.resultSet.action1.success)
					assertEquals('create',json.resultSet.action1.action)
					assertEquals(Cfg.executeActionSetcreateClassName,json.resultSet.action1.className)
					assertNotNull(json.resultSet.action1.oid)*/
						
				},
				this.method
				)
	}
	
}
