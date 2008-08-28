<?php
// get the os
require_once("../core/os.php");
if(class_exists('os'))
{
	$os = new os();
	print $os->login($_POST['module'], $_POST['user'], $_POST['pass']);
}
?>