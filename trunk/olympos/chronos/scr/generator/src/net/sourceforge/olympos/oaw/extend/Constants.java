/*
 * Copyright (c) 2008 wemove digital solutions. All rights reserved.
 */
package net.sourceforge.olympos.oaw.extend;

/**
 * This class provides names of the applied profile.
 * @author ingo herwig <ingo@wemove.com>
 */
public class Constants {

	public static final String PROFILE_WCMF = "wcmf";
	public static final String STEREOTYPE_WCMF_NODE = "WCMFNode";
	public static final String STEREOTYPE_WCMF_VALUE = "WCMFValue";
	public static final String STEREOTYPE_WCMF_MANY_TO_MANY = "WCMFManyToMany";
	public static final String STEREOTYPE_WCMF_ASSOCIATION = "WCMFAssociation";
	
	/**
	 * Get a fully qualified stereotype name (with profile prependen)
	 * @param stereotypeName
	 * @return String
	 */
	public static String FQName(String stereotypeName) {
		return Constants.PROFILE_WCMF+"::"+stereotypeName;
	}
}
