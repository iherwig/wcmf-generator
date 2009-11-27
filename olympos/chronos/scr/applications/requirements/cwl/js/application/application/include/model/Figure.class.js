
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
Ext.namespace("application.application.include.model");

application.application.include.model.Figure = function() {
	application.application.include.model.Figure.superclass.constructor.call(this, arguments);
	
	this.chiModelElementId = "Figure";
	this.name = "Figure";
	this.treeIconClass = "FigureTreeIcon16x16";
	this.owningPackageId = "application.application.include.model.Model_package";
	
	
	this.recordDefinition = [
	
		{
			name : "backgroundColor",
			mapping : "backgroundColor"
		}
	, 
		{
			name : "foregroundColor",
			mapping : "foregroundColor"
		}
	, 
		{
			name : "gID",
			mapping : "gID"
		}
	, 
		{
			name : "height",
			mapping : "height"
		}
	, 
		{
			name : "positionY",
			mapping : "positionY"
		}
	, 
		{
			name : "positionX",
			mapping : "positionX"
		}
	, 
		{
			name : "width",
			mapping : "width"
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
			name : "activitySet",
			mapping : "activitySet"
		}
	, 
		{
			name : "diagram",
			mapping : "diagram"
		}
	, 
		{
			name : "glossary",
			mapping : "glossary"
		}
	, 
		{
			name : "property",
			mapping : "property"
		}
	, 
		{
			name : "chiValue",
			mapping : "chiValue"
		}
	, 
		{
			name : "chiClass",
			mapping : "chiClass"
		}
	, 
		{
			name : "chiView",
			mapping : "chiView"
		}
	, 
		{
			name : "chiController",
			mapping : "chiController"
		}
	, 
		{
			name : "chiNode",
			mapping : "chiNode"
		}
	, 
		{
			name : "chiNodeManyToMany",
			mapping : "chiNodeManyToMany"
		}
	, 
		{
			name : "operation",
			mapping : "operation"
		}
	, 
		{
			name : "chiIssue",
			mapping : "chiIssue"
		}
	, 
		{
			name : "chiFeature",
			mapping : "chiFeature"
		}
	, 
		{
			name : "chiRequirement",
			mapping : "chiRequirement"
		}
	, 
		{
			name : "chiGoal",
			mapping : "chiGoal"
		}
	, 
		{
			name : "chiBusinessUseCase",
			mapping : "chiBusinessUseCase"
		}
	, 
		{
			name : "chiBusinessUseCaseCore",
			mapping : "chiBusinessUseCaseCore"
		}
	, 
		{
			name : "chiBusinessProcess",
			mapping : "chiBusinessProcess"
		}
	, 
		{
			name : "actor",
			mapping : "actor"
		}
	, 
		{
			name : "chiBusinessPartner",
			mapping : "chiBusinessPartner"
		}
	, 
		{
			name : "chiBusinessPartnerPassive",
			mapping : "chiBusinessPartnerPassive"
		}
	, 
		{
			name : "chiBusinessPartnerActive",
			mapping : "chiBusinessPartnerActive"
		}
	, 
		{
			name : "chiWorker",
			mapping : "chiWorker"
		}
	, 
		{
			name : "chiWorkerInternal",
			mapping : "chiWorkerInternal"
		}
	, 
		{
			name : "chiWorkerExternal",
			mapping : "chiWorkerExternal"
		}
	, 
		{
			name : "ruleVariable",
			mapping : "ruleVariable"
		}
	, 
		{
			name : "ruleSetVariable",
			mapping : "ruleSetVariable"
		}
	, 
		{
			name : "ruleCondition",
			mapping : "ruleCondition"
		}
	, 
		{
			name : "ruleAction",
			mapping : "ruleAction"
		}
	, 
		{
			name : "productionRuleSet",
			mapping : "productionRuleSet"
		}
	, 
		{
			name : "productionRule",
			mapping : "productionRule"
		}
	, 
		{
			name : "chiSystem",
			mapping : "chiSystem"
		}
	, 
		{
			name : "activityFinal",
			mapping : "activityFinal"
		}
	, 
		{
			name : "activityInitial",
			mapping : "activityInitial"
		}
	, 
		{
			name : "activitySend",
			mapping : "activitySend"
		}
	, 
		{
			name : "activityReceive",
			mapping : "activityReceive"
		}
	, 
		{
			name : "activityDecision",
			mapping : "activityDecision"
		}
	, 
		{
			name : "activity",
			mapping : "activity"
		}
	, 
		{
			name : "chiObject",
			mapping : "chiObject"
		}
	
	];

	
	
	this.relations = {
	

	
	
	
		"activitySet" : {
			isParent : false,
			targetModelClassId : "ActivitySet"
		}
	, 
		"diagram" : {
			isParent : false,
			targetModelClassId : "Diagram"
		}
	, 
		"glossary" : {
			isParent : false,
			targetModelClassId : "Glossary"
		}
	, 
		"property" : {
			isParent : false,
			targetModelClassId : "Property"
		}
	, 
		"chiValue" : {
			isParent : false,
			targetModelClassId : "ChiValue"
		}
	, 
		"chiClass" : {
			isParent : false,
			targetModelClassId : "ChiClass"
		}
	, 
		"chiView" : {
			isParent : false,
			targetModelClassId : "ChiView"
		}
	, 
		"chiController" : {
			isParent : false,
			targetModelClassId : "ChiController"
		}
	, 
		"chiNode" : {
			isParent : false,
			targetModelClassId : "ChiNode"
		}
	, 
		"chiNodeManyToMany" : {
			isParent : false,
			targetModelClassId : "ChiNodeManyToMany"
		}
	, 
		"operation" : {
			isParent : false,
			targetModelClassId : "Operation"
		}
	, 
		"chiIssue" : {
			isParent : false,
			targetModelClassId : "ChiIssue"
		}
	, 
		"chiFeature" : {
			isParent : false,
			targetModelClassId : "ChiFeature"
		}
	, 
		"chiRequirement" : {
			isParent : false,
			targetModelClassId : "ChiRequirement"
		}
	, 
		"chiGoal" : {
			isParent : false,
			targetModelClassId : "ChiGoal"
		}
	, 
		"chiBusinessUseCase" : {
			isParent : false,
			targetModelClassId : "ChiBusinessUseCase"
		}
	, 
		"chiBusinessUseCaseCore" : {
			isParent : false,
			targetModelClassId : "ChiBusinessUseCaseCore"
		}
	, 
		"chiBusinessProcess" : {
			isParent : false,
			targetModelClassId : "ChiBusinessProcess"
		}
	, 
		"actor" : {
			isParent : false,
			targetModelClassId : "Actor"
		}
	, 
		"chiBusinessPartner" : {
			isParent : false,
			targetModelClassId : "ChiBusinessPartner"
		}
	, 
		"chiBusinessPartnerPassive" : {
			isParent : false,
			targetModelClassId : "ChiBusinessPartnerPassive"
		}
	, 
		"chiBusinessPartnerActive" : {
			isParent : false,
			targetModelClassId : "ChiBusinessPartnerActive"
		}
	, 
		"chiWorker" : {
			isParent : false,
			targetModelClassId : "ChiWorker"
		}
	, 
		"chiWorkerInternal" : {
			isParent : false,
			targetModelClassId : "ChiWorkerInternal"
		}
	, 
		"chiWorkerExternal" : {
			isParent : false,
			targetModelClassId : "ChiWorkerExternal"
		}
	, 
		"ruleVariable" : {
			isParent : false,
			targetModelClassId : "RuleVariable"
		}
	, 
		"ruleSetVariable" : {
			isParent : false,
			targetModelClassId : "RuleSetVariable"
		}
	, 
		"ruleCondition" : {
			isParent : false,
			targetModelClassId : "RuleCondition"
		}
	, 
		"ruleAction" : {
			isParent : false,
			targetModelClassId : "RuleAction"
		}
	, 
		"productionRuleSet" : {
			isParent : false,
			targetModelClassId : "ProductionRuleSet"
		}
	, 
		"productionRule" : {
			isParent : false,
			targetModelClassId : "ProductionRule"
		}
	, 
		"chiSystem" : {
			isParent : false,
			targetModelClassId : "ChiSystem"
		}
	, 
		"activityFinal" : {
			isParent : false,
			targetModelClassId : "ActivityFinal"
		}
	, 
		"activityInitial" : {
			isParent : false,
			targetModelClassId : "ActivityInitial"
		}
	, 
		"activitySend" : {
			isParent : false,
			targetModelClassId : "ActivitySend"
		}
	, 
		"activityReceive" : {
			isParent : false,
			targetModelClassId : "ActivityReceive"
		}
	, 
		"activityDecision" : {
			isParent : false,
			targetModelClassId : "ActivityDecision"
		}
	, 
		"activity" : {
			isParent : false,
			targetModelClassId : "Activity"
		}
	, 
		"chiObject" : {
			isParent : false,
			targetModelClassId : "ChiObject"
		}
	
	};

};

Ext.extend(application.application.include.model.Figure, chi.model.ModelClass);


application.application.include.model.Figure.prototype.getGridColumns = function() {
	return [
	
		
			{
			    header : "backgroundColor",
			    dataIndex : "backgroundColor",
			    width : 100,
			    sortable : true,
			    hidden: true,
			    editor: 
	
			new chi.editor.control.TextField({})
	

			}
		, 
			{
			    header : "foregroundColor",
			    dataIndex : "foregroundColor",
			    width : 100,
			    sortable : true,
			    hidden: true,
			    editor: 
	
			new chi.editor.control.TextField({})
	

			}
		, 
			{
			    header : "gID",
			    dataIndex : "gID",
			    width : 100,
			    sortable : true,
			    hidden: true,
			    editor: 
	
			new chi.editor.control.TextField({})
	

			}
		, 
			{
			    header : "height",
			    dataIndex : "height",
			    width : 100,
			    sortable : true,
			    hidden: true,
			    editor: 
	
			new chi.editor.control.TextField({})
	

			}
		, 
			{
			    header : "positionY",
			    dataIndex : "positionY",
			    width : 100,
			    sortable : true,
			    hidden: true,
			    editor: 
	
			new chi.editor.control.TextField({})
	

			}
		, 
			{
			    header : "positionX",
			    dataIndex : "positionX",
			    width : 100,
			    sortable : true,
			    hidden: true,
			    editor: 
	
			new chi.editor.control.TextField({})
	

			}
		, 
			{
			    header : "width",
			    dataIndex : "width",
			    width : 100,
			    sortable : true,
			    hidden: true,
			    editor: 
	
			new chi.editor.control.TextField({})
	

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



application.application.include.model.Figure.prototype.getLabelColumns = function() {
	return [
	
		
	
	];
};



application.application.include.model.Figure.prototype.getEditorItems = function() {
	return [
	
		new chi.editor.control.PropertiesFieldSet({
			items: [
		
			
	
		
		new chi.editor.control.TextField({
		fieldLabel: "backgroundColor",
		name: "backgroundColor",
		dataIndex: "backgroundColor",
		
		toolTip: "the background color in RBG"
	}) 
	

		, 
			
	
		
		new chi.editor.control.TextField({
		fieldLabel: "foregroundColor",
		name: "foregroundColor",
		dataIndex: "foregroundColor",
		
		toolTip: "the foreground color in RBG"
	}) 
	

		, 
			
	
		
		new chi.editor.control.TextField({
		fieldLabel: "gID",
		name: "gID",
		dataIndex: "gID",
		
		toolTip: ""
	}) 
	

		, 
			
	
		
		new chi.editor.control.TextField({
		fieldLabel: "height",
		name: "height",
		dataIndex: "height",
		
		toolTip: ""
	}) 
	

		, 
			
	
		
		new chi.editor.control.TextField({
		fieldLabel: "positionY",
		name: "positionY",
		dataIndex: "positionY",
		
		toolTip: "the orizontal position of this object"
	}) 
	

		, 
			
	
		
		new chi.editor.control.TextField({
		fieldLabel: "positionX",
		name: "positionX",
		dataIndex: "positionX",
		
		toolTip: "the vertical position of this object"
	}) 
	

		, 
			
	
		
		new chi.editor.control.TextField({
		fieldLabel: "width",
		name: "width",
		dataIndex: "width",
		
		toolTip: ""
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
	
			fieldLabel : "activitySet",
			name : "activitySet",
			dataIndex : "activitySet",
			targetChiModelElementId : "ActivitySet",
			isParent : false,
			aggregationKind : chi.Constants.AggregationKind.SHARED
		
	})

		, 
			
	
		new chi.editor.control.SingleAssociate( {
	
			fieldLabel : "diagram",
			name : "diagram",
			dataIndex : "diagram",
			targetChiModelElementId : "Diagram",
			isParent : false,
			aggregationKind : chi.Constants.AggregationKind.SHARED
		
	})

		, 
			
	
		new chi.editor.control.SingleAssociate( {
	
			fieldLabel : "glossary",
			name : "glossary",
			dataIndex : "glossary",
			targetChiModelElementId : "Glossary",
			isParent : false,
			aggregationKind : chi.Constants.AggregationKind.COMPOSITE
		
	})

		, 
			
	
		new chi.editor.control.SingleAssociate( {
	
			fieldLabel : "property",
			name : "property",
			dataIndex : "property",
			targetChiModelElementId : "Property",
			isParent : false,
			aggregationKind : chi.Constants.AggregationKind.COMPOSITE
		
	})

		, 
			
	
		new chi.editor.control.SingleAssociate( {
	
			fieldLabel : "chiValue",
			name : "chiValue",
			dataIndex : "chiValue",
			targetChiModelElementId : "ChiValue",
			isParent : false,
			aggregationKind : chi.Constants.AggregationKind.COMPOSITE
		
	})

		, 
			
	
		new chi.editor.control.SingleAssociate( {
	
			fieldLabel : "chiClass",
			name : "chiClass",
			dataIndex : "chiClass",
			targetChiModelElementId : "ChiClass",
			isParent : false,
			aggregationKind : chi.Constants.AggregationKind.COMPOSITE
		
	})

		, 
			
	
		new chi.editor.control.SingleAssociate( {
	
			fieldLabel : "chiView",
			name : "chiView",
			dataIndex : "chiView",
			targetChiModelElementId : "ChiView",
			isParent : false,
			aggregationKind : chi.Constants.AggregationKind.COMPOSITE
		
	})

		, 
			
	
		new chi.editor.control.SingleAssociate( {
	
			fieldLabel : "chiController",
			name : "chiController",
			dataIndex : "chiController",
			targetChiModelElementId : "ChiController",
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
	
			fieldLabel : "chiNodeManyToMany",
			name : "chiNodeManyToMany",
			dataIndex : "chiNodeManyToMany",
			targetChiModelElementId : "ChiNodeManyToMany",
			isParent : false,
			aggregationKind : chi.Constants.AggregationKind.COMPOSITE
		
	})

		, 
			
	
		new chi.editor.control.SingleAssociate( {
	
			fieldLabel : "operation",
			name : "operation",
			dataIndex : "operation",
			targetChiModelElementId : "Operation",
			isParent : false,
			aggregationKind : chi.Constants.AggregationKind.COMPOSITE
		
	})

		, 
			
	
		new chi.editor.control.SingleAssociate( {
	
			fieldLabel : "chiIssue",
			name : "chiIssue",
			dataIndex : "chiIssue",
			targetChiModelElementId : "ChiIssue",
			isParent : false,
			aggregationKind : chi.Constants.AggregationKind.COMPOSITE
		
	})

		, 
			
	
		new chi.editor.control.SingleAssociate( {
	
			fieldLabel : "chiFeature",
			name : "chiFeature",
			dataIndex : "chiFeature",
			targetChiModelElementId : "ChiFeature",
			isParent : false,
			aggregationKind : chi.Constants.AggregationKind.COMPOSITE
		
	})

		, 
			
	
		new chi.editor.control.SingleAssociate( {
	
			fieldLabel : "chiRequirement",
			name : "chiRequirement",
			dataIndex : "chiRequirement",
			targetChiModelElementId : "ChiRequirement",
			isParent : false,
			aggregationKind : chi.Constants.AggregationKind.COMPOSITE
		
	})

		, 
			
	
		new chi.editor.control.SingleAssociate( {
	
			fieldLabel : "chiGoal",
			name : "chiGoal",
			dataIndex : "chiGoal",
			targetChiModelElementId : "ChiGoal",
			isParent : false,
			aggregationKind : chi.Constants.AggregationKind.COMPOSITE
		
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
	
			fieldLabel : "chiBusinessUseCaseCore",
			name : "chiBusinessUseCaseCore",
			dataIndex : "chiBusinessUseCaseCore",
			targetChiModelElementId : "ChiBusinessUseCaseCore",
			isParent : false,
			aggregationKind : chi.Constants.AggregationKind.COMPOSITE
		
	})

		, 
			
	
		new chi.editor.control.SingleAssociate( {
	
			fieldLabel : "chiBusinessProcess",
			name : "chiBusinessProcess",
			dataIndex : "chiBusinessProcess",
			targetChiModelElementId : "ChiBusinessProcess",
			isParent : false,
			aggregationKind : chi.Constants.AggregationKind.COMPOSITE
		
	})

		, 
			
	
		new chi.editor.control.SingleAssociate( {
	
			fieldLabel : "actor",
			name : "actor",
			dataIndex : "actor",
			targetChiModelElementId : "Actor",
			isParent : false,
			aggregationKind : chi.Constants.AggregationKind.COMPOSITE
		
	})

		, 
			
	
		new chi.editor.control.SingleAssociate( {
	
			fieldLabel : "chiBusinessPartner",
			name : "chiBusinessPartner",
			dataIndex : "chiBusinessPartner",
			targetChiModelElementId : "ChiBusinessPartner",
			isParent : false,
			aggregationKind : chi.Constants.AggregationKind.COMPOSITE
		
	})

		, 
			
	
		new chi.editor.control.SingleAssociate( {
	
			fieldLabel : "chiBusinessPartnerPassive",
			name : "chiBusinessPartnerPassive",
			dataIndex : "chiBusinessPartnerPassive",
			targetChiModelElementId : "ChiBusinessPartnerPassive",
			isParent : false,
			aggregationKind : chi.Constants.AggregationKind.COMPOSITE
		
	})

		, 
			
	
		new chi.editor.control.SingleAssociate( {
	
			fieldLabel : "chiBusinessPartnerActive",
			name : "chiBusinessPartnerActive",
			dataIndex : "chiBusinessPartnerActive",
			targetChiModelElementId : "ChiBusinessPartnerActive",
			isParent : false,
			aggregationKind : chi.Constants.AggregationKind.COMPOSITE
		
	})

		, 
			
	
		new chi.editor.control.SingleAssociate( {
	
			fieldLabel : "chiWorker",
			name : "chiWorker",
			dataIndex : "chiWorker",
			targetChiModelElementId : "ChiWorker",
			isParent : false,
			aggregationKind : chi.Constants.AggregationKind.COMPOSITE
		
	})

		, 
			
	
		new chi.editor.control.SingleAssociate( {
	
			fieldLabel : "chiWorkerInternal",
			name : "chiWorkerInternal",
			dataIndex : "chiWorkerInternal",
			targetChiModelElementId : "ChiWorkerInternal",
			isParent : false,
			aggregationKind : chi.Constants.AggregationKind.COMPOSITE
		
	})

		, 
			
	
		new chi.editor.control.SingleAssociate( {
	
			fieldLabel : "chiWorkerExternal",
			name : "chiWorkerExternal",
			dataIndex : "chiWorkerExternal",
			targetChiModelElementId : "ChiWorkerExternal",
			isParent : false,
			aggregationKind : chi.Constants.AggregationKind.COMPOSITE
		
	})

		, 
			
	
		new chi.editor.control.SingleAssociate( {
	
			fieldLabel : "ruleVariable",
			name : "ruleVariable",
			dataIndex : "ruleVariable",
			targetChiModelElementId : "RuleVariable",
			isParent : false,
			aggregationKind : chi.Constants.AggregationKind.COMPOSITE
		
	})

		, 
			
	
		new chi.editor.control.SingleAssociate( {
	
			fieldLabel : "ruleSetVariable",
			name : "ruleSetVariable",
			dataIndex : "ruleSetVariable",
			targetChiModelElementId : "RuleSetVariable",
			isParent : false,
			aggregationKind : chi.Constants.AggregationKind.COMPOSITE
		
	})

		, 
			
	
		new chi.editor.control.SingleAssociate( {
	
			fieldLabel : "ruleCondition",
			name : "ruleCondition",
			dataIndex : "ruleCondition",
			targetChiModelElementId : "RuleCondition",
			isParent : false,
			aggregationKind : chi.Constants.AggregationKind.COMPOSITE
		
	})

		, 
			
	
		new chi.editor.control.SingleAssociate( {
	
			fieldLabel : "ruleAction",
			name : "ruleAction",
			dataIndex : "ruleAction",
			targetChiModelElementId : "RuleAction",
			isParent : false,
			aggregationKind : chi.Constants.AggregationKind.COMPOSITE
		
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
	
			fieldLabel : "productionRule",
			name : "productionRule",
			dataIndex : "productionRule",
			targetChiModelElementId : "ProductionRule",
			isParent : false,
			aggregationKind : chi.Constants.AggregationKind.COMPOSITE
		
	})

		, 
			
	
		new chi.editor.control.SingleAssociate( {
	
			fieldLabel : "chiSystem",
			name : "chiSystem",
			dataIndex : "chiSystem",
			targetChiModelElementId : "ChiSystem",
			isParent : false,
			aggregationKind : chi.Constants.AggregationKind.COMPOSITE
		
	})

		, 
			
	
		new chi.editor.control.SingleAssociate( {
	
			fieldLabel : "activityFinal",
			name : "activityFinal",
			dataIndex : "activityFinal",
			targetChiModelElementId : "ActivityFinal",
			isParent : false,
			aggregationKind : chi.Constants.AggregationKind.COMPOSITE
		
	})

		, 
			
	
		new chi.editor.control.SingleAssociate( {
	
			fieldLabel : "activityInitial",
			name : "activityInitial",
			dataIndex : "activityInitial",
			targetChiModelElementId : "ActivityInitial",
			isParent : false,
			aggregationKind : chi.Constants.AggregationKind.COMPOSITE
		
	})

		, 
			
	
		new chi.editor.control.SingleAssociate( {
	
			fieldLabel : "activitySend",
			name : "activitySend",
			dataIndex : "activitySend",
			targetChiModelElementId : "ActivitySend",
			isParent : false,
			aggregationKind : chi.Constants.AggregationKind.COMPOSITE
		
	})

		, 
			
	
		new chi.editor.control.SingleAssociate( {
	
			fieldLabel : "activityReceive",
			name : "activityReceive",
			dataIndex : "activityReceive",
			targetChiModelElementId : "ActivityReceive",
			isParent : false,
			aggregationKind : chi.Constants.AggregationKind.COMPOSITE
		
	})

		, 
			
	
		new chi.editor.control.SingleAssociate( {
	
			fieldLabel : "activityDecision",
			name : "activityDecision",
			dataIndex : "activityDecision",
			targetChiModelElementId : "ActivityDecision",
			isParent : false,
			aggregationKind : chi.Constants.AggregationKind.COMPOSITE
		
	})

		, 
			
	
		new chi.editor.control.SingleAssociate( {
	
			fieldLabel : "activity",
			name : "activity",
			dataIndex : "activity",
			targetChiModelElementId : "Activity",
			isParent : false,
			aggregationKind : chi.Constants.AggregationKind.COMPOSITE
		
	})

		, 
			
	
		new chi.editor.control.SingleAssociate( {
	
			fieldLabel : "chiObject",
			name : "chiObject",
			dataIndex : "chiObject",
			targetChiModelElementId : "ChiObject",
			isParent : false,
			aggregationKind : chi.Constants.AggregationKind.COMPOSITE
		
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
application.application.include.model.Figure.prototype.getLabel = function(record) {
	var label = record.get("Name");
	if (label == undefined || label.length == 0) {
		label = record.getOid(); 
	}
	return label;
};


chi.model.ModelClassContainer.getInstance().registerClass(new application.application.include.model.Figure());
	