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
Ext.namespace("application.application.include.model.UseCases");

application.application.include.model.UseCases.ChiBusinessUseCaseDescription = function() {
	application.application.include.model.UseCases.ChiBusinessUseCaseDescription.superclass.constructor.call(this, arguments);
	
	this.chiModelElementId = "ChiBusinessUseCase";
	this.name = "ChiBusinessUseCase";
	this.treeIconClass = "ChiBusinessUseCaseTreeIcon16x16";
	this.owningPackageId = "application.application.include.model.UseCases.UseCases_package";
	
	
	this.recordDefinition = [
	
		{
			name : "primaryActor",
			mapping : "primaryActor"
		}
	, 
		{
			name : "otherActors",
			mapping : "otherActors"
		}
	, 
		{
			name : "goalInContext",
			mapping : "goalInContext"
		}
	, 
		{
			name : "scope",
			mapping : "scope"
		}
	, 
		{
			name : "level",
			mapping : "level"
		}
	, 
		{
			name : "stakeholders",
			mapping : "stakeholders"
		}
	, 
		{
			name : "precondition",
			mapping : "precondition"
		}
	, 
		{
			name : "trigger",
			mapping : "trigger"
		}
	, 
		{
			name : "mainSuccessScenario",
			mapping : "mainSuccessScenario"
		}
	, 
		{
			name : "extensions",
			mapping : "extensions"
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
			name : "activitySet",
			mapping: "activitySet"
		}
	, 
		{
			name : "chiController",
			mapping: "chiController"
		}
	, 
		{
			name : "figure",
			mapping: "figure"
		}
	
	
	
		,
	
	
	
		{
			name : "chiBusinessProcess",
			mapping : "chiBusinessProcess"
		}
	, 
		{
			name : "chiFeature",
			mapping : "chiFeature"
		}
	, 
		{
			name : "package",
			mapping : "package"
		}
	
	];

	
	
	this.relations = {
	
		"activitySet" : {
			isParent : true,
			targetModelClassId : "ActivitySet"
		}
	, 
		"chiController" : {
			isParent : true,
			targetModelClassId : "ChiController"
		}
	, 
		"figure" : {
			isParent : true,
			targetModelClassId : "Figure"
		}
	

	
		,
	
	
	
		"chiBusinessProcess" : {
			isParent : false,
			targetModelClassId : "ChiBusinessProcess"
		}
	, 
		"chiFeature" : {
			isParent : false,
			targetModelClassId : "ChiFeature"
		}
	, 
		"package" : {
			isParent : false,
			targetModelClassId : "Package"
		}
	
	};

};

Ext.extend(application.application.include.model.UseCases.ChiBusinessUseCaseDescription, chi.model.ModelDescription);


application.application.include.model.UseCases.ChiBusinessUseCaseDescription.prototype.getGridColumns = function() {
	return [
	
		
			{
				header : "primaryActor",
				dataIndex : "primaryActor",
				width : 100,
				sortable : true,
				hidden: true,
				editor: 
	
			new chi.editor.control.ComboBox({
				targetChiModelElementId: "ChiWorkerExternal|ChiWorkerInternal|ChiWorker|ChiBusinessPartner|ChiBusinessPartnerActive|ChiBusinessPartnerPassive"
			})
	

			}
		, 
			{
				header : "otherActors",
				dataIndex : "otherActors",
				width : 100,
				sortable : true,
				hidden: true,
				editor: 
	
			new chi.editor.control.ComboBox({
				targetChiModelElementId: "ChiWorkerExternal|ChiWorkerInternal|ChiWorker|ChiBusinessPartner|ChiBusinessPartnerActive|ChiBusinessPartnerPassive"
			})
	

			}
		, 
			{
				header : "goalInContext",
				dataIndex : "goalInContext",
				width : 100,
				sortable : true,
				hidden: true,
				editor: 
	
			new chi.editor.control.TextField({})
	

			}
		, 
			{
				header : "scope",
				dataIndex : "scope",
				width : 100,
				sortable : true,
				hidden: true,
				editor: 
	
			new chi.editor.control.TextField({})
	

			}
		, 
			{
				header : "level",
				dataIndex : "level",
				width : 100,
				sortable : true,
				hidden: true,
				editor: 
	
			new chi.editor.control.TextField({})
	

			}
		, 
			{
				header : "stakeholders",
				dataIndex : "stakeholders",
				width : 100,
				sortable : true,
				hidden: true,
				editor: 
	
			new chi.editor.control.TextField({})
	

			}
		, 
			{
				header : "precondition",
				dataIndex : "precondition",
				width : 100,
				sortable : true,
				hidden: true,
				editor: 
	
			new chi.editor.control.TextField({})
	

			}
		, 
			{
				header : "trigger",
				dataIndex : "trigger",
				width : 100,
				sortable : true,
				hidden: true,
				editor: 
	
			new chi.editor.control.TextField({})
	

			}
		, 
			{
				header : "mainSuccessScenario",
				dataIndex : "mainSuccessScenario",
				width : 100,
				sortable : true,
				hidden: true,
				editor: 
	
			new chi.editor.control.TextField({})
	

			}
		, 
			{
				header : "extensions",
				dataIndex : "extensions",
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
				targetChiModelElementId: "ChiBaseStatus"
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
				targetChiModelElementId: "ChiAuthors"
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
	
			new cwe.modelgrid.DummyField()
	

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



application.application.include.model.UseCases.ChiBusinessUseCaseDescription.prototype.getLabelColumns = function() {
	return [
	
		
			{
				header : "name",
				dataIndex : "name",
				width : 100,
				sortable : true
			}
		
	
	];
};



application.application.include.model.UseCases.ChiBusinessUseCaseDescription.prototype.getEditorItems = function() {
	return [
	
		new cwe.editor.control.PropertiesFieldSet({
			items: [
		
			
	
		
		new chi.editor.control.ComboBox({
		fieldLabel: "primaryActor",
		name: "primaryActor",
		dataIndex: "primaryActor",
		targetChiModelElementId: "ChiWorkerExternal|ChiWorkerInternal|ChiWorker|ChiBusinessPartner|ChiBusinessPartnerActive|ChiBusinessPartnerPassive",
		toolTip: "the main actor of this use case"
	}) 
	

		, 
			
	
		
		new chi.editor.control.ComboBox({
		fieldLabel: "otherActors",
		name: "otherActors",
		dataIndex: "otherActors",
		targetChiModelElementId: "ChiWorkerExternal|ChiWorkerInternal|ChiWorker|ChiBusinessPartner|ChiBusinessPartnerActive|ChiBusinessPartnerPassive",
		toolTip: "The list of actors associated with the use case. Although this information is contained in the use case itself, it helps to increase the understandability of the use case when the diagram is unavailable."
	}) 
	

		, 
			
	
		
		new chi.editor.control.TextField({
		fieldLabel: "goalInContext",
		name: "goalInContext",
		dataIndex: "goalInContext",
		
		toolTip: "The goal should implicitly express the actor's intent or purpose of the use case, such as *Enrol Student in Seminar.*"
	}) 
	

		, 
			
	
		
		new chi.editor.control.TextField({
		fieldLabel: "scope",
		name: "scope",
		dataIndex: "scope",
		
		toolTip: "Boundaries in which the use case is operated when invoked (E.g. CMS)"
	}) 
	

		, 
			
	
		
		new chi.editor.control.TextField({
		fieldLabel: "level",
		name: "level",
		dataIndex: "level",
		
		toolTip: "Authorizations for operations/actions to be performed against the Chi business objects in scope. Against every object/process 4 CRUD basic operations are possible:\nCreate (Write)\nRead (Open)\nUpdate (Change)\nDelete  (Destroy)"
	}) 
	

		, 
			
	
		
		new chi.editor.control.TextField({
		fieldLabel: "stakeholders",
		name: "stakeholders",
		dataIndex: "stakeholders",
		
		toolTip: "List of actors that have a special interest (i.e. to be informed every time) in completion of the use case"
	}) 
	

		, 
			
	
		
		new chi.editor.control.TextField({
		fieldLabel: "precondition",
		name: "precondition",
		dataIndex: "precondition",
		
		toolTip: "A list of the conditions, if any, that must be met before a use case may be invoked. Can be a previous Use case or self the presence of the system in Scope."
	}) 
	

		, 
			
	
		
		new chi.editor.control.TextField({
		fieldLabel: "trigger",
		name: "trigger",
		dataIndex: "trigger",
		
		toolTip: "Event that is responsible for invocation of the use case."
	}) 
	

		, 
			
	
		
		new chi.editor.control.TextField({
		fieldLabel: "mainSuccessScenario",
		name: "mainSuccessScenario",
		dataIndex: "mainSuccessScenario",
		
		toolTip: "The main path of logic an actor follows through a use case. Often referred to as the *happy path* or the *main path* because it describes how the use case works when everything works as it normally should."
	}) 
	

		, 
			
	
		
		new chi.editor.control.TextField({
		fieldLabel: "extensions",
		name: "extensions",
		dataIndex: "extensions",
		
		toolTip: ""
	}) 
	

		, 
			
	
		
		new chi.editor.control.ComboBox({
		fieldLabel: "status",
		name: "status",
		dataIndex: "status",
		targetChiModelElementId: "ChiBaseStatus",
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
		targetChiModelElementId: "ChiAuthors",
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
		
	
	
	
		new cwe.editor.control.AssociationsFieldSet({
			items: [
		
			
	
		new cwe.editor.control.MultipleAssociate( {
	
			fieldLabel : "activitySet",
			name : "activitySet",
			dataIndex : "activitySet",
			targetChiModelElementId : "ActivitySet",
			isParent : true,
			aggregationKind : cwe.Constants.AggregationKind.NONE
		
	})

		, 
			
	
		new cwe.editor.control.MultipleAssociate( {
	
			fieldLabel : "chiController",
			name : "chiController",
			dataIndex : "chiController",
			targetChiModelElementId : "ChiController",
			isParent : true,
			aggregationKind : cwe.Constants.AggregationKind.NONE
		
	})

		, 
			
	
		new cwe.editor.control.MultipleAssociate( {
	
			fieldLabel : "figure",
			name : "figure",
			dataIndex : "figure",
			targetChiModelElementId : "Figure",
			isParent : true,
			aggregationKind : cwe.Constants.AggregationKind.NONE
		
	})

		
		
		
			,
		
		
		
			
	
		new cwe.editor.control.SingleAssociate( {
	
			fieldLabel : "chiBusinessProcess",
			name : "chiBusinessProcess",
			dataIndex : "chiBusinessProcess",
			targetChiModelElementId : "ChiBusinessProcess",
			isParent : false,
			aggregationKind : cwe.Constants.AggregationKind.COMPOSITE
		
	})

		, 
			
	
		new cwe.editor.control.SingleAssociate( {
	
			fieldLabel : "chiFeature",
			name : "chiFeature",
			dataIndex : "chiFeature",
			targetChiModelElementId : "ChiFeature",
			isParent : false,
			aggregationKind : cwe.Constants.AggregationKind.COMPOSITE
		
	})

		, 
			
	
		new cwe.editor.control.SingleAssociate( {
	
			fieldLabel : "package",
			name : "package",
			dataIndex : "package",
			targetChiModelElementId : "Package",
			isParent : false,
			aggregationKind : cwe.Constants.AggregationKind.SHARED
		
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
application.application.include.model.UseCases.ChiBusinessUseCaseDescription.prototype.createInstance = function(oid, data) {
	return new application.application.include.model.UseCases.ChiBusinessUseCase(oid, data);
};


chi.model.ModelDescriptionContainer.getInstance().registerDescription(new application.application.include.model.UseCases.ChiBusinessUseCaseDescription());
	