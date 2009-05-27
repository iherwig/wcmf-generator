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
 * This file was generated by wCMFGenerator 3 from example-data/wcmf/requirements.uml on 2009-05-27 11:47. 
 * Manual modifications should be placed inside the protected regions.
 */
 
// PROTECTED REGION ID(application/include/controller/class.BrowserStatisticsController.php/Import) ENABLED START
require_once (BASE.'wcmf/lib/util/class.SessionData.php');

//require_once ('class.BrowserUtil.php');
// PROTECTED REGION END

/**
 * @class BrowserStatisticsController
 * @ingroup Controller
 * @brief @class BrowserStatisticsController
 * @ingroup Controller
 * @brief Returns CWB statistics data from the current session. 
 * <b>Input actions:</b> - @em loadStatisticsOverview Returns CWB statistics data. 
 * <b>Output actions:</b> - @em failure If a fatal error occurs - @em ok In any other case 
 * @param[out] statistics The statistics data from the current session. 
 * 
 * The following configuration settings are defined for this controller:
 *
 * [actionmapping]
 * ??loadStatisticsOverview = BrowserStatisticsController
 *
 * [views]
 * 
 * @author 
 * @version 1.0
 */
class BrowserStatisticsController 
{
// PROTECTED REGION ID(application/include/controller/class.BrowserStatisticsController.php/Body) ENABLED START
 	private $lastTime = 0;

	private function check($msg)
	{
		$newTime = microtime(true);
	
		//echo $newTime - $this->lastTime, ": $msg<br/ >";
		
		$this->lastTime = $newTime;
	}

	public function executeKernel()
	{
/*
		$this->check("start");
	
		$modelOid = $this->_request->getValue('modelOid');
		$templateParam = $this->_request->getValue('template');
	
		$exportFile = BrowserUtil::runGenerator($modelOid, $templateParam);

		$this->check("exportFile: $exportFile");
	
		//header('Content-type: text/plain');
		header('Content-type: text/json');
	
		readfile($exportFile);
	
		$this->check('File written to output');
	
		BrowserUtil::cleanup();
*/

		$session = &SessionData::getInstance();
		$statisticsData = $session->get('statistics');
		
		$this->_response->setValue('statistics', $statisticsData); 
	
		// success
		$this->_response->setAction('ok');

		return false;
	}

	public function hasView()
	{
		return false;
	}

// PROTECTED REGION END

}
?>
