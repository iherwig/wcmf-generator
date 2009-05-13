<?php
/**
 * This file was generated by wCMFGenerator 3 from example-data/wcmf/requirements.uml on 2009-05-13 17:46. 
 * Manual modifications should be placed inside the protected regions.
 */
 require_once(BASE."wcmf/lib/presentation/class.Controller.php");
// PROTECTED REGION ID(application/include/controller/class.TemplateListController.php/Import) ENABLED START
// PROTECTED REGION END

/**
 * @class TemplateListController
 * @ingroup Controller
 * @brief reads out server.ini generator section to get path and reads out path to get templateinfo.xml files 
 * 
 * <b>Input actions:</b>
 * - @em templatelist to list templatenames, titles and descriptions
 *
 * <b>Output actions:</b>
 * - @em ok in every case
 *  
 * @param[in] 
 * @param[out] technicalNames
 * @param[out] titles
 * @param[out] descriptions
 * 
 * @author 	Sabine 
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

// PROTECTED REGION END

}
?>
