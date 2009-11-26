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
 * This file was generated by wCMFGenerator 3.0.0018 from requirements.uml on Thu Nov 26 12:45:15 CET 2009. 
 * Manual modifications should be placed inside the protected regions.
 */
 require_once(BASE."wcmf/application/controller/class.BatchController.php");
// PROTECTED REGION ID(application/include/controller/class.UWMExporterController.php/Import) ENABLED START
require_once (BASE.'wcmf/lib/persistence/class.PersistenceFacade.php');

require_once ('class.OawUtil.php');
require_once ('class.UwmUtil.php');
// PROTECTED REGION END

/**
 * @class UWMExporterController
 * @ingroup Controller
 * @brief Generates UML out of the passed node, and returns the UML file. 
 * 
 * <b>Input actions:</b>
 * - @em exportUWM Generates and returns a UML file.
 * 
 * <b>Output actions:</b>
 * - @em failure If a fatal error occurs
 * 
 * @param[in] startOid The OID of the node to generate UML for.
 * 
 * @author Niko &lt;enikao@users.sourceforge.net&gt;
 * 
 * The following configuration settings are defined for this controller:
 *
 * [actionmapping]
 * UWMExporterController??done = TerminateController
 * ??exportUWM = UWMExporterController
 * UWMExporterController??continue = UWMExporterController
 *
 * [views]
 * 
 * @author 
 * @version 1.0
 */
class UWMExporterController extends BatchController
{
// PROTECTED REGION ID(application/include/controller/class.UWMExporterController.php/Body) ENABLED START
	// session name constants
	private $PARAM_START_OID = 'UWMExporterController.startOid';
	private $PARAM_LANGUAGE = 'UWMExporterController.language';

	private $TEMP_UWM_EXPORT_PATH = 'UWMExporterController.tmpUwmExportPath';
	private $TEMP_PROPERTIES_PATH = 'UWMExporterController.tmpPropertiesPath';
	private $TEMP_UML_EXPORT_PATH = 'UWMExporterController.tmpUmlPath';

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
			$session->set($this->PARAM_START_OID, $request->getValue('startOid'));
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

		// set the export path
		$tmpUwmExportPath = OawUtil::tempName();
		$session->set($this->TEMP_UWM_EXPORT_PATH, $tmpUwmExportPath);
		//mkdir($tmpUwmExportPath);

		// do the export
		$startOid = $session->get($this->PARAM_START_OID);

		$language = $session->get($this->PARAM_LANGUAGE);

		$this->check("start exportXML: node:".$startOid);
		UwmUtil::exportXml($tmpUwmExportPath, $startOid, $language);
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

		// set the export path
		$tmpUmlPath = OawUtil::tempName();
		$session->set($this->TEMP_UML_EXPORT_PATH, $tmpUmlPath);
		mkdir($tmpUmlPath);

		// create the configuration file
		$tmpUwmExportPath = $session->get($this->TEMP_UWM_EXPORT_PATH);
		$tmpPropertiesPath = OawUtil::createPropertyFile('file://'.$tmpUwmExportPath, $tmpUmlPath);
		$session->set($this->TEMP_PROPERTIES_PATH, $tmpPropertiesPath);

		// run the generator
		$this->check("start generator");
		$result = OawUtil::runOaw($tmpPropertiesPath, 'cartridge/UmlConnector/workflow/cwm2uml.oaw');
		$this->check('finished generator');

		if ($result['returncode'] > 0) {
			$report = "There were problems during generation:\n".$result['stderr']."\n";
			$session->set($this->PROBLEM_REPORT, $report);
		}

		// check if the generated file exists
		$exportFile = "$tmpUmlPath/uml-generated.uml";
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
		$tmpUmlExportPath = $session->get($this->TEMP_UML_EXPORT_PATH);
		$exportFile = "$tmpUmlExportPath/uml-generated.uml";
		if (filesize($exportFile) == 0) {
			ExportShutdownHandler::success();
			return;
		}
		
		//header('Content-type: text/plain');
		header('Content-type: application/octet-stream');
		header('Content-Disposition: attachment; filename="cwm-export.uml"');

		readfile($exportFile);
		//readfile($tmpUwmExportPath);
		$this->check('File written to output');

		// cleanup
		unlink($session->get($this->TEMP_UWM_EXPORT_PATH));
		unlink($session->get($this->TEMP_PROPERTIES_PATH));
		unlink($exportFile);
		rmdir($session->get($this->TEMP_UML_EXPORT_PATH));

		ExportShutdownHandler::success();
	}
	// PROTECTED REGION END

}
?>
