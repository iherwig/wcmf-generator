<?php /* Smarty version 2.6.19, created on 2008-04-03 20:26:46
         compiled from C:%5CProgramme%5Cxampp%5Chtdocs%5C26%5Cwcmf%5Capplication%5Cviews%5Cdisplaynode.tpl */ ?>
<?php require_once(SMARTY_CORE_DIR . 'core.load_plugins.php');
smarty_core_load_plugins(array('plugins' => array(array('function', 'count_items', 'C:\\Programme\\xampp\\htdocs\\26\\wcmf\\application\\views\\displaynode.tpl', 26, false),array('function', 'math', 'C:\\Programme\\xampp\\htdocs\\26\\wcmf\\application\\views\\displaynode.tpl', 27, false),array('function', 'translate', 'C:\\Programme\\xampp\\htdocs\\26\\wcmf\\application\\views\\displaynode.tpl', 36, false),array('modifier', 'default', 'C:\\Programme\\xampp\\htdocs\\26\\wcmf\\application\\views\\displaynode.tpl', 29, false),array('modifier', 'replace', 'C:\\Programme\\xampp\\htdocs\\26\\wcmf\\application\\views\\displaynode.tpl', 40, false),)), $this); ?>
<?php $_smarty_tpl_vars = $this->_tpl_vars;
$this->_smarty_include(array('smarty_include_tpl_file' => "lib:application/views/include/docheader.tpl", 'smarty_include_vars' => array()));
$this->_tpl_vars = $_smarty_tpl_vars;
unset($_smarty_tpl_vars);
 ?>
<head>
<?php $_smarty_tpl_vars = $this->_tpl_vars;
$this->_smarty_include(array('smarty_include_tpl_file' => "lib:application/views/include/header.tpl", 'smarty_include_vars' => array()));
$this->_tpl_vars = $_smarty_tpl_vars;
unset($_smarty_tpl_vars);
 ?>
<script>
  function init()
  {
    Ext.QuickTips.init();
<?php if ($this->_tpl_vars['viewMode'] == 'detail'): ?>
    var grids = [];
    var columDefs = [];
    var buttonDefs = [];
    
  // parents
  <?php $_from = $this->_tpl_vars['possibleparents']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }if (count($_from)):
    foreach ($_from as $this->_tpl_vars['type'] => $this->_tpl_vars['template']):
?>
    <?php $this->assign('parent', $this->_tpl_vars['template']->getProperty('assignedParent')); ?>
    <?php if ($this->_tpl_vars['parent']): ?>
      <?php $this->assign('parentid', $this->_tpl_vars['parent']->getDBID()); ?>
    <?php else: ?>
      <?php $this->assign('parentid', ''); ?>
    <?php endif; ?>
    <?php if ($this->_tpl_vars['template']->hasValue('sortkey')): ?><?php $this->assign('ddRows', 'true'); ?><?php else: ?><?php $this->assign('ddRows', 'false'); ?><?php endif; ?>

    var grid = new wcmf.grid.Grid();
    grids['<?php echo $this->_tpl_vars['type']; ?>
Parent'] = grid;
    var curColumnDefs = [];
    <?php echo smarty_function_count_items(array('varname' => 'numColumns','array' => $this->_tpl_vars['template']->getDisplayValues(true)), $this);?>

    <?php echo smarty_function_math(array('equation' => "355/x",'x' => $this->_tpl_vars['numColumns'],'assign' => 'columnWidth','format' => "%d"), $this);?>

    <?php $_from = $this->_tpl_vars['template']->getDisplayValues(true); if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }if (count($_from)):
    foreach ($_from as $this->_tpl_vars['name'] => $this->_tpl_vars['value']):
?>
    curColumnDefs.push({id:"<?php echo ((is_array($_tmp=@$this->_tpl_vars['name'])) ? $this->_run_mod_handler('default', true, $_tmp, "-") : smarty_modifier_default($_tmp, "-")); ?>
", dataIndex:"<?php echo $this->_tpl_vars['name']; ?>
", header:"<?php echo ((is_array($_tmp=@$this->_tpl_vars['name'])) ? $this->_run_mod_handler('default', true, $_tmp, "-") : smarty_modifier_default($_tmp, "-")); ?>
", width:<?php echo $this->_tpl_vars['columnWidth']; ?>
, sortable:true, renderer:grid.renderColumnDefault.createDelegate(grid)});
    <?php endforeach; endif; unset($_from); ?>
    columDefs['<?php echo $this->_tpl_vars['type']; ?>
Parent'] = curColumnDefs;

    var curButtonDefs = [];
    <?php if ($this->_tpl_vars['template']->getProperty('canAssociate') == true): ?>
      var dlg<?php echo $this->_tpl_vars['type']; ?>
Parent = new AssociateDialog();
      curButtonDefs.push({icon:'images/link.png', cls:'x-btn-icon', tooltip:{text:'<?php echo smarty_function_translate(array('text' => 'Associate selected'), $this);?>
'}, handler:function(){dlg<?php echo $this->_tpl_vars['type']; ?>
Parent.show('<?php echo $this->_tpl_vars['type']; ?>
', grids['<?php echo $this->_tpl_vars['type']; ?>
Parent'], '<?php echo $this->_tpl_vars['node']->getOID(); ?>
', true);}});
    <?php endif; ?>
    buttonDefs['<?php echo $this->_tpl_vars['type']; ?>
Parent'] = curButtonDefs;

    grids['<?php echo $this->_tpl_vars['type']; ?>
Parent'].init('<?php echo $this->_tpl_vars['template']->getObjectDisplayName(); ?>
', '<?php echo $this->_tpl_vars['type']; ?>
', "<?php echo ((is_array($_tmp=$this->_tpl_vars['nodeUtil']->getParentQuery($this->_tpl_vars['type'],$this->_tpl_vars['node']))) ? $this->_run_mod_handler('replace', true, $_tmp, "'", "\'") : smarty_modifier_replace($_tmp, "'", "\'")); ?>
", columDefs['<?php echo $this->_tpl_vars['type']; ?>
Parent'], {paging:false, autoheight:true, singleSelect:true, ddRows:<?php echo $this->_tpl_vars['ddRows']; ?>
}, [new wcmf.grid.EditAction()], buttonDefs['<?php echo $this->_tpl_vars['type']; ?>
Parent']);
    grids['<?php echo $this->_tpl_vars['type']; ?>
Parent'].getGridImpl().applyToMarkup('<?php echo $this->_tpl_vars['type']; ?>
ParentGrid');
    grids['<?php echo $this->_tpl_vars['type']; ?>
Parent'].load();
  <?php endforeach; endif; unset($_from); ?>

  // children
  <?php $_from = $this->_tpl_vars['possiblechildren']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }if (count($_from)):
    foreach ($_from as $this->_tpl_vars['type'] => $this->_tpl_vars['template']):
?>
    <?php $this->assign('realSubject', $this->_tpl_vars['template']); ?>
    <?php if ($this->_tpl_vars['template']->getProperty('realSubject')): ?>
      <?php $this->assign('realSubject', $this->_tpl_vars['template']->getProperty('realSubject')); ?>
    <?php endif; ?>
    <?php if ($this->_tpl_vars['template']->hasValue('sortkey')): ?><?php $this->assign('ddRows', 'true'); ?><?php else: ?><?php $this->assign('ddRows', 'false'); ?><?php endif; ?>

    var grid = new wcmf.grid.Grid();
    grids['<?php echo $this->_tpl_vars['type']; ?>
Child'] = grid;
    var curColumnDefs = [];
    <?php echo smarty_function_count_items(array('varname' => 'numColumns','array' => $this->_tpl_vars['realSubject']->getDisplayValues(true)), $this);?>

    <?php echo smarty_function_math(array('equation' => "361/x",'x' => $this->_tpl_vars['numColumns'],'assign' => 'columnWidth','format' => "%d"), $this);?>

    <?php $_from = $this->_tpl_vars['realSubject']->getDisplayValues(true); if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }if (count($_from)):
    foreach ($_from as $this->_tpl_vars['name'] => $this->_tpl_vars['value']):
?>
    curColumnDefs.push({id:"<?php echo ((is_array($_tmp=@$this->_tpl_vars['name'])) ? $this->_run_mod_handler('default', true, $_tmp, "-") : smarty_modifier_default($_tmp, "-")); ?>
", dataIndex:"<?php echo $this->_tpl_vars['name']; ?>
", header:"<?php echo ((is_array($_tmp=@$this->_tpl_vars['name'])) ? $this->_run_mod_handler('default', true, $_tmp, "-") : smarty_modifier_default($_tmp, "-")); ?>
", width:<?php echo $this->_tpl_vars['columnWidth']; ?>
, sortable:true, renderer:grid.renderColumnDefault.createDelegate(grid)});
    <?php endforeach; endif; unset($_from); ?>
    columDefs['<?php echo $this->_tpl_vars['type']; ?>
Child'] = curColumnDefs;

    var curButtonDefs = [];
    <?php if ($this->_tpl_vars['template']->getProperty('canCreate')): ?>
      <?php $this->assign('poid', $this->_tpl_vars['node']->getOID()); ?>
      <?php if ($this->_tpl_vars['template']->getProperty('composition') || $this->_tpl_vars['template']->getProperty('aggregation')): ?>
      curButtonDefs.push({icon:'images/new.png', cls:'x-btn-icon', tooltip:{text:'<?php echo smarty_function_translate(array('text' => "Create new %1%",'r1' => $this->_tpl_vars['nodeUtil']->getDisplayNameFromType($this->_tpl_vars['realSubject']->getType())), $this);?>
'}, handler:function(){doSetParent('<?php echo $this->_tpl_vars['poid']; ?>
'); doNew('<?php echo $this->_tpl_vars['realSubject']->getType(); ?>
'); setContext('<?php echo $this->_tpl_vars['realSubject']->getType(); ?>
'); submitAction('new');}});
      <?php endif; ?>
      <?php if (! $this->_tpl_vars['template']->getProperty('composition')): ?>
      var dlg<?php echo $this->_tpl_vars['type']; ?>
Child = new AssociateDialog();
      curButtonDefs.push({icon:'images/link.png', cls:'x-btn-icon', tooltip:{text:'<?php echo smarty_function_translate(array('text' => 'Associate selected'), $this);?>
'}, handler:function(){dlg<?php echo $this->_tpl_vars['type']; ?>
Child.show('<?php echo $this->_tpl_vars['realSubject']->getType(); ?>
', grids['<?php echo $this->_tpl_vars['type']; ?>
Child'], '<?php echo $this->_tpl_vars['poid']; ?>
', false);}});
      <?php endif; ?>
    <?php endif; ?>
    buttonDefs['<?php echo $this->_tpl_vars['type']; ?>
Child'] = curButtonDefs;

    grids['<?php echo $this->_tpl_vars['type']; ?>
Child'].init('<?php echo $this->_tpl_vars['realSubject']->getObjectDisplayName(); ?>
', '<?php echo $this->_tpl_vars['type']; ?>
', '<?php echo ((is_array($_tmp=$this->_tpl_vars['nodeUtil']->getChildQuery($this->_tpl_vars['node'],$this->_tpl_vars['type']))) ? $this->_run_mod_handler('replace', true, $_tmp, "'", "\'") : smarty_modifier_replace($_tmp, "'", "\'")); ?>
', columDefs['<?php echo $this->_tpl_vars['type']; ?>
Child'], {paging:true, autoheight:true, singleSelect:true, ddRows:<?php echo $this->_tpl_vars['ddRows']; ?>
}, [new wcmf.grid.EditAction(), <?php if ($this->_tpl_vars['template']->getProperty('canCreate')): ?>new wcmf.grid.DuplicateAction(), <?php endif; ?>new wcmf.grid.DeleteAction()], buttonDefs['<?php echo $this->_tpl_vars['type']; ?>
Child'], {ptype:'<?php echo $this->_tpl_vars['node']->getType(); ?>
', poid:'<?php echo $this->_tpl_vars['node']->getOID(); ?>
'});
    grids['<?php echo $this->_tpl_vars['type']; ?>
Child'].getGridImpl().applyToMarkup('<?php echo $this->_tpl_vars['type']; ?>
ChildGrid');
    grids['<?php echo $this->_tpl_vars['type']; ?>
Child'].load();
  <?php endforeach; endif; unset($_from); ?>
<?php else: ?>
  <?php if ($this->_tpl_vars['rootTemplateNode']): ?>
    <?php if ($this->_tpl_vars['rootTemplateNode']->hasValue('sortkey')): ?><?php $this->assign('ddRows', 'true'); ?><?php else: ?><?php $this->assign('ddRows', 'false'); ?><?php endif; ?>

    var grid = new wcmf.grid.Grid();
    var columDefs = [];
    <?php echo smarty_function_count_items(array('varname' => 'numColumns','array' => $this->_tpl_vars['rootTemplateNode']->getDisplayValues(true)), $this);?>

    <?php echo smarty_function_math(array('equation' => "571/x",'x' => $this->_tpl_vars['numColumns'],'assign' => 'columnWidth','format' => "%d"), $this);?>

    <?php $_from = $this->_tpl_vars['rootTemplateNode']->getDisplayValues(true); if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }if (count($_from)):
    foreach ($_from as $this->_tpl_vars['name'] => $this->_tpl_vars['value']):
?>
    columDefs.push({id:"<?php echo ((is_array($_tmp=@$this->_tpl_vars['name'])) ? $this->_run_mod_handler('default', true, $_tmp, "-") : smarty_modifier_default($_tmp, "-")); ?>
", dataIndex:"<?php echo $this->_tpl_vars['name']; ?>
", header:"<?php echo ((is_array($_tmp=@$this->_tpl_vars['name'])) ? $this->_run_mod_handler('default', true, $_tmp, "-") : smarty_modifier_default($_tmp, "-")); ?>
", width:<?php echo $this->_tpl_vars['columnWidth']; ?>
, sortable:true, renderer:grid.renderColumnDefault.createDelegate(grid)});
    <?php endforeach; endif; unset($_from); ?>

    var buttonDefs = [];
    buttonDefs.push({icon:'images/new.png', cls:'x-btn-icon', tooltip:{text:'<?php echo smarty_function_translate(array('text' => "Create new %1%",'r1' => $this->_tpl_vars['nodeUtil']->getDisplayNameFromType($this->_tpl_vars['rootType'])), $this);?>
'}, handler:function(){doSetParent('<?php echo $this->_tpl_vars['oid']; ?>
'); doNew('<?php echo $this->_tpl_vars['rootType']; ?>
'); submitAction('new');}});

    grid.init('<?php echo $this->_tpl_vars['nodeUtil']->getDisplayNameFromType($this->_tpl_vars['rootType']); ?>
', '<?php echo $this->_tpl_vars['rootType']; ?>
', '<?php echo ((is_array($_tmp=$this->_tpl_vars['nodeUtil']->getNodeQuery($this->_tpl_vars['rootType']))) ? $this->_run_mod_handler('replace', true, $_tmp, "'", "\'") : smarty_modifier_replace($_tmp, "'", "\'")); ?>
', columDefs, {paging:true, autoheight:true, singleSelect:true, ddRows:<?php echo $this->_tpl_vars['ddRows']; ?>
}, [new wcmf.grid.EditAction(), new wcmf.grid.DuplicateAction(), new wcmf.grid.DeleteAction()], buttonDefs);
    grid.getGridImpl().applyToMarkup('<?php echo $this->_tpl_vars['rootType']; ?>
Grid');
    grid.load();
  <?php endif; ?>
<?php endif; ?>
  }
</script>
</head>
<body onload="init();">
<div id="page">
<?php $_smarty_tpl_vars = $this->_tpl_vars;
$this->_smarty_include(array('smarty_include_tpl_file' => "lib:application/views/include/formheader.tpl", 'smarty_include_vars' => array()));
$this->_tpl_vars = $_smarty_tpl_vars;
unset($_smarty_tpl_vars);
 ?>
<?php $_smarty_tpl_vars = $this->_tpl_vars;
$this->_smarty_include(array('smarty_include_tpl_file' => "lib:application/views/include/title.tpl", 'smarty_include_vars' => array()));
$this->_tpl_vars = $_smarty_tpl_vars;
unset($_smarty_tpl_vars);
 ?>

<div id="tabnav">
<?php $_smarty_tpl_vars = $this->_tpl_vars;
$this->_smarty_include(array('smarty_include_tpl_file' => "lib:application/views/include/root_type_tabs.tpl", 'smarty_include_vars' => array('rootType' => $this->_tpl_vars['rootType'])));
$this->_tpl_vars = $_smarty_tpl_vars;
unset($_smarty_tpl_vars);
 ?>
</div>

<?php $_smarty_tpl_vars = $this->_tpl_vars;
$this->_smarty_include(array('smarty_include_tpl_file' => "lib:application/views/include/navigation.tpl", 'smarty_include_vars' => array()));
$this->_tpl_vars = $_smarty_tpl_vars;
unset($_smarty_tpl_vars);
 ?>
<?php $_smarty_tpl_vars = $this->_tpl_vars;
$this->_smarty_include(array('smarty_include_tpl_file' => "lib:application/views/include/error.tpl", 'smarty_include_vars' => array('displayMessageDialog' => 'false')));
$this->_tpl_vars = $_smarty_tpl_vars;
unset($_smarty_tpl_vars);
 ?>

<?php if ($this->_tpl_vars['lockMsg'] != ''): ?>
<div class="hint"><?php echo smarty_function_translate(array('text' => 'some objects are locked'), $this);?>
 (<a href="javascript:displayMsg();">details</a>)</div>
<div class="hint" id="msg"><?php echo $this->_tpl_vars['lockMsg']; ?>
</div>
<?php endif; ?>

<?php if ($this->_tpl_vars['viewMode'] == 'detail'): ?>


<div id="leftcol">

<div class="contentblock">
	<h2 title="<?php echo smarty_function_translate(array('text' => 'object ID'), $this);?>
: <?php echo ((is_array($_tmp=@$this->_tpl_vars['oid'])) ? $this->_run_mod_handler('default', true, $_tmp, "-") : smarty_modifier_default($_tmp, "-")); ?>
"><?php echo $this->_tpl_vars['node']->getDisplayValue(true); ?>
&nbsp;</h2>
	<span class="spacer"></span>
<?php $this->assign('data_types', $this->_tpl_vars['node']->getDataTypes()); ?>
<?php unset($this->_sections['data_type_index']);
$this->_sections['data_type_index']['name'] = 'data_type_index';
$this->_sections['data_type_index']['loop'] = is_array($_loop=$this->_tpl_vars['data_types']) ? count($_loop) : max(0, (int)$_loop); unset($_loop);
$this->_sections['data_type_index']['show'] = true;
$this->_sections['data_type_index']['max'] = $this->_sections['data_type_index']['loop'];
$this->_sections['data_type_index']['step'] = 1;
$this->_sections['data_type_index']['start'] = $this->_sections['data_type_index']['step'] > 0 ? 0 : $this->_sections['data_type_index']['loop']-1;
if ($this->_sections['data_type_index']['show']) {
    $this->_sections['data_type_index']['total'] = $this->_sections['data_type_index']['loop'];
    if ($this->_sections['data_type_index']['total'] == 0)
        $this->_sections['data_type_index']['show'] = false;
} else
    $this->_sections['data_type_index']['total'] = 0;
if ($this->_sections['data_type_index']['show']):

            for ($this->_sections['data_type_index']['index'] = $this->_sections['data_type_index']['start'], $this->_sections['data_type_index']['iteration'] = 1;
                 $this->_sections['data_type_index']['iteration'] <= $this->_sections['data_type_index']['total'];
                 $this->_sections['data_type_index']['index'] += $this->_sections['data_type_index']['step'], $this->_sections['data_type_index']['iteration']++):
$this->_sections['data_type_index']['rownum'] = $this->_sections['data_type_index']['iteration'];
$this->_sections['data_type_index']['index_prev'] = $this->_sections['data_type_index']['index'] - $this->_sections['data_type_index']['step'];
$this->_sections['data_type_index']['index_next'] = $this->_sections['data_type_index']['index'] + $this->_sections['data_type_index']['step'];
$this->_sections['data_type_index']['first']      = ($this->_sections['data_type_index']['iteration'] == 1);
$this->_sections['data_type_index']['last']       = ($this->_sections['data_type_index']['iteration'] == $this->_sections['data_type_index']['total']);
?>
  <?php $this->assign('cur_data_type', $this->_tpl_vars['data_types'][$this->_sections['data_type_index']['index']]); ?>
  <?php if ($this->_tpl_vars['cur_data_type'] != DATATYPE_IGNORE): ?>
    <?php $this->assign('value_names', $this->_tpl_vars['node']->getValueNames($this->_tpl_vars['cur_data_type'])); ?>
    <?php unset($this->_sections['value_name_index']);
$this->_sections['value_name_index']['name'] = 'value_name_index';
$this->_sections['value_name_index']['loop'] = is_array($_loop=$this->_tpl_vars['value_names']) ? count($_loop) : max(0, (int)$_loop); unset($_loop);
$this->_sections['value_name_index']['show'] = true;
$this->_sections['value_name_index']['max'] = $this->_sections['value_name_index']['loop'];
$this->_sections['value_name_index']['step'] = 1;
$this->_sections['value_name_index']['start'] = $this->_sections['value_name_index']['step'] > 0 ? 0 : $this->_sections['value_name_index']['loop']-1;
if ($this->_sections['value_name_index']['show']) {
    $this->_sections['value_name_index']['total'] = $this->_sections['value_name_index']['loop'];
    if ($this->_sections['value_name_index']['total'] == 0)
        $this->_sections['value_name_index']['show'] = false;
} else
    $this->_sections['value_name_index']['total'] = 0;
if ($this->_sections['value_name_index']['show']):

            for ($this->_sections['value_name_index']['index'] = $this->_sections['value_name_index']['start'], $this->_sections['value_name_index']['iteration'] = 1;
                 $this->_sections['value_name_index']['iteration'] <= $this->_sections['value_name_index']['total'];
                 $this->_sections['value_name_index']['index'] += $this->_sections['value_name_index']['step'], $this->_sections['value_name_index']['iteration']++):
$this->_sections['value_name_index']['rownum'] = $this->_sections['value_name_index']['iteration'];
$this->_sections['value_name_index']['index_prev'] = $this->_sections['value_name_index']['index'] - $this->_sections['value_name_index']['step'];
$this->_sections['value_name_index']['index_next'] = $this->_sections['value_name_index']['index'] + $this->_sections['value_name_index']['step'];
$this->_sections['value_name_index']['first']      = ($this->_sections['value_name_index']['iteration'] == 1);
$this->_sections['value_name_index']['last']       = ($this->_sections['value_name_index']['iteration'] == $this->_sections['value_name_index']['total']);
?>
      <?php $this->assign('cur_value_name', $this->_tpl_vars['value_names'][$this->_sections['value_name_index']['index']]); ?>
  <span class="dottedSeparator"></span>
  <span class="left" title="<?php echo $this->_tpl_vars['node']->getValueDescription($this->_tpl_vars['cur_value_name'],$this->_tpl_vars['cur_data_type']); ?>
"><?php echo $this->_tpl_vars['node']->getValueDisplayName($this->_tpl_vars['cur_value_name'],$this->_tpl_vars['cur_data_type']); ?>
</span>
	<span class="right"><?php echo $this->_tpl_vars['nodeUtil']->getInputControl($this->_tpl_vars['node'],$this->_tpl_vars['cur_value_name'],$this->_tpl_vars['cur_data_type']); ?>
</span>
    <?php endfor; endif; ?>
  <?php endif; ?>
<?php endfor; endif; ?>
	<span class="spacer"></span>
<?php $_from = $this->_tpl_vars['possibleparents']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }if (count($_from)):
    foreach ($_from as $this->_tpl_vars['type'] => $this->_tpl_vars['template']):
?>
  <?php $this->assign('parent', $this->_tpl_vars['template']->getProperty('assignedParent')); ?>
  <?php if ($this->_tpl_vars['parent']): ?>
    <?php $this->assign('parentoid', $this->_tpl_vars['parent']->getOID()); ?>
  <?php else: ?>
    <?php $this->assign('parentoid', ''); ?>
  <?php endif; ?>
  <?php echo smarty_function_translate(array('text' => "Create new %1% under %2%",'r1' => $this->_tpl_vars['nodeUtil']->getDisplayNameFromType($this->_tpl_vars['node']->getType()),'r2' => $this->_tpl_vars['nodeUtil']->getDisplayNameFromType($this->_tpl_vars['parent']->getType()),'varname' => 'createText'), $this);?>

  <span class="all"><a href="javascript:doSetParent('<?php echo $this->_tpl_vars['parentoid']; ?>
'); doNew('<?php echo $this->_tpl_vars['node']->getType(); ?>
'); setContext('<?php echo $this->_tpl_vars['node']->getType(); ?>
'); submitAction('new');"><img src="images/new.png" 
    alt="<?php echo $this->_tpl_vars['createText']; ?>
" title="<?php echo $this->_tpl_vars['createText']; ?>
" border="0"> <?php echo $this->_tpl_vars['createText']; ?>
</a></span>
<?php endforeach; else: ?>
  <?php echo smarty_function_translate(array('text' => "Create new %1%",'r1' => $this->_tpl_vars['nodeUtil']->getDisplayNameFromType($this->_tpl_vars['node']->getType()),'varname' => 'createText'), $this);?>

  <span class="all"><a href="javascript:doSetParent(''); doNew('<?php echo $this->_tpl_vars['node']->getType(); ?>
'); setContext('<?php echo $this->_tpl_vars['node']->getType(); ?>
'); submitAction('new');"><img src="images/new.png" 
    alt="<?php echo $this->_tpl_vars['createText']; ?>
" title="<?php echo $this->_tpl_vars['createText']; ?>
" border="0"> <?php echo $this->_tpl_vars['createText']; ?>
</a></span>
<?php endif; unset($_from); ?>
</div>

</div>
<div id="rightcol">

<?php $_from = $this->_tpl_vars['possibleparents']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }if (count($_from)):
    foreach ($_from as $this->_tpl_vars['type'] => $this->_tpl_vars['template']):
?>
<div class="contentblock">
  <div id="<?php echo $this->_tpl_vars['type']; ?>
ParentGrid" style="border:1px solid #99bbe8;overflow: hidden; width: 445px"></div>
</div>
<?php endforeach; endif; unset($_from); ?>

<?php $_from = $this->_tpl_vars['possiblechildren']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }if (count($_from)):
    foreach ($_from as $this->_tpl_vars['type'] => $this->_tpl_vars['template']):
?>
<div class="contentblock">
  <div id="<?php echo $this->_tpl_vars['type']; ?>
ChildGrid" style="border:1px solid #99bbe8;overflow: hidden; width: 445px"></div>
</div>
<?php endforeach; endif; unset($_from); ?>

</div>

<?php else: ?>

<div class="contentblock">
  <div id="<?php echo $this->_tpl_vars['rootType']; ?>
Grid" style="border:1px solid #99bbe8;overflow: hidden; width: 665px;"></div>
</div>

<?php endif; ?>

<?php $_smarty_tpl_vars = $this->_tpl_vars;
$this->_smarty_include(array('smarty_include_tpl_file' => "lib:application/views/include/footer.tpl", 'smarty_include_vars' => array()));
$this->_tpl_vars = $_smarty_tpl_vars;
unset($_smarty_tpl_vars);
 ?>