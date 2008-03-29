<?php /* Smarty version 2.6.19, created on 2008-03-29 17:24:30
         compiled from C:%5CProgramme%5Cxampp%5Chtdocs%5C26%5Cwcmf%5Capplication%5Cviews%5Cdisplayfailure.tpl */ ?>
<?php require_once(SMARTY_CORE_DIR . 'core.load_plugins.php');
smarty_core_load_plugins(array('plugins' => array(array('function', 'translate', 'C:\\Programme\\xampp\\htdocs\\26\\wcmf\\application\\views\\displayfailure.tpl', 10, false),)), $this); ?>
<?php $_smarty_tpl_vars = $this->_tpl_vars;
$this->_smarty_include(array('smarty_include_tpl_file' => "lib:application/views/include/docheader.tpl", 'smarty_include_vars' => array()));
$this->_tpl_vars = $_smarty_tpl_vars;
unset($_smarty_tpl_vars);
 ?>
<head>
<?php $_smarty_tpl_vars = $this->_tpl_vars;
$this->_smarty_include(array('smarty_include_tpl_file' => "lib:application/views/include/header.tpl", 'smarty_include_vars' => array()));
$this->_tpl_vars = $_smarty_tpl_vars;
unset($_smarty_tpl_vars);
 ?>
</head>
<body>
<div id="page">
<?php $_smarty_tpl_vars = $this->_tpl_vars;
$this->_smarty_include(array('smarty_include_tpl_file' => "lib:application/views/include/formheader.tpl", 'smarty_include_vars' => array()));
$this->_tpl_vars = $_smarty_tpl_vars;
unset($_smarty_tpl_vars);
 ?>
<?php $_smarty_tpl_vars = $this->_tpl_vars;
$this->_smarty_include(array('smarty_include_tpl_file' => "lib:application/views/include/title.tpl", 'smarty_include_vars' => array()));
$this->_tpl_vars = $_smarty_tpl_vars;
unset($_smarty_tpl_vars);
 ?>

<div class="error"><?php echo smarty_function_translate(array('text' => 'This page is currently not available'), $this);?>
.<br />
	<?php echo smarty_function_translate(array('text' => 'Reason'), $this);?>
: <?php echo $this->_tpl_vars['errorMsg']; ?>
<br />
</div>
<br /><br />
<script language="JavaScript">
  if (window.opener == null)
	  document.write('<?php echo smarty_function_translate(array('text' => "Click %1%here%2% to return to application",'r1' => "<a href=\"javascript:submitAction(\'login\');\" class=\"cms\">",'r2' => "</a>"), $this);?>
');
</script>

<?php $_smarty_tpl_vars = $this->_tpl_vars;
$this->_smarty_include(array('smarty_include_tpl_file' => "lib:application/views/include/footer.tpl", 'smarty_include_vars' => array()));
$this->_tpl_vars = $_smarty_tpl_vars;
unset($_smarty_tpl_vars);
 ?>