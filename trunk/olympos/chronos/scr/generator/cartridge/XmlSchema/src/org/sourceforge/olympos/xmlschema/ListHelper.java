/**
 * 
 */
package org.sourceforge.olympos.xmlschema;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;

/**
 * @author nist
 *
 */
public class ListHelper {
	public static <ListType> List<ListType> unique(List<ListType> input) {
		HashSet<Integer> hashes = new HashSet<Integer>();
		
		ArrayList<ListType> result = new ArrayList<ListType>();
		
		for (ListType elem : input) {
			if (!hashes.contains(elem.hashCode())) {
				result.add(elem);
				hashes.add(elem.hashCode());
			}
		}
		
		return result;
	}
}
