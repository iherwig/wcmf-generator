QoDesk.BogusMenu = Ext.extend(Ext.app.Module, {

	moduleType : 'menu', // required appType for a menu module
	moduleId : 'demo-menu', // must match id in module.xml
	
	menu : new Ext.menu.Menu(),

	// id's of modules to add to this menu,  can't hard code them in directly.
	// desktop needs to initialize them first
	items : [
		'demo-submenu',
		'demo-bogus'
	],

	init : function(){
		this.launcher = {
			text: 'Bogus Menu',
			iconCls: 'bogus',
			handler: function(){
				return false;
			},
			menu: this.menu
		}
	}
});