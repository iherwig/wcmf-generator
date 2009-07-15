
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

application.application.include.model.Chronos.NMUserRole = function() {
	application.application.include.model.Chronos.NMUserRole.superclass.constructor.call(this, arguments);
	
	this.cweModelElementId = "NMUserRole";
	this.name = "NMUserRole";
	this.treeIconClass = "NMUserRoleTreeIcon16x16";
	this.owningPackageId = "application.application.include.model.Chronos.Chronos_package";
	
	
	this.recordDefinition = [
	
		{
			name : "fk_role_id",
			mapping : "fk_role_id"
		}
	, 
		{
			name : "fk_user_id",
			mapping : "fk_user_id"
		}
	, 
		{
			name : "fk_userrdb_id",
			mapping : "fk_userrdb_id"
		}
	, 
		{
			name : "fk_rolerdb_id",
			mapping : "fk_rolerdb_id"
		}
	
	
	
		,
	
	
	
		{
			name : "parentRoleRDB",
			mapping: "parentRoleRDB"
		}
	, 
		{
			name : "parentUserRDB",
			mapping: "parentUserRDB"
		}
	
	
	
		,
	
	
	
	];

	
	
	this.relations = {
	
		"parentRoleRDB" : {
			isParent : true,
			targetModelClassId : "RoleRDB"
		}
	, 
		"parentUserRDB" : {
			isParent : true,
			targetModelClassId : "UserRDB"
		}
	

	
		,
	
	
	
	}

}

Ext.extend(application.application.include.model.Chronos.NMUserRole, cwe.model.ModelClass);


application.application.include.model.Chronos.NMUserRole.prototype.getEditorItems = function() {
	return [
	
		 new Ext.form.TextField( {
			fieldLabel : "fk_role_id",
			name : "fk_role_id",
			dataIndex : "fk_role_id"
		})
	, 
		 new Ext.form.TextField( {
			fieldLabel : "fk_user_id",
			name : "fk_user_id",
			dataIndex : "fk_user_id"
		})
	, 
		 new Ext.form.TextField( {
			fieldLabel : "fk_userrdb_id",
			name : "fk_userrdb_id",
			dataIndex : "fk_userrdb_id"
		})
	, 
		 new Ext.form.TextField( {
			fieldLabel : "fk_rolerdb_id",
			name : "fk_rolerdb_id",
			dataIndex : "fk_rolerdb_id"
		})
	
	
	
		,
	
	
	
		
	
		new cwe.editor.control.SingleAssociate( {
	
		
			fieldLabel : "parentRoleRDB",
			name : "parentRoleRDB",
			dataIndex : "parentRoleRDB",
			targetCweModelElementId : "RoleRDB",
			isParent : true
		
	})

	, 
		
	
		new cwe.editor.control.SingleAssociate( {
	
		
			fieldLabel : "parentUserRDB",
			name : "parentUserRDB",
			dataIndex : "parentUserRDB",
			targetCweModelElementId : "UserRDB",
			isParent : true
		
	})

	
	
	
		,
	
	
	
 ];
}


cwe.model.ModelClassContainer.getInstance().registerClass(new application.application.include.model.Chronos.NMUserRole());
	