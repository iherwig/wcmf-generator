
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
Ext.namespace("application.application.include.model.UseCases");

application.application.include.model.UseCases.ChiBusinessUseCase = function() {
	application.application.include.model.UseCases.ChiBusinessUseCase.superclass.constructor.call(this, arguments);
	
	this.cweModelElementId = "ChiBusinessUseCase";
	this.name = "ChiBusinessUseCase";
	this.treeIconClass = "ChiBusinessUseCaseTreeIcon16x16";
	this.owningPackageId = "application.application.include.model.UseCases.UseCases_package";
	
	
	this.recordDefinition = [
	
		{
			name : "PrimaryActor",
			mapping : "PrimaryActor"
		}
	, 
		{
			name : "OtherActors",
			mapping : "OtherActors"
		}
	, 
		{
			name : "GoalInContext",
			mapping : "GoalInContext"
		}
	, 
		{
			name : "Scope",
			mapping : "Scope"
		}
	, 
		{
			name : "Level",
			mapping : "Level"
		}
	, 
		{
			name : "Stakeholders",
			mapping : "Stakeholders"
		}
	, 
		{
			name : "Precondition",
			mapping : "Precondition"
		}
	, 
		{
			name : "Trigger",
			mapping : "Trigger"
		}
	, 
		{
			name : "MainSuccessScenario",
			mapping : "MainSuccessScenario"
		}
	, 
		{
			name : "Extensions",
			mapping : "Extensions"
		}
	, 
		{
			name : "Alias",
			mapping : "Alias"
		}
	, 
		{
			name : "Status",
			mapping : "Status"
		}
	, 
		{
			name : "Author",
			mapping : "Author"
		}
	, 
		{
			name : "Version",
			mapping : "Version"
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
			name : "parentChiBusinessProcess",
			mapping: "parentChiBusinessProcess"
		}
	, 
		{
			name : "parentChiFeature",
			mapping: "parentChiFeature"
		}
	, 
		{
			name : "parentPackage",
			mapping: "parentPackage"
		}
	
	
	
		,
	
	
	
		{
			name : "childActivitySet",
			mapping : "childActivitySet"
		}
	, 
		{
			name : "childNMUCActor",
			mapping : "childNMUCActor"
		}
	, 
		{
			name : "childChiController",
			mapping : "childChiController"
		}
	, 
		{
			name : "childFigure",
			mapping : "childFigure"
		}
	
	];

	
	
	this.relations = {
	
		"parentChiBusinessProcess" : {
			isParent : true,
			targetModelClassId : "ChiBusinessProcess"
		}
	, 
		"parentChiFeature" : {
			isParent : true,
			targetModelClassId : "ChiFeature"
		}
	, 
		"parentPackage" : {
			isParent : true,
			targetModelClassId : "Package"
		}
	

	
		,
	
	
	
		"childActivitySet" : {
			isParent : false,
			targetModelClassId : "ActivitySet"
		}
	, 
		"childNMUCActor" : {
			isParent : false,
			targetModelClassId : "NMUCActor"
		}
	, 
		"childChiController" : {
			isParent : false,
			targetModelClassId : "ChiController"
		}
	, 
		"childFigure" : {
			isParent : false,
			targetModelClassId : "Figure"
		}
	
	};

};

Ext.extend(application.application.include.model.UseCases.ChiBusinessUseCase, cwe.model.ModelClass);


application.application.include.model.UseCases.ChiBusinessUseCase.prototype.getGridColumns = function() {
	return [
	
		
			{
			    header : "PrimaryActor",
			    dataIndex : "PrimaryActor",
			    width : 100,
			    sortable : true,
			    editor: 
	
		
			new cwe.editor.control.ComboBox({
				targetCweModelElementId: "ChiWorkerExternal|ChiWorkerInternal|ChiWorker|ChiBusinessPartner|ChiBusinessPartnerActive|ChiBusinessPartnerPassive"
			})
					
	

			}
		, 
			{
			    header : "OtherActors",
			    dataIndex : "OtherActors",
			    width : 100,
			    sortable : true,
			    editor: 
	
		
			new cwe.editor.control.ComboBox({
				targetCweModelElementId: "ChiWorkerExternal|ChiWorkerInternal|ChiWorker|ChiBusinessPartner|ChiBusinessPartnerActive|ChiBusinessPartnerPassive"
			})
					
	

			}
		, 
			{
			    header : "GoalInContext",
			    dataIndex : "GoalInContext",
			    width : 100,
			    sortable : true,
			    editor: 
	
		
			new cwe.editor.control.TextField({
				
			})
					
	

			}
		, 
			{
			    header : "Scope",
			    dataIndex : "Scope",
			    width : 100,
			    sortable : true,
			    editor: 
	
		
			new cwe.editor.control.TextField({
				
			})
					
	

			}
		, 
			{
			    header : "Level",
			    dataIndex : "Level",
			    width : 100,
			    sortable : true,
			    editor: 
	
		
			new cwe.editor.control.TextField({
				
			})
					
	

			}
		, 
			{
			    header : "Stakeholders",
			    dataIndex : "Stakeholders",
			    width : 100,
			    sortable : true,
			    editor: 
	
		
			new cwe.editor.control.TextField({
				
			})
					
	

			}
		, 
			{
			    header : "Precondition",
			    dataIndex : "Precondition",
			    width : 100,
			    sortable : true,
			    editor: 
	
		
			new cwe.editor.control.TextField({
				
			})
					
	

			}
		, 
			{
			    header : "Trigger",
			    dataIndex : "Trigger",
			    width : 100,
			    sortable : true,
			    editor: 
	
		
			new cwe.editor.control.TextField({
				
			})
					
	

			}
		, 
			{
			    header : "MainSuccessScenario",
			    dataIndex : "MainSuccessScenario",
			    width : 100,
			    sortable : true,
			    editor: 
	
		
			new cwe.editor.control.TextField({
				
			})
					
	

			}
		, 
			{
			    header : "Extensions",
			    dataIndex : "Extensions",
			    width : 100,
			    sortable : true,
			    editor: 
	
		
			new cwe.editor.control.TextField({
				
			})
					
	

			}
		, 
			{
			    header : "Alias",
			    dataIndex : "Alias",
			    width : 100,
			    sortable : true,
			    editor: 
	
		
			new cwe.editor.control.TextField({
				
			})
					
	

			}
		, 
			{
			    header : "Status",
			    dataIndex : "Status",
			    width : 100,
			    sortable : true,
			    editor: 
	
		
			new cwe.editor.control.ComboBox({
				targetCweModelElementId: "ChiBaseStatus"
			})
					
	

			}
		, 
			{
			    header : "Author",
			    dataIndex : "Author",
			    width : 100,
			    sortable : true,
			    editor: 
	
		
			new cwe.editor.control.ComboBox({
				targetCweModelElementId: "ChiAuthors"
			})
					
	

			}
		, 
			{
			    header : "Version",
			    dataIndex : "Version",
			    width : 100,
			    sortable : true,
			    editor: 
	
		
			new cwe.editor.control.TextField({
				
			})
					
	

			}
		, 
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



application.application.include.model.UseCases.ChiBusinessUseCase.prototype.getEditorItems = function() {
	return [
	
		new cwe.editor.control.PropertiesFieldSet({
			items: [
		
			
	new cwe.editor.control.ComboBox({
		fieldLabel: "PrimaryActor",
		name: "PrimaryActor",
		dataIndex: "PrimaryActor",
		targetCweModelElementId: "ChiWorkerExternal|ChiWorkerInternal|ChiWorker|ChiBusinessPartner|ChiBusinessPartnerActive|ChiBusinessPartnerPassive",
		
		toolTip: "the main actor of this use case"
	}) 

		, 
			
	new cwe.editor.control.ComboBox({
		fieldLabel: "OtherActors",
		name: "OtherActors",
		dataIndex: "OtherActors",
		targetCweModelElementId: "ChiWorkerExternal|ChiWorkerInternal|ChiWorker|ChiBusinessPartner|ChiBusinessPartnerActive|ChiBusinessPartnerPassive",
		
		toolTip: "The list of actors associated with the use case. Although this information is contained in the use case itself, it helps to increase the understandability of the use case when the diagram is unavailable."
	}) 

		, 
			
	new cwe.editor.control.TextField({
		fieldLabel: "GoalInContext",
		name: "GoalInContext",
		dataIndex: "GoalInContext",
		
		
		toolTip: "The goal should implicitly express the actor's intent or purpose of the use case, such as *Enrol Student in Seminar.*"
	}) 

		, 
			
	new cwe.editor.control.TextField({
		fieldLabel: "Scope",
		name: "Scope",
		dataIndex: "Scope",
		
		
		toolTip: "Boundaries in which the use case is operated when invoked (E.g. CMS)"
	}) 

		, 
			
	new cwe.editor.control.TextField({
		fieldLabel: "Level",
		name: "Level",
		dataIndex: "Level",
		
		
		toolTip: "Authorizations for operations/actions to be performed against the Chi business objects in scope. Against every object/process 4 CRUD basic operations are possible:\nCreate (Write)\nRead (Open)\nUpdate (Change)\nDelete  (Destroy)"
	}) 

		, 
			
	new cwe.editor.control.TextField({
		fieldLabel: "Stakeholders",
		name: "Stakeholders",
		dataIndex: "Stakeholders",
		
		
		toolTip: "List of actors that have a special interest (i.e. to be informed every time) in completion of the use case"
	}) 

		, 
			
	new cwe.editor.control.TextField({
		fieldLabel: "Precondition",
		name: "Precondition",
		dataIndex: "Precondition",
		
		
		toolTip: "A list of the conditions, if any, that must be met before a use case may be invoked. Can be a previous Use case or self the presence of the system in Scope."
	}) 

		, 
			
	new cwe.editor.control.TextField({
		fieldLabel: "Trigger",
		name: "Trigger",
		dataIndex: "Trigger",
		
		
		toolTip: "Event that is responsible for invocation of the use case."
	}) 

		, 
			
	new cwe.editor.control.TextField({
		fieldLabel: "MainSuccessScenario",
		name: "MainSuccessScenario",
		dataIndex: "MainSuccessScenario",
		
		
		toolTip: "The main path of logic an actor follows through a use case. Often referred to as the *happy path* or the *main path* because it describes how the use case works when everything works as it normally should."
	}) 

		, 
			
	new cwe.editor.control.TextField({
		fieldLabel: "Extensions",
		name: "Extensions",
		dataIndex: "Extensions",
		
		
		toolTip: ""
	}) 

		, 
			
	new cwe.editor.control.TextField({
		fieldLabel: "Alias",
		name: "Alias",
		dataIndex: "Alias",
		
		
		toolTip: "the Project Id of this object."
	}) 

		, 
			
	new cwe.editor.control.ComboBox({
		fieldLabel: "Status",
		name: "Status",
		dataIndex: "Status",
		targetCweModelElementId: "ChiBaseStatus",
		
		toolTip: ""
	}) 

		, 
			
	new cwe.editor.control.ComboBox({
		fieldLabel: "Author",
		name: "Author",
		dataIndex: "Author",
		targetCweModelElementId: "ChiAuthors",
		
		toolTip: ""
	}) 

		, 
			
	new cwe.editor.control.TextField({
		fieldLabel: "Version",
		name: "Version",
		dataIndex: "Version",
		
		
		toolTip: "the model version of this object"
	}) 

		, 
			
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
	
		
			fieldLabel : "parentChiBusinessProcess",
			name : "parentChiBusinessProcess",
			dataIndex : "parentChiBusinessProcess",
			targetCweModelElementId : "ChiBusinessProcess",
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
	
		
			fieldLabel : "parentPackage",
			name : "parentPackage",
			dataIndex : "parentPackage",
			targetCweModelElementId : "Package",
			isParent : true
		
	})

		
		
		
			,
		
		
		
			
	
		new cwe.editor.control.MultipleAssociate( {
	
		
			fieldLabel : "childActivitySet",
			name : "childActivitySet",
			dataIndex : "childActivitySet",
			targetCweModelElementId : "ActivitySet",
			isParent : false
		
	})

		, 
			
	
		new cwe.editor.control.MultipleAssociate( {
	
		
			fieldLabel : "childNMUCActor",
			name : "childNMUCActor",
			dataIndex : "childNMUCActor",
			targetCweModelElementId : "NMUCActor",
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
	
		
			fieldLabel : "childFigure",
			name : "childFigure",
			dataIndex : "childFigure",
			targetCweModelElementId : "Figure",
			isParent : false
		
	})

		
		
		]})
	
 ];
};


cwe.model.ModelClassContainer.getInstance().registerClass(new application.application.include.model.UseCases.ChiBusinessUseCase());
	