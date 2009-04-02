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

class UWMDocExporterController extends Controller
{
	private $lastTime = 0;

	private $availableFormats = array('doc', 'odt', 'pdf');
	const DEFAULT_EXPORT_FORMAT = 'doc';
	
	private $availableTemplates = array('standard', 'SteckbriefeFunktionenMoma');
	const DEFAULT_TEMPLATE_NAME = 'standard';

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
	
		$startModel = $this->_request->getValue('startModel');
		$startPackage = $this->_request->getValue('startPackage');
	
		UwmUtil::exportXml($tmpUwmExportPath, $startModel, $startPackage);
	
		OawUtil::setupExecutable();
		
		$exportFormatParam = $this->_request->getValue('exportFormat');
		if (array_search($exportFormatParam, $this->availableFormats)) {
			$exportFormat = $exportFormatParam;
		} else {
			$exportFormat = self::DEFAULT_EXPORT_FORMAT;
		}
		
		$templateNameParam = $this->_request->getValue('templateName');
		if (array_search($templateNameParam, $this->availableTemplates)) {
			$templateName = $templateNameParam;
		} else {
			$templateName = self::DEFAULT_TEMPLATE_NAME;
		}		
	
		$propertyPath = "$workingDir/doc-export.properties";
		$propertyFile = fopen($propertyPath, 'w');
		fwrite($propertyFile, "workingDir = $workingDir\n");
		fwrite($propertyFile, "templateName = $templateName\n");
		fwrite($propertyFile, "exportFormat = $exportFormat\n");
		fclose($propertyFile);
	
		$contentPath = $this->createTempFile("$workingDir/content.xml");
		$stylesPath = $this->createTempFile("$workingDir/styles.xml");
		$openofficeTmp0Path = $this->createTempFile("$workingDir/document-tmp0.odt");
		$openofficePath = $this->createTempFile("$workingDir/document-tmp1.odt");
		$exportFile = $this->createTempFile("$workingDir/document-export.$exportFormat");
	
		//header('Content-type: text/plain');
		header('Content-type: application/octet-stream');
		header('Content-Disposition: attachment; filename="cwm-export.doc"');
	
		$this->check("start generator");
	
		$runCfg = OawUtil::runOaw($propertyPath, 'cartridge/DocumentGeneration/workflow/cwm2word.oaw');
	
		$this->check('Generator finished');
	
		if (filesize($exportFile) == 0) {
			$this->check('Zero return file size');
			
			return false;
		}
		
		readfile($exportFile);
	
		$this->check('File written to output');

		unlink($exportFile);
		unlink($openofficePath);
		unlink($openofficeTmp0Path);
		unlink($stylesPath);
		unlink($contentPath);
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