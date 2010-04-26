<?php
/*
 * Copyright (c) 2010 The Olympos Development Team.
 *
 * http://sourceforge.net/projects/olympos/
 *
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html. If redistributing this code,
 * this entire header must remain intact.
 */
require_once BASE . 'wcmf/application/controller/class.BatchController.php';
require_once BASE . 'application/include/controller/class.UwmUtil.php';
require_once BASE . 'application/include/controller/class.OawUtil.php';
require_once BASE . 'application/include/controller/class.UcDomainExporterReference.php';

/**
 * @class UcTestDataExporterController
 * @ingroup Controller
 * @brief Exports complete documentation for one use case.
 *
 * <b>Input actions:</b>
 * - unspecified: Export Use Case Documentation
 *
 * <b>Output actions:</b>
 * - @em ok In any case
 *
 * @param[in] startOid The object id of the use case that should be exported.
 *
 * @author Niko <enikao@users.sourceforge.net>
 */
class UcTestDataExporterController extends BatchController
{
	const PROBLEM_REPORT = 'UcTestDataExporterController.problemReport';
	const TEMP_WORKING_DIR = 'UcTestDataExporterController.workingDiw';
	const TEMP_EXPORT_FILE = 'UcTestDataExporterController.exportFile';
	const UC_OID = 'UcTestDataExporterController.ucOid';
	const PARAM_LANGUAGE = 'UcTestDataExporterController.language';

	/**
	 * @see Controller::initialize()
	 */
	function initialize($request, $response)
	{
		parent::initialize($request, $response);

		// get initial request parameters
		if ($request->getAction() != 'continue')
		{
			$session = SessionData::getInstance();
			$session->set(self::UC_OID, $request->getValue('startOid'));
			if ($this->isLocalizedRequest()) {
				$session->set(self::PARAM_LANGUAGE, $request->getValue('language'));
			}
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
			return array('name' => 'Export the use case to XML', 'size' => 1, 'oids' => array(0), 'callback' => 'exportXML');
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
		$session = SessionData::getInstance();
		return $session->get(self::PROBLEM_REPORT);
	}


	/**
	 * Export the given model to XML
	 * @param oids The oids to process
	 * @note This is a callback method called on a matching work package @see BatchController::addWorkPackage()
	 */
	function exportXML($oids)
	{
		require_once BASE . 'application/include/controller/class.ExportShutdownHandler.php';
		$session = SessionData::getInstance();
		$parser = InifileParser::getInstance();

		// set the export path
		$workingDir = OawUtil::tempName();
		$session->set(self::TEMP_WORKING_DIR, $workingDir);
		mkdir($workingDir);

		$tmpUwmExportPath = "$workingDir/cwm-source.xml";
		touch($tmpUwmExportPath);

		// do the export
		$startOid = $session->get(self::UC_OID);

		$language = $session->get(self::PARAM_LANGUAGE);
		$virtualPackages = false;

		$problemReport = UwmUtil::exportXml($tmpUwmExportPath, $startOid, $language, $virtualPackages, new UcDomainExporterReference());

		// update the problem report
		if (strlen($problemReport) > 0) {
			$report = $session->get(self::PROBLEM_REPORT)."".$problemReport."\n";
			Log::error($report, __CLASS__);
			$session->set(self::PROBLEM_REPORT, $report);
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
		require_once BASE . 'application/include/controller/class.ExportShutdownHandler.php';
		$session = SessionData::getInstance();

		OawUtil::setupExecutable();

		// select the template
		$templateName = 'TestData';

		// select the input type
		$inputType = 'ods';

		// select the export format
		$exportFormat = 'ods';

		// create the configuration file
		$workingDir = $session->get(self::TEMP_WORKING_DIR);
		$propertyPath = "$workingDir/doc-export.properties";
		$propertyFile = fopen($propertyPath, 'w');
		fwrite($propertyFile, "workingDir = $workingDir\n");
		fwrite($propertyFile, "templateName = $templateName\n");
		fwrite($propertyFile, "inputType = $inputType\n");
		fwrite($propertyFile, "exportFormat = $exportFormat\n");
		fwrite($propertyFile, "exportImages = false\n");
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
		$session->set(self::TEMP_EXPORT_FILE, $exportFile);

		// run the generator
		$result = OawUtil::runOaw($propertyPath, 'cartridge/DocumentGeneration/workflow/cwm2word.oaw');

		if ($result['returncode'] > 0) {
			$report = "There were problems during generation:\n".$result['stderr']."\n";
			$session->set(self::PROBLEM_REPORT, $report);
		}

		// check if the generated file exists
		$exportFile = $session->get(self::TEMP_EXPORT_FILE);
		if (filesize($exportFile) == 0) {
			$report = "The generated file does not exist: ".$exportFile;
			Log::error($report, __CLASS__);
			$report = "There were problems during generation:\n".$report.".\nSee logfile for details.";
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
Log::error("Finish called", __CLASS__);
		require_once BASE . 'application/include/controller/class.ExportShutdownHandler.php';
		$session = SessionData::getInstance();

		// get the generated file
		$exportFile = $session->get(self::TEMP_EXPORT_FILE);
		if (filesize($exportFile) == 0) {
			ExportShutdownHandler::success();
			return;
		}

		//header('Content-type: text/plain');
		header('Content-type: application/octet-stream');
		header('Content-Disposition: attachment; filename="TestData.ods"');

		readfile($exportFile);

		// cleanup
		unlink($exportFile);
		$workingDir = $session->get(self::TEMP_WORKING_DIR);
		FileUtil::emptyDir($workingDir);
		rmdir($workingDir);
		ExportShutdownHandler::success();
	}

	private function createTempFile($path) {
		touch($path);
		chmod($path, 0777);

		return $path;
	}
}
