/*
 * Copyright (c) 2011 The Olympos Development Team.
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

import java.util.List;
import java.util.ArrayList;


/**
 * holds Utilities to replace patterns in strings
 * - e.g. strip html tags from generated files or replace tags by ASCII code
 * 
 * @author tschuetz
 *	
 */
public class StringReplaceUtil {
	
	/**
	 *  execute a ChangeSet for replacement of pattern in input string  
	 * @param input 
	 * @return String with the result
	 */
	public static String executeChangeSet(String input, List<ChangeItem> changeList){
		String result = input;
		for(ChangeItem set : changeList){
			result = result.replaceAll(set.getFindString(), set.getReplaceString());
		}
		return result;
	}
	
	/**
	 * defines one pair of strings to find and replace strings
	 */
	private static class ChangeItem{
		public ChangeItem(String findString, String replaceString){
			this.findString		= findString;
			this.replaceString 	= replaceString;
		}
		public String getFindString() { return findString; }
		public String getReplaceString() { return replaceString; }

		private String findString;
		private String replaceString;
	}
	
	/**
	 * contains a list of ChangeSets to be applied in a single step
	 */
	public static class ChangeSet extends ArrayList<ChangeItem>{
		/**
		 * only for convenience to make simple usage possible
		 * @param findString
		 * @param replaceString
		 */
		public void addChangeSet(String findString, String replaceString){
			add(new ChangeItem(findString, replaceString));
		}
		/**
		 * adding another changelist to this one
		 * @param changeList
		 */
		public void addChangeList(ChangeSet changeList){
			for (ChangeItem changeSet : changeList){
				add(changeSet);
			}
		}
	}
}
