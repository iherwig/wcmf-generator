QoDesk.QoAdminMembers = Ext.extend(Ext.app.Module, {

	  moduleType : 'system'
	, moduleId : 'qo-admin-members'
	, phpFile : 'qo-admin-members.php'
	, moduleAuthor: 'Paul Simmons'
	, moduleVersion: '1.1.0'
	//===========================================================================================
	// 1.0.0 Initial Creation
	// 1.0.1 
	// - Added functionality to specify group user should be added to
	// 1.1.0 For Line compatability for QO-Admin
	//===========================================================================================
	
	, init : function(){
        this.launcher = {
            handler : this.createWindow,
            iconCls: 'icon-grid',
            scope: this,
            //shortcutIconCls: 'demo-grid-shortcut',
            text: 'QO Admin - Members',
            tooltip: '<b>QO Admin</b><br />Member Administration'
        }
    }
	
	, createWindow : function(){
	
	    var desktop = this.app.getDesktop();
        var win = desktop.getWindow('qo-admin-members-win');

		if (!win) {
			// Setup variables
			var php_file 		= 'qo-admin-members.php';	// php file to interact with
			var php_method 		= 'POST';				// http method interaction with the php file

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
			var storeMembers = new Ext.data.Store ({
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
					root: 'qo_members'
					, id: 'id'
					, fields: [
						{name: 'id'}
						, {name: 'first_name'}
						, {name: 'last_name'}
						, {name: 'email_address'}
						, {name: 'password'}
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
			// End Store Definitions

			var fm = Ext.form;
			// Define column Model
			var cmMembers = new Ext.grid.ColumnModel([
				{
					id:'id'
					, header: 'ID'
					, dataIndex: 'id'
					, align: 'right'
					, hidden: true
				}
				, {	
					header: 'First Name'
					, dataIndex: 'first_name'
					, width: 100
					, editor: new fm.TextField({
						allowBlank: false
					})
				}
				, {	
					header: 'Last Name'
					, dataIndex: 'last_name'
					, width: 100
					, editor: new fm.TextField({
						allowBlank: false
					})
				}
				, {	
					header: 'email'
					, dataIndex: 'email_address'
					, vtype: 'email'
					, width: 200
					, editor: new fm.TextField({
						allowBlank: false
					})
				}
				, {	
					header: 'Password'
					, dataIndex: 'password'
					, width: 75
					, renderer: function() {
						return '**********';
					}
					, editor: new fm.TextField({
						allowBlank: false
					, inputType: 'password'
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
			cmMembers.defaultSortable = true;
	
			function handleDeleteMembers() {
				//returns record objects for selected rows (all info for row)
				var selectedRows = editGridMembers.selModel.selections.items;
				
				//returns array of selected rows ids only
				var selectedKeys = editGridMembers.selModel.selections.keys; 

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
						storeMembers.reload();
					}
					, scope: this
				});
			};
	
			function saveEditMembers (oGrid_Event) {
            
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
						storeMembers.commitChanges();
					}      
					, scope: this
				});
			};
		
			// Grid definition
			var editGridMembers = new Ext.grid.EditorGridPanel({
				store: storeMembers
				, cm: cmMembers
				, height: 150
				, title:'Edit Members'
				, frame: true
				, clicksToEdit: 2
				, selModel: new Ext.grid.RowSelectionModel({singleSelect:false}) // False allows multiple row selection

				, tbar: [
					qo_admin_menu
					, '-'
					, {
						text: 'Delete'
						, tooltip: 'Select row(s) to delete'
						, handler: handleDeleteMembers
						, scope: this
					}
					, {
						text: 'Refresh'
						, tooltip: 'Refresh grid'
						, handler: function () {
							storeMembers.reload()
						}
					}
				]
			});
	
			editGridMembers.addListener('afteredit', saveEditMembers, this);

			// trigger the data store load
			storeMembers.load();

			var newFormMembers = new Ext.FormPanel ({
				title: 'New Member'
				, id: 'qo-admin-member-new'
				, labelWidth: 75
				, url: this.app.connection
				, frame: true
				, bodyStyle:'padding:5px 5px 0'
				, items: [
					new Ext.form.Hidden ({ name: 'task', value: 'new' })
					, new Ext.form.Hidden ({ name: 'moduleId', value: this.moduleId })
					, new Ext.form.Hidden ({ name: 'fileName', value: this.phpFile })
					, {
						fieldLabel: 'First Name'
						, name: 'first_name'
						, allowBlank:false
						, xtype:'textfield'
						, width: 200
					}
					, {
						fieldLabel: 'Last Name'
						, name: 'last_name'
						, allowBlank:false
						, xtype:'textfield'
						, width: 200
					}
					, {
						fieldLabel: 'Email'
						, name: 'email_address'
						, vtype: 'email'
						, allowBlank:false
						, xtype:'textfield'
						, width: 200
					}
					, {
						fieldLabel: 'Password'
						, name: 'password'
						, allowBlank:false
						, xtype:'textfield'
						, width: 100
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
						, width: 75
					})
					, {
						xtype: 'fieldset'
						, title: 'Initial Group'
						, autoHeight:true
						, items: [
							new fm.ComboBox({
								typeAhead: false
								, triggerAction: 'all'
								, lazyRender: false
								, store: storeGroupNames
								, displayField: 'DisplayField'
								, valueField: 'KeyField'
								, hiddenName: 'qo_groups_id'
								, fieldLabel: 'Group Name'
								, width: 200 
							})
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
							newFormMembers.getForm().submit({
								waitMsg: 'Saving...'
								, success: function (form, action) {
									Ext.MessageBox.alert('OK',action.result.save_message);
									newFormMembers.getForm().reset();
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
							newFormMembers.getForm().reset();
						}
					}
				]
			});

			var tabMembers = new Ext.TabPanel ({
				//width: 200
				//, height: 150
				 activeTab: 0
				, frame: true
				, layoutOnTabChange: true
				, items: [ 
					newFormMembers
					, editGridMembers
				]
			});

			win = desktop.createWindow({
                id: 'qo-admin-members-win',
                title:'QO Admin - Members',
                width:560,
                height:400,
                iconCls: 'icon-grid',
                shim:false,
                animCollapse:false,
                constrainHeader:true,
				layout: 'fit',
                items: tabMembers,
                taskbuttonTooltip: '<b>QO Admin</b><br />Member Adminsitration'
            });
		}
		win.show();
	}
});

