
/*
 * Copyright (c) 2009 The Olympos Development Team.
 * 
 * http://sourceforge.net/projects/olympos/
 * 
 * All rights reserved. This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License v1.0 which
 * accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html. If redistributing this code, this
 * entire header must remain intact.
 */
Ext.namespace("application.application.include.model.wcmf");

application.application.include.model.wcmf.RoleRDBDescription = function() {
	application.application.include.model.wcmf.RoleRDBDescription.superclass.constructor.call(this, arguments);
	
	this.chiModelElementId = "RoleRDB";
	this.name = "RoleRDB";
	this.treeIconClass = "RoleRDBTreeIcon16x16";
	this.owningPackageId = "application.application.include.model.wcmf.Wcmf_package";
	
	
	this.recordDefinition = [
	
		{
			name : "name",
			mapping : "name"
		}
	
	
	
	
	
	
	
	
	
	];

	
	
	this.relations = {
	

	
	
	
	};

};

Ext.extend(application.application.include.model.wcmf.RoleRDBDescription, chi.model.ModelDescription);


application.application.include.model.wcmf.RoleRDBDescription.prototype.getGridColumns = function() {
	return [
	
		
			{
			    header : "name",
			    dataIndex : "name",
			    width : 100,
			    sortable : true,
			    
			    editor: 
	
			new chi.editor.control.TextField({})
	

			}
		
	
	];
};



application.application.include.model.wcmf.RoleRDBDescription.prototype.getLabelColumns = function() {
	return [
	
		
			{
			    header : "name",
			    dataIndex : "name",
			    width : 100,
			    sortable : true
			}
		
	
	];
};



application.application.include.model.wcmf.RoleRDBDescription.prototype.getEditorItems = function() {
	return [
	
		new chi.editor.control.PropertiesFieldSet({
			items: [
		
			
	
		
		new chi.editor.control.TextField({
		fieldLabel: "name",
		name: "name",
		dataIndex: "name",
		
		toolTip: ""
	}) 
	

		
		]})
		
		
	
	
	
 ];
};



/**
 * Returns the label of an object of the Model Class.
 * 
 * @param {chi.model.ModelRecord}
 *            record The record of the Model Class to extract the label from.
 * @return The label of an object of the Model Class.
 * @type String
 */
application.application.include.model.wcmf.RoleRDBDescription.prototype.getLabel = function(record) {
	var label = record.get("name");
	if (label == undefined || label.length == 0) {
		label = record.getOid(); 
	}
	return label;
};



/**
 * Returns a newly created instance of the Model Class, which inherits {chi.model.ModelRecord}.
 * 
 * @param {String}
 *            oid The object id of the instance.
 * @param {Object}
 *            data A map containing attribute names as keys and initial values
 *            as map values.
 * @return The instance of the Model Class.
 * @type {chi.model.ModelRecord}
 */
application.application.include.model.wcmf.RoleRDBDescription.prototype.createInstance = function(oid, data) {
	return new application.application.include.model.wcmf.RoleRDB(oid, data);
};


chi.model.ModelDescriptionContainer.getInstance().registerDescription(new application.application.include.model.wcmf.RoleRDBDescription());
	