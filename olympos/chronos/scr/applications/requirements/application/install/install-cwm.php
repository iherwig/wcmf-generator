<?php

define('SQL_FILENAME', 'application.sql');

if (file_exists(SQL_FILENAME)) {
	Log::info('Reading SQL script ' . SQL_FILENAME . ' ...', 'install');
	
	$mapper = $persistenceFacade->getMapper("Counter");
	$connection = $mapper->getConnection();
	
	Log::info('Starting transaction ...', 'install');
	$connection->startTrans();
	
	Log::info('Executing script ...', 'install');
	try {
		$ok = $connection->Execute(file_get_contents(SQL_FILENAME));
	} catch (Exception $ex) {
		$ok = false;
	}
	
	if ($ok) {
		Log::info('Execution succeeded, committing ...', 'install');
		$connection->commitTrans();
	} else {
		Log::error('Execution failed. Reason' . $connection->ErrorMsg() . '', 'install');
		Log::info('Rolling back ...', 'install');
		$connection->rollbackTrans();
	}
	
	Log::info('Finished application SQL.', 'install');
} else {
	Log::info('No application-specific SQL found.', 'install');
}
