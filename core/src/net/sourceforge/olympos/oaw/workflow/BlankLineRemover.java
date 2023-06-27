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
package net.sourceforge.olympos.oaw.workflow;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.StringReader;
import java.io.StringWriter;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.openarchitectureware.xpand2.output.FileHandle;
import org.openarchitectureware.xpand2.output.PostProcessor;

/**
 * Removes blank lines from the processed files.
 * 
 * @author Niko <enikao@users.sourceforge.net>
 */
public class BlankLineRemover implements PostProcessor {
	/**
	 * Number of consecutive blank lines passed through untouched
	 * 
	 * <p>
	 * Default value: 0 (all blank lines are removed).
	 * </p>
	 */
	private int acceptedBlankLines = 0;

	public int getAcceptedBlankLines() {
		return acceptedBlankLines;
	}

	public void setAcceptedBlankLines(int acceptedBlankLines) {
		this.acceptedBlankLines = acceptedBlankLines;
	}

	public BlankLineRemover() {

	}

	@Override
	public void afterClose(FileHandle file) {

	}

	@Override
	public void beforeWriteAndClose(FileHandle file) {
		BufferedReader reader = new BufferedReader(new StringReader(file
				.getBuffer().toString()));

		StringWriter result = new StringWriter();

		String line;

		Pattern pattern = Pattern.compile("\\s*");

		try {
			int emptyLines = 0;

			while ((line = reader.readLine()) != null) {
				Matcher matcher = pattern.matcher(line);

				if (!matcher.matches() || emptyLines < this.acceptedBlankLines) {
					result.append(line);
					result.append("\n");
					if (!matcher.matches()) {
						emptyLines = 0;
					} else {
						emptyLines++;
					}
				} else {
					emptyLines++;
				}
			}
		} catch (IOException e) {
			e.printStackTrace();
		}

		file.setBuffer(result.getBuffer());
	}
}
