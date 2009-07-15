
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

application.application.include.model.Chronos.Locktable = function() {
	application.application.include.model.Chronos.Locktable.superclass.constructor.call(this, arguments);
	
	this.cweModelElementId = "Locktable";
	this.name = "Locktable";
	this.treeIconClass = "LocktableTreeIcon16x16";
	this.owningPackageId = "application.application.include.model.Chronos.Chronos_package";
	
	
	this.recordDefinition = [
	
		{
			name : "id",
			mapping : "id"
		}
	, 
		{
			name : "fk_userrdb_id",
			mapping : "fk_userrdb_id"
		}
	, 
		{
			name : "objectid",
			mapping : "objectid"
		}
	, 
		{
			name : "sessionid",
			mapping : "sessionid"
		}
	, 
		{
			name : "since",
			mapping : "since"
		}
	
	
	
		,
	
	
	
		{
			name : "parentUserRDB",
			mapping: "parentUserRDB"
		}
	
	
	
		,
	
	
	
	];

	
	
	this.relations = {
	
		"parentUserRDB" : {
			isParent : true,
			targetModelClassId : "UserRDB"
		}
	

	
		,
	
	
	
	}

}

Ext.extend(application.application.include.model.Chronos.Locktable, cwe.model.ModelClass);


application.application.include.model.Chronos.Locktable.prototype.getEditorItems = function() {
	return [
	
		 new Ext.form.TextField( {
			fieldLabel : "id",
			name : "id",
			dataIndex : "id"
		})
	, 
		 new Ext.form.TextField( {
			fieldLabel : "fk_userrdb_id",
			name : "fk_userrdb_id",
			dataIndex : "fk_userrdb_id"
		})
	, 
		 new Ext.form.TextField( {
			fieldLabel : "objectid",
			name : "objectid",
			dataIndex : "objectid"
		})
	, 
		 new Ext.form.TextField( {
			fieldLabel : "sessionid",
			name : "sessionid",
			dataIndex : "sessionid"
		})
	, 
		 new Ext.form.TextField( {
			fieldLabel : "since",
			name : "since",
			dataIndex : "since"
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


cwe.model.ModelClassContainer.getInstance().registerClass(new application.application.include.model.Chronos.Locktable());
	