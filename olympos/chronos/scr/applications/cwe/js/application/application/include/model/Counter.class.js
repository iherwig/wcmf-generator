
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

application.application.include.model.Counter = function() {
	application.application.include.model.Counter.superclass.constructor.call(this, arguments);
	
	this.cweModelElementId = "Counter";
	this.name = "Counter";
	this.treeIconClass = "CounterTreeIcon16x16";
	this.owningPackageId = "application.application.include.model.Model_package";
	
	
	this.recordDefinition = [
	
		{
			name : "id",
			mapping : "id"
		}
	, 
		{
			name : "ChiGoal",
			mapping : "ChiGoal"
		}
	, 
		{
			name : "ChiRequirement",
			mapping : "ChiRequirement"
		}
	, 
		{
			name : "ChiFeature",
			mapping : "ChiFeature"
		}
	, 
		{
			name : "ChiIssue",
			mapping : "ChiIssue"
		}
	, 
		{
			name : "ChiBusinessUseCase",
			mapping : "ChiBusinessUseCase"
		}
	, 
		{
			name : "ChiBusinessProcess",
			mapping : "ChiBusinessProcess"
		}
	, 
		{
			name : "ChiBusinessUseCaseCore",
			mapping : "ChiBusinessUseCaseCore"
		}
	, 
		{
			name : "ChiBusinessPartnerActive",
			mapping : "ChiBusinessPartnerActive"
		}
	, 
		{
			name : "ChiBusinessPartnerPassive",
			mapping : "ChiBusinessPartnerPassive"
		}
	, 
		{
			name : "ChiWorkerExternal",
			mapping : "ChiWorkerExternal"
		}
	, 
		{
			name : "ChiWorkerInternal",
			mapping : "ChiWorkerInternal"
		}
	, 
		{
			name : "ChiWorker",
			mapping : "ChiWorker"
		}
	, 
		{
			name : "ChiBusinessPartner",
			mapping : "ChiBusinessPartner"
		}
	, 
		{
			name : "ChiController",
			mapping : "ChiController"
		}
	, 
		{
			name : "ChiNode",
			mapping : "ChiNode"
		}
	, 
		{
			name : "ChiValue",
			mapping : "ChiValue"
		}
	, 
		{
			name : "ChiView",
			mapping : "ChiView"
		}
	, 
		{
			name : "Operation",
			mapping : "Operation"
		}
	, 
		{
			name : "Activity",
			mapping : "Activity"
		}
	, 
		{
			name : "ActivityDecision",
			mapping : "ActivityDecision"
		}
	, 
		{
			name : "ActivityReceive",
			mapping : "ActivityReceive"
		}
	, 
		{
			name : "ActivitySend",
			mapping : "ActivitySend"
		}
	, 
		{
			name : "ActivityInitial",
			mapping : "ActivityInitial"
		}
	, 
		{
			name : "ActivityFinal",
			mapping : "ActivityFinal"
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
	
	
	
	
	
	
	
	];

	
	
	this.relations = {
	

	
	
	
	}

}

Ext.extend(application.application.include.model.Counter, cwe.model.ModelClass);


application.application.include.model.Counter.prototype.getEditorItems = function() {
	return [
	
		 new Ext.form.TextField( {
			fieldLabel : "id",
			name : "id",
			dataIndex : "id"
		})
	, 
		 new Ext.form.TextField( {
			fieldLabel : "ChiGoal",
			name : "ChiGoal",
			dataIndex : "ChiGoal"
		})
	, 
		 new Ext.form.TextField( {
			fieldLabel : "ChiRequirement",
			name : "ChiRequirement",
			dataIndex : "ChiRequirement"
		})
	, 
		 new Ext.form.TextField( {
			fieldLabel : "ChiFeature",
			name : "ChiFeature",
			dataIndex : "ChiFeature"
		})
	, 
		 new Ext.form.TextField( {
			fieldLabel : "ChiIssue",
			name : "ChiIssue",
			dataIndex : "ChiIssue"
		})
	, 
		 new Ext.form.TextField( {
			fieldLabel : "ChiBusinessUseCase",
			name : "ChiBusinessUseCase",
			dataIndex : "ChiBusinessUseCase"
		})
	, 
		 new Ext.form.TextField( {
			fieldLabel : "ChiBusinessProcess",
			name : "ChiBusinessProcess",
			dataIndex : "ChiBusinessProcess"
		})
	, 
		 new Ext.form.TextField( {
			fieldLabel : "ChiBusinessUseCaseCore",
			name : "ChiBusinessUseCaseCore",
			dataIndex : "ChiBusinessUseCaseCore"
		})
	, 
		 new Ext.form.TextField( {
			fieldLabel : "ChiBusinessPartnerActive",
			name : "ChiBusinessPartnerActive",
			dataIndex : "ChiBusinessPartnerActive"
		})
	, 
		 new Ext.form.TextField( {
			fieldLabel : "ChiBusinessPartnerPassive",
			name : "ChiBusinessPartnerPassive",
			dataIndex : "ChiBusinessPartnerPassive"
		})
	, 
		 new Ext.form.TextField( {
			fieldLabel : "ChiWorkerExternal",
			name : "ChiWorkerExternal",
			dataIndex : "ChiWorkerExternal"
		})
	, 
		 new Ext.form.TextField( {
			fieldLabel : "ChiWorkerInternal",
			name : "ChiWorkerInternal",
			dataIndex : "ChiWorkerInternal"
		})
	, 
		 new Ext.form.TextField( {
			fieldLabel : "ChiWorker",
			name : "ChiWorker",
			dataIndex : "ChiWorker"
		})
	, 
		 new Ext.form.TextField( {
			fieldLabel : "ChiBusinessPartner",
			name : "ChiBusinessPartner",
			dataIndex : "ChiBusinessPartner"
		})
	, 
		 new Ext.form.TextField( {
			fieldLabel : "ChiController",
			name : "ChiController",
			dataIndex : "ChiController"
		})
	, 
		 new Ext.form.TextField( {
			fieldLabel : "ChiNode",
			name : "ChiNode",
			dataIndex : "ChiNode"
		})
	, 
		 new Ext.form.TextField( {
			fieldLabel : "ChiValue",
			name : "ChiValue",
			dataIndex : "ChiValue"
		})
	, 
		 new Ext.form.TextField( {
			fieldLabel : "ChiView",
			name : "ChiView",
			dataIndex : "ChiView"
		})
	, 
		 new Ext.form.TextField( {
			fieldLabel : "Operation",
			name : "Operation",
			dataIndex : "Operation"
		})
	, 
		 new Ext.form.TextField( {
			fieldLabel : "Activity",
			name : "Activity",
			dataIndex : "Activity"
		})
	, 
		 new Ext.form.TextField( {
			fieldLabel : "ActivityDecision",
			name : "ActivityDecision",
			dataIndex : "ActivityDecision"
		})
	, 
		 new Ext.form.TextField( {
			fieldLabel : "ActivityReceive",
			name : "ActivityReceive",
			dataIndex : "ActivityReceive"
		})
	, 
		 new Ext.form.TextField( {
			fieldLabel : "ActivitySend",
			name : "ActivitySend",
			dataIndex : "ActivitySend"
		})
	, 
		 new Ext.form.TextField( {
			fieldLabel : "ActivityInitial",
			name : "ActivityInitial",
			dataIndex : "ActivityInitial"
		})
	, 
		 new Ext.form.TextField( {
			fieldLabel : "ActivityFinal",
			name : "ActivityFinal",
			dataIndex : "ActivityFinal"
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
	
	
	
	
	
	
	
 ];
}


cwe.model.ModelClassContainer.getInstance().registerClass(new application.application.include.model.Counter());
	