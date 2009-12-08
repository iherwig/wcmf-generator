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
Ext.namespace("application.application.include.model.wcmf");

application.application.include.model.wcmf.TranslationDescription = function() {
	application.application.include.model.wcmf.TranslationDescription.superclass.constructor.call(this, arguments);
	
	this.chiModelElementId = "Translation";
	this.name = "Translation";
	this.treeIconClass = "TranslationTreeIcon16x16";
	this.owningPackageId = "application.application.include.model.wcmf.Wcmf_package";
	
	
	this.recordDefinition = [
	
		{
			name : "objectid",
			mapping : "objectid"
		}
	, 
		{
			name : "attribute",
			mapping : "attribute"
		}
	, 
		{
			name : "translation",
			mapping : "translation"
		}
	, 
		{
			name : "language",
			mapping : "language"
		}
	
	
	
	
	
	
	
	
	
	];

	
	
	this.relations = {
	

	
	
	
	};

};

Ext.extend(application.application.include.model.wcmf.TranslationDescription, chi.model.ModelDescription);


application.application.include.model.wcmf.TranslationDescription.prototype.getGridColumns = function() {
	return [
	
		
			{
			    header : "objectid",
			    dataIndex : "objectid",
			    width : 100,
			    sortable : true,
			    hidden: true,
			    editor: 
	
			new chi.editor.control.TextField({})
	

			}
		, 
			{
			    header : "attribute",
			    dataIndex : "attribute",
			    width : 100,
			    sortable : true,
			    
			    editor: 
	
			new chi.editor.control.TextField({})
	

			}
		, 
			{
			    header : "translation",
			    dataIndex : "translation",
			    width : 100,
			    sortable : true,
			    hidden: true,
			    editor: 
	
			new chi.editor.control.TextField({})
	

			}
		, 
			{
			    header : "language",
			    dataIndex : "language",
			    width : 100,
			    sortable : true,
			    
			    editor: 
	
			new chi.editor.control.TextField({})
	

			}
		
	
	];
};



application.application.include.model.wcmf.TranslationDescription.prototype.getLabelColumns = function() {
	return [
	
		
			{
			    header : "attribute",
			    dataIndex : "attribute",
			    width : 100,
			    sortable : true
			}
		, 
			{
			    header : "language",
			    dataIndex : "language",
			    width : 100,
			    sortable : true
			}
		
	
	];
};



application.application.include.model.wcmf.TranslationDescription.prototype.getEditorItems = function() {
	return [
	
		new chi.editor.control.PropertiesFieldSet({
			items: [
		
			
	
		
		new chi.editor.control.TextField({
		fieldLabel: "objectid",
		name: "objectid",
		dataIndex: "objectid",
		
		toolTip: "The object id of the object to which the translation belongs"
	}) 
	

		, 
			
	
		
		new chi.editor.control.TextField({
		fieldLabel: "attribute",
		name: "attribute",
		dataIndex: "attribute",
		
		toolTip: "The attribute of the object that is translated"
	}) 
	

		, 
			
	
		
		new chi.editor.control.TextField({
		fieldLabel: "translation",
		name: "translation",
		dataIndex: "translation",
		
		toolTip: "The translation"
	}) 
	

		, 
			
	
		
		new chi.editor.control.TextField({
		fieldLabel: "language",
		name: "language",
		dataIndex: "language",
		
		toolTip: "The language of the translation"
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
application.application.include.model.wcmf.TranslationDescription.prototype.createInstance = function(oid, data) {
	return new application.application.include.model.wcmf.Translation(oid, data);
};


chi.model.ModelDescriptionContainer.getInstance().registerDescription(new application.application.include.model.wcmf.TranslationDescription());
	