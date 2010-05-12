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
 * This file was generated by wCMFGenerator 3.0.0018 from requirements.uml on Tue Apr 27 15:45:08 CEST 2010. 
 * Manual modifications should be placed inside the protected regions.
 */
 require_once(BASE."wcmf/lib/presentation/class.Controller.php");
// PROTECTED REGION ID(application/include/controller/class.TemplateListController.php/Import) ENABLED START
// PROTECTED REGION END

/**
 * @class TemplateListController
 * @ingroup Controller
 * @brief Reads out server.ini generator section to get path and reads out path to get templateinfo.xml files
 * for the given domain classes.
 * 
 * <b>Input actions:</b> 
 * - @em templatelist to list templatenames, titles and descriptions
 * 
 * <b>Output actions:</b> 
 * - @em ok in every case
 * 
 * @param[in] scope A domain class name for which the template infos should be retrieved. Optional, if empty, all template infos will be retrieved. 
 * @param[out] templates An array of template infos with keys: 'technicalName', 'title', 'description', 'exportImages', 'inputType', 'forcedResultType', 'scope', 'action' 
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
		$scope = null;
		if ($this->_request->hasValue('scope')) {
			$scope = $this->_request->getValue('scope');
		}
		$result = self::getContent($scope);

		//	Set the next action
		$this->_response->setAction('ok');

		//	Response
		$this->_response->setValue('templates', $result);

		//	Success
		return false;
	}

	/**
	 * Get the template infos for a given scope
	 * @param scope A domain class name for which templates should be retrieved, optional.
	 * If not given, all tmeplate infos will be retrieved.
	 * @return An array of associative arrays
	 * @note The scope name must be contained in the comma separated list inside the scope 
	 * element of the template info
	 */
	public static function getContent($scope=null) {
		$result = array();

		$templatespath = self::getTemplatesPath();
		$templates = self::getTemplates($templatespath);

		$templateinfodatname = 'templateinfo.xml';
		$technicalNames = array ();
		$titles = array ();
		$descriptions = array ();

		foreach ($templates as $name) {
			$txt = file_get_contents("$templatespath/$name/$templateinfodatname");
			$xml = simplexml_load_string($txt);
			$title = $xml->title;
			$descr = self::getNodeInnerXml($xml->description);
			$exportImages = !($xml->exportImages == 'false');
			$inputType = $xml->inputType;
			$forcedResultType = $xml->forcedResultType;
			$availableScopes = $xml->scope;
			$action = $xml->action;
			
			if (strlen($availableScopes) > 0) {
				$scopeList = split(',', $availableScopes);
			}
			else {
				$scopeList = array();
			}
			if ($scope == null || sizeof($scopeList) == 0 || 
				($scope != null && sizeof($scopeList) > 0 && in_array($scope, $scopeList))) {
				$result[$name] = array(
					'technicalName' => $name,
					'title' => utf8_decode($title),
					'description' => utf8_decode($descr),
					'exportImages' => $exportImages,
					'inputType' => '' . $inputType,
					'forcedResultType' => '' . $forcedResultType,
					'scope' => '' . $availableScopes,
					'action' => '' . $action
				);
			}
		}

		return $result;
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

	private static function getNodeInnerXml($node) {
		$result = $node->asXML();
		
		$result = preg_replace('/^<[^>]+>/', '', $result, 1);
		$result = preg_replace('/<[^>]+>$/', '', $result, 1);
		
		return $result;
	}

	// PROTECTED REGION END

}
?>
