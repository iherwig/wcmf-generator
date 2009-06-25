{* uses the following variables: hideTitle ("true"|"false") *}

{if $hideTitle == "false" || !$hideTitle}
<div id="head">
  <span><a href="http://olympos.sourceforge.net" target="_blank"><img src="images/cwm48x48.png" alt="Chronos Web Modeler" border="0" /></a></span>
  <span id="title">{translate text=$applicationTitle}</span>
  <span id="logininfo">{if $authUser != null && $_controller != "TreeViewController"}{translate text="Logged in as %1% since %2%" r0=$authUser->getLogin() r1=$authUser->getLoginTime()}{/if}</span>
</div>
{/if}
