package net.sourceforge.olympos.oaw.extend;

import java.util.Collection;

import org.eclipse.emf.common.util.BasicEList;
import org.eclipse.emf.common.util.EList;
import org.eclipse.emf.ecore.EObject;
import org.eclipse.uml2.uml.Element;

public class Stereotype {
	@SuppressWarnings("unchecked")
	public static Collection getListContents(Collection source) {
		Collection result = new BasicEList();

		for (Object obj : source) {
			boolean foundObj = false;

			if (obj instanceof EObject) {
				EObject eObj = ((EObject) obj);

				EList<EObject> references = eObj.eCrossReferences();

				for (EObject item : references) {
					// This prevents indirectly contained elements from the list
					// I have no clue why or how generic this test is
					// TODO: Check if this is generic
					if (item.eContainingFeature() != null) {
						foundObj = true;

						result.add(item);
					}
				}
			}

			if (!foundObj) {
				result.add(obj);
			}
		}

		return result;
	}

	public static Object getPropertyContents(Element elem,
			String stereotypeName, String taggedValueName) {
		Object result = null;

		org.eclipse.uml2.uml.Stereotype st = elem
				.getApplicableStereotype(stereotypeName);
		if (st != null) {
			if (elem.hasValue(st, taggedValueName)) {
				Object obj = elem.getValue(st, taggedValueName);

				result = obj;

				if (obj instanceof EObject) {
					EObject eObj = (EObject) obj;

					EList<EObject> references = eObj.eCrossReferences();

					for (EObject item : references) {
						// This prevents indirectly contained elements from the
						// list
						// I have no clue why or how generic this test is
						// TODO: Check if this is generic
						if (item.eContainingFeature() != null) {
							result = item;
							break;
						}
					}
				}
			}
		}

		return result;
	}
}
