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
Ext.namespace("application.application.include.model.activity");

application.application.include.model.activity.ChiObjectDescription = function() {
	application.application.include.model.activity.ChiObjectDescription.superclass.constructor.call(this, arguments);
	
	this.chiModelElementId = "ChiObject";
	this.name = "ChiObject";
	this.treeIconClass = "ChiObjectTreeIcon16x16";
	this.owningPackageId = "application.application.include.model.activity.Activity_package";
	
	
	this.recordDefinition = [
	
		{
			name : "objectStatus",
			mapping : "objectStatus"
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
			name : "productionRuleSet",
			mapping: "productionRuleSet"
		}
	, 
		{
			name : "figure",
			mapping: "figure"
		}
	
	
	
		,
	
	
	
		{
			name : "activitySet",
			mapping : "activitySet"
		}
	, 
		{
			name : "chiNode",
			mapping : "chiNode"
		}
	, 
		{
			name : "package",
			mapping : "package"
		}
	, 
		{
			name : "chiNodeManyToMany",
			mapping : "chiNodeManyToMany"
		}
	
	];

	
	
	this.relations = {
	
		"productionRuleSet" : {
			isParent : true,
			targetModelClassId : "ProductionRuleSet"
		}
	, 
		"figure" : {
			isParent : true,
			targetModelClassId : "Figure"
		}
	

	
		,
	
	
	
		"activitySet" : {
			isParent : false,
			targetModelClassId : "ActivitySet"
		}
	, 
		"chiNode" : {
			isParent : false,
			targetModelClassId : "ChiNode"
		}
	, 
		"package" : {
			isParent : false,
			targetModelClassId : "Package"
		}
	, 
		"chiNodeManyToMany" : {
			isParent : false,
			targetModelClassId : "ChiNodeManyToMany"
		}
	
	};

};

Ext.extend(application.application.include.model.activity.ChiObjectDescription, chi.model.ModelDescription);


application.application.include.model.activity.ChiObjectDescription.prototype.getGridColumns = function() {
	return [
	
		
			{
			    header : "objectStatus",
			    dataIndex : "objectStatus",
			    width : 100,
			    sortable : true,
			    hidden: true,
			    editor: 
	
			new chi.editor.control.TextField({})
	

			}
		, 
			{
			    header : "status",
			    dataIndex : "status",
			    width : 100,
			    sortable : true,
			    
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



application.application.include.model.activity.ChiObjectDescription.prototype.getLabelColumns = function() {
	return [
	
		
			{
			    header : "status",
			    dataIndex : "status",
			    width : 100,
			    sortable : true
			}
		
	
	];
};



application.application.include.model.activity.ChiObjectDescription.prototype.getEditorItems = function() {
	return [
	
		new chi.editor.control.PropertiesFieldSet({
			items: [
		
			
	
		
		new chi.editor.control.TextField({
		fieldLabel: "objectStatus",
		name: "objectStatus",
		dataIndex: "objectStatus",
		
		toolTip: ""
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
		
			
	
		new chi.editor.control.SingleAssociate( {
	
			fieldLabel : "productionRuleSet",
			name : "productionRuleSet",
			dataIndex : "productionRuleSet",
			targetChiModelElementId : "ProductionRuleSet",
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
		
		
		
			
	
		new chi.editor.control.SingleAssociate( {
	
			fieldLabel : "activitySet",
			name : "activitySet",
			dataIndex : "activitySet",
			targetChiModelElementId : "ActivitySet",
			isParent : false,
			aggregationKind : chi.Constants.AggregationKind.COMPOSITE
		
	})

		, 
			
	
		new chi.editor.control.SingleAssociate( {
	
			fieldLabel : "chiNode",
			name : "chiNode",
			dataIndex : "chiNode",
			targetChiModelElementId : "ChiNode",
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
	
			fieldLabel : "chiNodeManyToMany",
			name : "chiNodeManyToMany",
			dataIndex : "chiNodeManyToMany",
			targetChiModelElementId : "ChiNodeManyToMany",
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
application.application.include.model.activity.ChiObjectDescription.prototype.getLabel = function(record) {
	var label = record.get("Name") + " - " + record.get("object_status");
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
application.application.include.model.activity.ChiObjectDescription.prototype.createInstance = function(oid, data) {
	return new application.application.include.model.activity.ChiObject(oid, data);
};


chi.model.ModelDescriptionContainer.getInstance().registerDescription(new application.application.include.model.activity.ChiObjectDescription());
	