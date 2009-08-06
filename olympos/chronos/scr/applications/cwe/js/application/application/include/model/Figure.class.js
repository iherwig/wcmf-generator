
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
	
	this.cweModelElementId = "Figure";
	this.name = "Figure";
	this.treeIconClass = "FigureTreeIcon16x16";
	this.owningPackageId = "application.application.include.model.Model_package";
	
	
	this.recordDefinition = [
	
		{
			name : "BackgroundColor",
			mapping : "BackgroundColor"
		}
	, 
		{
			name : "ForegroundColor",
			mapping : "ForegroundColor"
		}
	, 
		{
			name : "GID",
			mapping : "GID"
		}
	, 
		{
			name : "Height",
			mapping : "Height"
		}
	, 
		{
			name : "PositionY",
			mapping : "PositionY"
		}
	, 
		{
			name : "PositionX",
			mapping : "PositionX"
		}
	, 
		{
			name : "Width",
			mapping : "Width"
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
			name : "parentActivitySet",
			mapping: "parentActivitySet"
		}
	, 
		{
			name : "parentChiBase",
			mapping: "parentChiBase"
		}
	, 
		{
			name : "parentDiagram",
			mapping: "parentDiagram"
		}
	, 
		{
			name : "parentChiClass",
			mapping: "parentChiClass"
		}
	, 
		{
			name : "parentChiView",
			mapping: "parentChiView"
		}
	, 
		{
			name : "parentChiController",
			mapping: "parentChiController"
		}
	, 
		{
			name : "parentChiNode",
			mapping: "parentChiNode"
		}
	, 
		{
			name : "parentChiIssue",
			mapping: "parentChiIssue"
		}
	, 
		{
			name : "parentChiFeature",
			mapping: "parentChiFeature"
		}
	, 
		{
			name : "parentChiRequirement",
			mapping: "parentChiRequirement"
		}
	, 
		{
			name : "parentChiGoal",
			mapping: "parentChiGoal"
		}
	, 
		{
			name : "parentChiBusinessUseCase",
			mapping: "parentChiBusinessUseCase"
		}
	, 
		{
			name : "parentChiBusinessUseCaseCore",
			mapping: "parentChiBusinessUseCaseCore"
		}
	, 
		{
			name : "parentChiBusinessProcess",
			mapping: "parentChiBusinessProcess"
		}
	, 
		{
			name : "parentActor",
			mapping: "parentActor"
		}
	, 
		{
			name : "parentChiBusinessPartner",
			mapping: "parentChiBusinessPartner"
		}
	, 
		{
			name : "parentChiBusinessPartnerPassive",
			mapping: "parentChiBusinessPartnerPassive"
		}
	, 
		{
			name : "parentChiBusinessPartnerActive",
			mapping: "parentChiBusinessPartnerActive"
		}
	, 
		{
			name : "parentChiWorker",
			mapping: "parentChiWorker"
		}
	, 
		{
			name : "parentChiWorkerInternal",
			mapping: "parentChiWorkerInternal"
		}
	, 
		{
			name : "parentChiWorkerExternal",
			mapping: "parentChiWorkerExternal"
		}
	, 
		{
			name : "parentChiSystem",
			mapping: "parentChiSystem"
		}
	, 
		{
			name : "parentActivityFinal",
			mapping: "parentActivityFinal"
		}
	, 
		{
			name : "parentActivityInitial",
			mapping: "parentActivityInitial"
		}
	, 
		{
			name : "parentActivitySend",
			mapping: "parentActivitySend"
		}
	, 
		{
			name : "parentActivityReceive",
			mapping: "parentActivityReceive"
		}
	, 
		{
			name : "parentActivityDecision",
			mapping: "parentActivityDecision"
		}
	, 
		{
			name : "parentActivity",
			mapping: "parentActivity"
		}
	, 
		{
			name : "parentChiObject",
			mapping: "parentChiObject"
		}
	
	
	
	
	
	];

	
	
	this.relations = {
	
		"parentActivitySet" : {
			isParent : true,
			targetModelClassId : "ActivitySet"
		}
	, 
		"parentChiBase" : {
			isParent : true,
			targetModelClassId : "ChiBase"
		}
	, 
		"parentDiagram" : {
			isParent : true,
			targetModelClassId : "Diagram"
		}
	, 
		"parentChiClass" : {
			isParent : true,
			targetModelClassId : "ChiClass"
		}
	, 
		"parentChiView" : {
			isParent : true,
			targetModelClassId : "ChiView"
		}
	, 
		"parentChiController" : {
			isParent : true,
			targetModelClassId : "ChiController"
		}
	, 
		"parentChiNode" : {
			isParent : true,
			targetModelClassId : "ChiNode"
		}
	, 
		"parentChiIssue" : {
			isParent : true,
			targetModelClassId : "ChiIssue"
		}
	, 
		"parentChiFeature" : {
			isParent : true,
			targetModelClassId : "ChiFeature"
		}
	, 
		"parentChiRequirement" : {
			isParent : true,
			targetModelClassId : "ChiRequirement"
		}
	, 
		"parentChiGoal" : {
			isParent : true,
			targetModelClassId : "ChiGoal"
		}
	, 
		"parentChiBusinessUseCase" : {
			isParent : true,
			targetModelClassId : "ChiBusinessUseCase"
		}
	, 
		"parentChiBusinessUseCaseCore" : {
			isParent : true,
			targetModelClassId : "ChiBusinessUseCaseCore"
		}
	, 
		"parentChiBusinessProcess" : {
			isParent : true,
			targetModelClassId : "ChiBusinessProcess"
		}
	, 
		"parentActor" : {
			isParent : true,
			targetModelClassId : "Actor"
		}
	, 
		"parentChiBusinessPartner" : {
			isParent : true,
			targetModelClassId : "ChiBusinessPartner"
		}
	, 
		"parentChiBusinessPartnerPassive" : {
			isParent : true,
			targetModelClassId : "ChiBusinessPartnerPassive"
		}
	, 
		"parentChiBusinessPartnerActive" : {
			isParent : true,
			targetModelClassId : "ChiBusinessPartnerActive"
		}
	, 
		"parentChiWorker" : {
			isParent : true,
			targetModelClassId : "ChiWorker"
		}
	, 
		"parentChiWorkerInternal" : {
			isParent : true,
			targetModelClassId : "ChiWorkerInternal"
		}
	, 
		"parentChiWorkerExternal" : {
			isParent : true,
			targetModelClassId : "ChiWorkerExternal"
		}
	, 
		"parentChiSystem" : {
			isParent : true,
			targetModelClassId : "ChiSystem"
		}
	, 
		"parentActivityFinal" : {
			isParent : true,
			targetModelClassId : "ActivityFinal"
		}
	, 
		"parentActivityInitial" : {
			isParent : true,
			targetModelClassId : "ActivityInitial"
		}
	, 
		"parentActivitySend" : {
			isParent : true,
			targetModelClassId : "ActivitySend"
		}
	, 
		"parentActivityReceive" : {
			isParent : true,
			targetModelClassId : "ActivityReceive"
		}
	, 
		"parentActivityDecision" : {
			isParent : true,
			targetModelClassId : "ActivityDecision"
		}
	, 
		"parentActivity" : {
			isParent : true,
			targetModelClassId : "Activity"
		}
	, 
		"parentChiObject" : {
			isParent : true,
			targetModelClassId : "ChiObject"
		}
	

	
	
	
	};

};

Ext.extend(application.application.include.model.Figure, cwe.model.ModelClass);


application.application.include.model.Figure.prototype.getGridColumns = function() {
	return [
	
		
			{
			    header : "BackgroundColor",
			    dataIndex : "BackgroundColor",
			    width : 100,
			    sortable : true,
			    editor: 
	
		
			new cwe.editor.control.TextField({
				
			})
					
	

			}
		, 
			{
			    header : "ForegroundColor",
			    dataIndex : "ForegroundColor",
			    width : 100,
			    sortable : true,
			    editor: 
	
		
			new cwe.editor.control.TextField({
				
			})
					
	

			}
		, 
			{
			    header : "GID",
			    dataIndex : "GID",
			    width : 100,
			    sortable : true,
			    editor: 
	
		
			new cwe.editor.control.TextField({
				
			})
					
	

			}
		, 
			{
			    header : "Height",
			    dataIndex : "Height",
			    width : 100,
			    sortable : true,
			    editor: 
	
		
			new cwe.editor.control.TextField({
				
			})
					
	

			}
		, 
			{
			    header : "PositionY",
			    dataIndex : "PositionY",
			    width : 100,
			    sortable : true,
			    editor: 
	
		
			new cwe.editor.control.TextField({
				
			})
					
	

			}
		, 
			{
			    header : "PositionX",
			    dataIndex : "PositionX",
			    width : 100,
			    sortable : true,
			    editor: 
	
		
			new cwe.editor.control.TextField({
				
			})
					
	

			}
		, 
			{
			    header : "Width",
			    dataIndex : "Width",
			    width : 100,
			    sortable : true,
			    editor: 
	
		
			new cwe.editor.control.TextField({
				
			})
					
	

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



application.application.include.model.Figure.prototype.getEditorItems = function() {
	return [
	
		new cwe.editor.control.PropertiesFieldSet({
			items: [
		
			
	new cwe.editor.control.TextField({
		fieldLabel: "BackgroundColor",
		name: "BackgroundColor",
		dataIndex: "BackgroundColor",
		
		
		toolTip: "the background color in RBG"
	}) 

		, 
			
	new cwe.editor.control.TextField({
		fieldLabel: "ForegroundColor",
		name: "ForegroundColor",
		dataIndex: "ForegroundColor",
		
		
		toolTip: "the foreground color in RBG"
	}) 

		, 
			
	new cwe.editor.control.TextField({
		fieldLabel: "GID",
		name: "GID",
		dataIndex: "GID",
		
		
		toolTip: ""
	}) 

		, 
			
	new cwe.editor.control.TextField({
		fieldLabel: "Height",
		name: "Height",
		dataIndex: "Height",
		
		
		toolTip: ""
	}) 

		, 
			
	new cwe.editor.control.TextField({
		fieldLabel: "PositionY",
		name: "PositionY",
		dataIndex: "PositionY",
		
		
		toolTip: "the orizontal position of this object"
	}) 

		, 
			
	new cwe.editor.control.TextField({
		fieldLabel: "PositionX",
		name: "PositionX",
		dataIndex: "PositionX",
		
		
		toolTip: "the vertical position of this object"
	}) 

		, 
			
	new cwe.editor.control.TextField({
		fieldLabel: "Width",
		name: "Width",
		dataIndex: "Width",
		
		
		toolTip: ""
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
	
		
			fieldLabel : "parentActivitySet",
			name : "parentActivitySet",
			dataIndex : "parentActivitySet",
			targetCweModelElementId : "ActivitySet",
			isParent : true
		
	})

		, 
			
	
		new cwe.editor.control.SingleAssociate( {
	
		
			fieldLabel : "parentChiBase",
			name : "parentChiBase",
			dataIndex : "parentChiBase",
			targetCweModelElementId : "ChiBase",
			isParent : true
		
	})

		, 
			
	
		new cwe.editor.control.SingleAssociate( {
	
		
			fieldLabel : "parentDiagram",
			name : "parentDiagram",
			dataIndex : "parentDiagram",
			targetCweModelElementId : "Diagram",
			isParent : true
		
	})

		, 
			
	
		new cwe.editor.control.SingleAssociate( {
	
		
			fieldLabel : "parentChiClass",
			name : "parentChiClass",
			dataIndex : "parentChiClass",
			targetCweModelElementId : "ChiClass",
			isParent : true
		
	})

		, 
			
	
		new cwe.editor.control.SingleAssociate( {
	
		
			fieldLabel : "parentChiView",
			name : "parentChiView",
			dataIndex : "parentChiView",
			targetCweModelElementId : "ChiView",
			isParent : true
		
	})

		, 
			
	
		new cwe.editor.control.SingleAssociate( {
	
		
			fieldLabel : "parentChiController",
			name : "parentChiController",
			dataIndex : "parentChiController",
			targetCweModelElementId : "ChiController",
			isParent : true
		
	})

		, 
			
	
		new cwe.editor.control.SingleAssociate( {
	
		
			fieldLabel : "parentChiNode",
			name : "parentChiNode",
			dataIndex : "parentChiNode",
			targetCweModelElementId : "ChiNode",
			isParent : true
		
	})

		, 
			
	
		new cwe.editor.control.SingleAssociate( {
	
		
			fieldLabel : "parentChiIssue",
			name : "parentChiIssue",
			dataIndex : "parentChiIssue",
			targetCweModelElementId : "ChiIssue",
			isParent : true
		
	})

		, 
			
	
		new cwe.editor.control.SingleAssociate( {
	
		
			fieldLabel : "parentChiFeature",
			name : "parentChiFeature",
			dataIndex : "parentChiFeature",
			targetCweModelElementId : "ChiFeature",
			isParent : true
		
	})

		, 
			
	
		new cwe.editor.control.SingleAssociate( {
	
		
			fieldLabel : "parentChiRequirement",
			name : "parentChiRequirement",
			dataIndex : "parentChiRequirement",
			targetCweModelElementId : "ChiRequirement",
			isParent : true
		
	})

		, 
			
	
		new cwe.editor.control.SingleAssociate( {
	
		
			fieldLabel : "parentChiGoal",
			name : "parentChiGoal",
			dataIndex : "parentChiGoal",
			targetCweModelElementId : "ChiGoal",
			isParent : true
		
	})

		, 
			
	
		new cwe.editor.control.SingleAssociate( {
	
		
			fieldLabel : "parentChiBusinessUseCase",
			name : "parentChiBusinessUseCase",
			dataIndex : "parentChiBusinessUseCase",
			targetCweModelElementId : "ChiBusinessUseCase",
			isParent : true
		
	})

		, 
			
	
		new cwe.editor.control.SingleAssociate( {
	
		
			fieldLabel : "parentChiBusinessUseCaseCore",
			name : "parentChiBusinessUseCaseCore",
			dataIndex : "parentChiBusinessUseCaseCore",
			targetCweModelElementId : "ChiBusinessUseCaseCore",
			isParent : true
		
	})

		, 
			
	
		new cwe.editor.control.SingleAssociate( {
	
		
			fieldLabel : "parentChiBusinessProcess",
			name : "parentChiBusinessProcess",
			dataIndex : "parentChiBusinessProcess",
			targetCweModelElementId : "ChiBusinessProcess",
			isParent : true
		
	})

		, 
			
	
		new cwe.editor.control.SingleAssociate( {
	
		
			fieldLabel : "parentActor",
			name : "parentActor",
			dataIndex : "parentActor",
			targetCweModelElementId : "Actor",
			isParent : true
		
	})

		, 
			
	
		new cwe.editor.control.SingleAssociate( {
	
		
			fieldLabel : "parentChiBusinessPartner",
			name : "parentChiBusinessPartner",
			dataIndex : "parentChiBusinessPartner",
			targetCweModelElementId : "ChiBusinessPartner",
			isParent : true
		
	})

		, 
			
	
		new cwe.editor.control.SingleAssociate( {
	
		
			fieldLabel : "parentChiBusinessPartnerPassive",
			name : "parentChiBusinessPartnerPassive",
			dataIndex : "parentChiBusinessPartnerPassive",
			targetCweModelElementId : "ChiBusinessPartnerPassive",
			isParent : true
		
	})

		, 
			
	
		new cwe.editor.control.SingleAssociate( {
	
		
			fieldLabel : "parentChiBusinessPartnerActive",
			name : "parentChiBusinessPartnerActive",
			dataIndex : "parentChiBusinessPartnerActive",
			targetCweModelElementId : "ChiBusinessPartnerActive",
			isParent : true
		
	})

		, 
			
	
		new cwe.editor.control.SingleAssociate( {
	
		
			fieldLabel : "parentChiWorker",
			name : "parentChiWorker",
			dataIndex : "parentChiWorker",
			targetCweModelElementId : "ChiWorker",
			isParent : true
		
	})

		, 
			
	
		new cwe.editor.control.SingleAssociate( {
	
		
			fieldLabel : "parentChiWorkerInternal",
			name : "parentChiWorkerInternal",
			dataIndex : "parentChiWorkerInternal",
			targetCweModelElementId : "ChiWorkerInternal",
			isParent : true
		
	})

		, 
			
	
		new cwe.editor.control.SingleAssociate( {
	
		
			fieldLabel : "parentChiWorkerExternal",
			name : "parentChiWorkerExternal",
			dataIndex : "parentChiWorkerExternal",
			targetCweModelElementId : "ChiWorkerExternal",
			isParent : true
		
	})

		, 
			
	
		new cwe.editor.control.SingleAssociate( {
	
		
			fieldLabel : "parentChiSystem",
			name : "parentChiSystem",
			dataIndex : "parentChiSystem",
			targetCweModelElementId : "ChiSystem",
			isParent : true
		
	})

		, 
			
	
		new cwe.editor.control.SingleAssociate( {
	
		
			fieldLabel : "parentActivityFinal",
			name : "parentActivityFinal",
			dataIndex : "parentActivityFinal",
			targetCweModelElementId : "ActivityFinal",
			isParent : true
		
	})

		, 
			
	
		new cwe.editor.control.SingleAssociate( {
	
		
			fieldLabel : "parentActivityInitial",
			name : "parentActivityInitial",
			dataIndex : "parentActivityInitial",
			targetCweModelElementId : "ActivityInitial",
			isParent : true
		
	})

		, 
			
	
		new cwe.editor.control.SingleAssociate( {
	
		
			fieldLabel : "parentActivitySend",
			name : "parentActivitySend",
			dataIndex : "parentActivitySend",
			targetCweModelElementId : "ActivitySend",
			isParent : true
		
	})

		, 
			
	
		new cwe.editor.control.SingleAssociate( {
	
		
			fieldLabel : "parentActivityReceive",
			name : "parentActivityReceive",
			dataIndex : "parentActivityReceive",
			targetCweModelElementId : "ActivityReceive",
			isParent : true
		
	})

		, 
			
	
		new cwe.editor.control.SingleAssociate( {
	
		
			fieldLabel : "parentActivityDecision",
			name : "parentActivityDecision",
			dataIndex : "parentActivityDecision",
			targetCweModelElementId : "ActivityDecision",
			isParent : true
		
	})

		, 
			
	
		new cwe.editor.control.SingleAssociate( {
	
		
			fieldLabel : "parentActivity",
			name : "parentActivity",
			dataIndex : "parentActivity",
			targetCweModelElementId : "Activity",
			isParent : true
		
	})

		, 
			
	
		new cwe.editor.control.SingleAssociate( {
	
		
			fieldLabel : "parentChiObject",
			name : "parentChiObject",
			dataIndex : "parentChiObject",
			targetCweModelElementId : "ChiObject",
			isParent : true
		
	})

		
		
		
		
		
		
		]})
	
 ];
};


cwe.model.ModelClassContainer.getInstance().registerClass(new application.application.include.model.Figure());
	