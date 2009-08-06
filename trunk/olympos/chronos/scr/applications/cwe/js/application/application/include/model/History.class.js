
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
	
	this.cweModelElementId = "History";
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

Ext.extend(application.application.include.model.History, cwe.model.ModelClass);


application.application.include.model.History.prototype.getGridColumns = function() {
	return [
	
		
			{
			    header : "data",
			    dataIndex : "data",
			    width : 100,
			    sortable : true,
			    editor: 
	
		
			new cwe.editor.control.TextField({
				
			})
					
	

			}
		, 
			{
			    header : "duplicate",
			    dataIndex : "duplicate",
			    width : 100,
			    sortable : true,
			    editor: 
	
		
			new cwe.editor.control.TextField({
				
			})
					
	

			}
		, 
			{
			    header : "eventtype",
			    dataIndex : "eventtype",
			    width : 100,
			    sortable : true,
			    editor: 
	
		
			new cwe.editor.control.TextField({
				
			})
					
	

			}
		, 
			{
			    header : "affectedoid",
			    dataIndex : "affectedoid",
			    width : 100,
			    sortable : true,
			    editor: 
	
		
			new cwe.editor.control.TextField({
				
			})
					
	

			}
		, 
			{
			    header : "otheroid",
			    dataIndex : "otheroid",
			    width : 100,
			    sortable : true,
			    editor: 
	
		
			new cwe.editor.control.TextField({
				
			})
					
	

			}
		, 
			{
			    header : "timestamp",
			    dataIndex : "timestamp",
			    width : 100,
			    sortable : true,
			    editor: 
	
		
			new cwe.editor.control.TextField({
				
			})
					
	

			}
		, 
			{
			    header : "user",
			    dataIndex : "user",
			    width : 100,
			    sortable : true,
			    editor: 
	
		
			new cwe.editor.control.TextField({
				
			})
					
	

			}
		
	
	];
};



application.application.include.model.History.prototype.getEditorItems = function() {
	return [
	
		new cwe.editor.control.PropertiesFieldSet({
			items: [
		
			
	new cwe.editor.control.TextField({
		fieldLabel: "data",
		name: "data",
		dataIndex: "data",
		
		
		toolTip: ""
	}) 

		, 
			
	new cwe.editor.control.TextField({
		fieldLabel: "duplicate",
		name: "duplicate",
		dataIndex: "duplicate",
		
		
		toolTip: ""
	}) 

		, 
			
	new cwe.editor.control.TextField({
		fieldLabel: "eventtype",
		name: "eventtype",
		dataIndex: "eventtype",
		
		
		toolTip: ""
	}) 

		, 
			
	new cwe.editor.control.TextField({
		fieldLabel: "affectedoid",
		name: "affectedoid",
		dataIndex: "affectedoid",
		
		
		toolTip: ""
	}) 

		, 
			
	new cwe.editor.control.TextField({
		fieldLabel: "otheroid",
		name: "otheroid",
		dataIndex: "otheroid",
		
		
		toolTip: ""
	}) 

		, 
			
	new cwe.editor.control.TextField({
		fieldLabel: "timestamp",
		name: "timestamp",
		dataIndex: "timestamp",
		
		
		toolTip: ""
	}) 

		, 
			
	new cwe.editor.control.TextField({
		fieldLabel: "user",
		name: "user",
		dataIndex: "user",
		
		
		toolTip: ""
	}) 

		
		]})
		
		
	
	
	
 ];
};


cwe.model.ModelClassContainer.getInstance().registerClass(new application.application.include.model.History());
	