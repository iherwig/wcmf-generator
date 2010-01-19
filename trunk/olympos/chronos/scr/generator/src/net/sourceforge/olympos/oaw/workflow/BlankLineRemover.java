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
 * Removes all blank lines from the processed files.
 * 
 * @author Niko <enikao@users.sourceforge.net>
 */
public class BlankLineRemover implements PostProcessor {

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
			while ((line = reader.readLine()) != null) {
				Matcher matcher = pattern.matcher(line);

				if (!matcher.matches()) {
					result.append(line);
					result.append("\n");
				}
			}
		} catch (IOException e) {
			e.printStackTrace();
		}

		file.setBuffer(result.getBuffer());
	}
}
