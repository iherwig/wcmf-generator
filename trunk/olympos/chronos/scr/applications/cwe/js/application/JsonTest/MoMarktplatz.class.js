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
Ext.namespace("application.JsonTest");

application.JsonTest.MoMarktplatz = function() {
	application.JsonTest.MoMarktplatz.superclass.constructor.call(this, arguments);
	
	this.cweModelElementId = "com.ibm.eenergy.core.moma.objects.MoMarktplatz";
	this.name = "MoMarktplatz";
	this.treeIconClass = "MoMarktplatzTreeIcon16x16";
	this.owningPackageId = "application.JsonTest.JsonTest_package";
	
	this.recordDefinition = [ {
	    name : "Name",
	    mapping : "Name"
	}, {
	    name : "stromProdukt",
	    mapping : "stromProdukt"
	} ];
	
	this.relations = {
		"stromProdukt" : {
			targetModelClassId : "com.ibm.eenergy.core.moma.objects.StromProdukt"
		}
	};
	
};

Ext.extend(application.JsonTest.MoMarktplatz, cwe.model.ModelClass);

application.JsonTest.MoMarktplatz.prototype.getGridColumns = function() {
	return [ {
	    header : "Name",
	    dataIndex : "Name",
	    width : 100,
	    sortable : true,
	    editor : new cwe.editor.control.TextField()
	} ];
};

application.JsonTest.MoMarktplatz.prototype.getEditorItems = function() {
	return [

	new cwe.editor.control.PropertiesFieldSet( {
		items : [ new cwe.editor.control.TextField( {
		    fieldLabel : "Name",
		    name : "Name",
		    dataIndex : "Name",
		    toolTip : ""
		}) ]
	}), new cwe.editor.control.AssociationsFieldSet( {
		items : [ new cwe.editor.control.MultipleAssociate( {
		    fieldLabel : "stromProdukt",
		    name : "stromProdukt",
		    dataIndex : "stromProdukt",
		    targetCweModelElementId : "com.ibm.eenergy.core.moma.objects.StromProdukt"
		}) ]
	}) ];
};

application.JsonTest.MoMarktplatz.prototype.getLabel = function(record) {
	return record.get("Name");
};

cwe.model.ModelClassContainer.getInstance().registerClass(new application.JsonTest.MoMarktplatz());
