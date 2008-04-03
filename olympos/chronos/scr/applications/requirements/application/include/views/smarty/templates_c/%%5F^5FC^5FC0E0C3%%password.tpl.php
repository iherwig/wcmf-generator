<?php /* Smarty version 2.6.19, created on 2008-04-03 21:53:57
         compiled from C:%5CProgramme%5Cxampp%5Chtdocs%5C26/wcmf/application/views/forms/password.tpl */ ?>
<?php require_once(SMARTY_CORE_DIR . 'core.load_plugins.php');
smarty_core_load_plugins(array('plugins' => array(array('modifier', 'default', 'C:\\Programme\\xampp\\htdocs\\26/wcmf/application/views/forms/password.tpl', 1, false),)), $this); ?>
<?php $this->assign('attributes', ((is_array($_tmp=@$this->_tpl_vars['attributes'])) ? $this->_run_mod_handler('default', true, $_tmp, 'class="default"') : smarty_modifier_default($_tmp, 'class="default"'))); ?>
<?php if ($this->_tpl_vars['enabled']): ?>
<input type="password" name="<?php echo $this->_tpl_vars['name']; ?>
" value="<?php echo $this->_tpl_vars['value']; ?>
" <?php echo $this->_tpl_vars['attributes']; ?>
 <?php if ($this->_tpl_vars['error'] != ''): ?>style="border:1px dotted #EC0000"<?php endif; ?>/>
<?php else: ?>
<span class="disabled" <?php echo $this->_tpl_vars['attributes']; ?>
><?php echo $this->_tpl_vars['value']; ?>
</span>
<?php endif; ?>