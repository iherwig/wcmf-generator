
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
	
	this.cweModelElementId = "Package";
	this.name = "Package";
	this.treeIconClass = "PackageTreeIcon16x16";
	this.owningPackageId = "application.application.include.model.Model_package";
	
	
	this.recordDefinition = [
	
		{
			name : "Name",
			mapping : "Name"
		}
	, 
		{
			name : "Notes",
			mapping : "Notes"
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
			name : "last_editor",
			mapping : "last_editor"
		}
	, 
		{
			name : "modified",
			mapping : "modified"
		}
	
	
	
		,
	
	
	
		{
			name : "parentModel",
			mapping: "parentModel"
		}
	, 
		{
			name : "parentPackage",
			mapping: "parentPackage"
		}
	
	
	
		,
	
	
	
		{
			name : "childChiBase",
			mapping : "childChiBase"
		}
	, 
		{
			name : "childPackage",
			mapping : "childPackage"
		}
	, 
		{
			name : "childDiagram",
			mapping : "childDiagram"
		}
	, 
		{
			name : "childChiClass",
			mapping : "childChiClass"
		}
	, 
		{
			name : "childChiView",
			mapping : "childChiView"
		}
	, 
		{
			name : "childChiController",
			mapping : "childChiController"
		}
	, 
		{
			name : "childChiNode",
			mapping : "childChiNode"
		}
	, 
		{
			name : "childChiIssue",
			mapping : "childChiIssue"
		}
	, 
		{
			name : "childChiFeature",
			mapping : "childChiFeature"
		}
	, 
		{
			name : "childChiRequirement",
			mapping : "childChiRequirement"
		}
	, 
		{
			name : "childChiGoal",
			mapping : "childChiGoal"
		}
	, 
		{
			name : "childChiBusinessUseCase",
			mapping : "childChiBusinessUseCase"
		}
	, 
		{
			name : "childChiBusinessUseCaseCore",
			mapping : "childChiBusinessUseCaseCore"
		}
	, 
		{
			name : "childChiBusinessProcess",
			mapping : "childChiBusinessProcess"
		}
	, 
		{
			name : "childActor",
			mapping : "childActor"
		}
	, 
		{
			name : "childChiBusinessPartner",
			mapping : "childChiBusinessPartner"
		}
	, 
		{
			name : "childChiBusinessPartnerPassive",
			mapping : "childChiBusinessPartnerPassive"
		}
	, 
		{
			name : "childChiBusinessPartnerActive",
			mapping : "childChiBusinessPartnerActive"
		}
	, 
		{
			name : "childChiWorker",
			mapping : "childChiWorker"
		}
	, 
		{
			name : "childChiWorkerInternal",
			mapping : "childChiWorkerInternal"
		}
	, 
		{
			name : "childChiWorkerExternal",
			mapping : "childChiWorkerExternal"
		}
	, 
		{
			name : "childChiSystem",
			mapping : "childChiSystem"
		}
	, 
		{
			name : "childActivityFinal",
			mapping : "childActivityFinal"
		}
	, 
		{
			name : "childActivityInitial",
			mapping : "childActivityInitial"
		}
	, 
		{
			name : "childActivitySend",
			mapping : "childActivitySend"
		}
	, 
		{
			name : "childActivityReceive",
			mapping : "childActivityReceive"
		}
	, 
		{
			name : "childActivityDecision",
			mapping : "childActivityDecision"
		}
	, 
		{
			name : "childActivity",
			mapping : "childActivity"
		}
	, 
		{
			name : "childChiObject",
			mapping : "childChiObject"
		}
	
	];

	
	
	this.relations = {
	
		"parentModel" : {
			isParent : true,
			targetModelClassId : "Model"
		}
	, 
		"parentPackage" : {
			isParent : true,
			targetModelClassId : "Package"
		}
	

	
		,
	
	
	
		"childChiBase" : {
			isParent : false,
			targetModelClassId : "ChiBase"
		}
	, 
		"childPackage" : {
			isParent : false,
			targetModelClassId : "Package"
		}
	, 
		"childDiagram" : {
			isParent : false,
			targetModelClassId : "Diagram"
		}
	, 
		"childChiClass" : {
			isParent : false,
			targetModelClassId : "ChiClass"
		}
	, 
		"childChiView" : {
			isParent : false,
			targetModelClassId : "ChiView"
		}
	, 
		"childChiController" : {
			isParent : false,
			targetModelClassId : "ChiController"
		}
	, 
		"childChiNode" : {
			isParent : false,
			targetModelClassId : "ChiNode"
		}
	, 
		"childChiIssue" : {
			isParent : false,
			targetModelClassId : "ChiIssue"
		}
	, 
		"childChiFeature" : {
			isParent : false,
			targetModelClassId : "ChiFeature"
		}
	, 
		"childChiRequirement" : {
			isParent : false,
			targetModelClassId : "ChiRequirement"
		}
	, 
		"childChiGoal" : {
			isParent : false,
			targetModelClassId : "ChiGoal"
		}
	, 
		"childChiBusinessUseCase" : {
			isParent : false,
			targetModelClassId : "ChiBusinessUseCase"
		}
	, 
		"childChiBusinessUseCaseCore" : {
			isParent : false,
			targetModelClassId : "ChiBusinessUseCaseCore"
		}
	, 
		"childChiBusinessProcess" : {
			isParent : false,
			targetModelClassId : "ChiBusinessProcess"
		}
	, 
		"childActor" : {
			isParent : false,
			targetModelClassId : "Actor"
		}
	, 
		"childChiBusinessPartner" : {
			isParent : false,
			targetModelClassId : "ChiBusinessPartner"
		}
	, 
		"childChiBusinessPartnerPassive" : {
			isParent : false,
			targetModelClassId : "ChiBusinessPartnerPassive"
		}
	, 
		"childChiBusinessPartnerActive" : {
			isParent : false,
			targetModelClassId : "ChiBusinessPartnerActive"
		}
	, 
		"childChiWorker" : {
			isParent : false,
			targetModelClassId : "ChiWorker"
		}
	, 
		"childChiWorkerInternal" : {
			isParent : false,
			targetModelClassId : "ChiWorkerInternal"
		}
	, 
		"childChiWorkerExternal" : {
			isParent : false,
			targetModelClassId : "ChiWorkerExternal"
		}
	, 
		"childChiSystem" : {
			isParent : false,
			targetModelClassId : "ChiSystem"
		}
	, 
		"childActivityFinal" : {
			isParent : false,
			targetModelClassId : "ActivityFinal"
		}
	, 
		"childActivityInitial" : {
			isParent : false,
			targetModelClassId : "ActivityInitial"
		}
	, 
		"childActivitySend" : {
			isParent : false,
			targetModelClassId : "ActivitySend"
		}
	, 
		"childActivityReceive" : {
			isParent : false,
			targetModelClassId : "ActivityReceive"
		}
	, 
		"childActivityDecision" : {
			isParent : false,
			targetModelClassId : "ActivityDecision"
		}
	, 
		"childActivity" : {
			isParent : false,
			targetModelClassId : "Activity"
		}
	, 
		"childChiObject" : {
			isParent : false,
			targetModelClassId : "ChiObject"
		}
	
	};

};

Ext.extend(application.application.include.model.Package, cwe.model.ModelClass);


application.application.include.model.Package.prototype.getGridColumns = function() {
	return [
	
		
			{
			    header : "Name",
			    dataIndex : "Name",
			    width : 100,
			    sortable : true,
			    editor: 
	
		
			new cwe.editor.control.TextField({
				
			})
					
	

			}
		, 
			{
			    header : "Notes",
			    dataIndex : "Notes",
			    width : 100,
			    sortable : true,
			    editor: 
	
		
			new cwe.modelgrid.DummyField()
					
	

			}
		, 
			{
			    header : "created",
			    dataIndex : "created",
			    width : 100,
			    sortable : true,
			    editor: 
	
		
			new cwe.modelgrid.DummyField()
					
	

			}
		, 
			{
			    header : "creator",
			    dataIndex : "creator",
			    width : 100,
			    sortable : true,
			    editor: 
	
		
			new cwe.modelgrid.DummyField()
					
	

			}
		, 
			{
			    header : "last_editor",
			    dataIndex : "last_editor",
			    width : 100,
			    sortable : true,
			    editor: 
	
		
			new cwe.modelgrid.DummyField()
					
	

			}
		, 
			{
			    header : "modified",
			    dataIndex : "modified",
			    width : 100,
			    sortable : true,
			    editor: 
	
		
			new cwe.modelgrid.DummyField()
					
	

			}
		
	
	];
};



application.application.include.model.Package.prototype.getEditorItems = function() {
	return [
	
		new cwe.editor.control.PropertiesFieldSet({
			items: [
		
			
	new cwe.editor.control.TextField({
		fieldLabel: "Name",
		name: "Name",
		dataIndex: "Name",
		
		
		toolTip: "the name of this object."
	}) 

		, 
			
	new cwe.editor.control.HtmlEditor({
		fieldLabel: "Notes",
		name: "Notes",
		dataIndex: "Notes",
		
		
		toolTip: "the actual description of the object."
	}) 

		, 
			
	new cwe.editor.control.TextField({
		fieldLabel: "created",
		name: "created",
		dataIndex: "created",
		
		
			
				readOnly: true,
			
		
		toolTip: "the creation date of this object"
	}) 

		, 
			
	new cwe.editor.control.TextField({
		fieldLabel: "creator",
		name: "creator",
		dataIndex: "creator",
		
		
			
				readOnly: true,
			
		
		toolTip: "the user that created this object"
	}) 

		, 
			
	new cwe.editor.control.TextField({
		fieldLabel: "last_editor",
		name: "last_editor",
		dataIndex: "last_editor",
		
		
			
				readOnly: true,
			
		
		toolTip: "the last user that edited this object"
	}) 

		, 
			
	new cwe.editor.control.TextField({
		fieldLabel: "modified",
		name: "modified",
		dataIndex: "modified",
		
		
			
				readOnly: true,
			
		
		toolTip: "the date when this object was modified"
	}) 

		
		]})
		
		
			,
		
	
	
	
		new cwe.editor.control.AssociationsFieldSet({
			items: [
		
			
	
		new cwe.editor.control.SingleAssociate( {
	
		
			fieldLabel : "parentModel",
			name : "parentModel",
			dataIndex : "parentModel",
			targetCweModelElementId : "Model",
			isParent : true
		
	})

		, 
			
	
		new cwe.editor.control.SingleAssociate( {
	
		
			fieldLabel : "parentPackage",
			name : "parentPackage",
			dataIndex : "parentPackage",
			targetCweModelElementId : "Package",
			isParent : true
		
	})

		
		
		
			,
		
		
		
			
	
		new cwe.editor.control.MultipleAssociate( {
	
		
			fieldLabel : "childChiBase",
			name : "childChiBase",
			dataIndex : "childChiBase",
			targetCweModelElementId : "ChiBase",
			isParent : false
		
	})

		, 
			
	
		new cwe.editor.control.MultipleAssociate( {
	
		
			fieldLabel : "childPackage",
			name : "childPackage",
			dataIndex : "childPackage",
			targetCweModelElementId : "Package",
			isParent : false
		
	})

		, 
			
	
		new cwe.editor.control.MultipleAssociate( {
	
		
			fieldLabel : "childDiagram",
			name : "childDiagram",
			dataIndex : "childDiagram",
			targetCweModelElementId : "Diagram",
			isParent : false
		
	})

		, 
			
	
		new cwe.editor.control.MultipleAssociate( {
	
		
			fieldLabel : "childChiClass",
			name : "childChiClass",
			dataIndex : "childChiClass",
			targetCweModelElementId : "ChiClass",
			isParent : false
		
	})

		, 
			
	
		new cwe.editor.control.MultipleAssociate( {
	
		
			fieldLabel : "childChiView",
			name : "childChiView",
			dataIndex : "childChiView",
			targetCweModelElementId : "ChiView",
			isParent : false
		
	})

		, 
			
	
		new cwe.editor.control.MultipleAssociate( {
	
		
			fieldLabel : "childChiController",
			name : "childChiController",
			dataIndex : "childChiController",
			targetCweModelElementId : "ChiController",
			isParent : false
		
	})

		, 
			
	
		new cwe.editor.control.MultipleAssociate( {
	
		
			fieldLabel : "childChiNode",
			name : "childChiNode",
			dataIndex : "childChiNode",
			targetCweModelElementId : "ChiNode",
			isParent : false
		
	})

		, 
			
	
		new cwe.editor.control.MultipleAssociate( {
	
		
			fieldLabel : "childChiIssue",
			name : "childChiIssue",
			dataIndex : "childChiIssue",
			targetCweModelElementId : "ChiIssue",
			isParent : false
		
	})

		, 
			
	
		new cwe.editor.control.MultipleAssociate( {
	
		
			fieldLabel : "childChiFeature",
			name : "childChiFeature",
			dataIndex : "childChiFeature",
			targetCweModelElementId : "ChiFeature",
			isParent : false
		
	})

		, 
			
	
		new cwe.editor.control.MultipleAssociate( {
	
		
			fieldLabel : "childChiRequirement",
			name : "childChiRequirement",
			dataIndex : "childChiRequirement",
			targetCweModelElementId : "ChiRequirement",
			isParent : false
		
	})

		, 
			
	
		new cwe.editor.control.MultipleAssociate( {
	
		
			fieldLabel : "childChiGoal",
			name : "childChiGoal",
			dataIndex : "childChiGoal",
			targetCweModelElementId : "ChiGoal",
			isParent : false
		
	})

		, 
			
	
		new cwe.editor.control.MultipleAssociate( {
	
		
			fieldLabel : "childChiBusinessUseCase",
			name : "childChiBusinessUseCase",
			dataIndex : "childChiBusinessUseCase",
			targetCweModelElementId : "ChiBusinessUseCase",
			isParent : false
		
	})

		, 
			
	
		new cwe.editor.control.MultipleAssociate( {
	
		
			fieldLabel : "childChiBusinessUseCaseCore",
			name : "childChiBusinessUseCaseCore",
			dataIndex : "childChiBusinessUseCaseCore",
			targetCweModelElementId : "ChiBusinessUseCaseCore",
			isParent : false
		
	})

		, 
			
	
		new cwe.editor.control.MultipleAssociate( {
	
		
			fieldLabel : "childChiBusinessProcess",
			name : "childChiBusinessProcess",
			dataIndex : "childChiBusinessProcess",
			targetCweModelElementId : "ChiBusinessProcess",
			isParent : false
		
	})

		, 
			
	
		new cwe.editor.control.MultipleAssociate( {
	
		
			fieldLabel : "childActor",
			name : "childActor",
			dataIndex : "childActor",
			targetCweModelElementId : "Actor",
			isParent : false
		
	})

		, 
			
	
		new cwe.editor.control.MultipleAssociate( {
	
		
			fieldLabel : "childChiBusinessPartner",
			name : "childChiBusinessPartner",
			dataIndex : "childChiBusinessPartner",
			targetCweModelElementId : "ChiBusinessPartner",
			isParent : false
		
	})

		, 
			
	
		new cwe.editor.control.MultipleAssociate( {
	
		
			fieldLabel : "childChiBusinessPartnerPassive",
			name : "childChiBusinessPartnerPassive",
			dataIndex : "childChiBusinessPartnerPassive",
			targetCweModelElementId : "ChiBusinessPartnerPassive",
			isParent : false
		
	})

		, 
			
	
		new cwe.editor.control.MultipleAssociate( {
	
		
			fieldLabel : "childChiBusinessPartnerActive",
			name : "childChiBusinessPartnerActive",
			dataIndex : "childChiBusinessPartnerActive",
			targetCweModelElementId : "ChiBusinessPartnerActive",
			isParent : false
		
	})

		, 
			
	
		new cwe.editor.control.MultipleAssociate( {
	
		
			fieldLabel : "childChiWorker",
			name : "childChiWorker",
			dataIndex : "childChiWorker",
			targetCweModelElementId : "ChiWorker",
			isParent : false
		
	})

		, 
			
	
		new cwe.editor.control.MultipleAssociate( {
	
		
			fieldLabel : "childChiWorkerInternal",
			name : "childChiWorkerInternal",
			dataIndex : "childChiWorkerInternal",
			targetCweModelElementId : "ChiWorkerInternal",
			isParent : false
		
	})

		, 
			
	
		new cwe.editor.control.MultipleAssociate( {
	
		
			fieldLabel : "childChiWorkerExternal",
			name : "childChiWorkerExternal",
			dataIndex : "childChiWorkerExternal",
			targetCweModelElementId : "ChiWorkerExternal",
			isParent : false
		
	})

		, 
			
	
		new cwe.editor.control.MultipleAssociate( {
	
		
			fieldLabel : "childChiSystem",
			name : "childChiSystem",
			dataIndex : "childChiSystem",
			targetCweModelElementId : "ChiSystem",
			isParent : false
		
	})

		, 
			
	
		new cwe.editor.control.MultipleAssociate( {
	
		
			fieldLabel : "childActivityFinal",
			name : "childActivityFinal",
			dataIndex : "childActivityFinal",
			targetCweModelElementId : "ActivityFinal",
			isParent : false
		
	})

		, 
			
	
		new cwe.editor.control.MultipleAssociate( {
	
		
			fieldLabel : "childActivityInitial",
			name : "childActivityInitial",
			dataIndex : "childActivityInitial",
			targetCweModelElementId : "ActivityInitial",
			isParent : false
		
	})

		, 
			
	
		new cwe.editor.control.MultipleAssociate( {
	
		
			fieldLabel : "childActivitySend",
			name : "childActivitySend",
			dataIndex : "childActivitySend",
			targetCweModelElementId : "ActivitySend",
			isParent : false
		
	})

		, 
			
	
		new cwe.editor.control.MultipleAssociate( {
	
		
			fieldLabel : "childActivityReceive",
			name : "childActivityReceive",
			dataIndex : "childActivityReceive",
			targetCweModelElementId : "ActivityReceive",
			isParent : false
		
	})

		, 
			
	
		new cwe.editor.control.MultipleAssociate( {
	
		
			fieldLabel : "childActivityDecision",
			name : "childActivityDecision",
			dataIndex : "childActivityDecision",
			targetCweModelElementId : "ActivityDecision",
			isParent : false
		
	})

		, 
			
	
		new cwe.editor.control.MultipleAssociate( {
	
		
			fieldLabel : "childActivity",
			name : "childActivity",
			dataIndex : "childActivity",
			targetCweModelElementId : "Activity",
			isParent : false
		
	})

		, 
			
	
		new cwe.editor.control.MultipleAssociate( {
	
		
			fieldLabel : "childChiObject",
			name : "childChiObject",
			dataIndex : "childChiObject",
			targetCweModelElementId : "ChiObject",
			isParent : false
		
	})

		
		
		]})
	
 ];
};


cwe.model.ModelClassContainer.getInstance().registerClass(new application.application.include.model.Package());
	