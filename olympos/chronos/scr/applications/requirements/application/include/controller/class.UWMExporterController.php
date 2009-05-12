<?php
/**
 * This file was generated by wCMFGenerator 3.0.0010 from ./model/cwm.uml on Tue May 12 16:21:26 CEST 2009.
 * Manual modifications should be placed inside the protected regions.
 */
require_once (BASE."wcmf/lib/presentation/class.Controller.php");
// PROTECTED REGION ID(application/include/controller/class.UWMExporterController.php/Import) ENABLED START
require_once (BASE.'wcmf/lib/persistence/class.PersistenceFacade.php');

require_once ('class.OawUtil.php');
require_once ('class.UwmUtil.php');
require_once ('class.ExportShutdownHandler.php');
// PROTECTED REGION END

class UWMExporterController extends Controller
{
	// PROTECTED REGION ID(application/include/controller/class.UWMExporterController.php/Body) ENABLED START
	
	const SHUTDOWN_ERROR_VARIABLE = 'UwmExporterControllerError';

	private $lastTime = 0;

	private function check($msg)
	{
		$newTime = microtime(true);
	
		//echo $newTime - $this->lastTime, ": $msg<br/ >";
		
		$this->lastTime = $newTime;
	}

	public function execute()
	{
		$this->check("start");
	
		$tmpUwmExportPath = OawUtil::tempName();
	
		$startModel = $this->_request->getValue('startModel');
		$startPackage = $this->_request->getValue('startPackage');
	
		UwmUtil::exportXml($tmpUwmExportPath, $startModel, $startPackage);
	
		$tmpUmlPath = OawUtil::tempName();
	
		$tmpPropertiesPath = OawUtil::createPropertyFile('file://'.$tmpUwmExportPath, $tmpUmlPath);
	
		
		mkdir($tmpUmlPath);
	
		$this->check("start generator");
	
		$runCfg = OawUtil::runOaw($tmpPropertiesPath, 'cartridge/UmlConnector/workflow/cwm2uml.oaw');
	
		$this->check('Generator finished');
	
		$exportFile = "$tmpUmlPath/uml-generated.uml";
	
		if (filesize($exportFile) == 0) {
			$this->check('Zero return file size');
		
			return false;
		}
	
		//header('Content-type: text/plain');
		header('Content-type: application/octet-stream');
		header('Content-Disposition: attachment; filename="cwm-export.uml"');
	
		readfile($exportFile);
		//readfile($tmpUwmExportPath);
		
		$this->check('File written to output');
	
		unlink($tmpUwmExportPath);
		unlink($tmpPropertiesPath);
		unlink($exportFile);
		rmdir($tmpUmlPath);
	
		ExportShutdownHandler::success();
	
		$this->check("finished");
	
		return false;
	}

	/**
	 * @see Controller::hasView()
	 */
	function hasView()
	{
		return false;
	}

	/**
	 * @see Controller::executeKernel()
	 */
	function executeKernel()
	{
		return true;
	}

	// PROTECTED REGION END
	
}

?>
