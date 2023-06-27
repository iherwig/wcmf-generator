/**
 * 
 */
package net.sourceforge.olympos.oaw.extend;

import static org.junit.Assert.assertEquals;

import org.junit.Test;
/**
 * @author nist
 *
 */
public class TestMultiplicity {
	@Test
	public void lowerAny() {
		int result = Multiplicity.getLower("*");
		
		assertEquals(0, result);
	}

	@Test
	public void lower1() {
		int result = Multiplicity.getLower("1");
		
		assertEquals(1, result);
	}

	@Test
	public void lower7() {
		int result = Multiplicity.getLower("7");
		
		assertEquals(7, result);
	}

	@Test
	public void lower0WithUpper() {
		int result = Multiplicity.getLower("0..2");
		
		assertEquals(0, result);
	}

	@Test
	public void lower0WithUpperAny() {
		int result = Multiplicity.getLower("0..*");
		
		assertEquals(0, result);
	}

	@Test
	public void lower1WithUpper() {
		int result = Multiplicity.getLower("1..3");
		
		assertEquals(1, result);
	}

	@Test
	public void lower1WithUpperAny() {
		int result = Multiplicity.getLower("1..*");
		
		assertEquals(1, result);
	}

	@Test
	public void lower4WithUpper4() {
		int result = Multiplicity.getLower("4..4");
		
		assertEquals(4, result);
	}

	@Test
	public void lower4WithUpperAny() {
		int result = Multiplicity.getLower("4..*");
		
		assertEquals(4, result);
	}

	
	@Test
	public void upperAny() {
		int result = Multiplicity.getUpper("*");
		
		assertEquals(-1, result);
	}

	@Test
	public void upper1() {
		int result = Multiplicity.getUpper("1..1");
		
		assertEquals(1, result);
	}
	
	@Test
	public void upper7() {
		int result = Multiplicity.getUpper("0..7");
		
		assertEquals(7, result);
	}
	
	@Test
	public void upperAnyWithLower0() {
		int result = Multiplicity.getUpper("0..*");
		
		assertEquals(-1, result);
	}
	
	@Test
	public void upperAnyWithLower1() {
		int result = Multiplicity.getUpper("1..*");
		
		assertEquals(-1, result);
	}

	@Test
	public void upper5WithLower5() {
		int result = Multiplicity.getUpper("5..5");
		
		assertEquals(5, result);
	}
}

