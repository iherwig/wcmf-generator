package net.sourceforge.olympos.dionysos.json.solarpanel;

import static org.junit.Assert.*

import org.junit.Test;

import net.sourceforge.olympos.dionysos.json.test.Cfg;
import net.sourceforge.olympos.dionysos.json.test.DionysosTest;

public class CompositeTests extends DionysosTest {
	static areaOid = null;
	static energyProducerOid = null;
	static regionOid1 = null;
	static regionOid2 = null;
	public CompositeTests(String method) {
		super(method)
	}
	
	//Create Tests 
	@Test
	public void compositeCreateParentWithMin1CountChild() {
		ensureLogin()

		request(
			[
			 	action: 'executeActionSet',
			 	actionSet: [
			 	            	action0: [
			 	            	          		action: 'create',
			 	            	          		className: 'Area'

											],
								action1: [
				 	                      		action: 'update',
				 	                      		oid: '{Area:?}',
				 	                      		attributes:  '{"sectionID": 123,"sectionName":"saiArea"}'

										] 

						]	
			 	 
			],
			{req, json ->
				assertTrue(json.success)
				assertEquals('executeActionSet', json.action)
			 
				 
				
				assertTrue(json.resultSet.action0.success)
				assertEquals('create',json.resultSet.action0.action)
				assertEquals('Area',json.resultSet.action0.className)
				assertNotNull(json.resultSet.action0.oid)
				
				this.areaOid = json.resultSet.action0.oid;
				
				assertTrue(json.resultSet.action1.success)
				assertEquals(json.resultSet.action0.oid,json.resultSet.action1.oid)				 
				assertEquals('update',json.resultSet.action1.action)
				
				
			},
			this.method
		)
	}
	
	
	//Create Tests 
	@Test
	public void compositeCreateParentWithMin1CountChildVerifyThroughRead() {
		ensureLogin()

		request(
			[
			 	action: 'executeActionSet',
			 	actionSet: [
			 	            	 		
				 	            action0: [
				 	                      		action: 'read',
				 	                      		oid: this.areaOid,
				 	                      		depth: -1
				 	                     ]
             

						]	
			 	 
			],
			{req, json ->
				assertTrue(json.success)
				assertEquals('executeActionSet', json.action)
			 
				 
				
				assertTrue(json.resultSet.action0.success)
				 				 
				assertEquals('read',json.resultSet.action0.action)
				assertNotNull(json.resultSet.action0.object.attributes.region) 
				assertNotNull(json.resultSet.action0.object.attributes.region[0].attributes.domain)
				assertNotNull(json.resultSet.action0.object.attributes.region[0].attributes.domain[0].attributes.subDomain)
				
				
			},
			this.method
		)
	}
	
	
	@Test
	public void compositeCreateParentWithMin0CountChild() {
		ensureLogin()

		request(
			[
			 	action: 'executeActionSet',
			 	actionSet: [
			 	            	action0: [
			 	            	          		action: 'create',
			 	            	          		className: 'EnergyProducer'

											],
								action1: [
				 	                      		action: 'update',
				 	                      		oid: '{EnergyProducer:?}',
				 	                      		attributes:  '{"name": "sai","description":"sai"}'

										]		
				 	            

						]	
			 	 
			],
			{req, json ->
				assertTrue(json.success)
				assertEquals('executeActionSet', json.action)
			 
				 
				
				assertTrue(json.resultSet.action0.success)
				assertEquals('create',json.resultSet.action0.action)
				assertEquals('EnergyProducer',json.resultSet.action0.className)
				assertNotNull(json.resultSet.action0.oid)
				
				energyProducerOid=json.resultSet.action0.oid;
				
				assertTrue(json.resultSet.action1.success)
				assertEquals(json.resultSet.action0.oid,json.resultSet.action1.oid)				 
				assertEquals('update',json.resultSet.action1.action)								 				
			},
			this.method
		)
	} 
	
	
	@Test
	public void compositeCreateParentWithMin0CountChildVerifyRead() {
		ensureLogin()

		request(
			[
			 	action: 'executeActionSet',
			 	actionSet: [
			 	            	 			
				 	            action0: [
				 	                      		action: 'read',
				 	                      		oid: energyProducerOid,
				 	                      		depth: -1
				 	                     ]
             

						]	
			 	 
			],
			{req, json ->
				assertTrue(json.success)
				assertEquals('executeActionSet', json.action)
			  
				assertTrue(json.resultSet.action0.success)			 
				assertEquals('read',json.resultSet.action0.action)
				assertNull(json.resultSet.action0.object.attributes.customer)	
				
			},
			this.method
		)
	} 
	
	//Association tests
	@Test
	public void compositeAssociationTestThroughCreateChildWithMaxMulInf() {
		ensureLogin()

		request(
			[
			 	action: 'executeActionSet',
			 	actionSet: [
			 	            	action0: [
			 	            	          		action: 'create',
			 	            	          		className: 'Area'

											],
								action1: [
				 	                      		action: 'createChild',
				 	                      		parentOid: '{Area:?}',
				 	                      		childRole: 'region'				 	                      		 
										]								 								 	            
						]	
			 	 
			],
			{req, json ->
				assertTrue(json.success)
				assertEquals('executeActionSet', json.action)
			 
				 
				
				assertTrue(json.resultSet.action0.success)
				assertEquals('create',json.resultSet.action0.action)
				assertEquals('Area',json.resultSet.action0.className)
				assertNotNull(json.resultSet.action0.oid)
				areaOid = json.resultSet.action0.oid;
				
				assertTrue(json.resultSet.action1.success)
				assertEquals(json.resultSet.action0.oid,json.resultSet.action1.parentOid)				 
				assertEquals('createChild',json.resultSet.action1.action)
				
				 
				 
				
			},
			this.method
		)
	}
	
	@Test
	public void compositeAssociationTestThroughCreateChildWithMaxMulInfVerifyRead() {
		ensureLogin()

		request(
			[
			 	action: 'executeActionSet',
			 	actionSet: [
			 	            	 
								 				
				 	            action0: [
				 	                      		action: 'read',
				 	                      		oid: areaOid,
				 	                      		depth: -1
				 	                     ]
             

						]	
			 	 
			],
			{req, json ->
				assertTrue(json.success)
				assertEquals('executeActionSet', json.action)
			 
				 
				
				assertTrue(json.resultSet.action0.success)				 				
				assertEquals('read',json.resultSet.action0.action)
				assertEquals('read',json.resultSet.action0.action)
				assertNotNull(json.resultSet.action0.object.attributes.region) 
				assertNotNull(json.resultSet.action0.object.attributes.region[0].attributes.domain)
				assertNotNull(json.resultSet.action0.object.attributes.region[0].attributes.domain[0].attributes.subDomain)
				assertNotNull(json.resultSet.action0.object.attributes.region[0].oid) 
				regionOid1 = json.resultSet.action0.object.attributes.region[0].oid;
				
			},
			this.method
		)
	}
	
	
	@Test
	public void compositeAssociationTestThroughCreateChildWithMaxMulInfAnotherChild() {
		ensureLogin()

		request(
			[
			 	action: 'executeActionSet',
			 	actionSet: [
			 	            	 
								action0: [
				 	                      		action: 'createChild',
				 	                      		parentOid: areaOid,
				 	                      		childRole: 'region'				 	                      		 
										]
             

						]	
			 	 
			],
			{req, json ->
				assertTrue(json.success)
				assertEquals('executeActionSet', json.action)
			 
				 
							 
				
				assertTrue(json.resultSet.action0.success)
				assertEquals(areaOid,json.resultSet.action0.parentOid)				 
				assertEquals('createChild',json.resultSet.action0.action)
				
				 
				
				 
				
			},
			this.method
		)
	}
	
	@Test
	public void compositeAssociationTestThroughCreateChildWithMaxMulInfAnotherChildReadVerify() {
		ensureLogin()

		request(
			[
			 	action: 'executeActionSet',
			 	actionSet: [
			 	            	 
								 	
				 	            action0: [
				 	                      		action: 'read',
				 	                      		oid: areaOid,
				 	                      		depth: -1
				 	                     ]
             

						]	
			 	 
			],
			{req, json ->
				assertTrue(json.success)
				assertEquals('executeActionSet', json.action)
			 
				 
				assertTrue(json.resultSet.action0.success)
				assertEquals(areaOid,json.resultSet.action0.oid)				 
				assertEquals('read',json.resultSet.action0.action)
				assertNotNull(json.resultSet.action0.object.attributes.region) 
				assertNotNull(json.resultSet.action0.object.attributes.region[0].attributes.domain)
				assertNotNull(json.resultSet.action0.object.attributes.region[0].attributes.domain[0].attributes.subDomain)
				assertNotNull(json.resultSet.action0.object.attributes.region[1].attributes.domain)
				assertNotNull(json.resultSet.action0.object.attributes.region[1].attributes.domain[0].attributes.subDomain)
				
				assertNotNull(json.resultSet.action0.object.attributes.region[1].oid)  
				regionOid2 = json.resultSet.action0.object.attributes.region[1].oid;
				
			},
			this.method
		)
	}
	
	
	
	@Test
	public void compositeAssociationTestThroughAssociateAction_fail() {
		ensureLogin()

		request(
			[
			 	action: 'executeActionSet',
			 	actionSet: [
			 					
			 	            	action0: [
				 	                      		action: 'create',
				 	                      		className: 'Region'				 	                      		                       		 
										],
								action1: [
				 	                      		action: 'associate',
				 	                      		sourceOid: areaOid,
				 	                      		targetOid: '{Region:?}'				 	                      		 
										] 

						]	
			 	 
			],
			{req, json ->
				assertFalse(json.success)
				assertEquals('executeActionSet', json.action)			 	
			},
			this.method
		)
	}
	
	@Test
	public void compositeAssociationTestThroughAssociateActionReverse_fail() {
		ensureLogin()

		request(
			[
			 	action: 'executeActionSet',
			 	actionSet: [
			 					
			 	            	action0: [
				 	                      		action: 'create',
				 	                      		className: 'Region'				 	                      		                       		 
										],
								action1: [
				 	                      		action: 'associate',
				 	                      		sourceOid: '{Region:?}',
				 	                      		targetOid: areaOid			 	                      		 
										]
             

						]	
			 	 
			],
			{req, json ->
				assertFalse(json.success)
				assertEquals('executeActionSet', json.action)			 	
			},
			this.method
		)
	}
	 
	
	
	@Test
	public void compositeAssociationTest_ShareChildToSharedParent_fail() {
		ensureLogin()

		request(
			[
			 	action: 'executeActionSet',
			 	actionSet: [
			 	            	action0: [
			 	            	          		action: 'create',
			 	            	          		className: 'Customer'

											],
								action1: [
			 	            	          		action: 'createChild',
			 	            	          		parentOid: '{Customer:?}',
			 	            	          		childRole: 'location'

											],			
								action2: [
			 	            	          		action: 'create',
			 	            	          		className: 'SolarPanel'

											],			
				 	            action3: [
				 	                      		action: 'associate',
				 	                      		sourceOid: '{SolarPanel:?}',
				 	                      		targetOid: '{Location:?}',
			 									role: 'location'				 	                      		 				 	                      		 

										]
								 	
             

						]	
			 	 
			],
			{req, json ->
				assertFalse(json.success)
				 
				
			},
			this.method
		)
	} 
	
	
	@Test
	public void compositeAssociationTest_ShareChildToSharedParentReverse_fail() {
		ensureLogin()

		request(
			[
			 	action: 'executeActionSet',
			 	actionSet: [
			 	            	action0: [
			 	            	          		action: 'create',
			 	            	          		className: 'Customer'

											],
								action1: [
			 	            	          		action: 'createChild',
			 	            	          		parentOid: '{Customer:?}',
			 	            	          		childRole: 'location'

											],			
								action2: [
			 	            	          		action: 'create',
			 	            	          		className: 'SolarPanel'

											],			
				 	            action3: [
				 	                      		action: 'associate',
				 	                      		sourceOid: '{Location:?}',
				 	                      		targetOid: '{SolarPanel:?}',
			 									role: 'solarPanel'				 	                      		 				 	                      		 
										]
								 	
             

						]	
			 	 
			],
			{req, json ->
				assertFalse(json.success)
				 
				
			},
			this.method
		)
	}
	
	 

	@Test
	public void compositeAssociationTest_relateChildToNormalAssociation() {
		ensureLogin()

		request(
			[
			 	action: 'executeActionSet',
			 	actionSet: [
			 	            	action0: [
			 	            	          		action: 'create',
			 	            	          		className: 'Domain'

											],
								action1: [
			 	            	          		action: 'createChild',
			 	            	          		parentOid: '{Domain:?}',
			 	            	          		childRole: 'subDomain'

											],			
								action2: [
			 	            	          		action: 'create',
			 	            	          		className: 'Forecast'

											],			
				 	            action3: [
				 	                      		action: 'associate',
				 	                      		sourceOid: '{SubDomain:?}',
				 	                      		targetOid: '{Forecast:?}',
			 									role: 'forecast'				 	                      		 				 	                      		 
										]
								 	
             

						]	
			 	 
			],
			{req, json ->
				assertTrue(json.success)
				 
				
			},
			this.method
		)
	} 

	//Disassociate Childs
	
	@Test
	public void compositeDisAssociationTestWithMinMul1() {
		ensureLogin()

		request(
			[
			 	action: 'executeActionSet',
			 	actionSet: [
			 								 	            	 
								action0: [
				 	                      		action: 'disassociate',
				 	                      		sourceOid: areaOid,
				 	                      		targetOid: regionOid1,
				 	                      		role: 'region'			 	                      		 
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
	public void compositeDisAssociationTestWithMinMul1ReadTheChild() {
		ensureLogin()

		request(
			[
			 	action: 'executeActionSet',
			 	actionSet: [
			 								 	            	 
								action0: [
				 	                      		action: 'read',
				 	                      		oid: regionOid1
				 	                      		                  		 
										]								 								 	             

						]	
			 	 
			],
			{req, json ->
				assertFalse(json.success)
				assertEquals('executeActionSet', json.action)			 	
			},
			this.method
		)
	}
	
	@Test
	public void compositeDisAssociationTestWithMinMul1_failure() {
		ensureLogin()

		request(
			[
			 	action: 'executeActionSet',
			 	actionSet: [
			 								 	            	 
								action0: [
				 	                      		action: 'disassociate',
				 	                      		sourceOid: areaOid,
				 	                      		targetOid: regionOid2,
				 	                      		role: 'region'			 	                      		 
										]								 								 	             

						]	
			 	 
			],
			{req, json ->
				assertFalse(json.success)
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
