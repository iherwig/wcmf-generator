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

class OawUtil {
	const INI_SECTION = 'generator';
	const INI_EXECUTABLE = 'executable';

	private static $TEMP_PATHS = array('/tmp', '/temp', '/var/tmp', '/var/temp', 'C:/temp', 'C:/tmp', 'C:/windows/temp');
	const TEMP_FALLBACK = '/tmp';
	private static $tempPath;
	
	private static $cwd;
	private static $executable;

	public static function tempName() {
		$tempPath = self::getTempPath();
		
		$result = '';
		
		do {
			$rand = rand(0, 0xffffff);
			$result = "$tempPath/oaw$rand.tmp";
		} while (file_exists($result));

		return $result;
	}
	
	private static function getTempPath() {
		if (!self::$tempPath) {
			for ($i = 0; $i < count(self::$TEMP_PATHS); $i++) {
				$currPath = self::$TEMP_PATHS[$i];
				
				if (is_dir($currPath)) {
					self::$tempPath = $currPath;
					break;
				}
			}
		}
		if (!self::$tempPath) {
			self::$tempPath = self::TEMP_FALLBACK;
		}
		
		return self::$tempPath;
	}
	
	public static function setupExecutable() {
	    $parser = InifileParser::getInstance();
	    if (($params = $parser->getSection(self::INI_SECTION)) === false) {
			$logger = LoggerManager::getLogger('OawUtil');

			$logger->error($parser->getErrorMsg(), __FILE__, __LINE__);
		}
		$executablePath = $params[self::INI_EXECUTABLE];
	
		self::$cwd = dirname(realpath($executablePath));
		self::$executable = basename($executablePath);
	}

	public static function createPropertyFile($uwmPath, $umlPath) {
		self::setupExecutable();
		
		$numSlashes = substr_count(str_replace('\\', '/', self::$cwd), '/');
		$relativeCwdPath = '';
		for ($i = 0; $i < $numSlashes; $i++) {
			$relativeCwdPath .= '../';
		}
		$umlRelativePath = $relativeCwdPath . preg_replace('/^[a-zA-Z]:\\\\/', '', $umlPath);
		
		$propertiesPath = self::tempName();
		$propertiesFile = fopen($propertiesPath, 'w');
		fwrite($propertiesFile, "inputUri = $uwmPath\n");
		fwrite($propertiesFile, "outputRelativePath = $umlRelativePath\n");
		fclose($propertiesFile);
		
		return $propertiesPath;
	}
	
	public static function runOaw($propertyFilePath, $relativeWorkflowPath) {
		$result = null;

		$descriptorspec = array (
			0=> array ('pipe', 'r'), // stdin is a pipe that the child will read from
			1=> array ('pipe', 'w'), // stdout is a pipe that the child will write to
			2=> array ('pipe', 'w')
		);
	
		$cmd = 'java -Djava.library.path=./lib/ -jar ' . self::$executable . " $relativeWorkflowPath -basePath=. \"-propertyFile=$propertyFilePath\"";

		$process = proc_open($cmd, $descriptorspec, $pipes, self::$cwd, $env);
	

		if (is_resource($process)) {
			$result = array();
			// $pipes now looks like this:
			// 0 => writeable handle connected to child stdin
			// 1 => readable handle connected to child stdout
			
			fclose($pipes[0]);
		
			$result['stdout'] = stream_get_contents($pipes[1]);
			fclose($pipes[1]);
		
			$result['stderr'] = stream_get_contents($pipes[2]);
			fclose($pipes[2]);
		
			// It is important that you close any pipes before calling
			// proc_close in order to avoid a deadlock
			$returnCode = proc_close($process);
			$result['returncode'] = $returnCode;

			$logger = LoggerManager::getLogger('OawUtil');

			$logger->error("oAW run\nstdout: " . $result['stdout'] . "\nstderr: " . $result['stderr'] . "\nreturncode: " . $result['returncode'], __FILE__, __LINE__);
		}
		
		return $result;
	}
}
?>