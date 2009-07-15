
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
Ext.namespace("application.application.include.model.activity");

application.application.include.model.activity.ChiBusinessUseCase = function() {
	application.application.include.model.activity.ChiBusinessUseCase.superclass.constructor.call(this, arguments);
	
	this.cweModelElementId = "ChiBusinessUseCase";
	this.name = "ChiBusinessUseCase";
	this.treeIconClass = "ChiBusinessUseCaseTreeIcon16x16";
	this.owningPackageId = "application.application.include.model.activity.Activity_package";
	
	
	this.recordDefinition = [
	
		{
			name : "id",
			mapping : "id"
		}
	, 
		{
			name : "fk_package_id",
			mapping : "fk_package_id"
		}
	, 
		{
			name : "Realization",
			mapping : "Realization"
		}
	, 
		{
			name : "Composition",
			mapping : "Composition"
		}
	, 
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
		"childFigure" : {
			isParent : false,
			targetModelClassId : "Figure"
		}
	
	}

}

Ext.extend(application.application.include.model.activity.ChiBusinessUseCase, cwe.model.ModelClass);


application.application.include.model.activity.ChiBusinessUseCase.prototype.getEditorItems = function() {
	return [
	
		 new Ext.form.TextField( {
			fieldLabel : "id",
			name : "id",
			dataIndex : "id"
		})
	, 
		 new Ext.form.TextField( {
			fieldLabel : "fk_package_id",
			name : "fk_package_id",
			dataIndex : "fk_package_id"
		})
	, 
		 new Ext.form.TextField( {
			fieldLabel : "Realization",
			name : "Realization",
			dataIndex : "Realization"
		})
	, 
		 new Ext.form.TextField( {
			fieldLabel : "Composition",
			name : "Composition",
			dataIndex : "Composition"
		})
	, 
		 new Ext.form.TextField( {
			fieldLabel : "PrimaryActor",
			name : "PrimaryActor",
			dataIndex : "PrimaryActor"
		})
	, 
		 new Ext.form.TextField( {
			fieldLabel : "OtherActors",
			name : "OtherActors",
			dataIndex : "OtherActors"
		})
	, 
		 new Ext.form.TextField( {
			fieldLabel : "GoalInContext",
			name : "GoalInContext",
			dataIndex : "GoalInContext"
		})
	, 
		 new Ext.form.TextField( {
			fieldLabel : "Scope",
			name : "Scope",
			dataIndex : "Scope"
		})
	, 
		 new Ext.form.TextField( {
			fieldLabel : "Level",
			name : "Level",
			dataIndex : "Level"
		})
	, 
		 new Ext.form.TextField( {
			fieldLabel : "Stakeholders",
			name : "Stakeholders",
			dataIndex : "Stakeholders"
		})
	, 
		 new Ext.form.TextField( {
			fieldLabel : "Precondition",
			name : "Precondition",
			dataIndex : "Precondition"
		})
	, 
		 new Ext.form.TextField( {
			fieldLabel : "Trigger",
			name : "Trigger",
			dataIndex : "Trigger"
		})
	, 
		 new Ext.form.TextField( {
			fieldLabel : "MainSuccessScenario",
			name : "MainSuccessScenario",
			dataIndex : "MainSuccessScenario"
		})
	, 
		 new Ext.form.TextField( {
			fieldLabel : "Extensions",
			name : "Extensions",
			dataIndex : "Extensions"
		})
	, 
		 new Ext.form.TextField( {
			fieldLabel : "Alias",
			name : "Alias",
			dataIndex : "Alias"
		})
	, 
		 new Ext.form.TextField( {
			fieldLabel : "Version",
			name : "Version",
			dataIndex : "Version"
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
	
		
			fieldLabel : "childFigure",
			name : "childFigure",
			dataIndex : "childFigure",
			targetCweModelElementId : "Figure",
			isParent : false
		
	})

	
 ];
}


cwe.model.ModelClassContainer.getInstance().registerClass(new application.application.include.model.activity.ChiBusinessUseCase());
	