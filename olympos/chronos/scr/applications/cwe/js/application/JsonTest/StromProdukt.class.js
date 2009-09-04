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

application.JsonTest.StromProdukt = function() {
	application.JsonTest.StromProdukt.superclass.constructor.call(this, arguments);
	
	this.cweModelElementId = "com.ibm.eenergy.core.moma.objects.StromProdukt";
	this.name = "StromProdukt";
	this.treeIconClass = "StromProduktTreeIcon16x16";
	this.owningPackageId = "application.JsonTest.JsonTest_package";
	
	this.recordDefinition = [ {
	    name : "Erzeuger",
	    mapping : "Erzeuger"
	}, {
	    name : "MinAbnahmemenge",
	    mapping : "MinAbnahmemenge",
	    type : "float"
	}, {
	    name : "MaxAbnahmemenge",
	    mapping : "MaxAbnahmemenge",
	    type : "float"
	}, {
	    name : "Reservierung",
	    mapping : "Reservierung",
	    type : "boolean"
	}, {
	    name : "Gueltig_ab",
	    mapping : "Gueltig_ab",
	    type : "date"
	}, {
	    name : "Gueltig_bis",
	    mapping : "Gueltig_bis",
	    type : "date"
	}, {
	    name : "preisKomponente",
	    mapping : "preisKomponente"
	} ];
	
	this.relations = {
		"preisKomponente" : {
			targetModelClassId : "com.ibm.eenergy.core.moma.objects.Preis"
		}
	};
	
};

Ext.extend(application.JsonTest.StromProdukt, cwe.model.ModelClass);

application.JsonTest.StromProdukt.prototype.getGridColumns = function() {
	return [ {
	    header : "Erzeuger",
	    dataIndex : "Erzeuger",
	    width : 100,
	    sortable : true,
	    editor : new cwe.editor.control.TextField()
	}, {
	    header : "MinAbnahmemenge",
	    dataIndex : "MinAbnahmemenge",
	    width : 10,
	    sortable : true,
	    editor : new cwe.editor.control.NumberField()
	}, {
	    header : "MaxAbnahmemenge",
	    dataIndex : "MaxAbnahmemenge",
	    width : 100,
	    sortable : true,
	    editor : new cwe.editor.control.NumberField()
	}, {
	    header : "Reservierung",
	    dataIndex : "Reservierung",
	    width : 100,
	    sortable : true,
	    editor : new cwe.editor.control.Checkbox()
	}, {
	    header : "Gueltig_ab",
	    dataIndex : "Gueltig_ab",
	    width : 100,
	    sortable : true,
	    editor : new cwe.editor.control.DateField()
	}, {
	    header : "Gueltig_bis",
	    dataIndex : "Gueltig_bis",
	    width : 100,
	    sortable : true,
	    editor : new cwe.editor.control.DateField()
	} ];
};

application.JsonTest.StromProdukt.prototype.getEditorItems = function() {
	return [

	new cwe.editor.control.PropertiesFieldSet( {
		items : [ new cwe.editor.control.TextField( {
		    fieldLabel : "Erzeuger",
		    name : "Erzeuger",
		    dataIndex : "Erzeuger",
		    toolTip : ""
		}), new cwe.editor.control.NumberField( {
		    fieldLabel : "MinAbnahmemenge",
		    name : "MinAbnahmemenge",
		    dataIndex : "MinAbnahmemenge"
		}), new cwe.editor.control.NumberField( {
		    fieldLabel : "MaxAbnahmemenge",
		    name : "MaxAbnahmemenge",
		    dataIndex : "MaxAbnahmemenge"
		}), new cwe.editor.control.Checkbox( {
		    fieldLabel : "Reservierung",
		    name : "Reservierung",
		    dataIndex : "Reservierung",
		    toolTip : "the actual description of the object."
		}), new cwe.editor.control.DateField( {
		    fieldLabel : "Gueltig_ab",
		    name : "Gueltig_ab",
		    dataIndex : "Gueltig_ab"
		}), new cwe.editor.control.DateField( {
		    fieldLabel : "Gueltig_bis",
		    name : "Gueltig_bis",
		    dataIndex : "Gueltig_bis"
		}) ]
	}), new cwe.editor.control.AssociationsFieldSet( {
		items : [ new cwe.editor.control.SingleAssociate( {
		    fieldLabel : "preisKomponente",
		    name : "preisKomponente",
		    dataIndex : "preisKomponente",
		    targetCweModelElementId : "com.ibm.eenergy.core.moma.objects.Preis"
		}) ]
	}) ];
};

application.JsonTest.StromProdukt.prototype.getLabel = function(record) {
	return record.get("Erzeuger");
};

cwe.model.ModelClassContainer.getInstance().registerClass(new application.JsonTest.StromProdukt());
