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
 * This file was generated by wCMFGenerator 3.0.0018 from requirements.uml on Mon Jan 10 18:22:58 CET 2011. 
 * Manual modifications should be placed inside the protected regions.
 */
 require_once(BASE."wcmf/application/controller/class.BatchController.php");
// PROTECTED REGION ID(application/include/controller/class.GenerateCodeController.php/Import) ENABLED START
require_once (BASE.'wcmf/lib/persistence/class.PersistenceFacade.php');
require_once (BASE.'application/include/controller/class.CodeGeneratorListController.php');

require_once ('class.OawUtil.php');
require_once ('class.UwmUtil.php');
// PROTECTED REGION END

/**
 * @class GenerateCodeController
 * @ingroup Controller
 * @brief Generates Code out of the passed model.
 * 
 * <b>Input actions:</b>
 * - @em generateCode Generates the code.
 * 
 * <b>Output actions:</b>
 * - @em failure If a fatal error occurs
 * 
 * @param[in] modelOid The OID of the model to generate Code for.
 * @param[in] codeId The id of the code generator to use.
 * 
 * @author Niko &lt;enikao@users.sourceforge.net&gt;
 * 
 * The following configuration settings are defined for this controller:
 *
 * [actionmapping]
 * GenerateCodeController??done = TerminateController
 * ??generateCode = GenerateCodeController
 * GenerateCodeController??continue = GenerateCodeController
 *
 * [views]
 * 
 * @author 
 * @version 1.0
 */
class GenerateCodeController extends BatchController
{
// PROTECTED REGION ID(application/include/controller/class.GenerateCodeController.php/Body) ENABLED START
	// session name constants
	const PARAM_START_OID = 'GenerateCodeController.startOid';
	const PARAM_CODE_ID = 'GenerateCodeController.codeId';
	const PARAM_MODEL_NAME = 'GenerateCodeController.modelName';

	const TEMP_UWM_EXPORT_PATH = 'GenerateCodeController.tmpUwmExportPath';
	const TEMP_PROPERTIES_PATH = 'GenerateCodeController.tmpPropertiesPath';

	const PROBLEM_REPORT = 'GenerateCodeController.problemReport';
	
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
			$session->set(self::PARAM_START_OID, $request->getValue('modelOid'));
			$session->set(self::PARAM_CODE_ID, $request->getValue('codeId'));

			// get the mode name
			$persistenceFacade = &PersistenceFacade::getInstance();
			$model = &$persistenceFacade->load($request->getValue('modelOid'), BUILDDEPTH_SINGLE);
			if ($model != null) {
				$modelName = $model->getName();
			}
			else {
				$modelName = 'Chronos_default2';
			}
			$session->set(self::PARAM_MODEL_NAME, $modelName);

			// clear the problem report
			$report = '';
			$session->set(self::PROBLEM_REPORT, $report);
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
		return $session->get(self::PROBLEM_REPORT);
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
		$session->set(self::TEMP_UWM_EXPORT_PATH, $tmpUwmExportPath);

		// do the export
		$startOid = $session->get(self::PARAM_START_OID);
		$this->check("start exportXML: model:".$startOid);
		UwmUtil::exportXml($tmpUwmExportPath, $startOid);
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
		$tmpUwmExportPath = $session->get(self::TEMP_UWM_EXPORT_PATH);
		$modelName = $session->get(self::PARAM_MODEL_NAME);
		$tmpPropertiesPath = OawUtil::tempName();
		$propertiesFile = fopen($tmpPropertiesPath, "w");
		fwrite($propertiesFile, "modelXmlFile = $tmpUwmExportPath\n");
		fwrite($propertiesFile, "modelName = $modelName\n");
		fclose($propertiesFile);

		$session->set(self::TEMP_PROPERTIES_PATH, $tmpPropertiesPath);

		OawUtil::setupExecutable();

		//get the correct code generator
		$codeId = $session->get(self::PARAM_CODE_ID);
		$cartridgePath = CodeGeneratorListController::getCartrdigePath();
		$cartridgeInfo = CodeGeneratorListController::readCartrdigeInfo($codeId, $cartridgePath);
		$workflow = $cartridgePath . DIRECTORY_SEPARATOR . $codeId . DIRECTORY_SEPARATOR . $cartridgeInfo['properties']['workflow'];

		// run the generator
		$this->check("start generator");
		$result = OawUtil::runOaw($tmpPropertiesPath, $workflow);
		$this->check('finished generator');

		if ($result['returncode'] > 0) {
			$report = "There were problems during generation:\n".$result['stderr']."\n";
			$session->set(self::PROBLEM_REPORT, $report);
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
		unlink($session->get(self::TEMP_UWM_EXPORT_PATH));
		unlink($session->get(self::TEMP_PROPERTIES_PATH));

	}
	// PROTECTED REGION END

}
?>
