
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

application.application.include.model.UseCases.ChiBusinessPartner = function() {
	application.application.include.model.UseCases.ChiBusinessPartner.superclass.constructor.call(this, arguments);
	
	this.cweModelElementId = "ChiBusinessPartner";
	this.name = "ChiBusinessPartner";
	this.treeIconClass = "ChiBusinessPartnerTreeIcon16x16";
	this.owningPackageId = "application.application.include.model.UseCases.UseCases_package";
	
	
	this.recordDefinition = [
	
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
			name : "parentPackage",
			mapping: "parentPackage"
		}
	
	
	
		,
	
	
	
		{
			name : "childFigure",
			mapping : "childFigure"
		}
	, 
		{
			name : "childNMUCActor",
			mapping : "childNMUCActor"
		}
	
	];

	
	
	this.relations = {
	
		"parentPackage" : {
			isParent : true,
			targetModelClassId : "Package"
		}
	

	
		,
	
	
	
		"childFigure" : {
			isParent : false,
			targetModelClassId : "Figure"
		}
	, 
		"childNMUCActor" : {
			isParent : false,
			targetModelClassId : "NMUCActor"
		}
	
	};

};

Ext.extend(application.application.include.model.UseCases.ChiBusinessPartner, cwe.model.ModelClass);


application.application.include.model.UseCases.ChiBusinessPartner.prototype.getGridColumns = function() {
	return [
	
		
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



application.application.include.model.UseCases.ChiBusinessPartner.prototype.getEditorItems = function() {
	return [
	
		new cwe.editor.control.PropertiesFieldSet({
			items: [
		
			
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
	
		
			fieldLabel : "parentPackage",
			name : "parentPackage",
			dataIndex : "parentPackage",
			targetCweModelElementId : "Package",
			isParent : true
		
	})

		
		
		
			,
		
		
		
			
	
		new cwe.editor.control.MultipleAssociate( {
	
		
			fieldLabel : "childFigure",
			name : "childFigure",
			dataIndex : "childFigure",
			targetCweModelElementId : "Figure",
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

		
		
		]})
	
 ];
};


cwe.model.ModelClassContainer.getInstance().registerClass(new application.application.include.model.UseCases.ChiBusinessPartner());
	