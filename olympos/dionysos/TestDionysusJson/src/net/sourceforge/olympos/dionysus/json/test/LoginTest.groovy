package net.sourceforge.olympos.dionysus.json.test;
import org.junit.Test;

import static org.junit.Assert.*;
import groovyx.net.http.HTTPBuilder
import static groovyx.net.http.Method.GET
import static groovyx.net.http.ContentType.TEXT
public class LoginTest {
	def loginSuccessTester = {req, json ->
		if (Cfg.debug) {
			System.out << json
		}
		assertNotNull(json)
	
		assertTrue(json.success)
		assertNotNull(json.roles)
		assertNotNull(json.implementedPackages)
		assertTrue(json.implementedPackages.contains('base'))
	} 

	@Test
	public void successGet() {
		AjaxHelper.request(
			[
				user: Cfg.user,
				password: Cfg.password
			],
			loginSuccessTester,
			'get'
		)
	}

	@Test
	public void successPost() {
		AjaxHelper.request(
			[
				user: Cfg.user,
				password: Cfg.password
			],
			loginSuccessTester,
			'post'
		)
	}

	@Test
	public void successJson() {
		AjaxHelper.request(
			[
				user: Cfg.user,
				password: Cfg.password
			],
			loginSuccessTester,
			'json'
		)
	}

	def authenticationFailedTester = {req, json ->
		if (Cfg.debug) {
			System.out << json
		}
		assertNotNull(json)
	
		assertFalse(json.success)
		assertEquals('AUTHENTICATION_FAILED', json.errorCode)
	}

	@Test
	public void wrongPasswordGet() {
		AjaxHelper.request(
			[
				user: Cfg.user,
				password: Cfg.password + 'Wrong'
			],
			authenticationFailedTester,
			'get'
		)
	}

	@Test
	public void wrongPasswordPost() {
		AjaxHelper.request(
			[
				user: Cfg.user,
				password: Cfg.password + 'Wrong'
			],
			authenticationFailedTester,
			'post'
		)
	}

	@Test
	public void wrongPasswordJson() {
		AjaxHelper.request(
			[
				user: Cfg.user,
				password: Cfg.password + 'Wrong'
			],
			authenticationFailedTester,
			'json'
		)
	}

	@Test
	public void unknownUserGet() {
		AjaxHelper.request(
			[
				user: Cfg.user + 'Unknown',
				password: Cfg.password
			],
			authenticationFailedTester,
			'get'
		)
	}

	@Test
	public void unknownUserPost() {
		AjaxHelper.request(
			[
				user: Cfg.user + 'Unknown',
				password: Cfg.password
			],
			authenticationFailedTester,
			'post'
		)
	}

	@Test
	public void unknownUserJson() {
		AjaxHelper.request(
			[
				user: Cfg.user + 'Unknown',
				password: Cfg.password
			],
			authenticationFailedTester,
			'json'
		)
	}
}
