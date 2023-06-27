/*
 * Copyright (c) 2008 The Olympos Development Team.
 * 
 * http://sourceforge.net/projects/olympos/
 *
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html. If redistributing this code,
 * this entire header must remain intact.
 */

package net.sourceforge.olympos.oaw.extend;

import java.text.SimpleDateFormat;
import java.util.Date;

public class DateFormatter {
	public final static String DEFAULT_FORMAT = "yyyy-MM-dd HH:mm";

	public static String now() {
		return DateFormatter.now(DateFormatter.DEFAULT_FORMAT);
	}

	public static String now(String format) {
		return new SimpleDateFormat(format).format(new Date());
	}
}
