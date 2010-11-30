package com.wemove.wcmf.generator.workflow;


import java.io.File;
import java.io.IOException;

import net.sourceforge.olympos.oaw.extend.Logger;
import net.sourceforge.olympos.oaw.extend.Util;

import org.openarchitectureware.workflow.WorkflowContext;
import org.openarchitectureware.workflow.issues.Issues;
import org.openarchitectureware.workflow.monitor.ProgressMonitor;

/**
 * @author ingo herwig <ingo@wemove.com>
 */
public class InstallComponent extends BaseComponent {

	protected String frameworkFile = null;
	protected String libraryPath = null;
	protected String applicationPath = null;
	
	public String getFrameworkFile() {
		return frameworkFile;
	}

	public void setFrameworkFile(String frameworkFile) {
		this.frameworkFile = frameworkFile;
	}

	public String getLibraryPath() {
		return libraryPath;
	}

	public void setLibraryPath(String libraryPath) {
		// convert package notation, if necessary
		this.libraryPath = libraryPath.replace("::", "/");
	}

	public String getApplicationPath() {
		return applicationPath;
	}

	public void setApplicationPath(String applicationPath) {
		// convert package notation, if necessary
		this.applicationPath = applicationPath.replace("::", "/");
	}

	@Override
	protected void checkConfigurationInternal(Issues issues) {
		if (Util.isEmpty(this.libraryPath))
			issues.addError(this.getMessage("The required parameter 'libraryPath' is missing or empty."));
		if (Util.isEmpty(this.applicationPath))
			issues.addError(this.getMessage("The required parameter 'applicationPath' is missing or empty."));

		if (!Util.isEmpty(this.frameworkFile)) {
			File file = new File(this.frameworkFile);
			if (!file.exists())
				issues.addWarning(this.getMessage("The file '"+this.frameworkFile+"' does not exist. Skipping framework extraction."));
		}
	}

	@Override
	protected void invokeInternal(WorkflowContext ctx, ProgressMonitor monitor,	Issues issues) {
        File libDir = new File(this.libraryPath);
        File appDir = new File(this.applicationPath);
        File fwFile = new File(this.frameworkFile);
        if (fwFile.exists())
        {
	        if (!libDir.exists())
	        {
	            Logger.debug(this.getMessage("Creating library directory: "+libDir.getAbsolutePath()));
	            libDir.mkdir();
	            Logger.info(this.getMessage("Extracting framework: "+frameworkFile));
	            try {
					FileUtil.unzipDir(libDir, fwFile);
				} catch (IOException e) {
					issues.addError("Unable to extract framework: "+this.getMessage(e.getMessage()));
				}
	        }
	        if (!appDir.exists())
	        {
	            Logger.info(this.getMessage("Copying application template"));
	            try {
					FileUtil.copyDir(new File(libDir.getAbsolutePath()+File.separator+"blank"), appDir);
				} catch (IOException e) {
					issues.addError("Unable to copy application template: "+this.getMessage(e.getMessage()));
				}
	        }
        }
	}
}
