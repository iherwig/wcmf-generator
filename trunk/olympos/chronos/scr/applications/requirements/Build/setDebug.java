import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.DataInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStreamReader;

public class setDebug {

	/**
	 * @param args
	 * @throws IOException
	 */
	public static void main(String[] args) throws IOException {
		String configPath = "c:\\temp\\gui\\js\\uwm\\Config.js";
		String targetPath = "c:\\temp\\gui\\js\\uwm\\ConfigNew.js";
		FileInputStream configStream = new FileInputStream(configPath);
		DataInputStream configData = new DataInputStream(configStream);

		BufferedReader br = new BufferedReader(
				new InputStreamReader(configData));
		
		File targetFile=new File(targetPath);
		FileWriter writer=new FileWriter(targetFile);
		BufferedWriter bw=new BufferedWriter(writer);
		while (true) {
			String line = br.readLine();
			if (line == null) {
				bw.close();
				System.exit(0);
			}
				if (line.replaceAll("\t", "").replaceAll(" ", "").startsWith(
						"uwm.Config.debug=")) {
					line = "uwm.Config.debug = false;";
				}
			
			if (line.replaceAll("\t", "").replaceAll(" ", "").startsWith("uwm.Config.defaultLogin")){
				line="uwm.Config.defaultLogin=\"\"";
			}
			if (line.replaceAll("\t", "").replaceAll(" ", "").startsWith("uwm.Config.defaultPassword")){
				line="uwm.Config.defaultPassword=\"\"";
			}
			bw.write(line);
			bw.newLine();
		}
	}
}
