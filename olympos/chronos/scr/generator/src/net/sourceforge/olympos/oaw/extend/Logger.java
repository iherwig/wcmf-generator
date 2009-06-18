/*
 * Copyright (c) 2008 wemove digital solutions. All rights reserved.
 */
package net.sourceforge.olympos.oaw.extend;

/**
 * Logging
 * 
 * @author ingo herwig <ingo@wemove.com>
 */
public class Logger {
	private final static org.apache.log4j.Logger log = org.apache.log4j.Logger
			.getLogger("WCMFGenerator");

	public final static void debug(final Object s) {
		log.debug(s);
	}

	public final static void info(final Object s) {
		log.info(s);
	}

	public final static void warn(final Object s) {
		log.warn(s);
	}

	public final static void error(final Object s) {
		log.error(s);
	}
}
