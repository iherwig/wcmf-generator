<?php /* Smarty version 2.6.19, created on 2008-03-22 13:15:30
         compiled from lib:application/views/include/navigation.tpl */ ?>
<?php require_once(SMARTY_CORE_DIR . 'core.load_plugins.php');
smarty_core_load_plugins(array('plugins' => array(array('function', 'translate', 'lib:application/views/include/navigation.tpl', 6, false),array('function', 'sessionid', 'lib:application/views/include/navigation.tpl', 25, false),)), $this); ?>
<div id="navmeta">
<ul>
<?php if ($this->_tpl_vars['_controller'] != 'LoginController'): ?>
	<?php if ($this->_tpl_vars['_controller'] != 'TreeViewController'): ?>
	  <?php if ($this->_tpl_vars['authUser']->hasRole('administrators')): ?>
		<li><a href="javascript:setContext('admin'); submitAction('administration');" target="_top" id="navadministration"><?php echo smarty_function_translate(array('text' => 'Administration'), $this);?>
</a></li>
    <?php endif; ?>
		<li><a href="javascript:submitAction('edituser');" id="navuserdata"><?php echo smarty_function_translate(array('text' => 'User data'), $this);?>
</a></li>
		<li><a href="javascript:submitAction('logout');" target="_top" id="navlogout"><?php echo smarty_function_translate(array('text' => 'Logout'), $this);?>
</a></li>
	<?php endif; ?>
<?php endif; ?>
</ul>
</div>

<div id="navcontent">
  <ul>
<?php if ($this->_tpl_vars['_controller'] != 'LoginController'): ?>
	<?php if ($this->_tpl_vars['_controller'] == 'UserController'): ?>
  	<li><a href="javascript:submitAction('ok');" id="navback"><?php echo smarty_function_translate(array('text' => 'Back'), $this);?>
</a></li>
  	<li><a href="javascript:doSave(); submitAction('save');" id="navsave"><?php echo smarty_function_translate(array('text' => 'Save'), $this);?>
</a></li>
	<?php else: ?>
  	<li><a href="javascript:doDisplay('<?php echo $this->_tpl_vars['oid']; ?>
'); submitAction('');" id="navreload"><?php echo smarty_function_translate(array('text' => 'Reload'), $this);?>
</a></li>
		<?php if ($this->_tpl_vars['_controller'] != 'TreeViewController'): ?>
  	<li><a href="javascript:doSave(); submitAction('save');" id="navsave"><?php echo smarty_function_translate(array('text' => 'Save'), $this);?>
</a></li>
  	<li><a href="javascript:newWindowEx('DisplayController', '', 'treeview', 'treeviewWindow', 'width=700,height=700,resizable=no,scrollbars=no,locationbar=no', '&sid=<?php echo smarty_function_sessionid(array(), $this);?>
')" id="navcontenttree"><?php echo smarty_function_translate(array('text' => 'Content Tree'), $this);?>
</a></li>
    <li><a href="javascript:newWindowEx('', '', 'browseresources', 'browseWindow', 'resizable=yes,scrollbars=yes,status=yes,locationbar=no', '&type=image&subtype=resource')"><?php echo smarty_function_translate(array('text' => 'Browse Server'), $this);?>
</a></li>
  		<?php if ($this->_tpl_vars['authUser']->hasRole('administrators')): ?>
  	<li><a href="javascript:newWindowEx('', '', 'export', 'exportWindow', 'width=360,height=120,scrollbars=no,resizable=yes,locationbar=no', '&sid=<?php echo smarty_function_sessionid(array(), $this);?>
')" id="navexport"><?php echo smarty_function_translate(array('text' => 'Export'), $this);?>
</a></li>
	  	<?php endif; ?>
    <li><a href="javascript:submitAction('search');"><?php echo smarty_function_translate(array('text' => 'Search'), $this);?>
</a> <?php echo $this->_tpl_vars['formUtil']->getInputControl('searchterm',"text[class='small']",$this->_tpl_vars['searchterm'],true); ?>
</li>
    <li><a href="javascript:newWindowEx('<?php echo $this->_tpl_vars['_controller']; ?>
', '', 'definesearch', 'definesearchWindow', 'width=600,height=600,scrollbars=yes,locationbar=no,resizable=yes', '&sid=<?php echo smarty_function_sessionid(array(), $this);?>
');"><?php echo smarty_function_translate(array('text' => 'Advanced Search'), $this);?>
</a></li>
	  <?php endif; ?>
	<?php endif; ?>
<?php endif; ?>
  </ul>
</div>

<span class="separator"></span>