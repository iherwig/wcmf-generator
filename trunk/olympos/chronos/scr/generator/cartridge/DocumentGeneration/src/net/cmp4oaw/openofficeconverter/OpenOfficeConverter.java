package net.cmp4oaw.openofficeconverter;

import java.io.File;

import org.openarchitectureware.workflow.WfCHelper;
import org.openarchitectureware.workflow.WorkflowContext;
import org.openarchitectureware.workflow.issues.Issues;
import org.openarchitectureware.workflow.lib.AbstractWorkflowComponent;
import org.openarchitectureware.workflow.monitor.ProgressMonitor;

import com.artofsolving.jodconverter.openoffice.connection.OpenOfficeConnection;
import com.artofsolving.jodconverter.openoffice.connection.SocketOpenOfficeConnection;
import com.artofsolving.jodconverter.openoffice.converter.OpenOfficeDocumentConverter;

public class OpenOfficeConverter extends AbstractWorkflowComponent {

	private String inputFile;
	private String outputFile;

	public String getInputFile() {
		return inputFile;
	}

	public void setInputFile(String inputFile) {
		this.inputFile = inputFile;
	}

	public String getOutputFile() {
		return outputFile;
	}

	public void setOutputFile(String outputFile) {
		this.outputFile = outputFile;
	}

	public void checkConfiguration(Issues arg0) {
		if (getInputFile() == null || !WfCHelper.isLegalFile(getInputFile())
				|| getOutputFile() == null)
			arg0
					.addError("OpenOfficeConverter: Input- or OutputFile not set correctly.");
	}

	public void invoke(WorkflowContext arg0, ProgressMonitor arg1, Issues arg2) {
		OpenOfficeConnection connection = new SocketOpenOfficeConnection();
		OpenOfficeDocumentConverter converter = new OpenOfficeDocumentConverter(
				connection);

		converter.convert(new File(getInputFile()), new File(getOutputFile()));
		
		connection.disconnect();
	}

}
