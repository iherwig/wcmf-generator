
/*
 This file was generated by wCMFGenerator 2.6.1.0012 from model/requirements.xmi on 31.08.08 11:04. 
  Manual modifications should be placed inside the protected regions.
   developer: Giuseppe Platania
   Version: 1.0
   Class: class.ChiGoal.js
   Description: a Measurable scope that the enterprise wants to achieve. 
  */
  
req.figure.ChiGoal = function(label, oid, parentoids, childoids){

	req.figure.RectFigure.call(this, "ChiGoal", label, oid, parentoids, childoids);
}

req.figure.ChiGoal.prototype = new req.figure.RectFigure;

req.figure.ChiGoal.prototype.type = "req.figure.ChiGoal";

req.figure.ChiGoal.prototype.getGrid = function(store) {
	return new Ext.grid.GridPanel({
					columns: [{
						header: "ChiGoal",
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
					reqClassName: "ChiGoal"
				});
}

req.figure.ChiGoal.prototype.getStore = function(){
	return new Ext.data.Store({
		url: req.data.jsonUrl,
		baseParams: {
			sid: req.data.sid,
			usr_action: "list",
			response_format: "JSON",
			type: "ChiGoal"
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

req.figure.ChiGoal.prototype.showEdit = function(bd, oid){

	Ext.form.Field.prototype.msgTarget = 'side';
	var listeners = {
					"change": function(field, newValue, oldValue){
					req.fieldChanged(field, newValue, oldValue, oid);
																	}
					};
	var form = new Ext.FormPanel({	
		oid: oid,
		labelWidth: 100,	
		frame: true,
		title: 'ChiGoal Edit View',
		bodyStyle: 'padding:5px 5px 0',
		width: 500,
		defaults: {
			width: 100
		},
		defaultType: 'textfield',
		items: [
							{	
			fieldLabel: 'Priority',
	        name: 'Priority',
	        
	         inputType:'textfield',
	        listeners: listeners 
	        },
			{	
			fieldLabel: 'Value_Name',
	        name: 'Value_Name',
	        
	         inputType:'textfield',
	        listeners: listeners 
	        },
			{	
			fieldLabel: 'Value_ammount',
	        name: 'Value_ammount',
	        
	         inputType:'textfield',
	        listeners: listeners 
	        },
			{	
			fieldLabel: 'Value_Goal',
	        name: 'Value_Goal',
	        
	         inputType:'textfield',
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
	        
	         inputType:'htmleditor',
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
	
	form.render(bd);


Ext.Ajax.request({
		url: req.data.jsonUrl,
		method: "post",
		params: {
			sid: req.data.sid,
			usr_action: "display",
			response_format: "JSON",
			oid: oid
		},
		success: function(response){
			var data = Ext.util.JSON.decode(response.responseText);			
			var realForm = form.getForm();
			
			
			realForm.findField("Priority").setValue(data.node.values[1].Priority.value);
			realForm.findField("Value_Name").setValue(data.node.values[1].Value_Name.value);
			realForm.findField("Value_ammount").setValue(data.node.values[1].Value_ammount.value);
			realForm.findField("Value_Goal").setValue(data.node.values[1].Value_Goal.value);
			realForm.findField("Alias").setValue(data.node.values[1].Alias.value);
			realForm.findField("Version").setValue(data.node.values[1].Version.value);
			realForm.findField("Name").setValue(data.node.values[1].Name.value);
			realForm.findField("Notes").setValue(data.node.values[1].Notes.value);
			realForm.findField("created").setValue(data.node.values[1].created.value);
			realForm.findField("creator").setValue(data.node.values[1].creator.value);
			realForm.findField("last_editor").setValue(data.node.values[1].last_editor.value);
			realForm.findField("modified").setValue(data.node.values[1].modified.value);
			}
	});
};
req.figure.ChiGoal.prototype.getConstraints = function() {
	return {
	//Parents
				
		Package: {
			label: "depends on",
			inverse: false,
			sourceMaxConns: -1,
			targetMaxConns: -1
		},			
		ChiGoal: {
			label: "depends on",
			inverse: false,
			sourceMaxConns: -1,
			targetMaxConns: -1
		},			
		ChiBusinessProcess: {
			label: "depends on",
			inverse: false,
			sourceMaxConns: -1,
			targetMaxConns: -1
		},
	//Children

		ChiRequirement: {
			label: "defines",
			inverse: true,
			ConnectionType: "aggregation",
			sourceMaxConns: -1,
			targetMaxConns: -1	
		},
		

		ChiGoal: {
			label: "defines",
			inverse: true,
			ConnectionType: "aggregation",
			sourceMaxConns: -1,
			targetMaxConns: -1	
		}
		
	};
}
