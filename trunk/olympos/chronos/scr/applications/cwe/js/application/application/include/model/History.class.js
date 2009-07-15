
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
Ext.namespace("application.application.include.model");

application.application.include.model.History = function() {
	application.application.include.model.History.superclass.constructor.call(this, arguments);
	
	this.cweModelElementId = "History";
	this.name = "History";
	this.treeIconClass = "HistoryTreeIcon16x16";
	this.owningPackageId = "application.application.include.model.Model_package";
	
	
	this.recordDefinition = [
	
		{
			name : "id",
			mapping : "id"
		}
	, 
		{
			name : "data",
			mapping : "data"
		}
	, 
		{
			name : "duplicate",
			mapping : "duplicate"
		}
	, 
		{
			name : "eventtype",
			mapping : "eventtype"
		}
	, 
		{
			name : "affectedoid",
			mapping : "affectedoid"
		}
	, 
		{
			name : "otheroid",
			mapping : "otheroid"
		}
	, 
		{
			name : "timestamp",
			mapping : "timestamp"
		}
	, 
		{
			name : "user",
			mapping : "user"
		}
	
	
	
		,
	
	
	
	
	
	
	
	];

	
	
	this.relations = {
	

	
	
	
	}

}

Ext.extend(application.application.include.model.History, cwe.model.ModelClass);


application.application.include.model.History.prototype.getEditorItems = function() {
	return [
	
		 new Ext.form.TextField( {
			fieldLabel : "id",
			name : "id",
			dataIndex : "id"
		})
	, 
		 new Ext.form.TextField( {
			fieldLabel : "data",
			name : "data",
			dataIndex : "data"
		})
	, 
		 new Ext.form.TextField( {
			fieldLabel : "duplicate",
			name : "duplicate",
			dataIndex : "duplicate"
		})
	, 
		 new Ext.form.TextField( {
			fieldLabel : "eventtype",
			name : "eventtype",
			dataIndex : "eventtype"
		})
	, 
		 new Ext.form.TextField( {
			fieldLabel : "affectedoid",
			name : "affectedoid",
			dataIndex : "affectedoid"
		})
	, 
		 new Ext.form.TextField( {
			fieldLabel : "otheroid",
			name : "otheroid",
			dataIndex : "otheroid"
		})
	, 
		 new Ext.form.TextField( {
			fieldLabel : "timestamp",
			name : "timestamp",
			dataIndex : "timestamp"
		})
	, 
		 new Ext.form.TextField( {
			fieldLabel : "user",
			name : "user",
			dataIndex : "user"
		})
	
	
	
		,
	
	
	
	
	
	
	
 ];
}


cwe.model.ModelClassContainer.getInstance().registerClass(new application.application.include.model.History());
	