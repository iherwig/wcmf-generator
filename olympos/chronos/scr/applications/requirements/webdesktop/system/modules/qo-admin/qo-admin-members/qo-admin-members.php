<?php

require (dirname(__FILE__)."/../common/qo-admin.php");

$success = "{'success': false}";

$task = ($_POST['task']) ? ($_POST['task']) : null;

if($os->is_member_logged_in()) {
	switch($task) {
		case "read":
			$success = getGridDataMembers();
			break;
		case "delete":
			$success = deleteGridDataMembers();
			break;
		case "edit":
			$success = editGridDataMember();
			break;
		case "new":
			$success = saveFormDataNewMember();
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