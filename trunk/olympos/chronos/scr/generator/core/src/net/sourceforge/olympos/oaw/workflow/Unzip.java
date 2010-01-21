package net.sourceforge.olympos.oaw.workflow;

import java.io.File;
import java.io.IOException;

import net.sourceforge.olympos.oaw.extend.Logger;
import net.sourceforge.olympos.oaw.extend.Util;

import org.openarchitectureware.workflow.WorkflowContext;
import org.openarchitectureware.workflow.issues.Issues;
import org.openarchitectureware.workflow.lib.AbstractWorkflowComponent2;
import org.openarchitectureware.workflow.monitor.ProgressMonitor;

import com.wemove.wcmf.generator.workflow.FileUtil;

/**
 * @author Niko <enikao@users.sourceforge.net>
 */
public class Unzip extends AbstractWorkflowComponent2 {

	protected String zipFile = null;
	protected String targetPath = null;

	public String getZipFile() {
		return zipFile;
	}

	public void setZipFile(String zipFile) {
		this.zipFile = zipFile;
	}

	public String getTargetPath() {
		return targetPath;
	}

	public void setTargetPath(String targetPath) {
		this.targetPath = targetPath;
	}

	@Override
	protected void checkConfigurationInternal(Issues issues) {
		if (Util.isEmpty(this.targetPath))
			issues
					.addError("The required parameter 'targetPath' is missing or empty.");

		if (!Util.isEmpty(this.zipFile)) {
			File file = new File(this.zipFile);
			if (!file.exists())
				issues.addError("The file '" + this.zipFile
						+ "' does not exist.");
		}
	}

	@Override
	protected void invokeInternal(WorkflowContext ctx, ProgressMonitor monitor,
			Issues issues) {
		try {
			File targetDir = new File(this.targetPath).getCanonicalFile();
			File zipFile = new File(this.zipFile);
			if (zipFile.exists()) {
				if (!targetDir.exists()) {
					Logger.debug("Creating target directory: "
							+ targetDir.getAbsolutePath());
					targetDir.mkdir();
				}
				Logger.info("Extracting zip file: " + zipFile);
				FileUtil.unzipDir(targetDir, zipFile);
			}
		} catch (IOException e) {
			issues.addError("Unable to extract zip: " + e.getMessage());
		}
	}
}
