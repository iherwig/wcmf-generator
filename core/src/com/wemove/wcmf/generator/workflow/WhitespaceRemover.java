/**
 * Copyright (c) 2014 wemove digital solutions. All rights reserved.
 */
package com.wemove.wcmf.generator.workflow;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.StringReader;
import java.io.StringWriter;

import org.openarchitectureware.xpand2.output.FileHandle;
import org.openarchitectureware.xpand2.output.PostProcessor;

/**
 * Removes trailing whitespace from lines.
 * @author ingo herwig <ingo@wemove.com>
 */
public class WhitespaceRemover implements PostProcessor {

	@Override
	public void afterClose(FileHandle file) {}

	@Override
	public void beforeWriteAndClose(FileHandle file) {
		BufferedReader reader = new BufferedReader(new StringReader(file.getBuffer().toString()));
		StringWriter result = new StringWriter();
		String line;
		try {
			while ((line = reader.readLine()) != null) {
				result.append(line.replaceAll("\\s+$", "")).append("\n");
			}
		}
		catch (IOException e) {
			e.printStackTrace();
		}

		file.setBuffer(result.getBuffer());
	}
}
