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
require_once (BASE.'wcmf/lib/persistence/class.PersistenceFacade.php');

require_once ('class.OawUtil.php');
require_once ('class.UwmUtil.php');
require_once('class.ExportShutdownHandler.php');

class BrowserStatisticsController extends Controller
{
	private $lastTime = 0;

	private function check($msg)
	{
		$newTime = microtime(true);
	
		//echo $newTime - $this->lastTime, ": $msg<br/ >";
		
		$this->lastTime = $newTime;
	}

	public function execute()
	{
		$this->check("start");
	
		$workingDir = OawUtil::tempName();
		mkdir($workingDir);
	
		$tmpUwmExportPath = "$workingDir/cwm-source.xml";
		touch($tmpUwmExportPath);
	
		$modelOid = $this->_request->getValue('modelOid');
	
		UwmUtil::exportXml($tmpUwmExportPath, $modelOid, null);
	
		OawUtil::setupExecutable();
		
		$propertyPath = "$workingDir/browserStatistics.properties";
		$propertyFile = fopen($propertyPath, 'w');
		fwrite($propertyFile, "workingDir = $workingDir\n");
		fclose($propertyFile);
	
		$exportFile = $this->createTempFile("$workingDir/browserStatistics.json");
	
		//header('Content-type: text/plain');
		header('Content-type: text/json');
	
		$this->check("start generator");
	
		$runCfg = OawUtil::runOaw($propertyPath, 'workflow/browserStatistics.oaw');
	
		$this->check('Generator finished');
	
		if (filesize($exportFile) == 0) {
			$this->check('Zero return file size');
			
			return false;
		}
		
		readfile($exportFile);
	
		$this->check('File written to output');

		unlink($exportFile);
		unlink($propertyPath);
		unlink($tmpUwmExportPath);
		rmdir($workingDir);

		ExportShutdownHandler::success();

		$this->check("finished");
	
		return false;
	}

	public function hasView()
	{
		return false;
	}

	private function createTempFile($path) {
		touch($path);
		chmod($path, 0777);
	
		return $path;
	}

}

?>