<?php
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

/**
 * @class ExportShutdownHandler
 * @brief Returns an error on premature shutdown (e. g. timeout). 
 * 
 * @author 	Niko <enikao@users.sourceforge.net>
 */
class ExportShutdownHandler {
	private static $error = true;

	public static function success() {
		self::$error = false;
	}

	static function checkShutdownError() {
		if (self::$error) {
			header('Content-type: text/html');
			header('Content-Disposition: ');
		
			echo '{success: false}';
		}
	}

}

register_shutdown_function('ExportShutdownHandler::checkShutdownError');

?>