<?php /* Smarty version 2.6.19, created on 2008-08-07 17:14:38
         compiled from lib:application/views/include/title.tpl */ ?>
<?php require_once(SMARTY_CORE_DIR . 'core.load_plugins.php');
smarty_core_load_plugins(array('plugins' => array(array('function', 'translate', 'lib:application/views/include/title.tpl', 6, false),)), $this); ?>

<?php if ($this->_tpl_vars['hideTitle'] == 'false' || ! $this->_tpl_vars['hideTitle']): ?>
<div id="head">
  <span><a href="http://olympos.sourceforge.net" target="_blank"><img src="images/Aphrodite.jpg" width="180" height="54" alt="wcmf logo" border="0" /></a></span>
  <span id="title"><?php echo smarty_function_translate(array('text' => $this->_tpl_vars['applicationTitle']), $this);?>
</span>
  <span id="logininfo"><?php if ($this->_tpl_vars['authUser'] != null && $this->_tpl_vars['_controller'] != 'TreeViewController'): ?><?php echo smarty_function_translate(array('text' => "Logged in as %1% since %2%",'r0' => $this->_tpl_vars['authUser']->getLogin(),'r1' => $this->_tpl_vars['authUser']->getLoginTime()), $this);?>
<?php endif; ?></span>
</div>
<?php endif; ?>