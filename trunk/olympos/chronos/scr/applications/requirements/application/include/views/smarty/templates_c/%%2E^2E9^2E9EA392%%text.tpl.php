<?php /* Smarty version 2.6.19, created on 2008-03-22 13:15:35
         compiled from C:%5CProgramme%5Cxampp%5Chtdocs%5C26/wcmf/application/views/display/text.tpl */ ?>
<?php require_once(SMARTY_CORE_DIR . 'core.load_plugins.php');
smarty_core_load_plugins(array('plugins' => array(array('modifier', 'default', 'C:\\Programme\\xampp\\htdocs\\26/wcmf/application/views/display/text.tpl', 1, false),array('modifier', 'truncate', 'C:\\Programme\\xampp\\htdocs\\26/wcmf/application/views/display/text.tpl', 2, false),)), $this); ?>
<?php $this->assign('attributes', ((is_array($_tmp=@$this->_tpl_vars['attributes'])) ? $this->_run_mod_handler('default', true, $_tmp, 'class="txtdefault"') : smarty_modifier_default($_tmp, 'class="txtdefault"'))); ?>
<span <?php echo $this->_tpl_vars['attributes']; ?>
><?php echo ((is_array($_tmp=((is_array($_tmp=$this->_tpl_vars['value'])) ? $this->_run_mod_handler('truncate', true, $_tmp, 50, "...", true) : smarty_modifier_truncate($_tmp, 50, "...", true)))) ? $this->_run_mod_handler('default', true, $_tmp, "...") : smarty_modifier_default($_tmp, "...")); ?>
</span>