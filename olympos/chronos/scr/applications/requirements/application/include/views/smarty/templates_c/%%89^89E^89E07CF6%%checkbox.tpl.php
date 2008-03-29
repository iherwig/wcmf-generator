<?php /* Smarty version 2.6.19, created on 2008-03-22 13:15:31
         compiled from C:%5CProgramme%5Cxampp%5Chtdocs%5C26/wcmf/application/views/forms/checkbox.tpl */ ?>
<?php require_once(SMARTY_CORE_DIR . 'core.load_plugins.php');
smarty_core_load_plugins(array('plugins' => array(array('modifier', 'default', 'C:\\Programme\\xampp\\htdocs\\26/wcmf/application/views/forms/checkbox.tpl', 1, false),)), $this); ?>
<?php $this->assign('attributes', ((is_array($_tmp=@$this->_tpl_vars['attributes'])) ? $this->_run_mod_handler('default', true, $_tmp, 'class="check"') : smarty_modifier_default($_tmp, 'class="check"'))); ?>
<?php if ($this->_tpl_vars['enabled']): ?>
<?php $_from = $this->_tpl_vars['listMap']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }if (count($_from)):
    foreach ($_from as $this->_tpl_vars['listkey'] => $this->_tpl_vars['listvalue']):
?>
<?php if (( ( ! is_array ( $this->_tpl_vars['value'] ) && $this->_tpl_vars['listkey'] == $this->_tpl_vars['value'] ) || ( is_array ( $this->_tpl_vars['value'] ) && in_array ( $this->_tpl_vars['listkey'] , $this->_tpl_vars['value'] ) ) )): ?>
  <input type="checkbox" name="<?php echo $this->_tpl_vars['name']; ?>
[]" value="<?php echo $this->_tpl_vars['listkey']; ?>
" checked <?php echo $this->_tpl_vars['attributes']; ?>
 /> <?php echo $this->_tpl_vars['listvalue']; ?>

<?php else: ?>
  <input type="checkbox" name="<?php echo $this->_tpl_vars['name']; ?>
[]" value="<?php echo $this->_tpl_vars['listkey']; ?>
" <?php echo $this->_tpl_vars['attributes']; ?>
 /> <?php echo $this->_tpl_vars['listvalue']; ?>

<?php endif; ?>
<?php endforeach; endif; unset($_from); ?>
<?php else: ?>
<span class="disabled" <?php echo $this->_tpl_vars['attributes']; ?>
><?php echo $this->_tpl_vars['value']; ?>
</span>
<?php endif; ?>