
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
Ext.namespace("application.application.include.model.requirements");

application.application.include.model.requirements.ChiGoal = function() {
	application.application.include.model.requirements.ChiGoal.superclass.constructor.call(this, arguments);
	
	this.cweModelElementId = "ChiGoal";
	this.name = "ChiGoal";
	this.treeIconClass = "ChiGoalTreeIcon16x16";
	this.owningPackageId = "application.application.include.model.requirements.Requirements_package";
	
	
	this.recordDefinition = [
	
		{
			name : "Priority",
			mapping : "Priority"
		}
	, 
		{
			name : "Value_ammount",
			mapping : "Value_ammount"
		}
	, 
		{
			name : "Value_Goal",
			mapping : "Value_Goal"
		}
	, 
		{
			name : "Value_Name",
			mapping : "Value_Name"
		}
	, 
		{
			name : "GoalType",
			mapping : "GoalType"
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
			name : "parentChiGoal",
			mapping: "parentChiGoal"
		}
	, 
		{
			name : "parentPackage",
			mapping: "parentPackage"
		}
	
	
	
		,
	
	
	
		{
			name : "childChiGoal",
			mapping : "childChiGoal"
		}
	, 
		{
			name : "childChiRequirement",
			mapping : "childChiRequirement"
		}
	, 
		{
			name : "childFigure",
			mapping : "childFigure"
		}
	
	];

	
	
	this.relations = {
	
		"parentChiGoal" : {
			isParent : true,
			targetModelClassId : "ChiGoal"
		}
	, 
		"parentPackage" : {
			isParent : true,
			targetModelClassId : "Package"
		}
	

	
		,
	
	
	
		"childChiGoal" : {
			isParent : false,
			targetModelClassId : "ChiGoal"
		}
	, 
		"childChiRequirement" : {
			isParent : false,
			targetModelClassId : "ChiRequirement"
		}
	, 
		"childFigure" : {
			isParent : false,
			targetModelClassId : "Figure"
		}
	
	}

}

Ext.extend(application.application.include.model.requirements.ChiGoal, cwe.model.ModelClass);


application.application.include.model.requirements.ChiGoal.prototype.getEditorItems = function() {
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
			fieldLabel : "Composition",
			name : "Composition",
			dataIndex : "Composition"
		})
	, 
		 new Ext.form.TextField( {
			fieldLabel : "Priority",
			name : "Priority",
			dataIndex : "Priority"
		})
	, 
		 new Ext.form.TextField( {
			fieldLabel : "Value_ammount",
			name : "Value_ammount",
			dataIndex : "Value_ammount"
		})
	, 
		 new Ext.form.TextField( {
			fieldLabel : "Value_Goal",
			name : "Value_Goal",
			dataIndex : "Value_Goal"
		})
	, 
		 new Ext.form.TextField( {
			fieldLabel : "Value_Name",
			name : "Value_Name",
			dataIndex : "Value_Name"
		})
	, 
		 new Ext.form.TextField( {
			fieldLabel : "GoalType",
			name : "GoalType",
			dataIndex : "GoalType"
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
	
		
			fieldLabel : "parentChiGoal",
			name : "parentChiGoal",
			dataIndex : "parentChiGoal",
			targetCweModelElementId : "ChiGoal",
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
	
		
			fieldLabel : "childChiGoal",
			name : "childChiGoal",
			dataIndex : "childChiGoal",
			targetCweModelElementId : "ChiGoal",
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
	
		
			fieldLabel : "childFigure",
			name : "childFigure",
			dataIndex : "childFigure",
			targetCweModelElementId : "Figure",
			isParent : false
		
	})

	
 ];
}


cwe.model.ModelClassContainer.getInstance().registerClass(new application.application.include.model.requirements.ChiGoal());
	