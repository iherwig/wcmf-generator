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
 * This file was generated by wCMFGenerator 3.0.0017 from requirements.uml on Tue Nov 03 20:20:45 CET 2009. 
 * Manual modifications should be placed inside the protected regions.
 */
 require_once(BASE."wcmf/lib/presentation/class.Controller.php");
// PROTECTED REGION ID(application/include/controller/class.AllBrowserStatisticsController.php/Import) ENABLED START

require_once ('class.OawUtil.php');
require_once ('class.UwmUtil.php');
require_once ('class.ExportShutdownHandler.php');

// PROTECTED REGION END

/**
 * @class AllBrowserStatisticsController
 * @ingroup Controller
 * @brief @class AllBrowserStatisticsController
 * @ingroup Controller
 * @brief Generates UML out of the passed model, runs all CWB statistics, and saves the results in the current session. 
 * <b>Input actions:</b> - @em loadAllStatisticsOverview Loads all statistics data into the current session. 
 * <b>Output actions:</b> - @em failure If a fatal error occurs - @em ok In any other case 
 * @param[in] modelOid The OID of the model to generate statistical Data for. 
 * 
 * The following configuration settings are defined for this controller:
 *
 * [actionmapping]
 * ??loadAllStatisticsOverview = AllBrowserStatisticsController
 *
 * [views]
 * 
 * @author 
 * @version 1.0
 */
class AllBrowserStatisticsController extends Controller
{
// PROTECTED REGION ID(application/include/controller/class.AllBrowserStatisticsController.php/Body) ENABLED START
	private $lastTime = 0;

	private function check($msg)
	{
		$newTime = microtime(true);
		Log::debug(($newTime-$this->lastTime).": $msg", __CLASS__);
		$this->lastTime = $newTime;
	}

	public function executeKernel()
	{
		$this->check("start");
	
		$modelOid = $this->_request->getValue('modelOid');
	
		$exportFiles = $this->runGenerator($modelOid);
	
		include ($exportFiles['statistics']);
	
		$session = & SessionData::getInstance();
		$session->set('statistics', $statisticsData);
	
		include ($exportFiles['barchart']);
		$session->set('barchart', $barchartData);
		
		include($exportFiles['piechart']);
		$session->set('piechart', $piechartData);
	
		$this->cleanup();
	
		$this->_response->setValue('statistics', $statisticsData);
		$this->_response->setValue('barchart', $barchartData);
	
		return false;
	}

	public function hasView()
	{
		return false;
	}

	private function runGenerator($modelOid)
	{
		$this->workingDir = OawUtil::tempName();
		$this->statisticsDir = $this->workingDir.'/statistics';
		$this->barchartDir = $this->workingDir.'/barchart';
		$this->piechartDir = $this->workingDir.'/piechart';
	
		
		mkdir($this->workingDir);
		mkdir($this->statisticsDir);
		mkdir($this->barchartDir);
		mkdir($this->piechartDir);
	
		$umlPath = OawUtil::tempName();
		$tmpUwmExportPath = $this->workingDir.'/cwm-source.xml';
	
		OawUtil::setupExecutable();
	
		$propertyPath = $this->workingDir.'/browserStatistics.properties';
		$propertyFile = fopen($propertyPath, 'w');
		fwrite($propertyFile, 'workingDir = '.$this->workingDir."\n");
		fwrite($propertyFile, "umlFile = $umlPath\n");
		fclose($propertyFile);
	
		$this->statisticsFile = OawUtil::createTempFile($this->statisticsDir.'/browser.dat');
		$this->barchartFile = OawUtil::createTempFile($this->barchartDir.'/browser.dat');
		$this->piechartFile = OawUtil::createTempFile($this->piechartDir.'/browser.dat');
	
		UwmUtil::exportXml($tmpUwmExportPath, $modelOid);
	
		$runCfg = OawUtil::runOaw($propertyPath, 'cartridge/BrowserStatistics/workflow/allInOne.oaw');
	
		unlink($propertyPath);
		unlink($umlPath);
	
		ExportShutdownHandler::success();
	
		return array ('statistics'=>$this->statisticsFile, 'barchart'=>$this->barchartFile, 'piechart'=>$this->piechartFile);
	}

	private function cleanup() {
		unlink($this->piechartFile);
		unlink($this->barchartFile);
		unlink($this->statisticsFile);
		rmdir($this->piechartDir);
		rmdir($this->barchartDir);
		rmdir($this->statisticsDir);
		rmdir($this->workingDir);
	}

// PROTECTED REGION END

}
?>
