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
 * This file was generated by wCMFGenerator 3.0.0018 from requirements.uml on Thu Jan 13 15:13:16 CET 2011. 
 * Manual modifications should be placed inside the protected regions.
 */
 require_once(BASE."wcmf/application/controller/class.BatchController.php");
// PROTECTED REGION ID(application/include/controller/class.DiagramImageExporterController.php/Import) ENABLED START
require_once (BASE.'wcmf/lib/persistence/class.PersistenceFacade.php');

require_once ('class.OawUtil.php');
require_once ('class.UwmUtil.php');
// PROTECTED REGION END

/**
 * @class DiagramImageExporterController
 * @ingroup Controller
 * @brief Generates a SVG image of the given diagram. 
 * 
 * <b>Input actions:</b> 
 * - @em exportImage Generates a image file. 
 * 
 * <b>Output actions:</b> 
 * - @em failure If a fatal error occurs 
 * 
 * @param[in] diagramOID The OID of the diagram to generate the image for.
 * 
 * The following configuration settings are defined for this controller:
 *
 * [actionmapping]
 * ??exportImage = DiagramImageExporterController
 * DiagramImageExporterController??continue = DiagramImageExporterController
 *
 * [views]
 * 
 * @author 
 * @version 1.0
 */
class DiagramImageExporterController extends BatchController
{
// PROTECTED REGION ID(application/include/controller/class.DiagramImageExporterController.php/Body) ENABLED START
	// session name constants
	private $PARAM_START_OID = 'UWMExporterController.startOid';
	private $PARAM_LANGUAGE = 'UWMExporterController.language';

	private $TEMP_UWM_EXPORT_PATH = 'UWMExporterController.tmpUwmExportPath';
	private $TEMP_PROPERTIES_PATH = 'UWMExporterController.tmpPropertiesPath';
	private $TEMP_IMAGE_PATH = 'UWMExporterController.tmpImagePath';

	private $PROBLEM_REPORT = 'UWMDocExporterController.problemReport';
	
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
			$session->set($this->PARAM_START_OID, $request->getValue('diagramOid'));
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
		else {
		  return null;
        }
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

		// set the export file name
		$tmpUwmExportPath = OawUtil::tempName();
		$session->set($this->TEMP_UWM_EXPORT_PATH, $tmpUwmExportPath);

		// do the export
		$startOid = $session->get($this->PARAM_START_OID);
		$language = $session->get($this->PARAM_LANGUAGE);

		$this->check("start exportXML: node:".$startOid);
		UwmUtil::exportXml($tmpUwmExportPath, $startOid, $language);
		$this->check("finished exportXML");

		ExportShutdownHandler::success();
	}
	/**
	 * Run the generator
	 * @param oids The oids to process
	 * @note This is a callback method called on a matching work package @see BatchController::addWorkPackage()
	 */
	function runOAW($oids)
	{
		require_once ('class.ExportShutdownHandler.php');
		$session = &SessionData::getInstance();

		$startOid = $session->get($this->PARAM_START_OID);

		// get the name of the uwm xml file
		$tmpUwmExportPath = $session->get($this->TEMP_UWM_EXPORT_PATH);

		// set the image filename
		$tmpUwmExportDir = dirname($tmpUwmExportPath);
		$tmpImagePath = $tmpUwmExportDir.'/'.join('', PersistenceFacade::getOIDParameter($startOid, 'id')).'.svg';
		$session->set($this->TEMP_IMAGE_PATH, $tmpImagePath);
		
		// create the configuration file
		$tmpPropertiesPath = OawUtil::tempName();
		$propertiesFile = fopen($tmpPropertiesPath, "w");
		fwrite($propertiesFile, "sourceFile = $tmpUwmExportPath\n");
		fwrite($propertiesFile, "targetDir = $tmpUwmExportDir\n");
		fwrite($propertiesFile, "imageFormat = svg\n");
		fclose($propertiesFile);
		
		$session->set($this->TEMP_PROPERTIES_PATH, $tmpPropertiesPath);

		OawUtil::setupExecutable();
		
		// run the generator
		$this->check("start generator");
		$result = OawUtil::runOaw($tmpPropertiesPath, 'cartridge/DiagramImageExport/workflow/imageexport.oaw');
		$this->check('finished generator');

		if ($result['returncode'] > 0) {
			$report = "There were problems during generation:\n".$result['stderr']."\n";
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
		$tmpImagePath = $session->get($this->TEMP_IMAGE_PATH);
		$exportFile = $tmpImagePath;
		if (filesize($exportFile) == 0) {
			ExportShutdownHandler::success();
			return;
		}
		
		header('Content-type: application/image/svg+xml');
		header('Content-Disposition: attachment; filename="diagram.svg"');

		readfile($exportFile);
		$this->check('File written to output');

		// cleanup
		if (!Log::isDebugEnabled(__CLASS__)) {
			unlink($session->get($this->TEMP_UWM_EXPORT_PATH));
			unlink($session->get($this->TEMP_PROPERTIES_PATH));
			unlink($exportFile);
		}
		ExportShutdownHandler::success();
	}
// PROTECTED REGION END

}
?>
