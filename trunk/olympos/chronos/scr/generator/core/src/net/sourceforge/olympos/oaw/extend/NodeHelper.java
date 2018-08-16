/*
 * Copyright (c) 2008 wemove digital solutions. All rights reserved.
 */
package net.sourceforge.olympos.oaw.extend;

import java.util.Arrays;
import java.util.Comparator;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

import org.eclipse.emf.common.util.EList;
import org.eclipse.emf.common.util.UniqueEList;
import org.eclipse.uml2.uml.AggregationKind;
import org.eclipse.uml2.uml.Association;
import org.eclipse.uml2.uml.Property;
import org.eclipse.uml2.uml.Stereotype;
import org.eclipse.uml2.uml.UMLFactory;

/**
 * This class provides node specific helper functions to be used in XTend files
 * 
 * @author ingo herwig <ingo@wemove.com>
 */
public class NodeHelper {

	protected static Map<org.eclipse.uml2.uml.Class, EList<Property>> parentRegistry = new HashMap<org.eclipse.uml2.uml.Class, EList<Property>>();
	protected static Map<org.eclipse.uml2.uml.Class, EList<Property>> childRegistry = new HashMap<org.eclipse.uml2.uml.Class, EList<Property>>();

	protected static boolean doCache = true;

	/**
	 * Get the parent nodes of a given class. The nodes will be cached if
	 * doCache is true.
	 * 
	 * @note Only classes with ChiNode or ChiManyToMany stereotype will be
	 *       listed
	 * @param clazz
	 *            The class to get the parents for.
	 * @param recursive
	 *            If true, include parents that were added by the generator.
	 * @return A list of Property instances (use getType() method to get the
	 *         type)
	 */
	public static EList<Property> getParents(org.eclipse.uml2.uml.Class clazz,
			Boolean recursive) {
		EList<Property> parents = new UniqueEList<Property>();

		if (clazz != null) {
			if (!parentRegistry.containsKey(clazz)) {
				Logger.debug("Get parents for " + clazz.getName());
				Iterator<Association> aIter = clazz.getAssociations()
						.iterator();
				while (aIter.hasNext()) {
					Association a = aIter.next();
					if (recursive || !Generator.isGeneratorAdded(a)) {
						Logger.debug("-> Association: " + a.getName());
						Iterator<Property> meIter = a.getMemberEnds()
								.iterator();
						int counter = 1;
						while (meIter.hasNext()) {
							Property prop = meIter.next();
							Logger.debug("   End: type="
									+ prop.getType().getName()
									+ " kind="
									+ prop.getAggregation().getLiteral()
									+ " ["
									+ prop.getLower()
									+ ","
									+ prop.getUpper()
									+ "] navigable="
									+ prop.isNavigable()
									+ " owner="
									+ prop.getOwner().getClass()
											.getSimpleName());
							if (prop.getType() == clazz
									|| UMLHelper.isSelfReferencing(a)) {
								AggregationKind aggregationKind = prop
										.getAggregation();
								if (aggregationKind != null) {
									if (aggregationKind.ordinal() == AggregationKind.COMPOSITE
											|| aggregationKind.ordinal() == AggregationKind.SHARED
											|| (aggregationKind.ordinal() == AggregationKind.NONE && prop
													.getOtherEnd()
													.getAggregation().ordinal() == AggregationKind.NONE && (!prop.isNavigable() && prop.getOtherEnd().isNavigable()))) {
										if (UMLHelper
												.hasStereotype(
														prop.getOtherEnd()
																.getType(),
														Constants
																.FQName(Constants.STEREOTYPE_CHI_NODE))
												|| UMLHelper
														.hasStereotype(
																prop
																		.getOtherEnd()
																		.getType(),
																Constants
																		.FQName(Constants.STEREOTYPE_CHI_MANY_TO_MANY))) {
											Logger.debug("   -> Found parent: "
													+ prop.getOtherEnd()
															.getType()
															.getName()
													+ " ["
													+ counter
													+ "], "
													+ prop.getOtherEnd()
															.getAggregation());
											parents.add(prop.getOtherEnd());
										}
									}
								}
							}
							counter++;
						}
					}
				}

				// sort parents if desired (depends on parent_order tagged
				// value)
				String parentOrder = UMLHelper.getTaggedValue(clazz,
						Constants.FQName(Constants.STEREOTYPE_CHI_NODE),
						"parent_order").toString();
				if (parentOrder.length() > 0) {
					Property[] parentsOrdered = parents
							.toArray(new Property[0]);
					Comparator<Property> comp = new PropertyRoleComparator(
							parentOrder.split("\\|"));
					Arrays.sort(parentsOrdered, comp);

					parents = new UniqueEList<Property>();
					for (int i = 0; i < parentsOrdered.length; i++)
						parents.add(parentsOrdered[i]);
				}

				if (doCache)
					parentRegistry.put(clazz, parents);
			} else {
				parents = parentRegistry.get(clazz);
			}
		}

		return parents;
	}

	/**
	 * Check if a class is a parent of another.
	 * 
	 * @param clazz
	 *            The class to check the parent for.
	 * @param parent
	 *            The parent.
	 * @param recursive
	 *            If true, include parents that were added by the generator.
	 * @return boolean
	 */
	public static boolean isParent(org.eclipse.uml2.uml.Class clazz,
			org.eclipse.uml2.uml.Class parent, Boolean recursive) {
		Iterator<Property> parentIter = getParents(clazz, recursive).iterator();
		while (parentIter.hasNext()) {
			if (parentIter.next().getType().getQualifiedName().equals(
					parent.getQualifiedName()))
				return true;
		}
		return false;
	}

	/**
	 * Clear the parent cache of a given class.
	 * 
	 * @param clazz
	 *            The class to clear the cache for.
	 */
	public static void clearParentCache(org.eclipse.uml2.uml.Class clazz) {
		if (parentRegistry.containsKey(clazz))
			parentRegistry.remove(clazz);
	}

	/**
	 * Get all parents as string.
	 * 
	 * @param clazz
	 *            The class to get the parents for.
	 * @param recursive
	 *            If true, include parents that were added by the generator.
	 * @return The string.
	 */
	public static String parentsToString(org.eclipse.uml2.uml.Class clazz,
			Boolean recursive) {
		String parentStr = "";
		Iterator<Property> pIter = getParents(clazz, recursive).iterator();
		while (pIter.hasNext()) {
			Property p = pIter.next();
			parentStr += p.getType().getName();
			parentStr += "[" + UMLHelper.getNonEmptyRoleName(p) + "], ";
		}
		return parentStr;
	}

	/**
	 * Get the child nodes of a given class. The nodes will be cached if doCache
	 * is true.
	 * 
	 * @note Only classes with ChiNode or ChiManyToMany stereotype will be
	 *       listed
	 * @param clazz
	 *            The class to get the children for.
	 * @param recursive
	 *            If true, include children that were added by the generator.
	 * @return A list of Property instances (use getType() method to get the
	 *         type)
	 */
	public static EList<Property> getChildren(org.eclipse.uml2.uml.Class clazz,
			Boolean recursive) {
		EList<Property> children = new UniqueEList<Property>();

		if (clazz != null) {
			if (!childRegistry.containsKey(clazz)) {
				Logger.debug("Get children for " + clazz.getName());
				Iterator<Association> aIter = clazz.getAssociations()
						.iterator();
				while (aIter.hasNext()) {
					Association a = aIter.next();
					if (recursive || !Generator.isGeneratorAdded(a)) {
						Logger.debug("-> Association: " + a.getName());
						Iterator<Property> meIter = a.getMemberEnds()
								.iterator();
						int counter = 1;
						while (meIter.hasNext()) {
							Property prop = meIter.next();
							Logger.debug("   End: type="
									+ prop.getType().getName()
									+ " kind="
									+ prop.getAggregation().getLiteral()
									+ " ["
									+ prop.getLower()
									+ ","
									+ prop.getUpper()
									+ "] navigable="
									+ prop.isNavigable()
									+ " owner="
									+ prop.getOwner().getClass()
											.getSimpleName());
							if (prop.getType() != clazz
									|| UMLHelper.isSelfReferencing(a)) {
								AggregationKind aggregationKind = prop
										.getAggregation();
								if (aggregationKind != null) {
									if (aggregationKind.ordinal() == AggregationKind.COMPOSITE
											|| aggregationKind.ordinal() == AggregationKind.SHARED
										|| (aggregationKind.ordinal() == AggregationKind.NONE && prop
												.getOtherEnd()
												.getAggregation().ordinal() == AggregationKind.NONE && (!prop.isNavigable() && prop.getOtherEnd().isNavigable()))) {
										if (UMLHelper
												.hasStereotype(
														prop.getType(),
														Constants
																.FQName(Constants.STEREOTYPE_CHI_NODE))
												|| UMLHelper
														.hasStereotype(
																prop.getType(),
																Constants
																		.FQName(Constants.STEREOTYPE_CHI_MANY_TO_MANY))) {
											Logger.debug("   -> Found child: "
													+ prop.getType().getName()
													+ " [" + counter + "], "
													+ prop.getAggregation());
											children.add(prop);
										}
									}
								}
							}
							counter++;
						}
					}
				}

				// sort children if desired (depends on child_order tagged
				// value)
				String childOrder = UMLHelper.getTaggedValue(clazz,
						Constants.FQName(Constants.STEREOTYPE_CHI_NODE),
						"child_order").toString();
				if (childOrder.length() > 0) {
					Property[] childrenOrdered = children
							.toArray(new Property[0]);
					Comparator<Property> comp = new PropertyRoleComparator(
							childOrder.split("\\|"));
					Arrays.sort(childrenOrdered, comp);

					children = new UniqueEList<Property>();
					for (int i = 0; i < childrenOrdered.length; i++) {
						children.add(childrenOrdered[i]);
					}
				}

				if (doCache)
					childRegistry.put(clazz, children);
			} else {
				children = childRegistry.get(clazz);
			}
		}

		return children;
	}

	/**
	 * Check if a class is a child of another.
	 * 
	 * @param clazz
	 *            The class to check the child for.
	 * @param child
	 *            The child.
	 * @param recursive
	 *            If true, include children that were added by the generator.
	 * @return boolean
	 */
	public static boolean isChild(org.eclipse.uml2.uml.Class clazz,
			org.eclipse.uml2.uml.Class child, Boolean recursive) {
		Iterator<Property> childIter = getChildren(clazz, recursive).iterator();
		while (childIter.hasNext()) {
			if (childIter.next().getType().getQualifiedName().equals(
					child.getQualifiedName()))
				return true;
		}
		return false;
	}

	/**
	 * Clear the child cache of a given class.
	 * 
	 * @param clazz
	 *            The class to clear the cache for.
	 */
	public static void clearChildCache(org.eclipse.uml2.uml.Class clazz) {
		if (childRegistry.containsKey(clazz))
			childRegistry.remove(clazz);
	}

	/**
	 * Get all children as string.
	 * 
	 * @param clazz
	 *            The class to get the children for.
	 * @param recursive
	 *            If true, include children that were added by the generator.
	 * @return The string.
	 */
	public static String childrenToString(org.eclipse.uml2.uml.Class clazz,
			Boolean recursive) {
		String childStr = "";
		Iterator<Property> pIter = getChildren(clazz, recursive).iterator();
		while (pIter.hasNext()) {
			Property p = pIter.next();
			childStr += p.getType().getName();
			childStr += "[" + UMLHelper.getNonEmptyRoleName(p) + "], ";
		}
		return childStr;
	}

	/**
	 * Create a default primary key attribute in a class
	 * 
	 * @param name
	 *            The name of the primary key
	 * @param clazz
	 *            The owning class
	 * @return The Property
	 */
	public static Property createDefaultPKAttribute(String name,
			org.eclipse.uml2.uml.Class clazz) {
		Property p = UMLFactory.eINSTANCE.createProperty();
		UMLHelper.addAttributeInFront(clazz, p);
		Stereotype st = UMLHelper.getStereotype(clazz.getModel(),
				Constants.PROFILE_CHRONOS, Constants.STEREOTYPE_CHI_VALUE);
		p.applyStereotype(st);
		p.setName(name);
		p.setValue(st, "app_data_type", "DATATYPE_IGNORE");
		p.setValue(st, "db_data_type", "INT(11) NOT NULL");
		p.setValue(st, "is_editable", "false");
		p.setValue(st, "column_name", name);
		Generator.setPKValue(p);
		return p;
	}

	/**
	 * Create a default foreign key attribute in a class
	 * 
	 * @param name
	 *            The name of the foreign key
	 * @param clazz
	 *            The owning class
	 * @param referencedClass
	 * @return The Property
	 */
	public static Property createDefaultFKAttribute(String name,
			org.eclipse.uml2.uml.Class clazz,
			org.eclipse.uml2.uml.Class referencedClass) {
		Property p = UMLFactory.eINSTANCE.createProperty();
		UMLHelper.addAttributeInFront(clazz, p);
		Stereotype st = UMLHelper.getStereotype(clazz.getModel(),
				Constants.PROFILE_CHRONOS, Constants.STEREOTYPE_CHI_VALUE);
		p.applyStereotype(st);
		p.setName(name);
		p.setValue(st, "app_data_type", "DATATYPE_IGNORE");
		p.setValue(st, "db_data_type", "INT(11)");
		p.setValue(st, "is_editable", "false");
		p.setValue(st, "column_name", name);
		Generator.setFKValue(p, referencedClass);
		return p;
	}
}
