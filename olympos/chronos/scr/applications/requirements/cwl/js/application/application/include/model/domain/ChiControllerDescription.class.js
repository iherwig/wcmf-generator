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
Ext.namespace("application.application.include.model.domain");

application.application.include.model.domain.ChiControllerDescription = function() {
	application.application.include.model.domain.ChiControllerDescription.superclass.constructor.call(this, arguments);
	
	this.chiModelElementId = "ChiController";
	this.name = "ChiController";
	this.treeIconClass = "ChiControllerTreeIcon16x16";
	this.owningPackageId = "application.application.include.model.domain.Domain_package";
	
	
	this.recordDefinition = [
	
		{
			name : "visibility",
			mapping : "visibility"
		}
	, 
		{
			name : "isAbstract",
			mapping : "isAbstract"
		}
	, 
		{
			name : "status",
			mapping : "status"
		}
	, 
		{
			name : "alias",
			mapping : "alias"
		}
	, 
		{
			name : "author",
			mapping : "author"
		}
	, 
		{
			name : "version",
			mapping : "version"
		}
	, 
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
			name : "property",
			mapping: "property"
		}
	, 
		{
			name : "chiNode",
			mapping: "chiNode"
		}
	, 
		{
			name : "operation",
			mapping: "operation"
		}
	, 
		{
			name : "figure",
			mapping: "figure"
		}
	, 
		{
			name : "chiValue",
			mapping: "chiValue"
		}
	, 
		{
			name : "chiNodeManyToMany",
			mapping: "chiNodeManyToMany"
		}
	
	
	
		,
	
	
	
		{
			name : "chiBusinessUseCase",
			mapping : "chiBusinessUseCase"
		}
	, 
		{
			name : "package",
			mapping : "package"
		}
	, 
		{
			name : "chiBusinessUseCaseCore",
			mapping : "chiBusinessUseCaseCore"
		}
	
	];

	
	
	this.relations = {
	
		"property" : {
			isParent : true,
			targetModelClassId : "Property"
		}
	, 
		"chiNode" : {
			isParent : true,
			targetModelClassId : "ChiNode"
		}
	, 
		"operation" : {
			isParent : true,
			targetModelClassId : "Operation"
		}
	, 
		"figure" : {
			isParent : true,
			targetModelClassId : "Figure"
		}
	, 
		"chiValue" : {
			isParent : true,
			targetModelClassId : "ChiValue"
		}
	, 
		"chiNodeManyToMany" : {
			isParent : true,
			targetModelClassId : "ChiNodeManyToMany"
		}
	

	
		,
	
	
	
		"chiBusinessUseCase" : {
			isParent : false,
			targetModelClassId : "ChiBusinessUseCase"
		}
	, 
		"package" : {
			isParent : false,
			targetModelClassId : "Package"
		}
	, 
		"chiBusinessUseCaseCore" : {
			isParent : false,
			targetModelClassId : "ChiBusinessUseCaseCore"
		}
	
	};

};

Ext.extend(application.application.include.model.domain.ChiControllerDescription, chi.model.ModelDescription);


application.application.include.model.domain.ChiControllerDescription.prototype.getGridColumns = function() {
	return [
	
		
			{
			    header : "visibility",
			    dataIndex : "visibility",
			    width : 100,
			    sortable : true,
			    hidden: true,
			    editor: 
	
			new chi.editor.control.ComboBox({
				targetCweModelElementId: "Visibility"
			})
	

			}
		, 
			{
			    header : "isAbstract",
			    dataIndex : "isAbstract",
			    width : 100,
			    sortable : true,
			    hidden: true,
			    editor: 
	
			new chi.editor.control.StaticComboBox({
				data: [["true","true"],["false","false"]]
			})
	

			}
		, 
			{
			    header : "status",
			    dataIndex : "status",
			    width : 100,
			    sortable : true,
			    hidden: true,
			    editor: 
	
			new chi.editor.control.ComboBox({
				targetCweModelElementId: "ChiBaseStatus"
			})
	

			}
		, 
			{
			    header : "alias",
			    dataIndex : "alias",
			    width : 100,
			    sortable : true,
			    hidden: true,
			    editor: 
	
			new chi.editor.control.TextField({})
	

			}
		, 
			{
			    header : "author",
			    dataIndex : "author",
			    width : 100,
			    sortable : true,
			    hidden: true,
			    editor: 
	
			new chi.editor.control.ComboBox({
				targetCweModelElementId: "ChiAuthors"
			})
	

			}
		, 
			{
			    header : "version",
			    dataIndex : "version",
			    width : 100,
			    sortable : true,
			    hidden: true,
			    editor: 
	
			new chi.editor.control.TextField({})
	

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
			    header : "notes",
			    dataIndex : "notes",
			    width : 100,
			    sortable : true,
			    hidden: true,
			    editor: 
	
			new chi.modelgrid.DummyField()
	

			}
		, 
			{
			    header : "created",
			    dataIndex : "created",
			    width : 100,
			    sortable : true,
			    hidden: true,
			    editor: 
	
			new chi.modelgrid.DummyField()
	

			}
		, 
			{
			    header : "creator",
			    dataIndex : "creator",
			    width : 100,
			    sortable : true,
			    hidden: true,
			    editor: 
	
			new chi.modelgrid.DummyField()
	

			}
		, 
			{
			    header : "lastEditor",
			    dataIndex : "lastEditor",
			    width : 100,
			    sortable : true,
			    hidden: true,
			    editor: 
	
			new chi.modelgrid.DummyField()
	

			}
		, 
			{
			    header : "modified",
			    dataIndex : "modified",
			    width : 100,
			    sortable : true,
			    hidden: true,
			    editor: 
	
			new chi.modelgrid.DummyField()
	

			}
		
	
	];
};



application.application.include.model.domain.ChiControllerDescription.prototype.getLabelColumns = function() {
	return [
	
		
	
	];
};



application.application.include.model.domain.ChiControllerDescription.prototype.getEditorItems = function() {
	return [
	
		new chi.editor.control.PropertiesFieldSet({
			items: [
		
			
	
		
		new chi.editor.control.ComboBox({
		fieldLabel: "visibility",
		name: "visibility",
		dataIndex: "visibility",
		targetCweModelElementId: "Visibility",
		toolTip: "the visibility of this class (Public, Private, Protected, Package)"
	}) 
	

		, 
			
	
		
		new chi.editor.control.StaticComboBox({
		fieldLabel: "isAbstract",
		name: "isAbstract",
		dataIndex: "isAbstract",
		data: [["true","true"],["false","false"]],
		toolTip: "if this type reppresent an abstract type only."
	}) 
	

		, 
			
	
		
		new chi.editor.control.ComboBox({
		fieldLabel: "status",
		name: "status",
		dataIndex: "status",
		targetCweModelElementId: "ChiBaseStatus",
		toolTip: ""
	}) 
	

		, 
			
	
		
		new chi.editor.control.TextField({
		fieldLabel: "alias",
		name: "alias",
		dataIndex: "alias",
		
		toolTip: "the Project Id of this object."
	}) 
	

		, 
			
	
		
		new chi.editor.control.ComboBox({
		fieldLabel: "author",
		name: "author",
		dataIndex: "author",
		targetCweModelElementId: "ChiAuthors",
		toolTip: ""
	}) 
	

		, 
			
	
		
		new chi.editor.control.TextField({
		fieldLabel: "version",
		name: "version",
		dataIndex: "version",
		
		toolTip: "the model version of this object"
	}) 
	

		, 
			
	
		
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
		
	
	
	
		new chi.editor.control.AssociationsFieldSet({
			items: [
		
			
	
		new chi.editor.control.MultipleAssociate( {
	
			fieldLabel : "property",
			name : "property",
			dataIndex : "property",
			targetChiModelElementId : "Property",
			isParent : true,
			aggregationKind : chi.Constants.AggregationKind.NONE
		
	})

		, 
			
	
		new chi.editor.control.MultipleAssociate( {
	
			fieldLabel : "chiNode",
			name : "chiNode",
			dataIndex : "chiNode",
			targetChiModelElementId : "ChiNode",
			isParent : true,
			aggregationKind : chi.Constants.AggregationKind.NONE
		
	})

		, 
			
	
		new chi.editor.control.MultipleAssociate( {
	
			fieldLabel : "operation",
			name : "operation",
			dataIndex : "operation",
			targetChiModelElementId : "Operation",
			isParent : true,
			aggregationKind : chi.Constants.AggregationKind.NONE
		
	})

		, 
			
	
		new chi.editor.control.MultipleAssociate( {
	
			fieldLabel : "figure",
			name : "figure",
			dataIndex : "figure",
			targetChiModelElementId : "Figure",
			isParent : true,
			aggregationKind : chi.Constants.AggregationKind.NONE
		
	})

		, 
			
	
		new chi.editor.control.MultipleAssociate( {
	
			fieldLabel : "chiValue",
			name : "chiValue",
			dataIndex : "chiValue",
			targetChiModelElementId : "ChiValue",
			isParent : true,
			aggregationKind : chi.Constants.AggregationKind.NONE
		
	})

		, 
			
	
		new chi.editor.control.MultipleAssociate( {
	
			fieldLabel : "chiNodeManyToMany",
			name : "chiNodeManyToMany",
			dataIndex : "chiNodeManyToMany",
			targetChiModelElementId : "ChiNodeManyToMany",
			isParent : true,
			aggregationKind : chi.Constants.AggregationKind.NONE
		
	})

		
		
		
			,
		
		
		
			
	
		new chi.editor.control.SingleAssociate( {
	
			fieldLabel : "chiBusinessUseCase",
			name : "chiBusinessUseCase",
			dataIndex : "chiBusinessUseCase",
			targetChiModelElementId : "ChiBusinessUseCase",
			isParent : false,
			aggregationKind : chi.Constants.AggregationKind.COMPOSITE
		
	})

		, 
			
	
		new chi.editor.control.SingleAssociate( {
	
			fieldLabel : "package",
			name : "package",
			dataIndex : "package",
			targetChiModelElementId : "Package",
			isParent : false,
			aggregationKind : chi.Constants.AggregationKind.SHARED
		
	})

		, 
			
	
		new chi.editor.control.SingleAssociate( {
	
			fieldLabel : "chiBusinessUseCaseCore",
			name : "chiBusinessUseCaseCore",
			dataIndex : "chiBusinessUseCaseCore",
			targetChiModelElementId : "ChiBusinessUseCaseCore",
			isParent : false,
			aggregationKind : chi.Constants.AggregationKind.COMPOSITE
		
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
application.application.include.model.domain.ChiControllerDescription.prototype.getLabel = function(record) {
	var label = record.get("Name");
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
application.application.include.model.domain.ChiControllerDescription.prototype.createInstance = function(oid, data) {
	return new application.application.include.model.domain.ChiController(oid, data);
};


chi.model.ModelDescriptionContainer.getInstance().registerDescription(new application.application.include.model.domain.ChiControllerDescription());
	