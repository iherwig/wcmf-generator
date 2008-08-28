<?php
// Author: Paul Simmons
// Version
// 1.1.0

// ============================================================================
// Generic Functions
// ============================================================================

function getData ($json_key, $sql_query, $order_column=2) {
	$success = "{'" . $json_key . "': []}";
	
	if($result = mysql_query($sql_query . ' order by ' . $order_column))
	{
		$items = array();
		while($row = mysql_fetch_assoc($result))
		{
			$items[] = $row;
		}
		$success = "{'" . $json_key . "':" . json_encode($items) . "}";
	}
	
	return $success;
}

// ============================================================================
// Get Grid Data Functions
// ============================================================================

function getGridDataGroupModules () {

	// qo_groups_has_modules a composite primary key so we need to create an id for the grid
	$sql = 'SELECT concat(`qo_groups_id`,"^",`qo_modules_id`) as "id", `qo_groups_id`, `qo_modules_id`, `active` 
	        FROM `qo_groups_has_modules`';

	return getData ("qo_groups_has_modules", $sql, '2,3');
	
}

function getGridDataGroups () {

	$sql = 'select `id`, `name`, `description`, `active` from `qo_groups`';
	
	return getData ("qo_groups", $sql);
}

function getGridDataMemberGroups () {

	$sql = 'SELECT concat(`qo_members_id`,"^",`qo_groups_id`) as "id", `qo_members_id`, `qo_groups_id`, `active`, `admin_flag` 
	        FROM `qo_members_has_groups`';
	
	return getData ("qo_members_has_groups", $sql, '2,3');
	
}

function getGridDataMembers () {

	$sql = 'select `id`, `first_name`, `last_name`, `email_address`, `password`, `active` from `qo_members`';
	
	return getData ("qo_members", $sql, 4);
	
}

function getGridDataModuleFiles () {

	$sql = 'SELECT concat(`qo_modules_id`,"^",`name`) as "id", `qo_modules_id`, `name`, `type` 
	        FROM `qo_modules_has_files`';
	
	return getData ("qo_modules_has_files", $sql, '2,3');
	
}

function getGridDataModuleLaunchers () {

	$sql = 'SELECT concat(`qo_members_id`,"^",`qo_groups_id`,"^",`qo_modules_id`,"^",`qo_launchers_id`) as "id", `qo_members_id`, `qo_groups_id`, `qo_modules_id`, `qo_launchers_id`, `sort_order` 
	        FROM `qo_modules_has_launchers`';
	
	return getData ("qo_modules_has_launchers", $sql, '2,3,4,5');
	
}

function getGridDataModules () {

	$success = "{'qo_modules': []}";
	$sql = 'select `id`, `moduleName`, `moduleType`, `moduleId` as fmoduleId, `version`, `author`, `description`, `path`, `active` from `qo_modules`';
	
	return getData ("qo_modules", $sql);
	
}

function getGridDataMyGroups ($fMemberId) {

	$sql = 'SELECT concat(`qo_members_id`,"^",`qo_groups_id`) as "id", `qo_members_id`, `qo_groups_id`, `active`, `admin_flag`
			FROM `qo_members_has_groups`
			where `qo_groups_id` in 
				(select a.`qo_groups_id`
				 from `qo_members_has_groups` a
				 where a.`qo_members_id` = ' . $fMemberId . '
				 and a.`admin_flag` = "true")';
	
	return getData ("qo_members_has_groups", $sql, '2,3');
	
}

// ============================================================================
// Delete Grid Data Functions
// ============================================================================

function deleteGridDataGroupModules () {

    $arr = $_POST['deleteKeys'];
    $count = 0;
	$selectedRows = json_decode(stripslashes($arr));//decode the data from json format
	
    //should validate and clean data prior to posting to the database
    foreach($selectedRows as $row_id)
    {
		// we need to strip out the composite key to its individual parts
		list ($id1, $id2) = explode ('^', $row_id, 2);
        $id1 = (integer) $id1;
        $sql = 'DELETE FROM `qo_groups_has_modules` 
		        WHERE `qo_groups_id` = '.$id1.' and `qo_modules_id` = \''.$id2.'\'';
        $result = mysql_query($sql); //returns number of rows deleted
        if ($result) $count++;
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

function deleteGridDataGroups () {

	$key = $_POST['key'];
    $arr = $_POST['deleteKeys'];
    $count = 0;
	
	$selectedRows = json_decode(stripslashes($arr));//decode the data from json format
	
    //should validate and clean data prior to posting to the database
    foreach($selectedRows as $row_id)
    {
        $id = (integer) $row_id;
        $sql = 'DELETE FROM `qo_groups` WHERE `'.$key.'` = '.$id;
        $result = mysql_query($sql); //returns number of rows deleted
        if ($result) $count++;
		
		// Delete rows from other tables
		$sql = 'DELETE FROM `qo_groups_has_modules` WHERE `qo_groups_id` = '.$id;
        $result = mysql_query($sql);
		$sql = 'DELETE FROM `qo_members_has_groups` WHERE `qo_groups_id` = '.$id;
        $result = mysql_query($sql);
		$sql = 'DELETE FROM `qo_modules_has_launchers` WHERE `qo_groups_id` = '.$id;
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

function deleteGridDataMemberGroups () {

    $arr = $_POST['deleteKeys'];
    $count = 0;
	$selectedRows = json_decode(stripslashes($arr));//decode the data from json format
	
    //should validate and clean data prior to posting to the database
    foreach($selectedRows as $row_id)
    {
		list ($id1, $id2) = explode ('^', $row_id, 2);
        $id1 = (integer) $id1;
        $sql = 'DELETE FROM `qo_members_has_groups` 
		        WHERE `qo_members_id` = '.$id1.' and `qo_groups_id` = \''.$id2.'\'';
        $result = mysql_query($sql); //returns number of rows deleted
        if ($result) $count++;
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

function deleteGridDataMembers () {

	$key = $_POST['key'];
    $arr = $_POST['deleteKeys'];
    $count = 0;
	
	$selectedRows = json_decode(stripslashes($arr));//decode the data from json format
	
    //should validate and clean data prior to posting to the database
    foreach($selectedRows as $row_id)
    {
        $id = (integer) $row_id;
        $sql = 'DELETE FROM `qo_members` WHERE `'.$key.'` = '.$id;
        $result = mysql_query($sql); //returns number of rows deleted
        if ($result) $count++;
		
		// Delete details from other tables
		$sql = 'DELETE FROM `qo_members_has_groups` WHERE qo_members_id = '.$id;
        $result = mysql_query($sql);
		$sql = 'DELETE FROM `qo_modules_has_launghers` WHERE qo_members_id = '.$id;
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

function deleteGridDataModuleFiles () {

    $arr = $_POST['deleteKeys'];
    $count = 0;
	$selectedRows = json_decode(stripslashes($arr));//decode the data from json format
	
    //should validate and clean data prior to posting to the database
    foreach($selectedRows as $row_id)
    {
		list ($id1, $id2) = explode ('^', $row_id, 2);
        $id1 = (integer) $id1;
        $sql = 'DELETE FROM `qo_modules_has_files` 
		        WHERE `qo_modules_id` = '.$id1.' and `name` = \''.$id2.'\'';
        $result = mysql_query($sql); //returns number of rows deleted
        if ($result) $count++;
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

function deleteGridDataModuleLaunchers () {

    $arr = $_POST['deleteKeys'];
    $count = 0;
	$selectedRows = json_decode(stripslashes($arr));//decode the data from json format
	
    //should validate and clean data prior to posting to the database
    foreach($selectedRows as $row_id)
    {
		list ($id1, $id2, $id3, $id4) = explode ('^', $row_id, 4);
        $id1 = (integer) $id1;
        $id2 = (integer) $id2;
        $id3 = (integer) $id3;
        $id4 = (integer) $id4;
        $sql = 'DELETE FROM `qo_modules_has_launchers` 
		        WHERE `qo_members_id` = '.$id1.' 
				  AND `qo_groups_id` = '.$id2.'
				  AND `qo_modules_id` = '.$id3.'
				  AND `qo_launchers_id` = '.$id4;
        $result = mysql_query($sql); //returns number of rows deleted
        if ($result) $count++;
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

function deleteGridDataModules () {

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

function deleteGridDataMyGroups () {
	return deleteGridDataMemberGroups ();
}

// ============================================================================
// Edit Grid Data Functions
// ============================================================================

function editGridDataGroup() {
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
   
    //should validate and clean data prior to posting to the database

    $sql = 'UPDATE `qo_groups` SET `'.$field.'` = \''.$value.'\' WHERE `'.$key.'` = '.$id;
	
    if (mysql_query($sql)) {
		return "{success:true}";
    } else {
        return "{success:false}";
    }
}

function editGridDataGroupModule() {
    /*
     * $idX:   db primary key value
     * $field: column or field name that is being updated (see data.Record mapping)
     * $value: the new value of $field
     */ 

	// we need to strip out the composite key to its individual parts
	list ($id1, $id2) = explode ('^', mysql_real_escape_string($_POST['keyID']), 2);
	$id1 = (integer) $id1;
    $field = mysql_real_escape_string($_POST['field']);
    $value = mysql_real_escape_string ($_POST['value']);
	
    //should validate and clean data prior to posting to the database

    $sql = 'UPDATE `qo_groups_has_modules`
	        SET `'.$field.'` = \''.$value.'\' 
			WHERE `qo_groups_id` = '.$id1.' and `qo_modules_id` = \''.$id2.'\'';

			if (mysql_query($sql)) {
		return "{success:true}";
    } else {
        return "{success:false}";
    }
}

function editGridDataMemberGroup() {
    /*
     * $idX:   db primary key value
     * $field: column or field name that is being updated (see data.Record mapping)
     * $value: the new value of $field
     */ 

	list ($id1, $id2) = explode ('^', mysql_real_escape_string($_POST['keyID']), 2);
	$id1 = (integer) $id1;
    $field = mysql_real_escape_string($_POST['field']);
    $value = mysql_real_escape_string ($_POST['value']);
	
    //should validate and clean data prior to posting to the database

    $sql = 'UPDATE `qo_members_has_groups`
	        SET `'.$field.'` = \''.$value.'\' 
			WHERE `qo_members_id` = '.$id1.' and `qo_groups_id` = \''.$id2.'\'';

	if (mysql_query($sql)) {
		return "{success:true}";
    } else {
        return "{success:false}";
    }
}

function editGridDataMember() {
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
   
    //should validate and clean data prior to posting to the database

    $sql = 'UPDATE `qo_members` SET `'.$field.'` = \''.$value.'\' WHERE `'.$key.'` = '.$id;
	
    if (mysql_query($sql)) {
		return "{success:true}";
    } else {
        return "{success:false}";
    }
}

function editGridDataModuleFile() {
    /*
     * $idX:   db primary key value
     * $field: column or field name that is being updated (see data.Record mapping)
     * $value: the new value of $field
     */ 

	list ($id1, $id2) = explode ('^', mysql_real_escape_string($_POST['keyID']), 2);
	$id1 = (integer) $id1;
    $field = mysql_real_escape_string($_POST['field']);
    $value = mysql_real_escape_string ($_POST['value']);
	
    //should validate and clean data prior to posting to the database

    $sql = 'UPDATE `qo_modules_has_files`
	        SET `'.$field.'` = \''.$value.'\' 
			WHERE `qo_modules_id` = '.$id1.' and `name` = \''.$id2.'\'';

	if (mysql_query($sql)) {
		return "{success:true}";
    } else {
        return "{success:false}";
    }
}

function editGridDataModuleLauncher() {
    /*
     * $idX:   db primary key value
     * $field: column or field name that is being updated (see data.Record mapping)
     * $value: the new value of $field
     */ 


	list ($id1, $id2, $id3, $id4) = explode ('^', mysql_real_escape_string($_POST['keyID']), 4);
    $id1 = (integer) $id1;
    $id2 = (integer) $id2;
    $id3 = (integer) $id3;
    $id4 = (integer) $id4;
    $field = mysql_real_escape_string($_POST['field']);
    $value = mysql_real_escape_string ($_POST['value']);
	
    //should validate and clean data prior to posting to the database

    $sql = 'UPDATE `qo_modules_has_launchers`
	        SET `'.$field.'` = '.$value.' 
	        WHERE `qo_members_id` = '.$id1.' 
			  AND `qo_groups_id` = '.$id2.'
			  AND `qo_modules_id` = '.$id3.'
			  AND `qo_launchers_id` = '.$id4;

	if (mysql_query($sql)) {
		return "{success:true}";
    } else {
        return "{success:false}";
    }
}

function editGridDataModule() {
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

function editGridDataMyGroup () {
	return editGridDataMemberGroup();
}

// ============================================================================
// Get Form Data Functions
// ============================================================================

function getFormDataMyProfile ($fMemberId) {

	$success = "{success: false, data: []}";
	
	$sql = 'select `first_name`, `last_name`, `email_address`, `password` 
			from `qo_members`
			where id = '.$fMemberId;
	
	if($result = mysql_query($sql))
	{
		$row = mysql_fetch_assoc($result);
		
		$success = '{success: true, "data":'.json_encode($items).'}';
	}
	
	return $success;
	
}

// ============================================================================
// Save Form Data Functions
// ============================================================================

function saveFormDataMyProfile($fMemberId) {

	// make all the strings safe
	$fFirstName 	= '\''.mysql_real_escape_string($_POST['first_name']).'\'';
	$fLastName 		= '\''.mysql_real_escape_string($_POST['last_name']).'\'';
	$fEmailAddress 	= '\''.mysql_real_escape_string($_POST['email_address']).'\'';
	$fPassword 		= '\''.mysql_real_escape_string($_POST['password']).'\'';
	
	$sql = 'UPDATE `qo_members`
			SET `first_name` = '.$fFirstName.'
			  , `last_name` = '.$fLastName.'
			  , `email_address` = '.$fEmailAddress.'
			  , `password` = '.$fPassword.'
			WHERE id = '.$fMemberId;
	
	if (mysql_query($sql)) {
		return "{success:true}";
    } else {
        return "{success:false}";
    }
}

function saveFormDataNewGroupModule() {

	// make all the strings safe
	$fQoGroupsId	= (integer) mysql_real_escape_string($_POST['qo_groups_id']);
	$fQoModulesId	= (integer) mysql_real_escape_string($_POST['qo_modules_id']);
	$fActive		= '\''.mysql_real_escape_string($_POST['active']).'\'';
	
	$sql = 'INSERT INTO `qo_groups_has_modules` (`qo_groups_id`, `qo_modules_id`, `active`)
            VALUES ('.$fQoGroupsId.','.$fQoModulesId.','.$fActive.')';

	if (mysql_query($sql)) {
		return "{success:true}";
    } else {
        return "{success:false}";
    }
}

function saveFormDataNewGroup() {

	// make all the strings safe
	$fName 			= '\''.mysql_real_escape_string($_POST['name']).'\'';
	$fDescription	= '\''.mysql_real_escape_string($_POST['description']).'\'';
	$fActive 		= '\''.mysql_real_escape_string($_POST['active']).'\'';
	
	$sql = 'INSERT INTO `qo_groups` (`name`, `description`, `active`)
		VALUES ('.$fName.','.$fDescription.','.$fActive.')';
	
	if (mysql_query($sql)) {
		return "{success:true}";
    } else {
        return "{success:false}";
    }
}

function saveFormDataNewMemberGroup() {

	// make all the strings safe
	$fQoMembersId	= (integer) mysql_real_escape_string($_POST['qo_members_id']);
	$fQoGroupsId	= (integer) mysql_real_escape_string($_POST['qo_groups_id']);
	$fActive		= '\''.mysql_real_escape_string($_POST['active']).'\'';
	$fAdminFlag		= '\''.mysql_real_escape_string($_POST['admin_flag']).'\'';
	
	$sql = 'INSERT INTO `qo_members_has_groups` (`qo_members_id`, `qo_groups_id`, `active`, `admin_flag`)
            VALUES ('.$fQoMembersId.','.$fQoGroupsId.','.$fActive.','.$fAdminFlag.')';

	if (mysql_query($sql)) {
		return "{success:true}";
    } else {
        return "{success:false}";
    }
}

function saveFormDataNewMember() {

	// make all the strings safe
	$fFirstName 	= '\''.mysql_real_escape_string($_POST['first_name']).'\'';
	$fLastName 		= '\''.mysql_real_escape_string($_POST['last_name']).'\'';
	$fEmailAddress 	= '\''.mysql_real_escape_string($_POST['email_address']).'\'';
	$fPassword 		= '\''.mysql_real_escape_string($_POST['password']).'\'';
	$fActive 		= '\''.mysql_real_escape_string($_POST['active']).'\'';
	$fGroup			= (integer) mysql_real_escape_string($_POST['qo_groups_id']);
	
	$sql = 'INSERT INTO `qo_members` (`first_name`, `last_name`, `email_address`, `password`, `active`)
		VALUES ('.$fFirstName.','.$fLastName.','.$fEmailAddress.','.$fPassword.','.$fActive.')';
	
	if (mysql_query($sql)) {
		if ($fGroup != "") {
			// We now insert into the qo_members_has_groups table also
			$sql = 'INSERT INTO `qo_members_has_groups` (`qo_members_id`, `qo_groups_id`, `active`, `admin_flag`)
				SELECT m.id, '.$fGroup.', \'true\', \'false\'
				FROM qo_members m WHERE email_address = '.$fEmailAddress;
       
			if (mysql_query($sql)) {
				$response = array('success'=>'true', 'save_message'=>'All Records Saved');
			} else {
				$response = array('success'=>'true', 'save_message'=>'Member Saved, group assignment failed.');
			}
		}
    } else {
        $response = array ('success'=>'false');
    }
	$json_response = json_encode($response);
	return $json_response;
	
}

function saveFormDataNewModuleFile() {

	// make all the strings safe
	$fQoModulesId	= (integer) mysql_real_escape_string($_POST['qo_modules_id']);
	$fName 			= '\''.mysql_real_escape_string($_POST['name']).'\'';
	$fType 			= '\''.mysql_real_escape_string($_POST['type']).'\'';
	
	$sql = 'INSERT INTO `qo_modules_has_files` (`qo_modules_id`, `name`, `type`)
            VALUES ('.$fQoModulesId.','.$fName.','.$fType.')';

	if (mysql_query($sql)) {
		return "{success:true}";
    } else {
        return "{success:false}";
    }
}

function saveFormDataNewModuleLauncher() {

	// make all the strings safe
	$fQoMembersId	= (integer) mysql_real_escape_string($_POST['qo_members_id']);
	$fQoGroupsId	= (integer) mysql_real_escape_string($_POST['qo_groups_id']);
	$fQoModulesId	= (integer) mysql_real_escape_string($_POST['qo_modules_id']);
	$fQoLaunchersId	= (integer) mysql_real_escape_string($_POST['qo_launchers_id']);
	$fSortOrder		= (integer) mysql_real_escape_string($_POST['sort_order']);
	

	$sql = 'INSERT INTO `qo_modules_has_launchers` (`qo_members_id`, `qo_groups_id`, `qo_modules_id`, `qo_launchers_id`, `sort_order`)
            VALUES ('.$fQoMembersId.','.$fQoGroupsId.','.$fQoModulesId.','.$fQoLaunchersId.','.$fSortOrder.')';

	if (mysql_query($sql)) {
		return "{success:true}";
    } else {
        return "{success:false}";
    }
}

function saveFormDataNewModule() {

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

// ============================================================================
// Get Lookup Data Functions
// ============================================================================

function getLookupGroupNames () {

	$sql = 'select `id` as "KeyField", `name` as "DisplayField" from `qo_groups`';
	
	return getData ("qo_groups", $sql);
	
}

function getLookupGroupNamesPlus () {

	$sql = 'select 0 as "KeyField", "All Groups" as "DisplayField"
			union
			select `id` as "KeyField", `name` as "DisplayField" from `qo_groups`';
	
	return getData ("qo_groups", $sql);
	
}

function getLookupMemberNames () {

	$sql = 'select `id` as "KeyField", `email_address` as "DisplayField" from `qo_members`';
	
	return getData ("qo_members", $sql);
	
}

function getLookupMemberNamesPlus () {

	$sql = 'select 0 as "KeyField", "All Members" as "DisplayField"
			union
			select `id` as "KeyField", `email_address` as "DisplayField" from `qo_members`';
	
	return getData ("qo_members", $sql);
	
}

function getLookupModuleNames () {

	$sql = 'select `id` as "KeyField", `moduleName` as "DisplayField" from `qo_modules`';
	
	return getData ("qo_modules", $sql);
	
}

function getLookupMyGroupNames ($fMemberId) {

	$sql = 'select `id` as "KeyField", `name` as "DisplayField" 
			from `qo_groups`
			where `id` in 
				(select a.`qo_groups_id`
				 from `qo_members_has_groups` a
				 where a.`qo_members_id` = ' . $fMemberId . '
				 and a.`admin_flag` = "true")';
	
	return getData ("qo_groups", $sql);
	
}

function getLookupLauncherNames () {

	$sql = 'select `id` as "KeyField", `name` as "DisplayField" from `qo_launchers`';
	
	return getData ("qo_launchers", $sql);
	
}

?>