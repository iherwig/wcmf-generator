
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

application.application.include.model.Package = function() {
	application.application.include.model.Package.superclass.constructor.call(this, arguments);
	
	this.chiModelElementId = "Package";
	this.name = "Package";
	this.treeIconClass = "PackageTreeIcon16x16";
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
	, 
		{
			name : "diagram",
			mapping: "diagram"
		}
	, 
		{
			name : "glossary",
			mapping: "glossary"
		}
	, 
		{
			name : "property",
			mapping: "property"
		}
	, 
		{
			name : "chiValue",
			mapping: "chiValue"
		}
	, 
		{
			name : "chiClass",
			mapping: "chiClass"
		}
	, 
		{
			name : "chiView",
			mapping: "chiView"
		}
	, 
		{
			name : "chiController",
			mapping: "chiController"
		}
	, 
		{
			name : "chiNode",
			mapping: "chiNode"
		}
	, 
		{
			name : "chiNodeManyToMany",
			mapping: "chiNodeManyToMany"
		}
	, 
		{
			name : "operation",
			mapping: "operation"
		}
	, 
		{
			name : "chiIssue",
			mapping: "chiIssue"
		}
	, 
		{
			name : "chiFeature",
			mapping: "chiFeature"
		}
	, 
		{
			name : "chiRequirement",
			mapping: "chiRequirement"
		}
	, 
		{
			name : "chiGoal",
			mapping: "chiGoal"
		}
	, 
		{
			name : "chiBusinessUseCase",
			mapping: "chiBusinessUseCase"
		}
	, 
		{
			name : "chiBusinessUseCaseCore",
			mapping: "chiBusinessUseCaseCore"
		}
	, 
		{
			name : "chiBusinessProcess",
			mapping: "chiBusinessProcess"
		}
	, 
		{
			name : "actor",
			mapping: "actor"
		}
	, 
		{
			name : "chiBusinessPartner",
			mapping: "chiBusinessPartner"
		}
	, 
		{
			name : "chiBusinessPartnerPassive",
			mapping: "chiBusinessPartnerPassive"
		}
	, 
		{
			name : "chiBusinessPartnerActive",
			mapping: "chiBusinessPartnerActive"
		}
	, 
		{
			name : "chiWorker",
			mapping: "chiWorker"
		}
	, 
		{
			name : "chiWorkerInternal",
			mapping: "chiWorkerInternal"
		}
	, 
		{
			name : "chiWorkerExternal",
			mapping: "chiWorkerExternal"
		}
	, 
		{
			name : "ruleVariable",
			mapping: "ruleVariable"
		}
	, 
		{
			name : "ruleSetVariable",
			mapping: "ruleSetVariable"
		}
	, 
		{
			name : "ruleCondition",
			mapping: "ruleCondition"
		}
	, 
		{
			name : "ruleAction",
			mapping: "ruleAction"
		}
	, 
		{
			name : "productionRuleSet",
			mapping: "productionRuleSet"
		}
	, 
		{
			name : "productionRule",
			mapping: "productionRule"
		}
	, 
		{
			name : "chiSystem",
			mapping: "chiSystem"
		}
	, 
		{
			name : "activityFinal",
			mapping: "activityFinal"
		}
	, 
		{
			name : "activityInitial",
			mapping: "activityInitial"
		}
	, 
		{
			name : "activitySend",
			mapping: "activitySend"
		}
	, 
		{
			name : "activityReceive",
			mapping: "activityReceive"
		}
	, 
		{
			name : "activityDecision",
			mapping: "activityDecision"
		}
	, 
		{
			name : "activity",
			mapping: "activity"
		}
	, 
		{
			name : "chiObject",
			mapping: "chiObject"
		}
	, 
		{
			name : "activitySet",
			mapping: "activitySet"
		}
	
	
	
		,
	
	
	
		{
			name : "model",
			mapping : "model"
		}
	
	];

	
	
	this.relations = {
	
		"package" : {
			isParent : true,
			targetModelClassId : "Package"
		}
	, 
		"diagram" : {
			isParent : true,
			targetModelClassId : "Diagram"
		}
	, 
		"glossary" : {
			isParent : true,
			targetModelClassId : "Glossary"
		}
	, 
		"property" : {
			isParent : true,
			targetModelClassId : "Property"
		}
	, 
		"chiValue" : {
			isParent : true,
			targetModelClassId : "ChiValue"
		}
	, 
		"chiClass" : {
			isParent : true,
			targetModelClassId : "ChiClass"
		}
	, 
		"chiView" : {
			isParent : true,
			targetModelClassId : "ChiView"
		}
	, 
		"chiController" : {
			isParent : true,
			targetModelClassId : "ChiController"
		}
	, 
		"chiNode" : {
			isParent : true,
			targetModelClassId : "ChiNode"
		}
	, 
		"chiNodeManyToMany" : {
			isParent : true,
			targetModelClassId : "ChiNodeManyToMany"
		}
	, 
		"operation" : {
			isParent : true,
			targetModelClassId : "Operation"
		}
	, 
		"chiIssue" : {
			isParent : true,
			targetModelClassId : "ChiIssue"
		}
	, 
		"chiFeature" : {
			isParent : true,
			targetModelClassId : "ChiFeature"
		}
	, 
		"chiRequirement" : {
			isParent : true,
			targetModelClassId : "ChiRequirement"
		}
	, 
		"chiGoal" : {
			isParent : true,
			targetModelClassId : "ChiGoal"
		}
	, 
		"chiBusinessUseCase" : {
			isParent : true,
			targetModelClassId : "ChiBusinessUseCase"
		}
	, 
		"chiBusinessUseCaseCore" : {
			isParent : true,
			targetModelClassId : "ChiBusinessUseCaseCore"
		}
	, 
		"chiBusinessProcess" : {
			isParent : true,
			targetModelClassId : "ChiBusinessProcess"
		}
	, 
		"actor" : {
			isParent : true,
			targetModelClassId : "Actor"
		}
	, 
		"chiBusinessPartner" : {
			isParent : true,
			targetModelClassId : "ChiBusinessPartner"
		}
	, 
		"chiBusinessPartnerPassive" : {
			isParent : true,
			targetModelClassId : "ChiBusinessPartnerPassive"
		}
	, 
		"chiBusinessPartnerActive" : {
			isParent : true,
			targetModelClassId : "ChiBusinessPartnerActive"
		}
	, 
		"chiWorker" : {
			isParent : true,
			targetModelClassId : "ChiWorker"
		}
	, 
		"chiWorkerInternal" : {
			isParent : true,
			targetModelClassId : "ChiWorkerInternal"
		}
	, 
		"chiWorkerExternal" : {
			isParent : true,
			targetModelClassId : "ChiWorkerExternal"
		}
	, 
		"ruleVariable" : {
			isParent : true,
			targetModelClassId : "RuleVariable"
		}
	, 
		"ruleSetVariable" : {
			isParent : true,
			targetModelClassId : "RuleSetVariable"
		}
	, 
		"ruleCondition" : {
			isParent : true,
			targetModelClassId : "RuleCondition"
		}
	, 
		"ruleAction" : {
			isParent : true,
			targetModelClassId : "RuleAction"
		}
	, 
		"productionRuleSet" : {
			isParent : true,
			targetModelClassId : "ProductionRuleSet"
		}
	, 
		"productionRule" : {
			isParent : true,
			targetModelClassId : "ProductionRule"
		}
	, 
		"chiSystem" : {
			isParent : true,
			targetModelClassId : "ChiSystem"
		}
	, 
		"activityFinal" : {
			isParent : true,
			targetModelClassId : "ActivityFinal"
		}
	, 
		"activityInitial" : {
			isParent : true,
			targetModelClassId : "ActivityInitial"
		}
	, 
		"activitySend" : {
			isParent : true,
			targetModelClassId : "ActivitySend"
		}
	, 
		"activityReceive" : {
			isParent : true,
			targetModelClassId : "ActivityReceive"
		}
	, 
		"activityDecision" : {
			isParent : true,
			targetModelClassId : "ActivityDecision"
		}
	, 
		"activity" : {
			isParent : true,
			targetModelClassId : "Activity"
		}
	, 
		"chiObject" : {
			isParent : true,
			targetModelClassId : "ChiObject"
		}
	, 
		"activitySet" : {
			isParent : true,
			targetModelClassId : "ActivitySet"
		}
	

	
		,
	
	
	
		"model" : {
			isParent : false,
			targetModelClassId : "Model"
		}
	
	};

};

Ext.extend(application.application.include.model.Package, chi.model.ModelClass);


application.application.include.model.Package.prototype.getGridColumns = function() {
	return [
	
		
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



application.application.include.model.Package.prototype.getLabelColumns = function() {
	return [
	
		
	
	];
};



application.application.include.model.Package.prototype.getEditorItems = function() {
	return [
	
		new chi.editor.control.PropertiesFieldSet({
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
		
	
	
	
		new chi.editor.control.AssociationsFieldSet({
			items: [
		
			
	
		new chi.editor.control.MultipleAssociate( {
	
			fieldLabel : "package",
			name : "package",
			dataIndex : "package",
			targetChiModelElementId : "Package",
			isParent : true,
			aggregationKind : chi.Constants.AggregationKind.NONE
		
	})

		, 
			
	
		new chi.editor.control.MultipleAssociate( {
	
			fieldLabel : "diagram",
			name : "diagram",
			dataIndex : "diagram",
			targetChiModelElementId : "Diagram",
			isParent : true,
			aggregationKind : chi.Constants.AggregationKind.NONE
		
	})

		, 
			
	
		new chi.editor.control.MultipleAssociate( {
	
			fieldLabel : "glossary",
			name : "glossary",
			dataIndex : "glossary",
			targetChiModelElementId : "Glossary",
			isParent : true,
			aggregationKind : chi.Constants.AggregationKind.NONE
		
	})

		, 
			
	
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
	
			fieldLabel : "chiValue",
			name : "chiValue",
			dataIndex : "chiValue",
			targetChiModelElementId : "ChiValue",
			isParent : true,
			aggregationKind : chi.Constants.AggregationKind.NONE
		
	})

		, 
			
	
		new chi.editor.control.MultipleAssociate( {
	
			fieldLabel : "chiClass",
			name : "chiClass",
			dataIndex : "chiClass",
			targetChiModelElementId : "ChiClass",
			isParent : true,
			aggregationKind : chi.Constants.AggregationKind.NONE
		
	})

		, 
			
	
		new chi.editor.control.MultipleAssociate( {
	
			fieldLabel : "chiView",
			name : "chiView",
			dataIndex : "chiView",
			targetChiModelElementId : "ChiView",
			isParent : true,
			aggregationKind : chi.Constants.AggregationKind.NONE
		
	})

		, 
			
	
		new chi.editor.control.MultipleAssociate( {
	
			fieldLabel : "chiController",
			name : "chiController",
			dataIndex : "chiController",
			targetChiModelElementId : "ChiController",
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
	
			fieldLabel : "chiNodeManyToMany",
			name : "chiNodeManyToMany",
			dataIndex : "chiNodeManyToMany",
			targetChiModelElementId : "ChiNodeManyToMany",
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
	
			fieldLabel : "chiIssue",
			name : "chiIssue",
			dataIndex : "chiIssue",
			targetChiModelElementId : "ChiIssue",
			isParent : true,
			aggregationKind : chi.Constants.AggregationKind.NONE
		
	})

		, 
			
	
		new chi.editor.control.MultipleAssociate( {
	
			fieldLabel : "chiFeature",
			name : "chiFeature",
			dataIndex : "chiFeature",
			targetChiModelElementId : "ChiFeature",
			isParent : true,
			aggregationKind : chi.Constants.AggregationKind.NONE
		
	})

		, 
			
	
		new chi.editor.control.MultipleAssociate( {
	
			fieldLabel : "chiRequirement",
			name : "chiRequirement",
			dataIndex : "chiRequirement",
			targetChiModelElementId : "ChiRequirement",
			isParent : true,
			aggregationKind : chi.Constants.AggregationKind.NONE
		
	})

		, 
			
	
		new chi.editor.control.MultipleAssociate( {
	
			fieldLabel : "chiGoal",
			name : "chiGoal",
			dataIndex : "chiGoal",
			targetChiModelElementId : "ChiGoal",
			isParent : true,
			aggregationKind : chi.Constants.AggregationKind.NONE
		
	})

		, 
			
	
		new chi.editor.control.MultipleAssociate( {
	
			fieldLabel : "chiBusinessUseCase",
			name : "chiBusinessUseCase",
			dataIndex : "chiBusinessUseCase",
			targetChiModelElementId : "ChiBusinessUseCase",
			isParent : true,
			aggregationKind : chi.Constants.AggregationKind.NONE
		
	})

		, 
			
	
		new chi.editor.control.MultipleAssociate( {
	
			fieldLabel : "chiBusinessUseCaseCore",
			name : "chiBusinessUseCaseCore",
			dataIndex : "chiBusinessUseCaseCore",
			targetChiModelElementId : "ChiBusinessUseCaseCore",
			isParent : true,
			aggregationKind : chi.Constants.AggregationKind.NONE
		
	})

		, 
			
	
		new chi.editor.control.MultipleAssociate( {
	
			fieldLabel : "chiBusinessProcess",
			name : "chiBusinessProcess",
			dataIndex : "chiBusinessProcess",
			targetChiModelElementId : "ChiBusinessProcess",
			isParent : true,
			aggregationKind : chi.Constants.AggregationKind.NONE
		
	})

		, 
			
	
		new chi.editor.control.MultipleAssociate( {
	
			fieldLabel : "actor",
			name : "actor",
			dataIndex : "actor",
			targetChiModelElementId : "Actor",
			isParent : true,
			aggregationKind : chi.Constants.AggregationKind.NONE
		
	})

		, 
			
	
		new chi.editor.control.MultipleAssociate( {
	
			fieldLabel : "chiBusinessPartner",
			name : "chiBusinessPartner",
			dataIndex : "chiBusinessPartner",
			targetChiModelElementId : "ChiBusinessPartner",
			isParent : true,
			aggregationKind : chi.Constants.AggregationKind.NONE
		
	})

		, 
			
	
		new chi.editor.control.MultipleAssociate( {
	
			fieldLabel : "chiBusinessPartnerPassive",
			name : "chiBusinessPartnerPassive",
			dataIndex : "chiBusinessPartnerPassive",
			targetChiModelElementId : "ChiBusinessPartnerPassive",
			isParent : true,
			aggregationKind : chi.Constants.AggregationKind.NONE
		
	})

		, 
			
	
		new chi.editor.control.MultipleAssociate( {
	
			fieldLabel : "chiBusinessPartnerActive",
			name : "chiBusinessPartnerActive",
			dataIndex : "chiBusinessPartnerActive",
			targetChiModelElementId : "ChiBusinessPartnerActive",
			isParent : true,
			aggregationKind : chi.Constants.AggregationKind.NONE
		
	})

		, 
			
	
		new chi.editor.control.MultipleAssociate( {
	
			fieldLabel : "chiWorker",
			name : "chiWorker",
			dataIndex : "chiWorker",
			targetChiModelElementId : "ChiWorker",
			isParent : true,
			aggregationKind : chi.Constants.AggregationKind.NONE
		
	})

		, 
			
	
		new chi.editor.control.MultipleAssociate( {
	
			fieldLabel : "chiWorkerInternal",
			name : "chiWorkerInternal",
			dataIndex : "chiWorkerInternal",
			targetChiModelElementId : "ChiWorkerInternal",
			isParent : true,
			aggregationKind : chi.Constants.AggregationKind.NONE
		
	})

		, 
			
	
		new chi.editor.control.MultipleAssociate( {
	
			fieldLabel : "chiWorkerExternal",
			name : "chiWorkerExternal",
			dataIndex : "chiWorkerExternal",
			targetChiModelElementId : "ChiWorkerExternal",
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
	
			fieldLabel : "ruleSetVariable",
			name : "ruleSetVariable",
			dataIndex : "ruleSetVariable",
			targetChiModelElementId : "RuleSetVariable",
			isParent : true,
			aggregationKind : chi.Constants.AggregationKind.NONE
		
	})

		, 
			
	
		new chi.editor.control.MultipleAssociate( {
	
			fieldLabel : "ruleCondition",
			name : "ruleCondition",
			dataIndex : "ruleCondition",
			targetChiModelElementId : "RuleCondition",
			isParent : true,
			aggregationKind : chi.Constants.AggregationKind.NONE
		
	})

		, 
			
	
		new chi.editor.control.MultipleAssociate( {
	
			fieldLabel : "ruleAction",
			name : "ruleAction",
			dataIndex : "ruleAction",
			targetChiModelElementId : "RuleAction",
			isParent : true,
			aggregationKind : chi.Constants.AggregationKind.NONE
		
	})

		, 
			
	
		new chi.editor.control.MultipleAssociate( {
	
			fieldLabel : "productionRuleSet",
			name : "productionRuleSet",
			dataIndex : "productionRuleSet",
			targetChiModelElementId : "ProductionRuleSet",
			isParent : true,
			aggregationKind : chi.Constants.AggregationKind.NONE
		
	})

		, 
			
	
		new chi.editor.control.MultipleAssociate( {
	
			fieldLabel : "productionRule",
			name : "productionRule",
			dataIndex : "productionRule",
			targetChiModelElementId : "ProductionRule",
			isParent : true,
			aggregationKind : chi.Constants.AggregationKind.NONE
		
	})

		, 
			
	
		new chi.editor.control.MultipleAssociate( {
	
			fieldLabel : "chiSystem",
			name : "chiSystem",
			dataIndex : "chiSystem",
			targetChiModelElementId : "ChiSystem",
			isParent : true,
			aggregationKind : chi.Constants.AggregationKind.NONE
		
	})

		, 
			
	
		new chi.editor.control.MultipleAssociate( {
	
			fieldLabel : "activityFinal",
			name : "activityFinal",
			dataIndex : "activityFinal",
			targetChiModelElementId : "ActivityFinal",
			isParent : true,
			aggregationKind : chi.Constants.AggregationKind.NONE
		
	})

		, 
			
	
		new chi.editor.control.MultipleAssociate( {
	
			fieldLabel : "activityInitial",
			name : "activityInitial",
			dataIndex : "activityInitial",
			targetChiModelElementId : "ActivityInitial",
			isParent : true,
			aggregationKind : chi.Constants.AggregationKind.NONE
		
	})

		, 
			
	
		new chi.editor.control.MultipleAssociate( {
	
			fieldLabel : "activitySend",
			name : "activitySend",
			dataIndex : "activitySend",
			targetChiModelElementId : "ActivitySend",
			isParent : true,
			aggregationKind : chi.Constants.AggregationKind.NONE
		
	})

		, 
			
	
		new chi.editor.control.MultipleAssociate( {
	
			fieldLabel : "activityReceive",
			name : "activityReceive",
			dataIndex : "activityReceive",
			targetChiModelElementId : "ActivityReceive",
			isParent : true,
			aggregationKind : chi.Constants.AggregationKind.NONE
		
	})

		, 
			
	
		new chi.editor.control.MultipleAssociate( {
	
			fieldLabel : "activityDecision",
			name : "activityDecision",
			dataIndex : "activityDecision",
			targetChiModelElementId : "ActivityDecision",
			isParent : true,
			aggregationKind : chi.Constants.AggregationKind.NONE
		
	})

		, 
			
	
		new chi.editor.control.MultipleAssociate( {
	
			fieldLabel : "activity",
			name : "activity",
			dataIndex : "activity",
			targetChiModelElementId : "Activity",
			isParent : true,
			aggregationKind : chi.Constants.AggregationKind.NONE
		
	})

		, 
			
	
		new chi.editor.control.MultipleAssociate( {
	
			fieldLabel : "chiObject",
			name : "chiObject",
			dataIndex : "chiObject",
			targetChiModelElementId : "ChiObject",
			isParent : true,
			aggregationKind : chi.Constants.AggregationKind.NONE
		
	})

		, 
			
	
		new chi.editor.control.MultipleAssociate( {
	
			fieldLabel : "activitySet",
			name : "activitySet",
			dataIndex : "activitySet",
			targetChiModelElementId : "ActivitySet",
			isParent : true,
			aggregationKind : chi.Constants.AggregationKind.NONE
		
	})

		
		
		
			,
		
		
		
			
	
		new chi.editor.control.SingleAssociate( {
	
			fieldLabel : "model",
			name : "model",
			dataIndex : "model",
			targetChiModelElementId : "Model",
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
application.application.include.model.Package.prototype.getLabel = function(record) {
	var label = record.get("Name");
	if (label == undefined || label.length == 0) {
		label = record.getOid(); 
	}
	return label;
};


chi.model.ModelClassContainer.getInstance().registerClass(new application.application.include.model.Package());
	