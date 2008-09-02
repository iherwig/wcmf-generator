
/*
 This file was generated by wCMFGenerator 2.6.1.0012 from model/requirements.xmi on 02.09.08 08:15. 
  Manual modifications should be placed inside the protected regions.
   developer: Giuseppe Platania
   Version: 1.0
   Class: class.ChiRequirement.js
   Description: A Business guide line about the Enterprise or the project.
  */
  
cwm.figure.ChiRequirement = function(label, oid, parentoids, childoids){

	cwm.figure.RectFigure.call(this, "ChiRequirement", label, oid, parentoids, childoids);
}

cwm.figure.ChiRequirement.prototype = new uwm.figure.RectFigure;

cwm.figure.ChiRequirement.prototype.type = "cwm.figure.ChiRequirement";

cwm.figure.ChiRequirement.prototype.getGrid = function(store) {
	return new Ext.grid.GridPanel({
	id: "GridChiRequirement",
		iconCls: "FigureGraphic FigureChiGoal",
		layout: "fit",
					columns: [{
						header: "ChiRequirement",
						dataIndex: "Name",
						sortable: true
					}, {
					header: "parentoids",
					dataIndex: "parentoids",
					hidden: true,
					hideable: false
				}, {
					header: "childoids",
					dataIndex: "childoids",
					hidden: true,
					hideable: false
				}],
					store: store,
					enableDragDrop: true,
					selModel: new Ext.grid.RowSelectionModel({
						singleSelect: true
					}),
					ddGroup: "gridDDGroup",
					uwmClassName: "ChiRequirement",
					listeners: {
								cellclick: function(grid, rowIndex, columnIndex, e) {
								uwm.showProperties(grid.uwmClassName, grid.getStore().getAt(rowIndex).id);
								},
								cellcontextmenu: function(grid, rowIndex, columnIndex, e){
								var node = grid.getStore().getAt(rowIndex);
				
							var contextMenu = new Ext.menu.Menu({
								items: [new Ext.menu.Item({
									text: "Show in diagram",
									handler: function(item, e){
										var oid = node.id;							
										uwm.showInDiagram(oid);
															},
						disabled: !uwm.getByOid(node.id)
					}), new Ext.menu.Item({
						text: "Show in Tree",
						handler: function(item, e){
							var oid = node.id;
							
							uwm.showInTree(oid);
						}
					}), "-", {
						text: "Delete from model",
						handler: function(){
							var record = grid.getStore().getAt(rowIndex);
							
							grid.getStore().remove(record);
							uwm.deleteFigureFromModel(record.id);
						}
					}]
				});
				
				contextMenu.showAt(e.getXY());				
				e.stopPropagation();				
				return false;
			}
		}
	});
}


cwm.figure.ChiRequirement.prototype.getStore = function(){
	return new Ext.data.Store({
		url: uwm.config.jsonUrl,
		baseParams: {
			sid: uwm.data.sid,
			usr_action: "list",
			response_format: "JSON",
			type: "ChiRequirement"
		},
		reader: new Ext.data.JsonReader({
			totalProperty: "totalCount",
			root: "objects",
			id: "oid",
			fields: [{
				name: "Name",
				mapping: "values[1].Name.value"
			}, {
				name: "parentoids",
				mapping: "properties.parentoids"
			}, {
				name: "childoids",
				mapping: "properties.childoids"
			}]
		})
	});
}

cwm.figure.ChiRequirement.prototype.showEdit = function(parentComponent, oid){

	Ext.form.Field.prototype.msgTarget = 'side';
	var listeners = {
					"change": function(field, newValue, oldValue){
																	uwm.fieldChanged(field, newValue, oldValue, oid);
																}
					};
	var htmlListeners = {
						"sync": function(field, html){
						field.contentChanged = true;
						},
						"beforedestroy": function(field){
														if (field.contentChanged) {
																				uwm.fieldChanged(field, field.getValue(), null, oid);
																					}
														}
						};	
	var form = new Ext.FormPanel({	
		oid: oid,
		labelWidth: 90,	
		frame: true,
		labelAlign: "top",
		title: 'ChiRequirement Edit View',
		autoScroll: true,
		defaults: {
			width: 222
		},
		defaultType: 'textfield',
		items: [
							{	
			fieldLabel: 'reqType',
	        name: 'reqType',
	        
	         inputType:'textfield', //in model originally was in  select#async:ChiRequirementType format
	        listeners: listeners 
	        },
			{	
			fieldLabel: 'Priority',
	        name: 'Priority',
	        
	         inputType:'textfield',
	        listeners: listeners 
	        },
			{	
			fieldLabel: 'Author',
	        name: 'Author',
	        
	         inputType:'textfield', //in model originally was in  select#async:ChiAuthors format
	        listeners: listeners 
	        },
			{	
			fieldLabel: 'Proofreader',
	        name: 'Proofreader',
	        
	         inputType:'textfield', //in model originally was in  select#async:ChiAuthors format
	        listeners: listeners 
	        },
			{	
			fieldLabel: 'Status',
	        name: 'Status',
	        
	         inputType:'textfield', //in model originally was in  select#async:ChiRequirementStatus format
	        listeners: listeners 
	        },
			{	
			fieldLabel: 'Alias',
	        name: 'Alias',
	        
	         inputType:'textfield',
	        listeners: listeners 
	        },
			{	
			fieldLabel: 'Version',
	        name: 'Version',
	        
	         inputType:'textfield',
	        listeners: listeners 
	        },
			{	
			fieldLabel: 'Name',
	        name: 'Name',
	        
	         inputType:'textfield',
	        listeners: listeners 
	        },
			{	
			fieldLabel: 'Notes',
	        name: 'Notes',
	        
	         
			new Ext.form.HtmlEditor({
			fieldLabel: 'Notes',
			name: 'Notes',
			enableAlignments: false,
			enableColors: false,
			enableFont: false,
			enableFontSize: false,
			enableLinks: false,
			enableSourceEdit: false,			
			listeners: htmlListeners
		}),

	        listeners: listeners 
	        },
			{	
			fieldLabel: 'created',
	        name: 'created',
	        readOnly:true,
	         inputType:'textfield',
	        listeners: listeners 
	        },
			{	
			fieldLabel: 'creator',
	        name: 'creator',
	        readOnly:true,
	         inputType:'textfield',
	        listeners: listeners 
	        },
			{	
			fieldLabel: 'last_editor',
	        name: 'last_editor',
	        readOnly:true,
	         inputType:'textfield',
	        listeners: listeners 
	        },
			{	
			fieldLabel: 'modified',
	        name: 'modified',
	        readOnly:true,
	         inputType:'textfield',
	        listeners: listeners 
	        }

			]
	});
	
	parentComponent.add(form);
	parentComponent.doLayout();


	uwm.jsonRequest({
		usr_action: "display",
		oid: oid
		}, 
		"Loading properties", function(data){
		var realForm = form.getForm();			
			
			realForm.findField("reqType").setValue(data.node.values[1].reqType.value);
			realForm.findField("Priority").setValue(data.node.values[1].Priority.value);
			realForm.findField("Author").setValue(data.node.values[1].Author.value);
			realForm.findField("Proofreader").setValue(data.node.values[1].Proofreader.value);
			realForm.findField("Status").setValue(data.node.values[1].Status.value);
			realForm.findField("Alias").setValue(data.node.values[1].Alias.value);
			realForm.findField("Version").setValue(data.node.values[1].Version.value);
			realForm.findField("Name").setValue(data.node.values[1].Name.value);
			realForm.findField("Notes").setValue(data.node.values[1].Notes.value);
			realForm.findField("created").setValue(data.node.values[1].created.value);
			realForm.findField("creator").setValue(data.node.values[1].creator.value);
			realForm.findField("last_editor").setValue(data.node.values[1].last_editor.value);
			realForm.findField("modified").setValue(data.node.values[1].modified.value);		
	});
};
cwm.figure.ChiRequirement.prototype.getConstraints = function() {
	return {
				
		ChiRequirement: {
			label: "depends on",
			inverse: false,
			sourceMaxConns: -1,
			targetMaxConns: -1,
			relationship:"parent"
		},			
		Package: {
			label: "depends on",
			inverse: false,
			sourceMaxConns: -1,
			targetMaxConns: -1,
			relationship:"parent"
		},			
		ChiGoal: {
			label: "depends on",
			inverse: false,
			sourceMaxConns: -1,
			targetMaxConns: -1,
			relationship:"parent"
		},			
		ChiBusinessProcess: {
			label: "depends on",
			inverse: false,
			sourceMaxConns: -1,
			targetMaxConns: -1,
			relationship:"parent"
		},
		ChiIssue: {
			label: "defines",
			inverse: true,
			ConnectionType: "aggregation",
			sourceMaxConns: -1,
			targetMaxConns: -1,
			relationship:"child"
		},
		
		NMFeatureRequirements: {
			label: "defines",
			inverse: true,
			ConnectionType: "aggregation",
			sourceMaxConns: -1,
			targetMaxConns: -1,
			relationship:"child"
		},
		
		ChiRequirement: {
			label: "defines",
			inverse: true,
			ConnectionType: "aggregation",
			sourceMaxConns: -1,
			targetMaxConns: -1,
			relationship:"child"
		}
		
	};
}
