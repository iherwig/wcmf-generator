
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

application.application.include.model.domain.Operation = function() {
	application.application.include.model.domain.Operation.superclass.constructor.call(this, arguments);
	
	this.cweModelElementId = "Operation";
	this.name = "Operation";
	this.treeIconClass = "OperationTreeIcon16x16";
	this.owningPackageId = "application.application.include.model.domain.Domain_package";
	
	
	this.recordDefinition = [
	
		{
			name : "ReturnType",
			mapping : "ReturnType"
		}
	, 
		{
			name : "Parameters",
			mapping : "Parameters"
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
			name : "parentChiNode",
			mapping: "parentChiNode"
		}
	, 
		{
			name : "parentChiController",
			mapping: "parentChiController"
		}
	
	
	
	
	
	];

	
	
	this.relations = {
	
		"parentChiNode" : {
			isParent : true,
			targetModelClassId : "ChiNode"
		}
	, 
		"parentChiController" : {
			isParent : true,
			targetModelClassId : "ChiController"
		}
	

	
	
	
	};

};

Ext.extend(application.application.include.model.domain.Operation, cwe.model.ModelClass);


application.application.include.model.domain.Operation.prototype.getGridColumns = function() {
	return [
	
		
			{
			    header : "ReturnType",
			    dataIndex : "ReturnType",
			    width : 100,
			    sortable : true,
			    editor: 
	
		
			new cwe.editor.control.TextField({
				
			})
					
	

			}
		, 
			{
			    header : "Parameters",
			    dataIndex : "Parameters",
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



application.application.include.model.domain.Operation.prototype.getEditorItems = function() {
	return [
	
		new cwe.editor.control.PropertiesFieldSet({
			items: [
		
			
	new cwe.editor.control.TextField({
		fieldLabel: "ReturnType",
		name: "ReturnType",
		dataIndex: "ReturnType",
		
		
		toolTip: ""
	}) 

		, 
			
	new cwe.editor.control.TextField({
		fieldLabel: "Parameters",
		name: "Parameters",
		dataIndex: "Parameters",
		
		
		toolTip: ""
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
	
		
			fieldLabel : "parentChiNode",
			name : "parentChiNode",
			dataIndex : "parentChiNode",
			targetCweModelElementId : "ChiNode",
			isParent : true
		
	})

		, 
			
	
		new cwe.editor.control.SingleAssociate( {
	
		
			fieldLabel : "parentChiController",
			name : "parentChiController",
			dataIndex : "parentChiController",
			targetCweModelElementId : "ChiController",
			isParent : true
		
	})

		
		
		
		
		
		
		]})
	
 ];
};


cwe.model.ModelClassContainer.getInstance().registerClass(new application.application.include.model.domain.Operation());
	