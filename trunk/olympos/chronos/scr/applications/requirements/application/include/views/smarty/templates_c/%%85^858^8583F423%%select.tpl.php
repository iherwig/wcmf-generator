<?php /* Smarty version 2.6.19, created on 2008-04-03 20:45:35
         compiled from C:%5CProgramme%5Cxampp%5Chtdocs%5C26/wcmf/application/views/forms/select.tpl */ ?>
<?php require_once(SMARTY_CORE_DIR . 'core.load_plugins.php');
smarty_core_load_plugins(array('plugins' => array(array('modifier', 'default', 'C:\\Programme\\xampp\\htdocs\\26/wcmf/application/views/forms/select.tpl', 1, false),array('modifier', 'replace', 'C:\\Programme\\xampp\\htdocs\\26/wcmf/application/views/forms/select.tpl', 16, false),array('function', 'uniqueid', 'C:\\Programme\\xampp\\htdocs\\26/wcmf/application/views/forms/select.tpl', 22, false),)), $this); ?>
<?php $this->assign('attributes', ((is_array($_tmp=@$this->_tpl_vars['attributes'])) ? $this->_run_mod_handler('default', true, $_tmp, 'class="default" size="1"') : smarty_modifier_default($_tmp, 'class="default" size="1"'))); ?>
<?php if ($this->_tpl_vars['enabled']): ?>
  <?php if (! $this->_tpl_vars['isAsync']): ?>
<select name="<?php echo $this->_tpl_vars['name']; ?>
" <?php echo $this->_tpl_vars['attributes']; ?>
 <?php if ($this->_tpl_vars['error'] != ''): ?>style="border-color:#ff2b40"<?php endif; ?>>
    <?php $this->assign('selected', 0); ?>
    <?php $this->assign('optionsstring', ""); ?>
    <?php $_from = $this->_tpl_vars['listMap']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }if (count($_from)):
    foreach ($_from as $this->_tpl_vars['listkey'] => $this->_tpl_vars['listvalue']):
?>
      <?php if (( ( ! is_array ( $this->_tpl_vars['value'] ) && strval ( $this->_tpl_vars['listkey'] ) == strval ( $this->_tpl_vars['value'] ) ) || ( is_array ( $this->_tpl_vars['value'] ) && in_array ( $this->_tpl_vars['listkey'] , $this->_tpl_vars['value'] ) ) )): ?>
      <?php $this->assign('selected', 1); ?>
        <?php $this->assign('optionsstring', ($this->_tpl_vars['optionsstring'])."<option value=\"".($this->_tpl_vars['listkey'])."\" selected=\"selected\">".($this->_tpl_vars['listvalue'])."</option>"); ?>
      <?php else: ?>
        <?php $this->assign('optionsstring', ($this->_tpl_vars['optionsstring'])."<option value=\"".($this->_tpl_vars['listkey'])."\">".($this->_tpl_vars['listvalue'])."</option>"); ?>
      <?php endif; ?>
    <?php endforeach; endif; unset($_from); ?>
    <?php if ($this->_tpl_vars['selected'] == 0): ?>
      <?php echo ((is_array($_tmp=$this->_tpl_vars['optionsstring'])) ? $this->_run_mod_handler('replace', true, $_tmp, "<option value=\"\">", "<option value=\"\" selected=\"selected\">") : smarty_modifier_replace($_tmp, "<option value=\"\">", "<option value=\"\" selected=\"selected\">")); ?>

    <?php else: ?>
      <?php echo $this->_tpl_vars['optionsstring']; ?>

    <?php endif; ?>
</select>
  <?php else: ?>
    <?php echo smarty_function_uniqueid(array('varname' => 'layerId'), $this);?>

<input type="text" id="<?php echo $this->_tpl_vars['layerId']; ?>
" <?php echo $this->_tpl_vars['attributes']; ?>
/>
<script type="text/javascript">
  new Listbox().init('<?php echo $this->_tpl_vars['layerId']; ?>
', '<?php echo $this->_tpl_vars['name']; ?>
', '<?php echo $this->_tpl_vars['entityType']; ?>
', '<?php echo $this->_tpl_vars['value']; ?>
', '<?php echo $this->_tpl_vars['translatedValue']; ?>
', '<?php echo $this->_tpl_vars['filter']; ?>
', null, null);
</script>
  <?php endif; ?>
<?php else: ?>
<span class="disabled" <?php echo $this->_tpl_vars['attributes']; ?>
><?php echo $this->_tpl_vars['value']; ?>
</span>
<?php endif; ?>