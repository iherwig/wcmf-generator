
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
	
	this.cweModelElementId = "Locktable";
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
			name : "parentUserRDB",
			mapping: "parentUserRDB"
		}
	
	
	
	
	
	];

	
	
	this.relations = {
	
		"parentUserRDB" : {
			isParent : true,
			targetModelClassId : "UserRDB"
		}
	

	
	
	
	};

};

Ext.extend(application.application.include.model.wcmf.Locktable, cwe.model.ModelClass);


application.application.include.model.wcmf.Locktable.prototype.getGridColumns = function() {
	return [
	
		
			{
			    header : "objectid",
			    dataIndex : "objectid",
			    width : 100,
			    sortable : true,
			    editor: 
	
		
			new cwe.modelgrid.DummyField()
					
	

			}
		, 
			{
			    header : "sessionid",
			    dataIndex : "sessionid",
			    width : 100,
			    sortable : true,
			    editor: 
	
		
			new cwe.editor.control.TextField({
				
			})
					
	

			}
		, 
			{
			    header : "since",
			    dataIndex : "since",
			    width : 100,
			    sortable : true,
			    editor: 
	
		
			new cwe.editor.control.TextField({
				
			})
					
	

			}
		
	
	];
};



application.application.include.model.wcmf.Locktable.prototype.getEditorItems = function() {
	return [
	
		new cwe.editor.control.PropertiesFieldSet({
			items: [
		
			
	new cwe.editor.control.TextField({
		fieldLabel: "objectid",
		name: "objectid",
		dataIndex: "objectid",
		
		
			
				readOnly: true,
			
		
		toolTip: ""
	}) 

		, 
			
	new cwe.editor.control.TextField({
		fieldLabel: "sessionid",
		name: "sessionid",
		dataIndex: "sessionid",
		
		
		toolTip: ""
	}) 

		, 
			
	new cwe.editor.control.TextField({
		fieldLabel: "since",
		name: "since",
		dataIndex: "since",
		
		
		toolTip: ""
	}) 

		
		]})
		
		
			,
		
	
	
	
		new cwe.editor.control.AssociationsFieldSet({
			items: [
		
			
	
		new cwe.editor.control.SingleAssociate( {
	
		
			fieldLabel : "parentUserRDB",
			name : "parentUserRDB",
			dataIndex : "parentUserRDB",
			targetCweModelElementId : "UserRDB",
			isParent : true
		
	})

		
		
		
		
		
		
		]})
	
 ];
};


cwe.model.ModelClassContainer.getInstance().registerClass(new application.application.include.model.wcmf.Locktable());
	