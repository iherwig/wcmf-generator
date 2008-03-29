<?php /* Smarty version 2.6.19, created on 2008-03-22 13:15:49
         compiled from C:%5CProgramme%5Cxampp%5Chtdocs%5C26/wcmf/application/views/forms/fckeditor.tpl */ ?>
<?php require_once(SMARTY_CORE_DIR . 'core.load_plugins.php');
smarty_core_load_plugins(array('plugins' => array(array('function', 'sessionid', 'C:\\Programme\\xampp\\htdocs\\26/wcmf/application/views/forms/fckeditor.tpl', 13, false),array('modifier', 'escape', 'C:\\Programme\\xampp\\htdocs\\26/wcmf/application/views/forms/fckeditor.tpl', 22, false),array('modifier', 'strip_tags', 'C:\\Programme\\xampp\\htdocs\\26/wcmf/application/views/forms/fckeditor.tpl', 26, false),)), $this); ?>
<?php if ($this->_tpl_vars['enabled']): ?>
<?php if (! $this->_tpl_vars['FCKeditorCodeAdded']): ?>
<script type="text/javascript" src="<?php echo $this->_tpl_vars['libDir']; ?>
fckeditor.js"></script>
<?php endif; ?>
<script type="text/javascript">
  var oFCKeditor = new FCKeditor('<?php echo $this->_tpl_vars['name']; ?>
', '350', '200');
  oFCKeditor.BasePath = '<?php echo $this->_tpl_vars['libDir']; ?>
';
  
  // set custom configuration
  oFCKeditor.Config['BaseHref'] = '<?php echo $this->_tpl_vars['appDir']; ?>
';
  oFCKeditor.Config['CustomConfigurationsPath'] = '<?php echo $this->_tpl_vars['appDir']; ?>
script/fckconfig.js';
  oFCKeditor.Config['StylesXmlPath'] = '<?php echo $this->_tpl_vars['appDir']; ?>
script/fckstyles.xml';
  oFCKeditor.Config['LinkBrowserURL'] = '<?php echo $this->_tpl_vars['appDir']; ?>
main.php?usr_action=browseresources&type=link&subtype=content&sid=<?php echo smarty_function_sessionid(array(), $this);?>
';
  oFCKeditor.Config['ImageBrowserURL'] = '<?php echo $this->_tpl_vars['appDir']; ?>
main.php?usr_action=browseresources&type=image&subtype=resource&sid=<?php echo smarty_function_sessionid(array(), $this);?>
';
  oFCKeditor.Config['FlashBrowserURL'] = '<?php echo $this->_tpl_vars['appDir']; ?>
main.php?usr_action=browseresources&type=image&subtype=resource&sid=<?php echo smarty_function_sessionid(array(), $this);?>
';
  
  // add additional attributes
<?php $_from = $this->_tpl_vars['attributeList']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }if (count($_from)):
    foreach ($_from as $this->_tpl_vars['listkey'] => $this->_tpl_vars['listvalue']):
?>
  oFCKeditor.<?php echo $this->_tpl_vars['listkey']; ?>
 = <?php echo $this->_tpl_vars['listvalue']; ?>
;
<?php endforeach; endif; unset($_from); ?>

  oFCKeditor.Value = '<?php echo ((is_array($_tmp=$this->_tpl_vars['value'])) ? $this->_run_mod_handler('escape', true, $_tmp, 'quotes') : smarty_modifier_escape($_tmp, 'quotes')); ?>
';
  oFCKeditor.Create();
</script>
<?php else: ?>
<span class="disabled" <?php echo $this->_tpl_vars['attributes']; ?>
><?php echo ((is_array($_tmp=$this->_tpl_vars['value'])) ? $this->_run_mod_handler('strip_tags', true, $_tmp) : smarty_modifier_strip_tags($_tmp)); ?>
</span>
<?php endif; ?>