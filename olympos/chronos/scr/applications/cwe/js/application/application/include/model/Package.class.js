
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
			name : "id",
			mapping : "id"
		}
	, 
		{
			name : "Composition",
			mapping : "Composition"
		}
	, 
		{
			name : "fk_model_id",
			mapping : "fk_model_id"
		}
	, 
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
			name : "childChiView",
			mapping : "childChiView"
		}
	, 
		{
			name : "childChiNode",
			mapping : "childChiNode"
		}
	, 
		{
			name : "childChiController",
			mapping : "childChiController"
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
		"childChiView" : {
			isParent : false,
			targetModelClassId : "ChiView"
		}
	, 
		"childChiNode" : {
			isParent : false,
			targetModelClassId : "ChiNode"
		}
	, 
		"childChiController" : {
			isParent : false,
			targetModelClassId : "ChiController"
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
	
	}

}

Ext.extend(application.application.include.model.Package, cwe.model.ModelClass);


application.application.include.model.Package.prototype.getEditorItems = function() {
	return [
	
		 new Ext.form.TextField( {
			fieldLabel : "id",
			name : "id",
			dataIndex : "id"
		})
	, 
		 new Ext.form.TextField( {
			fieldLabel : "Composition",
			name : "Composition",
			dataIndex : "Composition"
		})
	, 
		 new Ext.form.TextField( {
			fieldLabel : "fk_model_id",
			name : "fk_model_id",
			dataIndex : "fk_model_id"
		})
	, 
		 new Ext.form.TextField( {
			fieldLabel : "Name",
			name : "Name",
			dataIndex : "Name"
		})
	, 
		 new Ext.form.TextField( {
			fieldLabel : "Notes",
			name : "Notes",
			dataIndex : "Notes"
		})
	, 
		 new Ext.form.TextField( {
			fieldLabel : "created",
			name : "created",
			dataIndex : "created"
		})
	, 
		 new Ext.form.TextField( {
			fieldLabel : "creator",
			name : "creator",
			dataIndex : "creator"
		})
	, 
		 new Ext.form.TextField( {
			fieldLabel : "last_editor",
			name : "last_editor",
			dataIndex : "last_editor"
		})
	, 
		 new Ext.form.TextField( {
			fieldLabel : "modified",
			name : "modified",
			dataIndex : "modified"
		})
	
	
	
		,
	
	
	
		
	
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
	
		
			fieldLabel : "childChiView",
			name : "childChiView",
			dataIndex : "childChiView",
			targetCweModelElementId : "ChiView",
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
	
		
			fieldLabel : "childChiController",
			name : "childChiController",
			dataIndex : "childChiController",
			targetCweModelElementId : "ChiController",
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

	
 ];
}


cwe.model.ModelClassContainer.getInstance().registerClass(new application.application.include.model.Package());
	