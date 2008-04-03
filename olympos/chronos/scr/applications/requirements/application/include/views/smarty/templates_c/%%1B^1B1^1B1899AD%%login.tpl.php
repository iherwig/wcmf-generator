<?php /* Smarty version 2.6.19, created on 2008-04-03 21:53:57
         compiled from C:%5CProgramme%5Cxampp%5Chtdocs%5C26%5Cwcmf%5Capplication%5Cviews%5Clogin.tpl */ ?>
<?php require_once(SMARTY_CORE_DIR . 'core.load_plugins.php');
smarty_core_load_plugins(array('plugins' => array(array('function', 'translate', 'C:\\Programme\\xampp\\htdocs\\26\\wcmf\\application\\views\\login.tpl', 16, false),)), $this); ?>
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
<?php $_smarty_tpl_vars = $this->_tpl_vars;
$this->_smarty_include(array('smarty_include_tpl_file' => "lib:application/views/include/navigation.tpl", 'smarty_include_vars' => array()));
$this->_tpl_vars = $_smarty_tpl_vars;
unset($_smarty_tpl_vars);
 ?>
<?php $_smarty_tpl_vars = $this->_tpl_vars;
$this->_smarty_include(array('smarty_include_tpl_file' => "lib:application/views/include/error.tpl", 'smarty_include_vars' => array('displayMessageDialog' => 'false')));
$this->_tpl_vars = $_smarty_tpl_vars;
unset($_smarty_tpl_vars);
 ?>

<script language="Javascript" src="script/login.js"></script>

<div class="contentblock">
	<span class="spacer"></span>
	<span class="left"><?php echo smarty_function_translate(array('text' => 'Login'), $this);?>
</span>
  <span class="right"><?php echo $this->_tpl_vars['formUtil']->getInputControl('login','text',"",true); ?>
</span>
  <span class="left"><?php echo smarty_function_translate(array('text' => 'Password'), $this);?>
</span>
  <span class="right"><?php echo $this->_tpl_vars['formUtil']->getInputControl('password','password',"",true); ?>
</span>
	<span class="spacer"></span>
  <span class="left"><?php echo smarty_function_translate(array('text' => 'Remember me'), $this);?>
</span>
	<span class="right"><?php echo $this->_tpl_vars['formUtil']->getInputControl('remember_me',"checkbox[class='check']#fix:1[ ]","",true); ?>
</span>
	<span class="spacer"></span>
  <span class="left">&nbsp;</span>
  <span class="right"><a href="javascript:submitAction('dologin');"><?php echo smarty_function_translate(array('text' => 'Log in'), $this);?>
</a></span>
</div>

<?php if ($this->_tpl_vars['loginmessage'] != ''): ?>
<div class="hint"><?php echo $this->_tpl_vars['loginmessage']; ?>
</div>
<?php endif; ?>

<?php $_smarty_tpl_vars = $this->_tpl_vars;
$this->_smarty_include(array('smarty_include_tpl_file' => "lib:application/views/include/footer.tpl", 'smarty_include_vars' => array()));
$this->_tpl_vars = $_smarty_tpl_vars;
unset($_smarty_tpl_vars);
 ?>