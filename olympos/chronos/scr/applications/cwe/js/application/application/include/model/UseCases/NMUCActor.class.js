
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
			name : "parentActor",
			mapping: "parentActor"
		}
	, 
		{
			name : "parentChiBusinessUseCase",
			mapping: "parentChiBusinessUseCase"
		}
	, 
		{
			name : "parentChiBusinessUseCaseCore",
			mapping: "parentChiBusinessUseCaseCore"
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
	
	
	
	
	
	];

	
	
	this.relations = {
	
		"parentActor" : {
			isParent : true,
			targetModelClassId : "Actor"
		}
	, 
		"parentChiBusinessUseCase" : {
			isParent : true,
			targetModelClassId : "ChiBusinessUseCase"
		}
	, 
		"parentChiBusinessUseCaseCore" : {
			isParent : true,
			targetModelClassId : "ChiBusinessUseCaseCore"
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
	

	
	
	
	};

};

Ext.extend(application.application.include.model.UseCases.NMUCActor, cwe.model.ModelClass);


application.application.include.model.UseCases.NMUCActor.prototype.getGridColumns = function() {
	return [
	
	];
};



application.application.include.model.UseCases.NMUCActor.prototype.getEditorItems = function() {
	return [
	
	
	
		new cwe.editor.control.AssociationsFieldSet({
			items: [
		
			
	
		new cwe.editor.control.SingleAssociate( {
	
		
			fieldLabel : "parentActor",
			name : "parentActor",
			dataIndex : "parentActor",
			targetCweModelElementId : "Actor",
			isParent : true
		
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
	
		
			fieldLabel : "parentChiBusinessUseCaseCore",
			name : "parentChiBusinessUseCaseCore",
			dataIndex : "parentChiBusinessUseCaseCore",
			targetCweModelElementId : "ChiBusinessUseCaseCore",
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

		
		
		
		
		
		
		]})
	
 ];
};


cwe.model.ModelClassContainer.getInstance().registerClass(new application.application.include.model.UseCases.NMUCActor());
	