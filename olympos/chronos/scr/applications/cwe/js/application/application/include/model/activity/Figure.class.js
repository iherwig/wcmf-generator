
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
Ext.namespace("application.application.include.model.activity");

application.application.include.model.activity.Figure = function() {
	application.application.include.model.activity.Figure.superclass.constructor.call(this, arguments);
	
	this.cweModelElementId = "Figure";
	this.name = "Figure";
	this.treeIconClass = "FigureTreeIcon16x16";
	this.owningPackageId = "application.application.include.model.activity.Activity_package";
	
	
	this.recordDefinition = [
	
		{
			name : "id",
			mapping : "id"
		}
	, 
		{
			name : "fk_activity_id",
			mapping : "fk_activity_id"
		}
	, 
		{
			name : "fk_activitydecision_id",
			mapping : "fk_activitydecision_id"
		}
	, 
		{
			name : "fk_activityreceive_id",
			mapping : "fk_activityreceive_id"
		}
	, 
		{
			name : "fk_activitysend_id",
			mapping : "fk_activitysend_id"
		}
	, 
		{
			name : "fk_activityinitial_id",
			mapping : "fk_activityinitial_id"
		}
	, 
		{
			name : "fk_activityfinal_id",
			mapping : "fk_activityfinal_id"
		}
	, 
		{
			name : "fk_chibusinessusecasecore_id",
			mapping : "fk_chibusinessusecasecore_id"
		}
	, 
		{
			name : "fk_chibusinessusecase_id",
			mapping : "fk_chibusinessusecase_id"
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
			name : "fk_actor_id",
			mapping : "fk_actor_id"
		}
	, 
		{
			name : "fk_chibusinessprocess_id",
			mapping : "fk_chibusinessprocess_id"
		}
	, 
		{
			name : "fk_chigoal_id",
			mapping : "fk_chigoal_id"
		}
	, 
		{
			name : "fk_chirequirement_id",
			mapping : "fk_chirequirement_id"
		}
	, 
		{
			name : "fk_chifeature_id",
			mapping : "fk_chifeature_id"
		}
	, 
		{
			name : "fk_chiissue_id",
			mapping : "fk_chiissue_id"
		}
	, 
		{
			name : "fk_chicontroller_id",
			mapping : "fk_chicontroller_id"
		}
	, 
		{
			name : "fk_chinode_id",
			mapping : "fk_chinode_id"
		}
	, 
		{
			name : "fk_chiview_id",
			mapping : "fk_chiview_id"
		}
	, 
		{
			name : "fk_diagram_id",
			mapping : "fk_diagram_id"
		}
	, 
		{
			name : "fk_chibase_id",
			mapping : "fk_chibase_id"
		}
	, 
		{
			name : "fk_activityset_id",
			mapping : "fk_activityset_id"
		}
	, 
		{
			name : "BackgroundColor",
			mapping : "BackgroundColor"
		}
	, 
		{
			name : "ForegroundColor",
			mapping : "ForegroundColor"
		}
	, 
		{
			name : "GID",
			mapping : "GID"
		}
	, 
		{
			name : "Height",
			mapping : "Height"
		}
	, 
		{
			name : "PositionY",
			mapping : "PositionY"
		}
	, 
		{
			name : "PositionX",
			mapping : "PositionX"
		}
	, 
		{
			name : "Width",
			mapping : "Width"
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
			name : "parentActivitySet",
			mapping: "parentActivitySet"
		}
	, 
		{
			name : "parentChiBase",
			mapping: "parentChiBase"
		}
	, 
		{
			name : "parentDiagram",
			mapping: "parentDiagram"
		}
	, 
		{
			name : "parentChiView",
			mapping: "parentChiView"
		}
	, 
		{
			name : "parentChiNode",
			mapping: "parentChiNode"
		}
	, 
		{
			name : "parentChiController",
			mapping: "parentChiController"
		}
	, 
		{
			name : "parentChiIssue",
			mapping: "parentChiIssue"
		}
	, 
		{
			name : "parentChiFeature",
			mapping: "parentChiFeature"
		}
	, 
		{
			name : "parentChiRequirement",
			mapping: "parentChiRequirement"
		}
	, 
		{
			name : "parentChiGoal",
			mapping: "parentChiGoal"
		}
	, 
		{
			name : "parentChiBusinessProcess",
			mapping: "parentChiBusinessProcess"
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
			name : "parentActivityFinal",
			mapping: "parentActivityFinal"
		}
	, 
		{
			name : "parentActivityInitial",
			mapping: "parentActivityInitial"
		}
	, 
		{
			name : "parentActivitySend",
			mapping: "parentActivitySend"
		}
	, 
		{
			name : "parentActivityReceive",
			mapping: "parentActivityReceive"
		}
	, 
		{
			name : "parentActivityDecision",
			mapping: "parentActivityDecision"
		}
	, 
		{
			name : "parentActivity",
			mapping: "parentActivity"
		}
	
	
	
		,
	
	
	
	];

	
	
	this.relations = {
	
		"parentActivitySet" : {
			isParent : true,
			targetModelClassId : "ActivitySet"
		}
	, 
		"parentChiBase" : {
			isParent : true,
			targetModelClassId : "ChiBase"
		}
	, 
		"parentDiagram" : {
			isParent : true,
			targetModelClassId : "Diagram"
		}
	, 
		"parentChiView" : {
			isParent : true,
			targetModelClassId : "ChiView"
		}
	, 
		"parentChiNode" : {
			isParent : true,
			targetModelClassId : "ChiNode"
		}
	, 
		"parentChiController" : {
			isParent : true,
			targetModelClassId : "ChiController"
		}
	, 
		"parentChiIssue" : {
			isParent : true,
			targetModelClassId : "ChiIssue"
		}
	, 
		"parentChiFeature" : {
			isParent : true,
			targetModelClassId : "ChiFeature"
		}
	, 
		"parentChiRequirement" : {
			isParent : true,
			targetModelClassId : "ChiRequirement"
		}
	, 
		"parentChiGoal" : {
			isParent : true,
			targetModelClassId : "ChiGoal"
		}
	, 
		"parentChiBusinessProcess" : {
			isParent : true,
			targetModelClassId : "ChiBusinessProcess"
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
		"parentActivityFinal" : {
			isParent : true,
			targetModelClassId : "ActivityFinal"
		}
	, 
		"parentActivityInitial" : {
			isParent : true,
			targetModelClassId : "ActivityInitial"
		}
	, 
		"parentActivitySend" : {
			isParent : true,
			targetModelClassId : "ActivitySend"
		}
	, 
		"parentActivityReceive" : {
			isParent : true,
			targetModelClassId : "ActivityReceive"
		}
	, 
		"parentActivityDecision" : {
			isParent : true,
			targetModelClassId : "ActivityDecision"
		}
	, 
		"parentActivity" : {
			isParent : true,
			targetModelClassId : "Activity"
		}
	

	
		,
	
	
	
	}

}

Ext.extend(application.application.include.model.activity.Figure, cwe.model.ModelClass);


application.application.include.model.activity.Figure.prototype.getEditorItems = function() {
	return [
	
		 new Ext.form.TextField( {
			fieldLabel : "id",
			name : "id",
			dataIndex : "id"
		})
	, 
		 new Ext.form.TextField( {
			fieldLabel : "fk_activity_id",
			name : "fk_activity_id",
			dataIndex : "fk_activity_id"
		})
	, 
		 new Ext.form.TextField( {
			fieldLabel : "fk_activitydecision_id",
			name : "fk_activitydecision_id",
			dataIndex : "fk_activitydecision_id"
		})
	, 
		 new Ext.form.TextField( {
			fieldLabel : "fk_activityreceive_id",
			name : "fk_activityreceive_id",
			dataIndex : "fk_activityreceive_id"
		})
	, 
		 new Ext.form.TextField( {
			fieldLabel : "fk_activitysend_id",
			name : "fk_activitysend_id",
			dataIndex : "fk_activitysend_id"
		})
	, 
		 new Ext.form.TextField( {
			fieldLabel : "fk_activityinitial_id",
			name : "fk_activityinitial_id",
			dataIndex : "fk_activityinitial_id"
		})
	, 
		 new Ext.form.TextField( {
			fieldLabel : "fk_activityfinal_id",
			name : "fk_activityfinal_id",
			dataIndex : "fk_activityfinal_id"
		})
	, 
		 new Ext.form.TextField( {
			fieldLabel : "fk_chibusinessusecasecore_id",
			name : "fk_chibusinessusecasecore_id",
			dataIndex : "fk_chibusinessusecasecore_id"
		})
	, 
		 new Ext.form.TextField( {
			fieldLabel : "fk_chibusinessusecase_id",
			name : "fk_chibusinessusecase_id",
			dataIndex : "fk_chibusinessusecase_id"
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
			fieldLabel : "fk_actor_id",
			name : "fk_actor_id",
			dataIndex : "fk_actor_id"
		})
	, 
		 new Ext.form.TextField( {
			fieldLabel : "fk_chibusinessprocess_id",
			name : "fk_chibusinessprocess_id",
			dataIndex : "fk_chibusinessprocess_id"
		})
	, 
		 new Ext.form.TextField( {
			fieldLabel : "fk_chigoal_id",
			name : "fk_chigoal_id",
			dataIndex : "fk_chigoal_id"
		})
	, 
		 new Ext.form.TextField( {
			fieldLabel : "fk_chirequirement_id",
			name : "fk_chirequirement_id",
			dataIndex : "fk_chirequirement_id"
		})
	, 
		 new Ext.form.TextField( {
			fieldLabel : "fk_chifeature_id",
			name : "fk_chifeature_id",
			dataIndex : "fk_chifeature_id"
		})
	, 
		 new Ext.form.TextField( {
			fieldLabel : "fk_chiissue_id",
			name : "fk_chiissue_id",
			dataIndex : "fk_chiissue_id"
		})
	, 
		 new Ext.form.TextField( {
			fieldLabel : "fk_chicontroller_id",
			name : "fk_chicontroller_id",
			dataIndex : "fk_chicontroller_id"
		})
	, 
		 new Ext.form.TextField( {
			fieldLabel : "fk_chinode_id",
			name : "fk_chinode_id",
			dataIndex : "fk_chinode_id"
		})
	, 
		 new Ext.form.TextField( {
			fieldLabel : "fk_chiview_id",
			name : "fk_chiview_id",
			dataIndex : "fk_chiview_id"
		})
	, 
		 new Ext.form.TextField( {
			fieldLabel : "fk_diagram_id",
			name : "fk_diagram_id",
			dataIndex : "fk_diagram_id"
		})
	, 
		 new Ext.form.TextField( {
			fieldLabel : "fk_chibase_id",
			name : "fk_chibase_id",
			dataIndex : "fk_chibase_id"
		})
	, 
		 new Ext.form.TextField( {
			fieldLabel : "fk_activityset_id",
			name : "fk_activityset_id",
			dataIndex : "fk_activityset_id"
		})
	, 
		 new Ext.form.TextField( {
			fieldLabel : "BackgroundColor",
			name : "BackgroundColor",
			dataIndex : "BackgroundColor"
		})
	, 
		 new Ext.form.TextField( {
			fieldLabel : "ForegroundColor",
			name : "ForegroundColor",
			dataIndex : "ForegroundColor"
		})
	, 
		 new Ext.form.TextField( {
			fieldLabel : "GID",
			name : "GID",
			dataIndex : "GID"
		})
	, 
		 new Ext.form.TextField( {
			fieldLabel : "Height",
			name : "Height",
			dataIndex : "Height"
		})
	, 
		 new Ext.form.TextField( {
			fieldLabel : "PositionY",
			name : "PositionY",
			dataIndex : "PositionY"
		})
	, 
		 new Ext.form.TextField( {
			fieldLabel : "PositionX",
			name : "PositionX",
			dataIndex : "PositionX"
		})
	, 
		 new Ext.form.TextField( {
			fieldLabel : "Width",
			name : "Width",
			dataIndex : "Width"
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
	
		
			fieldLabel : "parentActivitySet",
			name : "parentActivitySet",
			dataIndex : "parentActivitySet",
			targetCweModelElementId : "ActivitySet",
			isParent : true
		
	})

	, 
		
	
		new cwe.editor.control.SingleAssociate( {
	
		
			fieldLabel : "parentChiBase",
			name : "parentChiBase",
			dataIndex : "parentChiBase",
			targetCweModelElementId : "ChiBase",
			isParent : true
		
	})

	, 
		
	
		new cwe.editor.control.SingleAssociate( {
	
		
			fieldLabel : "parentDiagram",
			name : "parentDiagram",
			dataIndex : "parentDiagram",
			targetCweModelElementId : "Diagram",
			isParent : true
		
	})

	, 
		
	
		new cwe.editor.control.SingleAssociate( {
	
		
			fieldLabel : "parentChiView",
			name : "parentChiView",
			dataIndex : "parentChiView",
			targetCweModelElementId : "ChiView",
			isParent : true
		
	})

	, 
		
	
		new cwe.editor.control.SingleAssociate( {
	
		
			fieldLabel : "parentChiNode",
			name : "parentChiNode",
			dataIndex : "parentChiNode",
			targetCweModelElementId : "ChiNode",
			isParent : true
		
	})

	, 
		
	
		new cwe.editor.control.SingleAssociate( {
	
		
			fieldLabel : "parentChiController",
			name : "parentChiController",
			dataIndex : "parentChiController",
			targetCweModelElementId : "ChiController",
			isParent : true
		
	})

	, 
		
	
		new cwe.editor.control.SingleAssociate( {
	
		
			fieldLabel : "parentChiIssue",
			name : "parentChiIssue",
			dataIndex : "parentChiIssue",
			targetCweModelElementId : "ChiIssue",
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

	, 
		
	
		new cwe.editor.control.SingleAssociate( {
	
		
			fieldLabel : "parentChiRequirement",
			name : "parentChiRequirement",
			dataIndex : "parentChiRequirement",
			targetCweModelElementId : "ChiRequirement",
			isParent : true
		
	})

	, 
		
	
		new cwe.editor.control.SingleAssociate( {
	
		
			fieldLabel : "parentChiGoal",
			name : "parentChiGoal",
			dataIndex : "parentChiGoal",
			targetCweModelElementId : "ChiGoal",
			isParent : true
		
	})

	, 
		
	
		new cwe.editor.control.SingleAssociate( {
	
		
			fieldLabel : "parentChiBusinessProcess",
			name : "parentChiBusinessProcess",
			dataIndex : "parentChiBusinessProcess",
			targetCweModelElementId : "ChiBusinessProcess",
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
	
		
			fieldLabel : "parentActivityFinal",
			name : "parentActivityFinal",
			dataIndex : "parentActivityFinal",
			targetCweModelElementId : "ActivityFinal",
			isParent : true
		
	})

	, 
		
	
		new cwe.editor.control.SingleAssociate( {
	
		
			fieldLabel : "parentActivityInitial",
			name : "parentActivityInitial",
			dataIndex : "parentActivityInitial",
			targetCweModelElementId : "ActivityInitial",
			isParent : true
		
	})

	, 
		
	
		new cwe.editor.control.SingleAssociate( {
	
		
			fieldLabel : "parentActivitySend",
			name : "parentActivitySend",
			dataIndex : "parentActivitySend",
			targetCweModelElementId : "ActivitySend",
			isParent : true
		
	})

	, 
		
	
		new cwe.editor.control.SingleAssociate( {
	
		
			fieldLabel : "parentActivityReceive",
			name : "parentActivityReceive",
			dataIndex : "parentActivityReceive",
			targetCweModelElementId : "ActivityReceive",
			isParent : true
		
	})

	, 
		
	
		new cwe.editor.control.SingleAssociate( {
	
		
			fieldLabel : "parentActivityDecision",
			name : "parentActivityDecision",
			dataIndex : "parentActivityDecision",
			targetCweModelElementId : "ActivityDecision",
			isParent : true
		
	})

	, 
		
	
		new cwe.editor.control.SingleAssociate( {
	
		
			fieldLabel : "parentActivity",
			name : "parentActivity",
			dataIndex : "parentActivity",
			targetCweModelElementId : "Activity",
			isParent : true
		
	})

	
	
	
		,
	
	
	
 ];
}


cwe.model.ModelClassContainer.getInstance().registerClass(new application.application.include.model.activity.Figure());
	