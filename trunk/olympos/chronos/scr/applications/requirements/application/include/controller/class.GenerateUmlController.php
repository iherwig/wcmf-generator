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
 * This file was generated by wCMFGenerator 3.0.0017 from requirements.uml on Mon Aug 03 13:49:08 CEST 2009. 
 * Manual modifications should be placed inside the protected regions.
 */
 require_once(BASE."wcmf/lib/presentation/class.Controller.php");
// PROTECTED REGION ID(application/include/controller/class.GenerateUmlController.php/Import) ENABLED START

require_once (BASE . 'wcmf/lib/persistence/class.PersistenceFacade.php');

require_once ('class.OawUtil.php');
require_once ('class.UwmUtil.php');
require_once('class.ExportShutdownHandler.php');

// PROTECTED REGION END

/**
 * @class GenerateUmlController
 * @ingroup Controller
 * @brief @class GenerateUmlController
 * @ingroup Controller
 * @brief Generates UML out of the passed model, and saves the UML file. 
 * <b>Input actions:</b> - @em generateUml Generates and saves a UML file. 
 * <b>Output actions:</b> - @em failure If a fatal error occurs - @em ok In any other case 
 * @param[in] modelOid The OID of the model to generate UML for. 
 * 
 * The following configuration settings are defined for this controller:
 *
 * [actionmapping]
 * ??generateUml = GenerateUmlController
 *
 * [views]
 * 
 * @author 
 * @version 1.0
 */
class GenerateUmlController extends Controller
{
// PROTECTED REGION ID(application/include/controller/class.GenerateUmlController.php/Body) ENABLED START
	private $lastTime = 0;

	private function check($msg)
	{
		$newTime = microtime(true);
	
		//echo $newTime - $this->lastTime, ": $msg<br/ >";
		
		$this->lastTime = $newTime;
	}

	public function executeKernel()
	{
		$this->check("start");

		$startModel = $this->_request->getValue('modelOid');

		$umlPath = UwmUtil::prepareUmlFile($startModel);
		unlink($umlPath);

		$tmpUwmExportPath = OawUtil::tempName();
		
		$this->check('starting Export');
		UwmUtil::exportXml($tmpUwmExportPath, $startModel, null);
		$this->check('finished export');

		$tmpUmlPath = OawUtil::tempName();
		
		$tmpPropertiesPath = OawUtil::createPropertyFile('file://' . $tmpUwmExportPath, $tmpUmlPath);

		mkdir($tmpUmlPath);
	
		$this->check("start generator");
	
		$runCfg = OawUtil::runOaw($tmpPropertiesPath, 'cartridge/UmlConnector/workflow/cwm2uml.oaw');
		
		$this->check('Generator finished');
		
		$exportFile = "$tmpUmlPath/uml-generated.uml";

		if (filesize($exportFile) == 0) {
			$this->check('Zero return file size');
			
			return false;
		}

		copy($exportFile, $umlPath);
		chmod($umlPath, 0777);
		
		$this->check('File written to store');

		unlink($tmpUwmExportPath);
		unlink($tmpPropertiesPath);
		unlink($exportFile);
		rmdir($tmpUmlPath);
		
		ExportShutdownHandler::success();

		$this->check("finished");
	
		return false;
	}

	public function hasView()
	{
		return false;
	}
// PROTECTED REGION END

}
?>
