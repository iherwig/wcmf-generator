package net.sourceforge.olympos.dionysos.json.solarpanel;

import static org.junit.Assert.*

import org.junit.Test;

import net.sourceforge.olympos.dionysos.json.test.DionysosTest;

public class SharedTests extends DionysosTest {
	static solarPanelOid = null;
	static solarPanelOid2 = null;
	 
	static locationOid1 = null;
	static locationOid2 = null;
 
	public SharedTests(String method) {
		super(method)
	}
	
	//Create Tests 
	@Test
	public void sharedCreateParentWithMin0CountChild() {
		ensureLogin()

		request(
			[
			 	action: 'executeActionSet',
			 	actionSet: [
			 	            	action0: [
			 	            	          		action: 'create',
			 	            	          		className: 'SolarPanel'

											],
								action1: [
				 	                      		action: 'update',
				 	                      		oid: '{SolarPanel:?}',
				 	                      		attributes:  '{"energyCarrier": "sai","kW":"sai"}'

										]

						]	
			 	 
			],
			{req, json ->
				assertTrue(json.success)
				assertEquals('executeActionSet', json.action)
			 
				 
				
				assertTrue(json.resultSet.action0.success)
				assertEquals('create',json.resultSet.action0.action)
				assertEquals('SolarPanel',json.resultSet.action0.className)
				assertNotNull(json.resultSet.action0.oid)
				
				solarPanelOid = json.resultSet.action0.oid;
				
				assertTrue(json.resultSet.action1.success)
				assertEquals(json.resultSet.action0.oid,json.resultSet.action1.oid)				 
				assertEquals('update',json.resultSet.action1.action)
				
				 
				
			},
			this.method
		)
	}


	@Test
	public void sharedCreateParentWithMin0CountChildVerifyRead() {
		ensureLogin()

		request(
			[
			 	action: 'executeActionSet',
			 	actionSet: [
			 	            	 		
				 	            action0: [
				 	                      		action: 'read',
				 	                      		oid: solarPanelOid,
				 	                      		depth: -1
				 	                     ]
             

						]	
			 	 
			],
			{req, json ->
				assertTrue(json.success)
				assertEquals('executeActionSet', json.action)
			 
				 
				
				 
				assertTrue(json.resultSet.action0.success)				 				 
				assertEquals('read',json.resultSet.action0.action)
				assertNull(json.resultSet.action0.object.attributes.location)	
				
			},
			this.method
		)
	}

	//Create Test with min multiplicy 1 is not there now will need to write in future if we came up with them
	
	//Association tests
	
	@Test
	public void shareAssociationTestSimpleThrougCreateChild() {
		ensureLogin()

		request(
			[
			 	action: 'executeActionSet',
			 	actionSet: [
			 	            	action0: [
			 	            	          		action: 'create',
			 	            	          		className: 'SolarPanel'

											],
								action1: [
				 	                      		action: 'createChild',
				 	                      		parentOid: '{SolarPanel:?}',
				 	                      		childRole: 'location'				 	                      		 

										]
             

						]	
			 	 
			],
			{req, json ->
				assertTrue(json.success)
				assertEquals('executeActionSet', json.action)
			 
				 
				
				assertTrue(json.resultSet.action0.success)
				assertEquals('create',json.resultSet.action0.action)
				assertEquals('SolarPanel',json.resultSet.action0.className)
				assertNotNull(json.resultSet.action0.oid)
				
				solarPanelOid = json.resultSet.action0.oid;

				assertTrue(json.resultSet.action1.success)
				assertEquals(json.resultSet.action0.oid,json.resultSet.action1.parentOid)				 
				assertEquals('createChild',json.resultSet.action1.action)
				assertNotNull(json.resultSet.action1.childOid)
				
				locationOid1 = json.resultSet.action1.childOid;
				 
				
			},
			this.method
		)
	}

	 

	@Test
	public void shareAssociationTestSimpleThrougCreateChildVerifyRead() {
		ensureLogin()

		request(
			[
			 	action: 'executeActionSet',
			 	actionSet: [
			 	            	 
								action0: [
				 	                      		action: 'read',
				 	                      		oid: solarPanelOid,
				 	                      		depth: -1
				 	                     ]
             

						]	
			 	 
			],
			{req, json ->
				assertTrue(json.success)
				assertEquals('executeActionSet', json.action)
			 
				 
				 
				assertTrue(json.resultSet.action0.success)
				assertEquals(json.resultSet.action0.oid,solarPanelOid)				 
				assertEquals('read',json.resultSet.action0.action)
				assertNotNull(json.resultSet.action0.object.attributes.location)
				assertNotNull(json.resultSet.action0.object.attributes.location.oid)
				
			},
			this.method
		)
	}

	//Disassociate Childs
	
	@Test
	public void sharedDisAssociationTest1() {
		ensureLogin()

		request(
			[
			 	action: 'executeActionSet',
			 	actionSet: [
			 								 	            	 
								action0: [
				 	                      		action: 'disassociate',
				 	                      		sourceOid: solarPanelOid,
				 	                      		targetOid: locationOid1,
				 	                      		role: 'location'
										]								 								 	             

						]	
			 	 
			],
			{req, json ->
				assertTrue(json.success)
				assertEquals('executeActionSet', json.action)			 	
			},
			this.method
		)
	}
	
	
	@Test
	public void sharedDisAssociationTest1ReadTheChild() {
		ensureLogin()

		request(
			[
			 	action: 'executeActionSet',
			 	actionSet: [
			 								 	            	 
								action0: [
				 	                      		action: 'read',
				 	                      		oid: locationOid1
				 	                      		                  		 
										]								 								 	             

						]	
			 	 
			],
			{req, json ->
				assertTrue(json.success)
				assertEquals('executeActionSet', json.action)			 	
			},
			this.method
		)
	}
	@Test
	public void shareAssociationTestSimpleThroughAssociation() {
		ensureLogin()

		request(
			[
			 	action: 'executeActionSet',
			 	actionSet: [			 	            	 
								action0: [
			 	            	          		action: 'create',
			 	            	          		className: 'Location'

											],			
								action1: [
				 	                      		action: 'associate',
				 	                      		sourceOid: solarPanelOid,
				 	                      		targetOid: '{Location:?}',
			 									role: 'location'				 	                      		 				 	                      		 

										]
             

						]	
			 	 
			],
			{req, json ->
				assertTrue(json.success)
				assertEquals('executeActionSet', json.action)
			 
				 
				
				 
				
				assertTrue(json.resultSet.action0.success)
				assertEquals('create',json.resultSet.action0.action)
				assertEquals('Location',json.resultSet.action0.className)
				assertNotNull(json.resultSet.action0.oid)
				locationOid1 = json.resultSet.action0.oid;

				assertTrue(json.resultSet.action1.success)
				assertEquals(json.resultSet.action1.sourceOid,solarPanelOid)
				assertEquals(json.resultSet.action1.targetOid,json.resultSet.action0.oid)				 
				assertEquals('associate',json.resultSet.action1.action)
				
				 
				
			},
			this.method
		)
	}


	@Test
	public void shareAssociationTestSimpleThroughAssociationVerifyRead() {
		ensureLogin()

		request(
			[
			 	action: 'executeActionSet',
			 	actionSet: [
			 	            	 
								action0: [
				 	                      		action: 'read',
				 	                      		oid: solarPanelOid,
				 	                      		depth: -1
				 	                     ]
             

						]	
			 	 
			],
			{req, json ->
				assertTrue(json.success)
				assertEquals('executeActionSet', json.action)
			 
				 
				 
				assertTrue(json.resultSet.action0.success)				 				
				assertEquals('read',json.resultSet.action0.action)
				assertEquals(solarPanelOid,json.resultSet.action0.object.oid)
				assertNotNull(json.resultSet.action0.object.attributes.location)	
				assertNotNull(json.resultSet.action0.object.attributes.location.oid)				 
			 
			},
			this.method
		)
	}
	
	@Test
	public void sharedDisAssociationTest2() {
		ensureLogin()

		request(
			[
			 	action: 'executeActionSet',
			 	actionSet: [
			 								 	            	 
								action0: [
				 	                      		action: 'disassociate',
				 	                      		sourceOid: solarPanelOid,
				 	                      		targetOid: locationOid1,
				 	                      		role: 'location'
										]								 								 	             

						]	
			 	 
			],
			{req, json ->
				assertTrue(json.success)
				assertEquals('executeActionSet', json.action)			 	
			},
			this.method
		)
	} 
	 
	@Test
	public void shareAssociationTestSimpleThroughAssociationReverse() {
		ensureLogin()

		request(
			[
			 	action: 'executeActionSet',
			 	actionSet: [
			 	             
								action0: [
			 	            	          		action: 'create',
			 	            	          		className: 'Location'

											],			
								action1: [
				 	                      		action: 'associate',
				 	                      		sourceOid: '{Location:?}',
				 	                      		targetOid: solarPanelOid,
			 									role: 'solarPanel'				 	                      		 				 	                      		 

										]

						]	
			 	 
			],
			{req, json ->
				assertTrue(json.success)
				assertEquals('executeActionSet', json.action)
			 
				 
				
				
				
				assertTrue(json.resultSet.action0.success)
				assertEquals('create',json.resultSet.action0.action)
				assertEquals('Location',json.resultSet.action0.className)
				assertNotNull(json.resultSet.action0.oid)
				
				locationOid2 = json.resultSet.action0.oid;
				
				assertTrue(json.resultSet.action1.success)
				assertEquals(json.resultSet.action1.sourceOid,locationOid2)
				assertEquals(json.resultSet.action1.targetOid,solarPanelOid)				 
				assertEquals('associate',json.resultSet.action1.action)
				
			 
				
			},
			this.method
		)
	}

	@Test
	public void shareAssociationTestSimpleThroughAssociationReverseVerifYRead() {
		ensureLogin()

		request(
			[
			 	action: 'executeActionSet',
			 	actionSet: [
			 	            	 
								action0: [
				 	                      		action: 'read',
				 	                      		oid: solarPanelOid,
				 	                      		depth: -1
				 	                     ]
             

						]	
			 	 
			],
			{req, json ->
				assertTrue(json.success)
				assertEquals('executeActionSet', json.action)
			 
				assertTrue(json.resultSet.action0.success)				 				
				assertEquals('read',json.resultSet.action0.action)
				assertEquals(solarPanelOid,json.resultSet.action0.object.oid)
				assertNotNull(json.resultSet.action0.object.attributes.location)	
				assertNotNull(json.resultSet.action0.object.attributes.location.oid)
			 
				
			},
			this.method
		)
	}


	@Test
	public void shareAssociationTestReAssociateToanotherParent() {
		ensureLogin()

		request(
			[
			 	action: 'executeActionSet',
			 	actionSet: [
			 	             
								action0: [
			 	            	          		action: 'create',
			 	            	          		className: 'SolarPanel'

											],	
								action1: [
						 	                      		action: 'disassociate',
						 	                      		sourceOid: locationOid2,
						 	                      		targetOid: solarPanelOid,
					 									role: 'solarPanel'				 	                      		 				 	                      		 

												],
								action2: [
				 	                      		action: 'associate',
				 	                      		sourceOid: locationOid2,
				 	                      		targetOid: '{SolarPanel:?}',
			 									role: 'solarPanel'				 	                      		 				 	                      		 

										]

						]	
			 	 
			],
			{req, json ->
				assertTrue(json.success)
				assertEquals('executeActionSet', json.action)
			 
				 
				
				
				
				assertTrue(json.resultSet.action0.success)
				assertEquals('create',json.resultSet.action0.action)
				assertEquals('SolarPanel',json.resultSet.action0.className)
				assertNotNull(json.resultSet.action0.oid)
				
				solarPanelOid2 = json.resultSet.action0.oid;
								 
				assertTrue(json.resultSet.action1.success)
				assertEquals(json.resultSet.action1.sourceOid,locationOid2)
				assertEquals(json.resultSet.action1.targetOid,solarPanelOid)				 
				assertEquals('disassociate',json.resultSet.action1.action)
				
				assertTrue(json.resultSet.action2.success)
				assertEquals(json.resultSet.action2.sourceOid,locationOid2)
				assertEquals(json.resultSet.action2.targetOid,json.resultSet.action0.oid)				 
				assertEquals('associate',json.resultSet.action2.action)
				
			 
				
			},
			this.method
		)
	}


	@Test
	public void shareAssociationTestReAssociateToanotherParentVerifyRead() {
		ensureLogin()

		request(
			[
			 	action: 'executeActionSet',
			 	actionSet: [
			 	             
								action0: [
			 	            	          		action: 'read',
			 	            	          		oid: solarPanelOid2

											] 
						   ]					
			 	 
			],
			{req, json ->
				assertTrue(json.success)
				assertEquals('executeActionSet', json.action)
			 
				 
				
				
				
				
				assertTrue(json.resultSet.action0.success)				 				
				assertEquals('read',json.resultSet.action0.action)
				assertEquals(solarPanelOid2,json.resultSet.action0.object.oid)
				assertNotNull(json.resultSet.action0.object.attributes.location)	
				assertNotNull(json.resultSet.action0.object.attributes.location.oid)
				
				assertEquals(locationOid2,json.resultSet.action0.object.attributes.location.oid)
				
			},
			this.method
		)
	}



	@Test
	public void shareAssociationTestReAssociateChildFromAnotherParent() {
		ensureLogin()

		request(
			[
			 	action: 'executeActionSet',
			 	actionSet: [
			 	             
								 
								action0: [
						 	                      		action: 'associate',
						 	                      		sourceOid: solarPanelOid,
						 	                      		targetOid: locationOid2,
					 									role: 'location'				 	                      		 				 	                      		 

												]

						]	
			 	 
			],
			{req, json ->
				assertTrue(json.success)
				assertEquals('executeActionSet', json.action)
			 
				 
				 
			 
				
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
