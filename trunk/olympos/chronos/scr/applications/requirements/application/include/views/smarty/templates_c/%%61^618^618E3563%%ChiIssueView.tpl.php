<?php /* Smarty version 2.6.19, created on 2008-04-03 21:02:57
         compiled from C:%5CProgramme%5Cxampp%5Chtdocs%5C26%5Capplication%5Cinclude%5Cviews%5CChiIssueView.tpl */ ?>
<?php require_once(SMARTY_CORE_DIR . 'core.load_plugins.php');
smarty_core_load_plugins(array('plugins' => array(array('function', 'count_items', 'C:\\Programme\\xampp\\htdocs\\26\\application\\include\\views\\ChiIssueView.tpl', 31, false),array('function', 'math', 'C:\\Programme\\xampp\\htdocs\\26\\application\\include\\views\\ChiIssueView.tpl', 32, false),array('function', 'translate', 'C:\\Programme\\xampp\\htdocs\\26\\application\\include\\views\\ChiIssueView.tpl', 41, false),array('modifier', 'replace', 'C:\\Programme\\xampp\\htdocs\\26\\application\\include\\views\\ChiIssueView.tpl', 45, false),array('modifier', 'default', 'C:\\Programme\\xampp\\htdocs\\26\\application\\include\\views\\ChiIssueView.tpl', 102, false),)), $this); ?>



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

    // ChiRequirement
    <?php $this->assign('template', $this->_tpl_vars['possibleparents']['ChiRequirement']); ?>
    <?php $this->assign('parent', $this->_tpl_vars['template']->getProperty('assignedParent')); ?>
    <?php if ($this->_tpl_vars['parent']): ?>
      <?php $this->assign('parentid', $this->_tpl_vars['parent']->getDBID()); ?>
    <?php else: ?>
      <?php $this->assign('parentid', ''); ?>
    <?php endif; ?>
    <?php if ($this->_tpl_vars['template']->hasValue('sortkey')): ?><?php $this->assign('ddRows', 'true'); ?><?php else: ?><?php $this->assign('ddRows', 'false'); ?><?php endif; ?>
    
    grids['ChiRequirementParent'] = new wcmf.grid.Grid();
    // column definitions
    var curColumnDefs = [];
    <?php echo smarty_function_count_items(array('varname' => 'numColumns','array' => $this->_tpl_vars['template']->getDisplayValues(true)), $this);?>

    <?php echo smarty_function_math(array('equation' => "361/x",'x' => $this->_tpl_vars['numColumns'],'assign' => 'columnWidth','format' => "%d"), $this);?>

    <?php $_from = $this->_tpl_vars['template']->getDisplayValues(true); if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }if (count($_from)):
    foreach ($_from as $this->_tpl_vars['name'] => $this->_tpl_vars['value']):
?>
    curColumnDefs.push({id:"<?php echo $this->_tpl_vars['name']; ?>
", dataIndex:"<?php echo $this->_tpl_vars['name']; ?>
", header:"<?php echo $this->_tpl_vars['name']; ?>
", width:<?php echo $this->_tpl_vars['columnWidth']; ?>
, sortable:true, renderer:grids['ChiRequirementParent'].renderColumnDefault.createDelegate(grids['ChiRequirementParent'])});
    <?php endforeach; endif; unset($_from); ?>
    columDefs['ChiRequirementParent'] = curColumnDefs;
    // button definitions
    var curButtonDefs = [];
    <?php if ($this->_tpl_vars['template']->getProperty('canAssociate') == true): ?>
      var dlgChiRequirementParent = new AssociateDialog();
      curButtonDefs.push({icon:'images/link.png', cls:'x-btn-icon', tooltip:{text:'<?php echo smarty_function_translate(array('text' => 'Associate selected'), $this);?>
'}, handler:function(){dlgChiRequirementParent.show('ChiRequirement', grids['ChiRequirementParent'], '<?php echo $this->_tpl_vars['node']->getOID(); ?>
', true);}});
    <?php endif; ?>
    buttonDefs['ChiRequirementParent'] = curButtonDefs;
    // grid initialization
    grids['ChiRequirementParent'].init('<?php echo $this->_tpl_vars['template']->getObjectDisplayName(); ?>
', 'ChiRequirement', "<?php echo ((is_array($_tmp=$this->_tpl_vars['nodeUtil']->getParentQuery('ChiRequirement',$this->_tpl_vars['node']))) ? $this->_run_mod_handler('replace', true, $_tmp, "'", "\'") : smarty_modifier_replace($_tmp, "'", "\'")); ?>
", columDefs['ChiRequirementParent'], {paging:false, autoheight:true, singleSelect:true, ddRows:<?php echo $this->_tpl_vars['ddRows']; ?>
}, [new wcmf.grid.EditAction()<?php if ($this->_tpl_vars['template']->getProperty('composition') == false): ?>, new wcmf.grid.DeleteAction()<?php endif; ?>], buttonDefs['ChiRequirementParent']);
    grids['ChiRequirementParent'].getGridImpl().applyToMarkup('ChiRequirementParentGrid');
    grids['ChiRequirementParent'].load();


    // children

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
<img align="right" src="images/ChiRequirementIssue.PNG" width="50" height="50" alt="ChiIssues" border="0" />
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
	<span class="left" title="<?php echo $this->_tpl_vars['node']->getValueDescription('Author'); ?>
"><?php echo $this->_tpl_vars['node']->getValueDisplayName('Author'); ?>
</span>
	<span class="right"><?php echo $this->_tpl_vars['nodeUtil']->getInputControl($this->_tpl_vars['node'],'Author'); ?>
</span>

	<span class="dottedSeparator"></span>
	<span class="left" title="<?php echo $this->_tpl_vars['node']->getValueDescription('Responsible'); ?>
"><?php echo $this->_tpl_vars['node']->getValueDisplayName('Responsible'); ?>
</span>
	<span class="right"><?php echo $this->_tpl_vars['nodeUtil']->getInputControl($this->_tpl_vars['node'],'Responsible'); ?>
</span>

	<span class="dottedSeparator"></span>
	<span class="left" title="<?php echo $this->_tpl_vars['node']->getValueDescription('Alias'); ?>
"><?php echo $this->_tpl_vars['node']->getValueDisplayName('Alias'); ?>
</span>
	<span class="right"><?php echo $this->_tpl_vars['nodeUtil']->getInputControl($this->_tpl_vars['node'],'Alias'); ?>
</span>

	<span class="dottedSeparator"></span>
	<span class="left" title="<?php echo $this->_tpl_vars['node']->getValueDescription('Version'); ?>
"><?php echo $this->_tpl_vars['node']->getValueDisplayName('Version'); ?>
</span>
	<span class="right"><?php echo $this->_tpl_vars['nodeUtil']->getInputControl($this->_tpl_vars['node'],'Version'); ?>
</span>

	

	<span class="dottedSeparator"></span>
	<span class="left" title="<?php echo $this->_tpl_vars['node']->getValueDescription('Notes'); ?>
"><?php echo $this->_tpl_vars['node']->getValueDisplayName('Notes'); ?>
</span>
	<span class="right"><?php echo $this->_tpl_vars['nodeUtil']->getInputControl($this->_tpl_vars['node'],'Notes'); ?>
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

  <?php $this->assign('template', $this->_tpl_vars['possibleparents']['ChiRequirement']); ?>
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

</div>

</div>
<div id="rightcol">


<!-- ChiRequirement -->
<div class="contentblock">
  <div id="ChiRequirementParentGrid" style="border:1px solid #99bbe8;overflow: hidden; width: 445px;"></div>
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
