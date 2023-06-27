/*
 * Copyright (c) 2008 wemove digital solutions. All rights reserved.
 */
package net.sourceforge.olympos.oaw.extend;

import java.util.Arrays;
import java.util.Iterator;
import java.util.List;

import org.eclipse.emf.common.util.EList;
import org.eclipse.emf.common.util.UniqueEList;
import org.eclipse.uml2.uml.AggregationKind;
import org.eclipse.uml2.uml.Association;
import org.eclipse.uml2.uml.Classifier;
import org.eclipse.uml2.uml.Comment;
import org.eclipse.uml2.uml.Element;
import org.eclipse.uml2.uml.Model;
import org.eclipse.uml2.uml.Profile;
import org.eclipse.uml2.uml.Property;
import org.eclipse.uml2.uml.Stereotype;
import org.eclipse.uml2.uml.Type;

/**
 * This class provides uml helper functions to be used in XTend files
 * @author ingo herwig <ingo@wemove.com>
 */
public class UMLHelper {
	/**
	 * Get a rolename for the property (defaults to type name, if no explicit name is given)
	 * @param property
	 * @return
	 */
	public static String getNonEmptyRoleName(Property property) {
		if (!Util.isEmpty(property.getName()))
			return property.getName();
		else
			return property.getType().getName();
	}

	/**
	 * Get a stereotype
	 * @param model The model, ro which the given profile is applied
	 * @param profileName The name of the profile, that defines the stereotype
	 * @param stereotypeName The name of the stereotype
	 * @return
	 */
	public static Stereotype getStereotype(Model model, String profileName, String stereotypeName) {
		Profile p = model.getAppliedProfile(profileName);
		if (p != null) {
			Stereotype st = p.getOwnedStereotype(stereotypeName);
			if (st != null)
				return st;
		}
		else
			Logger.warn("Profile: "+profileName+" is not applied to "+model.getName());
		return null;
	}

	/**
	 * Check if an element has the given stereotype. e.g. UMLUtil.hasStereotype(clazz, "Chronos::ChiNode")
	 * @param e The element to check the stereotype for.
	 * @param stereotypeName The qualified stereotype name. <code>[ProfileName]::[StereotypeName]
	 * @return boolean
	 */
	public static boolean hasStereotype(Element e, String stereotypeName) {
		Stereotype st = e.getAppliedStereotype(stereotypeName);
		if (st != null)
			return true;
		return false;
	}

	/**
	 * Check if an element has the given stereotype.
	 * @param e The element to check the stereotype for.
	 * @param stereotype The stereotype.
	 * @return boolean
	 */
	public static boolean hasStereotype(Element e, Stereotype stereotype) {
		if (stereotype == null)
			return false;
		return hasStereotype(e, stereotype.getQualifiedName());
	}

	/**
	 * Get the value of a tagged value. e.g. UMLUtil.getTaggedValue(clazz, "Chronos::ChiNode", "pk_name")
	 * @param e The element to get the tagged value from.
	 * @param stereotypeName The qualified stereotype name. <code>[ProfileName]::[StereotypeName]
	 * @param name The name of the tagged value.
	 * @return The value
	 */
	public static Object getTaggedValue(Element e, String stereotypeName, String name) {
		Stereotype st = e.getApplicableStereotype(stereotypeName);
		if (st != null) {
			if (e.hasValue(st, name))
				return e.getValue(st, name);
		}
		return "";
	}

	/**
	 * Get the value of a tagged value.
	 * @param e The element to get the tagged value from.
	 * @param stereotype The stereotype.
	 * @param name The name of the tagged value.
	 * @return The value
	 */
	public static Object getTaggedValue(Element e, Stereotype stereotype, String name) {
		if (stereotype == null)
			return null;
		return getTaggedValue(e, stereotype.getQualifiedName(), name);
	}

	/**
	 * Set the value of a tagged value. e.g. UMLUtil.setTaggedValue(clazz, "Chronos::ChiNode", "pk_name", "id")
	 * @param e The element to set the tagged value on.
	 * @param stereotypeName The qualified stereotype name. <code>[ProfileName]::[StereotypeName]
	 * @param name The name of the tagged value.
	 * @param value The value to set.
	 */
	public static void setTaggedValue(Element e, String stereotypeName, String name, Object value) {
		Stereotype st = e.getApplicableStereotype(stereotypeName);
		if (st != null) {
			if (!e.isStereotypeApplied(st))
				e.applyStereotype(st);
			try {
				e.setValue(st, name, value);
			} catch (IllegalArgumentException ex) { Logger.error(e); }
		}
		else
			Logger.warn("Stereotype: "+stereotypeName+" is not applicable to "+e.toString());
	}

	/**
	 * Set the value of a tagged value.
	 * @param e The element to set the tagged value on.
	 * @param stereotype The stereotype.
	 * @param name The name of the tagged value.
	 * @param value The value to set.
	 */
	public static void setTaggedValue(Element e, Stereotype stereotype, String name, Object value) {
		if (stereotype != null)
			setTaggedValue(e, stereotype.getQualifiedName(), name, value);
	}

	/**
	 * Copy all tagged values that belong to a given stereotype from one element to another.
	 * @note Tagged values that start with 'base_' are not copied
	 * @param target The element to which to copy the tagged values.
	 * @param stereotypeName The qualified stereotype name. <code>[ProfileName]::[StereotypeName]
	 * @param source The element from which to retrieve the tagged values.
	 * @param excludes An array of value names to exclude.
	 * @return The target element
	 */
	public static Element copyTaggedValues(Element target, String stereotypeName, Element source, String[] excludes) {
		Stereotype st = source.getApplicableStereotype(stereotypeName);
		if (st != null) {
			if (hasStereotype(source, stereotypeName)) {
				if (!target.isStereotypeApplied(st) && target.getApplicableStereotypes().contains(st)) {
					Logger.debug("Apply stereotype "+stereotypeName+" to "+target.getClass());
					target.applyStereotype(st);
					if (!UMLHelper.hasStereotype(target, st))
						Logger.debug("-> Failed");
				}
				if (excludes == null)
					excludes = new String[]{};
				List<String> excludeList = Arrays.asList(excludes);
			    for (Property p : st.getAttributes()) {
					String name = p.getName();
			    	if (source.hasValue(st, name)) {
						try {
							Object value = source.getValue(st, name);
							if (!excludeList.contains(name)) {
								Logger.debug("Copy tagged value "+name+"="+value+" to "+target.getClass());
								target.setValue(st, name, value);
								if (!getTaggedValue(target, stereotypeName, name).equals(value))
									Logger.debug("-> Failed");
							}
						} catch (IllegalArgumentException e) { Logger.error(e); }
			    	}
			    }
			}
		}
		else
			Logger.warn("Stereotype: "+stereotypeName+" is not applicable to "+target.toString());
		return target;
	}

	/**
	 * Copy all tagged values that belong to a given stereotype from one element to another.
	 * @param target The element to which to copy the tagged values.
	 * @param stereotype The stereotype.
	 * @param source The element from which to retrieve the tagged values.
	 * @param excludes An array of value names to exclude.
	 * @return The target element
	 */
	public static Element copyTaggedValues(Element target, Stereotype stereotype, Element source, String[] excludes) {
		if (stereotype == null)
			return null;
		return copyTaggedValues(target, stereotype.getQualifiedName(), source, excludes);
	}

	/**
	 * Get a string representation if an Element's stereotypes and tags.
	 * @param e The element
	 * @return String
	 */
	public static String appliedStereotypesToString(Element e) {
		StringBuffer str = new StringBuffer();

		Iterator<Stereotype> stIter = e.getAppliedStereotypes().iterator();
		while (stIter.hasNext()) {
			Stereotype st = stIter.next();
			str.append(st.getName()).append("[");
		    for (Property p : st.getAttributes()) {
				String name = p.getName();
		    	if (e.hasValue(st, name)) {
		    		str.append(name).append("=\"").append(e.getValue(st, name)).append("\" ");
		    	}
		    }
			str.append(st).append("]");
		}
		return str.toString();
	}

	/**
	 * Copy the comments from one class to another
	 * @param targt
	 * @param source
	 */
	public static void copyComments(Element target, Element source) {
		for (Comment originalComment : source.getOwnedComments()) {
			Comment copiedComment = target.createOwnedComment();
			copiedComment.setBody(originalComment.getBody());
		}
	}

	/**
	 * Add en attribute at the first position of the attribute list of the given class
	 * @param clazz
	 * @param property
	 * @return Class
	 */
	public static org.eclipse.uml2.uml.Class addAttributeInFront(org.eclipse.uml2.uml.Class clazz, Property property) {
		if (clazz != null)
			clazz.getOwnedAttributes().add(0, property);
		return clazz;
	}

	/**
	 * Check if an element has the given attribute.
	 * @param clazz The class to check the attribute for.
	 * @param attributeName The attribute name.
	 * @return Boolean
	 */
	public static boolean hasAttribute(org.eclipse.uml2.uml.Class clazz, String attributeName) {
		return getAttribute(clazz, attributeName) != null;
	}

	/**
	 * Get an attribute.
	 * @param clazz The class to get the attribute from.
	 * @param attributeName The attribute name.
	 * @return A list of Attribute instances
	 */
	public static Property getAttribute(org.eclipse.uml2.uml.Class clazz, String attributeName) {
		if (clazz != null) {
			Iterator<Property> attribIter = clazz.getAttributes().iterator();
			while (attribIter.hasNext()) {
				Property attrib = attribIter.next();
				if (attributeName.equals(attrib.getName()))
					return attrib;
			}
		}
        return null;
	}

	/**
	 * Get all super classes of a class.
	 * @param clazz The class.
	 * @return A list of Class instances
	 */
	public static EList<org.eclipse.uml2.uml.Class> getSuperClasses(org.eclipse.uml2.uml.Class clazz) {
		EList<org.eclipse.uml2.uml.Class> superClasses = new UniqueEList<org.eclipse.uml2.uml.Class>();
		if (clazz != null) {
	        for (Iterator<Classifier> cIter = clazz.getGenerals().iterator(); cIter.hasNext();) {
	        	Classifier c = (Classifier)cIter.next();
	            if (c instanceof org.eclipse.uml2.uml.Class) {
	            	org.eclipse.uml2.uml.Class curClass = (org.eclipse.uml2.uml.Class)c;
	            	superClasses.add(curClass);
	            }
	        }
        }
        return superClasses;
	}

	/**
	 * Get all sub classes of a class.
	 * @param clazz The class.
	 * @return A list of Class instances
	 */
	public static EList<org.eclipse.uml2.uml.Class> getSubClasses(org.eclipse.uml2.uml.Class clazz) {
		EList<org.eclipse.uml2.uml.Class> subClasses = new UniqueEList<org.eclipse.uml2.uml.Class>();
		if (clazz != null) {
	        for (Iterator<Element> eIter = clazz.getModel().allOwnedElements().iterator(); eIter.hasNext();) {
	            Element e = (Element)eIter.next();
	            if (e instanceof org.eclipse.uml2.uml.Class) {
	            	org.eclipse.uml2.uml.Class curClass = (org.eclipse.uml2.uml.Class)e;
	            	if (curClass.getGenerals().contains(clazz))
	                    subClasses.add(curClass);
	            }
	        }
		}
        return subClasses;
	}

	/**
	 * Check if a association has the same source and target
	 * @param association
	 * @return boolean
	 */
	public static boolean isSelfReferencing(Association association) {
		EList<Property> ends = association.getMemberEnds();
		return ends.get(0).getType().equals(ends.get(1).getType());
	}

	/**
	 * Check if an association already exists at a class. Two associations are supposed
	 * to be the same, if the aggregationKinds, role names and end types are the same.
	 * @param association
	 * @return boolean
	 */
	public static boolean isAssociationDuplicated(org.eclipse.uml2.uml.Class clazz, Association association) {
		int count = 0;
		EList<Property> associationEnds = association.getMemberEnds();
		for (Iterator<Association> aIter = clazz.getAssociations().iterator(); aIter.hasNext();) {
			Association a = aIter.next();
			EList<Property> aEnds = a.getMemberEnds();
			// check properties in both directions
			if ((isSameProperty(aEnds.get(0), associationEnds.get(0)) && 
					isSameProperty(aEnds.get(1), associationEnds.get(1))) 
				|| 
				(isSameProperty(aEnds.get(0), associationEnds.get(1)) && 
					isSameProperty(aEnds.get(1), associationEnds.get(0)))) {
				count++;
			}
		}
		return count == 2;
	}
	
	/**
	 * Check if two association ends have the same aggregationKind, role name and type.
	 * @param a
	 * @param b
	 * @return boolean
	 */
	public static boolean isSameProperty(Property a, Property b) {
		if (a.getAggregation().equals(b.getAggregation()) &&
			a.getName().equals(b.getName()) &&
			a.getType().equals(b.getType())) {
			return true;
		}
		return false;
	}
	
	public static String propertyToString(Property p) {
		return "[kind:"+p.getAggregation().getName()+", name:"+p.getName()+", type:"+p.getType().getQualifiedName()+"]";
	}
	
	public static String associationToString(Association a) {
		EList<Property> aEnds = a.getMemberEnds();
		return "[association:"+propertyToString(aEnds.get(0))+propertyToString(aEnds.get(1))+"]";
	}
}
