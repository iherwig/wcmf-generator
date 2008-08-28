QoDesk.QoAdminMenu = Ext.extend(Ext.app.Module, {

	moduleType : 'menu' // required appType for a menu module
	, moduleId : 'qo-admin-menu' // must match id in module.xml
	, moduleAuthor: 'Paul Simmons'
	, moduleVersion: '1.1.0'
	//===========================================================================================
	// 1.0.0 Initial Creation
	// 1.0.1 For Line compatability for QO-Admin
	// 1.1.0 For Line compatability for QO-Admin
	//===========================================================================================
	
	, menu : new Ext.menu.Menu()

	// id's of modules to add to this menu,  can't hard code them in directly.
	// desktop needs to initialize them first
	, items : [
		'qo-admin-members'
		, 'qo-admin-member-groups'
		, 'qo-admin-groups'
		, 'qo-admin-group-modules'
		, 'qo-admin-modules'
		, 'qo-admin-module-files'
		, 'qo-admin-module-launchers'
	]
	, init : function(){
		this.launcher = {
			text: 'QO Admin',
			iconCls: 'bogus',
			handler: function(){
				return false;
			},
			menu: this.menu
		}
	}
});