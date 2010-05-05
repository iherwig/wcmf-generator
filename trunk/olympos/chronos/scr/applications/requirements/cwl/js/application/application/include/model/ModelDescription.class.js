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
Ext.namespace("application.application.include.model");

application.application.include.model.ModelDescription = function() {
	application.application.include.model.ModelDescription.superclass.constructor.call(this, arguments);
	
	this.chiModelElementId = "Model";
	this.name = "Model";
	this.treeIconClass = "ModelTreeIcon16x16";
	this.owningPackageId = "application.application.include.model.Model_package";
	
	
	this.recordDefinition = [
	
		{
			name : "name",
			mapping : "name"
		}
	, 
		{
			name : "notes",
			mapping : "notes"
		}
	, 
		{
			name : "created",
			mapping : "created"
		}
	, 
		{
			name : "creator",
			mapping : "creator"
		}
	, 
		{
			name : "lastEditor",
			mapping : "lastEditor"
		}
	, 
		{
			name : "modified",
			mapping : "modified"
		}
	
	
	
		,
	
	
	
		{
			name : "package",
			mapping: "package"
		}
	
	
	
	
	
	];

	
	
	this.relations = {
	
		"package" : {
			isParent : true,
			targetModelClassId : "Package"
		}
	

	
	
	
	};

};

Ext.extend(application.application.include.model.ModelDescription, chi.model.ModelDescription);


application.application.include.model.ModelDescription.prototype.getGridColumns = function() {
	return [
	
		
			{
				header : "name",
				dataIndex : "name",
				width : 100,
				sortable : true,
				
				editor: 
	
			new chi.editor.control.TextField({})
	

			}
		, 
			{
				header : "notes",
				dataIndex : "notes",
				width : 100,
				sortable : true,
				hidden: true,
				editor: 
	
			new cwe.modelgrid.DummyField()
	

			}
		, 
			{
				header : "created",
				dataIndex : "created",
				width : 100,
				sortable : true,
				hidden: true,
				editor: 
	
			new cwe.modelgrid.DummyField()
	

			}
		, 
			{
				header : "creator",
				dataIndex : "creator",
				width : 100,
				sortable : true,
				hidden: true,
				editor: 
	
			new cwe.modelgrid.DummyField()
	

			}
		, 
			{
				header : "lastEditor",
				dataIndex : "lastEditor",
				width : 100,
				sortable : true,
				hidden: true,
				editor: 
	
			new cwe.modelgrid.DummyField()
	

			}
		, 
			{
				header : "modified",
				dataIndex : "modified",
				width : 100,
				sortable : true,
				hidden: true,
				editor: 
	
			new cwe.modelgrid.DummyField()
	

			}
		
	
	];
};



application.application.include.model.ModelDescription.prototype.getLabelColumns = function() {
	return [
	
		
			{
				header : "name",
				dataIndex : "name",
				width : 100,
				sortable : true
			}
		
	
	];
};



application.application.include.model.ModelDescription.prototype.getEditorItems = function() {
	return [
	
		new cwe.editor.control.PropertiesFieldSet({
			items: [
		
			
	
		
		new chi.editor.control.TextField({
		fieldLabel: "name",
		name: "name",
		dataIndex: "name",
		
		toolTip: "the name of this object."
	}) 
	

		, 
			
	
		
		new chi.editor.control.HtmlEditor({
		fieldLabel: "notes",
		name: "notes",
		dataIndex: "notes",
		
		toolTip: "the actual description of the object."
	}) 
	

		, 
			
	
		
			new chi.editor.control.DisplayField({
		fieldLabel: "created",
		name: "created",
		dataIndex: "created",
		
		toolTip: "the creation date of this object"
	}) 
	

		, 
			
	
		
			new chi.editor.control.DisplayField({
		fieldLabel: "creator",
		name: "creator",
		dataIndex: "creator",
		
		toolTip: "the user that created this object"
	}) 
	

		, 
			
	
		
			new chi.editor.control.DisplayField({
		fieldLabel: "lastEditor",
		name: "lastEditor",
		dataIndex: "lastEditor",
		
		toolTip: "the last user that edited this object"
	}) 
	

		, 
			
	
		
			new chi.editor.control.DisplayField({
		fieldLabel: "modified",
		name: "modified",
		dataIndex: "modified",
		
		toolTip: "the date when this object was modified"
	}) 
	

		
		]})
		
		
			,
		
	
	
	
		new cwe.editor.control.AssociationsFieldSet({
			items: [
		
			
	
		new cwe.editor.control.MultipleAssociate( {
	
			fieldLabel : "package",
			name : "package",
			dataIndex : "package",
			targetChiModelElementId : "Package",
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
application.application.include.model.ModelDescription.prototype.createInstance = function(oid, data) {
	return new application.application.include.model.Model(oid, data);
};


chi.model.ModelDescriptionContainer.getInstance().registerDescription(new application.application.include.model.ModelDescription());
	