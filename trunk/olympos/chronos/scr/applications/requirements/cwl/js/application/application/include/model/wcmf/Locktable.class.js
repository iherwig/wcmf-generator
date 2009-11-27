
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
Ext.namespace("application.application.include.model.wcmf");

application.application.include.model.wcmf.Locktable = function() {
	application.application.include.model.wcmf.Locktable.superclass.constructor.call(this, arguments);
	
	this.chiModelElementId = "Locktable";
	this.name = "Locktable";
	this.treeIconClass = "LocktableTreeIcon16x16";
	this.owningPackageId = "application.application.include.model.wcmf.Wcmf_package";
	
	
	this.recordDefinition = [
	
		{
			name : "objectid",
			mapping : "objectid"
		}
	, 
		{
			name : "sessionid",
			mapping : "sessionid"
		}
	, 
		{
			name : "since",
			mapping : "since"
		}
	
	
	
		,
	
	
	
	
	
	
	
		{
			name : "userRDB",
			mapping : "userRDB"
		}
	
	];

	
	
	this.relations = {
	

	
	
	
		"userRDB" : {
			isParent : false,
			targetModelClassId : "UserRDB"
		}
	
	};

};

Ext.extend(application.application.include.model.wcmf.Locktable, chi.model.ModelClass);


application.application.include.model.wcmf.Locktable.prototype.getGridColumns = function() {
	return [
	
		
			{
			    header : "objectid",
			    dataIndex : "objectid",
			    width : 100,
			    sortable : true,
			    hidden: true,
			    editor: 
	
			new chi.modelgrid.DummyField()
	

			}
		, 
			{
			    header : "sessionid",
			    dataIndex : "sessionid",
			    width : 100,
			    sortable : true,
			    hidden: true,
			    editor: 
	
			new chi.modelgrid.DummyField()
	

			}
		, 
			{
			    header : "since",
			    dataIndex : "since",
			    width : 100,
			    sortable : true,
			    hidden: true,
			    editor: 
	
			new chi.modelgrid.DummyField()
	

			}
		
	
	];
};



application.application.include.model.wcmf.Locktable.prototype.getLabelColumns = function() {
	return [
	
		
	
	];
};



application.application.include.model.wcmf.Locktable.prototype.getEditorItems = function() {
	return [
	
		new chi.editor.control.PropertiesFieldSet({
			items: [
		
			
	
		
			new chi.editor.control.DisplayField({
		fieldLabel: "objectid",
		name: "objectid",
		dataIndex: "objectid",
		
		toolTip: ""
	}) 
	

		, 
			
	
		
			new chi.editor.control.DisplayField({
		fieldLabel: "sessionid",
		name: "sessionid",
		dataIndex: "sessionid",
		
		toolTip: ""
	}) 
	

		, 
			
	
		
			new chi.editor.control.DisplayField({
		fieldLabel: "since",
		name: "since",
		dataIndex: "since",
		
		toolTip: ""
	}) 
	

		
		]})
		
		
			,
		
	
	
	
		new chi.editor.control.AssociationsFieldSet({
			items: [
		
		
		
		
		
			
	
		new chi.editor.control.SingleAssociate( {
	
			fieldLabel : "userRDB",
			name : "userRDB",
			dataIndex : "userRDB",
			targetChiModelElementId : "UserRDB",
			isParent : false,
			aggregationKind : chi.Constants.AggregationKind.COMPOSITE
		
	})

		
		
		]})
	
 ];
};



/**
 * Returns the label of an object of this Model Class.
 * 
 * @param {chi.model.ModelRecord}
 *            record The record of this Model Class to extract the label from.
 * @return The label of an object of this Model Class.
 * @type String
 */
application.application.include.model.wcmf.Locktable.prototype.getLabel = function(record) {
	var label = record.get("");
	if (label == undefined || label.length == 0) {
		label = record.getOid(); 
	}
	return label;
};


chi.model.ModelClassContainer.getInstance().registerClass(new application.application.include.model.wcmf.Locktable());
	