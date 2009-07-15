
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

application.application.include.model.Model = function() {
	application.application.include.model.Model.superclass.constructor.call(this, arguments);
	
	this.cweModelElementId = "Model";
	this.name = "Model";
	this.treeIconClass = "ModelTreeIcon16x16";
	this.owningPackageId = "application.application.include.model.Model_package";
	
	
	this.recordDefinition = [
	
		{
			name : "id",
			mapping : "id"
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
			name : "childPackage",
			mapping : "childPackage"
		}
	
	];

	
	
	this.relations = {
	

	
	
	
		"childPackage" : {
			isParent : false,
			targetModelClassId : "Package"
		}
	
	}

}

Ext.extend(application.application.include.model.Model, cwe.model.ModelClass);


application.application.include.model.Model.prototype.getEditorItems = function() {
	return [
	
		 new Ext.form.TextField( {
			fieldLabel : "id",
			name : "id",
			dataIndex : "id"
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
	
	
	
	
	
	
	
		
	
		new cwe.editor.control.MultipleAssociate( {
	
		
			fieldLabel : "childPackage",
			name : "childPackage",
			dataIndex : "childPackage",
			targetCweModelElementId : "Package",
			isParent : false
		
	})

	
 ];
}


cwe.model.ModelClassContainer.getInstance().registerClass(new application.application.include.model.Model());
	