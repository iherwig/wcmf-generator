<?php /* Smarty version 2.6.19, created on 2008-03-22 13:15:31
         compiled from lib:application/views/include/error.tpl */ ?>
<?php require_once(SMARTY_CORE_DIR . 'core.load_plugins.php');
smarty_core_load_plugins(array('plugins' => array(array('modifier', 'escape', 'lib:application/views/include/error.tpl', 7, false),array('modifier', 'strip_tags', 'lib:application/views/include/error.tpl', 7, false),array('modifier', 'strip', 'lib:application/views/include/error.tpl', 7, false),array('function', 'translate', 'lib:application/views/include/error.tpl', 11, false),)), $this); ?>

<?php if ($this->_tpl_vars['errorMsg'] != ''): ?>
<?php if ($this->_tpl_vars['displayMessageDialog'] == 'true'): ?>
<script language="Javascript">
<!-- 
  alert('ERROR: <?php echo ((is_array($_tmp=((is_array($_tmp=((is_array($_tmp=$this->_tpl_vars['errorMsg'])) ? $this->_run_mod_handler('escape', true, $_tmp, 'quotes') : smarty_modifier_escape($_tmp, 'quotes')))) ? $this->_run_mod_handler('strip_tags', true, $_tmp) : smarty_modifier_strip_tags($_tmp)))) ? $this->_run_mod_handler('strip', true, $_tmp, ' ') : smarty_modifier_strip($_tmp, ' ')); ?>
'); 
//-->
</script>
<?php endif; ?>
<div class="error"><?php echo smarty_function_translate(array('text' => 'Error'), $this);?>
: <?php echo $this->_tpl_vars['errorMsg']; ?>
</div>
<?php endif; ?>