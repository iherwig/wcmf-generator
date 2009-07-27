<?php

define('SQL_FILENAME', 'upgrade-cwm.sql');

if (file_exists(SQL_FILENAME)) {
	Log::info('Reading SQL script ' . SQL_FILENAME . ' ...', 'dbupdate');
	
	$mapper = $persistenceFacade->getMapper("Counter");
	$connection = $mapper->getConnection();
	
	Log::info('Starting transaction ...', 'dbupdate');
	$connection->startTrans();
	
	Log::info('Executing script ...', 'dbupdate');
	try {
		$fh = fopen(SQL_FILENAME, 'r');
		while (!feof($fh)) {
			$command = fgets($fh, 8192);
			if (strlen(trim($command)) > 0) {
				Log::info('Executing command: '.$command, 'dbupdate');
				$ok = $connection->Execute($command);
				if (!$ok)
					break;
			}
		} 
		fclose($fh);
	} 
	catch (Exception $ex) {
		$ok = false;
	}
	
	if ($ok) {
		Log::info('Execution succeeded, committing ...', 'dbupdate');
		$connection->commitTrans();
	}
	else {
		Log::error('Execution failed. Reason' . $connection->ErrorMsg() . '', 'dbupdate');
		Log::info('Rolling back ...', 'dbupdate');
		$connection->rollbackTrans();
	}
	
	Log::info('Finished application SQL.', 'dbupdate');
} else {
	Log::info('No application-specific SQL found.', 'dbupdate');
}
