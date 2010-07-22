package org.sourceforge.olympos.xmlschema;

import org.eclipse.emf.ecore.EClass;
import org.eclipse.emf.ecore.EDataType;
import org.eclipse.emf.ecore.EFactory;
import org.eclipse.emf.ecore.EObject;
import org.eclipse.emf.ecore.EPackage;
import org.eclipse.emf.ecore.EStructuralFeature;

public class JaxbHelper {
	public static Object getTypesafeEnumMember(String str) {
		EPackage pack = EPackage.Registry.INSTANCE.getEPackage("http://java.sun.com/xml/ns/jaxb");
		System.out.println("Package: " + pack);
		EClass clazz = (EClass) pack.getEClassifier("TypesafeEnumMemberType");
		System.out.println("Class: " + clazz);
		EDataType type = (EDataType) pack.getEClassifier("JavaIdentifierType");
		System.out.println("Type: " + type);
		
		EStructuralFeature feature = clazz.getEStructuralFeature("name");
		System.out.println("Feature: " + feature);
		
		EFactory factory = pack.getEFactoryInstance();

		Object identType = factory.createFromString(type, str);
		System.out.println("identType: " + identType);
	
		EObject result = factory.create(clazz);
		System.out.println("Result: " + result);
		
		result.eSet(feature, identType);
		
		return result;
	}
}
