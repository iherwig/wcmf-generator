package net.sourceforge.olympos.dionysos.json.test.base;

import static org.junit.Assert.*

import org.junit.Test;
import net.sourceforge.olympos.dionysos.json.test.Cfg;
import net.sourceforge.olympos.dionysos.json.test.DionysosTest;
public class LogoutTest extends DionysosTest {
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
