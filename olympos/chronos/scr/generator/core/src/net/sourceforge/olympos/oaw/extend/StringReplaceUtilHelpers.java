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

import net.sourceforge.olympos.oaw.extend.StringReplaceUtil.ChangeSet;


/**
 * holds Standard ChangeSets for a variety of replacements and functions to execute them
 * - e.g. strip html tags from generated files or replace tags by ASCII code
 * 
 * @author tschuetz
 *	
 */

public class StringReplaceUtilHelpers {
	
	/**
	 *  convert often used Html tags from input string to a simple Ascii Format and erase all other tags   
	 * @return changed String
	 */
	public static String htmlToAscii(String input){
		return StringReplaceUtil.executeChangeSet(input, createChangeListHtmlToAscii());
	}
	
	/**
	 *  convert often used Html tags from input string to a simple Ascii Format and erase all other tags
	 *  also deletes empty lines and adds a * at the beginning of each line
	 *  -> should only be used for comments
	 * @return changed String
	 */
	public static String htmlToAsciiForComments(String input){
		return StringReplaceUtil.executeChangeSet(input, createChangeListHtmlToAsciiForComments());
	}

	/**
	 *  erase all Html tags from input string
	 * @return changed String
	 */
	public static String stripHtml(String input){
		return StringReplaceUtil.executeChangeSet(input, createChangeListStripHtml());
	}

	/**
	 *  erase all empty lines from comments
	 * @return changed String
	 */
	public static String commentCleanup(String input){
		return StringReplaceUtil.executeChangeSet(input, createChangeSetCommentCleanup());
	}
	
	
	private static ChangeSet createChangeListStripHtml(){
		ChangeSet changeSet = new ChangeSet();

		changeSet.addChangeSet(createRegexForHtmlStartTag("\\w"),""); // all start tags, e.g. <tag>
		changeSet.addChangeSet(createRegexForHtmlCloseTag("\\w"),""); // all close tags e.g. </tag>
		
		return changeSet;
	}

	private static ChangeSet createChangeListHtmlToAsciiForComments(){
		ChangeSet changeSet = new ChangeSet();
		changeSet.addChangeList(createChangeListHtmlToAscii()); // convert HTML to ASCII
		
		changeSet.addChangeList(createChangeSetCommentCleanup());

		return changeSet;
	}
	
	private static ChangeSet createChangeListHtmlToAscii(){
		ChangeSet changeSet = new ChangeSet();
		
		changeSet.addChangeSet(createRegexForHtmlStartTag("p"),""); // <p>
		changeSet.addChangeSet(createRegexForHtmlStartTag("span"),""); // <span>
		changeSet.addChangeSet(createRegexForHtmlCloseTag("p"),"\n"); // </p>
		changeSet.addChangeSet(createRegexForHtmlCloseTag("span"),"\n"); // </span>
		changeSet.addChangeSet(createRegexForHtmlStartTag("br"),"\n"); // <br>
		changeSet.addChangeSet(createRegexForHtmlStartTag("li"),"-- "); // <li>
		changeSet.addChangeSet(createRegexForHtmlCloseTag("li"),"\n"); // </li>
		
		changeSet.addChangeList(createChangeListStripHtml()); // strip all other tags

		return changeSet;
	}
	
	private static ChangeSet createChangeSetCommentCleanup(){
		ChangeSet changeSet = new ChangeSet();
		changeSet.addChangeSet("\n+","\n"); // delete all empty lines in comments
		changeSet.addChangeSet("\n","\n * "); // add leading * for every line for proper formatting
		return changeSet;
	}
	
	private static String createRegexForHtmlStartTag(String tag){
		return "<\\s*" + tag + "(\\s|.)*?>";
	}
	private static String createRegexForHtmlCloseTag(String tag){
		return ("<\\s*\\/\\s*"+tag+"(\\s|.)*?>");
	}
}
