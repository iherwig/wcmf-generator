package net.sourceforge.olympos.dionysos.json.solarpanel;

import static org.junit.Assert.*

import org.junit.Test;

import net.sourceforge.olympos.dionysos.json.test.Cfg;
import net.sourceforge.olympos.dionysos.json.test.DionysosTest;

public class NormalTests extends DionysosTest {
	static subDomainOid1 = null;
	static subDomainOid2 = null;
	static forecastOid1 = null;
	static forecastOid2 = null;
	public NormalTests(String method) {
		super(method)
	}
	
	 
	
	//Association tests
	
	@Test
	public void normalAssociationTest1() {
		ensureLogin()

		request(
			[
			 	action: 'executeActionSet',
			 	actionSet: [
			 	            	action0: [
			 	            	          		action: 'create',
			 	            	          		className: 'SubDomain'

											],
											
								action1: [
			 	            	          		action: 'create',
			 	            	          		className: 'Forecast'

											],			
								action2: [
				 	                      		action: 'associate',
				 	                      		sourceOid: '{SubDomain:?}',
				 	                      		targetOid: '{Forecast:?}',
				 	                      		role: 'forecast'				 	                      		 

										] 
             

						]	
			 	 
			],
			{req, json ->
				assertTrue(json.success)
				assertEquals('executeActionSet', json.action)
			 
				 
				
				assertTrue(json.resultSet.action0.success)
				assertEquals('create',json.resultSet.action0.action)
				assertEquals('SubDomain',json.resultSet.action0.className)
				assertNotNull(json.resultSet.action0.oid)
				subDomainOid1 = json.resultSet.action0.oid

				assertTrue(json.resultSet.action1.success)
				assertNotNull(json.resultSet.action1.oid)				 
				assertEquals('create',json.resultSet.action1.action)
				assertEquals('Forecast',json.resultSet.action1.className)
				forecastOid1 = json.resultSet.action1.oid
				assertTrue(json.resultSet.action2.success)
				
				
				
			},
			this.method
		)
	}


	@Test
	public void normalAssociationTest1VerifyRead() {
		ensureLogin()

		request(
			[
			 	action: 'executeActionSet',
			 	actionSet: [
			 	            	 
								action0: [
				 	                      		action: 'read',
				 	                      		oid: subDomainOid1,
				 	                      		depth: -1
				 	                     ]
             

						]	
			 	 
			],
			{req, json ->
				assertTrue(json.success)
				assertEquals('executeActionSet', json.action)
			  
				
				assertTrue(json.resultSet.action0.success)
				assertEquals(json.resultSet.action0.oid,subDomainOid1)				 
				assertEquals('read',json.resultSet.action0.action)
				assertNotNull(json.resultSet.action0.object.attributes.forecast)	
				
			},
			this.method
		)
	}
	
	
	@Test
	public void normalAssociationTest2() {
		ensureLogin()

		request(
			[
			 	action: 'executeActionSet',
			 	actionSet: [
			 	            	action0: [
			 	            	          		action: 'create',
			 	            	          		className: 'SubDomain'

											],
											
								action1: [
			 	            	          		action: 'create',
			 	            	          		className: 'Forecast'

											],			
								action2: [
				 	                      		action: 'associate',
				 	                      		sourceOid: '{SubDomain:?}',
				 	                      		targetOid: '{Forecast:?}',
				 	                      		role: 'forecast'				 	                      		 

										] 
             

						]	
			 	 
			],
			{req, json ->
				assertTrue(json.success)
				assertEquals('executeActionSet', json.action)
			 
				 
				
				assertTrue(json.resultSet.action0.success)
				assertEquals('create',json.resultSet.action0.action)
				assertEquals('SubDomain',json.resultSet.action0.className)
				assertNotNull(json.resultSet.action0.oid)
				subDomainOid2 = json.resultSet.action0.oid

				assertTrue(json.resultSet.action1.success)
				assertNotNull(json.resultSet.action1.oid)				 
				assertEquals('create',json.resultSet.action1.action)
				assertEquals('Forecast',json.resultSet.action1.className)
				forecastOid2 = json.resultSet.action1.oid
				assertTrue(json.resultSet.action2.success)
				
				 
				
			},
			this.method
		)
	}
	
	
	 
	
	@Test
	public void normalReAssociationTest() {
		ensureLogin()

		request(
			[
			 	action: 'executeActionSet',
			 	actionSet: [
			 	            	 		
								action0: [
				 	                      		action: 'associate',
				 	                      		sourceOid: subDomainOid1,
				 	                      		targetOid: forecastOid2,
				 	                      		role: 'forecast'				 	                      		 

										] 
             

						]	
			 	 
			],
			{req, json ->
				assertTrue(json.success)
				assertEquals('executeActionSet', json.action)
			 
				 
				
				assertTrue(json.resultSet.action0.success)
				assertEquals('associate',json.resultSet.action0.action)
				 
				
				
				
			},
			this.method
		)
	}


	@Test
	public void normalReAssociationTestVerifyRead() {
		ensureLogin()

		request(
			[
			 	action: 'executeActionSet',
			 	actionSet: [
			 	            	 
								action0: [
				 	                      		action: 'read',
				 	                      		oid: subDomainOid1,
				 	                      		depth: -1
				 	                     ]
             

						]	
			 	 
			],
			{req, json ->
				assertTrue(json.success)
				assertEquals('executeActionSet', json.action)
			  
				
				assertTrue(json.resultSet.action0.success)
				assertEquals(json.resultSet.action0.oid,subDomainOid1)				 
				assertEquals('read',json.resultSet.action0.action)
				assertNotNull(json.resultSet.action0.object.attributes.forecast)	
				assertEquals(forecastOid2,json.resultSet.action0.object.attributes.forecast.oid)	
			},
			this.method
		)
	}
	 
	@Test
	public void normalDisAssociationTest1() {
		ensureLogin()

		request(
			[
			 	action: 'executeActionSet',
			 	actionSet: [			 	            	 		
								action0: [
				 	                      		action: 'disassociate',
				 	                      		sourceOid: subDomainOid1,
				 	                      		targetOid: forecastOid2,
				 	                      		role: 'forecast'				 	                      		 

										] 

						]	
			 	 
			],
			{req, json ->
				assertTrue(json.success)
				assertEquals('executeActionSet', json.action)
			  
				assertTrue(json.resultSet.action0.success)
				assertEquals('disassociate',json.resultSet.action0.action)
			 

				 
				
			},
			this.method
		)
	}


	@Test
	public void normalDisAssociationTest1VerifyRead() {
		ensureLogin()

		request(
			[
			 	action: 'executeActionSet',
			 	actionSet: [			 	            	 		
								 
								action0: [
				 	                      		action: 'read',
				 	                      		oid: subDomainOid1,
				 	                      		depth: -1
				 	                     ]
             

						]	
			 	 
			],
			{req, json ->
				assertTrue(json.success)
				assertEquals('executeActionSet', json.action)
			  
				 				
				assertTrue(json.resultSet.action0.success)				 
				assertEquals('read',json.resultSet.action0.action)
				assertNull(json.resultSet.action0.object.attributes.forecast)	
				
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
