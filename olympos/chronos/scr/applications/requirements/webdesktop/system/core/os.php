<?php
/*
 * qWikiOffice Desktop 0.7.1
 * Copyright(c) 2007-2008, Integrated Technologies, Inc.
 * licensing@qwikioffice.com
 * 
 * http://www.qwikioffice.com/license
 */
 
class os {	
	
	function os(){
		$this->connected_to_db = false;
		
		// json support
		if(!function_exists('json_encode')){
			require("json.php");
			$GLOBALS['JSON_OBJECT'] = new Services_JSON();
			
			function json_encode($value){
				return $GLOBALS['JSON_OBJECT']->encode($value);
			}
   
			function json_decode($value){
				return $GLOBALS['JSON_OBJECT']->decode($value);
			}
		}
	}
	
	
	
	/**
	  * build_javascript() Returns a string of all javascript files to include
	  * 
	  * @param $member_id
	  * @param $group_id
	  * 
	  **/
	function build_javascript($member_id="", $group_id=""){
		$response = "";
		
		$member_id = $member_id != "" ? $member_id : $this->get_member_id();
		$group_id = $this->get_group_id();
		
		if($member_id != "" && $group_id != ""){
			$_SERVER["DOCUMENT_ROOT"]=str_replace('\\','/',getcwd());
			
			// connect to db if needed
			if(!$this->connected_to_db) { $this->connect_to_db(); }
			
			// get core files
			$core = "";
			
			$sql = "select
				path,
				name
				from
				qo_files
				where
				type = 'javascript'";
			
			$result = mysql_query($sql);
			
			while($row = mysql_fetch_assoc($result)){
				$file_contents = "\n".file_get_contents($_SERVER['DOCUMENT_ROOT']."/".$row["path"].$row["name"]);
				
				/* if file is DesktopConfig.js, use str_replace() to
				 * insert the javascript code dynamically in the file */
				if($row["name"] == "DesktopConfig.js"){
					$modules = $this->get_modules($member_id);
					$config = $this->get_configuration($member_id);
					
					$file_contents = str_replace("<<modules>>", $modules, $file_contents);
					$file_contents = str_replace("<<config>>", $config, $file_contents);
				}
				$core .= $file_contents;
			}
			
			$response .= $core;
			
			// get dialog files
			$dialogs = "";
			
			$sql = "select
				path,
				name
				from
				qo_dialogs
				where
				type = 'javascript'";
			
			$result = mysql_query($sql);
			
			while($row = mysql_fetch_assoc($result)){
				$dialogs .= "\n".file_get_contents($_SERVER['DOCUMENT_ROOT']."/".$row["path"].$row["name"]);
			}
			
			$response .= "\n".$dialogs;
			
			// get module files based on the members group
			$modules = "";
			
			$sql = "SELECT
				M.path,
				MF.name
				FROM
				qo_groups_has_modules GM
					INNER JOIN qo_modules AS M ON M.id = GM.qo_modules_Id
					INNER JOIN qo_modules_has_files AS MF ON MF.qo_modules_id = M.id AND MF.type = 'javascript'
				WHERE
				qo_groups_id = ".$group_id;
			
			$result = mysql_query($sql);
			
			while($row = mysql_fetch_assoc($result)){
				$modules .= "\n".file_get_contents($_SERVER['DOCUMENT_ROOT']."/".$row["path"].$row["name"]);
			}
			
			$response .= "\n".$modules;
		}
		
		return $response;
	} // end build_javascript()
	
	
	
	/**
	  * clear_launcher() Clears a members launcher
	  * 
	  * @param {string} type ["system", "member"]
	  * @param {string} launcher (e.g. autorun, contextmenu, quickstart,
	  * shortcut, startmenu)
	  *
	  **/
	function clear_launcher($type, $launcher){
		// default
		$response = false;
		
		// only if system or member type
		if($launcher != "" && ($type == "system" || $type == "member")){
			// if system
			if($type == "system"){
				$member_id = 0;
				$group_id = 0;
			}else{
				// else is member
				$member_id = $this->get_member_id();
				$group_id = $this->get_group_id($member_id);
			}
			
			if($member_id != "" && $group_id != ""){
				// get the launchers id
				$sql = "select id from qo_launchers where name = '".$launcher."'";

				if(mysql_num_rows($result = mysql_query($sql)) > 0){
					$row = mysql_fetch_assoc($result);
					
					// clear members launcher
					$sql = "DELETE
						FROM
						qo_modules_has_launchers
						WHERE
						qo_members_id = ".$member_id." and
						qo_groups_id = ".$group_id." and
						qo_launchers_id = ".$row["id"];
					
					if(mysql_query($sql)){
						$response = true;
					}
				}
			}
		}
		
		return $response;
	} // end clear_launcher()
	
	
	
	/**
	  * connect_to_db()
	  * 
	  **/
	function connect_to_db(){
		require("config.conf");
		if(class_exists('config')){
			$config = new config();
		
			mysql_connect ($config->DB_HOST, $config->DB_USERNAME, $config->DB_PASSWORD) or die ('I cannot connect to mysql because: ' . mysql_error());
			mysql_select_db ($config->DB_NAME) or die ('I cannot select the database because: '.mysql_error());
		
			$this->connected_to_db = true;
		}else{
			die ('config.conf is missing.');
		}
	} // end connect_to_db()
	
	
	
	/**
	  * get_configuration()
	  * 
	  * @param $member_id integer optional
	  * @param $group_id integer optional
	  * 
	  **/
	function get_configuration($member_id="", $group_id=""){
		// default
		$response = '{"success": false}';
		
		// get ids if needed
		$member_id = $member_id != "" ? $member_id : $this->get_member_id();
		$group_id = $group_id != "" ? $group_id : $this->get_group_id($member_id);
		
		if($member_id != "" && $group_id != ""){
			
			$l = $this->get_launchers($member_id, $group_id);
			$s = $this->get_styles($member_id, $group_id);

			if(count($l) > 0){			
				if(count($l) > 0) { $l = json_encode($l); } else { $l = "{}"; }
				if(count($s) > 0) { $s = json_encode($s); } else { $s = "{}"; }
			
				$response = '{"success": true, "config": {"launchers": '.$l.', "styles": '.$s.'}}';
			}
		}
		
		return $response;
	} // end get_configuration()
	
	
	
	/**
	  * get_group_id() Returns the id of the group the member is logged in under
	  * 
	  * @access private
	  * @param $member_id
	  * 
	  **/
	function get_group_id($member_id=""){
		$response = "";
		
		// connect to db if needed
		if(!$this->connected_to_db) { $this->connect_to_db(); }
		
		// get the member id if needed
		$member_id = $member_id != "" ? $member_id : $this->get_member_id();
		
		if($member_id != ""){
			$sql = "select
				qo_groups_id as id
				from
				qo_members_has_groups
				where
				qo_members_id = ".$member_id;
				
			if(mysql_num_rows($result = mysql_query($sql)) > 0){
				$row = mysql_fetch_assoc($result);
				$response = $row['id'];
			}
		}
		
		return $response;
	} // end get_group_id()
	
	
	
	/**
	  * get_group_name() Returns the name of the group
	  *
	  * @param $member_id integer
	  *
	  **/
	function get_group_name($member_id=""){
		$response = "";
		
		// connect to db if needed
		if(!$this->connected_to_db) { $this->connect_to_db(); }
		
		// get the member id if needed
		$member_id = $member_id != "" ? $member_id : $this->get_member_id();
		
		if($member_id != ""){
			$sql = "SELECT
				G.name
				FROM
				qo_members_has_groups AS MG
					INNER JOIN qo_members AS M ON M.id = MG.qo_members_id
					INNER JOIN qo_groups AS G ON G.id = MG.qo_groups_id
				WHERE
				qo_members_id = ".$member_id;
			
			if(mysql_num_rows($result = mysql_query($sql)) > 0){
				$row = mysql_fetch_assoc($result);
				$response = $row['name'];
			}
		}
		
		return $response;
	} // end get_group_name()
	
	
	
	/** PRIVATE
	  * get_launcher() Will load the launchers associated
	  * with a member (in group).
	  *
	  * @access private
	  * @param $member_id int, the member id
	  *
	  **/
	function get_launcher($member_id="", $group_id=""){
		$response = array();
		
		if($member_id != "" && $group_id != ""){			
			// connect to db if needed
			if(!$this->connected_to_db){ $this->connect_to_db(); }
			
			// get system default
			$sql = "SELECT
				L.name AS launcher,
				M.moduleId as moduleId
				FROM
				qo_modules_has_launchers ML
					-- Modules --
					INNER JOIN qo_modules AS M ON M.id = ML.qo_modules_id
					-- Launchers --
					INNER JOIN qo_launchers AS L ON L.id = ML.qo_launchers_id
				WHERE
				qo_members_id = ".$member_id."
				AND
				qo_groups_id = ".$group_id."
				ORDER BY  ML.sort_order asc";
			
			$result = mysql_query($sql);
			
			// Loop through all matches
			while($row = mysql_fetch_assoc($result)){
				$launcher = $row["launcher"];
				$moduleId = $row["moduleId"];
				
				// Store value in array
				$response[$launcher][] = $moduleId;
			}
		}
		
		return $response;
	} // end get_launcher()
	
	
	
	/** PRIVATE
	  * get_launchers() Will load ALL the launchers associated
	  * with a member (in group) at once.
	  *
	  * @access private
	  * @param $member_id int, the member id
	  *
	  **/
	function get_launchers($member_id="", $group_id=""){
		// get the ids if needed
		$member_id = $member_id != "" ? $member_id : $this->get_member_id();
		$group_id = $group_id != "" ? $group_id : $this->get_group_id($member_id);
		
		if($member_id != "" && $group_id != ""){
			// get system default			
			$l_default = $this->get_launcher("0", "0");

			// get member preferences
			$l_member = $this->get_launcher($member_id, $group_id);
		}
		
		// overwrite system default launchers with member preference
		if(count($l_member) > 0){
			$launchers = $this->overwrite_assoc_array($l_default, $l_member);
		}else{
			$launchers = $l_default;
		}
		
		// return
		return $launchers;
	} // end get_launchers()
	
	
	
	/**
	  * get_launcher_id() Returns the Db record id of the passed in launcher
	  * 
	  * @param {string} launcher (e.g. autorun, contextmenu, quickstart,
	  * shortcut, startmenu)
	  *
	  **/
	function get_launcher_id($launcher){
		// default
		$id = "";
		
		if($this->is_member_logged_in() && $launcher != ""){
			$sql = "select
				id
				from
				qo_launchers
				where
				name = '".$launcher."'";
			
			if(mysql_num_rows($result = mysql_query($sql)) > 0){
				$row = mysql_fetch_assoc($result);
				$id = $row["id"];
			}
		}
		
		return $id;
	} // end get_launcher_id()
	
	
	
	/** get_member_id() Returns the id of member currently logged in
	  *
	  * @param $session_id string
	  *
	  **/
	function get_member_id($session_id=""){
		$response = "";
		
		$session_id = $session_id != "" ? $session_id : $this->get_session_id();
		
		if($session_id != ""){
			// connect to db if needed
			if(!$this->connected_to_db) { $this->connect_to_db(); }
			
			// query the db for the member id based on the session id
			$sql = "select
				qo_members_id as id
				from
				qo_sessions
				where
				id = '".$this->get_session_id()."'";
				
			if(mysql_num_rows($result = mysql_query($sql)) > 0){
				$row = mysql_fetch_assoc($result);
				$response = $row['id'];
			}
		}
		
		return $response;
	} // end get_member_id()
	
	
	
	/**
	  * get_member_name() Returns the name of member
	  *
	  * @param $member_id integer
	  *
	  **/
	function get_member_name($member_id=""){
		$response = "";
		
		// get the member id if needed
		$member_id = $member_id != "" ? $member_id : $this->get_member_id();
		
		if($member_id != ""){
			// connect to db if needed
			if(!$this->connected_to_db) { $this->connect_to_db(); }
			
			// query the db for the members name
			$sql = "SELECT
				first_name,
				last_name
				FROM
				qo_members
				WHERE
				id = '".$member_id."'";
			
			if(mysql_num_rows($result = mysql_query($sql)) > 0){
				$row = mysql_fetch_assoc($result);
				$response = $row['first_name']." ".$row['last_name'];
			}
		}
		
		return $response;
	} // end get_member_name()
	
	
	
	/**
	 * get_module_id() Returns the id of a module's database record id
	 * based on the module's moduleId property.
	 * 
	 * @access private
	 * @param {string} moduleId Value of the module's moduleId property.
	 * 
	 **/
	function get_module_id($moduleId){
		// default
		$id = "";
		
		if($this->is_member_logged_in() && $moduleId != ""){
			$sql = "select
				id
				from
				qo_modules
				where
				moduleId = '".$moduleId."'";
			
			if(mysql_num_rows($result = mysql_query($sql)) > 0){
				$row = mysql_fetch_assoc($result);
				$id = $row["id"];
			}
		}
		
		return $id;
	} // end get_module_id()
	
	
	
		/**
	  * get_modules() Returns an string of all module names to insert into
	  * the getModules() as a substitute to hard coding them in 
	  * 
	  * @param $member_id integer
	  * 
	  **/
	function get_modules($member_id=""){
		$response = "";
		
		$member_id = $member_id != "" ? $member_id : $this->get_member_id();
		$group_id = $this->get_group_id();
		
		if($member_id != "" && $group_id != ""){
			// connect to db if needed
			if(!$this->connected_to_db) { $this->connect_to_db(); }
			
			$sql = "SELECT
				M.moduleName AS name
				FROM
				qo_groups_has_modules GM
					INNER JOIN qo_modules AS M ON M.id = GM.qo_modules_id
				WHERE
				GM.qo_groups_id = ".$group_id;
			
			$result = mysql_query($sql);
			
			while($row = mysql_fetch_assoc($result)){
				$response .= "new ".$row["name"]."(),";
			}
			
			$response = rtrim($response, ","); // trim the trailing comma
		}
		
		return $response;
	} // end get_modules()
	
	
	
	/**
	  * get_path_to_module_file() Returns a string containing the path to 
	  * the requested modules file
	  * 
	  * @access public
	  * @param $module_id string
	  * @param $file_name string
	  * 
	  **/
	function get_path_to_module_file($module_id, $file_name){
		$response = "";
		
		// get the member id if needed
		$member_id = $member_id != "" ? $member_id : $this->get_member_id();
		
		if($member_id != ""){			
			// connect to db if needed
			if(!$this->connected_to_db){ $this->connect_to_db(); }
				
			$sql = "select
				path
				from
				qo_modules
				where
				moduleId = '".$module_id."'";
			
			if(mysql_num_rows($result = mysql_query($sql)) > 0){
				$row = mysql_fetch_assoc($result);
				
				$path = $row["path"]."/".$file_name;
				$path = str_replace('//', '/', $path);
				
				$response = $path;
			}
		}
		
		return $response;
	} // end get_path_to_module_file()
	
	
	
	/** 
	  * get_session_id() Returns the id of the current session
	  *
	  * @access private
	  **/
	function get_session_id(){
		return $_COOKIE["sessionId"];
	} // end get_session_id()
	
	
	
		/**
	  * get_style() Will return the style associated
	  * with a member (in group).
	  *
	  * @access private
	  * @param $member_id int, the member id
	  * @param $group_id int, the group id
	  *
	  **/
	function get_style($member_id, $group_id){
		
		if($member_id != "" && $group_id != ""){			
			// connect to db if needed
			if(!$this->connected_to_db){ $this->connect_to_db(); }
			
			// get system default
			$sql = "SELECT
				backgroundcolor,
				fontcolor,
				transparency,
				T.id AS themeid,
				T.name AS themename,
				T.path_to_file AS themefile,
				W.id AS wallpaperid,
				W.name AS wallpapername,
				W.path_to_file AS wallpaperfile,
				wallpaperposition
				FROM
				qo_styles S
					-- Themes --
					INNER JOIN qo_themes AS T ON T.id = S.qo_themes_id
					-- Wallpapers --
					INNER JOIN qo_wallpapers AS W ON W.id = S.qo_wallpapers_id
				WHERE
				qo_members_id = ".$member_id."
				AND
				qo_groups_id = ".$group_id;
			
			$result = mysql_query($sql);

			// if a record was returned
			if(mysql_num_rows($result = mysql_query($sql)) > 0){
				$response = mysql_fetch_assoc($result);
				$response["transparency"] = $response["transparency"] == "true" ? true : false;
			}
		}
		
		return $response;
	} // end get_style()
	
	
	
	/**
	  * get_styles() Will load ALL the styles associated
	  * with a member (in group) at once.
	  *
	  * @access public
	  * @param $member_id int, the member id
	  * @param $group_id int, the group id
	  *
	  **/
	function get_styles($member_id="", $group_id=""){
		// get the ids if needed
		$member_id = $member_id != "" ? $member_id : $this->get_member_id();
		$group_id = $group_id != "" ? $group_id : $this->get_group_id($member_id);
		
		if($member_id != "" && $group_id != ""){
			// get system default
			$s_default = $this->get_style("0", "0");
			
			// get group default
			$s_group = $this->get_style("0", $group_id);
			
			// get member preferences
			$s_member = $this->get_style($member_id, $group_id);
		}
		
		// default styles
		$styles = $s_default;
		
		// overwrite with group default
		if(count($s_group) > 0){
			$styles = $this->overwrite_assoc_array($styles, $s_group);
		}
		
		// overwrite with member preference
		if(count($s_member) > 0){
			$styles = $this->overwrite_assoc_array($styles, $s_member);
		}
		
		// return
		return $styles;
	} // end get_styles()
	
	
	
	/**
	  * include_css() Returns a string of all css files to include
	  * 
	  * @param $member_id integer
	  * 
	  **/
	function include_css($member_id=""){
		$response = "";
		
		// get the member id if needed
		$member_id = $member_id != "" ? $member_id : $this->get_member_id();
		
		// get the members group id
		$group_id = $this->get_group_id($member_id);
		
		if($member_id != "" && $group_id != ""){
			$_SERVER["DOCUMENT_ROOT"]=str_replace('\\','/',getcwd());
			
			// connect to db if needed
			if(!$this->connected_to_db) { $this->connect_to_db(); }
			
			// get theme file
			$theme = "";
			
			// 1st get members theme if saved
			$sql = "select
				T.path_to_file as path
				from
				qo_themes T,
				qo_styles S
				where
				T.id = S.qo_themes_id and
				S.qo_members_id = ".$member_id." and
				S.qo_groups_id = ".$group_id;
				
			if(mysql_num_rows($result = mysql_query($sql)) > 0){
				$row = mysql_fetch_assoc($result);
				$theme = '<link id="theme" rel="stylesheet" type="text/css" href="'.$row["path"].'" />';
			}else{
				// get default theme
				$sql = "SELECT
					path_to_file as path
					FROM
					qo_themes T
						INNER JOIN qo_styles AS S ON S.qo_themes_id = T.id
					WHERE
					qo_members_id = 0";
				
				if(mysql_num_rows($result = mysql_query($sql)) > 0){
					$row = mysql_fetch_assoc($result);
					$theme = '<link id="theme" rel="stylesheet" type="text/css" href="'.$row["path"].'" />';
				}
			}
			
			$response .= $theme;
			
			// get core files
			$core = "";
			
			$sql = "SELECT
				path,
				name
				FROM
				qo_files
				WHERE
				type = 'css'";
			
			$result = mysql_query($sql);
			
			while($row = mysql_fetch_assoc($result)){
				$core .= '<link rel="stylesheet" type="text/css" href="'.$row["path"].$row["name"].'" />';
			}
			
			$response .= $core;
			
			// get dialog files
			$dialogs = "";
			
			$sql = "SELECT
				path,
				name
				FROM
				qo_dialogs
				WHERE
				type = 'css'";
			
			$result = mysql_query($sql);
			
			while($row = mysql_fetch_assoc($result)){
				$dialogs .= '<link rel="stylesheet" type="text/css" href="'.$row["path"].$row["name"].'" />';
			}
			
			$response .= $dialogs;
			
			// get module files based on members group
			$modules = "";
			
			$sql = "SELECT
				M.path,
				MF.name
				FROM
				qo_modules_has_files MF
					INNER JOIN qo_modules AS M ON M.id = MF.qo_modules_id AND M.active = 'true'
					INNER JOIN qo_groups_has_modules AS GM ON GM.qo_modules_id = M.id
				WHERE
				type = 'css'
				AND
				qo_groups_id = ".$this->get_group_id();
			
			$result = mysql_query($sql);
			
			while($row = mysql_fetch_assoc($result)){
				$modules .= '<link rel="stylesheet" type="text/css" href="'.$row["path"].$row["name"].'" />';
			}
			
			$response .= $modules;
		}
		
		return $response;
	} // end include_css()
	
	
	
	/**
	  * is_member_in_group()
	  *
	  * @param $name string
	  * @usage if($os->is_member_in_group('administrator') { // do something }
	  * @return boolean
	  **/
	function is_member_in_group($name){
		// get member group
		$member_group = $this->get_group_name();
		
		// case-insensitive string comparison
		if(strcasecmp($member_group, $name) == 0){
			return true;
		}else{
			return false;
		}		
	} // end is_member_in_group()
	
	
	
	/** 
	  * is_member_logged_in()
	  *
	  * @param $session_id string
	  *
	  **/
	function is_member_logged_in($session_id=""){
		$response = false;
		
		$session_id = $session_id != "" ? $session_id : $this->get_session_id();
		
		if($session_id != ""){
			// connect to db if needed
			if(!$this->connected_to_db){ $this->connect_to_db(); }
			
			// query the db for the session id
			$sql = "select
				qo_members_id
				from
				qo_sessions
				where
				id = '".$session_id."'";
			
			// if a record is found, they are logged in
			if(mysql_num_rows($result = mysql_query($sql)) > 0)	{
				$response = true;
			}
		}
		
		return $response;
	} // end is_member_logged_in()
	
	
	
	/** 
	  * login()
	  * 
	  *	@param $module string
	  * @param $user string
	  * @param $pass string 
	  **/
	function login($module, $user, $pass){
		$response = "{success: false}";
		
		if(!isset($user)||!strlen($user)){
			$response = "{errors:[{id:'user', msg:'Required Field'}]}";
		}elseif(!isset($pass)||!strlen($pass)){
			$response = "{errors:[{id:'pass', msg:'Required Field'}]}";
		}else if(!$this->member_exists($user)){
			$response = "{errors:[{id:'user', msg:'User not found'}]}";
		}else if(!$this->member_active($user)){
			$response = "{errors:[{id:'user', msg:'This account is not active'}]}";
		}else{
			// connect to db if needed
			if(!$this->connected_to_db) { $this->connect_to_db(); }
				
			// check password
			$sql = "SELECT
				id,
				email_address
				FROM
				qo_members
				WHERE
				email_address = '".$user."'
				AND
				password = '".$pass."'";
				
			if(mysql_num_rows($result = mysql_query($sql)) < 1){
				$response = "{errors:[{id:'pass', msg:'Incorrect Password'}]}";
			}else{
				// grab needed data
				$row = mysql_fetch_assoc($result);
				$member_id = $row['id'];
				
				// delete existing login record
				$sql = "delete from qo_sessions where qo_members_id = ".$member_id;
				if(!mysql_query($sql)) { $response = "{errors:[{id:'user', msg:'Login Failed'}]}"; }
				
				// get our random session id
				$session_id = $this->build_random_id();
				
				// save temporary session id to our db
				$sql = "insert into qo_sessions
					(qo_members_id,
					id,
					ip,
					date)
					values
					(".$member_id.",
					'".$session_id."',
					'".$_SERVER['REMOTE_ADDR']."',
					'".date("Y-m-d H:i:s")."')";
				
				if(!mysql_query($sql)) { $response = "{errors:[{id:'user', msg:'Login Failed'}]}"; }
				
				$response = "{success:true, sessionId:'".$session_id."'}\n";
			}
		}
		return $response;
	} // end login()
	
	
	
	/**
	  * logout()
	  *
	  * @param $login_page string The page to redirect to
	  *
	  **/
	function logout($login_page){
		// connect to db if needed
		if(!$this->connected_to_db) { $this->connect_to_db(); }
		
		// delete session from Db
		$sql = "delete
			from
			qo_sessions
			where
			id = '".$this->get_session_id()."'";
		
		mysql_query($sql) or die ("Logout failed...". mysql_error());
		
		// clear the cookie
		setcookie("sessionId", "");
		
		// redirect to login page
		header('Location: '.$login_page);
	} // end logout()
	
	
	
	/** PRIVATE
	 * member_active()
	 * 
	 * @param {string} $email_address The members email address
	 * @return {boolean}
	 */
	function member_active($email_address){
		$response = false;
		
		// connect to db if needed
		if(!$this->connected_to_db) { $this->connect_to_db(); }
			
		// check email address
		$sql = "SELECT
			active
			FROM
			qo_members
			WHERE
			email_address = '".$email_address."'";
			
		if(mysql_num_rows($result = mysql_query($sql)) > 0){
			$row = mysql_fetch_assoc($result);
			
			if($row["active"] == "true"){
				$response = true;
			}
		}
		
		return $response;
	} // end member_active()
	
	
	
	/** PRIVATE
	 * member_exists()
	 * 
	 * @param {string} $email_address The members email address
	 * @return {boolean}
	 */
	function member_exists($email_address){
		$response = false;
		
		// connect to db if needed
		if(!$this->connected_to_db) { $this->connect_to_db(); }
			
		// check email address
		$sql = "SELECT
			id
			FROM
			qo_members
			WHERE
			email_address = '".$email_address."'";
			
		if(mysql_num_rows($result = mysql_query($sql)) > 0){
			$response = true;
		}
		
		return $response;
	} // end member_exists()

	
	
	/**
	  * set_launcher()
	  * 
	  * @param {string} type The type of launcher ["system", "member"]
	  * @param {array} ids An array containing each module's moduleId property
	  * @param {string} launcher ["autorun", "contextmenu", "quickstart", "shortcut", "startmenu"]
	  * 
	  * @usage set_launcher("system", ["demo-grid", "tabs-grid"], "shortcut", 10);
	  * 
	  **/
	function set_launcher($type, $ids, $launcher){
		// default
		$response = false;

		if($launcher != "" && ($type == "system" || $type == "member")){
			// if system
			if($type == "system"){
				$member_id = 0;
				$group_id = 0;
			}else{
				// else is member
				$member_id = $this->get_member_id();
				$group_id = $this->get_group_id($member_id);
			}

			// get the launcher's Db record id based on its launcher name
			$launcher_id = $this->get_launcher_id($launcher);

			if($member_id != "" && $group_id != "" && $launcher_id != ""){
				// initialize
				$sort_order = 0;

				// loop through ids array
				foreach($ids as $id){
					// get the module's Db record id based on its moduleId property
					$module_id = $this->get_module_id($id);
					
					if($module_id != ""){
						$sql = "INSERT INTO
							qo_modules_has_launchers
							(qo_members_id,
							qo_groups_id,
							qo_modules_id,
							qo_launchers_id,
							sort_order)
							VALUES
							(".$member_id.",
							".$group_id.",
							".$module_id.",
							".$launcher_id.",
							".$sort_order.")";
						
						mysql_query($sql);
						
						$response = true;
						
						/* ToDo: handle errors
						if(!mysql_query($sql))
						{
							$response = true;
						} */
					
						$sort_order++;
					}
				}
			}
		}
		
		return $response;
	} // end set_launcher()
	
	
	
	/**
	  * set_style() Creates a new style record, or updates one if it already exists
	  * 
	  * @param {string} type The type of style ["system", "member"]
	  * @return {boolean}
	  **/
	function set_style($type, $backgroundcolor, $fontcolor, $theme_id, $transparency, $wallpaper_id, $wallpaperposition){
		$result = false;
		
		if($this->is_member_logged_in() && ($type == "system" || $type == "member")){
			
			if($type == "system"){
				// if system
				$member_id = 0;
				$group_id = 0;
			}else{
				// else is member
				$member_id = $this->get_member_id();
				$group_id = $this->get_group_id($member_id);
			}
			
			if($this->style_exists($type)){
				$sql = "update
					qo_styles
					set
					backgroundcolor = '".$backgroundcolor."',
					fontcolor = '".$fontcolor."',
					qo_themes_id = ".$theme_id.",
					transparency = '".$transparency."',
					qo_wallpapers_id = ".$wallpaper_id.",
					wallpaperposition = '".$wallpaperposition."'
					where
					qo_members_id = ".$member_id." and
					qo_groups_id = ".$group_id;
			}else{
				$sql = "insert into qo_styles (
					qo_members_id,
					qo_groups_id,
					backgroundcolor,
					fontcolor,
					qo_themes_id,
					transparency,
					qo_wallpapers_id,
					wallpaperposition)
					values (
					".$member_id.",
					".$group_id.",
					'".$backgroundcolor."',
					'".$fontcolor."',
					".$theme_id.",
					'".$transparency."',
					".$wallpaper_id.",
					'".$wallpaperposition."')";
			}
			
			if(mysql_query($sql)){
				$result = true;
			}
		}
		
		return $result;
	} // end set_style()
	
	
	
	/**
	  * style_exists() Checks if a style record exists based on the 
	  * member id and group id
	  * 
	  * @param string The type of style ["system", "member"]
	  * @return boolean
	  * 
	  **/
	function style_exists($type){
		$result = false;
		
		if($this->is_member_logged_in() && ($type == "system" || $type == "member")){			
			
			if($type == "system"){
				// if system
				$member_id = 0;
				$group_id = 0;
			}else{
				// else is member
				$member_id = $this->get_member_id();
				$group_id = $this->get_group_id($member_id);
			}
				
			$sql = "select
				transparency
				from
				qo_styles
				where
				qo_members_id = ".$member_id." and
				qo_groups_id = ".$group_id;
		
			// if a record exists
			if(mysql_num_rows(mysql_query($sql)) > 0){
				$result = true;
			}
		}
		
		return $result;
	} // end style_exists()
	
	
	
	/*
	 * PRIVATE
	 *
	 * @param {string} string to be escaped
	 * 
	 * @return {string} escaped string
	 */
	function Mod_addslashes($string){
		if(get_magic_quotes_gpc()==1){
			return ($string);
		}else{
			return (addslashes($string ));
		}
	} // end Mod_addslashes()
	
	
	
	/*
	 * PRIVATE
	 *
	 * @param {array}
	 * @param {array}
	 * 
	 * @return {array} concated array
	 */
	function concat_arrays($a, $b){
		$c = $a;  
	    while(list(,$v)=each($b)){
	        $c[] = $v;
	    }
	    
	    return $c;
	} // end concat_arrays()
	
	
	
	/** PRIVATE
	 * overwrite_assoc_array()
	 * 
	 * @param {array}
	 * @param {array}
	 * @return {array} overwritten associative array
	 **/
	function overwrite_assoc_array($a, $b){
		$c = $a;  
	    while(list($k,$v)=each($b)){
	        $c[$k] = $v;
	    }
	    
	    return $c;
	} // end overwrite_assoc_array()
	
	
	
	/*
	 * PRIVATE
	 *
	 * Requires:
	 * get_rand_value()
	 *
	 * @return {string} id a random id
	 */
	function build_random_id(){
		$length = 10;
		
		if($length > 0){ 
			$rand_id = "";
			
			for($i=1; $i<=$length; $i++){
				mt_srand((double)microtime() * 1000000);
				$num = mt_rand(1,36);
				$rand_id .= $this->get_rand_value($num);
			}
		}
		
		return md5($rand_id);
	} // end build_random_id()
	
	
	
	/*
	 * PRIVATE
	 *
	 * Returns:
	 * a random value
	 */
	function get_rand_value($num){
		// accepts 1 - 36
		switch($num){
			case "1":
			 $rand_value = "a";
			break;
			case "2":
			 $rand_value = "b";
			break;
			case "3":
			 $rand_value = "c";
			break;
			case "4":
			 $rand_value = "d";
			break;
			case "5":
			 $rand_value = "e";
			break;
			case "6":
			 $rand_value = "f";
			break;
			case "7":
			 $rand_value = "g";
			break;
			case "8":
			 $rand_value = "h";
			break;
			case "9":
			 $rand_value = "i";
			break;
			case "10":
			 $rand_value = "j";
			break;
			case "11":
			 $rand_value = "k";
			break;
			case "12":
			 $rand_value = "l";
			break;
			case "13":
			 $rand_value = "m";
			break;
			case "14":
			 $rand_value = "n";
			break;
			case "15":
			 $rand_value = "o";
			break;
			case "16":
			 $rand_value = "p";
			break;
			case "17":
			 $rand_value = "q";
			break;
			case "18":
			 $rand_value = "r";
			break;
			case "19":
			 $rand_value = "s";
			break;
			case "20":
			 $rand_value = "t";
			break;
			case "21":
			 $rand_value = "u";
			break;
			case "22":
			 $rand_value = "v";
			break;
			case "23":
			 $rand_value = "w";
			break;
			case "24":
			 $rand_value = "x";
			break;
			case "25":
			 $rand_value = "y";
			break;
			case "26":
			 $rand_value = "z";
			break;
			case "27":
			 $rand_value = "0";
			break;
			case "28":
			 $rand_value = "1";
			break;
			case "29":
			 $rand_value = "2";
			break;
			case "30":
			 $rand_value = "3";
			break;
			case "31":
			 $rand_value = "4";
			break;
			case "32":
			 $rand_value = "5";
			break;
			case "33":
			 $rand_value = "6";
			break;
			case "34":
			 $rand_value = "7";
			break;
			case "35":
			 $rand_value = "8";
			break;
			case "36":
			 $rand_value = "9";
			break;
		}
		return $rand_value;
	}
} // end get_rand_value()
?>