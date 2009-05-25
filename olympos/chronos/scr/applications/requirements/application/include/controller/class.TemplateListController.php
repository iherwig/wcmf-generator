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
 * This file was generated by wCMFGenerator 3 from example-data/wcmf/requirements.uml on 2009-05-18 13:16.
 * Manual modifications should be placed inside the protected regions.
 */
require_once (BASE."wcmf/lib/presentation/class.Controller.php");
// PROTECTED REGION ID(application/include/controller/class.TemplateListController.php/Import) ENABLED START
// PROTECTED REGION END

/**
 * @class TemplateListController
 * @ingroup Controller
 * @brief @class TemplateListController
 * @ingroup Controller
 * @brief Reads out server.ini generator section to get path and reads out path to get templateinfo.xml files.
 * <b>Input actions:</b> - @em templatelist to list templatenames, titles and descriptions
 * <b>Output actions:</b> - @em ok in every case
 * @param[in]
 * @param[out] technicalNames
 * @param[out] titles
 * @param[out] descriptions
 *
 * The following configuration settings are defined for this controller:
 *
 * [actionmapping]
 * ??templatelist = TemplateListController
 *
 * [views]
 *
 * @author
 * @version 1.0
 */
class TemplateListController extends Controller
{
	// PROTECTED REGION ID(application/include/controller/class.TemplateListController.php/Body) ENABLED START
	function hasView()
	{
		return true;
	}

	function executeKernel()
	{
		if ($this->_request->getAction() == 'templatelist') {
			//	get Params;
			/*$param = $this->_request->getValue('param');*/
			
			$templatespath = self::getTemplatesPath();
			$templates = self::getTemplates($templatespath);
		
			$templateinfodatname = 'templateinfo.xml';
			$technicalNames = array ();
			$titles = array ();
			$descriptions = array ();
		
			foreach ($templates as $Verz) {
				$txt = file_get_contents("$templatespath/$Verz/$templateinfodatname");
				$xml = simplexml_load_string($txt);
				$title = $xml->title;
				$decr = $xml->description;
			
				array_push($technicalNames, $Verz);
				array_push($titles, $title);
				array_push($descriptions, $decr);
			}
		}
	
		//	Set the next action
		$this->_response->setAction('ok');
	
		//	Response
		$this->_response->setValue('technicalNames', $technicalNames);
		$this->_response->setValue('titles', $titles);
		$this->_response->setValue('descriptions', $descriptions);
	
		//	Success
		return false;
	}

	public static function getTemplatesPath() {
		$result = null;

		//read server.ini to get generator path
		$generatorjarname = 'ChronosGenerator.jar';
		$serveriniinst = &InifileParser::getInstance();
		$serveriniinst->parseIniFile('include/server.ini');
		$text = $serveriniinst->getValue('executable','generator', false);
		$generatorjarpath = trim(str_replace( $generatorjarname, '', $text));
		
		//templates path
		$templatessubpath = 'cartridge/DocumentGeneration/template';
		$result = $generatorjarpath.$templatessubpath;
		return $result;
	}

	public static function getTemplates($templatespath) {
	
		$result = array ();
	
		$dirhandle = opendir($templatespath);
		while ($Verz = readdir($dirhandle)) {
			if ($Verz != "." && $Verz != ".." && is_dir("$templatespath/$Verz")) {
				$result[] = $Verz;
			}
		}
		closedir($dirhandle);
	
		return $result;
	}

	// PROTECTED REGION END
	
}

?>
