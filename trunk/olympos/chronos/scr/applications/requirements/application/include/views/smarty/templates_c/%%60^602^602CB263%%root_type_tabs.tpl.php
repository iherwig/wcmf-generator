<?php /* Smarty version 2.6.19, created on 2008-03-22 13:15:35
         compiled from lib:application/views/include/root_type_tabs.tpl */ ?>
<?php require_once(SMARTY_CORE_DIR . 'core.load_plugins.php');
smarty_core_load_plugins(array('plugins' => array(array('function', 'configvalue', 'lib:application/views/include/root_type_tabs.tpl', 3, false),)), $this); ?>
<ul>
<?php echo smarty_function_configvalue(array('key' => 'rootTypes','section' => 'cms','varname' => 'rootTypes'), $this);?>

<?php $_from = $this->_tpl_vars['rootTypes']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }if (count($_from)):
    foreach ($_from as $this->_tpl_vars['type']):
?>
  <?php if ($this->_tpl_vars['type'] != $this->_tpl_vars['rootType']): ?>
    <li><a href="javascript:setVariable('rootType', '<?php echo $this->_tpl_vars['type']; ?>
'); setContext('<?php echo $this->_tpl_vars['type']; ?>
'); doDisplay(''); submitAction('display');"><?php echo $this->_tpl_vars['nodeUtil']->getDisplayNameFromType($this->_tpl_vars['type']); ?>
</a></li>
  <?php else: ?>
    <li class="current"><a href="javascript:setVariable('rootType', '<?php echo $this->_tpl_vars['type']; ?>
'); setContext('<?php echo $this->_tpl_vars['type']; ?>
'); doDisplay(''); submitAction('display');"><?php echo $this->_tpl_vars['nodeUtil']->getDisplayNameFromType($this->_tpl_vars['type']); ?>
</a></li>
  <?php endif; ?>
<?php endforeach; endif; unset($_from); ?>
</ul>