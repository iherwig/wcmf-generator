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

require_once (BASE.'wcmf/lib/presentation/class.Controller.php');

require_once ('class.BrowserUtil.php');

class BrowserStatisticsController extends Controller
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
	
		$modelOid = $this->_request->getValue('modelOid');
		$templateParam = $this->_request->getValue('template');
	
		$exportFile = BrowserUtil::runGenerator($modelOid, $templateParam);

		$this->check("exportFile: $exportFile");
	
		//header('Content-type: text/plain');
		header('Content-type: text/json');
	
		readfile($exportFile);
	
		$this->check('File written to output');
	
		BrowserUtil::cleanup();
	
		return false;
	}

	public function hasView()
	{
		return false;
	}

}

