import java.io.BufferedReader;
import java.io.DataInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStreamReader;

public class delete {

	/**
	 * @param args
	 * @throws IOException
	 */
	public static void main(String[] args) throws IOException {
		String listPath = "delList.ini";
		FileInputStream listStream = new FileInputStream(listPath);
		DataInputStream listData = new DataInputStream(listStream);

		BufferedReader br = new BufferedReader(new InputStreamReader(listData));
		while (true) {
			String file = br.readLine();
			if (file == null) {
				System.exit(0);
			}
			String delPath = "c:\\temp\\" + file;
			File delFile = new File(delPath);
			delFile.delete();
		}
	}
}
