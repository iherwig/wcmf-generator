
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

application.application.include.model.wcmf.UserRDB = function() {
	application.application.include.model.wcmf.UserRDB.superclass.constructor.call(this, arguments);
	
	this.cweModelElementId = "UserRDB";
	this.name = "UserRDB";
	this.treeIconClass = "UserRDBTreeIcon16x16";
	this.owningPackageId = "application.application.include.model.wcmf.Wcmf_package";
	
	
	this.recordDefinition = [
	
		{
			name : "login",
			mapping : "login"
		}
	, 
		{
			name : "password",
			mapping : "password"
		}
	, 
		{
			name : "name",
			mapping : "name"
		}
	, 
		{
			name : "firstname",
			mapping : "firstname"
		}
	, 
		{
			name : "config",
			mapping : "config"
		}
	
	
	
		,
	
	
	
	
	
	
	
		{
			name : "childLocktable",
			mapping : "childLocktable"
		}
	, 
		{
			name : "childNMUserRole",
			mapping : "childNMUserRole"
		}
	
	];

	
	
	this.relations = {
	

	
	
	
		"childLocktable" : {
			isParent : false,
			targetModelClassId : "Locktable"
		}
	, 
		"childNMUserRole" : {
			isParent : false,
			targetModelClassId : "NMUserRole"
		}
	
	};

};

Ext.extend(application.application.include.model.wcmf.UserRDB, cwe.model.ModelClass);


application.application.include.model.wcmf.UserRDB.prototype.getGridColumns = function() {
	return [
	
		
			{
			    header : "login",
			    dataIndex : "login",
			    width : 100,
			    sortable : true,
			    editor: 
	
		
			new cwe.editor.control.TextField({
				
			})
					
	

			}
		, 
			{
			    header : "password",
			    dataIndex : "password",
			    width : 100,
			    sortable : true,
			    editor: 
	
		
			new cwe.editor.control.Password({
				
			})
					
	

			}
		, 
			{
			    header : "name",
			    dataIndex : "name",
			    width : 100,
			    sortable : true,
			    editor: 
	
		
			new cwe.editor.control.TextField({
				
			})
					
	

			}
		, 
			{
			    header : "firstname",
			    dataIndex : "firstname",
			    width : 100,
			    sortable : true,
			    editor: 
	
		
			new cwe.editor.control.TextField({
				
			})
					
	

			}
		, 
			{
			    header : "config",
			    dataIndex : "config",
			    width : 100,
			    sortable : true,
			    editor: 
	
		
			new cwe.editor.control.ComboBox({
				targetCweModelElementId: "g_getConfigFiles"
			})
					
	

			}
		
	
	];
};



application.application.include.model.wcmf.UserRDB.prototype.getEditorItems = function() {
	return [
	
		new cwe.editor.control.PropertiesFieldSet({
			items: [
		
			
	new cwe.editor.control.TextField({
		fieldLabel: "login",
		name: "login",
		dataIndex: "login",
		
		
		toolTip: ""
	}) 

		, 
			
	new cwe.editor.control.Password({
		fieldLabel: "password",
		name: "password",
		dataIndex: "password",
		
		
		toolTip: ""
	}) 

		, 
			
	new cwe.editor.control.TextField({
		fieldLabel: "name",
		name: "name",
		dataIndex: "name",
		
		
		toolTip: ""
	}) 

		, 
			
	new cwe.editor.control.TextField({
		fieldLabel: "firstname",
		name: "firstname",
		dataIndex: "firstname",
		
		
		toolTip: ""
	}) 

		, 
			
	new cwe.editor.control.ComboBox({
		fieldLabel: "config",
		name: "config",
		dataIndex: "config",
		targetCweModelElementId: "g_getConfigFiles",
		
		toolTip: ""
	}) 

		
		]})
		
		
			,
		
	
	
	
		new cwe.editor.control.AssociationsFieldSet({
			items: [
		
		
		
		
		
			
	
		new cwe.editor.control.MultipleAssociate( {
	
		
			fieldLabel : "childLocktable",
			name : "childLocktable",
			dataIndex : "childLocktable",
			targetCweModelElementId : "Locktable",
			isParent : false
		
	})

		, 
			
	
		new cwe.editor.control.MultipleAssociate( {
	
		
			fieldLabel : "childNMUserRole",
			name : "childNMUserRole",
			dataIndex : "childNMUserRole",
			targetCweModelElementId : "NMUserRole",
			isParent : false
		
	})

		
		
		]})
	
 ];
};


cwe.model.ModelClassContainer.getInstance().registerClass(new application.application.include.model.wcmf.UserRDB());
	