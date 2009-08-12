package net.sourceforge.olympos.dionysus.json.test;

import java.util.Collection;

import org.junit.runner.RunWith;
import org.junit.runners.Parameterized;
import org.junit.runners.Parameterized.Parameters;
@RunWith(Parameterized.class)
public class DionysusTest {
	protected String method;

	public DionysusTest(method) {
		this.method = method
	}

	@SuppressWarnings("unchecked")
	@Parameters
	public static Collection supportedMethods() {
        return ['get', 'post', 'json'].collect{ [it] as String[] }
	}
}
