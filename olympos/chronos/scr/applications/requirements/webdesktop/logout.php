<?php
/*
 * qWikiOffice Desktop 0.7
 * Copyright(c) 2007-2008, Integrated Technologies, Inc.
 * licensing@qwikioffice.com
 * 
 * http://www.qwikioffice.com/license
 */

require_once("system/core/os.php");
if(class_exists('os'))
{
	$os = new os();
	$os->logout('login.html'); // pass in login page to redirect to
}
?>