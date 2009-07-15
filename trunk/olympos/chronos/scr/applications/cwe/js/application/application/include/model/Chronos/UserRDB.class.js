
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
Ext.namespace("application.application.include.model.Chronos");

application.application.include.model.Chronos.UserRDB = function() {
	application.application.include.model.Chronos.UserRDB.superclass.constructor.call(this, arguments);
	
	this.cweModelElementId = "UserRDB";
	this.name = "UserRDB";
	this.treeIconClass = "UserRDBTreeIcon16x16";
	this.owningPackageId = "application.application.include.model.Chronos.Chronos_package";
	
	
	this.recordDefinition = [
	
		{
			name : "id",
			mapping : "id"
		}
	, 
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
	
	}

}

Ext.extend(application.application.include.model.Chronos.UserRDB, cwe.model.ModelClass);


application.application.include.model.Chronos.UserRDB.prototype.getEditorItems = function() {
	return [
	
		 new Ext.form.TextField( {
			fieldLabel : "id",
			name : "id",
			dataIndex : "id"
		})
	, 
		 new Ext.form.TextField( {
			fieldLabel : "login",
			name : "login",
			dataIndex : "login"
		})
	, 
		 new Ext.form.TextField( {
			fieldLabel : "password",
			name : "password",
			dataIndex : "password"
		})
	, 
		 new Ext.form.TextField( {
			fieldLabel : "name",
			name : "name",
			dataIndex : "name"
		})
	, 
		 new Ext.form.TextField( {
			fieldLabel : "firstname",
			name : "firstname",
			dataIndex : "firstname"
		})
	, 
		 new Ext.form.TextField( {
			fieldLabel : "config",
			name : "config",
			dataIndex : "config"
		})
	
	
	
		,
	
	
	
	
	
	
	
		
	
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

	
 ];
}


cwe.model.ModelClassContainer.getInstance().registerClass(new application.application.include.model.Chronos.UserRDB());
	