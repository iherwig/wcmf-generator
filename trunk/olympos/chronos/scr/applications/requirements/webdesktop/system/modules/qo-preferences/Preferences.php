<?php
/*
 * qWikiOffice Desktop 0.7.1
 * Copyright(c) 2007-2008, Integrated Technologies, Inc.
 * licensing@qwikioffice.com
 * 
 * http://www.qwikioffice.com/license
 */

/*
 * os class is provided by connect.php
 *
 */

// default
$success = "{'success': false}";

// get post data
$task = $_POST["task"];
$what = $_POST["what"];

if($os->is_member_logged_in())
{
	// saving?
	if($task == "save" && $what != "")
	{
		$success = save($os, $what);
	}
	// loading?
	else if($task == "load" && $what != "")
	{
		$success = load($what);
	}
}

print $success;



function save($os, $what)
{
	$success = "{'success': false}";

	switch (true)
	{
		case ($what == "autorun" || $what == "quickstart" || $what == "shortcut"):
			
			// clear old launcher data for member (based on group)
			if($os->clear_launcher("member", $what))
			{					
				$ids = $_POST["ids"];
				
				$ids = json_decode(get_magic_quotes_gpc() ? stripslashes($ids) : $ids);
				
				// if ids are found
				if(count($ids) > 0)
				{
					// os will decode the ids
					if($os->set_launcher("member", $ids, $what))
					{
						$success = "{'success': true}";
					}
				}
				else
				{
					$success = "{'success': true}";
				}
			}
			
			break;
		case ($what == "appearance"  || $what == "background"):

			$backgroundcolor = $_POST["backgroundcolor"];
			$fontcolor = $_POST["fontcolor"];
			$theme_id = $_POST["theme"];
			$transparency = $_POST["transparency"];
			$wallpaper_id = $_POST["wallpaper"];
			$wallpaperposition = $_POST["wallpaperposition"];
			
			if($backgroundcolor != "" && $fontcolor && $theme_id != "" && $transparency != "" && $wallpaper_id != "" && $wallpaperposition)
			{
				if($os->set_style("member", $backgroundcolor, $fontcolor, $theme_id, $transparency, $wallpaper_id, $wallpaperposition))
				{
					$success = "{'success': true}";
				}
			}
			
			break;
	}
	
	return $success;
}



function load($what)
{
	$success = "{'images': []}";
	
	$sql = "select
		id,
		name,
		path_to_thumbnail as pathtothumbnail,
		path_to_file as pathtofile
		from
		qo_".$what."
		order by name";

	if($result = mysql_query($sql)){
		$items = array();
		while($row = mysql_fetch_assoc($result))
		{
			$items[] = $row;
		}
		 
		/* If not */
		$success = '{"images":'.json_encode($items).'}';
	}
	
	return $success;
}
?>