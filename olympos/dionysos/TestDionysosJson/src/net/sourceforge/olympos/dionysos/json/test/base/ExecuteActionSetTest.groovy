package net.sourceforge.olympos.dionysos.json.test.base;

import static org.junit.Assert.*

import org.junit.Test;

import net.sourceforge.olympos.dionysos.json.test.Cfg;
import net.sourceforge.olympos.dionysos.json.test.DionysosTest;

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
				                      ],
				            action1: [
				                      action: 'create',
				                      className: Cfg.executeActionSetcreateClassName
				                      ]
				]	
				
				],
				{req, json ->
					assertTrue(json.success)
					assertEquals('executeActionSet', json.action)
					
					assertTrue(json.resultSet.action0.success)
					assertEquals('create',json.resultSet.action0.action)
					assertEquals(Cfg.executeActionSetcreateClassName,json.resultSet.action0.className)
					assertNotNull(json.resultSet.action0.oid)
					
					assertTrue(json.resultSet.action1.success)
					assertEquals('create',json.resultSet.action1.action)
					assertEquals(Cfg.executeActionSetcreateClassName,json.resultSet.action1.className)
					assertNotNull(json.resultSet.action1.oid)
						
				},
				this.method
				)
	}

	//Simple two actions, not related
	@Test
	public void createAndUpdateWithOidParam() {
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
				                      attributes: Cfg.executeActionSetAttributes
				                      ]
				]	
				
				],
				{req, json ->
					assertTrue(json.success)
					assertEquals('executeActionSet', json.action)
					
					assertTrue(json.resultSet.action0.success)
					assertEquals('create',json.resultSet.action0.action)
					assertEquals(Cfg.executeActionSetcreateClassName,json.resultSet.action0.className)
					assertNotNull(json.resultSet.action0.oid)
					
					assertTrue(json.resultSet.action1.success)
					assertEquals(json.resultSet.action0.oid,json.resultSet.action1.oid)
					assertEquals(Cfg.executeActionSetAttributes.groundBreaking,json.resultSet.action1.attributes.groundBreaking)
					assertEquals('update',json.resultSet.action1.action)
						
				},
				this.method
				)
	}
	

	//Simple two actions, not related
	@Test
	public void createParentAndChild() {
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
				                      attributes: Cfg.executeActionSetAttributes
				                      ],
				            action2: [
				                      action: 'create',
				                      className: Cfg.executeActionSetcreateClassName
				                      ],
				            action3: [
				                      action: 'update',
				                      oid: Cfg.executeActionSetUpdateOid,
				                      attributes: Cfg.executeActionSetAttributes
				                      ],
				            action4: [
				                      action: 'update',
				                      oid: Cfg.executeActionSetUpdateOid,
				                      attributes: Cfg.executeActionSetAttributes
	                      ]
				                     
				]	
				
				],
				{req, json ->
					assertTrue(json.success)
					assertEquals('executeActionSet', json.action)
					
					assertTrue(json.resultSet.action0.success)
					assertEquals('create',json.resultSet.action0.action)
					assertEquals(Cfg.executeActionSetcreateClassName,json.resultSet.action0.className)
					assertNotNull(json.resultSet.action0.oid)
					
					assertTrue(json.resultSet.action1.success)
					assertEquals(json.resultSet.action0.oid,json.resultSet.action1.oid)
					assertEquals(Cfg.executeActionSetAttributes.groundBreaking,json.resultSet.action1.attributes.groundBreaking)
					assertEquals('update',json.resultSet.action1.action)
						
				},
				this.method
				)
	}
	
}
