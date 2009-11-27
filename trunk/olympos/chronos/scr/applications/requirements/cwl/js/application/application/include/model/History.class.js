
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
Ext.namespace("application.application.include.model");

application.application.include.model.History = function() {
	application.application.include.model.History.superclass.constructor.call(this, arguments);
	
	this.chiModelElementId = "History";
	this.name = "History";
	this.treeIconClass = "HistoryTreeIcon16x16";
	this.owningPackageId = "application.application.include.model.Model_package";
	
	
	this.recordDefinition = [
	
		{
			name : "data",
			mapping : "data"
		}
	, 
		{
			name : "duplicate",
			mapping : "duplicate"
		}
	, 
		{
			name : "eventtype",
			mapping : "eventtype"
		}
	, 
		{
			name : "affectedoid",
			mapping : "affectedoid"
		}
	, 
		{
			name : "otheroid",
			mapping : "otheroid"
		}
	, 
		{
			name : "timestamp",
			mapping : "timestamp"
		}
	, 
		{
			name : "user",
			mapping : "user"
		}
	
	
	
	
	
	
	
	
	
	];

	
	
	this.relations = {
	

	
	
	
	};

};

Ext.extend(application.application.include.model.History, chi.model.ModelClass);


application.application.include.model.History.prototype.getGridColumns = function() {
	return [
	
		
			{
			    header : "data",
			    dataIndex : "data",
			    width : 100,
			    sortable : true,
			    hidden: true,
			    editor: 
	
			new chi.editor.control.TextField({})
	

			}
		, 
			{
			    header : "duplicate",
			    dataIndex : "duplicate",
			    width : 100,
			    sortable : true,
			    hidden: true,
			    editor: 
	
			new chi.editor.control.TextField({})
	

			}
		, 
			{
			    header : "eventtype",
			    dataIndex : "eventtype",
			    width : 100,
			    sortable : true,
			    hidden: true,
			    editor: 
	
			new chi.editor.control.TextField({})
	

			}
		, 
			{
			    header : "affectedoid",
			    dataIndex : "affectedoid",
			    width : 100,
			    sortable : true,
			    hidden: true,
			    editor: 
	
			new chi.editor.control.TextField({})
	

			}
		, 
			{
			    header : "otheroid",
			    dataIndex : "otheroid",
			    width : 100,
			    sortable : true,
			    hidden: true,
			    editor: 
	
			new chi.editor.control.TextField({})
	

			}
		, 
			{
			    header : "timestamp",
			    dataIndex : "timestamp",
			    width : 100,
			    sortable : true,
			    hidden: true,
			    editor: 
	
			new chi.editor.control.TextField({})
	

			}
		, 
			{
			    header : "user",
			    dataIndex : "user",
			    width : 100,
			    sortable : true,
			    hidden: true,
			    editor: 
	
			new chi.editor.control.TextField({})
	

			}
		
	
	];
};



application.application.include.model.History.prototype.getLabelColumns = function() {
	return [
	
		
	
	];
};



application.application.include.model.History.prototype.getEditorItems = function() {
	return [
	
		new chi.editor.control.PropertiesFieldSet({
			items: [
		
			
	
		
		new chi.editor.control.TextField({
		fieldLabel: "data",
		name: "data",
		dataIndex: "data",
		
		toolTip: ""
	}) 
	

		, 
			
	
		
		new chi.editor.control.TextField({
		fieldLabel: "duplicate",
		name: "duplicate",
		dataIndex: "duplicate",
		
		toolTip: ""
	}) 
	

		, 
			
	
		
		new chi.editor.control.TextField({
		fieldLabel: "eventtype",
		name: "eventtype",
		dataIndex: "eventtype",
		
		toolTip: ""
	}) 
	

		, 
			
	
		
		new chi.editor.control.TextField({
		fieldLabel: "affectedoid",
		name: "affectedoid",
		dataIndex: "affectedoid",
		
		toolTip: ""
	}) 
	

		, 
			
	
		
		new chi.editor.control.TextField({
		fieldLabel: "otheroid",
		name: "otheroid",
		dataIndex: "otheroid",
		
		toolTip: ""
	}) 
	

		, 
			
	
		
		new chi.editor.control.TextField({
		fieldLabel: "timestamp",
		name: "timestamp",
		dataIndex: "timestamp",
		
		toolTip: ""
	}) 
	

		, 
			
	
		
		new chi.editor.control.TextField({
		fieldLabel: "user",
		name: "user",
		dataIndex: "user",
		
		toolTip: ""
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
application.application.include.model.History.prototype.getLabel = function(record) {
	var label = record.get("");
	if (label == undefined || label.length == 0) {
		label = record.getOid(); 
	}
	return label;
};


chi.model.ModelClassContainer.getInstance().registerClass(new application.application.include.model.History());
	