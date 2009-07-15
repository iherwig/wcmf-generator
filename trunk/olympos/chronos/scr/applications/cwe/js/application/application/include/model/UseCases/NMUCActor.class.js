
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
Ext.namespace("application.application.include.model.UseCases");

application.application.include.model.UseCases.NMUCActor = function() {
	application.application.include.model.UseCases.NMUCActor.superclass.constructor.call(this, arguments);
	
	this.cweModelElementId = "NMUCActor";
	this.name = "NMUCActor";
	this.treeIconClass = "NMUCActorTreeIcon16x16";
	this.owningPackageId = "application.application.include.model.UseCases.UseCases_package";
	
	
	this.recordDefinition = [
	
		{
			name : "id",
			mapping : "id"
		}
	, 
		{
			name : "fk_chibusinessusecasecore_id",
			mapping : "fk_chibusinessusecasecore_id"
		}
	, 
		{
			name : "fk_chiworkerexternal_id",
			mapping : "fk_chiworkerexternal_id"
		}
	, 
		{
			name : "fk_chiworkerinternal_id",
			mapping : "fk_chiworkerinternal_id"
		}
	, 
		{
			name : "fk_chiworker_id",
			mapping : "fk_chiworker_id"
		}
	, 
		{
			name : "fk_chibusinesspartneractive_id",
			mapping : "fk_chibusinesspartneractive_id"
		}
	, 
		{
			name : "fk_chibusinesspartnerpassive_id",
			mapping : "fk_chibusinesspartnerpassive_id"
		}
	, 
		{
			name : "fk_chibusinesspartner_id",
			mapping : "fk_chibusinesspartner_id"
		}
	, 
		{
			name : "Association",
			mapping : "Association"
		}
	
	
	
		,
	
	
	
		{
			name : "parentChiBusinessUseCase",
			mapping: "parentChiBusinessUseCase"
		}
	, 
		{
			name : "parentActor",
			mapping: "parentActor"
		}
	, 
		{
			name : "parentChiBusinessPartner",
			mapping: "parentChiBusinessPartner"
		}
	, 
		{
			name : "parentChiBusinessPartnerPassive",
			mapping: "parentChiBusinessPartnerPassive"
		}
	, 
		{
			name : "parentChiBusinessPartnerActive",
			mapping: "parentChiBusinessPartnerActive"
		}
	, 
		{
			name : "parentChiWorker",
			mapping: "parentChiWorker"
		}
	, 
		{
			name : "parentChiWorkerInternal",
			mapping: "parentChiWorkerInternal"
		}
	, 
		{
			name : "parentChiWorkerExternal",
			mapping: "parentChiWorkerExternal"
		}
	, 
		{
			name : "parentChiBusinessUseCaseCore",
			mapping: "parentChiBusinessUseCaseCore"
		}
	
	
	
		,
	
	
	
	];

	
	
	this.relations = {
	
		"parentChiBusinessUseCase" : {
			isParent : true,
			targetModelClassId : "ChiBusinessUseCase"
		}
	, 
		"parentActor" : {
			isParent : true,
			targetModelClassId : "Actor"
		}
	, 
		"parentChiBusinessPartner" : {
			isParent : true,
			targetModelClassId : "ChiBusinessPartner"
		}
	, 
		"parentChiBusinessPartnerPassive" : {
			isParent : true,
			targetModelClassId : "ChiBusinessPartnerPassive"
		}
	, 
		"parentChiBusinessPartnerActive" : {
			isParent : true,
			targetModelClassId : "ChiBusinessPartnerActive"
		}
	, 
		"parentChiWorker" : {
			isParent : true,
			targetModelClassId : "ChiWorker"
		}
	, 
		"parentChiWorkerInternal" : {
			isParent : true,
			targetModelClassId : "ChiWorkerInternal"
		}
	, 
		"parentChiWorkerExternal" : {
			isParent : true,
			targetModelClassId : "ChiWorkerExternal"
		}
	, 
		"parentChiBusinessUseCaseCore" : {
			isParent : true,
			targetModelClassId : "ChiBusinessUseCaseCore"
		}
	

	
		,
	
	
	
	}

}

Ext.extend(application.application.include.model.UseCases.NMUCActor, cwe.model.ModelClass);


application.application.include.model.UseCases.NMUCActor.prototype.getEditorItems = function() {
	return [
	
		 new Ext.form.TextField( {
			fieldLabel : "id",
			name : "id",
			dataIndex : "id"
		})
	, 
		 new Ext.form.TextField( {
			fieldLabel : "fk_chibusinessusecasecore_id",
			name : "fk_chibusinessusecasecore_id",
			dataIndex : "fk_chibusinessusecasecore_id"
		})
	, 
		 new Ext.form.TextField( {
			fieldLabel : "fk_chiworkerexternal_id",
			name : "fk_chiworkerexternal_id",
			dataIndex : "fk_chiworkerexternal_id"
		})
	, 
		 new Ext.form.TextField( {
			fieldLabel : "fk_chiworkerinternal_id",
			name : "fk_chiworkerinternal_id",
			dataIndex : "fk_chiworkerinternal_id"
		})
	, 
		 new Ext.form.TextField( {
			fieldLabel : "fk_chiworker_id",
			name : "fk_chiworker_id",
			dataIndex : "fk_chiworker_id"
		})
	, 
		 new Ext.form.TextField( {
			fieldLabel : "fk_chibusinesspartneractive_id",
			name : "fk_chibusinesspartneractive_id",
			dataIndex : "fk_chibusinesspartneractive_id"
		})
	, 
		 new Ext.form.TextField( {
			fieldLabel : "fk_chibusinesspartnerpassive_id",
			name : "fk_chibusinesspartnerpassive_id",
			dataIndex : "fk_chibusinesspartnerpassive_id"
		})
	, 
		 new Ext.form.TextField( {
			fieldLabel : "fk_chibusinesspartner_id",
			name : "fk_chibusinesspartner_id",
			dataIndex : "fk_chibusinesspartner_id"
		})
	, 
		 new Ext.form.TextField( {
			fieldLabel : "Association",
			name : "Association",
			dataIndex : "Association"
		})
	
	
	
		,
	
	
	
		
	
		new cwe.editor.control.SingleAssociate( {
	
		
			fieldLabel : "parentChiBusinessUseCase",
			name : "parentChiBusinessUseCase",
			dataIndex : "parentChiBusinessUseCase",
			targetCweModelElementId : "ChiBusinessUseCase",
			isParent : true
		
	})

	, 
		
	
		new cwe.editor.control.SingleAssociate( {
	
		
			fieldLabel : "parentActor",
			name : "parentActor",
			dataIndex : "parentActor",
			targetCweModelElementId : "Actor",
			isParent : true
		
	})

	, 
		
	
		new cwe.editor.control.SingleAssociate( {
	
		
			fieldLabel : "parentChiBusinessPartner",
			name : "parentChiBusinessPartner",
			dataIndex : "parentChiBusinessPartner",
			targetCweModelElementId : "ChiBusinessPartner",
			isParent : true
		
	})

	, 
		
	
		new cwe.editor.control.SingleAssociate( {
	
		
			fieldLabel : "parentChiBusinessPartnerPassive",
			name : "parentChiBusinessPartnerPassive",
			dataIndex : "parentChiBusinessPartnerPassive",
			targetCweModelElementId : "ChiBusinessPartnerPassive",
			isParent : true
		
	})

	, 
		
	
		new cwe.editor.control.SingleAssociate( {
	
		
			fieldLabel : "parentChiBusinessPartnerActive",
			name : "parentChiBusinessPartnerActive",
			dataIndex : "parentChiBusinessPartnerActive",
			targetCweModelElementId : "ChiBusinessPartnerActive",
			isParent : true
		
	})

	, 
		
	
		new cwe.editor.control.SingleAssociate( {
	
		
			fieldLabel : "parentChiWorker",
			name : "parentChiWorker",
			dataIndex : "parentChiWorker",
			targetCweModelElementId : "ChiWorker",
			isParent : true
		
	})

	, 
		
	
		new cwe.editor.control.SingleAssociate( {
	
		
			fieldLabel : "parentChiWorkerInternal",
			name : "parentChiWorkerInternal",
			dataIndex : "parentChiWorkerInternal",
			targetCweModelElementId : "ChiWorkerInternal",
			isParent : true
		
	})

	, 
		
	
		new cwe.editor.control.SingleAssociate( {
	
		
			fieldLabel : "parentChiWorkerExternal",
			name : "parentChiWorkerExternal",
			dataIndex : "parentChiWorkerExternal",
			targetCweModelElementId : "ChiWorkerExternal",
			isParent : true
		
	})

	, 
		
	
		new cwe.editor.control.SingleAssociate( {
	
		
			fieldLabel : "parentChiBusinessUseCaseCore",
			name : "parentChiBusinessUseCaseCore",
			dataIndex : "parentChiBusinessUseCaseCore",
			targetCweModelElementId : "ChiBusinessUseCaseCore",
			isParent : true
		
	})

	
	
	
		,
	
	
	
 ];
}


cwe.model.ModelClassContainer.getInstance().registerClass(new application.application.include.model.UseCases.NMUCActor());
	