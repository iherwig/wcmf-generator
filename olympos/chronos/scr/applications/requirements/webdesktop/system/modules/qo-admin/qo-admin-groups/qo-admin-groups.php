<?php

require (dirname(__FILE__)."/../common/qo-admin.php");

$success = "{success: false}";

$task = ($_POST['task']) ? ($_POST['task']) : null;

if($os->is_member_logged_in()) {
	switch($task) {
		case "read":
			$success = getGridDataGroups();
			break;
		case "delete":
			$success = deleteGridDataGroups();
			break;
		case "edit":
			$success = editGridDataGroup();
			break;
		case "new":
			$success = saveFormDataNewGroup();
			break;
		default:
			break;
	}//end switch
}

print $success;

?>