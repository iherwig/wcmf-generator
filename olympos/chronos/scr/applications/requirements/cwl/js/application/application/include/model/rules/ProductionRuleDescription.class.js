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
Ext.namespace("application.application.include.model.rules");

application.application.include.model.rules.ProductionRuleDescription = function() {
	application.application.include.model.rules.ProductionRuleDescription.superclass.constructor.call(this, arguments);
	
	this.chiModelElementId = "ProductionRule";
	this.name = "ProductionRule";
	this.treeIconClass = "ProductionRuleTreeIcon16x16";
	this.owningPackageId = "application.application.include.model.rules.Rules_package";
	
	
	this.recordDefinition = [
	
		{
			name : "priority",
			mapping : "priority"
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
			name : "ruleAction",
			mapping: "ruleAction"
		}
	, 
		{
			name : "ruleCondition",
			mapping: "ruleCondition"
		}
	, 
		{
			name : "ruleVariable",
			mapping: "ruleVariable"
		}
	, 
		{
			name : "figure",
			mapping: "figure"
		}
	
	
	
		,
	
	
	
		{
			name : "productionRuleSet",
			mapping : "productionRuleSet"
		}
	, 
		{
			name : "package",
			mapping : "package"
		}
	
	];

	
	
	this.relations = {
	
		"ruleAction" : {
			isParent : true,
			targetModelClassId : "RuleAction"
		}
	, 
		"ruleCondition" : {
			isParent : true,
			targetModelClassId : "RuleCondition"
		}
	, 
		"ruleVariable" : {
			isParent : true,
			targetModelClassId : "RuleVariable"
		}
	, 
		"figure" : {
			isParent : true,
			targetModelClassId : "Figure"
		}
	

	
		,
	
	
	
		"productionRuleSet" : {
			isParent : false,
			targetModelClassId : "ProductionRuleSet"
		}
	, 
		"package" : {
			isParent : false,
			targetModelClassId : "Package"
		}
	
	};

};

Ext.extend(application.application.include.model.rules.ProductionRuleDescription, chi.model.ModelDescription);


application.application.include.model.rules.ProductionRuleDescription.prototype.getGridColumns = function() {
	return [
	
		
			{
			    header : "priority",
			    dataIndex : "priority",
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



application.application.include.model.rules.ProductionRuleDescription.prototype.getLabelColumns = function() {
	return [
	
		
	
	];
};



application.application.include.model.rules.ProductionRuleDescription.prototype.getEditorItems = function() {
	return [
	
		new chi.editor.control.PropertiesFieldSet({
			items: [
		
			
	
		
		new chi.editor.control.TextField({
		fieldLabel: "priority",
		name: "priority",
		dataIndex: "priority",
		
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
		
			
	
		new chi.editor.control.MultipleAssociate( {
	
			fieldLabel : "ruleAction",
			name : "ruleAction",
			dataIndex : "ruleAction",
			targetChiModelElementId : "RuleAction",
			isParent : true,
			aggregationKind : chi.Constants.AggregationKind.NONE
		
	})

		, 
			
	
		new chi.editor.control.SingleAssociate( {
	
			fieldLabel : "ruleCondition",
			name : "ruleCondition",
			dataIndex : "ruleCondition",
			targetChiModelElementId : "RuleCondition",
			isParent : true,
			aggregationKind : chi.Constants.AggregationKind.NONE
		
	})

		, 
			
	
		new chi.editor.control.MultipleAssociate( {
	
			fieldLabel : "ruleVariable",
			name : "ruleVariable",
			dataIndex : "ruleVariable",
			targetChiModelElementId : "RuleVariable",
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
	
			fieldLabel : "productionRuleSet",
			name : "productionRuleSet",
			dataIndex : "productionRuleSet",
			targetChiModelElementId : "ProductionRuleSet",
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
application.application.include.model.rules.ProductionRuleDescription.prototype.createInstance = function(oid, data) {
	return new application.application.include.model.rules.ProductionRule(oid, data);
};


chi.model.ModelDescriptionContainer.getInstance().registerDescription(new application.application.include.model.rules.ProductionRuleDescription());
	