<!--
  This file was generated by wCMFGenerator 3.0.0017 from requirements.uml on Fri Oct 23 13:32:42 CEST 2009. 
  Manual modifications should be placed inside the protected regions.
-->
<!-- PROTECTED REGION ID(application/include/views/ChiUseCaseView.tpl/Body) ENABLED START -->
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
    grids['ChiBusinessProcessParent'].init('{$template->getObjectDisplayName()}', 'ChiBusinessProcess', "{$obfuscator->obfuscate($nodeUtil->getParentQuery('ChiBusinessProcess', $node))}", columDefs['ChiBusinessProcessParent'], {ldelim}paging:false, autoheight:true, singleSelect:true, ddRows:{$ddRows}{rdelim}, [new wcmf.grid.EditAction(){if $template->getProperty('composition') == false}, new wcmf.grid.DeleteAction(){/if}], buttonDefs['ChiBusinessProcessParent']);
    grids['ChiBusinessProcessParent'].getGridImpl().applyToMarkup('ChiBusinessProcessParentGrid');
    grids['ChiBusinessProcessParent'].load();
    // ChiFeature
    {assign var="template" value=$possibleparents.ChiFeature}
    {assign var="parent" value=$template->getProperty('assignedParent')}
    {if $parent}
      {assign var="parentid" value=$parent->getDBID()}
    {else}
      {assign var="parentid" value=''}
    {/if}
    {if $template->hasValue('sortkey')}{assign var="ddRows" value="true"}{else}{assign var="ddRows" value="false"}{/if}
    
    grids['ChiFeatureParent'] = new wcmf.grid.Grid();
    // column definitions
    var curColumnDefs = [];
    {count_items varname="numColumns" array=$template->getDisplayValues(true)}
    {math equation="361/x" x=$numColumns assign="columnWidth" format="%d"}
    {foreach key=name item=value from=$template->getDisplayValues(true)}
    curColumnDefs.push({ldelim}id:"{$name}", dataIndex:"{$name}", header:"{$name}", width:{$columnWidth}, sortable:true, renderer:grids['ChiFeatureParent'].renderColumnDefault.createDelegate(grids['ChiFeatureParent']){rdelim});
    {/foreach}
    columDefs['ChiFeatureParent'] = curColumnDefs;
    // button definitions
    var curButtonDefs = [];
    {if $template->getProperty('canAssociate') == true}
      var dlgChiFeatureParent = new AssociateDialog();
      curButtonDefs.push({ldelim}icon:'images/link.png', cls:'x-btn-icon', tooltip:{ldelim}text:'{translate text="Associate selected"}'{rdelim}, handler:function(){ldelim}dlgChiFeatureParent.show('ChiFeature', grids['ChiFeatureParent'], '{$node->getOID()}', 'parent', true);{rdelim}{rdelim});
    {/if}
    buttonDefs['ChiFeatureParent'] = curButtonDefs;
    // grid initialization
    grids['ChiFeatureParent'].init('{$template->getObjectDisplayName()}', 'ChiFeature', "{$obfuscator->obfuscate($nodeUtil->getParentQuery('ChiFeature', $node))}", columDefs['ChiFeatureParent'], {ldelim}paging:false, autoheight:true, singleSelect:true, ddRows:{$ddRows}{rdelim}, [new wcmf.grid.EditAction(){if $template->getProperty('composition') == false}, new wcmf.grid.DeleteAction(){/if}], buttonDefs['ChiFeatureParent']);
    grids['ChiFeatureParent'].getGridImpl().applyToMarkup('ChiFeatureParentGrid');
    grids['ChiFeatureParent'].load();
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
    grids['PackageParent'].init('{$template->getObjectDisplayName()}', 'Package', "{$obfuscator->obfuscate($nodeUtil->getParentQuery('Package', $node))}", columDefs['PackageParent'], {ldelim}paging:false, autoheight:true, singleSelect:true, ddRows:{$ddRows}{rdelim}, [new wcmf.grid.EditAction(){if $template->getProperty('composition') == false}, new wcmf.grid.DeleteAction(){/if}], buttonDefs['PackageParent']);
    grids['PackageParent'].getGridImpl().applyToMarkup('PackageParentGrid');
    grids['PackageParent'].load();

    // children
    // ActivitySet
    {assign var="template" value=$possiblechildren.ActivitySet}
    {assign var="realSubject" value=$template}
    {if $template->getProperty('realSubject')}
      {assign var="realSubject" value=$template->getProperty('realSubject')}
    {/if}
    {if $template->hasValue('sortkey')}{assign var="ddRows" value="true"}{else}{assign var="ddRows" value="false"}{/if}

    grids['ActivitySetChild'] = new wcmf.grid.Grid();
    // column definitions
    var curColumnDefs = [];
    {count_items varname="numColumns" array=$realSubject->getDisplayValues(true)}
    {math equation="361/x" x=$numColumns assign="columnWidth" format="%d"}
    {foreach key=name item=value from=$realSubject->getDisplayValues(true)}
    curColumnDefs.push({ldelim}id:"{$name}", dataIndex:"{$name}", header:"{$name}", width:{$columnWidth}, sortable:true, renderer:grids['ActivitySetChild'].renderColumnDefault.createDelegate(grids['ActivitySetChild']){rdelim});
    {/foreach}
    columDefs['ActivitySetChild'] = curColumnDefs;
    // button definitions
    var curButtonDefs = [];
    {if $template->getProperty('canCreate')}
      {assign var="poid" value=$node->getOID()}
      {if $template->getProperty('composition') || $template->getProperty('aggregation')}
      curButtonDefs.push({ldelim}icon:'images/new.png', cls:'x-btn-icon', tooltip:{ldelim}text:'{translate text="Create new %1%" r1=$nodeUtil->getDisplayNameFromType($realSubject->getType())}'{rdelim}, 
        handler:function(){ldelim}doSetParent('{$poid}'); doNew('{$realSubject->getType()}'); setContext('{$realSubject->getType()}'); submitAction('new');{rdelim}{rdelim});
      {/if}
      {if !$template->getProperty('composition')}
      var dlgActivitySetChild = new AssociateDialog();
      curButtonDefs.push({ldelim}icon:'images/link.png', cls:'x-btn-icon', tooltip:{ldelim}text:'{translate text="Associate selected"}'{rdelim}, 
        handler:function(){ldelim}dlgActivitySetChild.show('{$realSubject->getType()}', grids['ActivitySetChild'], '{$poid}', 'child', false);{rdelim}{rdelim});
      {/if}
    {/if}
    buttonDefs['ActivitySetChild'] = curButtonDefs;
    // grid initialization
    grids['ActivitySetChild'].init('{$realSubject->getObjectDisplayName()}', 'ActivitySet', '{$obfuscator->obfuscate($nodeUtil->getChildQuery($node, 'ActivitySet'))}', columDefs['ActivitySetChild'], {ldelim}paging:true, autoheight:true, singleSelect:true, ddRows:{$ddRows}{rdelim}, [new wcmf.grid.EditAction(), {if $template->getProperty('canCreate')}new wcmf.grid.DuplicateAction(), {/if}new wcmf.grid.DeleteAction()], buttonDefs['ActivitySetChild'], {ldelim}poid:'{$node->getOID()}'{rdelim});
    grids['ActivitySetChild'].getGridImpl().applyToMarkup('ActivitySetChildGrid');
    grids['ActivitySetChild'].load();
    // NMUCActor
    {assign var="template" value=$possiblechildren.NMUCActor}
    {assign var="realSubject" value=$template}
    {if $template->getProperty('realSubject')}
      {assign var="realSubject" value=$template->getProperty('realSubject')}
    {/if}
    {if $template->hasValue('sortkey')}{assign var="ddRows" value="true"}{else}{assign var="ddRows" value="false"}{/if}

    grids['NMUCActorChild'] = new wcmf.grid.Grid();
    // column definitions
    var curColumnDefs = [];
    {count_items varname="numColumns" array=$realSubject->getDisplayValues(true)}
    {math equation="361/x" x=$numColumns assign="columnWidth" format="%d"}
    {foreach key=name item=value from=$realSubject->getDisplayValues(true)}
    curColumnDefs.push({ldelim}id:"{$name}", dataIndex:"{$name}", header:"{$name}", width:{$columnWidth}, sortable:true, renderer:grids['NMUCActorChild'].renderColumnDefault.createDelegate(grids['NMUCActorChild']){rdelim});
    {/foreach}
    columDefs['NMUCActorChild'] = curColumnDefs;
    // button definitions
    var curButtonDefs = [];
    {if $template->getProperty('canCreate')}
      {assign var="poid" value=$node->getOID()}
      {if $template->getProperty('composition') || $template->getProperty('aggregation')}
      curButtonDefs.push({ldelim}icon:'images/new.png', cls:'x-btn-icon', tooltip:{ldelim}text:'{translate text="Create new %1%" r1=$nodeUtil->getDisplayNameFromType($realSubject->getType())}'{rdelim}, 
        handler:function(){ldelim}doSetParent('{$poid}'); doNew('{$realSubject->getType()}'); setContext('{$realSubject->getType()}'); submitAction('new');{rdelim}{rdelim});
      {/if}
      {if !$template->getProperty('composition')}
      var dlgNMUCActorChild = new AssociateDialog();
      curButtonDefs.push({ldelim}icon:'images/link.png', cls:'x-btn-icon', tooltip:{ldelim}text:'{translate text="Associate selected"}'{rdelim}, 
        handler:function(){ldelim}dlgNMUCActorChild.show('{$realSubject->getType()}', grids['NMUCActorChild'], '{$poid}', 'child', false);{rdelim}{rdelim});
      {/if}
    {/if}
    buttonDefs['NMUCActorChild'] = curButtonDefs;
    // grid initialization
    grids['NMUCActorChild'].init('{$realSubject->getObjectDisplayName()}', 'NMUCActor', '{$obfuscator->obfuscate($nodeUtil->getChildQuery($node, 'NMUCActor'))}', columDefs['NMUCActorChild'], {ldelim}paging:true, autoheight:true, singleSelect:true, ddRows:{$ddRows}{rdelim}, [new wcmf.grid.EditAction(), {if $template->getProperty('canCreate')}new wcmf.grid.DuplicateAction(), {/if}new wcmf.grid.DeleteAction()], buttonDefs['NMUCActorChild'], {ldelim}poid:'{$node->getOID()}'{rdelim});
    grids['NMUCActorChild'].getGridImpl().applyToMarkup('NMUCActorChildGrid');
    grids['NMUCActorChild'].load();
    // ChiController
    {assign var="template" value=$possiblechildren.ChiController}
    {assign var="realSubject" value=$template}
    {if $template->getProperty('realSubject')}
      {assign var="realSubject" value=$template->getProperty('realSubject')}
    {/if}
    {if $template->hasValue('sortkey')}{assign var="ddRows" value="true"}{else}{assign var="ddRows" value="false"}{/if}

    grids['ChiControllerChild'] = new wcmf.grid.Grid();
    // column definitions
    var curColumnDefs = [];
    {count_items varname="numColumns" array=$realSubject->getDisplayValues(true)}
    {math equation="361/x" x=$numColumns assign="columnWidth" format="%d"}
    {foreach key=name item=value from=$realSubject->getDisplayValues(true)}
    curColumnDefs.push({ldelim}id:"{$name}", dataIndex:"{$name}", header:"{$name}", width:{$columnWidth}, sortable:true, renderer:grids['ChiControllerChild'].renderColumnDefault.createDelegate(grids['ChiControllerChild']){rdelim});
    {/foreach}
    columDefs['ChiControllerChild'] = curColumnDefs;
    // button definitions
    var curButtonDefs = [];
    {if $template->getProperty('canCreate')}
      {assign var="poid" value=$node->getOID()}
      {if $template->getProperty('composition') || $template->getProperty('aggregation')}
      curButtonDefs.push({ldelim}icon:'images/new.png', cls:'x-btn-icon', tooltip:{ldelim}text:'{translate text="Create new %1%" r1=$nodeUtil->getDisplayNameFromType($realSubject->getType())}'{rdelim}, 
        handler:function(){ldelim}doSetParent('{$poid}'); doNew('{$realSubject->getType()}'); setContext('{$realSubject->getType()}'); submitAction('new');{rdelim}{rdelim});
      {/if}
      {if !$template->getProperty('composition')}
      var dlgChiControllerChild = new AssociateDialog();
      curButtonDefs.push({ldelim}icon:'images/link.png', cls:'x-btn-icon', tooltip:{ldelim}text:'{translate text="Associate selected"}'{rdelim}, 
        handler:function(){ldelim}dlgChiControllerChild.show('{$realSubject->getType()}', grids['ChiControllerChild'], '{$poid}', 'child', false);{rdelim}{rdelim});
      {/if}
    {/if}
    buttonDefs['ChiControllerChild'] = curButtonDefs;
    // grid initialization
    grids['ChiControllerChild'].init('{$realSubject->getObjectDisplayName()}', 'ChiController', '{$obfuscator->obfuscate($nodeUtil->getChildQuery($node, 'ChiController'))}', columDefs['ChiControllerChild'], {ldelim}paging:true, autoheight:true, singleSelect:true, ddRows:{$ddRows}{rdelim}, [new wcmf.grid.EditAction(), {if $template->getProperty('canCreate')}new wcmf.grid.DuplicateAction(), {/if}new wcmf.grid.DeleteAction()], buttonDefs['ChiControllerChild'], {ldelim}poid:'{$node->getOID()}'{rdelim});
    grids['ChiControllerChild'].getGridImpl().applyToMarkup('ChiControllerChildGrid');
    grids['ChiControllerChild'].load();
    // Figure
    {assign var="template" value=$possiblechildren.Figure}
    {assign var="realSubject" value=$template}
    {if $template->getProperty('realSubject')}
      {assign var="realSubject" value=$template->getProperty('realSubject')}
    {/if}
    {if $template->hasValue('sortkey')}{assign var="ddRows" value="true"}{else}{assign var="ddRows" value="false"}{/if}

    grids['FigureChild'] = new wcmf.grid.Grid();
    // column definitions
    var curColumnDefs = [];
    {count_items varname="numColumns" array=$realSubject->getDisplayValues(true)}
    {math equation="361/x" x=$numColumns assign="columnWidth" format="%d"}
    {foreach key=name item=value from=$realSubject->getDisplayValues(true)}
    curColumnDefs.push({ldelim}id:"{$name}", dataIndex:"{$name}", header:"{$name}", width:{$columnWidth}, sortable:true, renderer:grids['FigureChild'].renderColumnDefault.createDelegate(grids['FigureChild']){rdelim});
    {/foreach}
    columDefs['FigureChild'] = curColumnDefs;
    // button definitions
    var curButtonDefs = [];
    {if $template->getProperty('canCreate')}
      {assign var="poid" value=$node->getOID()}
      {if $template->getProperty('composition') || $template->getProperty('aggregation')}
      curButtonDefs.push({ldelim}icon:'images/new.png', cls:'x-btn-icon', tooltip:{ldelim}text:'{translate text="Create new %1%" r1=$nodeUtil->getDisplayNameFromType($realSubject->getType())}'{rdelim}, 
        handler:function(){ldelim}doSetParent('{$poid}'); doNew('{$realSubject->getType()}'); setContext('{$realSubject->getType()}'); submitAction('new');{rdelim}{rdelim});
      {/if}
      {if !$template->getProperty('composition')}
      var dlgFigureChild = new AssociateDialog();
      curButtonDefs.push({ldelim}icon:'images/link.png', cls:'x-btn-icon', tooltip:{ldelim}text:'{translate text="Associate selected"}'{rdelim}, 
        handler:function(){ldelim}dlgFigureChild.show('{$realSubject->getType()}', grids['FigureChild'], '{$poid}', 'child', false);{rdelim}{rdelim});
      {/if}
    {/if}
    buttonDefs['FigureChild'] = curButtonDefs;
    // grid initialization
    grids['FigureChild'].init('{$realSubject->getObjectDisplayName()}', 'Figure', '{$obfuscator->obfuscate($nodeUtil->getChildQuery($node, 'Figure'))}', columDefs['FigureChild'], {ldelim}paging:true, autoheight:true, singleSelect:true, ddRows:{$ddRows}{rdelim}, [new wcmf.grid.EditAction(), {if $template->getProperty('canCreate')}new wcmf.grid.DuplicateAction(), {/if}new wcmf.grid.DeleteAction()], buttonDefs['FigureChild'], {ldelim}poid:'{$node->getOID()}'{rdelim});
    grids['FigureChild'].getGridImpl().applyToMarkup('FigureChildGrid');
    grids['FigureChild'].load();
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
    grid.init('{$nodeUtil->getDisplayNameFromType($rootType)}', '{$rootType}', '{$obfuscator->obfuscate($nodeUtil->getNodeQuery($rootType))}', columDefs, {ldelim}paging:true, autoheight:true, singleSelect:true, ddRows:{$ddRows}{rdelim}, [new wcmf.grid.EditAction(), new wcmf.grid.DuplicateAction(), new wcmf.grid.DeleteAction()], buttonDefs);
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
	<span class="left" title="{$node->getValueDescription('PrimaryActor')}">{$node->getValueDisplayName('PrimaryActor')}</span>
	<span class="right">{$nodeUtil->getInputControl($node, 'PrimaryActor')}</span>
	<span class="dottedSeparator"></span>
	<span class="left" title="{$node->getValueDescription('OtherActors')}">{$node->getValueDisplayName('OtherActors')}</span>
	<span class="right">{$nodeUtil->getInputControl($node, 'OtherActors')}</span>
	<span class="dottedSeparator"></span>
	<span class="left" title="{$node->getValueDescription('GoalInContext')}">{$node->getValueDisplayName('GoalInContext')}</span>
	<span class="right">{$nodeUtil->getInputControl($node, 'GoalInContext')}</span>
	<span class="dottedSeparator"></span>
	<span class="left" title="{$node->getValueDescription('Scope')}">{$node->getValueDisplayName('Scope')}</span>
	<span class="right">{$nodeUtil->getInputControl($node, 'Scope')}</span>
	<span class="dottedSeparator"></span>
	<span class="left" title="{$node->getValueDescription('Level')}">{$node->getValueDisplayName('Level')}</span>
	<span class="right">{$nodeUtil->getInputControl($node, 'Level')}</span>
	<span class="dottedSeparator"></span>
	<span class="left" title="{$node->getValueDescription('Stakeholders')}">{$node->getValueDisplayName('Stakeholders')}</span>
	<span class="right">{$nodeUtil->getInputControl($node, 'Stakeholders')}</span>
	<span class="dottedSeparator"></span>
	<span class="left" title="{$node->getValueDescription('Precondition')}">{$node->getValueDisplayName('Precondition')}</span>
	<span class="right">{$nodeUtil->getInputControl($node, 'Precondition')}</span>
	<span class="dottedSeparator"></span>
	<span class="left" title="{$node->getValueDescription('Trigger')}">{$node->getValueDisplayName('Trigger')}</span>
	<span class="right">{$nodeUtil->getInputControl($node, 'Trigger')}</span>
	<span class="dottedSeparator"></span>
	<span class="left" title="{$node->getValueDescription('MainSuccessScenario')}">{$node->getValueDisplayName('MainSuccessScenario')}</span>
	<span class="right">{$nodeUtil->getInputControl($node, 'MainSuccessScenario')}</span>
	<span class="dottedSeparator"></span>
	<span class="left" title="{$node->getValueDescription('Extensions')}">{$node->getValueDisplayName('Extensions')}</span>
	<span class="right">{$nodeUtil->getInputControl($node, 'Extensions')}</span>
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
  {assign var="template" value=$possibleparents.ChiFeature}
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
</div>

</div>
<div id="rightcol">

{*------ Parents ------*}
<!-- ChiBusinessProcess -->
<div class="contentblock">
  <div id="ChiBusinessProcessParentGrid" style="border:1px solid #99bbe8;overflow: hidden; width: 445px;"></div>
</div>
<!-- ChiFeature -->
<div class="contentblock">
  <div id="ChiFeatureParentGrid" style="border:1px solid #99bbe8;overflow: hidden; width: 445px;"></div>
</div>
<!-- Package -->
<div class="contentblock">
  <div id="PackageParentGrid" style="border:1px solid #99bbe8;overflow: hidden; width: 445px;"></div>
</div>

{*------ Children grouped by type ------*}
<!-- ActivitySet -->
<div class="contentblock">
  <div id="ActivitySetChildGrid" style="border:1px solid #99bbe8;overflow: hidden; width: 445px;"></div>
</div>
<!-- NMUCActor -->
<div class="contentblock">
  <div id="NMUCActorChildGrid" style="border:1px solid #99bbe8;overflow: hidden; width: 445px;"></div>
</div>
<!-- ChiController -->
<div class="contentblock">
  <div id="ChiControllerChildGrid" style="border:1px solid #99bbe8;overflow: hidden; width: 445px;"></div>
</div>
<!-- Figure -->
<div class="contentblock">
  <div id="FigureChildGrid" style="border:1px solid #99bbe8;overflow: hidden; width: 445px;"></div>
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
