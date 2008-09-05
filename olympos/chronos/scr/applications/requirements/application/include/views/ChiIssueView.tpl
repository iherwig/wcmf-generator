
<!--
  This file was generated by wCMFGenerator 2.6.1.0019 from model/requirements.xmi on 05.09.08 13:08. 
  Manual modifications should be placed inside the protected regions.
-->
<!-- PROTECTED REGION ID(application/include/views/ChiIssueView.tpl/Body) START -->
{include file="lib:application/views/include/docheader.tpl"}
<head>
{include file="lib:application/views/include/header.tpl"}
<script>
  function init()
  {ldelim}
    Ext.QuickTips.init();
{if $viewMode == 'detail'}
    var grids = [];
    var columDefs = [];
    var buttonDefs = [];
    
    // parents

    // ChiRequirement
    {assign var="template" value=$possibleparents.ChiRequirement}
    {assign var="parent" value=$template->getProperty('assignedParent')}
    {if $parent}
      {assign var="parentid" value=$parent->getDBID()}
    {else}
      {assign var="parentid" value=''}
    {/if}
    {if $template->hasValue('sortkey')}{assign var="ddRows" value="true"}{else}{assign var="ddRows" value="false"}{/if}
    
    grids['ChiRequirementParent'] = new wcmf.grid.Grid();
    // column definitions
    var curColumnDefs = [];
    {count_items varname="numColumns" array=$template->getDisplayValues(true)}
    {math equation="361/x" x=$numColumns assign="columnWidth" format="%d"}
    {foreach key=name item=value from=$template->getDisplayValues(true)}
    curColumnDefs.push({ldelim}id:"{$name}", dataIndex:"{$name}", header:"{$name}", width:{$columnWidth}, sortable:true, renderer:grids['ChiRequirementParent'].renderColumnDefault.createDelegate(grids['ChiRequirementParent']){rdelim});
    {/foreach}
    columDefs['ChiRequirementParent'] = curColumnDefs;
    // button definitions
    var curButtonDefs = [];
    {if $template->getProperty('canAssociate') == true}
      var dlgChiRequirementParent = new AssociateDialog();
      curButtonDefs.push({ldelim}icon:'images/link.png', cls:'x-btn-icon', tooltip:{ldelim}text:'{translate text="Associate selected"}'{rdelim}, handler:function(){ldelim}dlgChiRequirementParent.show('ChiRequirement', grids['ChiRequirementParent'], '{$node->getOID()}', 'parent', true);{rdelim}{rdelim});
    {/if}
    buttonDefs['ChiRequirementParent'] = curButtonDefs;
    // grid initialization
    grids['ChiRequirementParent'].init('{$template->getObjectDisplayName()}', 'ChiRequirement', "{$nodeUtil->getParentQuery('ChiRequirement', $node)|replace:"'":"\'"}", columDefs['ChiRequirementParent'], {ldelim}paging:false, autoheight:true, singleSelect:true, ddRows:{$ddRows}{rdelim}, [new wcmf.grid.EditAction(){if $template->getProperty('composition') == false}, new wcmf.grid.DeleteAction(){/if}], buttonDefs['ChiRequirementParent']);
    grids['ChiRequirementParent'].getGridImpl().applyToMarkup('ChiRequirementParentGrid');
    grids['ChiRequirementParent'].load();

    // Package
    {assign var="template" value=$possibleparents.Package}
    {assign var="parent" value=$template->getProperty('assignedParent')}
    {if $parent}
      {assign var="parentid" value=$parent->getDBID()}
    {else}
      {assign var="parentid" value=''}
    {/if}
    {if $template->hasValue('sortkey')}{assign var="ddRows" value="true"}{else}{assign var="ddRows" value="false"}{/if}
    
    grids['PackageParent'] = new wcmf.grid.Grid();
    // column definitions
    var curColumnDefs = [];
    {count_items varname="numColumns" array=$template->getDisplayValues(true)}
    {math equation="361/x" x=$numColumns assign="columnWidth" format="%d"}
    {foreach key=name item=value from=$template->getDisplayValues(true)}
    curColumnDefs.push({ldelim}id:"{$name}", dataIndex:"{$name}", header:"{$name}", width:{$columnWidth}, sortable:true, renderer:grids['PackageParent'].renderColumnDefault.createDelegate(grids['PackageParent']){rdelim});
    {/foreach}
    columDefs['PackageParent'] = curColumnDefs;
    // button definitions
    var curButtonDefs = [];
    {if $template->getProperty('canAssociate') == true}
      var dlgPackageParent = new AssociateDialog();
      curButtonDefs.push({ldelim}icon:'images/link.png', cls:'x-btn-icon', tooltip:{ldelim}text:'{translate text="Associate selected"}'{rdelim}, handler:function(){ldelim}dlgPackageParent.show('Package', grids['PackageParent'], '{$node->getOID()}', 'parent', true);{rdelim}{rdelim});
    {/if}
    buttonDefs['PackageParent'] = curButtonDefs;
    // grid initialization
    grids['PackageParent'].init('{$template->getObjectDisplayName()}', 'Package', "{$nodeUtil->getParentQuery('Package', $node)|replace:"'":"\'"}", columDefs['PackageParent'], {ldelim}paging:false, autoheight:true, singleSelect:true, ddRows:{$ddRows}{rdelim}, [new wcmf.grid.EditAction(){if $template->getProperty('composition') == false}, new wcmf.grid.DeleteAction(){/if}], buttonDefs['PackageParent']);
    grids['PackageParent'].getGridImpl().applyToMarkup('PackageParentGrid');
    grids['PackageParent'].load();

    // ChiBusinessProcess
    {assign var="template" value=$possibleparents.ChiBusinessProcess}
    {assign var="parent" value=$template->getProperty('assignedParent')}
    {if $parent}
      {assign var="parentid" value=$parent->getDBID()}
    {else}
      {assign var="parentid" value=''}
    {/if}
    {if $template->hasValue('sortkey')}{assign var="ddRows" value="true"}{else}{assign var="ddRows" value="false"}{/if}
    
    grids['ChiBusinessProcessParent'] = new wcmf.grid.Grid();
    // column definitions
    var curColumnDefs = [];
    {count_items varname="numColumns" array=$template->getDisplayValues(true)}
    {math equation="361/x" x=$numColumns assign="columnWidth" format="%d"}
    {foreach key=name item=value from=$template->getDisplayValues(true)}
    curColumnDefs.push({ldelim}id:"{$name}", dataIndex:"{$name}", header:"{$name}", width:{$columnWidth}, sortable:true, renderer:grids['ChiBusinessProcessParent'].renderColumnDefault.createDelegate(grids['ChiBusinessProcessParent']){rdelim});
    {/foreach}
    columDefs['ChiBusinessProcessParent'] = curColumnDefs;
    // button definitions
    var curButtonDefs = [];
    {if $template->getProperty('canAssociate') == true}
      var dlgChiBusinessProcessParent = new AssociateDialog();
      curButtonDefs.push({ldelim}icon:'images/link.png', cls:'x-btn-icon', tooltip:{ldelim}text:'{translate text="Associate selected"}'{rdelim}, handler:function(){ldelim}dlgChiBusinessProcessParent.show('ChiBusinessProcess', grids['ChiBusinessProcessParent'], '{$node->getOID()}', 'parent', true);{rdelim}{rdelim});
    {/if}
    buttonDefs['ChiBusinessProcessParent'] = curButtonDefs;
    // grid initialization
    grids['ChiBusinessProcessParent'].init('{$template->getObjectDisplayName()}', 'ChiBusinessProcess', "{$nodeUtil->getParentQuery('ChiBusinessProcess', $node)|replace:"'":"\'"}", columDefs['ChiBusinessProcessParent'], {ldelim}paging:false, autoheight:true, singleSelect:true, ddRows:{$ddRows}{rdelim}, [new wcmf.grid.EditAction(){if $template->getProperty('composition') == false}, new wcmf.grid.DeleteAction(){/if}], buttonDefs['ChiBusinessProcessParent']);
    grids['ChiBusinessProcessParent'].getGridImpl().applyToMarkup('ChiBusinessProcessParentGrid');
    grids['ChiBusinessProcessParent'].load();


    // children

{else}
  {if $rootTemplateNode}
    {if $rootTemplateNode->hasValue('sortkey')}{assign var="ddRows" value="true"}{else}{assign var="ddRows" value="false"}{/if}

    var grid = new wcmf.grid.Grid();
    // column definitions
    var columDefs = [];
    {count_items varname="numColumns" array=$rootTemplateNode->getDisplayValues(true)}
    {math equation="575/x" x=$numColumns assign="columnWidth" format="%d"}
    {foreach key=name item=value from=$rootTemplateNode->getDisplayValues(true)}
    columDefs.push({ldelim}id:"{$name}", dataIndex:"{$name}", header:"{$name}", width:{$columnWidth}, sortable:true, renderer:grid.renderColumnDefault.createDelegate(grid){rdelim});
    {/foreach}
    // button definitions
    var buttonDefs = [];
    buttonDefs.push({ldelim}icon:'images/new.png', cls:'x-btn-icon', tooltip:{ldelim}text:'{translate text="Create new %1%" r1=$nodeUtil->getDisplayNameFromType($rootType)}'{rdelim}, handler:function(){ldelim}doSetParent('{$oid}'); doNew('{$rootType}'); submitAction('new');{rdelim}{rdelim});
    // grid initialization
    grid.init('{$nodeUtil->getDisplayNameFromType($rootType)}', '{$rootType}', '{$nodeUtil->getNodeQuery($rootType)|replace:"'":"\'"}', columDefs, {ldelim}paging:true, autoheight:true, singleSelect:true, ddRows:{$ddRows}{rdelim}, [new wcmf.grid.EditAction(), new wcmf.grid.DuplicateAction(), new wcmf.grid.DeleteAction()], buttonDefs);
    grid.getGridImpl().applyToMarkup('{$rootType}Grid');
    grid.load();
  {/if}
{/if}
  {rdelim}
</script>
</head>
<body onload="init();">
<div id="page">
{include file="lib:application/views/include/formheader.tpl"}
{include file="lib:application/views/include/title.tpl"}

<div id="tabnav">
{include file="lib:application/views/include/root_type_tabs.tpl" rootType=$rootType}
</div>

{include file="lib:application/views/include/navigation.tpl"}
{include file="lib:application/views/include/error.tpl" displayMessageDialog="false"}

{if $lockMsg != ''}
<div class="hint">{translate text="some objects are locked"} (<a href="javascript:displayMsg();">details</a>)</div>
<div class="hint" id="msg">{$lockMsg}</div>
{/if}

{if $viewMode == 'detail'}

{*------------------------------- Detail View -------------------------------*}

<div id="leftcol">

{*------ Edit ------*}
<div class="contentblock">
	<h2 title="{translate text="object ID"}: {$oid|default:"-"}">{$nodeUtil->getDisplayValue($node, true)}&nbsp;</h2>
	<span class="spacer"></span>
	<span class="dottedSeparator"></span>
	<span class="left" title="{$node->getValueDescription('Author')}">{$node->getValueDisplayName('Author')}</span>
	<span class="right">{$nodeUtil->getInputControl($node, 'Author')}</span>

	<span class="dottedSeparator"></span>
	<span class="left" title="{$node->getValueDescription('Responsible')}">{$node->getValueDisplayName('Responsible')}</span>
	<span class="right">{$nodeUtil->getInputControl($node, 'Responsible')}</span>

	<span class="dottedSeparator"></span>
	<span class="left" title="{$node->getValueDescription('Alias')}">{$node->getValueDisplayName('Alias')}</span>
	<span class="right">{$nodeUtil->getInputControl($node, 'Alias')}</span>

	<span class="dottedSeparator"></span>
	<span class="left" title="{$node->getValueDescription('Version')}">{$node->getValueDisplayName('Version')}</span>
	<span class="right">{$nodeUtil->getInputControl($node, 'Version')}</span>

	<span class="dottedSeparator"></span>
	<span class="left" title="{$node->getValueDescription('Name')}">{$node->getValueDisplayName('Name')}</span>
	<span class="right">{$nodeUtil->getInputControl($node, 'Name')}</span>

	<span class="dottedSeparator"></span>
	<span class="left" title="{$node->getValueDescription('Notes')}">{$node->getValueDisplayName('Notes')}</span>
	<span class="right">{$nodeUtil->getInputControl($node, 'Notes')}</span>

	<span class="dottedSeparator"></span>
	<span class="left" title="{$node->getValueDescription('created')}">{$node->getValueDisplayName('created')}</span>
	<span class="right">{$nodeUtil->getInputControl($node, 'created')}</span>

	<span class="dottedSeparator"></span>
	<span class="left" title="{$node->getValueDescription('creator')}">{$node->getValueDisplayName('creator')}</span>
	<span class="right">{$nodeUtil->getInputControl($node, 'creator')}</span>

	<span class="dottedSeparator"></span>
	<span class="left" title="{$node->getValueDescription('last_editor')}">{$node->getValueDisplayName('last_editor')}</span>
	<span class="right">{$nodeUtil->getInputControl($node, 'last_editor')}</span>

	<span class="dottedSeparator"></span>
	<span class="left" title="{$node->getValueDescription('modified')}">{$node->getValueDisplayName('modified')}</span>
	<span class="right">{$nodeUtil->getInputControl($node, 'modified')}</span>

	<span class="spacer"></span>

  {assign var="template" value=$possibleparents.ChiRequirement}
  {assign var="parent" value=$template->getProperty('assignedParent')}
  {if $parent}
    {assign var="parentoid" value=$parent->getOID()}
    {assign var="parenttype" value=$nodeUtil->getDisplayNameFromType($parent->getType())}
  {else}
    {assign var="parentoid" value=''}
    {translate text="Root" varname="parenttype"}
  {/if}
  {translate text="Create new '%1%' under '%2%'" r1=$nodeUtil->getDisplayNameFromType($node->getType()) r2=$parenttype varname="createText"}
  <span class="all"><a href="javascript:doSetParent('{$parentoid}'); doNew('{$node->getType()}'); setContext('{$node->getType()}'); submitAction('new');"><img src="images/new.png" 
    alt="{$createText}" title="{$createText}" border="0"> {$createText}</a></span>

  {assign var="template" value=$possibleparents.Package}
  {assign var="parent" value=$template->getProperty('assignedParent')}
  {if $parent}
    {assign var="parentoid" value=$parent->getOID()}
    {assign var="parenttype" value=$nodeUtil->getDisplayNameFromType($parent->getType())}
  {else}
    {assign var="parentoid" value=''}
    {translate text="Root" varname="parenttype"}
  {/if}
  {translate text="Create new '%1%' under '%2%'" r1=$nodeUtil->getDisplayNameFromType($node->getType()) r2=$parenttype varname="createText"}
  <span class="all"><a href="javascript:doSetParent('{$parentoid}'); doNew('{$node->getType()}'); setContext('{$node->getType()}'); submitAction('new');"><img src="images/new.png" 
    alt="{$createText}" title="{$createText}" border="0"> {$createText}</a></span>

  {assign var="template" value=$possibleparents.ChiBusinessProcess}
  {assign var="parent" value=$template->getProperty('assignedParent')}
  {if $parent}
    {assign var="parentoid" value=$parent->getOID()}
    {assign var="parenttype" value=$nodeUtil->getDisplayNameFromType($parent->getType())}
  {else}
    {assign var="parentoid" value=''}
    {translate text="Root" varname="parenttype"}
  {/if}
  {translate text="Create new '%1%' under '%2%'" r1=$nodeUtil->getDisplayNameFromType($node->getType()) r2=$parenttype varname="createText"}
  <span class="all"><a href="javascript:doSetParent('{$parentoid}'); doNew('{$node->getType()}'); setContext('{$node->getType()}'); submitAction('new');"><img src="images/new.png" 
    alt="{$createText}" title="{$createText}" border="0"> {$createText}</a></span>

</div>

</div>
<div id="rightcol">

{*------ Parents ------*}

<!-- ChiRequirement -->
<div class="contentblock">
  <div id="ChiRequirementParentGrid" style="border:1px solid #99bbe8;overflow: hidden; width: 445px;"></div>
</div>

<!-- Package -->
<div class="contentblock">
  <div id="PackageParentGrid" style="border:1px solid #99bbe8;overflow: hidden; width: 445px;"></div>
</div>

<!-- ChiBusinessProcess -->
<div class="contentblock">
  <div id="ChiBusinessProcessParentGrid" style="border:1px solid #99bbe8;overflow: hidden; width: 445px;"></div>
</div>


{*------ Children grouped by type ------*}


</div>

{else}
{*------------------------------- Overview -------------------------------*}

<div class="contentblock">
  <div id="{$rootType}Grid" style="border:1px solid #99bbe8;overflow: hidden; width: 665px;"></div>
</div>

{/if}

{include file="lib:application/views/include/footer.tpl"}
<!-- PROTECTED REGION END -->
