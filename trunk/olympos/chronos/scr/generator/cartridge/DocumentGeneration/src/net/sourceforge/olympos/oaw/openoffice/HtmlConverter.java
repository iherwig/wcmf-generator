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

package net.sourceforge.olympos.oaw.openoffice;

import java.io.StringReader;
import java.util.Stack;

import javax.xml.parsers.SAXParser;
import javax.xml.parsers.SAXParserFactory;

import org.xml.sax.Attributes;
import org.xml.sax.InputSource;
import org.xml.sax.SAXException;
import org.xml.sax.helpers.DefaultHandler;

public class HtmlConverter extends DefaultHandler {

	private StringBuffer output = new StringBuffer();

	private boolean bold = false;
	private boolean italic = false;
	private boolean underline = false;

	private boolean paragraphOpen = false;
	private boolean spanOpen = false;
	
	private boolean firstOlLi = false;

	private Stack<String> paragraphClassStack = new Stack<String>();
	private String paragraphClass;

	public static String html2openoffice(String input) {
		String result = null;

		String inputAugmented = "<p>"
				+ input.replace("&nbsp;", "&#160;").replace("<br>", "<br/>")
				+ "</p>";

		SAXParserFactory parserFactory = SAXParserFactory.newInstance();
		parserFactory.setValidating(false);

		try {
			SAXParser parser = parserFactory.newSAXParser();

			InputSource inputSource = new InputSource(new StringReader(
					inputAugmented));

			HtmlConverter handler = new HtmlConverter();

			parser.parse(inputSource, handler);

			result = handler.getOutput();
		} catch (Exception e) {
			System.out.println("Error in html2openoffice:\ninput: " + input
					+ "\nMessage: " + e.getMessage() + "\nStack: ");
			e.printStackTrace(System.out);

			result = "<text:p text:style-name=\"P7\">"
					+ inputAugmented.replaceAll("<[^>]+>", " ") + "</text:p>";
		}

		return result;
	}

	private HtmlConverter() {
		this.paragraphClass = "uwmStandard";
	}

	private String getOutput() {
		return output.toString().replaceAll(
				"<text:span text:style-name=\"[^\"]+\"></text:span>", "")
				.replaceAll(
						"^<text:p text:style-name=\"uwmStandard\"></text:p>",
						"");
	}

	@SuppressWarnings("unused")
	private StringBuffer replaceAll(StringBuffer input, String replace,
			String replaceWith) {
		int next = 0;
		int start = 0;
		int end = 0;
		boolean flag = true;
		while (flag) {
			start = input.indexOf(replace, next);
			// start = input.indexOf(replace);
			if (start == -1) {
				flag = false;
				break;
			}
			end = start + replace.length();
			next = start + replaceWith.length();
			input.replace(start, end, replaceWith);
		}
		return input;
	}

	@Override
	public void characters(char[] ch, int start, int length)
			throws SAXException {
		openSpan();

		for (int i = start; i < start + length; i++) {
			char c = ch[i];

			switch (c) {
			case '<':
				output.append("&lt;");
				break;

			case '>':
				output.append("&gt;");
				break;

			case '&':
				output.append("&amp;");
				break;

			case '"':
				output.append("&quot;");
				break;

			default:
				output.append(c);
			}
		}
	}

	private void openSpan() {
		if (!spanOpen) {
			openParagraph();

			output.append("<text:span text:style-name=\"");
			output.append(getCurrentStyle());
			output.append("\">");
			spanOpen = true;
		}
	}

	private void closeSpan() {
		if (spanOpen) {
			output.append("</text:span>");
			spanOpen = false;
		}
	}

	private void openParagraph() {
		if (!paragraphOpen) {
			output.append("<text:p text:style-name=\"");
			output.append(paragraphClass);
			output.append("\">");

			paragraphOpen = true;
		}
	}

	private void closeParagraph() {
		closeSpan();

		if (paragraphOpen) {
			output.append("</text:p>");
			paragraphOpen = false;
		}
	}

	@Override
	public void endElement(String uri, String localName, String name)
			throws SAXException {
		String nameLower = name.toLowerCase();

		setFlags(nameLower, false);

		if (nameLower.equals("p")) {
			closeParagraph();
		} else if (nameLower.equals("ul") || nameLower.equals("ol")) {
			paragraphClass = paragraphClassStack.pop();
			output.append("</text:list>");
		} else if (nameLower.equals("li")) {
			closeParagraph();
			output.append("</text:list-item>");
		} else if (nameLower.equals("b") || nameLower.equals("i")
				|| nameLower.equals("u")) {
			closeSpan();
		}
	}

	private void setFlags(String nameLower, boolean state) {
		if (nameLower.equals("b")) {
			if (this.bold != state) {
				closeSpan();
			}
			this.bold = state;
		} else if (nameLower.equals("i")) {
			if (this.italic != state) {
				closeSpan();
			}
			this.italic = state;
		} else if (nameLower.equals("u")) {
			if (this.underline != state) {
				closeSpan();
			}
			this.underline = state;
		}

	}

	@Override
	public void startElement(String uri, String localName, String name,
			Attributes attributes) throws SAXException {
		String nameLower = name.toLowerCase();

		setFlags(nameLower, true);

		if (nameLower.equals("p")) {
			closeParagraph();
			openParagraph();
		} else if (nameLower.equals("ul")) {
			closeParagraph();
			output
					.append("<text:list xml:id=\"id001\" text:style-name=\"uwmUl\">");
			this.firstOlLi = false;
			paragraphClassStack.push(paragraphClass);
			paragraphClass = "uwmUlP";
		} else if (nameLower.equals("ol")) {
			closeParagraph();
			output
					.append("<text:list xml:id=\"id001\" text:style-name=\"uwmOl\">");
			this.firstOlLi = true;
			paragraphClassStack.push(paragraphClass);
			paragraphClass = "uwmOlP";
		} else if (nameLower.equals("li")) {
			if (!this.firstOlLi) {
				output.append("<text:list-item>");
			} else {
				output.append("<text:list-item text:start-value=\"1\">");
				this.firstOlLi = false;
			}
		} else if (nameLower.equals("br")) {
			openSpan();
			output.append("<text:line-break/>");
		} else if (nameLower.equals("b") || nameLower.equals("i")
				|| nameLower.equals("u")) {
			openSpan();
		}
	}

	private String getCurrentStyle() {
		String result = "unknown";

		if (bold) {
			if (italic) {
				if (underline) {
					result = "boldItalicUnderline";
				} else {
					result = "boldItalic";
				}
			} else if (underline) {
				result = "boldUnderline";
			} else {
				result = "bold";
			}
		} else if (italic) {
			if (underline) {
				result = "italicUnderline";
			} else {
				result = "italic";
			}
		} else if (underline) {
			result = "underline";
		} else {
			result = "uwmDefault";
		}

		return result;
	}
}
