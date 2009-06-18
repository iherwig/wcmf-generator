/*
 * Copyright (c) 2008 wemove digital solutions. All rights reserved.
 */
package net.sourceforge.olympos.oaw.extend;

/**
 * This class provides names of the applied profile.
 * 
 * @author ingo herwig <ingo@wemove.com>
 */
public class Constants {

	public static final String PROFILE_CHRONOS = "Chronos";
	public static final String STEREOTYPE_CHI_NODE = "ChiNode";
	public static final String STEREOTYPE_CHI_VALUE = "ChiValue";
	public static final String STEREOTYPE_CHI_MANY_TO_MANY = "ChiManyToMany";
	public static final String STEREOTYPE_CHI_ASSOCIATION = "ChiAssociation";

	/**
	 * Get a fully qualified stereotype name (with profile prependen)
	 * 
	 * @param stereotypeName
	 * @return String
	 */
	public static String FQName(String stereotypeName) {
		return Constants.PROFILE_CHRONOS + "::" + stereotypeName;
	}
}
