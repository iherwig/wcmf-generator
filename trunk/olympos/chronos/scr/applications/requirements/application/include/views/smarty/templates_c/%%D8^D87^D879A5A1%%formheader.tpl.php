<?php /* Smarty version 2.6.19, created on 2008-08-07 17:14:38
         compiled from lib:application/views/include/formheader.tpl */ ?>
<?php require_once(SMARTY_CORE_DIR . 'core.load_plugins.php');
smarty_core_load_plugins(array('plugins' => array(array('function', 'sessionid', 'lib:application/views/include/formheader.tpl', 5, false),)), $this); ?>
<form name="<?php echo $this->_tpl_vars['formName']; ?>
" action="main.php" enctype="multipart/form-data" method="post" target="<?php echo $this->_tpl_vars['target']; ?>
" onsubmit="<?php echo $this->_tpl_vars['onsubmit']; ?>
">
<input type="hidden" name="controller" value="<?php echo $this->_tpl_vars['_controller']; ?>
" />
<input type="hidden" name="context" value="<?php echo $this->_tpl_vars['_context']; ?>
" />
<input type="hidden" name="usr_action" value="<?php echo $this->_tpl_vars['_action']; ?>
" />
<input type="hidden" name="sid" value="<?php echo smarty_function_sessionid(array(), $this);?>
" />
<input type="hidden" name="oid" value="<?php echo $this->_tpl_vars['oid']; ?>
" />
<input type="hidden" name="poid" value="<?php echo $this->_tpl_vars['poid']; ?>
" />
<input type="hidden" name="newtypes" value="" />
<input type="hidden" name="deleteoids" value="" />
<input type="hidden" name="clipboardoids" value="" />

<input type="hidden" name="old_controller" value="<?php echo $this->_tpl_vars['_controller']; ?>
" />
<input type="hidden" name="old_context" value="<?php echo $this->_tpl_vars['_context']; ?>
" />
<input type="hidden" name="old_usr_action" value="<?php echo $this->_tpl_vars['_action']; ?>
" />
<input type="hidden" name="old_oid" value="<?php echo $this->_tpl_vars['oid']; ?>
" />

<input type="hidden" name="sortoid" value="" />
<input type="hidden" name="prevoid" value="" />
<input type="hidden" name="nextoid" value="" />

<input type="hidden" name="targetoid" value="" />
<input type="hidden" name="associateoid" value="" />
<input type="hidden" name="rootType" value="<?php echo $this->_tpl_vars['rootType']; ?>
" />