
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

application.application.include.model.wcmf.NMUserRole = function() {
	application.application.include.model.wcmf.NMUserRole.superclass.constructor.call(this, arguments);
	
	this.cweModelElementId = "NMUserRole";
	this.name = "NMUserRole";
	this.treeIconClass = "NMUserRoleTreeIcon16x16";
	this.owningPackageId = "application.application.include.model.wcmf.Wcmf_package";
	
	
	this.recordDefinition = [
	
	
	
	
	
		{
			name : "parentRoleRDB",
			mapping: "parentRoleRDB"
		}
	, 
		{
			name : "parentUserRDB",
			mapping: "parentUserRDB"
		}
	
	
	
	
	
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
	

	
	
	
	};

};

Ext.extend(application.application.include.model.wcmf.NMUserRole, cwe.model.ModelClass);


application.application.include.model.wcmf.NMUserRole.prototype.getGridColumns = function() {
	return [
	
	];
};



application.application.include.model.wcmf.NMUserRole.prototype.getEditorItems = function() {
	return [
	
	
	
		new cwe.editor.control.AssociationsFieldSet({
			items: [
		
			
	
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

		
		
		
		
		
		
		]})
	
 ];
};


cwe.model.ModelClassContainer.getInstance().registerClass(new application.application.include.model.wcmf.NMUserRole());
	