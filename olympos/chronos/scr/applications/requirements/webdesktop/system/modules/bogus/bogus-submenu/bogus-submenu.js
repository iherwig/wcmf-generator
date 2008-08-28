QoDesk.BogusSubMenu = Ext.extend(Ext.app.Module, {

	moduleType : 'menu', // required appType for a menu module
	moduleId : 'demo-submenu', // must match id in module.xml
	
	menu : new Ext.menu.Menu(),

	// Id's of modules to add to this menu,  can't hard code them in directly.
	// Desktop needs to initialize them first.
	items : [
		'demo-bogus'
	],

	init : function(){
		this.launcher = {
			text: 'Bogus Sub-menu',
			iconCls: 'bogus',
			handler: function(){
				return false;
			},
			menu: this.menu
		}
	}
});