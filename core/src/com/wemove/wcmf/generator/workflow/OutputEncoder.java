/**
 * Copyright (c) 2012 wemove digital solutions. All rights reserved.
 */
package com.wemove.wcmf.generator.workflow;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;

import org.openarchitectureware.workflow.WorkflowContext;
import org.openarchitectureware.workflow.issues.Issues;
import org.openarchitectureware.workflow.monitor.ProgressMonitor;
import org.openarchitectureware.xpand2.output.FileHandle;
import org.openarchitectureware.xpand2.output.PostProcessor;

import com.wemove.wcmf.generator.workflow.FileUtil;

import net.sourceforge.olympos.oaw.extend.Logger;
import net.sourceforge.olympos.oaw.extend.Util;

/**
 * @author ingo herwig <ingo@wemove.com>
 */
public class OutputEncoder implements PostProcessor {

	protected String targetEncoding = "ISO-8859-1";
	
	public String getTargetEncoding() {
		return targetEncoding;
	}

	public void setTargetEncoding(String targetEncoding) {
		this.targetEncoding = targetEncoding;
	}

	/**
	 * @see org.openarchitectureware.xpand2.output.PostProcessor#afterClose(org.openarchitectureware.xpand2.output.FileHandle)
	 */
	@Override
	public void afterClose(FileHandle fileHandle) {
		try {
			String sourceEncoding = fileHandle.getFileEncoding();
			File sourceFile = fileHandle.getTargetFile();
			File targetFile = File.createTempFile(sourceFile.getName(), "tmp");
			Logger.debug(this.getMessage("Encoding file "+sourceFile.getCanonicalPath()+": "+sourceEncoding+" -> "+targetEncoding));
			
			transform(sourceFile, sourceEncoding, targetFile, targetEncoding);
			FileUtil.copyFile(targetFile, sourceFile);
			targetFile.delete();
		}
		catch (IOException e) {
			e.printStackTrace();
		}
	}

	/**
	 * @see org.openarchitectureware.xpand2.output.PostProcessor#beforeWriteAndClose(org.openarchitectureware.xpand2.output.FileHandle)
	 */
	@Override
	public void beforeWriteAndClose(FileHandle file) {}
	
	protected String getMessage(String msg) {
		return this.getClass().getSimpleName()+": "+msg;
	}	
	
	private void transform(File source, String sourceEncoding, File target, String targetEncoding) throws IOException {
	    BufferedReader br = null;
	    BufferedWriter bw = null;
	    try{
	        br = new BufferedReader(new InputStreamReader(new FileInputStream(source),sourceEncoding));
	        bw = new BufferedWriter(new OutputStreamWriter(new FileOutputStream(target), targetEncoding));
	        char[] buffer = new char[16384];
	        int read;
	        while ((read = br.read(buffer)) != -1)
	            bw.write(buffer, 0, read);
	    } finally {
	        try {
	            if (br != null)
	                br.close();
	        } finally {
	            if (bw != null)
	                bw.close();
	        }
	    }
	}
}
