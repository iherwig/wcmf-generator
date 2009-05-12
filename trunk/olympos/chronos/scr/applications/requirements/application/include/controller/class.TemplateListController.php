<?php
/*
 * Copyright (c) 2008 The Olympos Development Team.
 *
 * http://sourceforge.net/projects/olympos/
 *
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html. If redistributing this code,
 * this entire header must remain intact.
 */
 
require_once (BASE."wcmf/lib/presentation/class.Controller.php");

/**
 * @class TemplateListController
 * @ingroup Controller
 * @brief 
 * 
 * <b>Input actions:</b>
 * - @em 
 *
 * <b>Output actions:</b>
 * - @em 
 * 
 * @param[in] 
 * @param[in] 
 * @param[out] 
 * @param[out] 
 * 
 * @author 	Sabine 
 */
class TemplateListController extends Controller
{
	function hasView()
	{
		return true;
	}

	function executeKernel()
	{
	
		// execute this code only if the action is autocomplete
		if ($this->_request->getAction() == 'templatelist') {
		
			//	get Params;
			/*$param = $this->_request->getValue('param');*/

			//read server.ini to get generator path
			$generatorjarname = 'ChronosGenerator.jar';
			$serverinipath = 'application/include/server.ini';
			
			$filecontent = fopen(BASE.$serverinipath,"r");
			$read = false; $text = '';
			if ($filecontent){
				while(!feof($filecontent)){
					if (strpos($text,'[generator]')!== false) $read = true;
					if (strpos($text,'[')!== false and strpos($text,']')!== false and strpos($text,'[generator]')=== false) $read = false;
					$text = fgets($filecontent);
					if ( $read == true ) {
						if ( strpos($text,$generatorjarname)!== false and strpos($text,'executable')!== false and stripos($text,'=')!== false ){
							$generatorjarpath = trim(str_replace(array('executable','=',$generatorjarname),array('','',''),$text));
							$read = false;
						}
					}
				}
				fclose($filecontent);
			}

			//templates path
			$templatessubpath = 'cartridge/DocumentGeneration/template';
			$templateinfodatname = 'templateinfo.xml';
			$templatespath = $generatorjarpath.$templatessubpath;
			$technicalNames = array();	$titles = array();	$descriptions = array();
			$dirhandle=opendir($templatespath);
			while ($Verz = readdir ($dirhandle)){
				if ($Verz != "." && $Verz != ".." && is_dir("$templatespath/$Verz")){
					$txt = ''; $txt = file_get_contents("$templatespath/$Verz/$templateinfodatname");
					$xml = ''; $xml = simplexml_load_string( $txt );
					$title = '' ; $title = $xml->title ;
					$decr = ''; $decr = $xml->description ;
					
					array_push($technicalNames, $Verz);
					array_push($titles, $title);
					array_push($descriptions, $decr);
 				}
			}
			closedir($dirhandle); 

			//	Set the next action
			$this->_response->setAction('ok');
			
			//	Response
			$this->_response->setValue('technicalNames', $technicalNames);
			$this->_response->setValue('titles', $titles);
			$this->_response->setValue('descriptions', $descriptions);
		
		};
	
		//	Success
		return false;
	}

}

?>
