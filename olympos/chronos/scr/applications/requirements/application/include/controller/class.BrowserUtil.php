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

require_once ('class.OawUtil.php');
require_once ('class.UwmUtil.php');
require_once ('class.ExportShutdownHandler.php');

/**
 * @class BrowserUtil
 * @brief Provides methods common to CWB functionality. 
 * 
 * @author 	Niko <enikao@users.sourceforge.net>
 */
class BrowserUtil {
	const DEFAULT_TEMPLATE = 'statistics';
	private static $AVAILABLE_TEMPLATES = array (
	'statistics'=>'statistics',
	'piechart'=>'piechart',
	'barchart'=>'barchart'
	);

	private static $lastTime = 0;

	private static $workingDir = null;
	private static $exportFile = null;

	private static function check($msg)
	{
		$newTime = microtime(true);
	
		//echo $newTime - self::$lastTime, ": $msg<br/ >";
		
		self::$lastTime = $newTime;
	}

	public static function runGenerator($modelOid, $templateParam)
	{
		self::check("start");
		
		self::$workingDir = OawUtil::tempName();
	
		mkdir(self::$workingDir);
	
		$umlPath = UwmUtil::prepareUmlFile($modelOid);
		while (!file_exists($umlPath)) {
			sleep(5);
		}
	
		OawUtil::setupExecutable();
	
		$template = self::DEFAULT_TEMPLATE;
		if (array_key_exists($templateParam, self::$AVAILABLE_TEMPLATES)) {
			$template = self::$AVAILABLE_TEMPLATES[$templateParam];
		}
	
		$propertyPath = self::$workingDir . '/browserStatistics.properties';
		$propertyFile = fopen($propertyPath, 'w');
		fwrite($propertyFile, 'workingDir = ' . self::$workingDir . "\n");
		fwrite($propertyFile, "umlFile = $umlPath\n");
		fwrite($propertyFile, "template = $template\n");
		fclose($propertyFile);
	
		self::$exportFile = OawUtil::createTempFile(self::$workingDir . '/browser.dat');
	
		self::check("start generator");
	
		$runCfg = OawUtil::runOaw($propertyPath, 'cartridge/BrowserStatistics/workflow/browserStatistics.oaw');
	
		self::check('Generator finished');
	
		if (filesize(self::$exportFile) == 0) {
			self::check('Zero return file size');
		
			return false;
		}
	
		unlink($propertyPath);
	
		ExportShutdownHandler::success();
	
		self::check("finished");
	
		return self::$exportFile;
	}
	
	public static function cleanup() {
		unlink(self::$exportFile);
		rmdir(self::$workingDir);
	}

}

