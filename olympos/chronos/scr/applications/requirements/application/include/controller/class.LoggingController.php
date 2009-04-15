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

require_once (BASE."wcmf/lib/presentation/class.Controller.php");

/**
 * @class LoggingController
 * @ingroup Controller
 * @brief Logs a message from the front-end to application log. 
 * 
 * <b>Input actions:</b>
 * - @em log Logs a message to application log.
 *
 * <b>Output actions:</b>
 * - @em failure If a fatal error occurs
 * - @em ok In any other case
 * 
 * @param[in] logtype The log level (one of <tt>trace</tt>, <tt>log</tt>, <tt>error</tt>).
 * @param[in] msg The log message.
 * 
 * @author 	Niko <enikao@users.sourceforge.net>
 */
class LoggingController extends Controller
{
	function hasView()
	{
		return false;
	}

	function executeKernel()
	{
		$logType = $this->_request->getValue('logtype');

		$logger = LoggerManager::getLogger('LoggingController');
		
		switch($logType) {
			case 'trace':
				$logger->trace("Front-end message:\n" . $this->_request->getValue('msg'), __FILE__, __LINE__);
				break;
				
			case 'log':
				$logger->log("Front-end message:\n" . $this->_request->getValue('msg'), __FILE__, __LINE__);
				break;

			case 'error':
				$logger->error("Front-end message:\n" . $this->_request->getValue('msg'), __FILE__, __LINE__);
				break;

			default:
				$logger->error('Invalid logtype given: $logType', __FILE__, __LINE__);
		}
	
		//	Success
		return false;
	}
}
?>