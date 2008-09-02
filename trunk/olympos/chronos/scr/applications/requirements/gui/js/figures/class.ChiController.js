
/*
 This file was generated by wCMFGenerator 2.6.1.0016 from model/requirements.xmi on 02.09.08 21:48. 
  Manual modifications should be placed inside the protected regions.
   developer: Giuseppe Platania
   Version: 1.0
   Class: class.ChiController.js
   Description: 
  */
  
cwm.figure.ChiController = function(label, oid, parentoids, childoids){

	cwm.figure.RectFigure.call(this, "ChiController", label, oid, parentoids, childoids);
}

cwm.figure.ChiController.prototype = new uwm.figure.RectFigure;

cwm.figure.ChiController.prototype.type = "cwm.figure.ChiController";

cwm.figure.ChiController.prototype.getGrid = function(store) {
	return new Ext.grid.GridPanel({
	id: "GridChiController",
		iconCls: "FigureGraphic FigureChiController",
		layout: "fit",
					columns: [{
						header: "ChiController",
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
					uwmClassName: "ChiController",
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


cwm.figure.ChiController.prototype.getStore = function(){
	return new Ext.data.Store({
		url: uwm.config.jsonUrl,
		baseParams: {
			sid: uwm.data.sid,
			usr_action: "list",
			response_format: "JSON",
			type: "ChiController"
		},
		reader: new Ext.data.JsonReader({
			totalProperty: "totalCount",
			root: "objects",
			id: "oid",
			fields: [{
				name: "Name",
				mapping: "values[1].Name"
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

cwm.figure.ChiController.prototype.showEdit = function(parentComponent, oid){

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
		title: 'ChiController Edit View',
		autoScroll: true,
		defaults: {
			width: 222
		},
		defaultType: 'textfield',
		items: [
				
			{	
			fieldLabel: 'Alias',
	        name: 'Alias',
	        
	         inputType:'textfield',
	        listeners: listeners 
	        }
,

			{	
			fieldLabel: 'Version',
	        name: 'Version',
	        
	         inputType:'textfield',
	        listeners: listeners 
	        }
,

			{	
			fieldLabel: 'Name',
	        name: 'Name',
	        
	         inputType:'textfield',
	        listeners: listeners 
	        }
,

			// TODO check this manually
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
,

			{	
			fieldLabel: 'created',
	        name: 'created',
	        readOnly:true,
	         inputType:'textfield',
	        listeners: listeners 
	        }
,

			{	
			fieldLabel: 'creator',
	        name: 'creator',
	        readOnly:true,
	         inputType:'textfield',
	        listeners: listeners 
	        }
,

			{	
			fieldLabel: 'last_editor',
	        name: 'last_editor',
	        readOnly:true,
	         inputType:'textfield',
	        listeners: listeners 
	        }
,

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
		oid: oid,
		depth: 0,
		omitMetaData: true
		}, 
		"Loading properties", function(data){
		var realForm = form.getForm();			
			
			realForm.findField("Alias").setValue(data.node.values[1].Alias);
			realForm.findField("Version").setValue(data.node.values[1].Version);
			realForm.findField("Name").setValue(data.node.values[1].Name);
			realForm.findField("Notes").setValue(data.node.values[1].Notes);
			realForm.findField("created").setValue(data.node.values[1].created);
			realForm.findField("creator").setValue(data.node.values[1].creator);
			realForm.findField("last_editor").setValue(data.node.values[1].last_editor);
			realForm.findField("modified").setValue(data.node.values[1].modified);		
	});
};
cwm.figure.ChiController.prototype.getConstraints = function() {
	return {
	
		ChiNode: {
			label: "defines",
			inverse: true,
			ConnectionType: "aggregation",
			sourceMaxConns: -1,
			targetMaxConns: -1,
			relationship:"child"
		}
		
	};
}
