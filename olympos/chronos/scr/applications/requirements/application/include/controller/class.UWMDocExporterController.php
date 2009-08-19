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
 * This file was generated by wCMFGenerator 3.0.0017 from requirements.uml on Wed Aug 19 14:27:53 CEST 2009. 
 * Manual modifications should be placed inside the protected regions.
 */
 require_once(BASE."wcmf/application/controller/class.BatchController.php");
// PROTECTED REGION ID(application/include/controller/class.UWMDocExporterController.php/Import) ENABLED START
require_once (BASE.'wcmf/lib/persistence/class.PersistenceFacade.php');

require_once('class.TemplateListController.php');

require_once ('class.OawUtil.php');
require_once ('class.UwmUtil.php');
// PROTECTED REGION END

/**
 * @class UWMDocExporterController
 * @ingroup Controller
 * @brief @class UWMDocExporterController
 * @ingroup Controller
 * @brief Generates documentation out of the passed model, and returns the documentation file. 
 * <b>Input actions:</b> - @em exportDoc Generates a documentation file. 
 * <b>Output actions:</b> - @em failure If a fatal error occurs 
 * @param[in] startModel The OID of the model to generate UML for.
 * @param[in] startPackage The OID of the package to generate UML for.
 * @param[in] exportFormat The format to export documentation in, must be one of $this-&gt;availableFormats.
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
	private $PARAM_START_MODEL = 'UWMDocExporterController.startModel';
	private $PARAM_START_PACKAGE = 'UWMDocExporterController.startPackage';
	private $PARAM_EXPORT_FORMAT = 'UWMDocExporterController.exportFormat';
	private $PARAM_TEMPLATE_NAME = 'UWMDocExporterController.templateName';
	private $PARAM_LANGUAGE = 'UWMDocExporterController.language';
	
	private $TEMP_WORKING_DIR = 'UWMDocExporterController.workingDiw';
	private $TEMP_UWM_EXPORT_PATH = 'UWMDocExporterController.tmpUwmExportPath';
	private $TEMP_PROPERTIES_PATH = 'UWMDocExporterController.tmpPropertiesPath';
	private $TEMP_CONTENT_PATH = 'UWMDocExporterController.contentPath';
	private $TEMP_STYLES_PATH = 'UWMDocExporterController.stylesPath';
	private $TEMP_OOFFICE0_PATH = 'UWMDocExporterController.openofficeTmp0Path';
	private $TEMP_OOFFICE_PATH = 'UWMDocExporterController.openofficePath';
	private $TEMP_EXPORT_FILE = 'UWMDocExporterController.exportFile';
	
	private $availableFormats = array('doc', 'odt', 'pdf');
	const DEFAULT_EXPORT_FORMAT = 'doc';
	
	private $availableTemplates = null;
	const DEFAULT_TEMPLATE_NAME = 'standard';

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
			$session->set($this->PARAM_START_MODEL, $request->getValue('startModel'));
			$session->set($this->PARAM_START_PACKAGE, $request->getValue('startPackage'));
			$session->set($this->PARAM_EXPORT_FORMAT, $request->getValue('exportFormat'));
			$session->set($this->PARAM_TEMPLATE_NAME, $request->getValue('templateName'));
			if ($this->isLocalizedRequest()) {
				$session->set($this->PARAM_LANGUAGE, $request->getValue('language'));
			}
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
		$session->set($this->TEMP_UWM_EXPORT_PATH, $tmpUwmExportPath);
		touch($tmpUwmExportPath);

		// do the export
		$startModel = $session->get($this->PARAM_START_MODEL);
		$startPackage = $session->get($this->PARAM_START_PACKAGE);
		$language = $session->get($this->PARAM_LANGUAGE);
		$this->check("start exportXML: model:".$startModel." package:".$startPackage);
		UwmUtil::exportXml($tmpUwmExportPath, $startModel, $startPackage, $language);
		$this->check("finished exportXML");

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
		
		// select the export format
		$exportFormatParam = $session->get($this->PARAM_EXPORT_FORMAT);
		if (array_search($exportFormatParam, $this->availableFormats) !== false) {
			$exportFormat = $exportFormatParam;
		} else {
			$exportFormat = self::DEFAULT_EXPORT_FORMAT;
		}
		$session->set($this->PARAM_EXPORT_FORMAT, $exportFormat);
		
		// select the template
		$this->getAvailableTemplates();
		$templateNameParam = $session->get($this->PARAM_TEMPLATE_NAME);
		if (array_search($templateNameParam, $this->availableTemplates) !== false) {
			$templateName = $templateNameParam;
		} else {
			$templateName = self::DEFAULT_TEMPLATE_NAME;
		}
		$session->set($this->PARAM_TEMPLATE_NAME, $templateName);

		// create the configuration file
		$workingDir = $session->get($this->TEMP_WORKING_DIR);
		$propertyPath = "$workingDir/doc-export.properties";
		$propertyFile = fopen($propertyPath, 'w');
		fwrite($propertyFile, "workingDir = $workingDir\n");
		fwrite($propertyFile, "templateName = $templateName\n");
		fwrite($propertyFile, "exportFormat = $exportFormat\n");
		fclose($propertyFile);
		$session->set($this->TEMP_PROPERTIES_PATH, $propertyPath);
	
		$contentPath = $this->createTempFile("$workingDir/content.xml");
		$stylesPath = $this->createTempFile("$workingDir/styles.xml");
		$openofficeTmp0Path = $this->createTempFile("$workingDir/document-tmp0.odt");
		$openofficePath = $this->createTempFile("$workingDir/document-tmp1.odt");
		$exportFile = $this->createTempFile("$workingDir/document-export.$exportFormat");
		$session->set($this->TEMP_CONTENT_PATH, $contentPath);
		$session->set($this->TEMP_STYLES_PATH, $stylesPath);
		$session->set($this->TEMP_OOFFICE0_PATH, $openofficeTmp0Path);
		$session->set($this->TEMP_OOFFICE_PATH, $openofficePath);
		$session->set($this->TEMP_EXPORT_FILE, $exportFile);
	
		// run the generator
		$this->check("start generator");
		$runCfg = OawUtil::runOaw($propertyPath, 'cartridge/DocumentGeneration/workflow/cwm2word.oaw');
		$this->check('finished generator');

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

		// check if the generated file exists
		$exportFile = $session->get($this->TEMP_EXPORT_FILE);
		if (filesize($exportFile) == 0) {
			$this->check('Zero return file size');
			ExportShutdownHandler::success();
			WCMFException::throwEx("The generated file does not exist", __FILE__, __LINE__);
			return false;
		}

		//header('Content-type: text/plain');
		header('Content-type: application/octet-stream');
		header('Content-Disposition: attachment; filename="cwm-documentation-export.'.$session->get($this->PARAM_EXPORT_FORMAT).'"');
	
		readfile($exportFile);
		$this->check('File written to output');
	
		// cleanup
		unlink($exportFile);
		unlink($session->get($this->TEMP_OOFFICE_PATH));
		unlink($session->get($this->TEMP_OOFFICE0_PATH));
		unlink($session->get($this->TEMP_STYLES_PATH));
		unlink($session->get($this->TEMP_CONTENT_PATH));
		unlink($session->get($this->TEMP_PROPERTIES_PATH));
		unlink($session->get($this->TEMP_UWM_EXPORT_PATH));
		rmdir($session->get($this->TEMP_WORKING_DIR));

		ExportShutdownHandler::success();
	}

	private function createTempFile($path) {
		touch($path);
		chmod($path, 0777);
	
		return $path;
	}
	
	private function getAvailableTemplates() {
		$templatespath = TemplateListController::getTemplatesPath();
		$this->availableTemplates = TemplateListController::getTemplates($templatespath);
	}
// PROTECTED REGION END

}
?>
