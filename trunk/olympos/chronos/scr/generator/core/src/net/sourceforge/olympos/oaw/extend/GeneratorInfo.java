package net.sourceforge.olympos.oaw.extend;

import java.io.FileReader;
import java.io.IOException;
import java.util.Properties;

public class GeneratorInfo {
	private static String version = "UNKNONW_VERSION";
	private static String build = "UNKNOWN_BUILD";
	
	private static boolean infoRead = false;
	
	private static final String PROPERTY_FILE_PATH = "build.info";
	
	public static String getVersion() {
		readInfo();
		
		return version;
	}
	
	public static String getBuild() {
		readInfo();
		
		return build;
	}
	
	private static void readInfo() {
		if (!infoRead) {
			try {
				Properties properties = new Properties();
				
				properties.load(new FileReader(PROPERTY_FILE_PATH));
				
				version = (String) properties.get("version");
				build = (String) properties.get("build");
			} catch (IOException e) {
				Logger.error(e);
			}
			
			infoRead = true;
		}
	}
}
