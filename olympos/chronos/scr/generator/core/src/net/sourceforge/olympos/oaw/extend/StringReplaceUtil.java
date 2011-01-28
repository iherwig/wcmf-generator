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
	 *  strip all Html tags from input string  
	 * @param input
	 * @return
	 */
	public static String stripHtml(String input, List<ChangeSet> changeList){
		String result = input;
		for(ChangeSet set : changeList){
			result = result.replaceAll(set.getFindString(), set.getReplaceString());
		}
		return result;
	}
	
	/**
	 *  changelist to remove all Html tags from input string  
	 * @return ChangeList for the conversion
	 */
	public static ChangeList createChangeListStripHtml(){
		ChangeList changeList = new ChangeList();

		changeList.addChangeSet("<\\s*\\w.*?>",""); // all start tags, e.g. <tag>
		changeList.addChangeSet("<\\s*\\/\\s*\\w\\s*.*?>",""); // all close tags e.g. </tag>
		
		return changeList;
	}

	/**
	 *  changelist to replace basic Html tags with simple ASCII Formatting and remove the rest of the tags
	 * @return ChangeList for the conversion
	 */
	public static ChangeList createChangeListConvertHtmlToAscii(){
		ChangeList changeList = new ChangeList();
		
		changeList.addChangeSet("<\\s*p.*?>",""); // <p>
		changeList.addChangeSet("<\\s*\\/\\s*p\\s*.*?>","\n"); // </p>
		changeList.addChangeSet("<\\s*br.*?>","\n"); // <br>
		changeList.addChangeSet("<\\s*li.*?>","-"); // <li>
		changeList.addChangeSet("<\\s*\\/\\s*li\\s*.*?>","\n"); // </li>
		changeList.addChangeSet("<\\s*li.*?>","-"); // <li>
		changeList.addChangeSet("<\\s*\\/\\s*li\\s*.*?>","\n"); // </li>

		changeList.addChangeList(createChangeListStripHtml()); // strip all other tags
		
		return changeList;
	}
	
	
	/**
	 * defines one pair of strings to find and replace strings
	 */
	private static class ChangeSet{
		public ChangeSet(String findString, String replaceString){
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
	public static class ChangeList extends ArrayList<ChangeSet>{
		/**
		 * only for convenience to make simple usage possible
		 * @param findString
		 * @param replaceString
		 */
		public void addChangeSet(String findString, String replaceString){
			add(new ChangeSet(findString, replaceString));
		}
		/**
		 * adding another changelist to this one
		 * @param changeList
		 */
		public void addChangeList(ChangeList changeList){
			for (ChangeSet changeSet : changeList){
				add(changeSet);
			}
		}
	}
}
