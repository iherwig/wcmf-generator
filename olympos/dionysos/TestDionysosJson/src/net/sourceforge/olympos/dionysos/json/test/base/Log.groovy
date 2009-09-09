package net.sourceforge.olympos.dionysos.json.test.base;

import static org.junit.Assert.*

import org.junit.Test;

import net.sourceforge.olympos.dionysos.json.test.Cfg;
import net.sourceforge.olympos.dionysos.json.test.DionysusTest;

public class Log extends DionysusTest {
	public Log(String method) {
		super(method)
	}
	
	@Test
	public void simpleDebug() {
		ensureLogin()

		request(
			[
			 	action: 'log',
			 	type: 'DEBUG',
			 	message:'DEBUG MESSAGE'
			 	 
			],
			{req, json ->
				assertTrue(json.success)
				assertEquals('log', json.action)
				assertEquals('DEBUG', json.type)
				assertEquals('DEBUG MESSAGE', json.message)
				
				 
			},
			this.method
		)
	}

 

	@Test
	public void simpleINFO() {
		ensureLogin()

		request(
			[
			 	action: 'log',
			 	type: 'INFO',
			 	message:'INFO MESSAGE'
			 	 
			],
			{req, json ->
				assertTrue(json.success)
				assertEquals('log', json.action)
				assertEquals('INFO', json.type)
				assertEquals('INFO MESSAGE', json.message)
				
				 
			},
			this.method
		)
	}

	@Test
	public void simpleWarning() {
		ensureLogin()

		request(
			[
			 	action: 'log',
			 	type: 'WARNING',
			 	message:'WARNING MESSAGE'
			 	 
			],
			{req, json ->
				assertTrue(json.success)
				assertEquals('log', json.action)
				assertEquals('WARNING', json.type)
				assertEquals('WARNING MESSAGE', json.message)
				
				 
			},
			this.method
		)
	}

	@Test
	public void simpleError() {
		ensureLogin()

		request(
			[
			 	action: 'log',
			 	type: 'ERROR',
			 	message:'ERROR MESSAGE'
			 	 
			],
			{req, json ->
				assertTrue(json.success)
				assertEquals('log', json.action)
				assertEquals('ERROR', json.type)
				assertEquals('ERROR MESSAGE', json.message)
				
				 
			},
			this.method
		)
	}

	@Test
	public void simpleFatal() {
		ensureLogin()

		request(
			[
			 	action: 'log',
			 	type: 'FATAL',
			 	message:'FATAL MESSAGE'
			 	 
			],
			{req, json ->
				assertTrue(json.success)
				assertEquals('log', json.action)
				assertEquals('FATAL', json.type)
				assertEquals('FATAL MESSAGE', json.message)
				
				 
			},
			this.method
		)
	}

	@Test
	public void wrongErrorType() {
		ensureLogin()

		request(
			[
			 	action: 'log',
			 	type: 'MyErrorCode',
			 	message:'MyErrorCode MESSAGE'
			 	 
			],
			{req, json ->
				assertFalse(json.success)
				assertEquals('log', json.action)
				assertEquals('MyErrorCode', json.type)
				assertEquals('MyErrorCode MESSAGE', json.message)
				assertEquals('PARAMETER_INVALID', json.errorCode)
				
				 
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
