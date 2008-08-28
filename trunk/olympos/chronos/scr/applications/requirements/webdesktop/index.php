<?php
require_once("system/core/os.php");
if(!class_exists('os'))
{
	header("Location: login.html");
}
else
{
	$os = new os();
	if(!$os->is_member_logged_in())
	{
		header("Location: login.html");
	}
	else
	{
?>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html lang="en">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">
<title>Olympos Desktop</title>

<!-- EXT
<link rel="stylesheet" type="text/css" href="../extjs/resources/css/ext-all.css" />
<script src="../extjs/adapter/ext/ext-base.js"></script>
<script src="../extjs/ext-all.js"></script> -->

<link rel="stylesheet" type="text/css" href="../extjs/resources/css/ext-all.css" />
<script src="../extjs/adapter/ext/ext-base.js"></script>
<script src="../extjs/ext-all.js"></script>

<!-- CSS -->
<?php print $os->include_css(); ?>

<!-- JS -->
<script src="javascript.php"></script>
</head>

<body scroll="no">

<div id="x-desktop"></div>

<div id="ux-taskbar">
	<div id="ux-taskbar-start"></div>
	<div id="ux-taskbar-panel-wrap">
		<div id="ux-quickstart-panel"></div>
		<div id="ux-taskbuttons-panel"></div>
	</div>
	<div class="x-clear"></div>
</div>

</body>
</html>
<?php }} ?>