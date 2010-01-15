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
Ext.namespace("application.application.include.model.rules");

application.application.include.model.rules.RuleVariableDescription = function() {
	application.application.include.model.rules.RuleVariableDescription.superclass.constructor.call(this, arguments);
	
	this.chiModelElementId = "RuleVariable";
	this.name = "RuleVariable";
	this.treeIconClass = "RuleVariableTreeIcon16x16";
	this.owningPackageId = "application.application.include.model.rules.Rules_package";
	
	
	this.recordDefinition = [
	
		{
			name : "context",
			mapping : "context"
		}
	, 
		{
			name : "ruleValue",
			mapping : "ruleValue"
		}
	, 
		{
			name : "variableType",
			mapping : "variableType"
		}
	, 
		{
			name : "isEditable",
			mapping : "isEditable"
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
			name : "productionRule",
			mapping : "productionRule"
		}
	, 
		{
			name : "package",
			mapping : "package"
		}
	
	];

	
	
	this.relations = {
	
		"figure" : {
			isParent : true,
			targetModelClassId : "Figure"
		}
	

	
		,
	
	
	
		"productionRule" : {
			isParent : false,
			targetModelClassId : "ProductionRule"
		}
	, 
		"package" : {
			isParent : false,
			targetModelClassId : "Package"
		}
	
	};

};

Ext.extend(application.application.include.model.rules.RuleVariableDescription, chi.model.ModelDescription);


application.application.include.model.rules.RuleVariableDescription.prototype.getGridColumns = function() {
	return [
	
		
			{
				header : "context",
				dataIndex : "context",
				width : 100,
				sortable : true,
				hidden: true,
				editor: 
	
			new chi.editor.control.StaticComboBox({
				data: [["in","in"],["out","out"]]
			})
	

			}
		, 
			{
				header : "ruleValue",
				dataIndex : "ruleValue",
				width : 100,
				sortable : true,
				hidden: true,
				editor: 
	
			new chi.editor.control.TextField({})
	

			}
		, 
			{
				header : "variableType",
				dataIndex : "variableType",
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
				data: [["yes","no"],["yes","no"]]
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



application.application.include.model.rules.RuleVariableDescription.prototype.getLabelColumns = function() {
	return [
	
		
	
	];
};



application.application.include.model.rules.RuleVariableDescription.prototype.getEditorItems = function() {
	return [
	
		new cwe.editor.control.PropertiesFieldSet({
			items: [
		
			
	
		
		new chi.editor.control.StaticComboBox({
		fieldLabel: "context",
		name: "context",
		dataIndex: "context",
		data: [["in","in"],["out","out"]],
		toolTip: ""
	}) 
	

		, 
			
	
		
		new chi.editor.control.TextField({
		fieldLabel: "ruleValue",
		name: "ruleValue",
		dataIndex: "ruleValue",
		
		toolTip: ""
	}) 
	

		, 
			
	
		
		new chi.editor.control.TextField({
		fieldLabel: "variableType",
		name: "variableType",
		dataIndex: "variableType",
		
		toolTip: ""
	}) 
	

		, 
			
	
		
		new chi.editor.control.StaticComboBox({
		fieldLabel: "isEditable",
		name: "isEditable",
		dataIndex: "isEditable",
		data: [["yes","no"],["yes","no"]],
		toolTip: ""
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
	
			fieldLabel : "figure",
			name : "figure",
			dataIndex : "figure",
			targetChiModelElementId : "Figure",
			isParent : true,
			aggregationKind : cwe.Constants.AggregationKind.NONE
		
	})

		
		
		
			,
		
		
		
			
	
		new cwe.editor.control.SingleAssociate( {
	
			fieldLabel : "productionRule",
			name : "productionRule",
			dataIndex : "productionRule",
			targetChiModelElementId : "ProductionRule",
			isParent : false,
			aggregationKind : cwe.Constants.AggregationKind.COMPOSITE
		
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
application.application.include.model.rules.RuleVariableDescription.prototype.createInstance = function(oid, data) {
	return new application.application.include.model.rules.RuleVariable(oid, data);
};


chi.model.ModelDescriptionContainer.getInstance().registerDescription(new application.application.include.model.rules.RuleVariableDescription());
	