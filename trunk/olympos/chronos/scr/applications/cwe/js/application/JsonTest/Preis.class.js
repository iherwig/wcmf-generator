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

application.JsonTest.Preis = function() {
	application.JsonTest.Preis.superclass.constructor.call(this, arguments);
	
	this.cweModelElementId = "com.ibm.eenergy.core.moma.objects.Preis";
	this.name = "Preis";
	this.treeIconClass = "PreisTreeIcon16x16";
	this.owningPackageId = "application.JsonTest.JsonTest_package";
	
	this.recordDefinition = [ {
	    name : "Preis",
	    mapping : "Preis",
	    type : "float"
	}, {
	    name : "MinAbnahmePoenale",
	    mapping : "MinAbnahmePoenale",
	    type : "float"
	}, {
	    name : "MaxAbnahmePoenale",
	    mapping : "MaxAbnahmePoenale",
	    type : "float"
	}, {
	    name : "stromprodukt",
	    mapping : "stromprodukt"
	} ];
	
	this.relations = {
		"stromprodukt" : {
			targetModelClassId : "com.ibm.eenergy.core.moma.objects.StromProdukt"
		}
	};
	
};

Ext.extend(application.JsonTest.Preis, cwe.model.ModelClass);

application.JsonTest.Preis.prototype.getGridColumns = function() {
	return [ {
	    header : "Preis",
	    dataIndex : "Preis",
	    width : 10,
	    sortable : true,
	    editor : new cwe.editor.control.NumberField()
	}, {
	    header : "MinAbnahmePoenale",
	    dataIndex : "MinAbnahmePoenale",
	    width : 10,
	    sortable : true,
	    editor : new cwe.editor.control.NumberField()
	}, {
	    header : "MaxAbnahmePoenale",
	    dataIndex : "MaxAbnahmePoenale",
	    width : 100,
	    sortable : true,
	    editor : new cwe.editor.control.NumberField()
	} ];
};

application.JsonTest.Preis.prototype.getEditorItems = function() {
	return [

	new cwe.editor.control.PropertiesFieldSet( {
		items : [ new cwe.editor.control.NumberField( {
		    fieldLabel : "Preis",
		    name : "Preis",
		    dataIndex : "Preis"
		}), new cwe.editor.control.NumberField( {
		    fieldLabel : "MinAbnahmePoenale",
		    name : "MinAbnahmePoenale",
		    dataIndex : "MinAbnahmePoenale"
		}), new cwe.editor.control.NumberField( {
		    fieldLabel : "MaxAbnahmePoenale",
		    name : "MaxAbnahmePoenale",
		    dataIndex : "MaxAbnahmePoenale"
		}) ]
	}), new cwe.editor.control.AssociationsFieldSet( {
		items : [ new cwe.editor.control.SingleAssociate( {
		    fieldLabel : "stromprodukt",
		    name : "stromprodukt",
		    dataIndex : "stromprodukt",
		    targetCweModelElementId : "com.ibm.eenergy.core.moma.objects.StromProdukt"
		}) ]
	}) ];
};

application.JsonTest.Preis.prototype.getLabel = function(record) {
	return record.get("Preis");
};

cwe.model.ModelClassContainer.getInstance().registerClass(new application.JsonTest.Preis());
