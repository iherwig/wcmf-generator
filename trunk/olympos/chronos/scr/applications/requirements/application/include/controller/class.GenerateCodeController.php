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
 require_once(BASE."wcmf/lib/presentation/class.Controller.php");
// PROTECTED REGION ID(application/include/controller/class.GenerateCodeController.php/Import) ENABLED START
require_once (BASE.'wcmf/lib/persistence/class.PersistenceFacade.php');

require_once ('class.OawUtil.php');
require_once ('class.UwmUtil.php');
// PROTECTED REGION END

/**
 * @class GenerateCodeController
 * @ingroup Controller
 * @brief Generates Code out of the passed model.
 * 
 * <b>Input actions:</b>
 *  - @em generateCode Generates the code.
 *  
 * <b>Output actions:</b>
 *  - @em failure If a fatal error occurs
 * 
 * @param[in] modelOid The OID of the model to generate Code for.
 * @param[in] codeId The id of the code generator to use.
 * 
 * @author Niko &lt;enikao@users.sourceforge.net&gt;
 * 
 * The following configuration settings are defined for this controller:
 *
 * [actionmapping]
 * ??generateCode = GenerateCodeController
 *
 * [views]
 * 
 * @author 
 * @version 1.0
 */
class GenerateCodeController extends Controller
{
// PROTECTED REGION ID(application/include/controller/class.GenerateCodeController.php/Body) ENABLED START
	const INI_SECTION = 'codeGenerators';
	
	// session name constants
	const PARAM_START_MODEL = 'GenerateCodeController.startModel';
	const PARAM_CODE_ID = 'GenerateCodeController.codeId';

	const TEMP_UWM_EXPORT_PATH = 'GenerateCodeController.tmpUwmExportPath';
	const TEMP_PROPERTIES_PATH = 'GenerateCodeController.tmpPropertiesPath';

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
			$session->set(self::PARAM_START_MODEL, $request->getValue('modelOid'));
			$session->set(self::PARAM_CODE_ID, $request->getValue('codeId'));
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
		$tmpUwmExportPath = OawUtil::tempName();
		$session->set(self::TEMP_UWM_EXPORT_PATH, $tmpUwmExportPath);

		// do the export
		$startModel = $session->get(self::PARAM_START_MODEL);
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
		$tmpUwmExportPath = $session->get(self::TEMP_UWM_EXPORT_PATH);
		$tmpPropertiesPath = OawUtil::tempName();
		$propertiesFile = fopen($tmpPropertiesPath, "w");
		fwrite($propertiesFile, "modelXmlFile = $tmpUwmExportPath");
		fclose($propertiesFile);

		$session->set(self::TEMP_PROPERTIES_PATH, $tmpPropertiesPath);

		OawUtil::setupExecutable();

		//get the correct code generator
		$workflow = null;

		$parser = InifileParser::getInstance();
		$logger = LoggerManager::getLogger('CodeGeneratorController');

		if (($generatorIds = $parser->getSection(self::INI_SECTION)) !== false) {
			$codeId = $session->get(self::PARAM_CODE_ID);
			$generatorSection = $generatorIds[$codeId];
			if (($generatorConfig = $parser->getSection($generatorSection)) !== false) {
				$workflow = $generatorConfig['workflow'];
			} else {
				$logger->error($parser->getErrorMsg(), __FILE__, __LINE__);
			}
		} else {
			$logger->error($parser->getErrorMsg(), __FILE__, __LINE__);
		}

		// run the generator
		$this->check("start generator");
		$runCfg = OawUtil::runOaw($tmpPropertiesPath, $workflow);
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
		$session = &SessionData::getInstance();

		// cleanup
		unlink($session->get(self::TEMP_UWM_EXPORT_PATH));
		unlink($session->get(self::TEMP_PROPERTIES_PATH));

	}
	// PROTECTED REGION END

}
?>