
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

application.application.include.model.domain.ChiController = function() {
	application.application.include.model.domain.ChiController.superclass.constructor.call(this, arguments);
	
	this.cweModelElementId = "ChiController";
	this.name = "ChiController";
	this.treeIconClass = "ChiControllerTreeIcon16x16";
	this.owningPackageId = "application.application.include.model.domain.Domain_package";
	
	
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
			name : "parentChiBusinessUseCase",
			mapping: "parentChiBusinessUseCase"
		}
	, 
		{
			name : "parentPackage",
			mapping: "parentPackage"
		}
	, 
		{
			name : "parentChiBusinessUseCaseCore",
			mapping: "parentChiBusinessUseCaseCore"
		}
	
	
	
		,
	
	
	
		{
			name : "childSourceActionKeyEnd",
			mapping : "childSourceActionKeyEnd"
		}
	, 
		{
			name : "childTargetActionKeyEnd",
			mapping : "childTargetActionKeyEnd"
		}
	, 
		{
			name : "childNMChiControllerActionKeyChiView",
			mapping : "childNMChiControllerActionKeyChiView"
		}
	, 
		{
			name : "childProperty",
			mapping : "childProperty"
		}
	, 
		{
			name : "childChiNode",
			mapping : "childChiNode"
		}
	, 
		{
			name : "childSourceEnd",
			mapping : "childSourceEnd"
		}
	, 
		{
			name : "childTargetEnd",
			mapping : "childTargetEnd"
		}
	, 
		{
			name : "childOperation",
			mapping : "childOperation"
		}
	, 
		{
			name : "childFigure",
			mapping : "childFigure"
		}
	, 
		{
			name : "childChiValue",
			mapping : "childChiValue"
		}
	
	];

	
	
	this.relations = {
	
		"parentChiBusinessUseCase" : {
			isParent : true,
			targetModelClassId : "ChiBusinessUseCase"
		}
	, 
		"parentPackage" : {
			isParent : true,
			targetModelClassId : "Package"
		}
	, 
		"parentChiBusinessUseCaseCore" : {
			isParent : true,
			targetModelClassId : "ChiBusinessUseCaseCore"
		}
	

	
		,
	
	
	
		"childSourceActionKeyEnd" : {
			isParent : false,
			targetModelClassId : "NMChiControllerActionKeyChiController"
		}
	, 
		"childTargetActionKeyEnd" : {
			isParent : false,
			targetModelClassId : "NMChiControllerActionKeyChiController"
		}
	, 
		"childNMChiControllerActionKeyChiView" : {
			isParent : false,
			targetModelClassId : "NMChiControllerActionKeyChiView"
		}
	, 
		"childProperty" : {
			isParent : false,
			targetModelClassId : "Property"
		}
	, 
		"childChiNode" : {
			isParent : false,
			targetModelClassId : "ChiNode"
		}
	, 
		"childSourceEnd" : {
			isParent : false,
			targetModelClassId : "NMChiControllerChiController"
		}
	, 
		"childTargetEnd" : {
			isParent : false,
			targetModelClassId : "NMChiControllerChiController"
		}
	, 
		"childOperation" : {
			isParent : false,
			targetModelClassId : "Operation"
		}
	, 
		"childFigure" : {
			isParent : false,
			targetModelClassId : "Figure"
		}
	, 
		"childChiValue" : {
			isParent : false,
			targetModelClassId : "ChiValue"
		}
	
	};

};

Ext.extend(application.application.include.model.domain.ChiController, cwe.model.ModelClass);


application.application.include.model.domain.ChiController.prototype.getGridColumns = function() {
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



application.application.include.model.domain.ChiController.prototype.getEditorItems = function() {
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
	
		
			fieldLabel : "parentChiBusinessUseCase",
			name : "parentChiBusinessUseCase",
			dataIndex : "parentChiBusinessUseCase",
			targetCweModelElementId : "ChiBusinessUseCase",
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
			
	
		new cwe.editor.control.SingleAssociate( {
	
		
			fieldLabel : "parentChiBusinessUseCaseCore",
			name : "parentChiBusinessUseCaseCore",
			dataIndex : "parentChiBusinessUseCaseCore",
			targetCweModelElementId : "ChiBusinessUseCaseCore",
			isParent : true
		
	})

		
		
		
			,
		
		
		
			
	
		new cwe.editor.control.MultipleAssociate( {
	
		
			fieldLabel : "childSourceActionKeyEnd",
			name : "childSourceActionKeyEnd",
			dataIndex : "childSourceActionKeyEnd",
			targetCweModelElementId : "NMChiControllerActionKeyChiController",
			isParent : false
		
	})

		, 
			
	
		new cwe.editor.control.MultipleAssociate( {
	
		
			fieldLabel : "childTargetActionKeyEnd",
			name : "childTargetActionKeyEnd",
			dataIndex : "childTargetActionKeyEnd",
			targetCweModelElementId : "NMChiControllerActionKeyChiController",
			isParent : false
		
	})

		, 
			
	
		new cwe.editor.control.MultipleAssociate( {
	
		
			fieldLabel : "childNMChiControllerActionKeyChiView",
			name : "childNMChiControllerActionKeyChiView",
			dataIndex : "childNMChiControllerActionKeyChiView",
			targetCweModelElementId : "NMChiControllerActionKeyChiView",
			isParent : false
		
	})

		, 
			
	
		new cwe.editor.control.MultipleAssociate( {
	
		
			fieldLabel : "childProperty",
			name : "childProperty",
			dataIndex : "childProperty",
			targetCweModelElementId : "Property",
			isParent : false
		
	})

		, 
			
	
		new cwe.editor.control.MultipleAssociate( {
	
		
			fieldLabel : "childChiNode",
			name : "childChiNode",
			dataIndex : "childChiNode",
			targetCweModelElementId : "ChiNode",
			isParent : false
		
	})

		, 
			
	
		new cwe.editor.control.MultipleAssociate( {
	
		
			fieldLabel : "childSourceEnd",
			name : "childSourceEnd",
			dataIndex : "childSourceEnd",
			targetCweModelElementId : "NMChiControllerChiController",
			isParent : false
		
	})

		, 
			
	
		new cwe.editor.control.MultipleAssociate( {
	
		
			fieldLabel : "childTargetEnd",
			name : "childTargetEnd",
			dataIndex : "childTargetEnd",
			targetCweModelElementId : "NMChiControllerChiController",
			isParent : false
		
	})

		, 
			
	
		new cwe.editor.control.MultipleAssociate( {
	
		
			fieldLabel : "childOperation",
			name : "childOperation",
			dataIndex : "childOperation",
			targetCweModelElementId : "Operation",
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
	
		
			fieldLabel : "childChiValue",
			name : "childChiValue",
			dataIndex : "childChiValue",
			targetCweModelElementId : "ChiValue",
			isParent : false
		
	})

		
		
		]})
	
 ];
};


cwe.model.ModelClassContainer.getInstance().registerClass(new application.application.include.model.domain.ChiController());
	