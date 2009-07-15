
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

application.application.include.model.Chronos.RoleRDB = function() {
	application.application.include.model.Chronos.RoleRDB.superclass.constructor.call(this, arguments);
	
	this.cweModelElementId = "RoleRDB";
	this.name = "RoleRDB";
	this.treeIconClass = "RoleRDBTreeIcon16x16";
	this.owningPackageId = "application.application.include.model.Chronos.Chronos_package";
	
	
	this.recordDefinition = [
	
		{
			name : "id",
			mapping : "id"
		}
	, 
		{
			name : "name",
			mapping : "name"
		}
	
	
	
		,
	
	
	
	
	
	
	
		{
			name : "childNMUserRole",
			mapping : "childNMUserRole"
		}
	
	];

	
	
	this.relations = {
	

	
	
	
		"childNMUserRole" : {
			isParent : false,
			targetModelClassId : "NMUserRole"
		}
	
	}

}

Ext.extend(application.application.include.model.Chronos.RoleRDB, cwe.model.ModelClass);


application.application.include.model.Chronos.RoleRDB.prototype.getEditorItems = function() {
	return [
	
		 new Ext.form.TextField( {
			fieldLabel : "id",
			name : "id",
			dataIndex : "id"
		})
	, 
		 new Ext.form.TextField( {
			fieldLabel : "name",
			name : "name",
			dataIndex : "name"
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


cwe.model.ModelClassContainer.getInstance().registerClass(new application.application.include.model.Chronos.RoleRDB());
	