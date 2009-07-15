
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

application.application.include.model.domain.NMChiControllerChiController = function() {
	application.application.include.model.domain.NMChiControllerChiController.superclass.constructor.call(this, arguments);
	
	this.cweModelElementId = "NMChiControllerChiController";
	this.name = "NMChiControllerChiController";
	this.treeIconClass = "NMChiControllerChiControllerTreeIcon16x16";
	this.owningPackageId = "application.application.include.model.domain.Domain_package";
	
	
	this.recordDefinition = [
	
		{
			name : "id",
			mapping : "id"
		}
	, 
		{
			name : "fk_chicontrollersource_id",
			mapping : "fk_chicontrollersource_id"
		}
	, 
		{
			name : "fk_chicontrollertarget_id",
			mapping : "fk_chicontrollertarget_id"
		}
	, 
		{
			name : "sourceMultiplicity",
			mapping : "sourceMultiplicity"
		}
	, 
		{
			name : "sourceNavigability",
			mapping : "sourceNavigability"
		}
	, 
		{
			name : "targetMultiplicity",
			mapping : "targetMultiplicity"
		}
	, 
		{
			name : "targetNavigability",
			mapping : "targetNavigability"
		}
	, 
		{
			name : "relationType",
			mapping : "relationType"
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
			name : "parentChiControllerTarget",
			mapping: "parentChiControllerTarget"
		}
	, 
		{
			name : "parentChiControllerSource",
			mapping: "parentChiControllerSource"
		}
	
	
	
		,
	
	
	
	];

	
	
	this.relations = {
	
		"parentChiControllerTarget" : {
			isParent : true,
			targetModelClassId : "ChiController"
		}
	, 
		"parentChiControllerSource" : {
			isParent : true,
			targetModelClassId : "ChiController"
		}
	

	
		,
	
	
	
	}

}

Ext.extend(application.application.include.model.domain.NMChiControllerChiController, cwe.model.ModelClass);


application.application.include.model.domain.NMChiControllerChiController.prototype.getEditorItems = function() {
	return [
	
		 new Ext.form.TextField( {
			fieldLabel : "id",
			name : "id",
			dataIndex : "id"
		})
	, 
		 new Ext.form.TextField( {
			fieldLabel : "fk_chicontrollersource_id",
			name : "fk_chicontrollersource_id",
			dataIndex : "fk_chicontrollersource_id"
		})
	, 
		 new Ext.form.TextField( {
			fieldLabel : "fk_chicontrollertarget_id",
			name : "fk_chicontrollertarget_id",
			dataIndex : "fk_chicontrollertarget_id"
		})
	, 
		 new Ext.form.TextField( {
			fieldLabel : "sourceMultiplicity",
			name : "sourceMultiplicity",
			dataIndex : "sourceMultiplicity"
		})
	, 
		 new Ext.form.TextField( {
			fieldLabel : "sourceNavigability",
			name : "sourceNavigability",
			dataIndex : "sourceNavigability"
		})
	, 
		 new Ext.form.TextField( {
			fieldLabel : "targetMultiplicity",
			name : "targetMultiplicity",
			dataIndex : "targetMultiplicity"
		})
	, 
		 new Ext.form.TextField( {
			fieldLabel : "targetNavigability",
			name : "targetNavigability",
			dataIndex : "targetNavigability"
		})
	, 
		 new Ext.form.TextField( {
			fieldLabel : "relationType",
			name : "relationType",
			dataIndex : "relationType"
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
	
		
			fieldLabel : "parentChiControllerTarget",
			name : "parentChiControllerTarget",
			dataIndex : "parentChiControllerTarget",
			targetCweModelElementId : "ChiController",
			isParent : true
		
	})

	, 
		
	
		new cwe.editor.control.SingleAssociate( {
	
		
			fieldLabel : "parentChiControllerSource",
			name : "parentChiControllerSource",
			dataIndex : "parentChiControllerSource",
			targetCweModelElementId : "ChiController",
			isParent : true
		
	})

	
	
	
		,
	
	
	
 ];
}


cwe.model.ModelClassContainer.getInstance().registerClass(new application.application.include.model.domain.NMChiControllerChiController());
	