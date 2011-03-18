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
// PROTECTED REGION ID(application/include/controller/class.AllBrowserStatisticsController.php/Import) ENABLED START
require_once(BASE."application/include/model/wcmf/class.UserConfig.php");
require_once(BASE."wcmf/lib/util/class.FileUtil.php");
require_once ('class.OawUtil.php');
require_once ('class.UwmUtil.php');
// PROTECTED REGION END

/**
 * @class AllBrowserStatisticsController
 * @ingroup Controller
 * @brief Generates UML out of the passed model, runs all CWB statistics, and saves the results in the current session. 
 * 
 * <b>Input actions:</b> 
 * - @em loadAllStatisticsOverview Loads all statistics data into the current session. 
 * 
 * <b>Output actions:</b> 
 * - @em failure If a fatal error occurs 
 * - @em ok In any other case 
 * 
 * @param[in] modelOid The OID of the model to generate statistical data for. 
 * @param[in] useCache True if cached data should be used if existing, false if not 
 *                     if the cache does not exist, it will be created unless dontGenerate is set to true
 * @param[in] dontGenerate True to prevent generating statistic data if they don't exist
 * @param[out] modelOid The OID of the model whose statistical Data were generated. 
 * @param[out] isGenerated True/False wether statistical data are generated or not.
 * 
 * The following configuration settings are defined for this controller:
 *
 * [actionmapping]
 * ??loadAllStatisticsOverview = AllBrowserStatisticsController
 *
 * [views]
 * 
 * @author 
 * @version 1.0
 */
class AllBrowserStatisticsController extends BatchController
{
// PROTECTED REGION ID(application/include/controller/class.AllBrowserStatisticsController.php/Body) ENABLED START
	// session name constants
	private $PARAM_MODEL_OID = 'AllBrowserStatisticsController.modelOid';
	private $PARAM_USE_CACHE = 'AllBrowserStatisticsController.useCache';
	private $PARAM_DONT_GENERATE = 'AllBrowserStatisticsController.dontGenerate';
	
	private $TEMP_WORKING_DIR = 'AllBrowserStatisticsController.tmpWorkingDir';
	private $TEMP_UWM_EXPORT_PATH = 'AllBrowserStatisticsController.tmpUwmExportPath';
	private $TEMP_PROPERTIES_PATH = 'AllBrowserStatisticsController.tmpPropertiesPath';

	private $PROBLEM_REPORT = 'AllBrowserStatisticsController.problemReport';
	private $lastTime = 0;

	private function check($msg)
	{
		$newTime = microtime(true);
		Log::debug(($newTime-$this->lastTime).": $msg", __CLASS__);
		$this->lastTime = $newTime;
	}

	/**
	 * @see Controller::initialize()
	 */
	function initialize(&$request, &$response)
	{
		// get initial request parameters
		if ($request->getAction() != 'continue')
		{
			// initial call
			$configEntry = UserConfig::getConfigEntry('last_browser_model');

			// check if a model is requested
			$modelOid = $request->getValue('modelOid');
			if (!PersistenceFacade::isValidOid($modelOid)) {
				// no model requested -> use stored user preference
				$request->setValue('modelOid', $configEntry->getVal());
				$request->setValue('useCache', true);
				$request->setValue('dontGenerate', true);
			}
			else {
				// update user preference with the requested model
				$configEntry->setVal($request->getValue('modelOid'));
				$configEntry->save();
			}
			
			$session = &SessionData::getInstance();
			$session->set($this->PARAM_MODEL_OID, $request->getValue('modelOid'));
			$session->set($this->PARAM_USE_CACHE, $request->getValue('useCache'));
			$session->set($this->PARAM_DONT_GENERATE, $request->getValue('dontGenerate'));
			
			// clear the problem report
			$report = '';
			$session->set($this->PROBLEM_REPORT, $report);
		}
		parent::initialize($request, $response);
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
		$session = &SessionData::getInstance();
		$modelOid = $session->get($this->PARAM_MODEL_OID);
		$useCache = ('true' == $session->get($this->PARAM_USE_CACHE));
		$dontGenerate = ('true' == $session->get($this->PARAM_DONT_GENERATE));
		if (strlen($modelOid) == 0 || ($useCache && $this->isGenerated($modelOid)) || $dontGenerate) {
			// reuse data, if already existing
			if ($number == 0)
			{
				// at least one package has to be defined
				return array('name' => '', 'size' => 1, 'oids' => array(0), 'callback' => 'doNothing');
			}
			else
			{
				return null;
			}
		}
		else {
			
			// in case that the statistics for the current model are
			// not generated, we have to generate them
			
			if ($number == 0)
			{
				return array('name' => 'Export the model to XML', 'size' => 1, 'oids' => array(0), 'callback' => 'exportXML');
			}
			elseif ($number == 1)
			{
				return array('name' => 'Initialize the generator', 'size' => 1, 'oids' => array(0), 'callback' => 'initOAW');
			}
			elseif ($number == 2)
			{
				return array('name' => 'Run the generator step 1', 'size' => 1, 'oids' => array(0), 'callback' => 'runOAWStep0');
			}
			elseif ($number == 3)
			{
				return array('name' => 'Run the generator step 2', 'size' => 1, 'oids' => array(0), 'callback' => 'runOAWStep1');
			}
			elseif ($number == 4)
			{
				return array('name' => 'Run the generator step 3', 'size' => 1, 'oids' => array(0), 'callback' => 'runOAWStep2');
			}
			elseif ($number == 5)
			{
				return array('name' => 'Run the generator step 4', 'size' => 1, 'oids' => array(0), 'callback' => 'runOAWStep3');
			}
			elseif ($number == 6)
			{
				return array('name' => 'Clean up', 'size' => 1, 'oids' => array(0), 'callback' => 'finish');
			}
			else {
			  return null;
			}
		}
	}
	/**
	 * @see LongTaskController::getSummaryText()
	 */
	function getSummaryText()
	{
		$session = &SessionData::getInstance();
		// we also set the modelOid for the response here
		$modelOid = $session->get($this->PARAM_MODEL_OID);
		$this->_response->setValue('modelOid', $modelOid);
		$this->_response->setValue('isGenerated', $this->isGenerated($modelOid));
		
		return $session->get($this->PROBLEM_REPORT);
	}
	/**
	 * Do nothing
	 * @param oids The oids to process
	 * @note This is a callback method called on a matching work package @see BatchController::addWorkPackage()
	 */
	function doNothing($oids) {}
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
		$modelOid = $session->get($this->PARAM_MODEL_OID);
		$tmpWorkingDir = self::getWorkingDir($modelOid).'/tmp';
		$session->set($this->TEMP_WORKING_DIR, $tmpWorkingDir);
		mkdir($tmpWorkingDir);

		$statisticsDir = $tmpWorkingDir.'/statistics';
		$barchartDir = $tmpWorkingDir.'/barchart';
		$piechartDir = $tmpWorkingDir.'/piechart';

		mkdir($statisticsDir);
		mkdir($barchartDir);
		mkdir($piechartDir);

		// do the export
		$tmpUwmExportPath = "$tmpWorkingDir/cwm-source.xml";
		$session->set($this->TEMP_UWM_EXPORT_PATH, $tmpUwmExportPath);
		touch($tmpUwmExportPath);

		// do the export
		$this->check("start exportXML: node:".$modelOid);

		$problemReport = UwmUtil::exportXml($tmpUwmExportPath, $modelOid);
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
	 * Initialize the gererator
	 * @param oids The oids to process
	 * @note This is a callback method called on a matching work package @see BatchController::addWorkPackage()
	 */
	function initOAW($oids)
	{
		$session = &SessionData::getInstance();
		$tmpWorkingDir = $session->get($this->TEMP_WORKING_DIR);
		$tmpUwmExportPath = $session->get($this->TEMP_UWM_EXPORT_PATH);
		$tmpPropertiesPath = OawUtil::createPropertyFile('file://'.$tmpUwmExportPath, $tmpWorkingDir);
		$session->set($this->TEMP_PROPERTIES_PATH, $tmpPropertiesPath);
	
		// create the result files
		OawUtil::createTempFile($tmpWorkingDir.'/statistics/browser.dat');
		OawUtil::createTempFile($tmpWorkingDir.'/barchart/browser.dat');
		OawUtil::createTempFile($tmpWorkingDir.'/piechart/browser.dat');
	}
	/**
	 * Run the gererator step 0
	 * @param oids The oids to process
	 * @note This is a callback method called on a matching work package @see BatchController::addWorkPackage()
	 */
	function runOAWStep0($oids)
	{
		$this->runOAW('cartridge/BrowserStatistics/workflow/step0_cwm2uml.oaw');
	}
	/**
	 * Run the gererator step 1
	 * @param oids The oids to process
	 * @note This is a callback method called on a matching work package @see BatchController::addWorkPackage()
	 */
	function runOAWStep1($oids)
	{
		$this->runOAW('cartridge/BrowserStatistics/workflow/step1_statisticsPhp.oaw');
	}
	/**
	 * Run the gererator step 2
	 * @param oids The oids to process
	 * @note This is a callback method called on a matching work package @see BatchController::addWorkPackage()
	 */
	function runOAWStep2($oids)
	{
		$this->runOAW('cartridge/BrowserStatistics/workflow/step2_barchart.oaw');
	}
	/**
	 * Run the gererator step 3
	 * @param oids The oids to process
	 * @note This is a callback method called on a matching work package @see BatchController::addWorkPackage()
	 */
	function runOAWStep3($oids)
	{
		$this->runOAW('cartridge/BrowserStatistics/workflow/step3_piechart.oaw');
	}
	/**
	 * Run the gererator with the given workflow
	 * @param workflow The wotkflow file
	 */
	function runOAW($workflow)
	{
		require_once ('class.ExportShutdownHandler.php');
		$session = &SessionData::getInstance();

		OawUtil::setupExecutable();
		
		// create the configuration file
		$tmpPropertiesPath = $session->get($this->TEMP_PROPERTIES_PATH);
	
		// run the generator
		$this->check("start generator workflow: ".$workflow);
		$result = OawUtil::runOaw($tmpPropertiesPath, $workflow);
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
		$tmpWorkingDir = $session->get($this->TEMP_WORKING_DIR);
		
		// copy generated files to cache destination
		$modelOid = $session->get($this->PARAM_MODEL_OID);
		FileUtil::copyRec($tmpWorkingDir, self::getWorkingDir($modelOid));
		
		// remove generated files
		unlink($session->get($this->TEMP_PROPERTIES_PATH));
		FileUtil::emptyDir($tmpWorkingDir);
		rmdir($tmpWorkingDir);
	}
	/**
	 * Get the working directory for this export
	 * @param modelOid The oid of the model
	 * @return The directory
	 */
	public static function getWorkingDir($modelOid)
	{
		$ids = PersistenceFacade::getOIDParameter($modelOid, 'id');
		$dir = str_replace('\\', '/', dirname(realpath($_SERVER['SCRIPT_FILENAME'])).'/statistics/model'.$ids[0]);
		if (!file_exists($dir)) {
			FileUtil::mkdirRec($dir);
		}
		return $dir;
	}
	/**
	 * Check if statistics for a model are generated already
	 * @param modelOid The oid of the model
	 * @return Boolean
	 */
	private function isGenerated($modelOid)
	{
		$workingDir = self::getWorkingDir($modelOid);
		$files = FileUtil::getFiles($workingDir, '/\.uml$/');
		return sizeof($files) > 0;
	}
// PROTECTED REGION END

}
?>
