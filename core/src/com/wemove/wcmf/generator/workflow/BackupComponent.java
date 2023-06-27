package com.wemove.wcmf.generator.workflow;


import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;

import net.sourceforge.olympos.oaw.extend.Logger;
import net.sourceforge.olympos.oaw.extend.Util;

import org.openarchitectureware.workflow.WorkflowContext;
import org.openarchitectureware.workflow.issues.Issues;
import org.openarchitectureware.workflow.monitor.ProgressMonitor;

/**
 * @author ingo herwig <ingo@wemove.com>
 */
public class BackupComponent extends BaseComponent {

	protected String sourcePath = null;
	protected String targetPath = null;
	
	public String getSourcePath() {
		return sourcePath;
	}

	public void setSourcePath(String sourcePath) {
		this.sourcePath = sourcePath;
	}

	public String getTargetPath() {
		return targetPath;
	}

	public void setTargetPath(String targetPath) {
		this.targetPath = targetPath;
	}

	@Override
	protected void checkConfigurationInternal(Issues issues) {
		if (Util.isEmpty(this.sourcePath))
			issues.addError(this.getMessage("The required parameter 'sourcePath' is missing or empty."));
		if (Util.isEmpty(this.targetPath))
			issues.addError(this.getMessage("The required parameter 'targetPath' is missing or empty."));
	}

	@Override
	protected void invokeInternal(WorkflowContext ctx, ProgressMonitor monitor,	Issues issues) {
        File backup = new File(this.targetPath);
        File appDir = new File(this.sourcePath);
        File[] appFiles = appDir.listFiles();
        if (backup.getName().length() > 0 && appFiles != null && appFiles.length > 0)
        {
            // create backup directory if not existing
            if (!backup.exists())
            {
                Logger.debug(this.getMessage("Creating backup directory: "+backup.getAbsolutePath()));
                backup.mkdir();
            }

            // backup source files
            Date timestamp = new Date();
            SimpleDateFormat df = new SimpleDateFormat("yyyyMMdd_HHmmss_S");
            String filename = backup.getAbsolutePath()+File.separator+"backup_"+df.format(timestamp)+".zip";
            Logger.info(this.getMessage("Backing up source files to "+filename+" ..."));
            
            try {
				FileUtil.zipDir(appDir, new File(filename));
			} catch (IOException e) {
				issues.addError(this.getMessage("Unable to create zip file: "+e.getMessage()));
			}
        }
	}
}
