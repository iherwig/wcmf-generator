<form name="{$formName}" action="main.php" enctype="multipart/form-data" method="post" target="{$target}" onsubmit="{$onsubmit}">
<input type="hidden" name="controller" value="{$_controller}" />
<input type="hidden" name="context" value="{$_context}" />
<input type="hidden" name="usr_action" value="{$_action}" />
<input type="hidden" name="sid" value="{sessionid}" />
<input type="hidden" name="oid" value="{$oid}" />
<input type="hidden" name="poid" value="{$poid}" />
<input type="hidden" name="newtypes" value="" />
<input type="hidden" name="deleteoids" value="" />
<input type="hidden" name="clipboardoids" value="" />

<input type="hidden" name="old_controller" value="{$_controller}" />
<input type="hidden" name="old_context" value="{$_context}" />
<input type="hidden" name="old_usr_action" value="{$_action}" />
<input type="hidden" name="old_oid" value="{$oid}" />

<input type="hidden" name="sortoid" value="" />
<input type="hidden" name="prevoid" value="" />
<input type="hidden" name="nextoid" value="" />

<input type="hidden" name="targetoid" value="" />
<input type="hidden" name="associateoid" value="" />
<input type="hidden" name="rootType" value="{$rootType}" />
