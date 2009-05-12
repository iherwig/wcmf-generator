/*
 * Copyright (c) 2008 wemove digital solutions. All rights reserved.
 */
package net.sourceforge.olympos.oaw.extend;

import java.util.Arrays;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

import org.eclipse.emf.common.util.EList;
import org.eclipse.uml2.uml.Association;
import org.eclipse.uml2.uml.Profile;
import org.eclipse.uml2.uml.Property;
import org.openarchitectureware.xtend.XtendFacade;

/**
 * This class does wCMF relevant post processing (model-to-model transformation)
 * @author ingo herwig <ingo@wemove.com>
 */
public class PostProcessor {

	static private Map<Association, Property> clonedAssociationsToOriginalPropertyMap = new HashMap<Association, Property>();

	/**
	 * Post process element
	 * @param rootClazz
	 * @param packageName
	 * @return rootClazz
	 */
	public static org.eclipse.uml2.uml.Class postProcessNodes(org.eclipse.uml2.uml.Class rootClazz, String packageName) {
		Logger.info("");
		Logger.info("Post processing starting from " + rootClazz.getName());
		Logger.info("");
		SubClassIterator iter = new SubClassIterator(rootClazz);
		while(iter.hasNext()) {
			org.eclipse.uml2.uml.Class clazz = iter.next();
			if (clazz.getPackage().getQualifiedName().startsWith(packageName))
			{
				Logger.info("Post process " + clazz.getName());
				// create the associations first, because they may influence
				// the creation of values (fk columns)
				PostProcessor.completeAssociations(clazz);
				PostProcessor.completeAttributes(clazz);
			}
		}
		return rootClazz;
	}

	/**
	 * This method is used to add associations to base/sub classes of
	 * parents/children. All these associations have the property
	 * isGeneratorAdded set to true
	 * @param clazz
	 * @return clazz
	 */
	public static org.eclipse.uml2.uml.Class completeAssociations(org.eclipse.uml2.uml.Class clazz) {
		Logger.info("Add implicit associations for "	+ clazz.getName());
		Logger.debug("parents before: "+NodeHelper.parentsToString(clazz, true));
		Logger.debug("children before: "+NodeHelper.childrenToString(clazz, true));

		// add parent associations
		// 1. sub classes of parent classes (classes that inherit from
		// parent classes of this class might also be parent classes of this class,
		// e.g. an Employee might belong to a specialized Enterprise)
		//
		// NOTE: In this case a custom fk_name must not be copied to the new association, because it would
		// collide with the original column name (which is already named fk_name)
		Iterator<Property> parentIter = NodeHelper.getParents(clazz, true).iterator();
		while (parentIter.hasNext()) {
			
			Property parent = parentIter.next();
			SubClassIterator subClassIter = new SubClassIterator((org.eclipse.uml2.uml.Class) parent.getType());
			while (subClassIter.hasNext()) {
				
				org.eclipse.uml2.uml.Class subClass = subClassIter.next();
				// don't add twice
				if (!NodeHelper.isParent(clazz, subClass, true)) {
					Logger.info("-> (1) draw new parent association from " + clazz.getName() + " to "
							+ subClass.getQualifiedName());
					Property thisEnd = parent.getOtherEnd();
					// define unique rolenames for children and copy parent rolenames if defined (a rolename is always attached to the opposite property)
					String thisEndName = !Util.isEmpty(thisEnd.getName()) ? thisEnd.getName()+subClass.getName() : "";
					String parentName = !Util.isEmpty(parent.getName()) ? parent.getName() : "";
					Logger.debug("Rolenames: "+thisEndName+", "+parentName);
					// create association
					Association a = clazz.createAssociation(parent.isNavigable(), parent.getAggregation(), parentName, parent.getLower(), parent.getUpper(), 
							subClass, thisEnd.isNavigable(), thisEnd.getAggregation(), thisEndName, thisEnd.getLower(), thisEnd.getUpper());
                    // copy tagged values from the original association 
					UMLHelper.copyTaggedValues(a, Constants.FQName(Constants.STEREOTYPE_WCMF_ASSOCIATION), parent.getAssociation(), 
							new String[] { "base_Association", "fk_name" });
					Generator.setGeneratorAdded(a);
					clonedAssociationsToOriginalPropertyMap.put(a, parent);
					NodeHelper.clearParentCache(clazz);
				}
			}
		}

		// 2. parent classes of super classes (classes that are parent
		// classes of a super class of this class might also be parent classes of
		// this class, e.g. a specialized Employee might also belong to an Enterprise)
		Iterator<org.eclipse.uml2.uml.Class> superIter = UMLHelper.getSuperClasses(clazz).iterator();
		while (superIter.hasNext()) {
			
			org.eclipse.uml2.uml.Class superClass = superIter.next();
			Iterator<Property> superParentIter = NodeHelper.getParents(superClass, true).iterator();
			while (superParentIter.hasNext()) {
				
				Property superParent = superParentIter.next();
				// don't add twice
				if (!NodeHelper.isParent(clazz, (org.eclipse.uml2.uml.Class)superParent.getType(), true)) {
					Logger.info("-> (2) draw new parent association from " + clazz.getName() + " to "
							+ superParent.getType().getQualifiedName());
					Property thisEnd = superParent.getOtherEnd();
					// define unique rolenames for children and copy parent rolenames if defined (a rolename is always attached to the opposite property)
					String thisEndName = !Util.isEmpty(thisEnd.getName()) ? thisEnd.getName()+clazz.getName() : "";
					String parentName = !Util.isEmpty(superParent.getName()) ? superParent.getName() : "";
					Logger.debug("Rolenames: "+thisEndName+", "+parentName);
					// create association
                    Association a = clazz.createAssociation(superParent.isNavigable(), superParent.getAggregation(), parentName, superParent.getLower(), superParent.getUpper(), 
                    		superParent.getType(), thisEnd.isNavigable(), thisEnd.getAggregation(), thisEndName, thisEnd.getLower(), thisEnd.getUpper());
                    // copy tagged values from the original association 
					UMLHelper.copyTaggedValues(a, Constants.FQName(Constants.STEREOTYPE_WCMF_ASSOCIATION), superParent.getAssociation(), 
							new String[] { "base_Association" });
					Generator.setGeneratorAdded(a);
					clonedAssociationsToOriginalPropertyMap.put(a, superParent);
					NodeHelper.clearParentCache(clazz);
				}
			}
		}

		// add child associations

		// 3. sub classes of child classes (classes that inherit from
		// child classes of this class might also be child classes of this class,
		// e.g. an Enterprise might have a specialized Employee)
		Iterator<Property> childIter = NodeHelper.getChildren(clazz, true).iterator();
		while (childIter.hasNext()) {
			
			Property child = childIter.next();
			SubClassIterator subClassIter = new SubClassIterator((org.eclipse.uml2.uml.Class)child.getType());
			while (subClassIter.hasNext()) {
				
				org.eclipse.uml2.uml.Class subClass = subClassIter.next();
				// don't add twice
				if (!NodeHelper.isChild(clazz, subClass, true)) {
					Logger.info("-> (3) draw new child association from " + clazz.getName() + " to "
							+ subClass.getQualifiedName());
					Property thisEnd = child.getOtherEnd();
					// define unique rolenames for children and copy parent rolenames if defined (a rolename is always attached to the opposite property)
					String thisEndName = !Util.isEmpty(thisEnd.getName()) ? thisEnd.getName() : "";
					String childName = !Util.isEmpty(child.getName()) ? child.getName()+subClass.getName() : "";
					Logger.debug("Rolenames: "+thisEndName+", "+childName);
					// create association
					Association a = clazz.createAssociation(child.isNavigable(), child.getAggregation(), childName, child.getLower(), child.getUpper(), 
							subClass, thisEnd.isNavigable(), thisEnd.getAggregation(), thisEndName, thisEnd.getLower(), thisEnd.getUpper());
                    // copy tagged values from the original association 
					UMLHelper.copyTaggedValues(a, Constants.FQName(Constants.STEREOTYPE_WCMF_ASSOCIATION), child.getAssociation(), 
							new String[] { "base_Association" });
					Generator.setGeneratorAdded(a);
					clonedAssociationsToOriginalPropertyMap.put(a, child);
					NodeHelper.clearChildCache(clazz);
				}
			}
		}

		// 4. child classes of super classes (classes that are child
		// classes of a super class of this class might also be child classes of
		// this class, e.g. a Enterprise might have a specialized Employee)
		//
		// NOTE: In this case a custom fk_name must not be copied to the new association, because it would
		// collide with the original column name (which is already named fk_name)
		Iterator<org.eclipse.uml2.uml.Class> superIter2 = UMLHelper.getSuperClasses(clazz).iterator();
		while (superIter2.hasNext()) {
			
			org.eclipse.uml2.uml.Class superClass = superIter2.next();
			Iterator<Property> superChildIter = NodeHelper.getChildren(superClass, true).iterator();
			while (superChildIter.hasNext()) {
				
				Property superChild = superChildIter.next();
				// don't add twice
				if (!NodeHelper.isChild(clazz, (org.eclipse.uml2.uml.Class)superChild.getType(), true)) {
					Logger.info("-> (4) draw new child association from " + clazz.getName() + " to "
							+ superChild.getType().getQualifiedName());
					Property thisEnd = superChild.getOtherEnd();
					// define unique rolenames for children and copy parent rolenames if defined (a rolename is always attached to the opposite property)
					String thisEndName = !Util.isEmpty(thisEnd.getName()) ? thisEnd.getName() : "";
					String childName = !Util.isEmpty(superChild.getName()) ? superChild.getName()+superChild.getType().getName() : "";
					Logger.debug("Rolenames: "+thisEndName+", "+childName);
					// create association					
                    Association a = clazz.createAssociation(superChild.isNavigable(), superChild.getAggregation(), childName, superChild.getLower(), superChild.getUpper(), 
                    		superChild.getType(), thisEnd.isNavigable(), thisEnd.getAggregation(), thisEndName, thisEnd.getLower(), thisEnd.getUpper());
                    // copy tagged values from the original association 
					UMLHelper.copyTaggedValues(a, Constants.FQName(Constants.STEREOTYPE_WCMF_ASSOCIATION), superChild.getAssociation(), 
							new String[] { "base_Association", "fk_name" });
					Generator.setGeneratorAdded(a);
					clonedAssociationsToOriginalPropertyMap.put(a, superChild);
					NodeHelper.clearChildCache(clazz);
				}
			}
		}
		Logger.debug("parents after: "+NodeHelper.parentsToString(clazz, true));
		Logger.debug("children after: "+NodeHelper.childrenToString(clazz, true));
		return clazz;
	}

	/**
	 * This method is used to add WCMFValues from base classes to the class. All
	 * these values have the property isGeneratorAdded set to true
	 * @param clazz
	 * @return clazz
	 */
	public static org.eclipse.uml2.uml.Class completeAttributes(org.eclipse.uml2.uml.Class clazz) {
		Logger.info("Add implicit values for "	+ clazz.getName());

		// use extend facade for wcmf helper methods
		Profile wcmfProfile = clazz.getModel().getAppliedProfile(Constants.PROFILE_WCMF);
		XtendFacade wcmfExt = Generator.createXtendFacade("cartridge::Wcmf::extensions::wcmf", new Profile[] { wcmfProfile });

		// 1. values from base classes (the persistence mappers
		// use the "Concrete Table Inheritance" pattern)
		Iterator<Property> attribIter = clazz.getAllAttributes().iterator();
		while (attribIter.hasNext()) {
			
			Property attrib = attribIter.next();
			if (UMLHelper.hasStereotype(attrib, Constants.FQName(Constants.STEREOTYPE_WCMF_VALUE)) && !Generator.isGeneratorAdded(attrib)
					&& attrib.getOwner() != clazz) {
				if (!clazz.getOwnedMembers().contains(attrib)) {
					Logger.info("-> (1) Add inherited value " + attrib.getName());
					Property p = clazz.createOwnedAttribute(attrib.getName(), attrib.getType());
					UMLHelper.copyTaggedValues(p, Constants.FQName(Constants.STEREOTYPE_WCMF_VALUE), attrib, new String[] { "base_Property" });
					UMLHelper.copyComments(p, attrib);
					Generator.setGeneratorAdded(p);
					Generator.setGeneratorInherited(p);
				}
				else {
					Logger.warn("-> (1) Value inheritance: " + clazz.getName() + " has a value " + attrib.getName() + " which shadows the inherited value.");
				}
			}
		}

		// 2. values for not explicitly defined fk columns referencing parent
		// classes preconditions:
		// - associations to sub classes of parent classes (see completeAssociations step 1.) are already created
		// - associations to parent classes of super classes (see completeAssociations step 2.) are already created
		Iterator<Property> parentIter = NodeHelper.getParents(clazz, true).iterator();
		while (parentIter.hasNext()) {
			
			Property parent = parentIter.next();
			String fkName = wcmfExt.call("getFKName", new Object[] { parent }).toString();
			
			if (!UMLHelper.hasAttribute(clazz, fkName)) {
				Logger.info("-> (2) Add foreign key value " + fkName + " for " + parent.getType().getName());
				// create the foreign key
				Property p = NodeHelper.createDefaultFKAttribute(fkName, clazz, (org.eclipse.uml2.uml.Class)parent.getType());
				Generator.setGeneratorAdded(p);

				// If this fk column origins from a generated association and the origins class' fk column
				// is part of a compound primary key, we have to add the subclass' fk column too
				// e.g. if the generator adds an association between NMUserRole and a subclass of Role (MyRole) and 
				// fk_role_id is part of a compound pk, then fk_myrole_id must be part of the compound pk too.
				Association parentAssociation = parent.getAssociation();
				if (Generator.isGeneratorAdded(parentAssociation)) {
					Property originalAP = clonedAssociationsToOriginalPropertyMap.get(parentAssociation);
					String originalFkName = wcmfExt.call("getFKName", new Object[] { originalAP }).toString();
					String pkNameStr = wcmfExt.call("getPKName", new Object[] { clazz }).toString();
					if (Arrays.asList(pkNameStr.split("\\|")).contains(originalFkName)) {
						wcmfExt.call("setPKName", new Object[] { clazz, pkNameStr+"|"+fkName });
					}
				}
			}
			else {
				// get the existing property
				Property p = UMLHelper.getAttribute(clazz, fkName);

				// check if the existing property points to the another class
				org.eclipse.uml2.uml.Class fkClass = Generator.getFKClass(p);
				if (fkClass != null && fkClass != parent.getType())
					Logger.error("-> (2) Foreign keys: " + clazz.getName() + " already has a value " + fkName + " that references " + 
							fkClass.getName() + " instead of " + parent.getType().getName());
				
				// mark the existing attribute as fk value
				Generator.setFKValue(p, (org.eclipse.uml2.uml.Class)parent.getType());
			}
		}
		
		// 3. values for not explicitly defined pk columns
		String pkNameStr = wcmfExt.call("getPKName", new Object[] { clazz }).toString();
		String[] pkNames = pkNameStr.split("\\|");
		for (int i = 0; i < pkNames.length; i++) {
			String pkName = pkNames[i];

			if (!UMLHelper.hasAttribute(clazz, pkName)) {
				Logger.info("-> (3) Add primary key value " + pkName);
				Property p = NodeHelper.createDefaultPKAttribute(pkName, clazz);
				Generator.setGeneratorAdded(p);
			}
			else {
				// get the existing property
				Property p = UMLHelper.getAttribute(clazz, pkName);
				// mark the existing attribute as pk value
				Generator.setPKValue(p);
			}
		}
		// Check if we would need compound foreign keys at some point and
		// give a unsupported warning if so
		EList<Property> children = NodeHelper.getChildren(clazz, true);
		if (pkNames.length > 1 && children.size() > 0) {
			Iterator<Property> childIter = children.iterator();
			while (childIter.hasNext()) {
				Property parent = childIter.next();
				Logger.warn(parent.getType().getName()+": A compound foreign key would be required to reference "
						+ clazz.getName() + " but is not supported.");
			}
		}
		return clazz;
	}
}
