package org.sourceforge.olympos.xmlschema;

import org.eclipse.emf.ecore.EDataType;
import org.eclipse.emf.ecore.EFactory;
import org.eclipse.emf.ecore.EPackage;

public class JaxbHelper {
	public static Object toJavaIdentifierType(String str) {
		EPackage pack = EPackage.Registry.INSTANCE.getEPackage("http://java.sun.com/xml/ns/jaxb");
		System.out.println("Package: " + pack);
		EDataType type = (EDataType) pack.getEClassifier("JavaIdentifierType");
		System.out.println("Type: " + type);
		
		EFactory factory = pack.getEFactoryInstance();
		Object result = factory.createFromString(type, str);

		System.out.println("result: " + result);
		
		return result;
	}
}
