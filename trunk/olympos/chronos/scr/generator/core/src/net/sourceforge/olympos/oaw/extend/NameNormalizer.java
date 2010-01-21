/*
 * Copyright (c) 2008 The Olympos Development Team.
 * 
 * http://sourceforge.net/projects/olympos/
 *
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html. If redistributing this code,
 * this entire header must remain intact.
 */

package net.sourceforge.olympos.oaw.extend;

import java.util.HashMap;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class NameNormalizer {
	private static HashMap<Character, String> charReplacements = new HashMap<Character, String>();
	static {
		charReplacements.put('ä', "ae");
		charReplacements.put('Ä', "Ae");
		charReplacements.put('ö', "oe");
		charReplacements.put('Ö', "Oe");
		charReplacements.put('ü', "ue");
		charReplacements.put('Ü', "Ue");
		charReplacements.put('ß', "ss");
	}

	public static String normalizeClassName(String orgName) {
		String result = null;
		
		if (orgName != null) {
			result = firstToUpper(normalizeName(new StringBuffer(orgName)))
				.toString();
		}
		
		return result;
	}

	public static String normalizeMemberName(String orgName) {
		String result = null;
		
		if (orgName != null) {
			result = firstToLower(normalizeName(new StringBuffer(orgName)))
				.toString();
		}
		
		return result;
	}
	
	public static String normalizePackageName(String orgName) {
		String result = null;
		
		if (orgName != null) {
			result = normalizeName(new StringBuffer(orgName)).toString().toLowerCase();
		}
		
		return result;
	}

	public static StringBuffer firstToUpper(StringBuffer org) {
		if (org.length() > 0) {
			org.setCharAt(0, Character.toUpperCase(org.charAt(0)));
		}
		return org;
	}

	public static StringBuffer firstToLower(StringBuffer org) {
		if (org.length() > 0) {
			org.setCharAt(0, Character.toLowerCase(org.charAt(0)));
		}

		return org;
	}
	
	private static StringBuffer normalizeName(StringBuffer org) {
		return removeNonEnglishChar(removeWordDelimiters(org));
	}

	private static StringBuffer removeWordDelimiters(StringBuffer org) {
		StringBuffer result = new StringBuffer();

		boolean toUpper = false;

		for (int i = 0; i < org.length(); i++) {
			char curr = org.charAt(i);

			switch (curr) {
			case '-':
			case '_':
			case ' ':
				toUpper = true;
				break;

			default:
				if (!toUpper) {
					result.append(curr);
				} else {
					result.append(Character.toUpperCase(curr));
					toUpper = false;
				}
			}
		}

		return result;
	}

	private static StringBuffer removeNonEnglishChar(StringBuffer org) {
		StringBuffer result = new StringBuffer();

		Pattern pattern = Pattern.compile("[a-zA-Z0-9]");

		for (int i = 0; i < org.length(); i++) {
			Matcher matcher = pattern.matcher(org.subSequence(i, i + 1));

			if (matcher.matches()) {
				result.append(org.charAt(i));
			} else {
				result.append(replaceNonEnglishChar(org.charAt(i)));
			}
		}

		return result;
	}

	private static String replaceNonEnglishChar(char org) {
		String result = null;

		result = charReplacements.get(org);

		if (result == null) {
			result = "";
		}

		return result;
	}
}
