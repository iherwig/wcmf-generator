
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

application.application.include.model.requirements.ChiRequirement = function() {
	application.application.include.model.requirements.ChiRequirement.superclass.constructor.call(this, arguments);
	
	this.cweModelElementId = "ChiRequirement";
	this.name = "ChiRequirement";
	this.treeIconClass = "ChiRequirementTreeIcon16x16";
	this.owningPackageId = "application.application.include.model.requirements.Requirements_package";
	
	
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
			name : "Composition",
			mapping : "Composition"
		}
	, 
		{
			name : "reqType",
			mapping : "reqType"
		}
	, 
		{
			name : "Priority",
			mapping : "Priority"
		}
	, 
		{
			name : "Author",
			mapping : "Author"
		}
	, 
		{
			name : "Proofreader",
			mapping : "Proofreader"
		}
	, 
		{
			name : "Status",
			mapping : "Status"
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
			name : "parentChiRequirement",
			mapping: "parentChiRequirement"
		}
	, 
		{
			name : "parentPackage",
			mapping: "parentPackage"
		}
	
	
	
		,
	
	
	
		{
			name : "childChiRequirement",
			mapping : "childChiRequirement"
		}
	, 
		{
			name : "childChiIssue",
			mapping : "childChiIssue"
		}
	, 
		{
			name : "childNMFeatureRequirements",
			mapping : "childNMFeatureRequirements"
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
		"parentChiRequirement" : {
			isParent : true,
			targetModelClassId : "ChiRequirement"
		}
	, 
		"parentPackage" : {
			isParent : true,
			targetModelClassId : "Package"
		}
	

	
		,
	
	
	
		"childChiRequirement" : {
			isParent : false,
			targetModelClassId : "ChiRequirement"
		}
	, 
		"childChiIssue" : {
			isParent : false,
			targetModelClassId : "ChiIssue"
		}
	, 
		"childNMFeatureRequirements" : {
			isParent : false,
			targetModelClassId : "NMFeatureRequirements"
		}
	, 
		"childFigure" : {
			isParent : false,
			targetModelClassId : "Figure"
		}
	
	}

}

Ext.extend(application.application.include.model.requirements.ChiRequirement, cwe.model.ModelClass);


application.application.include.model.requirements.ChiRequirement.prototype.getEditorItems = function() {
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
			fieldLabel : "reqType",
			name : "reqType",
			dataIndex : "reqType"
		})
	, 
		 new Ext.form.TextField( {
			fieldLabel : "Priority",
			name : "Priority",
			dataIndex : "Priority"
		})
	, 
		 new Ext.form.TextField( {
			fieldLabel : "Author",
			name : "Author",
			dataIndex : "Author"
		})
	, 
		 new Ext.form.TextField( {
			fieldLabel : "Proofreader",
			name : "Proofreader",
			dataIndex : "Proofreader"
		})
	, 
		 new Ext.form.TextField( {
			fieldLabel : "Status",
			name : "Status",
			dataIndex : "Status"
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
	
		
			fieldLabel : "parentChiRequirement",
			name : "parentChiRequirement",
			dataIndex : "parentChiRequirement",
			targetCweModelElementId : "ChiRequirement",
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
	
		
			fieldLabel : "childChiRequirement",
			name : "childChiRequirement",
			dataIndex : "childChiRequirement",
			targetCweModelElementId : "ChiRequirement",
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
	
		
			fieldLabel : "childNMFeatureRequirements",
			name : "childNMFeatureRequirements",
			dataIndex : "childNMFeatureRequirements",
			targetCweModelElementId : "NMFeatureRequirements",
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


cwe.model.ModelClassContainer.getInstance().registerClass(new application.application.include.model.requirements.ChiRequirement());
	