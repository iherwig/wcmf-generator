
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
Ext.namespace("application.application.include.model.activity");

application.application.include.model.activity.NMActivityChiNode = function() {
	application.application.include.model.activity.NMActivityChiNode.superclass.constructor.call(this, arguments);
	
	this.cweModelElementId = "NMActivityChiNode";
	this.name = "NMActivityChiNode";
	this.treeIconClass = "NMActivityChiNodeTreeIcon16x16";
	this.owningPackageId = "application.application.include.model.activity.Activity_package";
	
	
	this.recordDefinition = [
	
		{
			name : "id",
			mapping : "id"
		}
	, 
		{
			name : "fk_chinode_id",
			mapping : "fk_chinode_id"
		}
	, 
		{
			name : "fk_activity_id",
			mapping : "fk_activity_id"
		}
	
	
	
		,
	
	
	
		{
			name : "parentActivity",
			mapping: "parentActivity"
		}
	, 
		{
			name : "parentChiNode",
			mapping: "parentChiNode"
		}
	
	
	
		,
	
	
	
	];

	
	
	this.relations = {
	
		"parentActivity" : {
			isParent : true,
			targetModelClassId : "Activity"
		}
	, 
		"parentChiNode" : {
			isParent : true,
			targetModelClassId : "ChiNode"
		}
	

	
		,
	
	
	
	}

}

Ext.extend(application.application.include.model.activity.NMActivityChiNode, cwe.model.ModelClass);


application.application.include.model.activity.NMActivityChiNode.prototype.getEditorItems = function() {
	return [
	
		 new Ext.form.TextField( {
			fieldLabel : "id",
			name : "id",
			dataIndex : "id"
		})
	, 
		 new Ext.form.TextField( {
			fieldLabel : "fk_chinode_id",
			name : "fk_chinode_id",
			dataIndex : "fk_chinode_id"
		})
	, 
		 new Ext.form.TextField( {
			fieldLabel : "fk_activity_id",
			name : "fk_activity_id",
			dataIndex : "fk_activity_id"
		})
	
	
	
		,
	
	
	
		
	
		new cwe.editor.control.SingleAssociate( {
	
		
			fieldLabel : "parentActivity",
			name : "parentActivity",
			dataIndex : "parentActivity",
			targetCweModelElementId : "Activity",
			isParent : true
		
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


cwe.model.ModelClassContainer.getInstance().registerClass(new application.application.include.model.activity.NMActivityChiNode());
	