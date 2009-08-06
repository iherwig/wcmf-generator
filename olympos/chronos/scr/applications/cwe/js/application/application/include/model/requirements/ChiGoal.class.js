
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
	
	};

};

Ext.extend(application.application.include.model.requirements.ChiGoal, cwe.model.ModelClass);


application.application.include.model.requirements.ChiGoal.prototype.getGridColumns = function() {
	return [
	
		
			{
			    header : "Priority",
			    dataIndex : "Priority",
			    width : 100,
			    sortable : true,
			    editor: 
	
		
			new cwe.editor.control.TextField({
				
			})
					
	

			}
		, 
			{
			    header : "Value_ammount",
			    dataIndex : "Value_ammount",
			    width : 100,
			    sortable : true,
			    editor: 
	
		
			new cwe.editor.control.TextField({
				
			})
					
	

			}
		, 
			{
			    header : "Value_Goal",
			    dataIndex : "Value_Goal",
			    width : 100,
			    sortable : true,
			    editor: 
	
		
			new cwe.editor.control.TextField({
				
			})
					
	

			}
		, 
			{
			    header : "Value_Name",
			    dataIndex : "Value_Name",
			    width : 100,
			    sortable : true,
			    editor: 
	
		
			new cwe.editor.control.TextField({
				
			})
					
	

			}
		, 
			{
			    header : "GoalType",
			    dataIndex : "GoalType",
			    width : 100,
			    sortable : true,
			    editor: 
	
		
			new cwe.editor.control.ComboBox({
				targetCweModelElementId: "ChiGoalType"
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



application.application.include.model.requirements.ChiGoal.prototype.getEditorItems = function() {
	return [
	
		new cwe.editor.control.PropertiesFieldSet({
			items: [
		
			
	new cwe.editor.control.TextField({
		fieldLabel: "Priority",
		name: "Priority",
		dataIndex: "Priority",
		
		
		toolTip: "A priority in %"
	}) 

		, 
			
	new cwe.editor.control.TextField({
		fieldLabel: "Value_ammount",
		name: "Value_ammount",
		dataIndex: "Value_ammount",
		
		
		toolTip: "The actual amount of the value this goal intends to alter."
	}) 

		, 
			
	new cwe.editor.control.TextField({
		fieldLabel: "Value_Goal",
		name: "Value_Goal",
		dataIndex: "Value_Goal",
		
		
		toolTip: "The amount by which the value is to be altered."
	}) 

		, 
			
	new cwe.editor.control.TextField({
		fieldLabel: "Value_Name",
		name: "Value_Name",
		dataIndex: "Value_Name",
		
		
		toolTip: "The name of the value this goal intends to alter."
	}) 

		, 
			
	new cwe.editor.control.ComboBox({
		fieldLabel: "GoalType",
		name: "GoalType",
		dataIndex: "GoalType",
		targetCweModelElementId: "ChiGoalType",
		
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

		
		
		]})
	
 ];
};


cwe.model.ModelClassContainer.getInstance().registerClass(new application.application.include.model.requirements.ChiGoal());
	