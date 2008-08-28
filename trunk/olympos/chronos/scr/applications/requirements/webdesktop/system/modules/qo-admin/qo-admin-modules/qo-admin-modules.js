QoDesk.QoAdminModules = Ext.extend(Ext.app.Module, {

	  moduleType : 'system'
	, moduleId : 'qo-admin-modules'
	, phpFile : 'qo-admin-modules.php'
	, moduleAuthor: 'Paul Simmons'
	, moduleVersion: '1.1.0'
	//===========================================================================================
	// 1.0.0 Initial Creation
	// 1.0.1 
	// - Added functionality to specify group module should be added to
	// - Added functionality to specify launcher module should be added to
	// - Added functionality to specify files module uses
	// 1.1.0 For Line compatability for QO-Admin
	//===========================================================================================

	, init : function(){
        this.launcher = {
            handler : this.createWindow,
            iconCls: 'icon-grid',
            scope: this,
            //shortcutIconCls: 'demo-grid-shortcut',
            text: 'QO Admin - Modules',
            tooltip: '<b>QO Admin</b><br />Module Administration'
        }
    }
	
	, createWindow : function(){
	
	    var desktop = this.app.getDesktop();
        var win = desktop.getWindow('qo-admin-modules-win');

		if (!win) {
		
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
			var storeModules = new Ext.data.Store ({
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
					root: 'qo_modules'
					, id: 'id'
					, fields: [
						{name: 'id'}
						, {name: 'moduleName'}
						, {name: 'moduleType'}
						, {name: 'fmoduleId'}
						, {name: 'version'}
						, {name: 'author'}
						, {name: 'description'}
						, {name: 'path'}
						, {name: 'active'}
					]
				})
			});
			
			var storeTFGrid = new Ext.data.SimpleStore({
				fields: [ 'value' ]
				, data: [ [ 'true' ], [ 'false' ] ]
			});

			var storeTFForm = new Ext.data.SimpleStore({
				fields: [ 'value' ]
				, data: [ [ 'true' ], [ 'false' ] ]
			});
			
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
			
			var storeLauncherNames = new Ext.data.Store ({
				proxy: new Ext.data.HttpProxy ({ 
					url: this.app.connection
					, scope: this
				})
				, baseParams: {
					task: "readLauncherNames"
					, moduleId: this.moduleId
					, fileName: this.phpFile
				}
				, reader: new Ext.data.JsonReader ({
					root: 'qo_launchers'
					, id: 'KeyField'
					, fields: [
						{name: 'KeyField'}
						, {name: 'DisplayField'}
					]
				})
			});
			storeLauncherNames.loadData;
			storeLauncherNames.load();

			// End Store Definitions

			var fm = Ext.form;
			// Define column Model
			var cmModules = new Ext.grid.ColumnModel([
				{
					id:'id'
					, header: 'ID'
					, dataIndex: 'id'
					, align: 'right'
					, hidden: true
				}
				, {	
					header: 'Module Name'
					, dataIndex: 'moduleName'
					, width: 200
					, editor: new fm.TextField({
						allowBlank: false
					})
				}
				, {	
					header: 'Module Type'
					, dataIndex: 'moduleType'
					, width: 75
					, editor: new fm.TextField({
						allowBlank: false
					})
				}
				, {	
					header: 'Module ID'
					, dataIndex: 'fmoduleId'
					, width: 100
					, editor: new fm.TextField({
						allowBlank: false
					})
				}
				, {	
					header: 'Version'
					, dataIndex: 'version'
					, width: 65
					, editor: new fm.TextField({
						allowBlank: false
					})
				}
				, {	
					header: 'Author'
					, dataIndex: 'author'
					, width: 100
					, editor: new fm.TextField({
						allowBlank: false
					})
				}
				, {	
					header: 'Description'
					, dataIndex: 'description'
					, width: 300
					, editor: new fm.TextField({
						allowBlank: false
					})
				}
				, {	
					header: 'Path'
					, dataIndex: 'path'
					, width: 300
					, editor: new fm.TextField({
						allowBlank: false
					})
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
			cmModules.defaultSortable = true;
	
			function handleDeleteModules() {
				//returns record objects for selected rows (all info for row)
				var selectedRows = editGridModules.selModel.selections.items;
				
				//returns array of selected rows ids only
				var selectedKeys = editGridModules.selModel.selections.keys; 

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
						storeModules.reload();
					}
					, scope: this
				});
			};
	
			function saveEditModules (oGrid_Event) {
            
				var fieldValue = oGrid_Event.value;
					
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
						storeModules.commitChanges();
					}      
					, scope: this
				});
			};
		
			// Grid definition
			var editGridModules = new Ext.grid.EditorGridPanel({
				store: storeModules
				, cm: cmModules
				, height: 150
				, title:'Edit Modules'
				, frame: true
				, clicksToEdit: 2
				, selModel: new Ext.grid.RowSelectionModel({singleSelect:false}) // False allows multiple row selection

				, tbar: [
					qo_admin_menu
					, '-'
					, {
						text: 'Delete'
						, tooltip: 'Select row(s) to delete'
						, handler: handleDeleteModules
						, scope: this
					}
					, {
						text: 'Refresh'
						, tooltip: 'Refresh grid'
						, handler: function () {
							storeModules.reload()
						}
					}
				]
			});
	
			editGridModules.addListener('afteredit', saveEditModules, this);

			// trigger the data store load
			storeModules.load();

			var newFormModules = new Ext.FormPanel ({
				title: 'New Module'
				, id: 'qo-admin-module-new'
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
					, {
						layout: 'column'
						, items: [
							{
								columnWidth: 0.5
								, layout: 'form'
								, items: [
									{
										fieldLabel: 'Module Name'
										, name: 'moduleName'
										, allowBlank:false
										, width: 200
										, xtype:'textfield'
										, value: 'QoDesk.'
									}
									, {
										fieldLabel: 'Module Type'
										, name: 'moduleType'
										, allowBlank:false
										, width: 200
										, xtype:'textfield'
									}
									, {
										fieldLabel: 'Module ID'
										, name: 'fmoduleId'
										, allowBlank:false
										, width: 200
										, xtype:'textfield'
									}
								]
							}
							, {
								columnWidth: 0.5
								, layout: 'form'
								, items: [
									{
										fieldLabel: 'Version'
										, name: 'version'
										, allowBlank:false
										, width: 200
										, xtype:'textfield'
									}
									, {
										fieldLabel: 'Author'
										, name: 'author'
										, allowBlank:false
										, width: 200
										, xtype:'textfield'
									}
								]
							}
						]
					}
					, {
						fieldLabel: 'Description'
						, name: 'description'
						, allowBlank:false
						, width: 400
						, xtype:'textfield'
					}
					, {
						fieldLabel: 'Path'
						, name: 'path'
						, value: 'system/modules/'
						, allowBlank:false
						, width: 400
						, xtype:'textfield'
					}
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
						, value: 'true'
						, width: 100 
					})
					, {
						layout: 'column'
						, items: [
							{
								columnWidth: 0.5
								, layout: 'form'
								, items: [
									{
										xtype: 'fieldset'
										, title: 'Files'
										, autoHeight: true
										, items: [
											{
												fieldLabel: 'Javascript'
												, name: 'file_js'
												, allowBlank: true
												, width: 200
												, xtype:'textfield'
											}
											, {
												fieldLabel: 'PHP'
												, name: 'file_php'
												, allowBlank: true
												, width: 200
												, xtype:'textfield'
											}
											, {
												fieldLabel: 'CSS'
												, name: 'file_css'
												, allowBlank:true
												, width: 200
												, xtype:'textfield'
											}
										]
									}
								]
							}
							, {
								Width: 10
							}
							, {
								columnWidth: 0.5
								, layout: 'form'
								, items: [
									{
										xtype: 'fieldset'
										, title: 'Base Group'
										, autoHeight: true
										, items : [
											new fm.ComboBox({
												typeAhead: false
												, triggerAction: 'all'
												, lazyRender: false
												, store: storeGroupNames
												, displayField: 'DisplayField'
												, valueField: 'KeyField'
												, hiddenName: 'qo_groups_id'
												, fieldLabel: 'Group'
												, width: 200 
											})
										]
									}
									, {
										xtype: 'fieldset'
										, title: 'Base Launcher'
										, autoHeight: true
										, items : [
											new fm.ComboBox({
												typeAhead: false
												, triggerAction: 'all'
												, lazyRender: false
												, store: storeLauncherNames
												, displayField: 'DisplayField'
												, valueField: 'KeyField'
												, hiddenName: 'qo_launchers_id'
												, fieldLabel: 'Launcher'
												, width: 200 
											})
										]
									}
								]
							}
						]
					}
				]
				, tbar: [
					qo_admin_menu
					, '-'
					, {
						text: 'Save'
						, type: 'submit'
						, handler: function () {
							newFormModules.getForm().submit({
								waitMsg: 'Saving...'
								, success: function (form, action) {
									Ext.MessageBox.alert('OK',action.result.save_message);
									newFormModules.getForm().reset();
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
							newFormModules.getForm().reset();
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
					newFormModules
					, editGridModules
				]
			});

			win = desktop.createWindow({
                id: 'qo-admin-modules-win',
                title:'QO Admin - Modules',
                width:700,
                height:500,
                iconCls: 'icon-grid',
                shim:false,
                animCollapse:false,
                constrainHeader:true,
				layout: 'fit',
                items: tabModules,
                taskbuttonTooltip: '<b>QO Admin</b><br />Module Adminsitration'
            });
		}
		win.show();
	}
});

