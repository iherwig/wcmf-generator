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
 * This file was generated by wCMFGenerator 3.0.0017 from requirements.uml on Wed Sep 30 17:48:26 CEST 2009. 
 * Manual modifications should be placed inside the protected regions.
 */
 require_once(BASE."wcmf/application/controller/class.BatchController.php");
// PROTECTED REGION ID(application/include/controller/class.ExpeditorGeneratorController.php/Import) ENABLED START
require_once (BASE.'wcmf/lib/persistence/class.PersistenceFacade.php');

require_once ('class.OawUtil.php');
require_once ('class.UwmUtil.php');
// PROTECTED REGION END

/**
 * @class ExpeditorGeneratorController
 * @ingroup Controller
 * @brief Generates UML out of the passed model, and returns the UML file. 
 * 
 * <b>Input actions:</b>
 * - @em exportUWM Generates and returns a UML file.
 * 
 * <b>Output actions:</b>
 * - @em failure If a fatal error occurs
 * 
 * @param[in] startModel The OID of the model to generate UML for.
 * @param[in] startPackage The OID of the package to generate UML for.
 * 
 * @author Niko &lt;enikao@users.sourceforge.net&gt;
 * 
 * The following configuration settings are defined for this controller:
 *
 * [actionmapping]
 * ExpeditorGeneratorController??done = TerminateController
 * ??generateExpeditor = ExpeditorGeneratorController
 * ExpeditorGeneratorController??continue = ExpeditorGeneratorController
 *
 * [views]
 * 
 * @author 
 * @version 1.0
 */
class ExpeditorGeneratorController extends BatchController
{
// PROTECTED REGION ID(application/include/controller/class.ExpeditorGeneratorController.php/Body) ENABLED START
	// session name constants
	private $PARAM_START_MODEL = 'ExpeditorGeneratorController.startModel';

	private $TEMP_UWM_EXPORT_PATH = 'ExpeditorGeneratorController.tmpUwmExportPath';
	private $TEMP_PROPERTIES_PATH = 'ExpeditorGeneratorController.tmpPropertiesPath';
	
	private $PROBLEM_REPORT = 'ExpeditorGeneratorController.problemReport';
	
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
		$tmpUwmExportPath = OawUtil::tempName();
		$session->set($this->TEMP_UWM_EXPORT_PATH, $tmpUwmExportPath);
		
		// do the export
		$startModel = $session->get($this->PARAM_START_MODEL);
		$this->check("start exportXML: model:".$startModel);
		UwmUtil::exportXml($tmpUwmExportPath, $startModel, null);
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

		// create the configuration file
		$tmpUwmExportPath = $session->get($this->TEMP_UWM_EXPORT_PATH);
		$tmpPropertiesPath = OawUtil::tempName();
		$propertiesFile = fopen($tmpPropertiesPath, "w");
		fwrite($propertiesFile, "sourceXmlFile = $tmpUwmExportPath");
		fclose($propertiesFile);
		
		$session->set($this->TEMP_PROPERTIES_PATH, $tmpPropertiesPath);

		OawUtil::setupExecutable();
		
		// run the generator
		$this->check("start generator");
		$result = OawUtil::runOaw($tmpPropertiesPath, 'cartridge/Expeditor/workflow/expeditor-headless.oaw');
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
		$session = &SessionData::getInstance();
	
		// cleanup
		unlink($session->get($this->TEMP_UWM_EXPORT_PATH));
		unlink($session->get($this->TEMP_PROPERTIES_PATH));

	}
	// PROTECTED REGION END

}
?>
