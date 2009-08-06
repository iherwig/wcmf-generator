
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

application.application.include.model.requirements.ChiFeature = function() {
	application.application.include.model.requirements.ChiFeature.superclass.constructor.call(this, arguments);
	
	this.cweModelElementId = "ChiFeature";
	this.name = "ChiFeature";
	this.treeIconClass = "ChiFeatureTreeIcon16x16";
	this.owningPackageId = "application.application.include.model.requirements.Requirements_package";
	
	
	this.recordDefinition = [
	
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
			name : "parentPackage",
			mapping: "parentPackage"
		}
	
	
	
		,
	
	
	
		{
			name : "childChiBusinessUseCase",
			mapping : "childChiBusinessUseCase"
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
	, 
		{
			name : "childChiBusinessUseCaseCore",
			mapping : "childChiBusinessUseCaseCore"
		}
	
	];

	
	
	this.relations = {
	
		"parentPackage" : {
			isParent : true,
			targetModelClassId : "Package"
		}
	

	
		,
	
	
	
		"childChiBusinessUseCase" : {
			isParent : false,
			targetModelClassId : "ChiBusinessUseCase"
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
	, 
		"childChiBusinessUseCaseCore" : {
			isParent : false,
			targetModelClassId : "ChiBusinessUseCaseCore"
		}
	
	};

};

Ext.extend(application.application.include.model.requirements.ChiFeature, cwe.model.ModelClass);


application.application.include.model.requirements.ChiFeature.prototype.getGridColumns = function() {
	return [
	
		
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
			    header : "Proofreader",
			    dataIndex : "Proofreader",
			    width : 100,
			    sortable : true,
			    editor: 
	
		
			new cwe.editor.control.ComboBox({
				targetCweModelElementId: "ChiAuthors"
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
				targetCweModelElementId: "ChiFeatureStatus"
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



application.application.include.model.requirements.ChiFeature.prototype.getEditorItems = function() {
	return [
	
		new cwe.editor.control.PropertiesFieldSet({
			items: [
		
			
	new cwe.editor.control.ComboBox({
		fieldLabel: "Author",
		name: "Author",
		dataIndex: "Author",
		targetCweModelElementId: "ChiAuthors",
		
		toolTip: "This feature's author's name and role in the project"
	}) 

		, 
			
	new cwe.editor.control.ComboBox({
		fieldLabel: "Proofreader",
		name: "Proofreader",
		dataIndex: "Proofreader",
		targetCweModelElementId: "ChiAuthors",
		
		toolTip: "This feature's revisor's name and role in the project"
	}) 

		, 
			
	new cwe.editor.control.ComboBox({
		fieldLabel: "Status",
		name: "Status",
		dataIndex: "Status",
		targetCweModelElementId: "ChiFeatureStatus",
		
		toolTip: "This feature's status"
	}) 

		, 
			
	new cwe.editor.control.TextField({
		fieldLabel: "Alias",
		name: "Alias",
		dataIndex: "Alias",
		
		
		toolTip: "the Project Id of this object."
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
	
		
			fieldLabel : "childChiBusinessUseCase",
			name : "childChiBusinessUseCase",
			dataIndex : "childChiBusinessUseCase",
			targetCweModelElementId : "ChiBusinessUseCase",
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

		, 
			
	
		new cwe.editor.control.MultipleAssociate( {
	
		
			fieldLabel : "childChiBusinessUseCaseCore",
			name : "childChiBusinessUseCaseCore",
			dataIndex : "childChiBusinessUseCaseCore",
			targetCweModelElementId : "ChiBusinessUseCaseCore",
			isParent : false
		
	})

		
		
		]})
	
 ];
};


cwe.model.ModelClassContainer.getInstance().registerClass(new application.application.include.model.requirements.ChiFeature());
	