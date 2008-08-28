<?php

require (dirname(__FILE__)."/../common/qo-admin.php");

$success = "{success: false}";

$task = ($_POST['task']) ? ($_POST['task']) : null;

if($os->is_member_logged_in()) {
	switch($task) {
		case "read":
			$success = getGridDataModuleFiles();
			break;
		case "delete":
			$success = deleteGridDataModuleFiles();
			break;
		case "edit":
			$success = editGridDataModuleFile();
			break;
		case "new":
			$success = saveFormDataNewModuleFile();
			break;
		case "readModuleNames":
			$success = getLookupModuleNames();
			break;
		default:
			break;
	}//end switch
}

print $success;

?>