
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

application.application.include.model.domain.ChiNode = function() {
	application.application.include.model.domain.ChiNode.superclass.constructor.call(this, arguments);
	
	this.cweModelElementId = "ChiNode";
	this.name = "ChiNode";
	this.treeIconClass = "ChiNodeTreeIcon16x16";
	this.owningPackageId = "application.application.include.model.domain.Domain_package";
	
	
	this.recordDefinition = [
	
		{
			name : "display_value",
			mapping : "display_value"
		}
	, 
		{
			name : "parent_order",
			mapping : "parent_order"
		}
	, 
		{
			name : "child_order",
			mapping : "child_order"
		}
	, 
		{
			name : "pk_name",
			mapping : "pk_name"
		}
	, 
		{
			name : "is_searchable",
			mapping : "is_searchable"
		}
	, 
		{
			name : "orderby",
			mapping : "orderby"
		}
	, 
		{
			name : "is_soap",
			mapping : "is_soap"
		}
	, 
		{
			name : "initparams",
			mapping : "initparams"
		}
	, 
		{
			name : "table_name",
			mapping : "table_name"
		}
	, 
		{
			name : "is_ordered",
			mapping : "is_ordered"
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
			name : "parentChiController",
			mapping: "parentChiController"
		}
	, 
		{
			name : "parentPackage",
			mapping: "parentPackage"
		}
	
	
	
		,
	
	
	
		{
			name : "childChiObject",
			mapping : "childChiObject"
		}
	, 
		{
			name : "childChiValueRef",
			mapping : "childChiValueRef"
		}
	, 
		{
			name : "childChiView",
			mapping : "childChiView"
		}
	, 
		{
			name : "childChiValue",
			mapping : "childChiValue"
		}
	, 
		{
			name : "childNodeTargetEnd",
			mapping : "childNodeTargetEnd"
		}
	, 
		{
			name : "childNodeSourceEnd",
			mapping : "childNodeSourceEnd"
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
	
	];

	
	
	this.relations = {
	
		"parentChiController" : {
			isParent : true,
			targetModelClassId : "ChiController"
		}
	, 
		"parentPackage" : {
			isParent : true,
			targetModelClassId : "Package"
		}
	

	
		,
	
	
	
		"childChiObject" : {
			isParent : false,
			targetModelClassId : "ChiObject"
		}
	, 
		"childChiValueRef" : {
			isParent : false,
			targetModelClassId : "ChiValueRef"
		}
	, 
		"childChiView" : {
			isParent : false,
			targetModelClassId : "ChiView"
		}
	, 
		"childChiValue" : {
			isParent : false,
			targetModelClassId : "ChiValue"
		}
	, 
		"childNodeTargetEnd" : {
			isParent : false,
			targetModelClassId : "ChiAssociation"
		}
	, 
		"childNodeSourceEnd" : {
			isParent : false,
			targetModelClassId : "ChiAssociation"
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
	
	};

};

Ext.extend(application.application.include.model.domain.ChiNode, cwe.model.ModelClass);


application.application.include.model.domain.ChiNode.prototype.getGridColumns = function() {
	return [
	
		
			{
			    header : "display_value",
			    dataIndex : "display_value",
			    width : 100,
			    sortable : true,
			    editor: 
	
		
			new cwe.editor.control.TextField({
				
			})
					
	

			}
		, 
			{
			    header : "parent_order",
			    dataIndex : "parent_order",
			    width : 100,
			    sortable : true,
			    editor: 
	
		
			new cwe.editor.control.TextField({
				
			})
					
	

			}
		, 
			{
			    header : "child_order",
			    dataIndex : "child_order",
			    width : 100,
			    sortable : true,
			    editor: 
	
		
			new cwe.editor.control.TextField({
				
			})
					
	

			}
		, 
			{
			    header : "pk_name",
			    dataIndex : "pk_name",
			    width : 100,
			    sortable : true,
			    editor: 
	
		
			new cwe.editor.control.TextField({
				
			})
					
	

			}
		, 
			{
			    header : "is_searchable",
			    dataIndex : "is_searchable",
			    width : 100,
			    sortable : true,
			    editor: 
	
		
			new cwe.editor.control.ComboBox({
				targetCweModelElementId: "true[true]|false[false]"
			})
					
	

			}
		, 
			{
			    header : "orderby",
			    dataIndex : "orderby",
			    width : 100,
			    sortable : true,
			    editor: 
	
		
			new cwe.editor.control.TextField({
				
			})
					
	

			}
		, 
			{
			    header : "is_soap",
			    dataIndex : "is_soap",
			    width : 100,
			    sortable : true,
			    editor: 
	
		
			new cwe.editor.control.ComboBox({
				targetCweModelElementId: "true[true]|false[false]"
			})
					
	

			}
		, 
			{
			    header : "initparams",
			    dataIndex : "initparams",
			    width : 100,
			    sortable : true,
			    editor: 
	
		
			new cwe.editor.control.TextField({
				
			})
					
	

			}
		, 
			{
			    header : "table_name",
			    dataIndex : "table_name",
			    width : 100,
			    sortable : true,
			    editor: 
	
		
			new cwe.editor.control.TextField({
				
			})
					
	

			}
		, 
			{
			    header : "is_ordered",
			    dataIndex : "is_ordered",
			    width : 100,
			    sortable : true,
			    editor: 
	
		
			new cwe.editor.control.ComboBox({
				targetCweModelElementId: "true[true]|false[false]"
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



application.application.include.model.domain.ChiNode.prototype.getEditorItems = function() {
	return [
	
		new cwe.editor.control.PropertiesFieldSet({
			items: [
		
			
	new cwe.editor.control.TextField({
		fieldLabel: "display_value",
		name: "display_value",
		dataIndex: "display_value",
		
		
		toolTip: "The value that is displayed in a list view. a single value or '|' -separated list of values"
	}) 

		, 
			
	new cwe.editor.control.TextField({
		fieldLabel: "parent_order",
		name: "parent_order",
		dataIndex: "parent_order",
		
		
		toolTip: "The order of the associated parents. a single value or '|' -separated list of values"
	}) 

		, 
			
	new cwe.editor.control.TextField({
		fieldLabel: "child_order",
		name: "child_order",
		dataIndex: "child_order",
		
		
		toolTip: "The order of the associated children. a single value or '|' -separated list of values"
	}) 

		, 
			
	new cwe.editor.control.TextField({
		fieldLabel: "pk_name",
		name: "pk_name",
		dataIndex: "pk_name",
		
		
		toolTip: "The name of the primary key column on the database (optional). The generator will add this automatically if there is no appropriate attribute."
	}) 

		, 
			
	new cwe.editor.control.ComboBox({
		fieldLabel: "is_searchable",
		name: "is_searchable",
		dataIndex: "is_searchable",
		targetCweModelElementId: "true[true]|false[false]",
		
		toolTip: "Indicates wether this type should be included in the default search."
	}) 

		, 
			
	new cwe.editor.control.TextField({
		fieldLabel: "orderby",
		name: "orderby",
		dataIndex: "orderby",
		
		
		toolTip: "Definition of default sorting. Possible values: 'none' (no order), 'sortkey' (generates a 'sortkey' column, that is used for explicit sorting) or any the name of any WCMFValue defined in the node optionally."
	}) 

		, 
			
	new cwe.editor.control.ComboBox({
		fieldLabel: "is_soap",
		name: "is_soap",
		dataIndex: "is_soap",
		targetCweModelElementId: "true[true]|false[false]",
		
		toolTip: "Define if the type should be exposed to the SOAP interface."
	}) 

		, 
			
	new cwe.editor.control.TextField({
		fieldLabel: "initparams",
		name: "initparams",
		dataIndex: "initparams",
		
		
		toolTip: "Name of the configuration file's (config.ini) section, in which the initial parameters for the corresponding mapper are defined"
	}) 

		, 
			
	new cwe.editor.control.TextField({
		fieldLabel: "table_name",
		name: "table_name",
		dataIndex: "table_name",
		
		
		toolTip: ""
	}) 

		, 
			
	new cwe.editor.control.ComboBox({
		fieldLabel: "is_ordered",
		name: "is_ordered",
		dataIndex: "is_ordered",
		targetCweModelElementId: "true[true]|false[false]",
		
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
	
		
			fieldLabel : "parentChiController",
			name : "parentChiController",
			dataIndex : "parentChiController",
			targetCweModelElementId : "ChiController",
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
	
		
			fieldLabel : "childChiObject",
			name : "childChiObject",
			dataIndex : "childChiObject",
			targetCweModelElementId : "ChiObject",
			isParent : false
		
	})

		, 
			
	
		new cwe.editor.control.MultipleAssociate( {
	
		
			fieldLabel : "childChiValueRef",
			name : "childChiValueRef",
			dataIndex : "childChiValueRef",
			targetCweModelElementId : "ChiValueRef",
			isParent : false
		
	})

		, 
			
	
		new cwe.editor.control.SingleAssociate( {
	
		
			fieldLabel : "childChiView",
			name : "childChiView",
			dataIndex : "childChiView",
			targetCweModelElementId : "ChiView",
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

		, 
			
	
		new cwe.editor.control.MultipleAssociate( {
	
		
			fieldLabel : "childNodeTargetEnd",
			name : "childNodeTargetEnd",
			dataIndex : "childNodeTargetEnd",
			targetCweModelElementId : "ChiAssociation",
			isParent : false
		
	})

		, 
			
	
		new cwe.editor.control.MultipleAssociate( {
	
		
			fieldLabel : "childNodeSourceEnd",
			name : "childNodeSourceEnd",
			dataIndex : "childNodeSourceEnd",
			targetCweModelElementId : "ChiAssociation",
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

		
		
		]})
	
 ];
};


cwe.model.ModelClassContainer.getInstance().registerClass(new application.application.include.model.domain.ChiNode());
	