
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
Ext.namespace("application.application.include.model.requirements");

application.application.include.model.requirements.ChiFeature = function() {
	application.application.include.model.requirements.ChiFeature.superclass.constructor.call(this, arguments);
	
	this.cweModelElementId = "ChiFeature";
	this.name = "ChiFeature";
	this.treeIconClass = "ChiFeatureTreeIcon16x16";
	this.owningPackageId = "application.application.include.model.requirements.Requirements_package";
	
	
	this.recordDefinition = [
	
		{
			name : "id",
			mapping : "id"
		}
	, 
		{
			name : "fk_package_id",
			mapping : "fk_package_id"
		}
	, 
		{
			name : "Author",
			mapping : "Author"
		}
	, 
		{
			name : "Proofreader",
			mapping : "Proofreader"
		}
	, 
		{
			name : "Status",
			mapping : "Status"
		}
	, 
		{
			name : "Alias",
			mapping : "Alias"
		}
	, 
		{
			name : "Version",
			mapping : "Version"
		}
	, 
		{
			name : "Name",
			mapping : "Name"
		}
	, 
		{
			name : "Notes",
			mapping : "Notes"
		}
	, 
		{
			name : "created",
			mapping : "created"
		}
	, 
		{
			name : "creator",
			mapping : "creator"
		}
	, 
		{
			name : "last_editor",
			mapping : "last_editor"
		}
	, 
		{
			name : "modified",
			mapping : "modified"
		}
	
	
	
		,
	
	
	
		{
			name : "parentPackage",
			mapping: "parentPackage"
		}
	
	
	
		,
	
	
	
		{
			name : "childChiBusinessUseCase",
			mapping : "childChiBusinessUseCase"
		}
	, 
		{
			name : "childNMFeatureRequirements",
			mapping : "childNMFeatureRequirements"
		}
	, 
		{
			name : "childChiBusinessUseCaseCore",
			mapping : "childChiBusinessUseCaseCore"
		}
	, 
		{
			name : "childFigure",
			mapping : "childFigure"
		}
	
	];

	
	
	this.relations = {
	
		"parentPackage" : {
			isParent : true,
			targetModelClassId : "Package"
		}
	

	
		,
	
	
	
		"childChiBusinessUseCase" : {
			isParent : false,
			targetModelClassId : "ChiBusinessUseCase"
		}
	, 
		"childNMFeatureRequirements" : {
			isParent : false,
			targetModelClassId : "NMFeatureRequirements"
		}
	, 
		"childChiBusinessUseCaseCore" : {
			isParent : false,
			targetModelClassId : "ChiBusinessUseCaseCore"
		}
	, 
		"childFigure" : {
			isParent : false,
			targetModelClassId : "Figure"
		}
	
	}

}

Ext.extend(application.application.include.model.requirements.ChiFeature, cwe.model.ModelClass);


application.application.include.model.requirements.ChiFeature.prototype.getEditorItems = function() {
	return [
	
		 new Ext.form.TextField( {
			fieldLabel : "id",
			name : "id",
			dataIndex : "id"
		})
	, 
		 new Ext.form.TextField( {
			fieldLabel : "fk_package_id",
			name : "fk_package_id",
			dataIndex : "fk_package_id"
		})
	, 
		 new Ext.form.TextField( {
			fieldLabel : "Author",
			name : "Author",
			dataIndex : "Author"
		})
	, 
		 new Ext.form.TextField( {
			fieldLabel : "Proofreader",
			name : "Proofreader",
			dataIndex : "Proofreader"
		})
	, 
		 new Ext.form.TextField( {
			fieldLabel : "Status",
			name : "Status",
			dataIndex : "Status"
		})
	, 
		 new Ext.form.TextField( {
			fieldLabel : "Alias",
			name : "Alias",
			dataIndex : "Alias"
		})
	, 
		 new Ext.form.TextField( {
			fieldLabel : "Version",
			name : "Version",
			dataIndex : "Version"
		})
	, 
		 new Ext.form.TextField( {
			fieldLabel : "Name",
			name : "Name",
			dataIndex : "Name"
		})
	, 
		 new Ext.form.TextField( {
			fieldLabel : "Notes",
			name : "Notes",
			dataIndex : "Notes"
		})
	, 
		 new Ext.form.TextField( {
			fieldLabel : "created",
			name : "created",
			dataIndex : "created"
		})
	, 
		 new Ext.form.TextField( {
			fieldLabel : "creator",
			name : "creator",
			dataIndex : "creator"
		})
	, 
		 new Ext.form.TextField( {
			fieldLabel : "last_editor",
			name : "last_editor",
			dataIndex : "last_editor"
		})
	, 
		 new Ext.form.TextField( {
			fieldLabel : "modified",
			name : "modified",
			dataIndex : "modified"
		})
	
	
	
		,
	
	
	
		
	
		new cwe.editor.control.SingleAssociate( {
	
		
			fieldLabel : "parentPackage",
			name : "parentPackage",
			dataIndex : "parentPackage",
			targetCweModelElementId : "Package",
			isParent : true
		
	})

	
	
	
		,
	
	
	
		
	
		new cwe.editor.control.MultipleAssociate( {
	
		
			fieldLabel : "childChiBusinessUseCase",
			name : "childChiBusinessUseCase",
			dataIndex : "childChiBusinessUseCase",
			targetCweModelElementId : "ChiBusinessUseCase",
			isParent : false
		
	})

	, 
		
	
		new cwe.editor.control.MultipleAssociate( {
	
		
			fieldLabel : "childNMFeatureRequirements",
			name : "childNMFeatureRequirements",
			dataIndex : "childNMFeatureRequirements",
			targetCweModelElementId : "NMFeatureRequirements",
			isParent : false
		
	})

	, 
		
	
		new cwe.editor.control.MultipleAssociate( {
	
		
			fieldLabel : "childChiBusinessUseCaseCore",
			name : "childChiBusinessUseCaseCore",
			dataIndex : "childChiBusinessUseCaseCore",
			targetCweModelElementId : "ChiBusinessUseCaseCore",
			isParent : false
		
	})

	, 
		
	
		new cwe.editor.control.MultipleAssociate( {
	
		
			fieldLabel : "childFigure",
			name : "childFigure",
			dataIndex : "childFigure",
			targetCweModelElementId : "Figure",
			isParent : false
		
	})

	
 ];
}


cwe.model.ModelClassContainer.getInstance().registerClass(new application.application.include.model.requirements.ChiFeature());
	