
/*
 This file was generated by wCMFGenerator 2.6.1.0012 from model/requirements.xmi on 27.08.08 19:43. 
  Manual modifications should be placed inside the protected regions.
   developer: Giuseppe Platania
   Version: 1.0
   Class: class.ChiBusinessPartnerPassive.js
   Description: A ChiBusinesPartnerPassive is an indirect customer (typically a supplier) of the enterprise.
  */
  


req.figure.ChiBusinessPartnerPassive = function(label) {
	req.figure.RectFigure.call(this, "Giuseppe Platania", label);
}

req.figure.ChiBusinessPartnerPassive.prototype = new req.figure.RectFigure;

req.figure.ChiBusinessPartnerPassive.prototype.type = "req.figure.ChiBusinessPartnerPassive";

req.figure.ChiBusinessPartnerPassive.prototype.getGrid = function(store) {
	return new Ext.grid.GridPanel({
					columns: [{
						header: "ChiBusinessPartnerPassive",
						dataIndex: "Name",
						sortable: true
					}],
					store: store,
					enableDragDrop: true,
					selModel: new Ext.grid.RowSelectionModel({
						singleSelect: true
					}),
					ddGroup: "gridDDGroup",
					reqClassName: "ChiBusinessPartnerPassive"
				});
}

req.figure.ChiBusinessPartnerPassive.prototype.getStore = function(url){
	return new Ext.data.Store({
		url: url + "&type=ChiBusinessPartnerPassive",
		reader: new Ext.data.JsonReader({
			totalProperty: "totalCount",
			root: "objects",
			id: "oid",
			fields: [{
				name: "Name",
				mapping: "values[1].Name.value"
			}]
		})
	});
}

req.figure.ChiBusinessPartnerPassive.prototype.showEdit = function(bd){

	Ext.form.Field.prototype.msgTarget = 'side';	
	var form = new Ext.FormPanel({
	
		labelWidth: 150,
		url: '',
		frame: true,
		title: 'ChiBusinessPartnerPassive Edit View',
		bodyStyle: 'padding:5px 5px 0',
		width: 500,
		defaults: {
			width: 230
		},
		defaultType: 'textfield',
		items: [
					{	
			fieldLabel: 'Alias',
	        name: 'Alias',
	        
	        allowBlank:false,	        
	        inputType:'textfield', 
	        },
			{	
			fieldLabel: 'Version',
	        name: 'Version',
	        
	        allowBlank:false,	        
	        inputType:'textfield', 
	        },
			{	
			fieldLabel: 'Name',
	        name: 'Name',
	        
	        allowBlank:false,	        
	        inputType:'textfield', 
	        },
			{	
			fieldLabel: 'Notes',
	        name: 'Notes',
	        
	        allowBlank:false,	        
	        inputType:'htmleditor', 
	        },
			{	
			fieldLabel: 'created',
	        name: 'created',
	        readOnly:true,
	        allowBlank:false,	        
	        inputType:'textfield', 
	        },
			{	
			fieldLabel: 'creator',
	        name: 'creator',
	        readOnly:true,
	        allowBlank:false,	        
	        inputType:'textfield', 
	        },
			{	
			fieldLabel: 'last_editor',
	        name: 'last_editor',
	        readOnly:true,
	        allowBlank:false,	        
	        inputType:'textfield', 
	        },
			{	
			fieldLabel: 'modified',
	        name: 'modified',
	        readOnly:true,
	        allowBlank:false,	        
	        inputType:'textfield', 
	        },


				],
		buttons: [{
			text: 'Save',
			handler: function(){
				form.getForm().submit({
					url: 'main.php',
					method: 'POST',
					success: function(form, action){
						alert('Success: ' + action.response.responseText);
					},
					failure: function(form, action){
						alert('Failure: ' + action.failureType);
					}
				});
			}
		}, {
			text: 'Cancel',
			handler: function(){
				form.getForm().reset();
			}
		}]
	});
	
	form.render(bd);
};

req.figure.ChiBusinessPartnerPassive.prototype.getConstraints = function() {
	return {
		
		Package: {
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
	};
}
