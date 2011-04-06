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

package net.sourceforge.olympos.oaw.extend.test;


import net.sourceforge.olympos.oaw.extend.StringReplaceUtil;
import net.sourceforge.olympos.oaw.extend.StringReplaceUtilHelpers;
import junit.framework.TestCase;


/**
 * Tests for StringReplaceUtil and StrigReplaceUtilHelpers
 * 
 * @author tschuetz
 *	
 */

public class StringReplaceUtilTest extends TestCase {

	public void testStripHtml() {
		StringReplaceUtil.ChangeSet changeList = new StringReplaceUtil.ChangeSet();
		String input = null;
		String expected = null;
		
		changeList.addChangeSet("Hello","");
		input = "Hello";
		expected = "";
		assertEquals(expected, StringReplaceUtil.executeChangeSet(input, changeList));


		changeList.clear();
		changeList.addChangeSet("<br>","\n");
		input = "Hello <abc> <br> <def>";
		expected = "Hello <abc> \n <def>";
		assertEquals(expected, StringReplaceUtil.executeChangeSet(input, changeList));

		// specific start tag, e.g. <tag>
		changeList.clear();
		changeList.addChangeSet("<\\s*abc.*?>","tag");
		input = "Hello <abc a=5 b=10> </ppp a=5 b=10> <br> <def> </ppp>";
		expected = "Hello tag </ppp a=5 b=10> <br> <def> </ppp>";
		assertEquals(expected, StringReplaceUtil.executeChangeSet(input, changeList));
		
		// specific end tag, e.g. </tag>
		changeList.clear();
		changeList.addChangeSet("<\\s*/ppp.*?>","tag");
		input = "Hello <abc a=5 b=10> </ppp a=5 b=10> <br> <def> </ppp>";
		expected = "Hello <abc a=5 b=10> tag <br> <def> tag";
		assertEquals(expected, StringReplaceUtil.executeChangeSet(input, changeList));

		// all start tags, e.g. <tag>
		changeList.clear();
		changeList.addChangeSet("<\\s*\\w.*?>","tag");
		input = "Hello <abc a=5 b=10> </ppp a=5 b=10> <br> <def> </ppp>";
		expected = "Hello tag </ppp a=5 b=10> tag tag </ppp>";
		assertEquals(expected, StringReplaceUtil.executeChangeSet(input, changeList));

		// all close tags e.g. </tag>
		changeList.clear();
		changeList.addChangeSet("<\\s*\\/\\s*\\w\\s*.*?>","tag");
		input = "Hello <abc a=5 b=10> </ppp a=5 b=10> <br> <def> </ppp>";
		expected = "Hello <abc a=5 b=10> tag <br> <def> tag";
		assertEquals(expected, StringReplaceUtil.executeChangeSet(input, changeList));
	
	}
	
	public void testCreateChangeListStripHtml(){
		String input = null;
		String expected = null;
		
		input = "<p>abc</p>***<p>xyz</p>--<p>TextText</p>* <ul> *_?/\t<li><p>Liste1*</li><li>Liste2</li><p>Return</p>";    
		expected = "abc***xyz--TextText*  *_?/\tListe1*Liste2Return";

		assertEquals(expected, StringReplaceUtilHelpers.stripHtml(input));
	}
	
	public void testCreateChangeListConvertHtmlToAscii(){
		String input = null;
		String expected = null;
		
		input = "<head><p>abc</p>***<p>xyz</p>-< br >-<p>TextText</p>* <ul> *_?/\t<li><p>Liste1*</li><li>Liste2</li><p>Return</p></head>";    
		expected = "abc\n***xyz\n-\n-TextText\n*  *_?/\t-- Liste1*\n-- Liste2\nReturn\n";    

		assertEquals(expected, StringReplaceUtilHelpers.htmlToAscii(input));
	}

}
