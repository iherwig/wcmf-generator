QoDesk.QoAdminMyGroups = Ext.extend(Ext.app.Module, {

	  moduleType : 'system'
	, moduleId : 'qo-admin-my-groups'
	, phpFile : 'qo-admin-my-groups.php'
	, moduleAuthor: 'Paul Simmons'
	, moduleVersion: '1.1.0'
	//===========================================================================================
	// 1.1.0 Initial Creation
	//===========================================================================================
	
	, init : function(){
        this.launcher = {
            handler : this.createWindow,
            iconCls: 'icon-grid',
            scope: this,
            text: 'My Groups',
            tooltip: 'My Group Administration'
        }
    }
	
	, createWindow : function(){
	
	    var desktop = this.app.getDesktop();
        var win = desktop.getWindow('qo-admin-my-groups-win');

		if (!win) {
			// --
			Ext.QuickTips.init();

			// turn on validation errors beside the field globally
			Ext.form.Field.prototype.msgTarget = 'side';

			// Store Definitions
			
			// for Grid data
			var storeMyGroups = new Ext.data.Store ({
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
					root: 'qo_members_has_groups'
					, id: 'id'
					, fields: [
						{name: 'id'}
						, {name: 'qo_members_id'}
						, {name: 'qo_groups_id'}
						, {name: 'active'}
						, {name: 'admin_flag'}
					]
				})
			});

			var storeMemberNames = new Ext.data.Store ({
				proxy: new Ext.data.HttpProxy ({ 
					url: this.app.connection
					, scope: this
				})
				, baseParams: {
					task: "readMemberNames"
					, moduleId: this.moduleId
					, fileName: this.phpFile
				}
				, reader: new Ext.data.JsonReader ({
					root: 'qo_members'
					, id: 'KeyField'
					, fields: [
						{name: 'KeyField'}
						, {name: 'DisplayField'}
					]
				})
			});
			storeMemberNames.loadData;
			storeMemberNames.load();

			var storeMemberNames2 = new Ext.data.Store ({
				proxy: new Ext.data.HttpProxy ({ 
					url: this.app.connection
					, scope: this
				})
				, baseParams: {
					task: "readMemberNames"
					, moduleId: this.moduleId
					, fileName: this.phpFile
				}
				, reader: new Ext.data.JsonReader ({
					root: 'qo_members'
					, id: 'KeyField'
					, fields: [
						{name: 'KeyField'}
						, {name: 'DisplayField'}
					]
				})
			});
			storeMemberNames2.loadData;
			storeMemberNames2.load();

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

			var storeTFGrid2 = new Ext.data.SimpleStore({
				fields: [ 'value' ]
				, data: [ [ 'true' ], [ 'false' ] ]
			});

			var storeTFForm = new Ext.data.SimpleStore({
				fields: [ 'value' ]
				, data: [ [ 'true' ], [ 'false' ] ]
			});

			var storeTFForm2 = new Ext.data.SimpleStore({
				fields: [ 'value' ]
				, data: [ [ 'true' ], [ 'false' ] ]
			});

			// End Store Definitions

			var fm = Ext.form;
			// Define column Model
			var cmMyGroups = new Ext.grid.ColumnModel([
				{
					id:'id'
					, header: 'ID'
					, dataIndex: 'id'
					, align: 'right'
					, hidden: true
				}
				, {	
					header: 'Member Name'
					, dataIndex: 'qo_members_id'
					, width: 150
					, editor: new fm.ComboBox({
						typeAhead: false
						, triggerAction: 'all'
						, lazyRender: true
						, store: storeMemberNames
						, displayField: 'DisplayField'
						, valueField: 'KeyField'
					})
					, renderer: function(data) {
						record = storeMemberNames.getById(data);
						if(record) {
							return record.data.DisplayField;
						} else {
							return 'missing data';
						}
					}
				}
				, {	
					header: 'Group Name'
					, dataIndex: 'qo_groups_id'
					, width: 150
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
				, {	
					header: 'Admin'
					, dataIndex: 'admin_flag'
					, width: 50
					, editor: new fm.ComboBox({
						typeAhead: false
						, triggerAction: 'all'
						, lazyRender: true
						, mode: 'local'
						, store: storeTFGrid2
						, displayField: 'value'
						, valueField: 'value'
					})
				}
			]);
			
			// by default columns are sortable
			cmMyGroups.defaultSortable = true;
	
			function handleDeleteMyGroups() {
				//returns record objects for selected rows (all info for row)
				var selectedRows = editGridMyGroups.selModel.selections.items;
				
				//returns array of selected rows ids only
				var selectedKeys = editGridMyGroups.selModel.selections.keys; 

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
						storeMyGroups.reload();
					}
					, scope: this
				});
			};
	
			function saveEditMyGroups (oGrid_Event) {
            
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
						storeMyGroups.commitChanges();
					}      
					, scope: this
				});
			};
		
			// Grid definition
			var editGridMyGroups = new Ext.grid.EditorGridPanel({
				store: storeMyGroups
				, cm: cmMyGroups
				, height: 150
				, title:'Edit My Groups'
				, frame: true
				, clicksToEdit: 2
				, selModel: new Ext.grid.RowSelectionModel({singleSelect:false})

				, tbar: [
					{
						text: 'Delete'
						, tooltip: 'Select row to delete'
						, handler: handleDeleteMyGroups
						, scope: this
					}
					, {
						text: 'Refresh'
						, tooltip: 'Refresh grid'
						, handler: function () {
							storeMyGroups.reload()
						}
					}
				]
			});
	
			editGridMyGroups.addListener('afteredit', saveEditMyGroups, this);

			// trigger the data store load
			storeMyGroups.load();

			var newFormMyGroups = new Ext.FormPanel ({
				title: 'New Group Member'
				, id: 'qo-admin-member-group-new'
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
						, store: storeMemberNames2
						, displayField: 'DisplayField'
						, valueField: 'KeyField'
						, hiddenName: 'qo_members_id'
						, fieldLabel: 'Member Name'
						, width: 200 
					})
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
						, mode: 'local'
						, store: storeTFForm
						, displayField: 'value'
						, valueField: 'value'
						, hiddenName: 'active'
						, fieldLabel: 'Active'
						, width: 75
						, value: 'true'
					})
					, new fm.ComboBox({
						typeAhead: false
						, triggerAction: 'all'
						, lazyRender: false
						, mode: 'local'
						, store: storeTFForm2
						, displayField: 'value'
						, valueField: 'value'
						, hiddenName: 'admin_flag'
						, fieldLabel: 'Admin'
						, width: 75
						, value: 'false'
					})
				]
				, tbar: [
					{
						text: 'Save'
						, type: 'submit'
						, handler: function () {
							newFormMyGroups.getForm().submit({
								waitMsg: 'Saving...'
								, success: function (response,options) {
									newFormMyGroups.getForm().reset();
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
							newFormMyGroups.getForm().reset();
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
					newFormMyGroups
					, editGridMyGroups
				]
			});

			win = desktop.createWindow({
                id: 'qo-admin-my-groups-win',
                title:'My Groups',
                width:435,
                height:400,
                iconCls: 'icon-grid',
                shim:false,
                animCollapse:false,
                constrainHeader:true,
				layout: 'fit',
                items: tabModules,
                taskbuttonTooltip: 'My Group Adminsitration'
            });
		}
		win.show();
	}
});

