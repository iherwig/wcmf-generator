
<!--
  This file was generated by wCMFGenerator 2.6.0001 from model/requirements.xmi on 03.04.08 20:09. 
  Manual modifications should be placed inside the protected regions.
-->
<!-- PROTECTED REGION ID(application/include/views/ChiRequirementView.tpl/Body) START -->
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

    // ChiGoal
    {assign var="template" value=$possibleparents.ChiGoal}
    {assign var="parent" value=$template->getProperty('assignedParent')}
    {if $parent}
      {assign var="parentid" value=$parent->getDBID()}
    {else}
      {assign var="parentid" value=''}
    {/if}
    {if $template->hasValue('sortkey')}{assign var="ddRows" value="true"}{else}{assign var="ddRows" value="false"}{/if}
    
    grids['ChiGoalParent'] = new wcmf.grid.Grid();
    // column definitions
    var curColumnDefs = [];
    {count_items varname="numColumns" array=$template->getDisplayValues(true)}
    {math equation="361/x" x=$numColumns assign="columnWidth" format="%d"}
    {foreach key=name item=value from=$template->getDisplayValues(true)}
    curColumnDefs.push({ldelim}id:"{$name}", dataIndex:"{$name}", header:"{$name}", width:{$columnWidth}, sortable:true, renderer:grids['ChiGoalParent'].renderColumnDefault.createDelegate(grids['ChiGoalParent']){rdelim});
    {/foreach}
    columDefs['ChiGoalParent'] = curColumnDefs;
    // button definitions
    var curButtonDefs = [];
    {if $template->getProperty('canAssociate') == true}
      var dlgChiGoalParent = new AssociateDialog();
      curButtonDefs.push({ldelim}icon:'images/link.png', cls:'x-btn-icon', tooltip:{ldelim}text:'{translate text="Associate selected"}'{rdelim}, handler:function(){ldelim}dlgChiGoalParent.show('ChiGoal', grids['ChiGoalParent'], '{$node->getOID()}', true);{rdelim}{rdelim});
    {/if}
    buttonDefs['ChiGoalParent'] = curButtonDefs;
    // grid initialization
    grids['ChiGoalParent'].init('{$template->getObjectDisplayName()}', 'ChiGoal', "{$nodeUtil->getParentQuery('ChiGoal', $node)|replace:"'":"\'"}", columDefs['ChiGoalParent'], {ldelim}paging:false, autoheight:true, singleSelect:true, ddRows:{$ddRows}{rdelim}, [new wcmf.grid.EditAction(){if $template->getProperty('composition') == false}, new wcmf.grid.DeleteAction(){/if}], buttonDefs['ChiGoalParent']);
    grids['ChiGoalParent'].getGridImpl().applyToMarkup('ChiGoalParentGrid');
    grids['ChiGoalParent'].load();


    // children

    // ChiIssue
    {assign var="template" value=$possiblechildren.ChiIssue}
    {assign var="realSubject" value=$template}
    {if $template->getProperty('realSubject')}
      {assign var="realSubject" value=$template->getProperty('realSubject')}
    {/if}
    {if $template->hasValue('sortkey')}{assign var="ddRows" value="true"}{else}{assign var="ddRows" value="false"}{/if}

    grids['ChiIssueChild'] = new wcmf.grid.Grid();
    // column definitions
    var curColumnDefs = [];
    {count_items varname="numColumns" array=$realSubject->getDisplayValues(true)}
    {math equation="361/x" x=$numColumns assign="columnWidth" format="%d"}
    {foreach key=name item=value from=$realSubject->getDisplayValues(true)}
    curColumnDefs.push({ldelim}id:"{$name}", dataIndex:"{$name}", header:"{$name}", width:{$columnWidth}, sortable:true, renderer:grids['ChiIssueChild'].renderColumnDefault.createDelegate(grids['ChiIssueChild']){rdelim});
    {/foreach}
    columDefs['ChiIssueChild'] = curColumnDefs;
    // button definitions
    var curButtonDefs = [];
    {if $template->getProperty('canCreate')}
      {assign var="poid" value=$node->getOID()}
      {if $template->getProperty('composition') || $template->getProperty('aggregation')}
      curButtonDefs.push({ldelim}icon:'images/new.png', cls:'x-btn-icon', tooltip:{ldelim}text:'{translate text="Create new %1%" r1=$nodeUtil->getDisplayNameFromType($realSubject->getType())}'{rdelim}, 
        handler:function(){ldelim}doSetParent('{$poid}'); doNew('{$realSubject->getType()}'); setContext('{$realSubject->getType()}'); submitAction('new');{rdelim}{rdelim});
      {/if}
      {if !$template->getProperty('composition')}
      var dlgChiIssueChild = new AssociateDialog();
      curButtonDefs.push({ldelim}icon:'images/link.png', cls:'x-btn-icon', tooltip:{ldelim}text:'{translate text="Associate selected"}'{rdelim}, 
        handler:function(){ldelim}dlgChiIssueChild.show('{$realSubject->getType()}', grids['ChiIssueChild'], '{$poid}', false);{rdelim}{rdelim});
      {/if}
    {/if}
    buttonDefs['ChiIssueChild'] = curButtonDefs;
    // grid initialization
    grids['ChiIssueChild'].init('{$realSubject->getObjectDisplayName()}', 'ChiIssue', '{$nodeUtil->getChildQuery($node, 'ChiIssue')|replace:"'":"\'"}', columDefs['ChiIssueChild'], {ldelim}paging:true, autoheight:true, singleSelect:true, ddRows:{$ddRows}{rdelim}, [new wcmf.grid.EditAction(), {if $template->getProperty('canCreate')}new wcmf.grid.DuplicateAction(), {/if}new wcmf.grid.DeleteAction()], buttonDefs['ChiIssueChild'], {ldelim}ptype:'{$node->getType()}', poid:'{$node->getOID()}'{rdelim});
    grids['ChiIssueChild'].getGridImpl().applyToMarkup('ChiIssueChildGrid');
    grids['ChiIssueChild'].load();

    // NMFeatureRequirements
    {assign var="template" value=$possiblechildren.NMFeatureRequirements}
    {assign var="realSubject" value=$template}
    {if $template->getProperty('realSubject')}
      {assign var="realSubject" value=$template->getProperty('realSubject')}
    {/if}
    {if $template->hasValue('sortkey')}{assign var="ddRows" value="true"}{else}{assign var="ddRows" value="false"}{/if}

    grids['NMFeatureRequirementsChild'] = new wcmf.grid.Grid();
    // column definitions
    var curColumnDefs = [];
    {count_items varname="numColumns" array=$realSubject->getDisplayValues(true)}
    {math equation="361/x" x=$numColumns assign="columnWidth" format="%d"}
    {foreach key=name item=value from=$realSubject->getDisplayValues(true)}
    curColumnDefs.push({ldelim}id:"{$name}", dataIndex:"{$name}", header:"{$name}", width:{$columnWidth}, sortable:true, renderer:grids['NMFeatureRequirementsChild'].renderColumnDefault.createDelegate(grids['NMFeatureRequirementsChild']){rdelim});
    {/foreach}
    columDefs['NMFeatureRequirementsChild'] = curColumnDefs;
    // button definitions
    var curButtonDefs = [];
    {if $template->getProperty('canCreate')}
      {assign var="poid" value=$node->getOID()}
      {if $template->getProperty('composition') || $template->getProperty('aggregation')}
      curButtonDefs.push({ldelim}icon:'images/new.png', cls:'x-btn-icon', tooltip:{ldelim}text:'{translate text="Create new %1%" r1=$nodeUtil->getDisplayNameFromType($realSubject->getType())}'{rdelim}, 
        handler:function(){ldelim}doSetParent('{$poid}'); doNew('{$realSubject->getType()}'); setContext('{$realSubject->getType()}'); submitAction('new');{rdelim}{rdelim});
      {/if}
      {if !$template->getProperty('composition')}
      var dlgNMFeatureRequirementsChild = new AssociateDialog();
      curButtonDefs.push({ldelim}icon:'images/link.png', cls:'x-btn-icon', tooltip:{ldelim}text:'{translate text="Associate selected"}'{rdelim}, 
        handler:function(){ldelim}dlgNMFeatureRequirementsChild.show('{$realSubject->getType()}', grids['NMFeatureRequirementsChild'], '{$poid}', false);{rdelim}{rdelim});
      {/if}
    {/if}
    buttonDefs['NMFeatureRequirementsChild'] = curButtonDefs;
    // grid initialization
    grids['NMFeatureRequirementsChild'].init('{$realSubject->getObjectDisplayName()}', 'NMFeatureRequirements', '{$nodeUtil->getChildQuery($node, 'NMFeatureRequirements')|replace:"'":"\'"}', columDefs['NMFeatureRequirementsChild'], {ldelim}paging:true, autoheight:true, singleSelect:true, ddRows:{$ddRows}{rdelim}, [new wcmf.grid.EditAction(), {if $template->getProperty('canCreate')}new wcmf.grid.DuplicateAction(), {/if}new wcmf.grid.DeleteAction()], buttonDefs['NMFeatureRequirementsChild'], {ldelim}ptype:'{$node->getType()}', poid:'{$node->getOID()}'{rdelim});
    grids['NMFeatureRequirementsChild'].getGridImpl().applyToMarkup('NMFeatureRequirementsChildGrid');
    grids['NMFeatureRequirementsChild'].load();

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
	<img align="right" src="images/ChiRequirement.PNG" width="50" height="50" alt="ChiRequirement" border="0" />
	<h2 title="{translate text="object ID"}: {$oid|default:"-"}">{$nodeUtil->getDisplayValue($node, true)}&nbsp;</span></h2>
	<span class="spacer">
	
	<span class="dottedSeparator"></span>
	<span class="left" title="{$node->getValueDescription('Name')}">{$node->getValueDisplayName('Name')}</span>
	<span class="right">{$nodeUtil->getInputControl($node, 'Name')}</span>
	
	<span class="dottedSeparator"></span>
	<span class="left" title="{$node->getValueDescription('reqType')}">{$node->getValueDisplayName('reqType')}</span>
	<span class="right">{$nodeUtil->getInputControl($node, 'reqType')}<a href="javascript:doSetParent(''); doNew('ChiRequirementsType'); setContext('ChiRequirementsType'); submitAction('new');"><img align="top" src="images/new.png" width="10" height="10" alt="new Requirements Type" border="0" /></a></span>

	<span class="dottedSeparator"></span>
	<span class="left" title="{$node->getValueDescription('Priority')}">{$node->getValueDisplayName('Priority')}</span>
	<span class="right">{$nodeUtil->getInputControl($node, 'Priority')}</span>

	<span class="dottedSeparator"></span>
	<span class="left" title="{$node->getValueDescription('Author')}">{$node->getValueDisplayName('Author')}</span>
	<span class="right">{$nodeUtil->getInputControl($node, 'Author')}<a href="javascript:doSetParent(''); doNew('ChiAuthors'); setContext('ChiAuthors'); submitAction('new');"><img align="top" src="images/new.png" width="10" height="10" alt="new Author" border="0" /></a></span>

	<span class="dottedSeparator"></span>
	<span class="left" title="{$node->getValueDescription('Proofreader')}">{$node->getValueDisplayName('Proofreader')}</span>
	<span class="right">{$nodeUtil->getInputControl($node, 'Proofreader')}<a href="javascript:doSetParent(''); doNew('ChiAuthors'); setContext('ChiAuthors'); submitAction('new');"><img align="top" src="images/new.png" width="10" height="10" alt="new Author" border="0" /></a></span>

	<span class="dottedSeparator"></span>
	<span class="left" title="{$node->getValueDescription('Status')}">{$node->getValueDisplayName('Status')}</span>
	<span class="right">{$nodeUtil->getInputControl($node, 'Status')}<a href="javascript:doSetParent(''); doNew('ChiRequirementStatus'); setContext('ChiRequirementStatus'); submitAction('new');"><img align="top" src="images/new.png" width="10" height="10" alt="new status" border="0" /></a></span>
	
	<span class="dottedSeparator"></span>
	<span class="left" title="{$node->getValueDescription('Alias')}">{$node->getValueDisplayName('Alias')}</span>
	<span class="right">{$nodeUtil->getInputControl($node, 'Alias')}</span>

	<span class="dottedSeparator"></span>
	<span class="left" title="{$node->getValueDescription('Version')}">{$node->getValueDisplayName('Version')}</span>
	<span class="right">{$nodeUtil->getInputControl($node, 'Version')}</span>

	

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

  {assign var="template" value=$possibleparents.ChiGoal}
  {assign var="parent" value=$template->getProperty('assignedParent')}
  {if $parent}
    {assign var="parentoid" value=$parent->getOID()}
  {else}
    {assign var="parentoid" value=''}
  {/if}
  {translate text="Create new %1% under %2%" r1=$nodeUtil->getDisplayNameFromType($node->getType()) r2=$nodeUtil->getDisplayNameFromType($parent->getType()) varname="createText"}
  <span class="all"><a href="javascript:doSetParent('{$parentoid}'); doNew('{$node->getType()}'); setContext('{$node->getType()}'); submitAction('new');"><img src="images/new.png" 
    alt="{$createText}" title="{$createText}" border="0"> {$createText}</a></span>

</div>

</div>
<div id="rightcol">

{*------ Parents ------*}
<h3>Parents</h3>
<!-- ChiGoal -->
<div class="contentblock">
  <div id="ChiGoalParentGrid" style="border:1px solid #99bbe8;overflow: hidden; width: 445px;"></div>
</div>


{*------ Children grouped by type ------*}
<h3>Children</h3>
<!-- ChiIssue -->
<div class="contentblock">
  <div id="ChiIssueChildGrid" style="border:1px solid #99bbe8;overflow: hidden; width: 445px;"></div>
</div>

<!-- NMFeatureRequirements -->
<div class="contentblock">
  <div id="NMFeatureRequirementsChildGrid" style="border:1px solid #99bbe8;overflow: hidden; width: 445px;"></div>
</div>


</div>

{else}
{*------------------------------- Overview -------------------------------*}

<div class="contentblock">
  <div id="{$rootType}Grid" style="border:1px solid #99bbe8;overflow: hidden; width: 665px;"></div>
</div>

{/if}

{include file="lib:application/views/include/footer.tpl"}
<!-- PROTECTED REGION END -->
