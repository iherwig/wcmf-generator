
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

application.application.include.model.domain.NMChiNodeChiNode = function() {
	application.application.include.model.domain.NMChiNodeChiNode.superclass.constructor.call(this, arguments);
	
	this.cweModelElementId = "NMChiNodeChiNode";
	this.name = "NMChiNodeChiNode";
	this.treeIconClass = "NMChiNodeChiNodeTreeIcon16x16";
	this.owningPackageId = "application.application.include.model.domain.Domain_package";
	
	
	this.recordDefinition = [
	
		{
			name : "id",
			mapping : "id"
		}
	, 
		{
			name : "fk_chinodesource_id",
			mapping : "fk_chinodesource_id"
		}
	, 
		{
			name : "fk_chinodetarget_id",
			mapping : "fk_chinodetarget_id"
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
			name : "parentChiNodeTarget",
			mapping: "parentChiNodeTarget"
		}
	, 
		{
			name : "parentChiNodeSource",
			mapping: "parentChiNodeSource"
		}
	
	
	
		,
	
	
	
	];

	
	
	this.relations = {
	
		"parentChiNodeTarget" : {
			isParent : true,
			targetModelClassId : "ChiNode"
		}
	, 
		"parentChiNodeSource" : {
			isParent : true,
			targetModelClassId : "ChiNode"
		}
	

	
		,
	
	
	
	}

}

Ext.extend(application.application.include.model.domain.NMChiNodeChiNode, cwe.model.ModelClass);


application.application.include.model.domain.NMChiNodeChiNode.prototype.getEditorItems = function() {
	return [
	
		 new Ext.form.TextField( {
			fieldLabel : "id",
			name : "id",
			dataIndex : "id"
		})
	, 
		 new Ext.form.TextField( {
			fieldLabel : "fk_chinodesource_id",
			name : "fk_chinodesource_id",
			dataIndex : "fk_chinodesource_id"
		})
	, 
		 new Ext.form.TextField( {
			fieldLabel : "fk_chinodetarget_id",
			name : "fk_chinodetarget_id",
			dataIndex : "fk_chinodetarget_id"
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
	
		
			fieldLabel : "parentChiNodeTarget",
			name : "parentChiNodeTarget",
			dataIndex : "parentChiNodeTarget",
			targetCweModelElementId : "ChiNode",
			isParent : true
		
	})

	, 
		
	
		new cwe.editor.control.SingleAssociate( {
	
		
			fieldLabel : "parentChiNodeSource",
			name : "parentChiNodeSource",
			dataIndex : "parentChiNodeSource",
			targetCweModelElementId : "ChiNode",
			isParent : true
		
	})

	
	
	
		,
	
	
	
 ];
}


cwe.model.ModelClassContainer.getInstance().registerClass(new application.application.include.model.domain.NMChiNodeChiNode());
	