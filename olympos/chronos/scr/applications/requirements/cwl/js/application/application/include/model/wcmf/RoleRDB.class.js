
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

application.application.include.model.wcmf.RoleRDB = function() {
	application.application.include.model.wcmf.RoleRDB.superclass.constructor.call(this, arguments);
	
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

Ext.extend(application.application.include.model.wcmf.RoleRDB, chi.model.ModelClass);


application.application.include.model.wcmf.RoleRDB.prototype.getGridColumns = function() {
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



application.application.include.model.wcmf.RoleRDB.prototype.getLabelColumns = function() {
	return [
	
		
			{
			    header : "name",
			    dataIndex : "name",
			    width : 100,
			    sortable : true
			}
		
	
	];
};



application.application.include.model.wcmf.RoleRDB.prototype.getEditorItems = function() {
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
 * Returns the label of an object of this Model Class.
 * 
 * @param {chi.model.ModelRecord}
 *            record The record of this Model Class to extract the label from.
 * @return The label of an object of this Model Class.
 * @type String
 */
application.application.include.model.wcmf.RoleRDB.prototype.getLabel = function(record) {
	var label = record.get("name");
	if (label == undefined || label.length == 0) {
		label = record.getOid(); 
	}
	return label;
};


chi.model.ModelClassContainer.getInstance().registerClass(new application.application.include.model.wcmf.RoleRDB());
	