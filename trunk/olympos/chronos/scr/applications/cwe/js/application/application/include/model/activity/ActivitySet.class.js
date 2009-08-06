
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

application.application.include.model.activity.ActivitySet = function() {
	application.application.include.model.activity.ActivitySet.superclass.constructor.call(this, arguments);
	
	this.cweModelElementId = "ActivitySet";
	this.name = "ActivitySet";
	this.treeIconClass = "ActivitySetTreeIcon16x16";
	this.owningPackageId = "application.application.include.model.activity.Activity_package";
	
	
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
			name : "childChiObject",
			mapping : "childChiObject"
		}
	, 
		{
			name : "childActivity",
			mapping : "childActivity"
		}
	, 
		{
			name : "childActivityDecision",
			mapping : "childActivityDecision"
		}
	, 
		{
			name : "childActivityReceive",
			mapping : "childActivityReceive"
		}
	, 
		{
			name : "childActivitySend",
			mapping : "childActivitySend"
		}
	, 
		{
			name : "childActivityInitial",
			mapping : "childActivityInitial"
		}
	, 
		{
			name : "childActivityFinal",
			mapping : "childActivityFinal"
		}
	, 
		{
			name : "childFigure",
			mapping : "childFigure"
		}
	
	];

	
	
	this.relations = {
	
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
	
	
	
		"childChiObject" : {
			isParent : false,
			targetModelClassId : "ChiObject"
		}
	, 
		"childActivity" : {
			isParent : false,
			targetModelClassId : "Activity"
		}
	, 
		"childActivityDecision" : {
			isParent : false,
			targetModelClassId : "ActivityDecision"
		}
	, 
		"childActivityReceive" : {
			isParent : false,
			targetModelClassId : "ActivityReceive"
		}
	, 
		"childActivitySend" : {
			isParent : false,
			targetModelClassId : "ActivitySend"
		}
	, 
		"childActivityInitial" : {
			isParent : false,
			targetModelClassId : "ActivityInitial"
		}
	, 
		"childActivityFinal" : {
			isParent : false,
			targetModelClassId : "ActivityFinal"
		}
	, 
		"childFigure" : {
			isParent : false,
			targetModelClassId : "Figure"
		}
	
	};

};

Ext.extend(application.application.include.model.activity.ActivitySet, cwe.model.ModelClass);


application.application.include.model.activity.ActivitySet.prototype.getGridColumns = function() {
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



application.application.include.model.activity.ActivitySet.prototype.getEditorItems = function() {
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
		
		
		
			
	
		new cwe.editor.control.MultipleAssociate( {
	
		
			fieldLabel : "childChiObject",
			name : "childChiObject",
			dataIndex : "childChiObject",
			targetCweModelElementId : "ChiObject",
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
	
		
			fieldLabel : "childActivityDecision",
			name : "childActivityDecision",
			dataIndex : "childActivityDecision",
			targetCweModelElementId : "ActivityDecision",
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
	
		
			fieldLabel : "childActivitySend",
			name : "childActivitySend",
			dataIndex : "childActivitySend",
			targetCweModelElementId : "ActivitySend",
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
	
		
			fieldLabel : "childActivityFinal",
			name : "childActivityFinal",
			dataIndex : "childActivityFinal",
			targetCweModelElementId : "ActivityFinal",
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


cwe.model.ModelClassContainer.getInstance().registerClass(new application.application.include.model.activity.ActivitySet());
	