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
  {foreach key=type item=template from=$possibleparents}
    {assign var="parent" value=$template->getProperty('assignedParent')}
    {if $parent}
      {assign var="parentid" value=$parent->getDBID()}
    {else}
      {assign var="parentid" value=''}
    {/if}
    {if $template->hasValue('sortkey')}{assign var="ddRows" value="true"}{else}{assign var="ddRows" value="false"}{/if}

    var grid = new wcmf.grid.Grid();
    grids['{$type}Parent'] = grid;
    var curColumnDefs = [];
    {count_items varname="numColumns" array=$template->getDisplayValues(true)}
    {math equation="355/x" x=$numColumns assign="columnWidth" format="%d"}
    {foreach key=name item=value from=$template->getDisplayValues(true)}
    curColumnDefs.push({ldelim}id:"{$name|default:"-"}", dataIndex:"{$name}", header:"{$name|default:"-"}", width:{$columnWidth}, sortable:true, renderer:grid.renderColumnDefault.createDelegate(grid){rdelim});
    {/foreach}
    columDefs['{$type}Parent'] = curColumnDefs;

    var curButtonDefs = [];
    {if $template->getProperty('canAssociate') == true}
      var dlg{$type}Parent = new AssociateDialog();
      curButtonDefs.push({ldelim}icon:'images/link.png', cls:'x-btn-icon', tooltip:{ldelim}text:'{translate text="Associate selected"}'{rdelim}, handler:function(){ldelim}dlg{$type}Parent.show('{$type}', grids['{$type}Parent'], '{$node->getOID()}', true);{rdelim}{rdelim});
    {/if}
    buttonDefs['{$type}Parent'] = curButtonDefs;

    grids['{$type}Parent'].init('{$template->getObjectDisplayName()}', '{$type}', "{$nodeUtil->getParentQuery($type, $node)|replace:"'":"\'"}", columDefs['{$type}Parent'], {ldelim}paging:false, autoheight:true, singleSelect:true, ddRows:{$ddRows}{rdelim}, [new wcmf.grid.EditAction()], buttonDefs['{$type}Parent']);
    grids['{$type}Parent'].getGridImpl().applyToMarkup('{$type}ParentGrid');
    grids['{$type}Parent'].load();
  {/foreach}

  // children
  {foreach key=type item=template from=$possiblechildren}
    {assign var="realSubject" value=$template}
    {if $template->getProperty('realSubject')}
      {assign var="realSubject" value=$template->getProperty('realSubject')}
    {/if}
    {if $template->hasValue('sortkey')}{assign var="ddRows" value="true"}{else}{assign var="ddRows" value="false"}{/if}

    var grid = new wcmf.grid.Grid();
    grids['{$type}Child'] = grid;
    var curColumnDefs = [];
    {count_items varname="numColumns" array=$realSubject->getDisplayValues(true)}
    {math equation="361/x" x=$numColumns assign="columnWidth" format="%d"}
    {foreach key=name item=value from=$realSubject->getDisplayValues(true)}
    curColumnDefs.push({ldelim}id:"{$name|default:"-"}", dataIndex:"{$name}", header:"{$name|default:"-"}", width:{$columnWidth}, sortable:true, renderer:grid.renderColumnDefault.createDelegate(grid){rdelim});
    {/foreach}
    columDefs['{$type}Child'] = curColumnDefs;

    var curButtonDefs = [];
    {if $template->getProperty('canCreate')}
      {assign var="poid" value=$node->getOID()}
      {if $template->getProperty('composition') || $template->getProperty('aggregation')}
      curButtonDefs.push({ldelim}icon:'images/new.png', cls:'x-btn-icon', tooltip:{ldelim}text:'{translate text="Create new %1%" r1=$nodeUtil->getDisplayNameFromType($realSubject->getType())}'{rdelim}, handler:function(){ldelim}doSetParent('{$poid}'); doNew('{$realSubject->getType()}'); setContext('{$realSubject->getType()}'); submitAction('new');{rdelim}{rdelim});
      {/if}
      {if !$template->getProperty('composition')}
      var dlg{$type}Child = new AssociateDialog();
      curButtonDefs.push({ldelim}icon:'images/link.png', cls:'x-btn-icon', tooltip:{ldelim}text:'{translate text="Associate selected"}'{rdelim}, handler:function(){ldelim}dlg{$type}Child.show('{$realSubject->getType()}', grids['{$type}Child'], '{$poid}', false);{rdelim}{rdelim});
      {/if}
    {/if}
    buttonDefs['{$type}Child'] = curButtonDefs;

    grids['{$type}Child'].init('{$realSubject->getObjectDisplayName()}', '{$type}', '{$nodeUtil->getChildQuery($node, $type)|replace:"'":"\'"}', columDefs['{$type}Child'], {ldelim}paging:true, autoheight:true, singleSelect:true, ddRows:{$ddRows}{rdelim}, [new wcmf.grid.EditAction(), {if $template->getProperty('canCreate')}new wcmf.grid.DuplicateAction(), {/if}new wcmf.grid.DeleteAction()], buttonDefs['{$type}Child'], {ldelim}ptype:'{$node->getType()}', poid:'{$node->getOID()}'{rdelim});
    grids['{$type}Child'].getGridImpl().applyToMarkup('{$type}ChildGrid');
    grids['{$type}Child'].load();
  {/foreach}
{else}
  {if $rootTemplateNode}
    {if $rootTemplateNode->hasValue('sortkey')}{assign var="ddRows" value="true"}{else}{assign var="ddRows" value="false"}{/if}

    var grid = new wcmf.grid.Grid();
    var columDefs = [];
    {count_items varname="numColumns" array=$rootTemplateNode->getDisplayValues(true)}
    {math equation="571/x" x=$numColumns assign="columnWidth" format="%d"}
    {foreach key=name item=value from=$rootTemplateNode->getDisplayValues(true)}
    columDefs.push({ldelim}id:"{$name|default:"-"}", dataIndex:"{$name}", header:"{$name|default:"-"}", width:{$columnWidth}, sortable:true, renderer:grid.renderColumnDefault.createDelegate(grid){rdelim});
    {/foreach}

    var buttonDefs = [];
    buttonDefs.push({ldelim}icon:'images/new.png', cls:'x-btn-icon', tooltip:{ldelim}text:'{translate text="Create new %1%" r1=$nodeUtil->getDisplayNameFromType($rootType)}'{rdelim}, handler:function(){ldelim}doSetParent('{$oid}'); doNew('{$rootType}'); submitAction('new');{rdelim}{rdelim});

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
	<h2 title="{translate text="object ID"}: {$oid|default:"-"}">{$node->getDisplayValue(true)}&nbsp;</h2>
	<span class="spacer"></span>
{assign var="data_types" value=$node->getDataTypes()}
{section name=data_type_index loop=$data_types}
  {assign var="cur_data_type" value=$data_types[data_type_index]}
  {if $cur_data_type != DATATYPE_IGNORE}
    {assign var="value_names" value=$node->getValueNames($cur_data_type)}
    {section name=value_name_index loop=$value_names}
      {assign var="cur_value_name" value=$value_names[value_name_index]}
  <span class="dottedSeparator"></span>
  <span class="left" title="{$node->getValueDescription($cur_value_name, $cur_data_type)}">{$node->getValueDisplayName($cur_value_name, $cur_data_type)}</span>
	<span class="right">{$nodeUtil->getInputControl($node, $cur_value_name, $cur_data_type)}</span>
    {/section}
  {/if}
{/section}
	<span class="spacer"></span>
{foreach key=type item=template from=$possibleparents}
  {assign var="parent" value=$template->getProperty('assignedParent')}
  {if $parent}
    {assign var="parentoid" value=$parent->getOID()}
  {else}
    {assign var="parentoid" value=''}
  {/if}
  {translate text="Create new %1% under %2%" r1=$nodeUtil->getDisplayNameFromType($node->getType()) r2=$nodeUtil->getDisplayNameFromType($parent->getType()) varname="createText"}
  <span class="all"><a href="javascript:doSetParent('{$parentoid}'); doNew('{$node->getType()}'); setContext('{$node->getType()}'); submitAction('new');"><img src="images/new.png" 
    alt="{$createText}" title="{$createText}" border="0"> {$createText}</a></span>
{foreachelse}
  {translate text="Create new %1%" r1=$nodeUtil->getDisplayNameFromType($node->getType()) varname="createText"}
  <span class="all"><a href="javascript:doSetParent(''); doNew('{$node->getType()}'); setContext('{$node->getType()}'); submitAction('new');"><img src="images/new.png" 
    alt="{$createText}" title="{$createText}" border="0"> {$createText}</a></span>
{/foreach}
</div>

</div>
<div id="rightcol">

{*------ Parents ------*}
{foreach key=type item=template from=$possibleparents}
<div class="contentblock">
  <div id="{$type}ParentGrid" style="border:1px solid #99bbe8;overflow: hidden; width: 445px"></div>
</div>
{/foreach}

{*------ Children grouped by type ------*}
{foreach key=type item=template from=$possiblechildren}
<div class="contentblock">
  <div id="{$type}ChildGrid" style="border:1px solid #99bbe8;overflow: hidden; width: 445px"></div>
</div>
{/foreach}

</div>

{else}
{*------------------------------- Overview -------------------------------*}

<div class="contentblock">
  <div id="{$rootType}Grid" style="border:1px solid #99bbe8;overflow: hidden; width: 665px;"></div>
</div>

{/if}

{include file="lib:application/views/include/footer.tpl"}
