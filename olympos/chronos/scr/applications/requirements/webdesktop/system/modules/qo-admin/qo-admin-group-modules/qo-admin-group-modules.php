<?php

require (dirname(__FILE__)."/../common/qo-admin.php");

$success = "{success: false}";

$task = ($_POST['task']) ? ($_POST['task']) : null;

if($os->is_member_logged_in()) {
	switch($task) {
		case "read":
			$success = getGridDataGroupModules();
			break;
		case "delete":
			$success = deleteGridDataGroupModules();
			break;
		case "edit":
			$success = editGridDataGroupModule();
			break;
		case "new":
			$success = saveFormDataNewGroupModule();
			break;
		case "readModuleNames":
			$success = getLookupModuleNames();
			break;
		case "readGroupNames":
			$success = getLookupGroupNames();
			break;
		default:
			break;
	}//end switch
}

print $success;

?>