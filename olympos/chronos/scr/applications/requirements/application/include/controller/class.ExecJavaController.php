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
require_once (BASE."wcmf/lib/persistence/class.PersistenceFacade.php");

class ExecJavaController extends Controller
{
	const CLASSPATH = 'HelloTest';
	const JAVA_PATH = 'C:/Progra~1/Java/jdk1.6.0_06/bin/java.exe';
	
	private $lastTime = 0;

	private function check($msg)
	{
		$newTime = microtime(true);
	
		//echo $newTime - $this->lastTime, ": $msg<br/ >";
		
		$this->lastTime = $newTime;
	}

	public function execute()
	{
		//header('Content-type: text/plain');
		header('Content-type: application/octet-stream');
		header('Content-Disposition: attachment; filename="uwm.test"');
	
		$this->check("start");
	
		echo $this->_request->getValue('werst');
	
		$descriptorspec = array (
		0=> array ('pipe', 'r'), // stdin is a pipe that the child will read from
		1=> array ('pipe', 'w'), // stdout is a pipe that the child will write to
		2=> array ('pipe', 'w')
		);
	
		$cwd = 'C:/Private-Workspace/cwm/gui';
		$env = array ('some_option'=>'aeiou');
	
		$cmd = self::JAVA_PATH.' '.self::CLASSPATH.' 5 "das ist ein Test" werden tun';
	
		echo "cmd: $cmd\n";
	
		$process = proc_open($cmd, $descriptorspec, $pipes, $cwd, $env);
	
		if (is_resource($process)) {
			// $pipes now looks like this:
			// 0 => writeable handle connected to child stdin
			// 1 => readable handle connected to child stdout
			
			fwrite($pipes[0], 'Eingabäää');
			fclose($pipes[0]);
		
			echo 'Output: ', stream_get_contents($pipes[1]), "\n";
			fclose($pipes[1]);
		
			echo 'Error: ', stream_get_contents($pipes[2]), "\n";
			fclose($pipes[2]);
		
			// It is important that you close any pipes before calling
			// proc_close in order to avoid a deadlock
			$return_value = proc_close($process);
		
			echo "command returned $return_value\n";
		}
		$this->check("finished");
	
		return false;
	}

	public function hasView()
	{
		return false;
	}

}

?>
