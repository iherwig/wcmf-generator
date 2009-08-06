
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
Ext.namespace("application.application.include.model.domain");

application.application.include.model.domain.NMChiControllerActionKeyChiView = function() {
	application.application.include.model.domain.NMChiControllerActionKeyChiView.superclass.constructor.call(this, arguments);
	
	this.cweModelElementId = "NMChiControllerActionKeyChiView";
	this.name = "NMChiControllerActionKeyChiView";
	this.treeIconClass = "NMChiControllerActionKeyChiViewTreeIcon16x16";
	this.owningPackageId = "application.application.include.model.domain.Domain_package";
	
	
	this.recordDefinition = [
	
		{
			name : "action",
			mapping : "action"
		}
	, 
		{
			name : "config",
			mapping : "config"
		}
	, 
		{
			name : "context",
			mapping : "context"
		}
	, 
		{
			name : "sourceMultiplicity",
			mapping : "sourceMultiplicity"
		}
	, 
		{
			name : "sourceNavigability",
			mapping : "sourceNavigability"
		}
	, 
		{
			name : "targetMultiplicity",
			mapping : "targetMultiplicity"
		}
	, 
		{
			name : "targetNavigability",
			mapping : "targetNavigability"
		}
	, 
		{
			name : "relationType",
			mapping : "relationType"
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
			name : "parentChiController",
			mapping: "parentChiController"
		}
	, 
		{
			name : "parentChiView",
			mapping: "parentChiView"
		}
	
	
	
	
	
	];

	
	
	this.relations = {
	
		"parentChiController" : {
			isParent : true,
			targetModelClassId : "ChiController"
		}
	, 
		"parentChiView" : {
			isParent : true,
			targetModelClassId : "ChiView"
		}
	

	
	
	
	};

};

Ext.extend(application.application.include.model.domain.NMChiControllerActionKeyChiView, cwe.model.ModelClass);


application.application.include.model.domain.NMChiControllerActionKeyChiView.prototype.getGridColumns = function() {
	return [
	
		
			{
			    header : "action",
			    dataIndex : "action",
			    width : 100,
			    sortable : true,
			    editor: 
	
		
			new cwe.editor.control.TextField({
				
			})
					
	

			}
		, 
			{
			    header : "config",
			    dataIndex : "config",
			    width : 100,
			    sortable : true,
			    editor: 
	
		
			new cwe.editor.control.TextField({
				
			})
					
	

			}
		, 
			{
			    header : "context",
			    dataIndex : "context",
			    width : 100,
			    sortable : true,
			    editor: 
	
		
			new cwe.editor.control.TextField({
				
			})
					
	

			}
		, 
			{
			    header : "sourceMultiplicity",
			    dataIndex : "sourceMultiplicity",
			    width : 100,
			    sortable : true,
			    editor: 
	
		
			new cwe.editor.control.ComboBox({
				targetCweModelElementId: "RelationMultiplicity"
			})
					
	

			}
		, 
			{
			    header : "sourceNavigability",
			    dataIndex : "sourceNavigability",
			    width : 100,
			    sortable : true,
			    editor: 
	
		
			new cwe.editor.control.ComboBox({
				targetCweModelElementId: "Navigable|Non-Navigable"
			})
					
	

			}
		, 
			{
			    header : "targetMultiplicity",
			    dataIndex : "targetMultiplicity",
			    width : 100,
			    sortable : true,
			    editor: 
	
		
			new cwe.editor.control.ComboBox({
				targetCweModelElementId: "RelationMultiplicity"
			})
					
	

			}
		, 
			{
			    header : "targetNavigability",
			    dataIndex : "targetNavigability",
			    width : 100,
			    sortable : true,
			    editor: 
	
		
			new cwe.editor.control.ComboBox({
				targetCweModelElementId: "Navigable|Non-Navigable"
			})
					
	

			}
		, 
			{
			    header : "relationType",
			    dataIndex : "relationType",
			    width : 100,
			    sortable : true,
			    editor: 
	
		
			new cwe.editor.control.ComboBox({
				targetCweModelElementId: "generalization|association|aggregation|composition"
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



application.application.include.model.domain.NMChiControllerActionKeyChiView.prototype.getEditorItems = function() {
	return [
	
		new cwe.editor.control.PropertiesFieldSet({
			items: [
		
			
	new cwe.editor.control.TextField({
		fieldLabel: "action",
		name: "action",
		dataIndex: "action",
		
		
		toolTip: "The Action which triggeres this association"
	}) 

		, 
			
	new cwe.editor.control.TextField({
		fieldLabel: "config",
		name: "config",
		dataIndex: "config",
		
		
		toolTip: "The configuration file in which this association will be placed"
	}) 

		, 
			
	new cwe.editor.control.TextField({
		fieldLabel: "context",
		name: "context",
		dataIndex: "context",
		
		
		toolTip: "The Context in which this association is valid"
	}) 

		, 
			
	new cwe.editor.control.ComboBox({
		fieldLabel: "sourceMultiplicity",
		name: "sourceMultiplicity",
		dataIndex: "sourceMultiplicity",
		targetCweModelElementId: "RelationMultiplicity",
		
		toolTip: ""
	}) 

		, 
			
	new cwe.editor.control.ComboBox({
		fieldLabel: "sourceNavigability",
		name: "sourceNavigability",
		dataIndex: "sourceNavigability",
		targetCweModelElementId: "Navigable|Non-Navigable",
		
		toolTip: ""
	}) 

		, 
			
	new cwe.editor.control.ComboBox({
		fieldLabel: "targetMultiplicity",
		name: "targetMultiplicity",
		dataIndex: "targetMultiplicity",
		targetCweModelElementId: "RelationMultiplicity",
		
		toolTip: ""
	}) 

		, 
			
	new cwe.editor.control.ComboBox({
		fieldLabel: "targetNavigability",
		name: "targetNavigability",
		dataIndex: "targetNavigability",
		targetCweModelElementId: "Navigable|Non-Navigable",
		
		toolTip: ""
	}) 

		, 
			
	new cwe.editor.control.ComboBox({
		fieldLabel: "relationType",
		name: "relationType",
		dataIndex: "relationType",
		targetCweModelElementId: "generalization|association|aggregation|composition",
		
		toolTip: "the type of relation"
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
	
		
			fieldLabel : "parentChiController",
			name : "parentChiController",
			dataIndex : "parentChiController",
			targetCweModelElementId : "ChiController",
			isParent : true
		
	})

		, 
			
	
		new cwe.editor.control.SingleAssociate( {
	
		
			fieldLabel : "parentChiView",
			name : "parentChiView",
			dataIndex : "parentChiView",
			targetCweModelElementId : "ChiView",
			isParent : true
		
	})

		
		
		
		
		
		
		]})
	
 ];
};


cwe.model.ModelClassContainer.getInstance().registerClass(new application.application.include.model.domain.NMChiControllerActionKeyChiView());
	