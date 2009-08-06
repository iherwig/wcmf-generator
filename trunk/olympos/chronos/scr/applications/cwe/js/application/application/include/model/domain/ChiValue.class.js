
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

application.application.include.model.domain.ChiValue = function() {
	application.application.include.model.domain.ChiValue.superclass.constructor.call(this, arguments);
	
	this.cweModelElementId = "ChiValue";
	this.name = "ChiValue";
	this.treeIconClass = "ChiValueTreeIcon16x16";
	this.owningPackageId = "application.application.include.model.domain.Domain_package";
	
	
	this.recordDefinition = [
	
		{
			name : "display_type",
			mapping : "display_type"
		}
	, 
		{
			name : "restrictions_description",
			mapping : "restrictions_description"
		}
	, 
		{
			name : "restrictions_match",
			mapping : "restrictions_match"
		}
	, 
		{
			name : "restrictions_not_match",
			mapping : "restrictions_not_match"
		}
	, 
		{
			name : "input_type",
			mapping : "input_type"
		}
	, 
		{
			name : "app_data_type",
			mapping : "app_data_type"
		}
	, 
		{
			name : "db_data_type",
			mapping : "db_data_type"
		}
	, 
		{
			name : "is_editable",
			mapping : "is_editable"
		}
	, 
		{
			name : "column_name",
			mapping : "column_name"
		}
	, 
		{
			name : "default",
			mapping : "default"
		}
	, 
		{
			name : "PropertyType",
			mapping : "PropertyType"
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
	, 
		{
			name : "parentChiSystem",
			mapping: "parentChiSystem"
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
	, 
		"parentChiSystem" : {
			isParent : true,
			targetModelClassId : "ChiSystem"
		}
	

	
	
	
	};

};

Ext.extend(application.application.include.model.domain.ChiValue, cwe.model.ModelClass);


application.application.include.model.domain.ChiValue.prototype.getGridColumns = function() {
	return [
	
		
			{
			    header : "display_type",
			    dataIndex : "display_type",
			    width : 100,
			    sortable : true,
			    editor: 
	
		
			new cwe.editor.control.ComboBox({
				targetCweModelElementId: "DisplayType"
			})
					
	

			}
		, 
			{
			    header : "restrictions_description",
			    dataIndex : "restrictions_description",
			    width : 100,
			    sortable : true,
			    editor: 
	
		
			new cwe.editor.control.TextField({
				
			})
					
	

			}
		, 
			{
			    header : "restrictions_match",
			    dataIndex : "restrictions_match",
			    width : 100,
			    sortable : true,
			    editor: 
	
		
			new cwe.editor.control.TextField({
				
			})
					
	

			}
		, 
			{
			    header : "restrictions_not_match",
			    dataIndex : "restrictions_not_match",
			    width : 100,
			    sortable : true,
			    editor: 
	
		
			new cwe.editor.control.TextField({
				
			})
					
	

			}
		, 
			{
			    header : "input_type",
			    dataIndex : "input_type",
			    width : 100,
			    sortable : true,
			    editor: 
	
		
			new cwe.editor.control.ComboBox({
				targetCweModelElementId: "InputType"
			})
					
	

			}
		, 
			{
			    header : "app_data_type",
			    dataIndex : "app_data_type",
			    width : 100,
			    sortable : true,
			    editor: 
	
		
			new cwe.editor.control.TextField({
				
			})
					
	

			}
		, 
			{
			    header : "db_data_type",
			    dataIndex : "db_data_type",
			    width : 100,
			    sortable : true,
			    editor: 
	
		
			new cwe.editor.control.TextField({
				
			})
					
	

			}
		, 
			{
			    header : "is_editable",
			    dataIndex : "is_editable",
			    width : 100,
			    sortable : true,
			    editor: 
	
		
			new cwe.editor.control.ComboBox({
				targetCweModelElementId: "true[true]|false[false]"
			})
					
	

			}
		, 
			{
			    header : "column_name",
			    dataIndex : "column_name",
			    width : 100,
			    sortable : true,
			    editor: 
	
		
			new cwe.editor.control.TextField({
				
			})
					
	

			}
		, 
			{
			    header : "default",
			    dataIndex : "default",
			    width : 100,
			    sortable : true,
			    editor: 
	
		
			new cwe.editor.control.TextField({
				
			})
					
	

			}
		, 
			{
			    header : "PropertyType",
			    dataIndex : "PropertyType",
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



application.application.include.model.domain.ChiValue.prototype.getEditorItems = function() {
	return [
	
		new cwe.editor.control.PropertiesFieldSet({
			items: [
		
			
	new cwe.editor.control.ComboBox({
		fieldLabel: "display_type",
		name: "display_type",
		dataIndex: "display_type",
		targetCweModelElementId: "DisplayType",
		
		toolTip: "The HTML display type for the attribute e.g. image<sup>11</sup>The interpretation of the display_type is done by DefaultValueRenderer or its subclasses.."
	}) 

		, 
			
	new cwe.editor.control.TextField({
		fieldLabel: "restrictions_description",
		name: "restrictions_description",
		dataIndex: "restrictions_description",
		
		
		toolTip: "A text describing the restrictions (both the negative and the positives), which will be shown in case of an error."
	}) 

		, 
			
	new cwe.editor.control.TextField({
		fieldLabel: "restrictions_match",
		name: "restrictions_match",
		dataIndex: "restrictions_match",
		
		
		toolTip: "Regular expression, which must be matched by the attribute value<sup>11</sup>The PHP function preg_match is used for comparison.."
	}) 

		, 
			
	new cwe.editor.control.TextField({
		fieldLabel: "restrictions_not_match",
		name: "restrictions_not_match",
		dataIndex: "restrictions_not_match",
		
		
		toolTip: "Regular expression, which must not be matched by the attribute value<sup>11</sup>The PHP function preg_match is used for comparison.."
	}) 

		, 
			
	new cwe.editor.control.ComboBox({
		fieldLabel: "input_type",
		name: "input_type",
		dataIndex: "input_type",
		targetCweModelElementId: "InputType",
		
		toolTip: "Definition of the attribute's input control in the HTML form<sup>11</sup>The interpretation of the input_type is done by DefaultControlRenderer or its subclasses.."
	}) 

		, 
			
	new cwe.editor.control.TextField({
		fieldLabel: "app_data_type",
		name: "app_data_type",
		dataIndex: "app_data_type",
		
		
		toolTip: "The attribute's application datatype. This can be used in the application to group attributes and execute special logic on them."
	}) 

		, 
			
	new cwe.editor.control.TextField({
		fieldLabel: "db_data_type",
		name: "db_data_type",
		dataIndex: "db_data_type",
		
		
		toolTip: "The atribute's database type. This will be used in the table definition. e.g. INT, VARCHAR, TEXT, ..."
	}) 

		, 
			
	new cwe.editor.control.ComboBox({
		fieldLabel: "is_editable",
		name: "is_editable",
		dataIndex: "is_editable",
		targetCweModelElementId: "true[true]|false[false]",
		
		toolTip: "Declares, if the attribute is editable in the UI. The backend can always edit atributes"
	}) 

		, 
			
	new cwe.editor.control.TextField({
		fieldLabel: "column_name",
		name: "column_name",
		dataIndex: "column_name",
		
		
		toolTip: "The name of the database column. If not given the attribute name will be used."
	}) 

		, 
			
	new cwe.editor.control.TextField({
		fieldLabel: "default",
		name: "default",
		dataIndex: "default",
		
		
		toolTip: "his reppresent the default value that a property takes automagically."
	}) 

		, 
			
	new cwe.editor.control.TextField({
		fieldLabel: "PropertyType",
		name: "PropertyType",
		dataIndex: "PropertyType",
		
		
		toolTip: "this is the type of this property (e.g. string. int, etc.). not necessary"
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

		, 
			
	
		new cwe.editor.control.SingleAssociate( {
	
		
			fieldLabel : "parentChiSystem",
			name : "parentChiSystem",
			dataIndex : "parentChiSystem",
			targetCweModelElementId : "ChiSystem",
			isParent : true
		
	})

		
		
		
		
		
		
		]})
	
 ];
};


cwe.model.ModelClassContainer.getInstance().registerClass(new application.application.include.model.domain.ChiValue());
	