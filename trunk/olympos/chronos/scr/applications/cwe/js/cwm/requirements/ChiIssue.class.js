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

cwm.requirements.ChiIssue = function() {
	cwm.requirements.ChiIssue.superclass.constructor.call(this, arguments);
	
	this.cweModelElementId = "cwm.requirements.ChiIssue";
	this.name = "ChiIssue";
	this.treeIconClass = "ChiIssueTreeIcon16x16";
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
	    name : "ValueAmount",
	    mapping : "ValueAmount"
	} ];
}

Ext.extend(cwm.requirements.ChiIssue, cwe.model.ModelClass);

cwm.requirements.ChiIssue.prototype.getEditorItems = function() {
	return [ new Ext.form.TextField( {
	    fieldLabel : "Name",
	    name : "Name",
	    dataIndex : "Name"
	}), new Ext.form.TextField( {
	    fieldLabel : "Notes",
	    name : "Notes",
	    dataIndex : "Notes"
	}), new Ext.form.TextField( {
	    fieldLabel : "ValueAmount",
	    name : "ValueAmount",
	    dataIndex : "ValueAmount"
	}) ];
}

cwe.model.ModelClassContainer.getInstance().registerClass(new cwm.requirements.ChiIssue());
