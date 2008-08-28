QoDesk.QoAdminGroupModules = Ext.extend(Ext.app.Module, {

	  moduleType : 'system'
	, moduleId : 'qo-admin-group-modules'
	, phpFile : 'qo-admin-group-modules.php'
	, moduleAuthor: 'Paul Simmons'
	, moduleVersion: '1.1.0'
	//===========================================================================================
	// 1.0.0 Initial Creation
	// 1.0.1 For Line compatability for QO-Admin
	// 1.1.0 For Line compatability for QO-Admin
	//===========================================================================================
	
	, init : function(){
        this.launcher = {
            handler : this.createWindow,
            iconCls: 'icon-grid',
            scope: this,
            text: 'QO Admin - Group Modules',
            tooltip: '<b>QO Admin</b><br />Group Module Administration'
        }
    }
	
	, createWindow : function(){
	
	    var desktop = this.app.getDesktop();
        var win = desktop.getWindow('qo-admin-group-modules-win');

		if (!win) {
			// --
			Ext.QuickTips.init();

			// turn on validation errors beside the field globally
			Ext.form.Field.prototype.msgTarget = 'side';

			//===========================================================================================
			// Setup Menu for the tbar
			
			var qo_admin_members = new Ext.Action ({
				text: 'Members'
				, handler: function () {
					var m = this.app.getModule('qo-admin-members');
					if (m) {
						m.launcher.handler.call(m.launcher.scope);
					} 
				}
				, iconCls: 'icon-grid'
				, scope: this
			});
			
			var qo_admin_member_groups = new Ext.Action ({
				text: 'Member Groups'
				, handler: function () {
					var m = this.app.getModule('qo-admin-member-groups');
					if (m) {
						m.launcher.handler.call(m.launcher.scope);
					} 
				}
				, iconCls: 'icon-grid'
				, scope: this
			});
			
			var qo_admin_groups = new Ext.Action ({
				text: 'Groups'
				, handler: function () {
					var m = this.app.getModule('qo-admin-groups');
					if (m) {
						m.launcher.handler.call(m.launcher.scope);
					} 
				}
				, iconCls: 'icon-grid'
				, scope: this
			});

			var qo_admin_group_modules = new Ext.Action ({
				text: 'Group Modules'
				, handler: function () {
					var m = this.app.getModule('qo-admin-group-modules');
					if (m) {
						m.launcher.handler.call(m.launcher.scope);
					} 
				}
				, iconCls: 'icon-grid'
				, scope: this
			});

			var qo_admin_modules = new Ext.Action ({
				text: 'Modules'
				, handler: function () {
					var m = this.app.getModule('qo-admin-modules');
					if (m) {
						m.launcher.handler.call(m.launcher.scope);
					} 
				}
				, iconCls: 'icon-grid'
				, scope: this
			});
			
			var qo_admin_module_files = new Ext.Action ({
				text: 'Module Files'
				, handler: function () {
					var m = this.app.getModule('qo-admin-module-files');
					if (m) {
						m.launcher.handler.call(m.launcher.scope);
					} 
				}
				, iconCls: 'icon-grid'
				, scope: this
			});

			var qo_admin_module_launchers = new Ext.Action ({
				text: 'Module Launchers'
				, handler: function () {
					var m = this.app.getModule('qo-admin-module-launchers');
					if (m) {
						m.launcher.handler.call(m.launcher.scope);
					} 
				}
				, iconCls: 'icon-grid'
				, scope: this
			});

			var qo_admin_menu = new Ext.Action ({
				text: 'QO Admin'
				, menu: [
					qo_admin_members
					, qo_admin_member_groups
					, qo_admin_groups
					, qo_admin_group_modules
					, qo_admin_modules
					, qo_admin_module_files
					, qo_admin_module_launchers
				]
				, scope: this
			});
			//===========================================================================================

			// Store Definitions
			
			// for Grid data
			var storeGroupModules = new Ext.data.Store ({
				proxy: new Ext.data.HttpProxy ({ 
					url: this.app.connection
					, scope: this
				})
				, baseParams: {
					task: "read"
					, moduleId: this.moduleId
					, fileName: this.phpFile
				}
				, reader: new Ext.data.JsonReader ({
					root: 'qo_groups_has_modules'
					, id: 'id'
					, fields: [
						{name: 'id'}
						, {name: 'qo_groups_id'}
						, {name: 'qo_modules_id'}
						, {name: 'active'}
					]
				})
			});

			var storeModuleNames = new Ext.data.Store ({
				proxy: new Ext.data.HttpProxy ({ 
					url: this.app.connection
					, scope: this
				})
				, baseParams: {
					task: "readModuleNames"
					, moduleId: this.moduleId
					, fileName: this.phpFile
				}
				, reader: new Ext.data.JsonReader ({
					root: 'qo_modules'
					, id: 'KeyField'
					, fields: [
						{name: 'KeyField'}
						, {name: 'DisplayField'}
					]
				})
			});
			storeModuleNames.loadData;
			storeModuleNames.load();

			var storeModuleNames2 = new Ext.data.Store ({
				proxy: new Ext.data.HttpProxy ({ 
					url: this.app.connection
					, scope: this
				})
				, baseParams: {
					task: "readModuleNames"
					, moduleId: this.moduleId
					, fileName: this.phpFile
				}
				, reader: new Ext.data.JsonReader ({
					root: 'qo_modules'
					, id: 'KeyField'
					, fields: [
						{name: 'KeyField'}
						, {name: 'DisplayField'}
					]
				})
			});
			storeModuleNames2.loadData;
			storeModuleNames2.load();

			var storeGroupNames = new Ext.data.Store ({
				proxy: new Ext.data.HttpProxy ({ 
					url: this.app.connection
					, scope: this
				})
				, baseParams: {
					task: "readGroupNames"
					, moduleId: this.moduleId
					, fileName: this.phpFile
				}
				, reader: new Ext.data.JsonReader ({
					root: 'qo_groups'
					, id: 'KeyField'
					, fields: [
						{name: 'KeyField'}
						, {name: 'DisplayField'}
					]
				})
			});
			storeGroupNames.loadData;
			storeGroupNames.load();

			var storeGroupNames2 = new Ext.data.Store ({
				proxy: new Ext.data.HttpProxy ({ 
					url: this.app.connection
					, scope: this
				})
				, baseParams: {
					task: "readGroupNames"
					, moduleId: this.moduleId
					, fileName: this.phpFile
				}
				, reader: new Ext.data.JsonReader ({
					root: 'qo_groups'
					, id: 'KeyField'
					, fields: [
						{name: 'KeyField'}
						, {name: 'DisplayField'}
					]
				})
			});
			storeGroupNames2.loadData;
			storeGroupNames2.load();

			var storeTFGrid = new Ext.data.SimpleStore({
				fields: [ 'value' ]
				, data: [ [ 'true' ], [ 'false' ] ]
			});

			var storeTFForm = new Ext.data.SimpleStore({
				fields: [ 'value' ]
				, data: [ [ 'true' ], [ 'false' ] ]
			});

			// End Store Definitions

			var fm = Ext.form;
			// Define column Model
			var cmGroupModules = new Ext.grid.ColumnModel([
				{
					id:'id'
					, header: 'ID'
					, dataIndex: 'id'
					, align: 'right'
					, hidden: true
				}
				, {	
					header: 'Group Name'
					, dataIndex: 'qo_groups_id'
					, width: 100
					, editor: new fm.ComboBox({
						typeAhead: false
						, triggerAction: 'all'
						, lazyRender: true
						, store: storeGroupNames
						, displayField: 'DisplayField'
						, valueField: 'KeyField'
					})
					, renderer: function(data) {
						record = storeGroupNames.getById(data);
						if(record) {
							return record.data.DisplayField;
						} else {
							return 'missing data';
						}
					}
				}
				, {	
					header: 'Module Name'
					, dataIndex: 'qo_modules_id'
					, width: 200
					, editor: new fm.ComboBox({
						typeAhead: false
						, triggerAction: 'all'
						, lazyRender: true
						, store: storeModuleNames
						, displayField: 'DisplayField'
						, valueField: 'KeyField'
					})
					, renderer: function(data) {
						record = storeModuleNames.getById(data);
						if(record) {
							return record.data.DisplayField;
						} else {
							return 'missing data';
						}
					}
				}
				, {	
					header: 'Active'
					, dataIndex: 'active'
					, width: 50
					, editor: new fm.ComboBox({
						typeAhead: false
						, triggerAction: 'all'
						, lazyRender: true
						, mode: 'local'
						, store: storeTFGrid
						, displayField: 'value'
						, valueField: 'value'
					})
				}
			]);
			
			// by default columns are sortable
			cmGroupModules.defaultSortable = true;
	
			function handleDeleteGroupModules() {
				//returns record objects for selected rows (all info for row)
				var selectedRows = editGridGroupModules.selModel.selections.items;
				
				//returns array of selected rows ids only
				var selectedKeys = editGridGroupModules.selModel.selections.keys; 

				//note we already did an if(selectedKeys) to get here

				//encode array into json
				var encoded_keys = Ext.encode(selectedKeys);
				//submit to server
				Ext.Ajax.request({
					//specify options (note success/failure below that receives these same options)
					waitMsg: 'Saving changes...'
					, url: this.app.connection
					, params: { 
						task: "delete" //pass task to do to the server script
						, moduleId: this.moduleId
						, fileName: this.phpFile
						, deleteKeys: encoded_keys
						, key: 'id'//pass to server same 'id' that the reader used
					}
					, callback: function (options, success, response) {
						if (success) { //success will be true if the request succeeded
							Ext.MessageBox.alert('OK',response.responseText);//you won't see this alert if the next one pops up fast
							var json = Ext.util.JSON.decode(response.responseText);
							Ext.MessageBox.alert('OK',json.del_count + ' record(s) deleted.');
						} else {
							Ext.MessageBox.alert('Sorry, please try again. [Q304]',response.responseText);
						}
					}
					, failure:function(response,options){
						Ext.MessageBox.alert('Warning','Oops...');
					}                                      
					, success:function(response,options){
						storeGroupModules.reload();
					}
					, scope: this
				});
			};
	
			function saveEditGroupModules (oGrid_Event) {
            
				//submit to server
				Ext.Ajax.request({
					waitMsg: 'Saving changes...'
					, url: this.app.connection
					, params: { 
						task: "edit" //pass task to do to the server script
						, moduleId: this.moduleId
						, fileName: this.phpFile
						, key: 'id' //pass to server same 'id' that the reader used
						, keyID: oGrid_Event.record.data.id
						, field: oGrid_Event.field //the column name
						, value: oGrid_Event.value //the updated value
						, originalValue: oGrid_Event.record.modified
					}
					, failure:function(response,options){
						Ext.MessageBox.alert('Warning','Oops...');
					}                            
					, success:function(response,options){
						storeGroupModules.commitChanges();
					}      
					, scope: this
				});
			};
		
			// Grid definition
			var editGridGroupModules = new Ext.grid.EditorGridPanel({
				store: storeGroupModules
				, cm: cmGroupModules
				, height: 150
				, title:'Edit Group Modules'
				, frame: true
				, clicksToEdit: 2
				, selModel: new Ext.grid.RowSelectionModel({singleSelect:false})

				, tbar: [
					qo_admin_menu
					, '-'
					, {
						text: 'Delete'
						, tooltip: 'Select row to delete'
						, handler: handleDeleteGroupModules
						, scope: this
					}
					, {
						text: 'Refresh'
						, tooltip: 'Refresh grid'
						, handler: function () {
							storeGroupModules.reload()
						}
					}
				]
			});
	
			editGridGroupModules.addListener('afteredit', saveEditGroupModules, this);

			// trigger the data store load
			storeGroupModules.load();

			var newFormGroupModules = new Ext.FormPanel ({
				title: 'New Group Module'
				, id: 'qo-admin-group-module-new'
				, labelWidth: 85
				, url: this.app.connection
				, frame: true
				, bodyStyle:'padding:5px 5px 0'
				, width: 250
				//, defaults: {width: 200}
				, items: [
					new Ext.form.Hidden ({ name: 'task', value: 'new' })
					, new Ext.form.Hidden ({ name: 'moduleId', value: this.moduleId })
					, new Ext.form.Hidden ({ name: 'fileName', value: this.phpFile })
					, new fm.ComboBox({
						typeAhead: false
						, triggerAction: 'all'
						, lazyRender: false
						, store: storeGroupNames2
						, displayField: 'DisplayField'
						, valueField: 'KeyField'
						, hiddenName: 'qo_groups_id'
						, fieldLabel: 'Group Name'
						, width: 200 
					})
					, new fm.ComboBox({
						typeAhead: false
						, triggerAction: 'all'
						, lazyRender: false
						, store: storeModuleNames2
						, displayField: 'DisplayField'
						, valueField: 'KeyField'
						, hiddenName: 'qo_modules_id'
						, fieldLabel: 'Module Name'
						, width: 200 
					})
					, new fm.ComboBox({
						typeAhead: false
						, triggerAction: 'all'
						, lazyRender: false
						, mode: 'local'
						, store: storeTFForm
						, displayField: 'value'
						, valueField: 'value'
						, hiddenName: 'active'
						, fieldLabel: 'Active'
						, width: 75
						, value: 'true'
					})
				]
				, tbar: [
					qo_admin_menu
					, '-'
					, {
						text: 'Save'
						, type: 'submit'
						, handler: function () {
							newFormGroupModules.getForm().submit({
								waitMsg: 'Saving...'
								, success: function (response,options) {
									newFormGroupModules.getForm().reset();
								}
								, failure: function (response,options) {
									Ext.MessageBox.alert('Error','Unable to save record');
								}
							});
						}
					}
					, {
						text: 'Reset'
						, type: 'reset'
						, handler: function () {
							newFormGroupModules.getForm().reset();
						}
					}
				]
			});

			var tabModules = new Ext.TabPanel ({
				//width: 200
				//, height: 150
				 activeTab: 0
				, frame: true
				, layoutOnTabChange: true
				, items: [ 
					newFormGroupModules
					, editGridGroupModules
				]
			});

			win = desktop.createWindow({
                id: 'qo-admin-group-modules-win',
                title:'QO Admin - Group Modules',
                width:400,
                height:400,
                iconCls: 'icon-grid',
                shim:false,
                animCollapse:false,
                constrainHeader:true,
				layout: 'fit',
                items: tabModules,
                taskbuttonTooltip: '<b>QO Admin</b><br />Group Module Adminsitration'
            });
		}
		win.show();
	}
});

