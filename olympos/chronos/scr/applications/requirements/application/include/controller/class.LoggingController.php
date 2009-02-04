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

class LoggingController extends Controller
{
	function hasView()
	{
		return false;
	}

	function executeKernel()
	{
		$logType = $this->_request->getValue('logtype');
		
		switch($logType) {
			case 'trace':
				Message::trace("Front-end message:\n" . $this->_request->getValue('msg'), __FILE__, __LINE__);
				break;
				
			case 'log':
				Message::log("Front-end message:\n" . $this->_request->getValue('msg'), __FILE__, __LINE__);
				break;

			case 'error':
				Message::error("Front-end message:\n" . $this->_request->getValue('msg'), __FILE__, __LINE__);
				break;

			default:
				Message::error('Invalid logtype given: $logType', __FILE__, __LINE__);
		}
	
		//	Success
		return false;
	}
}
?>