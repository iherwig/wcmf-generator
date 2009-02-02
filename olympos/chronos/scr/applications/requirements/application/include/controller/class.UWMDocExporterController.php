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

require_once (BASE . 'wcmf/lib/presentation/class.Controller.php');
require_once (BASE . 'wcmf/lib/persistence/class.PersistenceFacade.php');

require_once ('class.OawUtil.php');
require_once ('class.UwmUtil.php');

class UWMDocExporterController extends Controller
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
	
		$tmpUwmExportPath = "$workingDir/uwm-export.xml";
		touch($tmpUwmExportPath);
		
		$startModel = $this->_request->getValue('startModel');
		$startPackage = $this->_request->getValue('startPackage');

		UwmUtil::exportXml($tmpUwmExportPath, $startModel, $startPackage);
		
		OawUtil::setupExecutable();
		
		$propertyPath = "$workingDir/doc-export.properties";
		$propertyFile = fopen($propertyPath, 'w');
		fwrite($propertyFile, "workingDir = $workingDir\n");
		fclose($propertyFile);
		
		$contentPath = "$workingDir/content.xml";
		touch($contentPath);

		$openofficePath = "$workingDir/openoffice-export.odt";
		touch($openofficePath);
		chmod($openofficePath, 0777);
		
		$exportFile = "$workingDir/uwm-export.doc";
		touch($exportFile);
		chmod($exportFile, 0777);

		//header('Content-type: text/plain');
		header('Content-type: application/octet-stream');
		header('Content-Disposition: attachment; filename="uwm-export.doc"');

		$this->check("start generator");
	
		$runCfg = OawUtil::runOaw($propertyPath, 'templates/uwm/doc/openoffice.oaw');
		
		$this->check('Generator finished');
		
		
		readfile($exportFile);
		
		$this->check('File written to output');

		unlink($exportFile);
		unlink($openofficePath);
		unlink($contentPath);
		unlink($propertyPath);
		unlink($tmpUwmExportPath);
		rmdir($workingDir);
		
		$this->check("finished");
	
		return false;
	}

	public function hasView()
	{
		return false;
	}

}

?>