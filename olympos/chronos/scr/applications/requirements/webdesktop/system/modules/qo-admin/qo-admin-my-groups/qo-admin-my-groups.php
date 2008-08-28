<?php

require (dirname(__FILE__)."/../common/qo-admin.php");

$success = "{success: false}";

$task = ($_POST['task']) ? ($_POST['task']) : null;

if($os->is_member_logged_in()) {
	$fMemberId = $os->get_member_id();
	switch($task) {
		case "read":
			$success = getGridDataMyGroups($fMemberId);
			break;
		case "delete":
			$success = deleteGridDataMemberGroups();
			break;
		case "edit":
			$success = editGridDataMemberGroup();
			break;
		case "new":
			$success = saveFormDataNewMemberGroup();
			break;
		case "readMemberNames":
			$success = getLookupMemberNames();
			break;
		case "readGroupNames":
			$success = getLookupMyGroupNames($fMemberId);
			break;
		default:
			break;
	}//end switch
}

print $success;

?>