
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

application.application.include.model.activity.NMActivityChiObject = function() {
	application.application.include.model.activity.NMActivityChiObject.superclass.constructor.call(this, arguments);
	
	this.cweModelElementId = "NMActivityChiObject";
	this.name = "NMActivityChiObject";
	this.treeIconClass = "NMActivityChiObjectTreeIcon16x16";
	this.owningPackageId = "application.application.include.model.activity.Activity_package";
	
	
	this.recordDefinition = [
	
	
	
	
	
		{
			name : "parentChiObject",
			mapping: "parentChiObject"
		}
	, 
		{
			name : "parentActivity",
			mapping: "parentActivity"
		}
	
	
	
	
	
	];

	
	
	this.relations = {
	
		"parentChiObject" : {
			isParent : true,
			targetModelClassId : "ChiObject"
		}
	, 
		"parentActivity" : {
			isParent : true,
			targetModelClassId : "Activity"
		}
	

	
	
	
	};

};

Ext.extend(application.application.include.model.activity.NMActivityChiObject, cwe.model.ModelClass);


application.application.include.model.activity.NMActivityChiObject.prototype.getGridColumns = function() {
	return [
	
	];
};



application.application.include.model.activity.NMActivityChiObject.prototype.getEditorItems = function() {
	return [
	
	
	
		new cwe.editor.control.AssociationsFieldSet({
			items: [
		
			
	
		new cwe.editor.control.SingleAssociate( {
	
		
			fieldLabel : "parentChiObject",
			name : "parentChiObject",
			dataIndex : "parentChiObject",
			targetCweModelElementId : "ChiObject",
			isParent : true
		
	})

		, 
			
	
		new cwe.editor.control.SingleAssociate( {
	
		
			fieldLabel : "parentActivity",
			name : "parentActivity",
			dataIndex : "parentActivity",
			targetCweModelElementId : "Activity",
			isParent : true
		
	})

		
		
		
		
		
		
		]})
	
 ];
};


cwe.model.ModelClassContainer.getInstance().registerClass(new application.application.include.model.activity.NMActivityChiObject());
	