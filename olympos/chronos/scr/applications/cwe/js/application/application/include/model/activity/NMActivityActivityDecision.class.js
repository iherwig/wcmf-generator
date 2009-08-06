
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

application.application.include.model.activity.NMActivityActivityDecision = function() {
	application.application.include.model.activity.NMActivityActivityDecision.superclass.constructor.call(this, arguments);
	
	this.cweModelElementId = "NMActivityActivityDecision";
	this.name = "NMActivityActivityDecision";
	this.treeIconClass = "NMActivityActivityDecisionTreeIcon16x16";
	this.owningPackageId = "application.application.include.model.activity.Activity_package";
	
	
	this.recordDefinition = [
	
	
	
	
	
		{
			name : "parentActivity",
			mapping: "parentActivity"
		}
	, 
		{
			name : "parentActivityDecision",
			mapping: "parentActivityDecision"
		}
	
	
	
	
	
	];

	
	
	this.relations = {
	
		"parentActivity" : {
			isParent : true,
			targetModelClassId : "Activity"
		}
	, 
		"parentActivityDecision" : {
			isParent : true,
			targetModelClassId : "ActivityDecision"
		}
	

	
	
	
	};

};

Ext.extend(application.application.include.model.activity.NMActivityActivityDecision, cwe.model.ModelClass);


application.application.include.model.activity.NMActivityActivityDecision.prototype.getGridColumns = function() {
	return [
	
	];
};



application.application.include.model.activity.NMActivityActivityDecision.prototype.getEditorItems = function() {
	return [
	
	
	
		new cwe.editor.control.AssociationsFieldSet({
			items: [
		
			
	
		new cwe.editor.control.SingleAssociate( {
	
		
			fieldLabel : "parentActivity",
			name : "parentActivity",
			dataIndex : "parentActivity",
			targetCweModelElementId : "Activity",
			isParent : true
		
	})

		, 
			
	
		new cwe.editor.control.SingleAssociate( {
	
		
			fieldLabel : "parentActivityDecision",
			name : "parentActivityDecision",
			dataIndex : "parentActivityDecision",
			targetCweModelElementId : "ActivityDecision",
			isParent : true
		
	})

		
		
		
		
		
		
		]})
	
 ];
};


cwe.model.ModelClassContainer.getInstance().registerClass(new application.application.include.model.activity.NMActivityActivityDecision());
	