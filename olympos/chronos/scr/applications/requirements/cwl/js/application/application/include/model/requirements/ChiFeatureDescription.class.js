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
Ext.namespace("application.application.include.model.requirements");

application.application.include.model.requirements.ChiFeatureDescription = function() {
	application.application.include.model.requirements.ChiFeatureDescription.superclass.constructor.call(this, arguments);
	
	this.chiModelElementId = "ChiFeature";
	this.name = "ChiFeature";
	this.treeIconClass = "ChiFeatureTreeIcon16x16";
	this.owningPackageId = "application.application.include.model.requirements.Requirements_package";
	
	
	this.recordDefinition = [
	
		{
			name : "author",
			mapping : "author"
		}
	, 
		{
			name : "proofreader",
			mapping : "proofreader"
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
			name : "chiBusinessUseCase",
			mapping: "chiBusinessUseCase"
		}
	, 
		{
			name : "figure",
			mapping: "figure"
		}
	, 
		{
			name : "chiBusinessUseCaseCore",
			mapping: "chiBusinessUseCaseCore"
		}
	
	
	
		,
	
	
	
		{
			name : "package",
			mapping : "package"
		}
	
	];

	
	
	this.relations = {
	
		"chiBusinessUseCase" : {
			isParent : true,
			targetModelClassId : "ChiBusinessUseCase"
		}
	, 
		"figure" : {
			isParent : true,
			targetModelClassId : "Figure"
		}
	, 
		"chiBusinessUseCaseCore" : {
			isParent : true,
			targetModelClassId : "ChiBusinessUseCaseCore"
		}
	

	
		,
	
	
	
		"package" : {
			isParent : false,
			targetModelClassId : "Package"
		}
	
	};

};

Ext.extend(application.application.include.model.requirements.ChiFeatureDescription, chi.model.ModelDescription);


application.application.include.model.requirements.ChiFeatureDescription.prototype.getGridColumns = function() {
	return [
	
		
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
			    header : "proofreader",
			    dataIndex : "proofreader",
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
			    header : "status",
			    dataIndex : "status",
			    width : 100,
			    sortable : true,
			    hidden: true,
			    editor: 
	
			new chi.editor.control.ComboBox({
				targetCweModelElementId: "ChiFeatureStatus"
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



application.application.include.model.requirements.ChiFeatureDescription.prototype.getLabelColumns = function() {
	return [
	
		
	
	];
};



application.application.include.model.requirements.ChiFeatureDescription.prototype.getEditorItems = function() {
	return [
	
		new chi.editor.control.PropertiesFieldSet({
			items: [
		
			
	
		
		new chi.editor.control.ComboBox({
		fieldLabel: "author",
		name: "author",
		dataIndex: "author",
		targetCweModelElementId: "ChiAuthors",
		toolTip: "This feature's author's name and role in the project"
	}) 
	

		, 
			
	
		
		new chi.editor.control.ComboBox({
		fieldLabel: "proofreader",
		name: "proofreader",
		dataIndex: "proofreader",
		targetCweModelElementId: "ChiAuthors",
		toolTip: "This feature's revisor's name and role in the project"
	}) 
	

		, 
			
	
		
		new chi.editor.control.ComboBox({
		fieldLabel: "status",
		name: "status",
		dataIndex: "status",
		targetCweModelElementId: "ChiFeatureStatus",
		toolTip: "This feature's status"
	}) 
	

		, 
			
	
		
		new chi.editor.control.TextField({
		fieldLabel: "alias",
		name: "alias",
		dataIndex: "alias",
		
		toolTip: "the Project Id of this object."
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
	
			fieldLabel : "chiBusinessUseCase",
			name : "chiBusinessUseCase",
			dataIndex : "chiBusinessUseCase",
			targetChiModelElementId : "ChiBusinessUseCase",
			isParent : true,
			aggregationKind : chi.Constants.AggregationKind.NONE
		
	})

		, 
			
	
		new chi.editor.control.MultipleAssociate( {
	
			fieldLabel : "figure",
			name : "figure",
			dataIndex : "figure",
			targetChiModelElementId : "Figure",
			isParent : true,
			aggregationKind : chi.Constants.AggregationKind.NONE
		
	})

		, 
			
	
		new chi.editor.control.MultipleAssociate( {
	
			fieldLabel : "chiBusinessUseCaseCore",
			name : "chiBusinessUseCaseCore",
			dataIndex : "chiBusinessUseCaseCore",
			targetChiModelElementId : "ChiBusinessUseCaseCore",
			isParent : true,
			aggregationKind : chi.Constants.AggregationKind.NONE
		
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
application.application.include.model.requirements.ChiFeatureDescription.prototype.createInstance = function(oid, data) {
	return new application.application.include.model.requirements.ChiFeature(oid, data);
};


chi.model.ModelDescriptionContainer.getInstance().registerDescription(new application.application.include.model.requirements.ChiFeatureDescription());
	