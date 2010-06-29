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
 * This file was generated by wCMFGenerator 3.0.0018 from requirements.uml on Tue Jun 29 10:44:01 CEST 2010. 
 * Manual modifications should be placed inside the protected regions.
 */
 require_once(BASE."wcmf/application/controller/class.BatchController.php");
// PROTECTED REGION ID(application/include/controller/class.UWMDocExporterController.php/Import) ENABLED START
require_once (BASE.'wcmf/lib/persistence/class.PersistenceFacade.php');
require_once (BASE.'wcmf/lib/util/class.FileUtil.php');

require_once('class.TemplateListController.php');

require_once ('class.OawUtil.php');
require_once ('class.UwmUtil.php');
// PROTECTED REGION END

/**
 * @class UWMDocExporterController
 * @ingroup Controller
 * @brief Generates documentation out of the passed model, and returns the documentation file. 
 * 
 * <b>Input actions:</b> 
 * - @em exportDoc Generates a documentation file. 
 * 
 * <b>Output actions:</b> 
 * - @em failure If a fatal error occurs 
 * 
 * @param[in] startOid The OID of the node to generate UML for.
 * @param[in] exportFormat The format to export documentation in, must be one of $this-&amp;gt;availableFormats.
 * @param[in] diagramFormat The format for exporting diagram content (normal, virtual)
 * @param[in] templateName The template to export. 
 * 
 * The following configuration settings are defined for this controller:
 *
 * [actionmapping]
 * UWMDocExporterController??done = TerminateController
 * ??exportDoc = UWMDocExporterController
 * UWMDocExporterController??continue = UWMDocExporterController
 *
 * [views]
 * 
 * @author 
 * @version 1.0
 */
class UWMDocExporterController extends BatchController
{
// PROTECTED REGION ID(application/include/controller/class.UWMDocExporterController.php/Body) ENABLED START
	// session name constants
	private $PARAM_START_OID = 'UWMDocExporterController.startOid';
	private $PARAM_EXPORT_FORMAT = 'UWMDocExporterController.exportFormat';
	private $PARAM_DIAGRAM_FORMAT = 'UWMDocExporterController.diagramFormat';
	private $PARAM_TEMPLATE_NAME = 'UWMDocExporterController.templateName';
	private $PARAM_LANGUAGE = 'UWMDocExporterController.language';
	
	private $TEMP_WORKING_DIR = 'UWMDocExporterController.workingDiw';
	private $TEMP_EXPORT_FILE = 'UWMDocExporterController.exportFile';

	private $PROBLEM_REPORT = 'UWMDocExporterController.problemReport';
	
	private $availableFormats = array('doc', 'odt', 'pdf');
	const DEFAULT_EXPORT_FORMAT = 'doc';
	
	const DEFAULT_TEMPLATE_NAME = 'standard';
	
	const DEFAULT_INPUT_TYPE = 'odt';

	private $lastTime = 0;
	private function check($msg)
	{
		$newTime = microtime(true);
		Log::debug(($newTime - $this->lastTime).": $msg", __CLASS__);
		$this->lastTime = $newTime;
	}

	/**
	 * @see Controller::initialize()
	 */
	function initialize(&$request, &$response)
	{
		parent::initialize($request, $response);

		// get initial request parameters
		if ($request->getAction() != 'continue')
		{
			$session = &SessionData::getInstance();
			$session->set($this->PARAM_START_OID, $request->getValue('startOid'));
			$session->set($this->PARAM_EXPORT_FORMAT, $request->getValue('exportFormat'));
			$session->set($this->PARAM_DIAGRAM_FORMAT, $request->getValue('diagramFormat'));
			$session->set($this->PARAM_TEMPLATE_NAME, $request->getValue('templateName'));
			if ($this->isLocalizedRequest()) {
				$session->set($this->PARAM_LANGUAGE, $request->getValue('language'));
			}
			// clear the problem report
			$report = '';
			$session->set($this->PROBLEM_REPORT, $report);
		}
	}

	/**
	 * @see Controller::hasView()
	 */
	function hasView()
	{
		// alwas return false, because we call this controller only using ajax
		return false;
	}

	/**
	 * @see BatchController::getWorkPackage()
	 */
	function getWorkPackage($number)
	{
		if ($number == 0)
		{
			return array('name' => 'Export the model to XML', 'size' => 1, 'oids' => array(0), 'callback' => 'exportXML');
		}
		elseif ($number == 1)
		{
			return array('name' => 'Run the generator', 'size' => 1, 'oids' => array(0), 'callback' => 'runOAW');
		}
		elseif ($number == 2)
		{
			return array('name' => 'Clean up', 'size' => 1, 'oids' => array(0), 'callback' => 'finish');
		}
		else
			return null;
	}
	/**
	 * @see LongTaskController::getSummaryText()
	 */
	function getSummaryText()
	{
		$session = &SessionData::getInstance();
		return $session->get($this->PROBLEM_REPORT);
	}
	/**
	 * Export the given model to XML
	 * @param oids The oids to process
	 * @note This is a callback method called on a matching work package @see BatchController::addWorkPackage()
	 */
	function exportXML($oids)
	{
		require_once ('class.ExportShutdownHandler.php');
		$session = &SessionData::getInstance();

		// set the export path
		$workingDir = OawUtil::tempName();
		$session->set($this->TEMP_WORKING_DIR, $workingDir);
		mkdir($workingDir);

		$tmpUwmExportPath = "$workingDir/cwm-source.xml";
		touch($tmpUwmExportPath);

		// do the export
		$startOid = $session->get($this->PARAM_START_OID);
		$language = $session->get($this->PARAM_LANGUAGE);
		$diagramFormat = $session->get($this->PARAM_DIAGRAM_FORMAT);
		$virtualPackages = ($diagramFormat == 'virtual');
		$this->check("start exportXML: node:".$startOid);

		$problemReport = UwmUtil::exportXml($tmpUwmExportPath, $startOid, $language, $virtualPackages);
		$this->check("finished exportXML");

		// update the problem report
		if (strlen($problemReport) > 0) {
			$report = $session->get($this->PROBLEM_REPORT)."".$problemReport."\n";
			Log::error($report, __CLASS__);
			$session->set($this->PROBLEM_REPORT, $report);
		}
		ExportShutdownHandler::success();
	}
	/**
	 * Run the gererator
	 * @param oids The oids to process
	 * @note This is a callback method called on a matching work package @see BatchController::addWorkPackage()
	 */
	function runOAW($oids)
	{
		require_once ('class.ExportShutdownHandler.php');
		$session = &SessionData::getInstance();

		OawUtil::setupExecutable();
		
		// select the template
		$templateNameParam = $session->get($this->PARAM_TEMPLATE_NAME);
		
		$templates = TemplateListController::getContent();
		$templateInfo = null;
		
		if (array_key_exists($templateNameParam, $templates)) {
			$templateName = $templateNameParam;
			$templateInfo = $templates[$templateName];
		} else {
			$templateName = self::DEFAULT_TEMPLATE_NAME;
		}
		$session->set($this->PARAM_TEMPLATE_NAME, $templateName);
		
		//select the input type
		if (!$templateInfo['inputType']) {
			$inputType = self::DEFAULT_INPUT_TYPE;
		} else {
			$inputType = $templateInfo['inputType'];
		}
		
		// select the export format
		if (!$templateInfo['forcedResultType']) {
			$exportFormatParam = $session->get($this->PARAM_EXPORT_FORMAT);
			if (array_search($exportFormatParam, $this->availableFormats) !== false) {
				$exportFormat = $exportFormatParam;
			} else {
				$exportFormat = self::DEFAULT_EXPORT_FORMAT;
			}
		} else {
			$exportFormat = $templateInfo['forcedResultType'];
		}
		$session->set($this->PARAM_EXPORT_FORMAT, $exportFormat);
		
		// create the configuration file
		$workingDir = $session->get($this->TEMP_WORKING_DIR);
		$propertyPath = "$workingDir/doc-export.properties";
		$propertyFile = fopen($propertyPath, 'w');
		fwrite($propertyFile, "workingDir = $workingDir\n");
		fwrite($propertyFile, "templateName = $templateName\n");
		fwrite($propertyFile, "inputType = $inputType\n");
		fwrite($propertyFile, "exportFormat = $exportFormat\n");
		fwrite($propertyFile, 'exportImages = ' . ($templateInfo['exportImages'] ? 'true' : 'false') . "\n");
		fclose($propertyFile);

		//Create empty Diagram.xml in case we don't run DiagramImageExporter
		$diagramPath = "$workingDir/Diagram.xml";
		$diagramFile = fopen($diagramPath, 'w');
		fwrite($diagramFile, '<?xml version="1.0" encoding="UTF-8"?><diagramExport/>');
		fclose($diagramFile);
			
		$this->createTempFile("$workingDir/content.xml");
		$this->createTempFile("$workingDir/styles.xml");
		$this->createTempFile("$workingDir/manifest.xml");
		$this->createTempFile("$workingDir/document-tmp.$inputType");
		$exportFile = $this->createTempFile("$workingDir/document-export.$exportFormat");
		$session->set($this->TEMP_EXPORT_FILE, $exportFile);
	
		// run the generator
		$this->check("start generator");
		$result = OawUtil::runOaw($propertyPath, 'cartridge/DocumentGeneration/workflow/cwm2word.oaw');
		$this->check('finished generator');

		if ($result['returncode'] > 0) {
			$report = "There were problems during generation:\n".$result['stderr']."\n";
			$session->set($this->PROBLEM_REPORT, $report);
		}

		// check if the generated file exists
		$exportFile = $session->get($this->TEMP_EXPORT_FILE);
		if (filesize($exportFile) == 0) {
			$this->check('Zero return file size');
			$report = "The generated file does not exist: ".$exportFile;
			Log::error($report, __CLASS__);
			$report = "There were problems during generation:\n".$report.".\nSee logfile for details.";
			$session->set($this->PROBLEM_REPORT, $report);
		}

		ExportShutdownHandler::success();
	}
	/**
	 * Clean up and return the resulting model file
	 * @param oids The oids to process
	 * @note This is a callback method called on a matching work package @see BatchController::addWorkPackage()
	 */
	function finish($oids)
	{
		require_once ('class.ExportShutdownHandler.php');
		$session = &SessionData::getInstance();

		// get the generated file
		$exportFile = $session->get($this->TEMP_EXPORT_FILE);
		if (filesize($exportFile) == 0) {
			ExportShutdownHandler::success();
			return;
		}

		//header('Content-type: text/plain');
		header('Content-type: application/octet-stream');
		header('Content-Disposition: attachment; filename="cwm-documentation-export.'.$session->get($this->PARAM_EXPORT_FORMAT).'"');
	
		readfile($exportFile);
		$this->check('File written to output');
	
		// cleanup
		unlink($exportFile);
		$workingDir = $session->get($this->TEMP_WORKING_DIR);
		FileUtil::emptyDir($workingDir);
		rmdir($workingDir);
		ExportShutdownHandler::success();
	}

	private function createTempFile($path) {
		touch($path);
		chmod($path, 0777);
	
		return $path;
	}
	
// PROTECTED REGION END

}
?>
