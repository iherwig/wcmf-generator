package net.sourceforge.olympos.oaw.extend;

import org.eclipse.uml2.uml.LiteralUnlimitedNatural;

public class Multiplicity {
	public static Integer getLower(String str) {
		Integer result = 1;

		if (str != null) {
			str = str.trim();

			if (str.equals("*")) {
				result = 0;
			} else if (str.contains("..")) {
				String firstPart = str.substring(0, str.indexOf(".."));

				result = Integer.parseInt(firstPart);
			} else {
				result = Integer.parseInt(str);
			}
		}

		return result;
	}

	public static Integer getUpper(String str) {
		Integer result = 1;

		if (str != null) {
			str = str.trim();

			if (str.equals("*")) {
				result = LiteralUnlimitedNatural.UNLIMITED;
			} else if (str.contains("..")) {
				String secondPart = str.substring(str.indexOf("..") + 2);

				if (secondPart.trim().equals("*")) {
					result = LiteralUnlimitedNatural.UNLIMITED;
				} else {
					result = Integer.parseInt(secondPart);
				}
			} else {
				result = Integer.parseInt(str);
			}
		}

		return result;
	}
}
