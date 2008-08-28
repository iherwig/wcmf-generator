<?php

require (dirname(__FILE__)."/../common/qo-admin.php");

$success = "{success: false}";

$task = ($_POST['task']) ? ($_POST['task']) : null;

if($os->is_member_logged_in()) {
	switch($task) {
		case "read":
			$success = getGridDataModuleLaunchers();
			break;
		case "delete":
			$success = deleteGridDataModuleLaunchers();
			break;
		case "edit":
			$success = editGridDataModuleLauncher();
			break;
		case "new":
			$success = saveFormDataNewModuleLauncher();
			break;
		case "readModuleNames":
			$success = getLookupModuleNames();
			break;
		case "readGroupNames":
			$success = getLookupGroupNamesPlus();
			break;
		case "readMemberNames":
			$success = getLookupMemberNamesPlus();
			break;
		case "readLauncherNames":
			$success = getLookupLauncherNames();
			break;
		default:
			break;
	}//end switch
}

print $success;

?>