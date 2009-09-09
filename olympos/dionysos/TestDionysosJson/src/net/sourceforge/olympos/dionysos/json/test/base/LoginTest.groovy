package net.sourceforge.olympos.dionysos.json.test.base;

import static org.junit.Assert.*
import net.sourceforge.olympos.dionysos.json.test.Cfg;
import net.sourceforge.olympos.dionysos.json.test.DionysusTest;

import org.junit.Test;
public class LoginTest extends DionysusTest {
	public LoginTest(String method) {
		super(method)
	}
	
	def loginSuccessTester = {req, json ->
		assertTrue(json.success)
		assertEquals('login', json.action)
		assertEquals(Cfg.user, json.user)
		assertEquals(Cfg.password, json.password)
		assertNotNull(json.sid)
		assertNotNull(json.roles)
		assertNotNull(json.implementedPackages)
		assertTrue(json.implementedPackages.contains('base'))
	} 

	@Test
	public void success() {
		request(
			[
			 	action: 'login',
				user: Cfg.user,
				password: Cfg.password
			],
			loginSuccessTester,
			this.method
		)
	}

	def authenticationFailedTester = {req, json ->
		assertFalse(json.success)
		assertEquals('AUTHENTICATION_FAILED', json.errorCode)
	}

	@Test
	public void wrongPassword() {
		request(
			[
			 	action: 'login',
				user: Cfg.user,
				password: Cfg.password + 'Wrong'
			],
			authenticationFailedTester,
			this.method
		)
	}

	@Test
	public void unknownUser() {
		request(
			[
			 	action: 'login',
				user: Cfg.user + 'Unknown',
				password: Cfg.password
			],
			authenticationFailedTester,
			this.method
		)
	}
}
