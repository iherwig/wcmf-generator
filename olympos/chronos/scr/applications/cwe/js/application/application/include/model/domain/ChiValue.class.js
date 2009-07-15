
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

application.application.include.model.domain.ChiValue = function() {
	application.application.include.model.domain.ChiValue.superclass.constructor.call(this, arguments);
	
	this.cweModelElementId = "ChiValue";
	this.name = "ChiValue";
	this.treeIconClass = "ChiValueTreeIcon16x16";
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
			name : "display_type",
			mapping : "display_type"
		}
	, 
		{
			name : "restrictions_description",
			mapping : "restrictions_description"
		}
	, 
		{
			name : "restrictions_match",
			mapping : "restrictions_match"
		}
	, 
		{
			name : "restrictions_not_match",
			mapping : "restrictions_not_match"
		}
	, 
		{
			name : "input_type",
			mapping : "input_type"
		}
	, 
		{
			name : "app_data_type",
			mapping : "app_data_type"
		}
	, 
		{
			name : "db_data_type",
			mapping : "db_data_type"
		}
	, 
		{
			name : "is_editable",
			mapping : "is_editable"
		}
	, 
		{
			name : "column_name",
			mapping : "column_name"
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

Ext.extend(application.application.include.model.domain.ChiValue, cwe.model.ModelClass);


application.application.include.model.domain.ChiValue.prototype.getEditorItems = function() {
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
			fieldLabel : "display_type",
			name : "display_type",
			dataIndex : "display_type"
		})
	, 
		 new Ext.form.TextField( {
			fieldLabel : "restrictions_description",
			name : "restrictions_description",
			dataIndex : "restrictions_description"
		})
	, 
		 new Ext.form.TextField( {
			fieldLabel : "restrictions_match",
			name : "restrictions_match",
			dataIndex : "restrictions_match"
		})
	, 
		 new Ext.form.TextField( {
			fieldLabel : "restrictions_not_match",
			name : "restrictions_not_match",
			dataIndex : "restrictions_not_match"
		})
	, 
		 new Ext.form.TextField( {
			fieldLabel : "input_type",
			name : "input_type",
			dataIndex : "input_type"
		})
	, 
		 new Ext.form.TextField( {
			fieldLabel : "app_data_type",
			name : "app_data_type",
			dataIndex : "app_data_type"
		})
	, 
		 new Ext.form.TextField( {
			fieldLabel : "db_data_type",
			name : "db_data_type",
			dataIndex : "db_data_type"
		})
	, 
		 new Ext.form.TextField( {
			fieldLabel : "is_editable",
			name : "is_editable",
			dataIndex : "is_editable"
		})
	, 
		 new Ext.form.TextField( {
			fieldLabel : "column_name",
			name : "column_name",
			dataIndex : "column_name"
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


cwe.model.ModelClassContainer.getInstance().registerClass(new application.application.include.model.domain.ChiValue());
	