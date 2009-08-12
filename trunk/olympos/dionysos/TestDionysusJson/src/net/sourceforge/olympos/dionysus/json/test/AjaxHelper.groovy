package net.sourceforge.olympos.dionysus.json.test;

import static org.junit.Assert.*

import groovyx.net.http.HTTPBuilder
import static groovyx.net.http.Method.GET
import static groovyx.net.http.Method.POST
import static groovyx.net.http.ContentType.TEXT
import static groovyx.net.http.ContentType.URLENC
import static groovyx.net.http.ContentType.JSON
public class AjaxHelper {
	static void request(params, handler, method = 'json') {
		def internalMethod
		def internalContentType

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
