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
import java.io.BufferedWriter;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.apache.tools.ant.BuildException;
import org.apache.tools.ant.Task;

/**
 * Replaces sections of JS script includes by a link to one file inside HTML
 * files.
 * 
 * <p>
 * The task searches inside <code>srcFile</code> for all lines containing a
 * comment like
 * <code>&lt;!--Start include <i>Mapping.sectionName</i>--&gt;</code>. Once this
 * is found, it is replaced by
 * <code>&lt;script type="text/javascript" src="<i>Mapping.linkUrl</i>"&gt;&lt;/script&gt;</code>
 * . All following
 * <code>&lt;script type="text/javascript" src="<i>some/path/to/file.js</i>"&gt;</code>
 * are removed up to the occurence of the corresponing
 * <code>&lt;!--End include <i>Mapping.sectionName</i>--&gt;</code>. The output
 * is written to <code>dstFile</code>.
 * </p>
 * 
 * @author nist
 * 
 */
public class ReplaceSectionsByLinks extends Task {
	public class Mapping {
		private String sectionName;
		private String linkUrl;

		public String getSectionName() {
			return sectionName;
		}

		public void setSectionName(String sectionName) {
			this.sectionName = sectionName;
		}

		public String getLinkUrl() {
			return linkUrl;
		}

		public void setLinkUrl(String linkUrl) {
			this.linkUrl = linkUrl;
		}
	}

	private ArrayList<Mapping> mappings = new ArrayList<Mapping>();
	private String srcFile;
	private String dstFile;

	public Mapping createMapping() {
		Mapping result = new Mapping();
		mappings.add(result);

		return result;
	}

	public String getSrcFile() {
		return srcFile;
	}

	public void setSrcFile(String srcFile) {
		this.srcFile = srcFile;
	}

	public String getDstFile() {
		return dstFile;
	}

	public void setDstFile(String dstFile) {
		this.dstFile = dstFile;
	}

	public void execute() throws BuildException {
		HashMap<String, String> map = this.getMap();

		BufferedReader reader = null;
		BufferedWriter writer = null;
		try {
			reader = new BufferedReader(new FileReader(this.srcFile));
			writer = new BufferedWriter(new FileWriter(this.dstFile));

			String currLine;

			String currentSection = null;

			Pattern sectionStartPattern = Pattern
					.compile("<!--\\s*Start\\s+include\\s+([^\\s]+)\\s*-->");
			Pattern sectionEndPattern = Pattern
					.compile("<!--\\s*End\\s+include\\s+([^\\s]+)\\s*-->");
			Pattern linkPattern = Pattern.compile(
					"<script .*?src=\"([^\"]+)\".*", Pattern.CASE_INSENSITIVE);

			while ((currLine = reader.readLine()) != null) {
				String trimLine = currLine.trim();
				boolean writeLine = true;

				if (currentSection == null) {
					Matcher startMatcher = sectionStartPattern
							.matcher(trimLine);

					if (startMatcher.matches()) {
						String url = map.get(startMatcher.group(1));

						if (url != null) {
							currentSection = startMatcher.group(1);

							writer
									.append("\t\t<script type='text/javascript' src='");
							writer.append(map.get(currentSection));
							writer.append("'></script>\n");

							writeLine = false;
						}
					}
				} else {
					Matcher endMatcher = sectionEndPattern.matcher(trimLine);

					if (endMatcher.matches()) {
						currentSection = null;

						writeLine = false;
					} else {
						Matcher linkMatcher = linkPattern.matcher(trimLine);

						if (trimLine.equals("</script>")
								|| linkMatcher.matches()) {
							writeLine = false;
						}
					}
				}

				if (writeLine) {
					writer.append(currLine);
					writer.append("\n");
				}
			}
		} catch (FileNotFoundException e) {
			throw new BuildException("Cannot find srcFile: ", e);
		} catch (IOException e) {
			throw new BuildException("IOException while processing: ", e);
		} finally {
			if (reader != null) {
				try {
					reader.close();
				} catch (IOException e) {
					throw new BuildException(
							"IOException while closing srcFile: " + e);
				}
			}

			if (writer != null) {
				try {
					writer.close();
				} catch (IOException e) {
					throw new BuildException(
							"IOException while closing dstFile: " + e);
				}
			}
		}
	}

	private HashMap<String, String> getMap() {
		HashMap<String, String> result = new HashMap<String, String>();

		for (Mapping currMapping : mappings) {
			result.put(currMapping.getSectionName(), currMapping.getLinkUrl());
		}

		return result;
	}
}
