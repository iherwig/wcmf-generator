<?php
/*
 * Copyright (c) 2009 The Olympos Development Team.
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
 * This file was generated by wCMFGenerator 3.0.0017 from requirements.uml on Wed Sep 02 14:12:02 CEST 2009. 
 * Manual modifications should be placed inside the protected regions.
 */
 require_once(BASE."wcmf/lib/presentation/class.Controller.php");
// PROTECTED REGION ID(application/include/controller/class.LoggingController.php/Import) ENABLED START
// PROTECTED REGION END

/**
 * @class LoggingController
 * @ingroup Controller
 * @brief @class LoggingController
 * @ingroup Controller
 * @brief Logs a message from the front-end to application log. 
 * <b>Input actions:</b> - @em log Logs a message to application log. 
 * <b>Output actions:</b> - @em failure If a fatal error occurs - @em ok In any other case 
 * @param[in] logtype The log level (one of &lt;tt&gt;trace&lt;/tt&gt;, &lt;tt&gt;log&lt;/tt&gt;, &lt;tt&gt;error&lt;/tt&gt;).
 * @param[in] msg The log message. 
 * 
 * The following configuration settings are defined for this controller:
 *
 * [actionmapping]
 * ??log = LoggingController
 *
 * [views]
 * 
 * @author 
 * @version 1.0
 */
class LoggingController extends Controller
{
// PROTECTED REGION ID(application/include/controller/class.LoggingController.php/Body) ENABLED START
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

// PROTECTED REGION END

}
?>