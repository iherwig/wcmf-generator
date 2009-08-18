/**
 * 
 */
package net.sourceforge.olympos.oaw.workflow;

import java.io.File;

import org.apache.tools.ant.BuildException;
import org.apache.tools.ant.Project;
import org.apache.tools.ant.ProjectHelper;
import org.apache.tools.ant.listener.Log4jListener;
import org.openarchitectureware.workflow.WorkflowContext;
import org.openarchitectureware.workflow.issues.Issues;
import org.openarchitectureware.workflow.lib.AbstractWorkflowComponent;
import org.openarchitectureware.workflow.monitor.ProgressMonitor;

/**
 * @author nist
 * 
 */
public class AntRunner extends AbstractWorkflowComponent {
	private String antFile = null;

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * org.openarchitectureware.workflow.WorkflowComponent#checkConfiguration
	 * (org.openarchitectureware.workflow.issues.Issues)
	 */
	@Override
	public void checkConfiguration(Issues issues) {
		check(issues);
	}

	public void setAntFile(String antFile) {
		this.antFile = antFile;
	}

	private boolean check(Issues issues) {
		boolean result = true;

		if (antFile != null) {
			if (!isValidFile(antFile)) {
				issues.addError("antFile " + antFile + " is not accessable");
				result = false;
			}
		}

		return result;
	}

	private boolean isValidFile(String filePath) {
		File file = new File(filePath);

		return file.exists() && file.canRead();
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @seeorg.openarchitectureware.workflow.WorkflowComponent#invoke(org.
	 * openarchitectureware.workflow.WorkflowContext,
	 * org.openarchitectureware.workflow.monitor.ProgressMonitor,
	 * org.openarchitectureware.workflow.issues.Issues)
	 */
	@Override
	public void invoke(WorkflowContext context, ProgressMonitor monitor,
			Issues issues) {
		if (!check(issues)) {
			return;
		}

		Project project = new Project();

		File file = new File(antFile);

		project.setUserProperty("ant.file", file.getAbsolutePath());
		project.addBuildListener(new Log4jListener());

		try {
			project.fireBuildStarted();
			project.init();
			project.setBasedir(".");
			ProjectHelper helper = ProjectHelper.getProjectHelper();
			project.addReference("ant.projectHelper", helper);
			helper.parse(project, file);
			project.executeTarget(project.getDefaultTarget());
			project.fireBuildFinished(null);
		} catch (BuildException e) {
			project.fireBuildFinished(e);
		}
	}
}
