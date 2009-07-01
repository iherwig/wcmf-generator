/*
 * Copyright (c) 2008 wemove digital solutions. All rights reserved.
 */
package net.sourceforge.olympos.oaw.extend;

import java.io.UnsupportedEncodingException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.AbstractCollection;
import java.util.Date;
import java.util.Iterator;

/**
 * This class provides some utility functions to be used in XTend files
 * 
 * @author ingo herwig <ingo@wemove.com>
 */
public class Util {
	/**
	 * Get the current date
	 * 
	 * @return The date as string
	 */
	public static String CurrentDate() {
		return new Date().toString();
	}

	/**
	 * Join a list of strings
	 * 
	 * @param s
	 * @param delimiter
	 * @return String
	 */
	public static String join(AbstractCollection<String> s, String delimiter) {
		if (s.isEmpty())
			return "";
		Iterator<String> iter = s.iterator();
		StringBuffer buffer = new StringBuffer(iter.next());
		while (iter.hasNext())
			buffer.append(delimiter).append(iter.next());
		return buffer.toString();
	}

	/**
	 * Check if a string is empty or null
	 * 
	 * @param str
	 * @return boolean
	 */
	public static boolean isEmpty(String str) {
		return str == null || str.isEmpty();
	}

	/**
	 * Make a string camel case. E.g. input_type -> InputType
	 * 
	 * @return
	 */
	public static String toCamelCase(String string) {
		if (string != null && string.length() > 0) {
			String[] parts = string.split("_");
			StringBuffer camelCaseString = new StringBuffer();
			for (int i = 0; i < parts.length; i++)
				camelCaseString.append(parts[i].substring(0, 1).toUpperCase()
						+ parts[i].substring(1));

			return camelCaseString.toString();
		} else
			return string;
	}

	public static String md5(String input) throws NoSuchAlgorithmException, UnsupportedEncodingException {
		StringBuffer result = new StringBuffer();

		MessageDigest md = MessageDigest.getInstance("MD5");
		md.update(input.getBytes("utf-8"));
		byte[] digest = md.digest();

		for (byte b : digest) {
			result.append(String.format("%02X ", b & 0xff));
		}

		return result.toString();
	}
}