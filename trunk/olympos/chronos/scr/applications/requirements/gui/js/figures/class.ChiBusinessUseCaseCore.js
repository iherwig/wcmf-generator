
/*
 This file was generated by wCMFGenerator 2.6.1.0012 from model/requirements.xmi on 31.08.08 11:04. 
  Manual modifications should be placed inside the protected regions.
   developer: Giuseppe Platania
   Version: 1.0
   Class: class.ChiBusinessUseCaseCore.js
   Description: A Core Use Case generates a value for an active business partner and is directly connected to the objectives (ChiGoals) of a company or the process of his existence (typically making money).
  */
  
req.figure.ChiBusinessUseCaseCore = function(label, oid, parentoids, childoids){

	req.figure.RectFigure.call(this, "ChiBusinessUseCaseCore", label, oid, parentoids, childoids);
}

req.figure.ChiBusinessUseCaseCore.prototype = new req.figure.RectFigure;

req.figure.ChiBusinessUseCaseCore.prototype.type = "req.figure.ChiBusinessUseCaseCore";

req.figure.ChiBusinessUseCaseCore.prototype.getGrid = function(store) {
	return new Ext.grid.GridPanel({
					columns: [{
						header: "ChiBusinessUseCaseCore",
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
					reqClassName: "ChiBusinessUseCaseCore"
				});
}

req.figure.ChiBusinessUseCaseCore.prototype.getStore = function(){
	return new Ext.data.Store({
		url: req.data.jsonUrl,
		baseParams: {
			sid: req.data.sid,
			usr_action: "list",
			response_format: "JSON",
			type: "ChiBusinessUseCaseCore"
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

req.figure.ChiBusinessUseCaseCore.prototype.showEdit = function(bd, oid){

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
		title: 'ChiBusinessUseCaseCore Edit View',
		bodyStyle: 'padding:5px 5px 0',
		width: 500,
		defaults: {
			width: 100
		},
		defaultType: 'textfield',
		items: [
							{	
			fieldLabel: 'PrimaryActor',
	        name: 'PrimaryActor',
	        
	         inputType:'textfield', //in model originally was in  select#async:Chi format
	        listeners: listeners 
	        },
			{	
			fieldLabel: 'OtherActors',
	        name: 'OtherActors',
	        
	         inputType:'textfield',
	        listeners: listeners 
	        },
			{	
			fieldLabel: 'GoalInContext',
	        name: 'GoalInContext',
	        
	         inputType:'textfield',
	        listeners: listeners 
	        },
			{	
			fieldLabel: 'Scope',
	        name: 'Scope',
	        
	         inputType:'textfield',
	        listeners: listeners 
	        },
			{	
			fieldLabel: 'Level',
	        name: 'Level',
	        
	         inputType:'textfield',
	        listeners: listeners 
	        },
			{	
			fieldLabel: 'Stakeholders',
	        name: 'Stakeholders',
	        
	         inputType:'textfield',
	        listeners: listeners 
	        },
			{	
			fieldLabel: 'Precondition',
	        name: 'Precondition',
	        
	         inputType:'textfield',
	        listeners: listeners 
	        },
			{	
			fieldLabel: 'Trigger',
	        name: 'Trigger',
	        
	         inputType:'textfield',
	        listeners: listeners 
	        },
			{	
			fieldLabel: 'MainSuccessScenario',
	        name: 'MainSuccessScenario',
	        
	         inputType:'textfield',
	        listeners: listeners 
	        },
			{	
			fieldLabel: 'Extensions',
	        name: 'Extensions',
	        
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
			
			
			realForm.findField("PrimaryActor").setValue(data.node.values[1].PrimaryActor.value);
			realForm.findField("OtherActors").setValue(data.node.values[1].OtherActors.value);
			realForm.findField("GoalInContext").setValue(data.node.values[1].GoalInContext.value);
			realForm.findField("Scope").setValue(data.node.values[1].Scope.value);
			realForm.findField("Level").setValue(data.node.values[1].Level.value);
			realForm.findField("Stakeholders").setValue(data.node.values[1].Stakeholders.value);
			realForm.findField("Precondition").setValue(data.node.values[1].Precondition.value);
			realForm.findField("Trigger").setValue(data.node.values[1].Trigger.value);
			realForm.findField("MainSuccessScenario").setValue(data.node.values[1].MainSuccessScenario.value);
			realForm.findField("Extensions").setValue(data.node.values[1].Extensions.value);
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
req.figure.ChiBusinessUseCaseCore.prototype.getConstraints = function() {
	return {
	//Parents
				
		ChiBusinessProcess: {
			label: "depends on",
			inverse: false,
			sourceMaxConns: -1,
			targetMaxConns: -1
		},
	//Children
	};
}
