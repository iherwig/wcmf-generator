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
 * This file was generated by wCMFGenerator 3.0.0017 from requirements.uml on Wed Nov 18 16:43:55 CET 2009. 
 * Manual modifications should be placed inside the protected regions.
 */
 require_once(BASE."wcmf/lib/presentation/class.Controller.php");
// PROTECTED REGION ID(application/include/controller/class.CodeGeneratorListController.php/Import) ENABLED START

require_once(BASE."application/include/controller/class.OawUtil.php");
// PROTECTED REGION END

/**
 * @class CodeGeneratorListController
 * @ingroup Controller
 * @brief Reads out server.ini codeGenerators and referenced sections to return a list of available code generators.
 * 
 * <b>Input actions:</b>
 * - @em generatorlist to list code generators
 * 
 * <b>Output actions:</b>
 * - @em ok in every case
 * 
 * @param[in]
 * @param[out] list
 * 
 * @author Niko &lt;enikao@users.sourceforge.net&gt;
 * 
 * The following configuration settings are defined for this controller:
 *
 * [actionmapping]
 * ??generatorList = CodeGeneratorListController
 *
 * [views]
 * 
 * @author 
 * @version 1.0
 */
class CodeGeneratorListController extends Controller
{
// PROTECTED REGION ID(application/include/controller/class.CodeGeneratorListController.php/Body) ENABLED START
	const CARTRIDGE_DIR = 'cartridge';
	const CARTRIDGEINFO_FILE = 'cartridgeinfo.xml';

	function hasView()
	{
		return false;
	}

	function executeKernel()
	{
		$result = array();

		$cartridgePath = self::getCartrdigePath();

		$availableCartridges = array();

		$dirHandle = opendir($cartridgePath);
		while($currDir = readdir($dirHandle)) {
			if ($currDir != '.' && $currDir != '..' && is_dir($cartridgePath . DIRECTORY_SEPARATOR . $currDir)) {
				$availableCartridges[] = $currDir;
			}
		}
		closedir($dirHandle);

		$cartridgeInfo = array();

		foreach($availableCartridges as $currCartridge) {
			$cartridgeInfo[$currCartridge] = self::readCartrdigeInfo($currCartridge, $cartridgePath);
		}

		$codeGenerators = array();

		foreach($cartridgeInfo as $id => $info) {
			if ($info['properties']['codeGenerator']) {
				$codeGenerators[] = array(
					'id' => $id,
					'name' => $info['name'],
					'targetPlatform' => $info['properties']['targetPlatform'],
					'description' => $info['description']
				);
			}
		}

		$this->_response->setValue('list', $codeGenerators);

		//	Set the next action
		$this->_response->setAction('ok');

		//	Success
		return false;
	}

	public static function getCartrdigePath() {
		$parser = InifileParser::getInstance();
		$logger = LoggerManager::getLogger('CodeGeneratorListController');
			
		if (($params = $parser->getSection(OawUtil::INI_SECTION)) !== false) {
			$executablePath = $params[OawUtil::INI_EXECUTABLE];
		} else {
			$logger->error($parser->getErrorMsg(), __FILE__, __LINE__);
		}

		$basePath = dirname($executablePath);
		return $basePath . DIRECTORY_SEPARATOR . self::CARTRIDGE_DIR;
	}

	public static function readCartrdigeInfo($id, $cartridgePath) {
		$result = null;

		$infoFile = $cartridgePath . DIRECTORY_SEPARATOR . $id . DIRECTORY_SEPARATOR . self::CARTRIDGEINFO_FILE;

		$xml = simplexml_load_file($infoFile);

		if ($xml) {
			$name = (String) $xml->name;
			$system = $xml['system'] ? true : false;
			$description = (String) $xml->description;

			$dependenciesElem = $xml->dependencies;
			$dependencies = array();
			foreach($dependenciesElem as $currDependencyElem) {
				$dependencies[] = (String) $currDependencyElem->dependency;
			}

			$propertiesElem = $xml->properties;
			$properties = array();
			foreach($propertiesElem->property as $currPropertyElem) {
				$properties[(String) $currPropertyElem['name']] = (String) $currPropertyElem;
			}

			$result = array(
			'id' => $id,
			'name' => $name,
			'system' => $system,
			'description' => $description,
			'dependencies' => $dependencies,
			'properties' => $properties
			);
		}

		return $result;
	}

	// PROTECTED REGION END

}
?>
