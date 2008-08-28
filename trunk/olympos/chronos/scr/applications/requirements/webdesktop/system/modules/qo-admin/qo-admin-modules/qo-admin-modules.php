<?php

// Output the desired table as a JSON Data Structure

require (dirname(__FILE__)."/../common/qo-admin.php");

$success = "{'success': false}";

$task = ($_POST['task']) ? ($_POST['task']) : null;

if($os->is_member_logged_in()) {
	switch($task) {
		case "read":
			$success = getGridDataModules();
			break;
		case "delete":
			$success = deleteGridDataModules();
			break;
		case "edit":
			$success = editGridDataModule();
			break;
		case "new":
			$success = saveFormDataNewModule();
			break;
		case "readGroupNames":
			$success = getLookupGroupNames();
			break;
		case "readLauncherNames":
			$success = getLookupLauncherNames();
			break;
		default:
			break;
	}//end switch
}

print $success;

function getModules () {

	$success = "{'qo_modules': []}";
	$sql = 'select `id`, `moduleName`, `moduleType`, `moduleId` as fmoduleId, `version`, `author`, `description`, `path`, `active` from `qo_modules`';
	
	if($result = mysql_query($sql))
	{
		/* If you don't have built in json services, use this.
		 * connect.php makes this json class available */
		$json = new Services_JSON();
	
		$items = array();
		while($row = mysql_fetch_assoc($result))
		{
			$items[] = $row;
		}
		
		/* If you have built in json support
		$success = '{"qo_modules":'.json_encode($items).'}'; */
		 
		/* If not */
		$success = '{"qo_modules":'.$json->encode($items).'}';
	}
	
	return $success;
	
}

function deleteModules () {

	$key = $_POST['key'];
    $arr = $_POST['deleteKeys'];
    $count = 0;
	$selectedRows = json_decode(stripslashes($arr));//decode the data from json format
	
    //should validate and clean data prior to posting to the database
    foreach($selectedRows as $row_id)
    {
        $id = (integer) $row_id;
        $sql = 'DELETE FROM `qo_modules` WHERE `'.$key.'` = '.$id;
        $result = mysql_query($sql); //returns number of rows deleted
        if ($result) $count++;
		
		// Delete rows from other tables
		$sql = 'DELETE FROM `qo_modules_has_files` where qo_modules_id = '.$id;
		$result = mysql_query($sql);
		$sql = 'DELETE FROM `qo_modules_has_launchers` where qo_modules_id = '.$id;
		$result = mysql_query($sql);
		$sql = 'DELETE FROM `qo_groups_has_modules` where qo_modules_id = '.$id;
		$result = mysql_query($sql);
    }
	
    if ($count) { //only checks if the last record was deleted, others may have failed

        /* If using ScriptTagProxy:  In order for the browser to process the returned
           data, the server must wrap te data object with a call to a callback function,
           the name of which is passed as a parameter by the ScriptTagProxy. (default = "stcCallback1001")
           If using HttpProxy no callback reference is to be specified*/
        $cb = isset($_GET['callback']) ? $_GET['callback'] : '';
        $response = array('success'=>$count, 'del_count'=>$count);
        $json_response = json_encode($response);
        return $cb . $json_response;
    } else {
        return '{failure: true}';
    }
}

function editModule() {
    /*
     * $key:   db primary key label
     * $id:    db primary key value
     * $field: column or field name that is being updated (see data.Record mapping)
     * $value: the new value of $field
     */ 

    $key = $_POST['key'];
    $id    = (integer) mysql_real_escape_string($_POST['keyID']);
    $field = mysql_real_escape_string($_POST['field']);
    $value = mysql_real_escape_string ($_POST['value']);
	
	// this is because moduleId is used by this.app.connect for alternate purpose
	$field = ($field == 'fmoduleId') ? 'moduleId' : $field;
   
    //should validate and clean data prior to posting to the database

    $sql = 'UPDATE `qo_modules` SET `'.$field.'` = \''.$value.'\' WHERE `'.$key.'` = '.$id;
	
    if (mysql_query($sql)) {
		return "{success:true}";
    } else {
        return "{success:false}";
    }
}

function newModule() {

	// make all the strings safe
	$fModuleName 	= '\''.mysql_real_escape_string($_POST['moduleName']).'\'';
	$fModuleType 	= '\''.mysql_real_escape_string($_POST['moduleType']).'\'';
	$fModuleId 		= '\''.mysql_real_escape_string($_POST['fmoduleId']).'\'';
	$fVersion 		= '\''.mysql_real_escape_string($_POST['version']).'\'';
	$fAuthor 		= '\''.mysql_real_escape_string($_POST['author']).'\'';
	$fDescription 	= '\''.mysql_real_escape_string($_POST['description']).'\'';
	$fPath 			= '\''.mysql_real_escape_string($_POST['path']).'\'';
	$fActive 		= '\''.mysql_real_escape_string($_POST['active']).'\'';
	$fFileJS		= mysql_real_escape_string($_POST['file_js']);
	$fFilePHP		= mysql_real_escape_string($_POST['file_php']);
	$fFileCSS		= mysql_real_escape_string($_POST['file_css']);
	$fGroup			=  (integer) mysql_real_escape_string($_POST['qo_groups_id']);
	$fLauncher		=  (integer) mysql_real_escape_string($_POST['qo_launchers_id']);
	
	$sql = 'INSERT INTO `qo_modules` (`moduleName`, `moduleType`, `moduleId`, `version`, `author`, `description`, `path`, `active`)
		VALUES ('.$fModuleName.','.$fModuleType.','.$fModuleId.','.$fVersion.','.$fAuthor.','.$fDescription.','.$fPath.','.$fActive.')';
	if (mysql_query($sql)) {
		$save_message = 'Saved Module';
		$failed_message = '';
		// now we perform our other inserts
		// Insert our files into qo_modules_has_files
		if ($fFileJS != '') {
			$sql = 'INSERT INTO `qo_modules_has_files` (`qo_modules_id`, `name`, `type`)
				SELECT id, \''.$fFileJS.'\', \'javascript\'
				FROM qo_modules
				WHERE moduleId = '.$fModuleId;
			if (mysql_query($sql)) {
				$save_message .= ', javascript';
			} else {
				$failed_message .= 'javascript';
			}
		}
		if (trim($fFilePHP) != '') {
			$sql = 'INSERT INTO `qo_modules_has_files` (`qo_modules_id`, `name`, `type`)
				SELECT id, \''.$fFilePHP.'\', \'php\'
				FROM qo_modules
				WHERE moduleId = '.$fModuleId;
			if (mysql_query($sql)) {
				$save_message .= ', php';
			} else {
				$failed_message .= ' php';
			}
		}
		if (trim($fFileCSS) != '') {
			$sql = 'INSERT INTO `qo_modules_has_files` (`qo_modules_id`, `name`, `type`)
				SELECT id, \''.$fFileCSS.'\', \'css\'
				FROM qo_modules
				WHERE moduleId = '.$fModuleId;
			if (mysql_query($sql)) {
				$save_message .= ', css';
			} else {
				$failed_message .= ' css';
			}
		}
		if ($fGroup != ''){
			$sql = 'INSERT INTO `qo_groups_has_modules` (`qo_groups_id`, `qo_modules_id`, `active`)
				SELECT '.$fGroup.', id, \'true\'
				FROM qo_modules
				WHERE moduleId = '.$fModuleId;
			if (mysql_query($sql)) {
				$save_message .= ', group';
			} else {
				$failed_message .= ' group';
			}
		}
		if ($fLauncher != ''){
			$sql = 'INSERT INTO `qo_modules_has_launchers` (`qo_members_id`, `qo_groups_id`, `qo_modules_id`, `qo_launchers_id`, `sort_order`)
				SELECT 0, 0, id, '.$fLauncher.', 20
				FROM qo_modules
				WHERE moduleId = '.$fModuleId;
			if (mysql_query($sql)) {
				$save_message .= ', launcher';
			} else {
				$failed_message .= ' launcher';
			}
		}
		if ($failed_message != '') {
			$failed_message = str_replace (' ', ', ', ltrim($failed_message));
			$save_message .= ', FAILED on '.$failed_message;
		}
		$response = array('success'=>'true', 'save_message'=>$save_message);
    } else {
        $response = array('success'=>'false');
    }
	$json_response = json_encode($response);
	return $json_response;

}

function getGroupNames () {

	$success = "{'qo_groups': []}";
	$sql = 'select `id` as "KeyField", `name` as "DisplayField" from `qo_groups`';
	
	if($result = mysql_query($sql))
	{
		/* If you don't have built in json services, use this.
		 * connect.php makes this json class available */
		$json = new Services_JSON();
	
		$items = array();
		while($row = mysql_fetch_assoc($result))
		{
			$items[] = $row;
		}
		
		/* If you have built in json support
		$success = '{"qo_groups":'.json_encode($items).'}'; */
		 
		/* If not */
		$success = '{"qo_groups":'.$json->encode($items).'}';
	}
	
	return $success;
	
}

function getLauncherNames () {

	$success = "{'qo_launchers': []}";
	$sql = 'select `id` as "KeyField", `name` as "DisplayField" from `qo_launchers`';
	
	if($result = mysql_query($sql))
	{
		/* If you don't have built in json services, use this.
		 * connect.php makes this json class available */
		$json = new Services_JSON();
	
		$items = array();
		while($row = mysql_fetch_assoc($result))
		{
			$items[] = $row;
		}
		
		/* If you have built in json support
		$success = '{"qo_launchers":'.json_encode($items).'}'; */
		 
		/* If not */
		$success = '{"qo_launchers":'.$json->encode($items).'}';
	}
	
	return $success;
	
}

?>

