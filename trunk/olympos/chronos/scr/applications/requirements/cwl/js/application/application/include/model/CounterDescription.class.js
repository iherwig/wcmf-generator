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

application.application.include.model.CounterDescription = function() {
	application.application.include.model.CounterDescription.superclass.constructor.call(this, arguments);
	
	this.chiModelElementId = "Counter";
	this.name = "Counter";
	this.treeIconClass = "CounterTreeIcon16x16";
	this.owningPackageId = "application.application.include.model.Model_package";
	
	
	this.recordDefinition = [
	
		{
			name : "activity",
			mapping : "activity"
		}
	, 
		{
			name : "activityDecision",
			mapping : "activityDecision"
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
			name : "activityReceive",
			mapping : "activityReceive"
		}
	, 
		{
			name : "activitySend",
			mapping : "activitySend"
		}
	, 
		{
			name : "chiBusinessPartner",
			mapping : "chiBusinessPartner"
		}
	, 
		{
			name : "chiBusinessPartnerActive",
			mapping : "chiBusinessPartnerActive"
		}
	, 
		{
			name : "chiBusinessPartnerPassive",
			mapping : "chiBusinessPartnerPassive"
		}
	, 
		{
			name : "chiBusinessProcess",
			mapping : "chiBusinessProcess"
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
			name : "chiController",
			mapping : "chiController"
		}
	, 
		{
			name : "chiFeature",
			mapping : "chiFeature"
		}
	, 
		{
			name : "chiGoal",
			mapping : "chiGoal"
		}
	, 
		{
			name : "chiIssue",
			mapping : "chiIssue"
		}
	, 
		{
			name : "chiNode",
			mapping : "chiNode"
		}
	, 
		{
			name : "chiRequirement",
			mapping : "chiRequirement"
		}
	, 
		{
			name : "chiSystem",
			mapping : "chiSystem"
		}
	, 
		{
			name : "chiValue",
			mapping : "chiValue"
		}
	, 
		{
			name : "chiView",
			mapping : "chiView"
		}
	, 
		{
			name : "chiWorker",
			mapping : "chiWorker"
		}
	, 
		{
			name : "chiWorkerExternal",
			mapping : "chiWorkerExternal"
		}
	, 
		{
			name : "chiWorkerInternal",
			mapping : "chiWorkerInternal"
		}
	, 
		{
			name : "operation",
			mapping : "operation"
		}
	, 
		{
			name : "diagram",
			mapping : "diagram"
		}
	, 
		{
			name : "activitySet",
			mapping : "activitySet"
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
	
	
	
	
	
	
	
	
	
	];

	
	
	this.relations = {
	

	
	
	
	};

};

Ext.extend(application.application.include.model.CounterDescription, chi.model.ModelDescription);


application.application.include.model.CounterDescription.prototype.getGridColumns = function() {
	return [
	
		
			{
				header : "activity",
				dataIndex : "activity",
				width : 100,
				sortable : true,
				hidden: true,
				editor: 
	
			new chi.editor.control.TextField({})
	

			}
		, 
			{
				header : "activityDecision",
				dataIndex : "activityDecision",
				width : 100,
				sortable : true,
				hidden: true,
				editor: 
	
			new chi.editor.control.TextField({})
	

			}
		, 
			{
				header : "activityFinal",
				dataIndex : "activityFinal",
				width : 100,
				sortable : true,
				hidden: true,
				editor: 
	
			new chi.editor.control.TextField({})
	

			}
		, 
			{
				header : "activityInitial",
				dataIndex : "activityInitial",
				width : 100,
				sortable : true,
				hidden: true,
				editor: 
	
			new chi.editor.control.TextField({})
	

			}
		, 
			{
				header : "activityReceive",
				dataIndex : "activityReceive",
				width : 100,
				sortable : true,
				hidden: true,
				editor: 
	
			new chi.editor.control.TextField({})
	

			}
		, 
			{
				header : "activitySend",
				dataIndex : "activitySend",
				width : 100,
				sortable : true,
				hidden: true,
				editor: 
	
			new chi.editor.control.TextField({})
	

			}
		, 
			{
				header : "chiBusinessPartner",
				dataIndex : "chiBusinessPartner",
				width : 100,
				sortable : true,
				hidden: true,
				editor: 
	
			new chi.editor.control.TextField({})
	

			}
		, 
			{
				header : "chiBusinessPartnerActive",
				dataIndex : "chiBusinessPartnerActive",
				width : 100,
				sortable : true,
				hidden: true,
				editor: 
	
			new chi.editor.control.TextField({})
	

			}
		, 
			{
				header : "chiBusinessPartnerPassive",
				dataIndex : "chiBusinessPartnerPassive",
				width : 100,
				sortable : true,
				hidden: true,
				editor: 
	
			new chi.editor.control.TextField({})
	

			}
		, 
			{
				header : "chiBusinessProcess",
				dataIndex : "chiBusinessProcess",
				width : 100,
				sortable : true,
				hidden: true,
				editor: 
	
			new chi.editor.control.TextField({})
	

			}
		, 
			{
				header : "chiBusinessUseCase",
				dataIndex : "chiBusinessUseCase",
				width : 100,
				sortable : true,
				hidden: true,
				editor: 
	
			new chi.editor.control.TextField({})
	

			}
		, 
			{
				header : "chiBusinessUseCaseCore",
				dataIndex : "chiBusinessUseCaseCore",
				width : 100,
				sortable : true,
				hidden: true,
				editor: 
	
			new chi.editor.control.TextField({})
	

			}
		, 
			{
				header : "chiController",
				dataIndex : "chiController",
				width : 100,
				sortable : true,
				hidden: true,
				editor: 
	
			new chi.editor.control.TextField({})
	

			}
		, 
			{
				header : "chiFeature",
				dataIndex : "chiFeature",
				width : 100,
				sortable : true,
				hidden: true,
				editor: 
	
			new chi.editor.control.TextField({})
	

			}
		, 
			{
				header : "chiGoal",
				dataIndex : "chiGoal",
				width : 100,
				sortable : true,
				hidden: true,
				editor: 
	
			new chi.editor.control.TextField({})
	

			}
		, 
			{
				header : "chiIssue",
				dataIndex : "chiIssue",
				width : 100,
				sortable : true,
				hidden: true,
				editor: 
	
			new chi.editor.control.TextField({})
	

			}
		, 
			{
				header : "chiNode",
				dataIndex : "chiNode",
				width : 100,
				sortable : true,
				hidden: true,
				editor: 
	
			new chi.editor.control.TextField({})
	

			}
		, 
			{
				header : "chiRequirement",
				dataIndex : "chiRequirement",
				width : 100,
				sortable : true,
				hidden: true,
				editor: 
	
			new chi.editor.control.TextField({})
	

			}
		, 
			{
				header : "chiSystem",
				dataIndex : "chiSystem",
				width : 100,
				sortable : true,
				hidden: true,
				editor: 
	
			new chi.editor.control.TextField({})
	

			}
		, 
			{
				header : "chiValue",
				dataIndex : "chiValue",
				width : 100,
				sortable : true,
				hidden: true,
				editor: 
	
			new chi.editor.control.TextField({})
	

			}
		, 
			{
				header : "chiView",
				dataIndex : "chiView",
				width : 100,
				sortable : true,
				hidden: true,
				editor: 
	
			new chi.editor.control.TextField({})
	

			}
		, 
			{
				header : "chiWorker",
				dataIndex : "chiWorker",
				width : 100,
				sortable : true,
				hidden: true,
				editor: 
	
			new chi.editor.control.TextField({})
	

			}
		, 
			{
				header : "chiWorkerExternal",
				dataIndex : "chiWorkerExternal",
				width : 100,
				sortable : true,
				hidden: true,
				editor: 
	
			new chi.editor.control.TextField({})
	

			}
		, 
			{
				header : "chiWorkerInternal",
				dataIndex : "chiWorkerInternal",
				width : 100,
				sortable : true,
				hidden: true,
				editor: 
	
			new chi.editor.control.TextField({})
	

			}
		, 
			{
				header : "operation",
				dataIndex : "operation",
				width : 100,
				sortable : true,
				hidden: true,
				editor: 
	
			new chi.editor.control.TextField({})
	

			}
		, 
			{
				header : "diagram",
				dataIndex : "diagram",
				width : 100,
				sortable : true,
				hidden: true,
				editor: 
	
			new chi.editor.control.TextField({})
	

			}
		, 
			{
				header : "activitySet",
				dataIndex : "activitySet",
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



application.application.include.model.CounterDescription.prototype.getLabelColumns = function() {
	return [
	
		
	
	];
};



application.application.include.model.CounterDescription.prototype.getEditorItems = function() {
	return [
	
		new cwe.editor.control.PropertiesFieldSet({
			items: [
		
			
	
		
		new chi.editor.control.TextField({
		fieldLabel: "activity",
		name: "activity",
		dataIndex: "activity",
		
		toolTip: ""
	}) 
	

		, 
			
	
		
		new chi.editor.control.TextField({
		fieldLabel: "activityDecision",
		name: "activityDecision",
		dataIndex: "activityDecision",
		
		toolTip: ""
	}) 
	

		, 
			
	
		
		new chi.editor.control.TextField({
		fieldLabel: "activityFinal",
		name: "activityFinal",
		dataIndex: "activityFinal",
		
		toolTip: ""
	}) 
	

		, 
			
	
		
		new chi.editor.control.TextField({
		fieldLabel: "activityInitial",
		name: "activityInitial",
		dataIndex: "activityInitial",
		
		toolTip: ""
	}) 
	

		, 
			
	
		
		new chi.editor.control.TextField({
		fieldLabel: "activityReceive",
		name: "activityReceive",
		dataIndex: "activityReceive",
		
		toolTip: ""
	}) 
	

		, 
			
	
		
		new chi.editor.control.TextField({
		fieldLabel: "activitySend",
		name: "activitySend",
		dataIndex: "activitySend",
		
		toolTip: ""
	}) 
	

		, 
			
	
		
		new chi.editor.control.TextField({
		fieldLabel: "chiBusinessPartner",
		name: "chiBusinessPartner",
		dataIndex: "chiBusinessPartner",
		
		toolTip: ""
	}) 
	

		, 
			
	
		
		new chi.editor.control.TextField({
		fieldLabel: "chiBusinessPartnerActive",
		name: "chiBusinessPartnerActive",
		dataIndex: "chiBusinessPartnerActive",
		
		toolTip: ""
	}) 
	

		, 
			
	
		
		new chi.editor.control.TextField({
		fieldLabel: "chiBusinessPartnerPassive",
		name: "chiBusinessPartnerPassive",
		dataIndex: "chiBusinessPartnerPassive",
		
		toolTip: ""
	}) 
	

		, 
			
	
		
		new chi.editor.control.TextField({
		fieldLabel: "chiBusinessProcess",
		name: "chiBusinessProcess",
		dataIndex: "chiBusinessProcess",
		
		toolTip: ""
	}) 
	

		, 
			
	
		
		new chi.editor.control.TextField({
		fieldLabel: "chiBusinessUseCase",
		name: "chiBusinessUseCase",
		dataIndex: "chiBusinessUseCase",
		
		toolTip: ""
	}) 
	

		, 
			
	
		
		new chi.editor.control.TextField({
		fieldLabel: "chiBusinessUseCaseCore",
		name: "chiBusinessUseCaseCore",
		dataIndex: "chiBusinessUseCaseCore",
		
		toolTip: ""
	}) 
	

		, 
			
	
		
		new chi.editor.control.TextField({
		fieldLabel: "chiController",
		name: "chiController",
		dataIndex: "chiController",
		
		toolTip: ""
	}) 
	

		, 
			
	
		
		new chi.editor.control.TextField({
		fieldLabel: "chiFeature",
		name: "chiFeature",
		dataIndex: "chiFeature",
		
		toolTip: ""
	}) 
	

		, 
			
	
		
		new chi.editor.control.TextField({
		fieldLabel: "chiGoal",
		name: "chiGoal",
		dataIndex: "chiGoal",
		
		toolTip: ""
	}) 
	

		, 
			
	
		
		new chi.editor.control.TextField({
		fieldLabel: "chiIssue",
		name: "chiIssue",
		dataIndex: "chiIssue",
		
		toolTip: ""
	}) 
	

		, 
			
	
		
		new chi.editor.control.TextField({
		fieldLabel: "chiNode",
		name: "chiNode",
		dataIndex: "chiNode",
		
		toolTip: ""
	}) 
	

		, 
			
	
		
		new chi.editor.control.TextField({
		fieldLabel: "chiRequirement",
		name: "chiRequirement",
		dataIndex: "chiRequirement",
		
		toolTip: ""
	}) 
	

		, 
			
	
		
		new chi.editor.control.TextField({
		fieldLabel: "chiSystem",
		name: "chiSystem",
		dataIndex: "chiSystem",
		
		toolTip: ""
	}) 
	

		, 
			
	
		
		new chi.editor.control.TextField({
		fieldLabel: "chiValue",
		name: "chiValue",
		dataIndex: "chiValue",
		
		toolTip: ""
	}) 
	

		, 
			
	
		
		new chi.editor.control.TextField({
		fieldLabel: "chiView",
		name: "chiView",
		dataIndex: "chiView",
		
		toolTip: ""
	}) 
	

		, 
			
	
		
		new chi.editor.control.TextField({
		fieldLabel: "chiWorker",
		name: "chiWorker",
		dataIndex: "chiWorker",
		
		toolTip: ""
	}) 
	

		, 
			
	
		
		new chi.editor.control.TextField({
		fieldLabel: "chiWorkerExternal",
		name: "chiWorkerExternal",
		dataIndex: "chiWorkerExternal",
		
		toolTip: ""
	}) 
	

		, 
			
	
		
		new chi.editor.control.TextField({
		fieldLabel: "chiWorkerInternal",
		name: "chiWorkerInternal",
		dataIndex: "chiWorkerInternal",
		
		toolTip: ""
	}) 
	

		, 
			
	
		
		new chi.editor.control.TextField({
		fieldLabel: "operation",
		name: "operation",
		dataIndex: "operation",
		
		toolTip: ""
	}) 
	

		, 
			
	
		
		new chi.editor.control.TextField({
		fieldLabel: "diagram",
		name: "diagram",
		dataIndex: "diagram",
		
		toolTip: ""
	}) 
	

		, 
			
	
		
		new chi.editor.control.TextField({
		fieldLabel: "activitySet",
		name: "activitySet",
		dataIndex: "activitySet",
		
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
application.application.include.model.CounterDescription.prototype.createInstance = function(oid, data) {
	return new application.application.include.model.Counter(oid, data);
};


chi.model.ModelDescriptionContainer.getInstance().registerDescription(new application.application.include.model.CounterDescription());
	