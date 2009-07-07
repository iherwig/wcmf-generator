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
Ext.namespace("cwm.requirements");

cwm.requirements.ChiGoal = function() {
	cwm.requirements.ChiGoal.superclass.constructor.call(this, arguments);
	
	this.cweModelElementId = "ChiGoal";
	this.name = "ChiGoal";
	this.treeIconClass = "ChiGoalTreeIcon16x16";
	this.owningPackageId = "cwm.requirements.Requirements";
	
	this.recordDefinition = [ {
		name : "oid",
		mapping : "oid"
	}, {
		name : "Name",
		mapping : "Name"
	}, {
		name : "Notes",
		mapping : "Notes"
	}, {
		name : "parentChiGoal",
		mapping : "parentChiGoal"
	}, {
		name : "childChiGoal",
		mapping : "childChiGoal"
	}, {
		name : "childChiRequirement",
		mapping : "childChiRequirement"
	} ];
	
	this.relations = {
		"parentChiGoal" : {
			isParent : true,
			targetModelClassId : "ChiGoal"
		},
		"childChiGoal" : {
			isParent : false,
			targetModelClassId : "ChiGoal"
		},
		"childChiRequirement" : {
			isParent : false,
			targetModelClassId : "ChiRequirement"
		}
	}
}

Ext.extend(cwm.requirements.ChiGoal, cwe.model.ModelClass);

cwm.requirements.ChiGoal.prototype.getEditorItems = function() {
	return [ new Ext.form.TextField( {
		fieldLabel : "Name",
		name : "Name",
		dataIndex : "Name"
	}), new Ext.form.TextField( {
		fieldLabel : "Notes",
		name : "Notes",
		dataIndex : "Notes"
	}), new cwe.editor.control.SingleAssociate( {
		fieldLabel : "parentChiGoal",
		name : "parentChiGoal",
		dataIndex : "parentChiGoal",
		targetCweModelElementId : "ChiGoal",
		isParent : true
	}), new cwe.editor.control.MultipleAssociate( {
		fieldLabel : "childChiGoal",
		name : "childChiGoal",
		dataIndex : "childChiGoal",
		targetCweModelElementId : "ChiGoal",
		isParent : false
	}), new cwe.editor.control.MultipleAssociate( {
		fieldLabel : "childChiRequirement",
		name : "childChiRequirement",
		dataIndex : "childChiRequirement",
		targetCweModelElementId : "ChiRequirement",
		isParent : false
	}) ];
}

cwe.model.ModelClassContainer.getInstance().registerClass(new cwm.requirements.ChiGoal());
