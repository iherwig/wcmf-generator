
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
Ext.namespace("application.application.include.model.UseCases");

application.application.include.model.UseCases.ChiBusinessPartnerActive = function() {
	application.application.include.model.UseCases.ChiBusinessPartnerActive.superclass.constructor.call(this, arguments);
	
	this.cweModelElementId = "ChiBusinessPartnerActive";
	this.name = "ChiBusinessPartnerActive";
	this.treeIconClass = "ChiBusinessPartnerActiveTreeIcon16x16";
	this.owningPackageId = "application.application.include.model.UseCases.UseCases_package";
	
	
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
			name : "Generalization",
			mapping : "Generalization"
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
			name : "parentChiBusinessPartnerActive",
			mapping: "parentChiBusinessPartnerActive"
		}
	, 
		{
			name : "parentPackage",
			mapping: "parentPackage"
		}
	
	
	
		,
	
	
	
		{
			name : "childChiBusinessPartnerActive",
			mapping : "childChiBusinessPartnerActive"
		}
	, 
		{
			name : "childNMUCActor",
			mapping : "childNMUCActor"
		}
	, 
		{
			name : "childFigure",
			mapping : "childFigure"
		}
	
	];

	
	
	this.relations = {
	
		"parentChiBusinessPartnerActive" : {
			isParent : true,
			targetModelClassId : "ChiBusinessPartnerActive"
		}
	, 
		"parentPackage" : {
			isParent : true,
			targetModelClassId : "Package"
		}
	

	
		,
	
	
	
		"childChiBusinessPartnerActive" : {
			isParent : false,
			targetModelClassId : "ChiBusinessPartnerActive"
		}
	, 
		"childNMUCActor" : {
			isParent : false,
			targetModelClassId : "NMUCActor"
		}
	, 
		"childFigure" : {
			isParent : false,
			targetModelClassId : "Figure"
		}
	
	}

}

Ext.extend(application.application.include.model.UseCases.ChiBusinessPartnerActive, cwe.model.ModelClass);


application.application.include.model.UseCases.ChiBusinessPartnerActive.prototype.getEditorItems = function() {
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
			fieldLabel : "Generalization",
			name : "Generalization",
			dataIndex : "Generalization"
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
	
		
			fieldLabel : "parentChiBusinessPartnerActive",
			name : "parentChiBusinessPartnerActive",
			dataIndex : "parentChiBusinessPartnerActive",
			targetCweModelElementId : "ChiBusinessPartnerActive",
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
	
		
			fieldLabel : "childChiBusinessPartnerActive",
			name : "childChiBusinessPartnerActive",
			dataIndex : "childChiBusinessPartnerActive",
			targetCweModelElementId : "ChiBusinessPartnerActive",
			isParent : false
		
	})

	, 
		
	
		new cwe.editor.control.MultipleAssociate( {
	
		
			fieldLabel : "childNMUCActor",
			name : "childNMUCActor",
			dataIndex : "childNMUCActor",
			targetCweModelElementId : "NMUCActor",
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


cwe.model.ModelClassContainer.getInstance().registerClass(new application.application.include.model.UseCases.ChiBusinessPartnerActive());
	