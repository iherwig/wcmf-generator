<div id="navmeta">
<ul>
{if $_controller != "LoginController"}
	{if $_controller != "TreeViewController"}
	  {if $authUser->getConfig() == 'admin.ini'}
		<li><a href="javascript:newWindowEx('', '', 'indexAll', 'indexWindow', 'width=360,height=120,scrollbars=no,resizable=yes,locationbar=no', '&sid={sessionid}')" id="navinadexall">{translate text="Create Search Index"}</a></li>
		<li><a href="javascript:setContext('admin'); submitAction('administration');" target="_top" id="navadministration">{translate text="Administration"}</a></li>
    {/if}
		<li><a href="javascript:submitAction('edituser');" id="navuserdata">{translate text="User data"}</a></li>
		<li><a href="javascript:submitAction('logout');" target="_top" id="navlogout">{translate text="Logout"}</a></li>
	{/if}
{/if}
</ul>
</div>

<div id="navcontent">
  <ul>
{if $_controller != "LoginController"}
	{if $_controller == "UserController"}
  	<li><a href="javascript:submitAction('ok');" id="navback"><img  src="images/back.png" width="50" height="50" alt="{translate text="Back"}" border="0" /></a></li>
  	<li><a href="javascript:doSave(); submitAction('save');" id="navsave">{translate text="Save"}</a></li>
	{else}
  	<li><a href="javascript:doDisplay('{$oid}'); submitAction('');" id="navreload"><img src="images/reload.png" width="7" height="9" alt="{translate text="Reload"}" border="0" /></a></li>
		{if $_controller != "TreeViewController"}
  	<li><a href="javascript:doSave(); submitAction('save');" id="navsave"><img  src="images/save.png" width="9" height="9" alt="{translate text="Save"}" border="0" /></a></li>
  	<li><a href="javascript:newWindowEx('DisplayController', '', 'treeview', 'treeviewWindow', 'width=700,height=700,resizable=no,scrollbars=no,locationbar=no', '&sid={sessionid}')" id="navcontenttree"><img src="images/tree.png" width="7" height="9" alt="{translate text="Content Tree"}" border="0" /></a></li>
    <li><a href="javascript:newWindowEx('', '', 'browseresources', 'browseWindow', 'resizable=yes,scrollbars=yes,status=yes,locationbar=no', '&type=image&subtype=resource')">{translate text="Browse Server"}</a></li>
	
<li><a href="javascript:newWindowEx('', '', 'exportUWM', 'exportWindow', 'width=360,height=120,scrollbars=no,resizable=yes,locationbar=no', '&sid={sessionid}')" id="navexport">{translate text="Export UML"}</a></li>   
   <li><a href="javascript:submitAction('search');"><img src="images/search.png" width="7" height="9" alt="{translate text="Search"}" border="0" /></a> {$formUtil->getInputControl("searchterm", "text[class='small']", $searchterm, true)}</li>
    <li><a href="javascript:newWindowEx('{$_controller}', '', 'definesearch', 'definesearchWindow', 'width=600,height=600,scrollbars=yes,locationbar=no,resizable=yes', '&sid={sessionid}');">{translate text="Advanced Search"}</a></li>
	  {/if}
	{/if}
{/if}
  </ul>
</div>

<span class="separator"></span>
