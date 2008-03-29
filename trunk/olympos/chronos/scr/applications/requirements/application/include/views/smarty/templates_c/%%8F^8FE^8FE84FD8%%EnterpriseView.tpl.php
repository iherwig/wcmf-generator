<?php /* Smarty version 2.6.19, created on 2008-03-22 14:16:38
         compiled from C:%5CProgramme%5Cxampp%5Chtdocs%5C26%5Capplication%5Cinclude%5Cviews%5CEnterpriseView.tpl */ ?>
<?php require_once(SMARTY_CORE_DIR . 'core.load_plugins.php');
smarty_core_load_plugins(array('plugins' => array(array('function', 'count_items', 'C:\\Programme\\xampp\\htdocs\\26\\application\\include\\views\\EnterpriseView.tpl', 32, false),array('function', 'math', 'C:\\Programme\\xampp\\htdocs\\26\\application\\include\\views\\EnterpriseView.tpl', 33, false),array('function', 'translate', 'C:\\Programme\\xampp\\htdocs\\26\\application\\include\\views\\EnterpriseView.tpl', 43, false),array('modifier', 'replace', 'C:\\Programme\\xampp\\htdocs\\26\\application\\include\\views\\EnterpriseView.tpl', 54, false),array('modifier', 'default', 'C:\\Programme\\xampp\\htdocs\\26\\application\\include\\views\\EnterpriseView.tpl', 107, false),)), $this); ?>



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


    // children

    // Worker
    <?php $this->assign('template', $this->_tpl_vars['possiblechildren']['Worker']); ?>
    <?php $this->assign('realSubject', $this->_tpl_vars['template']); ?>
    <?php if ($this->_tpl_vars['template']->getProperty('realSubject')): ?>
      <?php $this->assign('realSubject', $this->_tpl_vars['template']->getProperty('realSubject')); ?>
    <?php endif; ?>
    <?php if ($this->_tpl_vars['template']->hasValue('sortkey')): ?><?php $this->assign('ddRows', 'true'); ?><?php else: ?><?php $this->assign('ddRows', 'false'); ?><?php endif; ?>

    grids['WorkerChild'] = new wcmf.grid.Grid();
    // column definitions
    var curColumnDefs = [];
    <?php echo smarty_function_count_items(array('varname' => 'numColumns','array' => $this->_tpl_vars['realSubject']->getDisplayValues(true)), $this);?>

    <?php echo smarty_function_math(array('equation' => "361/x",'x' => $this->_tpl_vars['numColumns'],'assign' => 'columnWidth','format' => "%d"), $this);?>

    <?php $_from = $this->_tpl_vars['realSubject']->getDisplayValues(true); if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }if (count($_from)):
    foreach ($_from as $this->_tpl_vars['name'] => $this->_tpl_vars['value']):
?>
    curColumnDefs.push({id:"<?php echo $this->_tpl_vars['name']; ?>
", dataIndex:"<?php echo $this->_tpl_vars['name']; ?>
", header:"<?php echo $this->_tpl_vars['name']; ?>
", width:<?php echo $this->_tpl_vars['columnWidth']; ?>
, sortable:true, renderer:grids['WorkerChild'].renderColumnDefault.createDelegate(grids['WorkerChild'])});
    <?php endforeach; endif; unset($_from); ?>
    columDefs['WorkerChild'] = curColumnDefs;
    // button definitions
    var curButtonDefs = [];
    <?php if ($this->_tpl_vars['template']->getProperty('canCreate')): ?>
      <?php $this->assign('poid', $this->_tpl_vars['node']->getOID()); ?>
      <?php if ($this->_tpl_vars['template']->getProperty('composition') || $this->_tpl_vars['template']->getProperty('aggregation')): ?>
      curButtonDefs.push({icon:'images/new.png', cls:'x-btn-icon', tooltip:{text:'<?php echo smarty_function_translate(array('text' => "Create new %1%",'r1' => $this->_tpl_vars['nodeUtil']->getDisplayNameFromType($this->_tpl_vars['realSubject']->getType())), $this);?>
'}, 
        handler:function(){doSetParent('<?php echo $this->_tpl_vars['poid']; ?>
'); doNew('<?php echo $this->_tpl_vars['realSubject']->getType(); ?>
'); setContext('<?php echo $this->_tpl_vars['realSubject']->getType(); ?>
'); submitAction('new');}});
      <?php endif; ?>
      <?php if (! $this->_tpl_vars['template']->getProperty('composition')): ?>
      var dlgWorkerChild = new AssociateDialog();
      curButtonDefs.push({icon:'images/link.png', cls:'x-btn-icon', tooltip:{text:'<?php echo smarty_function_translate(array('text' => 'Associate selected'), $this);?>
'}, 
        handler:function(){dlgWorkerChild.show('<?php echo $this->_tpl_vars['realSubject']->getType(); ?>
', grids['WorkerChild'], '<?php echo $this->_tpl_vars['poid']; ?>
', false);}});
      <?php endif; ?>
    <?php endif; ?>
    buttonDefs['WorkerChild'] = curButtonDefs;
    // grid initialization
    grids['WorkerChild'].init('<?php echo $this->_tpl_vars['realSubject']->getObjectDisplayName(); ?>
', 'Worker', '<?php echo ((is_array($_tmp=$this->_tpl_vars['nodeUtil']->getChildQuery($this->_tpl_vars['node'],'Worker'))) ? $this->_run_mod_handler('replace', true, $_tmp, "'", "\'") : smarty_modifier_replace($_tmp, "'", "\'")); ?>
', columDefs['WorkerChild'], {paging:true, autoheight:true, singleSelect:true, ddRows:<?php echo $this->_tpl_vars['ddRows']; ?>
}, [new wcmf.grid.EditAction(), <?php if ($this->_tpl_vars['template']->getProperty('canCreate')): ?>new wcmf.grid.DuplicateAction(), <?php endif; ?>new wcmf.grid.DeleteAction()], buttonDefs['WorkerChild'], {ptype:'<?php echo $this->_tpl_vars['node']->getType(); ?>
', poid:'<?php echo $this->_tpl_vars['node']->getOID(); ?>
'});
    grids['WorkerChild'].getGridImpl().applyToMarkup('WorkerChildGrid');
    grids['WorkerChild'].load();

<?php else: ?>
  <?php if ($this->_tpl_vars['rootTemplateNode']): ?>
    <?php if ($this->_tpl_vars['rootTemplateNode']->hasValue('sortkey')): ?><?php $this->assign('ddRows', 'true'); ?><?php else: ?><?php $this->assign('ddRows', 'false'); ?><?php endif; ?>

    var grid = new wcmf.grid.Grid();
    // column definitions
    var columDefs = [];
    <?php echo smarty_function_count_items(array('varname' => 'numColumns','array' => $this->_tpl_vars['rootTemplateNode']->getDisplayValues(true)), $this);?>

    <?php echo smarty_function_math(array('equation' => "575/x",'x' => $this->_tpl_vars['numColumns'],'assign' => 'columnWidth','format' => "%d"), $this);?>

    <?php $_from = $this->_tpl_vars['rootTemplateNode']->getDisplayValues(true); if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }if (count($_from)):
    foreach ($_from as $this->_tpl_vars['name'] => $this->_tpl_vars['value']):
?>
    columDefs.push({id:"<?php echo $this->_tpl_vars['name']; ?>
", dataIndex:"<?php echo $this->_tpl_vars['name']; ?>
", header:"<?php echo $this->_tpl_vars['name']; ?>
", width:<?php echo $this->_tpl_vars['columnWidth']; ?>
, sortable:true, renderer:grid.renderColumnDefault.createDelegate(grid)});
    <?php endforeach; endif; unset($_from); ?>
    // button definitions
    var buttonDefs = [];
    buttonDefs.push({icon:'images/new.png', cls:'x-btn-icon', tooltip:{text:'<?php echo smarty_function_translate(array('text' => "Create new %1%",'r1' => $this->_tpl_vars['nodeUtil']->getDisplayNameFromType($this->_tpl_vars['rootType'])), $this);?>
'}, handler:function(){doSetParent('<?php echo $this->_tpl_vars['oid']; ?>
'); doNew('<?php echo $this->_tpl_vars['rootType']; ?>
'); submitAction('new');}});
    // grid initialization
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
"><?php echo $this->_tpl_vars['nodeUtil']->getDisplayValue($this->_tpl_vars['node'],true); ?>
&nbsp;</h2>
	<span class="spacer"></span>
	<span class="dottedSeparator"></span>
	<span class="left" title="<?php echo $this->_tpl_vars['node']->getValueDescription('Name'); ?>
"><?php echo $this->_tpl_vars['node']->getValueDisplayName('Name'); ?>
</span>
	<span class="right"><?php echo $this->_tpl_vars['nodeUtil']->getInputControl($this->_tpl_vars['node'],'Name'); ?>
</span>

	<span class="dottedSeparator"></span>
	<span class="left" title="<?php echo $this->_tpl_vars['node']->getValueDescription('Description'); ?>
"><?php echo $this->_tpl_vars['node']->getValueDisplayName('Description'); ?>
</span>
	<span class="right"><?php echo $this->_tpl_vars['nodeUtil']->getInputControl($this->_tpl_vars['node'],'Description'); ?>
</span>

	<span class="dottedSeparator"></span>
	<span class="left" title="<?php echo $this->_tpl_vars['node']->getValueDescription('created'); ?>
"><?php echo $this->_tpl_vars['node']->getValueDisplayName('created'); ?>
</span>
	<span class="right"><?php echo $this->_tpl_vars['nodeUtil']->getInputControl($this->_tpl_vars['node'],'created'); ?>
</span>

	<span class="dottedSeparator"></span>
	<span class="left" title="<?php echo $this->_tpl_vars['node']->getValueDescription('creator'); ?>
"><?php echo $this->_tpl_vars['node']->getValueDisplayName('creator'); ?>
</span>
	<span class="right"><?php echo $this->_tpl_vars['nodeUtil']->getInputControl($this->_tpl_vars['node'],'creator'); ?>
</span>

	<span class="dottedSeparator"></span>
	<span class="left" title="<?php echo $this->_tpl_vars['node']->getValueDescription('last_editor'); ?>
"><?php echo $this->_tpl_vars['node']->getValueDisplayName('last_editor'); ?>
</span>
	<span class="right"><?php echo $this->_tpl_vars['nodeUtil']->getInputControl($this->_tpl_vars['node'],'last_editor'); ?>
</span>

	<span class="dottedSeparator"></span>
	<span class="left" title="<?php echo $this->_tpl_vars['node']->getValueDescription('modified'); ?>
"><?php echo $this->_tpl_vars['node']->getValueDisplayName('modified'); ?>
</span>
	<span class="right"><?php echo $this->_tpl_vars['nodeUtil']->getInputControl($this->_tpl_vars['node'],'modified'); ?>
</span>

	<span class="spacer"></span>

  <?php echo smarty_function_translate(array('text' => "Create new %1%",'r1' => $this->_tpl_vars['nodeUtil']->getDisplayNameFromType($this->_tpl_vars['node']->getType()),'varname' => 'createText'), $this);?>

  <span class="all"><a href="javascript:doSetParent(''); doNew('<?php echo $this->_tpl_vars['node']->getType(); ?>
'); setContext('<?php echo $this->_tpl_vars['node']->getType(); ?>
'); submitAction('new');"><img src="images/new.png" 
    alt="<?php echo $this->_tpl_vars['createText']; ?>
" title="<?php echo $this->_tpl_vars['createText']; ?>
" border="0"> <?php echo $this->_tpl_vars['createText']; ?>
</a></span>

</div>

</div>
<div id="rightcol">



<h3>Children</h3>
<!-- Worker -->
<div class="contentblock">
  <div id="WorkerChildGrid" style="border:1px solid #99bbe8;overflow: hidden; width: 445px;"></div>
</div>


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
