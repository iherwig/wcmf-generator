package net.sourceforge.olympos.oaw.extend;

import java.util.Iterator;
import java.util.NoSuchElementException;
import java.util.Stack;

public class SubClassIterator implements Iterator<org.eclipse.uml2.uml.Class> {

	private Stack<org.eclipse.uml2.uml.Class> remaining = new Stack<org.eclipse.uml2.uml.Class> ( );

	/**
	 * Constructor
	 */
	public SubClassIterator(org.eclipse.uml2.uml.Class rooNode) {
		remaining.push(rooNode);
	}
	
	@Override
	public boolean hasNext() {
		return !remaining.isEmpty();
	}

	@Override
	public org.eclipse.uml2.uml.Class next() {
		if (!hasNext()) {
			throw new NoSuchElementException("No more items.");
		}
		org.eclipse.uml2.uml.Class node = remaining.pop();
        for (Iterator<org.eclipse.uml2.uml.Class> cIter = UMLHelper.getSubClasses(node).iterator(); cIter.hasNext();) {
        	org.eclipse.uml2.uml.Class subClass = cIter.next();
			remaining.push(subClass);
		}
		return node;
	}

	@Override
	public void remove() {
		throw new RuntimeException("Method remove() not supported.");
	}
}
