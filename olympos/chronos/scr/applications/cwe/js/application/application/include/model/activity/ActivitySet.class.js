
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
			name : "id",
			mapping : "id"
		}
	, 
		{
			name : "fk_chibusinessusecasecore_id",
			mapping : "fk_chibusinessusecasecore_id"
		}
	, 
		{
			name : "Aggregation",
			mapping : "Aggregation"
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
	
	}

}

Ext.extend(application.application.include.model.activity.ActivitySet, cwe.model.ModelClass);


application.application.include.model.activity.ActivitySet.prototype.getEditorItems = function() {
	return [
	
		 new Ext.form.TextField( {
			fieldLabel : "id",
			name : "id",
			dataIndex : "id"
		})
	, 
		 new Ext.form.TextField( {
			fieldLabel : "fk_chibusinessusecasecore_id",
			name : "fk_chibusinessusecasecore_id",
			dataIndex : "fk_chibusinessusecasecore_id"
		})
	, 
		 new Ext.form.TextField( {
			fieldLabel : "Aggregation",
			name : "Aggregation",
			dataIndex : "Aggregation"
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

	
 ];
}


cwe.model.ModelClassContainer.getInstance().registerClass(new application.application.include.model.activity.ActivitySet());
	