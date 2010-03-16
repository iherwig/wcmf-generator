/*
 * Copyright (c) 2010 The Olympos Development Team.
 * 
 * http://sourceforge.net/projects/olympos/
 *
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html. If redistributing this code,
 * this entire header must remain intact.
 */
package net.sourceforge.olympos.ant;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.apache.tools.ant.BuildException;
import org.apache.tools.ant.Task;
import org.apache.tools.ant.types.FileSet;

/**
 * Extracts all JavaScript links out of an HTML file section marked by specific
 * comments.
 * 
 * <p>
 * The task searches inside <code>htmlFile</code> for a line containing a
 * comment like <code>&lt;!--Start include <i>sectionName</i>--&gt;</code>. Once
 * this is found, all following
 * <code>&lt;script type="text/javascript" src="<i>some/path/to/file.js</i>"&gt;</code>
 * are parsed into a <i>FileSet</i> named <code>jsFileSet</code>. It stops at
 * the occurence of <code>&lt;!--End include <i>sectionName</i>--&gt;</code>.
 * </p>
 * 
 * @author nist
 * 
 */
public class ExtractJsLinks extends Task {

	private String htmlFilePath;
	private String jsFileSetName;
	private String sectionName;

	public void setHtmlFile(String htmlFilePath) {
		this.htmlFilePath = htmlFilePath;
	}

	public String getHtmlFile() {
		return this.htmlFilePath;
	}

	public void setJsFileSet(String jsFileSetName) {
		this.jsFileSetName = jsFileSetName;
	}

	public String getJsFileSet() {
		return this.jsFileSetName;
	}

	public void setSectionName(String sectionName) {
		this.sectionName = sectionName;
	}

	public String getSectionName() {
		return this.sectionName;
	}

	@Override
	public void execute() throws BuildException {
		BufferedReader reader = null;
		try {
			reader = new BufferedReader(new FileReader(this.htmlFilePath));

			String searchStringStart = "<!--Start include " + this.sectionName
					+ "-->";
			String searchStringEnd = "<!--End include " + this.sectionName
					+ "-->";

			Pattern pattern = Pattern.compile("<script .*?src=\"([^\"]+)\".*",
					Pattern.CASE_INSENSITIVE);

			String currLine;
			boolean insideSection = false;

			FileSet result = new FileSet();
			result.setProject(this.getProject());

			File htmlFile = new File(this.htmlFilePath);
			File parentDir = htmlFile.getParentFile().getParentFile()
					.getCanonicalFile();
			File htmlDir = htmlFile.getParentFile();

			result.setDir(parentDir);

			while ((currLine = reader.readLine()) != null) {
				currLine = currLine.trim();
				currLine = currLine.replaceAll("\t", "");

				if (currLine.equals(searchStringStart)) {
					insideSection = true;
				} else if (currLine.equals(searchStringEnd)) {
					insideSection = false;

					break;
				}

				if (insideSection) {
					Matcher matcher = pattern.matcher(currLine);

					if (matcher.matches()) {
						String filePath = matcher.group(1);

						if (filePath.startsWith("..")) {
							filePath = filePath.substring(3);
						} else {
							filePath = htmlDir.getName() + "/" + filePath;
						}

						result.appendIncludes(new String[] { filePath });
					}
				}
			}

			this.getProject().addReference(this.jsFileSetName, result);
		} catch (FileNotFoundException e) {
			throw new BuildException("Cannot find htmlFile: ", e);
		} catch (IOException e) {
			throw new BuildException("Error while reading htmlFile: ", e);
		} finally {
			if (reader != null) {
				try {
					reader.close();
				} catch (IOException e) {
					throw new BuildException(
							"IOException while closing srcFile: " + e);
				}
			}
		}
	}
}
