package net.sourceforge.olympos.oaw.workflow;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;
import java.util.zip.ZipOutputStream;

import org.openarchitectureware.workflow.WorkflowContext;
import org.openarchitectureware.workflow.issues.Issues;
import org.openarchitectureware.workflow.lib.AbstractWorkflowComponent;
import org.openarchitectureware.workflow.monitor.ProgressMonitor;

public class AddToZip extends AbstractWorkflowComponent {
	protected String sourceFile = null;
	protected String targetFile = null;
	protected String fileToAdd = null;
	protected String newEntry = null;

	public void setSourceFile(final String sourceFile) {
		this.sourceFile = sourceFile;
	}

	public void setTargetFile(final String targetFile) {
		this.targetFile = targetFile;
	}

	public void setNewEntry(final String newEntry) {
		this.newEntry = newEntry;
	}

	public void setFileToAdd(final String fileToAdd) {
		this.fileToAdd = fileToAdd;
	}

	@Override
	public void checkConfiguration(Issues issues) {
		check(issues);
	}

	private boolean check(Issues issues) {
		boolean result = true;

		if (sourceFile != null) {
			if (!isValidFile(sourceFile)) {
				issues.addError("SourceFile " + sourceFile
						+ " is not accessable");
				result = false;
			}
		} else {
			issues.addError("No SourceFile given");
			result = false;
		}

		if (targetFile == null) {
			issues.addError("No TargetFile given");
			result = false;
		}

		if (fileToAdd != null) {
			if (!isValidFile(fileToAdd)) {
				issues
						.addError("FileToAdd " + fileToAdd
								+ " is not accessable");
				result = false;
			}
		} else {
			issues.addError("No FileToAdd given");
			result = false;
		}

		if (newEntry == null) {
			issues.addError("No NewEntry given");
		}

		return result;
	}

	private boolean isValidFile(String filePath) {
		File file = new File(filePath);

		return file.exists() && file.canRead();
	}

	@Override
	public void invoke(WorkflowContext context, ProgressMonitor monitor,
			Issues issues) {
		if (!check(issues)) {
			return;
		}

		try {
			byte[] buf = new byte[0xFFFF];

			ZipInputStream zin = new ZipInputStream(new FileInputStream(
					sourceFile));
			ZipOutputStream out = new ZipOutputStream(new FileOutputStream(
					targetFile));

			ZipEntry entry = zin.getNextEntry();
			while (entry != null) {
				// Add ZIP entry to output stream.
				out.putNextEntry(new ZipEntry(entry.getName()));
				// Transfer bytes from the ZIP file to the output file
				int len;
				while ((len = zin.read(buf)) > 0) {
					out.write(buf, 0, len);
				}
				entry = zin.getNextEntry();
			}
			// Close the streams
			zin.close();

			// Compress the files
			File file = new File(fileToAdd);

			InputStream in = new FileInputStream(file);
			// Add ZIP entry to output stream.
			out.putNextEntry(new ZipEntry(newEntry));
			// Transfer bytes from the file to the ZIP file
			int len;
			while ((len = in.read(buf)) > 0) {
				out.write(buf, 0, len);
			}
			// Complete the entry
			out.closeEntry();
			in.close();

			// Complete the ZIP file
			out.close();
		} catch (Exception e) {
			issues.addError("Exception occured!\n" + e.getMessage());
		}
	}
}
