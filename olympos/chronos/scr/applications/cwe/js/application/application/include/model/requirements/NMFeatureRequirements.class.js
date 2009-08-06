
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

application.application.include.model.requirements.NMFeatureRequirements = function() {
	application.application.include.model.requirements.NMFeatureRequirements.superclass.constructor.call(this, arguments);
	
	this.cweModelElementId = "NMFeatureRequirements";
	this.name = "NMFeatureRequirements";
	this.treeIconClass = "NMFeatureRequirementsTreeIcon16x16";
	this.owningPackageId = "application.application.include.model.requirements.Requirements_package";
	
	
	this.recordDefinition = [
	
	
	
	
	
		{
			name : "parentChiRequirement",
			mapping: "parentChiRequirement"
		}
	, 
		{
			name : "parentChiFeature",
			mapping: "parentChiFeature"
		}
	
	
	
	
	
	];

	
	
	this.relations = {
	
		"parentChiRequirement" : {
			isParent : true,
			targetModelClassId : "ChiRequirement"
		}
	, 
		"parentChiFeature" : {
			isParent : true,
			targetModelClassId : "ChiFeature"
		}
	

	
	
	
	};

};

Ext.extend(application.application.include.model.requirements.NMFeatureRequirements, cwe.model.ModelClass);


application.application.include.model.requirements.NMFeatureRequirements.prototype.getGridColumns = function() {
	return [
	
	];
};



application.application.include.model.requirements.NMFeatureRequirements.prototype.getEditorItems = function() {
	return [
	
	
	
		new cwe.editor.control.AssociationsFieldSet({
			items: [
		
			
	
		new cwe.editor.control.SingleAssociate( {
	
		
			fieldLabel : "parentChiRequirement",
			name : "parentChiRequirement",
			dataIndex : "parentChiRequirement",
			targetCweModelElementId : "ChiRequirement",
			isParent : true
		
	})

		, 
			
	
		new cwe.editor.control.SingleAssociate( {
	
		
			fieldLabel : "parentChiFeature",
			name : "parentChiFeature",
			dataIndex : "parentChiFeature",
			targetCweModelElementId : "ChiFeature",
			isParent : true
		
	})

		
		
		
		
		
		
		]})
	
 ];
};


cwe.model.ModelClassContainer.getInstance().registerClass(new application.application.include.model.requirements.NMFeatureRequirements());
	