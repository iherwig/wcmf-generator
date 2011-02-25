package net.cmp4oaw.openofficeconverter;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.channels.FileChannel;

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
		
		File inputFile = new File(getInputFile());
		File outputFile = new File(getOutputFile());
		
		// Only start the Converter if a file conversion is necassery (Currently only for Word Export)
		if(!getFileExtension(getInputFile()).equalsIgnoreCase(getFileExtension(getOutputFile()))) {
			
			OpenOfficeConnection connection = new SocketOpenOfficeConnection();
			OpenOfficeDocumentConverter converter = new OpenOfficeDocumentConverter(
					connection);
	
			converter.convert(inputFile, outputFile);
			
			connection.disconnect();
			
		}
		else {
			FileChannel inputChannel = null;
			FileChannel outputChannel = null;
			try {
				inputChannel = new FileInputStream(inputFile).getChannel();
				outputChannel = new FileOutputStream(outputFile).getChannel();
				outputChannel.transferFrom(inputChannel, 0, inputChannel.size());
			} catch (FileNotFoundException e) {
				arg2.addError("File not found: " + e.getMessage());
			} catch (IOException e) {
				arg2.addError("Could npt copy file: " + e.getMessage());
			}
			finally {
				if (inputChannel != null) {
					try {
						inputChannel.close();
					} catch (IOException e) {
						arg2.addError("Could not close input channel: " + e.getMessage());
					}
				}
				if (outputChannel != null) {
					try {
						outputChannel.close();
					} catch (IOException e) {
						arg2.addError("Could not close input channel: " + e.getMessage());
					}
				}
			}
		}
		
	}
	
	private String getFileExtension(String filename) {
		return filename.substring(filename.lastIndexOf("."));
	}
	
}
