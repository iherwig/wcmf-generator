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

require_once (BASE.'wcmf/lib/presentation/class.Controller.php');

require_once ('class.OawUtil.php');
require_once ('class.UwmUtil.php');
require_once ('class.ExportShutdownHandler.php');

class AllBrowserStatisticsController extends Controller
{
	private $lastTime = 0;

	private function check($msg)
	{
		$newTime = microtime(true);
	
		//echo $newTime - $this->lastTime, ": $msg<br/ >";
		
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
	
		
		mkdir($this->workingDir);
		mkdir($this->statisticsDir);
		mkdir($this->barchartDir);
	
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
	
		UwmUtil::exportXml($tmpUwmExportPath, $modelOid, null);
	
		$runCfg = OawUtil::runOaw($propertyPath, 'cartridge/BrowserStatistics/workflow/allInOne.oaw');
	
		unlink($propertyPath);
		unlink($umlPath);
	
		ExportShutdownHandler::success();
	
		return array ('statistics'=>$this->statisticsFile, 'barchart'=>$this->barchartFile);
	}

	private function cleanup() {
		unlink($this->barchartFile);
		unlink($this->statisticsFile);
		rmdir($this->barchartDir);
		rmdir($this->statisticsDir);
		rmdir($this->workingDir);
	}

}

