package net.sourceforge.olympos.dionysus.json.test.base;

import static org.junit.Assert.*

import org.junit.Test;
import net.sourceforge.olympos.dionysus.json.test.DionysusTest;
import net.sourceforge.olympos.dionysus.json.test.Cfg;
public class LogoutTest extends DionysusTest {
	public LogoutTest(String method) {
		super(method)
	}
	
	@Test
	public void success() {
		ensureLogin()

		request(
			[
			 	action: 'logout'
			],
			{req, json ->
				assertTrue(json.success)
				assertNull(json.sid)
			},
			this.method
		)
	}
}
