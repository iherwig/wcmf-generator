
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
Ext.namespace("application.application.include.model.wcmf");

application.application.include.model.wcmf.Translation = function() {
	application.application.include.model.wcmf.Translation.superclass.constructor.call(this, arguments);
	
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

Ext.extend(application.application.include.model.wcmf.Translation, chi.model.ModelClass);


application.application.include.model.wcmf.Translation.prototype.getGridColumns = function() {
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



application.application.include.model.wcmf.Translation.prototype.getLabelColumns = function() {
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



application.application.include.model.wcmf.Translation.prototype.getEditorItems = function() {
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
 * Returns the label of an object of this Model Class.
 * 
 * @param {chi.model.ModelRecord}
 *            record The record of this Model Class to extract the label from.
 * @return The label of an object of this Model Class.
 * @type String
 */
application.application.include.model.wcmf.Translation.prototype.getLabel = function(record) {
	var label = record.get("oid") + " - " + record.get("attribute") + " - " + record.get("language");
	if (label == undefined || label.length == 0) {
		label = record.getOid(); 
	}
	return label;
};


chi.model.ModelClassContainer.getInstance().registerClass(new application.application.include.model.wcmf.Translation());
	