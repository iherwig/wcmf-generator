/*
 * Copyright (c) 2009 The Olympos Development Team.
 * 
 * http://sourceforge.net/projects/olympos/
 * 
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html. If redistributing this code,
 * this entire header must remain intact.
 */
Ext.namespace("application.application.include.model.domain");

application.application.include.model.domain.ChiNodeDescription = function() {
	application.application.include.model.domain.ChiNodeDescription.superclass.constructor.call(this, arguments);
	
	this.chiModelElementId = "ChiNode";
	this.name = "ChiNode";
	this.treeIconClass = "ChiNodeTreeIcon16x16";
	this.owningPackageId = "application.application.include.model.domain.Domain_package";
	
	
	this.recordDefinition = [
	
		{
			name : "displayValue",
			mapping : "displayValue"
		}
	, 
		{
			name : "tableName",
			mapping : "tableName"
		}
	, 
		{
			name : "isOrdered",
			mapping : "isOrdered"
		}
	, 
		{
			name : "parentOrder",
			mapping : "parentOrder"
		}
	, 
		{
			name : "childOrder",
			mapping : "childOrder"
		}
	, 
		{
			name : "pkName",
			mapping : "pkName"
		}
	, 
		{
			name : "isSearchable",
			mapping : "isSearchable"
		}
	, 
		{
			name : "orderby",
			mapping : "orderby"
		}
	, 
		{
			name : "isSoap",
			mapping : "isSoap"
		}
	, 
		{
			name : "initparams",
			mapping : "initparams"
		}
	, 
		{
			name : "visibility",
			mapping : "visibility"
		}
	, 
		{
			name : "isAbstract",
			mapping : "isAbstract"
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
			name : "chiObject",
			mapping: "chiObject"
		}
	, 
		{
			name : "chiValueRef",
			mapping: "chiValueRef"
		}
	, 
		{
			name : "chiValue",
			mapping: "chiValue"
		}
	, 
		{
			name : "operation",
			mapping: "operation"
		}
	, 
		{
			name : "figure",
			mapping: "figure"
		}
	
	
	
		,
	
	
	
		{
			name : "chiController",
			mapping : "chiController"
		}
	, 
		{
			name : "package",
			mapping : "package"
		}
	
	];

	
	
	this.relations = {
	
		"chiObject" : {
			isParent : true,
			targetModelClassId : "ChiObject"
		}
	, 
		"chiValueRef" : {
			isParent : true,
			targetModelClassId : "ChiValueRef"
		}
	, 
		"chiValue" : {
			isParent : true,
			targetModelClassId : "ChiValue"
		}
	, 
		"operation" : {
			isParent : true,
			targetModelClassId : "Operation"
		}
	, 
		"figure" : {
			isParent : true,
			targetModelClassId : "Figure"
		}
	

	
		,
	
	
	
		"chiController" : {
			isParent : false,
			targetModelClassId : "ChiController"
		}
	, 
		"package" : {
			isParent : false,
			targetModelClassId : "Package"
		}
	
	};

};

Ext.extend(application.application.include.model.domain.ChiNodeDescription, chi.model.ModelDescription);


application.application.include.model.domain.ChiNodeDescription.prototype.getGridColumns = function() {
	return [
	
		
			{
				header : "displayValue",
				dataIndex : "displayValue",
				width : 100,
				sortable : true,
				hidden: true,
				editor: 
	
			new chi.editor.control.TextField({})
	

			}
		, 
			{
				header : "tableName",
				dataIndex : "tableName",
				width : 100,
				sortable : true,
				hidden: true,
				editor: 
	
			new chi.editor.control.TextField({})
	

			}
		, 
			{
				header : "isOrdered",
				dataIndex : "isOrdered",
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
				header : "parentOrder",
				dataIndex : "parentOrder",
				width : 100,
				sortable : true,
				hidden: true,
				editor: 
	
			new chi.editor.control.TextField({})
	

			}
		, 
			{
				header : "childOrder",
				dataIndex : "childOrder",
				width : 100,
				sortable : true,
				hidden: true,
				editor: 
	
			new chi.editor.control.TextField({})
	

			}
		, 
			{
				header : "pkName",
				dataIndex : "pkName",
				width : 100,
				sortable : true,
				hidden: true,
				editor: 
	
			new chi.editor.control.TextField({})
	

			}
		, 
			{
				header : "isSearchable",
				dataIndex : "isSearchable",
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
				header : "orderby",
				dataIndex : "orderby",
				width : 100,
				sortable : true,
				hidden: true,
				editor: 
	
			new chi.editor.control.TextField({})
	

			}
		, 
			{
				header : "isSoap",
				dataIndex : "isSoap",
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
				header : "initparams",
				dataIndex : "initparams",
				width : 100,
				sortable : true,
				hidden: true,
				editor: 
	
			new chi.editor.control.TextField({})
	

			}
		, 
			{
				header : "visibility",
				dataIndex : "visibility",
				width : 100,
				sortable : true,
				hidden: true,
				editor: 
	
			new chi.editor.control.ComboBox({
				targetChiModelElementId: "Visibility"
			})
	

			}
		, 
			{
				header : "isAbstract",
				dataIndex : "isAbstract",
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
				header : "status",
				dataIndex : "status",
				width : 100,
				sortable : true,
				hidden: true,
				editor: 
	
			new chi.editor.control.ComboBox({
				targetChiModelElementId: "ChiBaseStatus"
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
				targetChiModelElementId: "ChiAuthors"
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
	
			new cwe.modelgrid.DummyField()
	

			}
		, 
			{
				header : "created",
				dataIndex : "created",
				width : 100,
				sortable : true,
				hidden: true,
				editor: 
	
			new cwe.modelgrid.DummyField()
	

			}
		, 
			{
				header : "creator",
				dataIndex : "creator",
				width : 100,
				sortable : true,
				hidden: true,
				editor: 
	
			new cwe.modelgrid.DummyField()
	

			}
		, 
			{
				header : "lastEditor",
				dataIndex : "lastEditor",
				width : 100,
				sortable : true,
				hidden: true,
				editor: 
	
			new cwe.modelgrid.DummyField()
	

			}
		, 
			{
				header : "modified",
				dataIndex : "modified",
				width : 100,
				sortable : true,
				hidden: true,
				editor: 
	
			new cwe.modelgrid.DummyField()
	

			}
		
	
	];
};



application.application.include.model.domain.ChiNodeDescription.prototype.getLabelColumns = function() {
	return [
	
		
			{
				header : "name",
				dataIndex : "name",
				width : 100,
				sortable : true
			}
		
	
	];
};



application.application.include.model.domain.ChiNodeDescription.prototype.getEditorItems = function() {
	return [
	
		new cwe.editor.control.PropertiesFieldSet({
			items: [
		
			
	
		
		new chi.editor.control.TextField({
		fieldLabel: "displayValue",
		name: "displayValue",
		dataIndex: "displayValue",
		
		toolTip: "The value that is displayed in a list view. a single value or '|' -separated list of values"
	}) 
	

		, 
			
	
		
		new chi.editor.control.TextField({
		fieldLabel: "tableName",
		name: "tableName",
		dataIndex: "tableName",
		
		toolTip: ""
	}) 
	

		, 
			
	
		
		new chi.editor.control.StaticComboBox({
		fieldLabel: "isOrdered",
		name: "isOrdered",
		dataIndex: "isOrdered",
		data: [["true","true"],["false","false"]],
		toolTip: ""
	}) 
	

		, 
			
	
		
		new chi.editor.control.TextField({
		fieldLabel: "parentOrder",
		name: "parentOrder",
		dataIndex: "parentOrder",
		
		toolTip: "The order of the associated parents. a single value or '|' -separated list of values"
	}) 
	

		, 
			
	
		
		new chi.editor.control.TextField({
		fieldLabel: "childOrder",
		name: "childOrder",
		dataIndex: "childOrder",
		
		toolTip: "The order of the associated children. a single value or '|' -separated list of values"
	}) 
	

		, 
			
	
		
		new chi.editor.control.TextField({
		fieldLabel: "pkName",
		name: "pkName",
		dataIndex: "pkName",
		
		toolTip: "The name of the primary key column on the database (optional). The generator will add this automatically if there is no appropriate attribute."
	}) 
	

		, 
			
	
		
		new chi.editor.control.StaticComboBox({
		fieldLabel: "isSearchable",
		name: "isSearchable",
		dataIndex: "isSearchable",
		data: [["true","true"],["false","false"]],
		toolTip: "Indicates wether this type should be included in the default search."
	}) 
	

		, 
			
	
		
		new chi.editor.control.TextField({
		fieldLabel: "orderby",
		name: "orderby",
		dataIndex: "orderby",
		
		toolTip: "Definition of default sorting. Possible values: 'none' (no order), 'sortkey' (generates a 'sortkey' column, that is used for explicit sorting) or any the name of any WCMFValue defined in the node optionally."
	}) 
	

		, 
			
	
		
		new chi.editor.control.StaticComboBox({
		fieldLabel: "isSoap",
		name: "isSoap",
		dataIndex: "isSoap",
		data: [["true","true"],["false","false"]],
		toolTip: "Define if the type should be exposed to the SOAP interface."
	}) 
	

		, 
			
	
		
		new chi.editor.control.TextField({
		fieldLabel: "initparams",
		name: "initparams",
		dataIndex: "initparams",
		
		toolTip: "Name of the configuration file's (config.ini) section, in which the initial parameters for the corresponding mapper are defined"
	}) 
	

		, 
			
	
		
		new chi.editor.control.ComboBox({
		fieldLabel: "visibility",
		name: "visibility",
		dataIndex: "visibility",
		targetChiModelElementId: "Visibility",
		toolTip: "the visibility of this class (Public, Private, Protected, Package)"
	}) 
	

		, 
			
	
		
		new chi.editor.control.StaticComboBox({
		fieldLabel: "isAbstract",
		name: "isAbstract",
		dataIndex: "isAbstract",
		data: [["true","true"],["false","false"]],
		toolTip: "if this type reppresent an abstract type only."
	}) 
	

		, 
			
	
		
		new chi.editor.control.ComboBox({
		fieldLabel: "status",
		name: "status",
		dataIndex: "status",
		targetChiModelElementId: "ChiBaseStatus",
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
		targetChiModelElementId: "ChiAuthors",
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
		
	
	
	
		new cwe.editor.control.AssociationsFieldSet({
			items: [
		
			
	
		new cwe.editor.control.MultipleAssociate( {
	
			fieldLabel : "chiObject",
			name : "chiObject",
			dataIndex : "chiObject",
			targetChiModelElementId : "ChiObject",
			isParent : true,
			aggregationKind : cwe.Constants.AggregationKind.NONE
		
	})

		, 
			
	
		new cwe.editor.control.MultipleAssociate( {
	
			fieldLabel : "chiValueRef",
			name : "chiValueRef",
			dataIndex : "chiValueRef",
			targetChiModelElementId : "ChiValueRef",
			isParent : true,
			aggregationKind : cwe.Constants.AggregationKind.NONE
		
	})

		, 
			
	
		new cwe.editor.control.MultipleAssociate( {
	
			fieldLabel : "chiValue",
			name : "chiValue",
			dataIndex : "chiValue",
			targetChiModelElementId : "ChiValue",
			isParent : true,
			aggregationKind : cwe.Constants.AggregationKind.NONE
		
	})

		, 
			
	
		new cwe.editor.control.MultipleAssociate( {
	
			fieldLabel : "operation",
			name : "operation",
			dataIndex : "operation",
			targetChiModelElementId : "Operation",
			isParent : true,
			aggregationKind : cwe.Constants.AggregationKind.NONE
		
	})

		, 
			
	
		new cwe.editor.control.MultipleAssociate( {
	
			fieldLabel : "figure",
			name : "figure",
			dataIndex : "figure",
			targetChiModelElementId : "Figure",
			isParent : true,
			aggregationKind : cwe.Constants.AggregationKind.NONE
		
	})

		
		
		
			,
		
		
		
			
	
		new cwe.editor.control.SingleAssociate( {
	
			fieldLabel : "chiController",
			name : "chiController",
			dataIndex : "chiController",
			targetChiModelElementId : "ChiController",
			isParent : false,
			aggregationKind : cwe.Constants.AggregationKind.SHARED
		
	})

		, 
			
	
		new cwe.editor.control.SingleAssociate( {
	
			fieldLabel : "package",
			name : "package",
			dataIndex : "package",
			targetChiModelElementId : "Package",
			isParent : false,
			aggregationKind : cwe.Constants.AggregationKind.SHARED
		
	})

		
		
		]})
	
 ];
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
application.application.include.model.domain.ChiNodeDescription.prototype.createInstance = function(oid, data) {
	return new application.application.include.model.domain.ChiNode(oid, data);
};


chi.model.ModelDescriptionContainer.getInstance().registerDescription(new application.application.include.model.domain.ChiNodeDescription());
	