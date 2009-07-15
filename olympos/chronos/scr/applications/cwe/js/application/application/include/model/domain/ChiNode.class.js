
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

application.application.include.model.domain.ChiNode = function() {
	application.application.include.model.domain.ChiNode.superclass.constructor.call(this, arguments);
	
	this.cweModelElementId = "ChiNode";
	this.name = "ChiNode";
	this.treeIconClass = "ChiNodeTreeIcon16x16";
	this.owningPackageId = "application.application.include.model.domain.Domain_package";
	
	
	this.recordDefinition = [
	
		{
			name : "id",
			mapping : "id"
		}
	, 
		{
			name : "fk_package_id",
			mapping : "fk_package_id"
		}
	, 
		{
			name : "Association",
			mapping : "Association"
		}
	, 
		{
			name : "display_value",
			mapping : "display_value"
		}
	, 
		{
			name : "parent_order",
			mapping : "parent_order"
		}
	, 
		{
			name : "child_order",
			mapping : "child_order"
		}
	, 
		{
			name : "pk_name",
			mapping : "pk_name"
		}
	, 
		{
			name : "is_searchable",
			mapping : "is_searchable"
		}
	, 
		{
			name : "orderby",
			mapping : "orderby"
		}
	, 
		{
			name : "is_soap",
			mapping : "is_soap"
		}
	, 
		{
			name : "initparams",
			mapping : "initparams"
		}
	, 
		{
			name : "table_name",
			mapping : "table_name"
		}
	, 
		{
			name : "is_ordered",
			mapping : "is_ordered"
		}
	, 
		{
			name : "Alias",
			mapping : "Alias"
		}
	, 
		{
			name : "Version",
			mapping : "Version"
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
			name : "parentChiController",
			mapping: "parentChiController"
		}
	, 
		{
			name : "parentPackage",
			mapping: "parentPackage"
		}
	
	
	
		,
	
	
	
		{
			name : "childNMActivityChiNode",
			mapping : "childNMActivityChiNode"
		}
	, 
		{
			name : "childChiValue",
			mapping : "childChiValue"
		}
	, 
		{
			name : "childNodeTargetEnd",
			mapping : "childNodeTargetEnd"
		}
	, 
		{
			name : "childNodeSourceEnd",
			mapping : "childNodeSourceEnd"
		}
	, 
		{
			name : "childOperation",
			mapping : "childOperation"
		}
	, 
		{
			name : "childFigure",
			mapping : "childFigure"
		}
	
	];

	
	
	this.relations = {
	
		"parentChiController" : {
			isParent : true,
			targetModelClassId : "ChiController"
		}
	, 
		"parentPackage" : {
			isParent : true,
			targetModelClassId : "Package"
		}
	

	
		,
	
	
	
		"childNMActivityChiNode" : {
			isParent : false,
			targetModelClassId : "NMActivityChiNode"
		}
	, 
		"childChiValue" : {
			isParent : false,
			targetModelClassId : "ChiValue"
		}
	, 
		"childNodeTargetEnd" : {
			isParent : false,
			targetModelClassId : "NMChiNodeChiNode"
		}
	, 
		"childNodeSourceEnd" : {
			isParent : false,
			targetModelClassId : "NMChiNodeChiNode"
		}
	, 
		"childOperation" : {
			isParent : false,
			targetModelClassId : "Operation"
		}
	, 
		"childFigure" : {
			isParent : false,
			targetModelClassId : "Figure"
		}
	
	}

}

Ext.extend(application.application.include.model.domain.ChiNode, cwe.model.ModelClass);


application.application.include.model.domain.ChiNode.prototype.getEditorItems = function() {
	return [
	
		 new Ext.form.TextField( {
			fieldLabel : "id",
			name : "id",
			dataIndex : "id"
		})
	, 
		 new Ext.form.TextField( {
			fieldLabel : "fk_package_id",
			name : "fk_package_id",
			dataIndex : "fk_package_id"
		})
	, 
		 new Ext.form.TextField( {
			fieldLabel : "Association",
			name : "Association",
			dataIndex : "Association"
		})
	, 
		 new Ext.form.TextField( {
			fieldLabel : "display_value",
			name : "display_value",
			dataIndex : "display_value"
		})
	, 
		 new Ext.form.TextField( {
			fieldLabel : "parent_order",
			name : "parent_order",
			dataIndex : "parent_order"
		})
	, 
		 new Ext.form.TextField( {
			fieldLabel : "child_order",
			name : "child_order",
			dataIndex : "child_order"
		})
	, 
		 new Ext.form.TextField( {
			fieldLabel : "pk_name",
			name : "pk_name",
			dataIndex : "pk_name"
		})
	, 
		 new Ext.form.TextField( {
			fieldLabel : "is_searchable",
			name : "is_searchable",
			dataIndex : "is_searchable"
		})
	, 
		 new Ext.form.TextField( {
			fieldLabel : "orderby",
			name : "orderby",
			dataIndex : "orderby"
		})
	, 
		 new Ext.form.TextField( {
			fieldLabel : "is_soap",
			name : "is_soap",
			dataIndex : "is_soap"
		})
	, 
		 new Ext.form.TextField( {
			fieldLabel : "initparams",
			name : "initparams",
			dataIndex : "initparams"
		})
	, 
		 new Ext.form.TextField( {
			fieldLabel : "table_name",
			name : "table_name",
			dataIndex : "table_name"
		})
	, 
		 new Ext.form.TextField( {
			fieldLabel : "is_ordered",
			name : "is_ordered",
			dataIndex : "is_ordered"
		})
	, 
		 new Ext.form.TextField( {
			fieldLabel : "Alias",
			name : "Alias",
			dataIndex : "Alias"
		})
	, 
		 new Ext.form.TextField( {
			fieldLabel : "Version",
			name : "Version",
			dataIndex : "Version"
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
	
		
			fieldLabel : "parentChiController",
			name : "parentChiController",
			dataIndex : "parentChiController",
			targetCweModelElementId : "ChiController",
			isParent : true
		
	})

	, 
		
	
		new cwe.editor.control.SingleAssociate( {
	
		
			fieldLabel : "parentPackage",
			name : "parentPackage",
			dataIndex : "parentPackage",
			targetCweModelElementId : "Package",
			isParent : true
		
	})

	
	
	
		,
	
	
	
		
	
		new cwe.editor.control.MultipleAssociate( {
	
		
			fieldLabel : "childNMActivityChiNode",
			name : "childNMActivityChiNode",
			dataIndex : "childNMActivityChiNode",
			targetCweModelElementId : "NMActivityChiNode",
			isParent : false
		
	})

	, 
		
	
		new cwe.editor.control.MultipleAssociate( {
	
		
			fieldLabel : "childChiValue",
			name : "childChiValue",
			dataIndex : "childChiValue",
			targetCweModelElementId : "ChiValue",
			isParent : false
		
	})

	, 
		
	
		new cwe.editor.control.MultipleAssociate( {
	
		
			fieldLabel : "childNodeTargetEnd",
			name : "childNodeTargetEnd",
			dataIndex : "childNodeTargetEnd",
			targetCweModelElementId : "NMChiNodeChiNode",
			isParent : false
		
	})

	, 
		
	
		new cwe.editor.control.MultipleAssociate( {
	
		
			fieldLabel : "childNodeSourceEnd",
			name : "childNodeSourceEnd",
			dataIndex : "childNodeSourceEnd",
			targetCweModelElementId : "NMChiNodeChiNode",
			isParent : false
		
	})

	, 
		
	
		new cwe.editor.control.MultipleAssociate( {
	
		
			fieldLabel : "childOperation",
			name : "childOperation",
			dataIndex : "childOperation",
			targetCweModelElementId : "Operation",
			isParent : false
		
	})

	, 
		
	
		new cwe.editor.control.MultipleAssociate( {
	
		
			fieldLabel : "childFigure",
			name : "childFigure",
			dataIndex : "childFigure",
			targetCweModelElementId : "Figure",
			isParent : false
		
	})

	
 ];
}


cwe.model.ModelClassContainer.getInstance().registerClass(new application.application.include.model.domain.ChiNode());
	