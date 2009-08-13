package net.sourceforge.olympos.dionysus.json.test;

import java.util.Collection;

import org.junit.runner.RunWith;
import org.junit.runners.Parameterized;
import org.junit.runners.Parameterized.Parameters;

import static org.junit.Assert.*

import groovyx.net.http.HTTPBuilder
import static groovyx.net.http.Method.GET
import static groovyx.net.http.Method.POST
import static groovyx.net.http.ContentType.TEXT
import static groovyx.net.http.ContentType.URLENC
import static groovyx.net.http.ContentType.JSON
@RunWith(Parameterized.class)
public class DionysusTest {
	protected String method;

	private static String sid = null;
	
	public DionysusTest(method) {
		this.method = method
	}

	@SuppressWarnings("unchecked")
	@Parameters
	public static Collection supportedMethods() {
        return ['get', 'post', 'json'].collect{ [it] as String[] }
	}

	protected void ensureLogin() {
		if (!sid) {
			request(
				[
					action: 'login',
					user: Cfg.user,
					password: Cfg.password
				],
				{ req, json ->
					sid = json.sid
				},
				'get'
			)
		}
	}

	protected void clearSid() {
		sid = null
	}

	protected void request(params, handler, method = 'json') {
		def internalMethod
		def internalContentType

		if (sid && !params.sid) {
			params.sid = sid
		}

		method = method.toLowerCase()
		
		switch (method) {
			case 'get':
				internalMethod = GET
				internalContentType = TEXT
				break
			
			case 'post':
				internalMethod = POST
				internalContentType = URLENC
				break
			
			case 'json':
			default:
				internalMethod = POST
				internalContentType = JSON
		}

		new HTTPBuilder(Cfg.baseUrl).request(internalMethod, JSON) { req ->
			requestContentType = internalContentType
		
			if (method == 'get') {
				uri.query = params
			} else {
				body = params
			}
			
			response.success = { resp, json ->
				if (Cfg.debug) {
					System.out << json
				}
				assertNotNull(json)

				handler(resp, json)
			}
			
			response.failure = { resp, stream ->
				fail("Server error with status code " + resp.statusLine.statusCode)
			}
		}
	}
}
