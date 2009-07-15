
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
Ext.namespace("application.application.include.model.domain");

application.application.include.model.domain.Operation = function() {
	application.application.include.model.domain.Operation.superclass.constructor.call(this, arguments);
	
	this.cweModelElementId = "Operation";
	this.name = "Operation";
	this.treeIconClass = "OperationTreeIcon16x16";
	this.owningPackageId = "application.application.include.model.domain.Domain_package";
	
	
	this.recordDefinition = [
	
		{
			name : "id",
			mapping : "id"
		}
	, 
		{
			name : "Composition",
			mapping : "Composition"
		}
	, 
		{
			name : "ReturnType",
			mapping : "ReturnType"
		}
	, 
		{
			name : "Parameters",
			mapping : "Parameters"
		}
	, 
		{
			name : "Name",
			mapping : "Name"
		}
	, 
		{
			name : "Notes",
			mapping : "Notes"
		}
	, 
		{
			name : "created",
			mapping : "created"
		}
	, 
		{
			name : "creator",
			mapping : "creator"
		}
	, 
		{
			name : "last_editor",
			mapping : "last_editor"
		}
	, 
		{
			name : "modified",
			mapping : "modified"
		}
	
	
	
		,
	
	
	
		{
			name : "parentChiNode",
			mapping: "parentChiNode"
		}
	
	
	
		,
	
	
	
	];

	
	
	this.relations = {
	
		"parentChiNode" : {
			isParent : true,
			targetModelClassId : "ChiNode"
		}
	

	
		,
	
	
	
	}

}

Ext.extend(application.application.include.model.domain.Operation, cwe.model.ModelClass);


application.application.include.model.domain.Operation.prototype.getEditorItems = function() {
	return [
	
		 new Ext.form.TextField( {
			fieldLabel : "id",
			name : "id",
			dataIndex : "id"
		})
	, 
		 new Ext.form.TextField( {
			fieldLabel : "Composition",
			name : "Composition",
			dataIndex : "Composition"
		})
	, 
		 new Ext.form.TextField( {
			fieldLabel : "ReturnType",
			name : "ReturnType",
			dataIndex : "ReturnType"
		})
	, 
		 new Ext.form.TextField( {
			fieldLabel : "Parameters",
			name : "Parameters",
			dataIndex : "Parameters"
		})
	, 
		 new Ext.form.TextField( {
			fieldLabel : "Name",
			name : "Name",
			dataIndex : "Name"
		})
	, 
		 new Ext.form.TextField( {
			fieldLabel : "Notes",
			name : "Notes",
			dataIndex : "Notes"
		})
	, 
		 new Ext.form.TextField( {
			fieldLabel : "created",
			name : "created",
			dataIndex : "created"
		})
	, 
		 new Ext.form.TextField( {
			fieldLabel : "creator",
			name : "creator",
			dataIndex : "creator"
		})
	, 
		 new Ext.form.TextField( {
			fieldLabel : "last_editor",
			name : "last_editor",
			dataIndex : "last_editor"
		})
	, 
		 new Ext.form.TextField( {
			fieldLabel : "modified",
			name : "modified",
			dataIndex : "modified"
		})
	
	
	
		,
	
	
	
		
	
		new cwe.editor.control.SingleAssociate( {
	
		
			fieldLabel : "parentChiNode",
			name : "parentChiNode",
			dataIndex : "parentChiNode",
			targetCweModelElementId : "ChiNode",
			isParent : true
		
	})

	
	
	
		,
	
	
	
 ];
}


cwe.model.ModelClassContainer.getInstance().registerClass(new application.application.include.model.domain.Operation());
	