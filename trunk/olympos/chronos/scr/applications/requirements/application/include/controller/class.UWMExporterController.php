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

require_once (BASE . 'wcmf/lib/presentation/class.Controller.php');
require_once (BASE . 'wcmf/lib/persistence/class.PersistenceFacade.php');

require_once ('class.OawUtil.php');
require_once ('class.UwmUtil.php');

class UWMExporterController extends Controller
{
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

		$tmpPropertiesPath = OawUtil::createPropertyFile('file://' . $tmpUwmExportPath, $tmpUmlPath);

		//header('Content-type: text/plain');
		header('Content-type: application/octet-stream');
		header('Content-Disposition: attachment; filename="uwm-export.uml"');

		mkdir($tmpUmlPath);
	
		$this->check("start generator");
	
		$runCfg = OawUtil::runOaw($tmpPropertiesPath, 'templates/uwm/uwm2uml2.oaw');
		
		$this->check('Generator finished');
		
		$exportFile = "$tmpUmlPath/uml-output.uml";
		
		readfile($exportFile);
		//readfile($tmpUwmExportPath);
		
		$this->check('File written to output');

		unlink($tmpUwmExportPath);
		unlink($tmpPropertiesPath);
		unlink($exportFile);
		rmdir($tmpUmlPath);
		
		$this->check("finished");
	
		return false;
	}

	public function hasView()
	{
		return false;
	}

}

?>
