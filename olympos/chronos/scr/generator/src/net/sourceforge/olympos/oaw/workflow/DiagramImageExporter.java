/**
 * 
 */
package net.sourceforge.olympos.oaw.workflow;

import java.io.File;
import java.io.IOException;

import net.sourceforge.olympos.diagramimageexporter.SVGGenerator;

import org.eclipse.mwe.emf.Writer;
import org.openarchitectureware.workflow.WorkflowContext;
import org.openarchitectureware.workflow.issues.Issues;
import org.openarchitectureware.workflow.lib.AbstractWorkflowComponent;
import org.openarchitectureware.workflow.monitor.ProgressMonitor;

/**
 * @author ingo <iherwig@users.sourceforge.net>
 */
public class DiagramImageExporter extends AbstractWorkflowComponent {
	protected String sourceFile = null;
	protected String targetDir = null;
	protected String iconDir = null;

	public void setSourceFile(final String sourceFile) {
		this.sourceFile = sourceFile;
	}

	public void setTargetDir(final String targetDir) {
		this.targetDir = targetDir;
	}

	public void setIconDir(final String iconDir) {
		this.iconDir = iconDir;
	}

	@Override
	public void checkConfiguration(Issues issues) {
		check(issues);
	}

	private boolean check(Issues issues) {
		boolean result = true;

		if (sourceFile != null) {
			if (!isValidFile(sourceFile)) {
				issues.addError("sourceFile " + sourceFile + " is not accessible");
				result = false;
			}
		} else {
			issues.addError("No sourceFile given");
			result = false;
		}

		if (targetDir == null) {
			issues.addError("No targetDir given");
			result = false;
		}

		if (iconDir != null) {
			if (!isValidDirectory(iconDir)) {
				issues.addError("iconDir " + iconDir + " is not accessible");
				result = false;
			}
		} else {
			issues.addError("No iconDir given");
			result = false;
		}

		return result;
	}

	private boolean isValidFile(String fileName) {
		File file = new File(fileName);
		return file.exists() && file.isFile() && file.canRead();
	}

	private boolean isValidDirectory(String directoryName) {
		File file = new File(directoryName);
		return file.exists() && file.isDirectory() && file.canRead();
	}

	@Override
	public void invoke(WorkflowContext context, ProgressMonitor monitor, Issues issues) {
		if (!check(issues)) {
			return;
		}

		try {
			SVGGenerator.generateImages(sourceFile, targetDir, iconDir);
		} catch (Exception e) {
			java.io.StringWriter sw = new java.io.StringWriter();
			java.io.PrintWriter pw = new java.io.PrintWriter(sw);
            e.printStackTrace(pw);
            pw.close();
            try {
				sw.close();
			} catch (IOException e1) {
				// ignore
			}
			issues.addError("Exception occured!\n" + sw.toString());
		}
	}
}
