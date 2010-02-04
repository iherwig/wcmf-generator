package net.sourceforge.olympos.oaw.extend;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class GrailsService {
	public static int getRuleSetNumber(String name) {
		int result = 0;
		
		Pattern pattern = Pattern.compile("\\[RS([0-9]+)\\]$");
		
		Matcher matcher = pattern.matcher(name);
		
		if (matcher.find()) {
			String resultString = matcher.group(1);
			
			result = Integer.parseInt(resultString);
		}
		
		return result;
	}
}
