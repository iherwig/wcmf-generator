
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

application.application.include.model.Translation = function() {
	application.application.include.model.Translation.superclass.constructor.call(this, arguments);
	
	this.cweModelElementId = "Translation";
	this.name = "Translation";
	this.treeIconClass = "TranslationTreeIcon16x16";
	this.owningPackageId = "application.application.include.model.Model_package";
	
	
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

Ext.extend(application.application.include.model.Translation, cwe.model.ModelClass);


application.application.include.model.Translation.prototype.getGridColumns = function() {
	return [
	
		
			{
			    header : "objectid",
			    dataIndex : "objectid",
			    width : 100,
			    sortable : true,
			    editor: 
	
		
			new cwe.editor.control.TextField({
				
			})
					
	

			}
		, 
			{
			    header : "attribute",
			    dataIndex : "attribute",
			    width : 100,
			    sortable : true,
			    editor: 
	
		
			new cwe.editor.control.TextField({
				
			})
					
	

			}
		, 
			{
			    header : "translation",
			    dataIndex : "translation",
			    width : 100,
			    sortable : true,
			    editor: 
	
		
			new cwe.editor.control.TextField({
				
			})
					
	

			}
		, 
			{
			    header : "language",
			    dataIndex : "language",
			    width : 100,
			    sortable : true,
			    editor: 
	
		
			new cwe.editor.control.TextField({
				
			})
					
	

			}
		
	
	];
};



application.application.include.model.Translation.prototype.getEditorItems = function() {
	return [
	
		new cwe.editor.control.PropertiesFieldSet({
			items: [
		
			
	new cwe.editor.control.TextField({
		fieldLabel: "objectid",
		name: "objectid",
		dataIndex: "objectid",
		
		
		toolTip: "The object id of the object to which the translation belongs"
	}) 

		, 
			
	new cwe.editor.control.TextField({
		fieldLabel: "attribute",
		name: "attribute",
		dataIndex: "attribute",
		
		
		toolTip: "The attribute of the object that is translated"
	}) 

		, 
			
	new cwe.editor.control.TextField({
		fieldLabel: "translation",
		name: "translation",
		dataIndex: "translation",
		
		
		toolTip: "The translation"
	}) 

		, 
			
	new cwe.editor.control.TextField({
		fieldLabel: "language",
		name: "language",
		dataIndex: "language",
		
		
		toolTip: "The language of the translation"
	}) 

		
		]})
		
		
	
	
	
 ];
};


cwe.model.ModelClassContainer.getInstance().registerClass(new application.application.include.model.Translation());
	