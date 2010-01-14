/*
 * Copyright (c) 2009 The Olympos Development Team.
 * 
 * http://sourceforge.net/projects/olympos/
 * 
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html. If redistributing this code,
 * this entire header must remain intact.
 */
Ext.namespace("application.application.include.model.wcmf");

application.application.include.model.wcmf.UserRDBDescription = function() {
	application.application.include.model.wcmf.UserRDBDescription.superclass.constructor.call(this, arguments);
	
	this.chiModelElementId = "UserRDB";
	this.name = "UserRDB";
	this.treeIconClass = "UserRDBTreeIcon16x16";
	this.owningPackageId = "application.application.include.model.wcmf.Wcmf_package";
	
	
	this.recordDefinition = [
	
		{
			name : "login",
			mapping : "login"
		}
	, 
		{
			name : "password",
			mapping : "password"
		}
	, 
		{
			name : "name",
			mapping : "name"
		}
	, 
		{
			name : "firstname",
			mapping : "firstname"
		}
	, 
		{
			name : "config",
			mapping : "config"
		}
	
	
	
		,
	
	
	
		{
			name : "locktable",
			mapping: "locktable"
		}
	
	
	
	
	
	];

	
	
	this.relations = {
	
		"locktable" : {
			isParent : true,
			targetModelClassId : "Locktable"
		}
	

	
	
	
	};

};

Ext.extend(application.application.include.model.wcmf.UserRDBDescription, chi.model.ModelDescription);


application.application.include.model.wcmf.UserRDBDescription.prototype.getGridColumns = function() {
	return [
	
		
			{
				header : "login",
				dataIndex : "login",
				width : 100,
				sortable : true,
				
				editor: 
	
			new chi.editor.control.TextField({})
	

			}
		, 
			{
				header : "password",
				dataIndex : "password",
				width : 100,
				sortable : true,
				hidden: true,
				editor: 
	
			new chi.editor.control.PasswordField({})
	

			}
		, 
			{
				header : "name",
				dataIndex : "name",
				width : 100,
				sortable : true,
				hidden: true,
				editor: 
	
			new chi.editor.control.TextField({})
	

			}
		, 
			{
				header : "firstname",
				dataIndex : "firstname",
				width : 100,
				sortable : true,
				hidden: true,
				editor: 
	
			new chi.editor.control.TextField({})
	

			}
		, 
			{
				header : "config",
				dataIndex : "config",
				width : 100,
				sortable : true,
				hidden: true,
				editor: 
	
			new chi.editor.control.ComboBox({
				targetChiModelElementId: "g_getConfigFiles"
			})
	

			}
		
	
	];
};



application.application.include.model.wcmf.UserRDBDescription.prototype.getLabelColumns = function() {
	return [
	
		
			{
				header : "login",
				dataIndex : "login",
				width : 100,
				sortable : true
			}
		
	
	];
};



application.application.include.model.wcmf.UserRDBDescription.prototype.getEditorItems = function() {
	return [
	
		new cwe.editor.control.PropertiesFieldSet({
			items: [
		
			
	
		
		new chi.editor.control.TextField({
		fieldLabel: "login",
		name: "login",
		dataIndex: "login",
		
		toolTip: ""
	}) 
	

		, 
			
	
		
		new chi.editor.control.PasswordField({
		fieldLabel: "password",
		name: "password",
		dataIndex: "password",
		
		toolTip: ""
	}) 
	

		, 
			
	
		
		new chi.editor.control.TextField({
		fieldLabel: "name",
		name: "name",
		dataIndex: "name",
		
		toolTip: ""
	}) 
	

		, 
			
	
		
		new chi.editor.control.TextField({
		fieldLabel: "firstname",
		name: "firstname",
		dataIndex: "firstname",
		
		toolTip: ""
	}) 
	

		, 
			
	
		
		new chi.editor.control.ComboBox({
		fieldLabel: "config",
		name: "config",
		dataIndex: "config",
		targetChiModelElementId: "g_getConfigFiles",
		toolTip: ""
	}) 
	

		
		]})
		
		
			,
		
	
	
	
		new cwe.editor.control.AssociationsFieldSet({
			items: [
		
			
	
		new cwe.editor.control.MultipleAssociate( {
	
			fieldLabel : "locktable",
			name : "locktable",
			dataIndex : "locktable",
			targetChiModelElementId : "Locktable",
			isParent : true,
			aggregationKind : cwe.Constants.AggregationKind.NONE
		
	})

		
		
		
		
		
		
		]})
	
 ];
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
application.application.include.model.wcmf.UserRDBDescription.prototype.createInstance = function(oid, data) {
	return new application.application.include.model.wcmf.UserRDB(oid, data);
};


chi.model.ModelDescriptionContainer.getInstance().registerDescription(new application.application.include.model.wcmf.UserRDBDescription());
	