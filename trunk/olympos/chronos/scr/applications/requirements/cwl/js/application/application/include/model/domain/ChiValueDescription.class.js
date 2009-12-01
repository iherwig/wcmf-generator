
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

application.application.include.model.domain.ChiValueDescription = function() {
	application.application.include.model.domain.ChiValueDescription.superclass.constructor.call(this, arguments);
	
	this.chiModelElementId = "ChiValue";
	this.name = "ChiValue";
	this.treeIconClass = "ChiValueTreeIcon16x16";
	this.owningPackageId = "application.application.include.model.domain.Domain_package";
	
	
	this.recordDefinition = [
	
		{
			name : "columnName",
			mapping : "columnName"
		}
	, 
		{
			name : "displayType",
			mapping : "displayType"
		}
	, 
		{
			name : "restrictionsDescription",
			mapping : "restrictionsDescription"
		}
	, 
		{
			name : "restrictionsMatch",
			mapping : "restrictionsMatch"
		}
	, 
		{
			name : "restrictionsNotMatch",
			mapping : "restrictionsNotMatch"
		}
	, 
		{
			name : "inputType",
			mapping : "inputType"
		}
	, 
		{
			name : "appDataType",
			mapping : "appDataType"
		}
	, 
		{
			name : "dbDataType",
			mapping : "dbDataType"
		}
	, 
		{
			name : "isEditable",
			mapping : "isEditable"
		}
	, 
		{
			name : "default",
			mapping : "default"
		}
	, 
		{
			name : "propertyType",
			mapping : "propertyType"
		}
	, 
		{
			name : "status",
			mapping : "status"
		}
	, 
		{
			name : "alias",
			mapping : "alias"
		}
	, 
		{
			name : "author",
			mapping : "author"
		}
	, 
		{
			name : "version",
			mapping : "version"
		}
	, 
		{
			name : "name",
			mapping : "name"
		}
	, 
		{
			name : "notes",
			mapping : "notes"
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
			name : "lastEditor",
			mapping : "lastEditor"
		}
	, 
		{
			name : "modified",
			mapping : "modified"
		}
	
	
	
		,
	
	
	
		{
			name : "figure",
			mapping: "figure"
		}
	
	
	
		,
	
	
	
		{
			name : "chiNode",
			mapping : "chiNode"
		}
	, 
		{
			name : "package",
			mapping : "package"
		}
	, 
		{
			name : "chiNodeManyToMany",
			mapping : "chiNodeManyToMany"
		}
	, 
		{
			name : "chiSystem",
			mapping : "chiSystem"
		}
	, 
		{
			name : "chiController",
			mapping : "chiController"
		}
	
	];

	
	
	this.relations = {
	
		"figure" : {
			isParent : true,
			targetModelClassId : "Figure"
		}
	

	
		,
	
	
	
		"chiNode" : {
			isParent : false,
			targetModelClassId : "ChiNode"
		}
	, 
		"package" : {
			isParent : false,
			targetModelClassId : "Package"
		}
	, 
		"chiNodeManyToMany" : {
			isParent : false,
			targetModelClassId : "ChiNodeManyToMany"
		}
	, 
		"chiSystem" : {
			isParent : false,
			targetModelClassId : "ChiSystem"
		}
	, 
		"chiController" : {
			isParent : false,
			targetModelClassId : "ChiController"
		}
	
	};

};

Ext.extend(application.application.include.model.domain.ChiValueDescription, chi.model.ModelDescription);


application.application.include.model.domain.ChiValueDescription.prototype.getGridColumns = function() {
	return [
	
		
			{
			    header : "columnName",
			    dataIndex : "columnName",
			    width : 100,
			    sortable : true,
			    hidden: true,
			    editor: 
	
			new chi.editor.control.TextField({})
	

			}
		, 
			{
			    header : "displayType",
			    dataIndex : "displayType",
			    width : 100,
			    sortable : true,
			    hidden: true,
			    editor: 
	
			new chi.editor.control.ComboBox({
				targetCweModelElementId: "DisplayType"
			})
	

			}
		, 
			{
			    header : "restrictionsDescription",
			    dataIndex : "restrictionsDescription",
			    width : 100,
			    sortable : true,
			    hidden: true,
			    editor: 
	
			new chi.editor.control.TextField({})
	

			}
		, 
			{
			    header : "restrictionsMatch",
			    dataIndex : "restrictionsMatch",
			    width : 100,
			    sortable : true,
			    hidden: true,
			    editor: 
	
			new chi.editor.control.TextField({})
	

			}
		, 
			{
			    header : "restrictionsNotMatch",
			    dataIndex : "restrictionsNotMatch",
			    width : 100,
			    sortable : true,
			    hidden: true,
			    editor: 
	
			new chi.editor.control.TextField({})
	

			}
		, 
			{
			    header : "inputType",
			    dataIndex : "inputType",
			    width : 100,
			    sortable : true,
			    hidden: true,
			    editor: 
	
			new chi.editor.control.ComboBox({
				targetCweModelElementId: "InputType"
			})
	

			}
		, 
			{
			    header : "appDataType",
			    dataIndex : "appDataType",
			    width : 100,
			    sortable : true,
			    hidden: true,
			    editor: 
	
			new chi.editor.control.TextField({})
	

			}
		, 
			{
			    header : "dbDataType",
			    dataIndex : "dbDataType",
			    width : 100,
			    sortable : true,
			    hidden: true,
			    editor: 
	
			new chi.editor.control.TextField({})
	

			}
		, 
			{
			    header : "isEditable",
			    dataIndex : "isEditable",
			    width : 100,
			    sortable : true,
			    hidden: true,
			    editor: 
	
			new chi.editor.control.StaticComboBox({
				data: [["true","true"],["false","false"]]
			})
	

			}
		, 
			{
			    header : "default",
			    dataIndex : "default",
			    width : 100,
			    sortable : true,
			    hidden: true,
			    editor: 
	
			new chi.editor.control.TextField({})
	

			}
		, 
			{
			    header : "propertyType",
			    dataIndex : "propertyType",
			    width : 100,
			    sortable : true,
			    hidden: true,
			    editor: 
	
			new chi.editor.control.TextField({})
	

			}
		, 
			{
			    header : "status",
			    dataIndex : "status",
			    width : 100,
			    sortable : true,
			    hidden: true,
			    editor: 
	
			new chi.editor.control.ComboBox({
				targetCweModelElementId: "ChiBaseStatus"
			})
	

			}
		, 
			{
			    header : "alias",
			    dataIndex : "alias",
			    width : 100,
			    sortable : true,
			    hidden: true,
			    editor: 
	
			new chi.editor.control.TextField({})
	

			}
		, 
			{
			    header : "author",
			    dataIndex : "author",
			    width : 100,
			    sortable : true,
			    hidden: true,
			    editor: 
	
			new chi.editor.control.ComboBox({
				targetCweModelElementId: "ChiAuthors"
			})
	

			}
		, 
			{
			    header : "version",
			    dataIndex : "version",
			    width : 100,
			    sortable : true,
			    hidden: true,
			    editor: 
	
			new chi.editor.control.TextField({})
	

			}
		, 
			{
			    header : "name",
			    dataIndex : "name",
			    width : 100,
			    sortable : true,
			    hidden: true,
			    editor: 
	
			new chi.editor.control.TextField({})
	

			}
		, 
			{
			    header : "notes",
			    dataIndex : "notes",
			    width : 100,
			    sortable : true,
			    hidden: true,
			    editor: 
	
			new chi.modelgrid.DummyField()
	

			}
		, 
			{
			    header : "created",
			    dataIndex : "created",
			    width : 100,
			    sortable : true,
			    hidden: true,
			    editor: 
	
			new chi.modelgrid.DummyField()
	

			}
		, 
			{
			    header : "creator",
			    dataIndex : "creator",
			    width : 100,
			    sortable : true,
			    hidden: true,
			    editor: 
	
			new chi.modelgrid.DummyField()
	

			}
		, 
			{
			    header : "lastEditor",
			    dataIndex : "lastEditor",
			    width : 100,
			    sortable : true,
			    hidden: true,
			    editor: 
	
			new chi.modelgrid.DummyField()
	

			}
		, 
			{
			    header : "modified",
			    dataIndex : "modified",
			    width : 100,
			    sortable : true,
			    hidden: true,
			    editor: 
	
			new chi.modelgrid.DummyField()
	

			}
		
	
	];
};



application.application.include.model.domain.ChiValueDescription.prototype.getLabelColumns = function() {
	return [
	
		
	
	];
};



application.application.include.model.domain.ChiValueDescription.prototype.getEditorItems = function() {
	return [
	
		new chi.editor.control.PropertiesFieldSet({
			items: [
		
			
	
		
		new chi.editor.control.TextField({
		fieldLabel: "columnName",
		name: "columnName",
		dataIndex: "columnName",
		
		toolTip: "The name of the database column. If not given the attribute name will be used."
	}) 
	

		, 
			
	
		
		new chi.editor.control.ComboBox({
		fieldLabel: "displayType",
		name: "displayType",
		dataIndex: "displayType",
		targetCweModelElementId: "DisplayType",
		toolTip: "The HTML display type for the attribute e.g. image<sup>11</sup>The interpretation of the display_type is done by DefaultValueRenderer or its subclasses.."
	}) 
	

		, 
			
	
		
		new chi.editor.control.TextField({
		fieldLabel: "restrictionsDescription",
		name: "restrictionsDescription",
		dataIndex: "restrictionsDescription",
		
		toolTip: "A text describing the restrictions (both the negative and the positives), which will be shown in case of an error."
	}) 
	

		, 
			
	
		
		new chi.editor.control.TextField({
		fieldLabel: "restrictionsMatch",
		name: "restrictionsMatch",
		dataIndex: "restrictionsMatch",
		
		toolTip: "Regular expression, which must be matched by the attribute value<sup>11</sup>The PHP function preg_match is used for comparison.."
	}) 
	

		, 
			
	
		
		new chi.editor.control.TextField({
		fieldLabel: "restrictionsNotMatch",
		name: "restrictionsNotMatch",
		dataIndex: "restrictionsNotMatch",
		
		toolTip: "Regular expression, which must not be matched by the attribute value<sup>11</sup>The PHP function preg_match is used for comparison.."
	}) 
	

		, 
			
	
		
		new chi.editor.control.ComboBox({
		fieldLabel: "inputType",
		name: "inputType",
		dataIndex: "inputType",
		targetCweModelElementId: "InputType",
		toolTip: "Definition of the attribute's input control in the HTML form<sup>11</sup>The interpretation of the input_type is done by DefaultControlRenderer or its subclasses.."
	}) 
	

		, 
			
	
		
		new chi.editor.control.TextField({
		fieldLabel: "appDataType",
		name: "appDataType",
		dataIndex: "appDataType",
		
		toolTip: "The attribute's application datatype. This can be used in the application to group attributes and execute special logic on them."
	}) 
	

		, 
			
	
		
		new chi.editor.control.TextField({
		fieldLabel: "dbDataType",
		name: "dbDataType",
		dataIndex: "dbDataType",
		
		toolTip: "The atribute's database type. This will be used in the table definition. e.g. INT, VARCHAR, TEXT, ..."
	}) 
	

		, 
			
	
		
		new chi.editor.control.StaticComboBox({
		fieldLabel: "isEditable",
		name: "isEditable",
		dataIndex: "isEditable",
		data: [["true","true"],["false","false"]],
		toolTip: "Declares, if the attribute is editable in the UI. The backend can always edit atributes"
	}) 
	

		, 
			
	
		
		new chi.editor.control.TextField({
		fieldLabel: "default",
		name: "default",
		dataIndex: "default",
		
		toolTip: "his reppresent the default value that a property takes automagically."
	}) 
	

		, 
			
	
		
		new chi.editor.control.TextField({
		fieldLabel: "propertyType",
		name: "propertyType",
		dataIndex: "propertyType",
		
		toolTip: "this is the type of this property (e.g. string. int, etc.). not necessary"
	}) 
	

		, 
			
	
		
		new chi.editor.control.ComboBox({
		fieldLabel: "status",
		name: "status",
		dataIndex: "status",
		targetCweModelElementId: "ChiBaseStatus",
		toolTip: ""
	}) 
	

		, 
			
	
		
		new chi.editor.control.TextField({
		fieldLabel: "alias",
		name: "alias",
		dataIndex: "alias",
		
		toolTip: "the Project Id of this object."
	}) 
	

		, 
			
	
		
		new chi.editor.control.ComboBox({
		fieldLabel: "author",
		name: "author",
		dataIndex: "author",
		targetCweModelElementId: "ChiAuthors",
		toolTip: ""
	}) 
	

		, 
			
	
		
		new chi.editor.control.TextField({
		fieldLabel: "version",
		name: "version",
		dataIndex: "version",
		
		toolTip: "the model version of this object"
	}) 
	

		, 
			
	
		
		new chi.editor.control.TextField({
		fieldLabel: "name",
		name: "name",
		dataIndex: "name",
		
		toolTip: "the name of this object."
	}) 
	

		, 
			
	
		
		new chi.editor.control.HtmlEditor({
		fieldLabel: "notes",
		name: "notes",
		dataIndex: "notes",
		
		toolTip: "the actual description of the object."
	}) 
	

		, 
			
	
		
			new chi.editor.control.DisplayField({
		fieldLabel: "created",
		name: "created",
		dataIndex: "created",
		
		toolTip: "the creation date of this object"
	}) 
	

		, 
			
	
		
			new chi.editor.control.DisplayField({
		fieldLabel: "creator",
		name: "creator",
		dataIndex: "creator",
		
		toolTip: "the user that created this object"
	}) 
	

		, 
			
	
		
			new chi.editor.control.DisplayField({
		fieldLabel: "lastEditor",
		name: "lastEditor",
		dataIndex: "lastEditor",
		
		toolTip: "the last user that edited this object"
	}) 
	

		, 
			
	
		
			new chi.editor.control.DisplayField({
		fieldLabel: "modified",
		name: "modified",
		dataIndex: "modified",
		
		toolTip: "the date when this object was modified"
	}) 
	

		
		]})
		
		
			,
		
	
	
	
		new chi.editor.control.AssociationsFieldSet({
			items: [
		
			
	
		new chi.editor.control.MultipleAssociate( {
	
			fieldLabel : "figure",
			name : "figure",
			dataIndex : "figure",
			targetChiModelElementId : "Figure",
			isParent : true,
			aggregationKind : chi.Constants.AggregationKind.NONE
		
	})

		
		
		
			,
		
		
		
			
	
		new chi.editor.control.SingleAssociate( {
	
			fieldLabel : "chiNode",
			name : "chiNode",
			dataIndex : "chiNode",
			targetChiModelElementId : "ChiNode",
			isParent : false,
			aggregationKind : chi.Constants.AggregationKind.COMPOSITE
		
	})

		, 
			
	
		new chi.editor.control.SingleAssociate( {
	
			fieldLabel : "package",
			name : "package",
			dataIndex : "package",
			targetChiModelElementId : "Package",
			isParent : false,
			aggregationKind : chi.Constants.AggregationKind.SHARED
		
	})

		, 
			
	
		new chi.editor.control.SingleAssociate( {
	
			fieldLabel : "chiNodeManyToMany",
			name : "chiNodeManyToMany",
			dataIndex : "chiNodeManyToMany",
			targetChiModelElementId : "ChiNodeManyToMany",
			isParent : false,
			aggregationKind : chi.Constants.AggregationKind.COMPOSITE
		
	})

		, 
			
	
		new chi.editor.control.SingleAssociate( {
	
			fieldLabel : "chiSystem",
			name : "chiSystem",
			dataIndex : "chiSystem",
			targetChiModelElementId : "ChiSystem",
			isParent : false,
			aggregationKind : chi.Constants.AggregationKind.COMPOSITE
		
	})

		, 
			
	
		new chi.editor.control.SingleAssociate( {
	
			fieldLabel : "chiController",
			name : "chiController",
			dataIndex : "chiController",
			targetChiModelElementId : "ChiController",
			isParent : false,
			aggregationKind : chi.Constants.AggregationKind.COMPOSITE
		
	})

		
		
		]})
	
 ];
};



/**
 * Returns the label of an object of the Model Class.
 * 
 * @param {chi.model.ModelRecord}
 *            record The record of the Model Class to extract the label from.
 * @return The label of an object of the Model Class.
 * @type String
 */
application.application.include.model.domain.ChiValueDescription.prototype.getLabel = function(record) {
	var label = record.get("Name");
	if (label == undefined || label.length == 0) {
		label = record.getOid(); 
	}
	return label;
};



/**
 * Returns a newly created instance of the Model Class, which inherits {chi.model.ModelRecord}.
 * 
 * @param {String}
 *            oid The object id of the instance.
 * @param {Object}
 *            data A map containing attribute names as keys and initial values
 *            as map values.
 * @return The instance of the Model Class.
 * @type {chi.model.ModelRecord}
 */
application.application.include.model.domain.ChiValueDescription.prototype.createInstance = function(oid, data) {
	return new application.application.include.model.domain.ChiValue(oid, data);
};


chi.model.ModelDescriptionContainer.getInstance().registerDescription(new application.application.include.model.domain.ChiValueDescription());
	