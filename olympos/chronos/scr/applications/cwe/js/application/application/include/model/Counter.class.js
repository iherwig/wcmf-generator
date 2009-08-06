
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

application.application.include.model.Counter = function() {
	application.application.include.model.Counter.superclass.constructor.call(this, arguments);
	
	this.cweModelElementId = "Counter";
	this.name = "Counter";
	this.treeIconClass = "CounterTreeIcon16x16";
	this.owningPackageId = "application.application.include.model.Model_package";
	
	
	this.recordDefinition = [
	
		{
			name : "ChiGoal",
			mapping : "ChiGoal"
		}
	, 
		{
			name : "ChiRequirement",
			mapping : "ChiRequirement"
		}
	, 
		{
			name : "ChiFeature",
			mapping : "ChiFeature"
		}
	, 
		{
			name : "ChiIssue",
			mapping : "ChiIssue"
		}
	, 
		{
			name : "ChiBusinessUseCase",
			mapping : "ChiBusinessUseCase"
		}
	, 
		{
			name : "ChiBusinessProcess",
			mapping : "ChiBusinessProcess"
		}
	, 
		{
			name : "ChiBusinessUseCaseCore",
			mapping : "ChiBusinessUseCaseCore"
		}
	, 
		{
			name : "ChiBusinessPartnerActive",
			mapping : "ChiBusinessPartnerActive"
		}
	, 
		{
			name : "ChiBusinessPartnerPassive",
			mapping : "ChiBusinessPartnerPassive"
		}
	, 
		{
			name : "ChiWorkerExternal",
			mapping : "ChiWorkerExternal"
		}
	, 
		{
			name : "ChiWorkerInternal",
			mapping : "ChiWorkerInternal"
		}
	, 
		{
			name : "ChiWorker",
			mapping : "ChiWorker"
		}
	, 
		{
			name : "ChiBusinessPartner",
			mapping : "ChiBusinessPartner"
		}
	, 
		{
			name : "ChiController",
			mapping : "ChiController"
		}
	, 
		{
			name : "ChiNode",
			mapping : "ChiNode"
		}
	, 
		{
			name : "ChiValue",
			mapping : "ChiValue"
		}
	, 
		{
			name : "ChiView",
			mapping : "ChiView"
		}
	, 
		{
			name : "Operation",
			mapping : "Operation"
		}
	, 
		{
			name : "Activity",
			mapping : "Activity"
		}
	, 
		{
			name : "ActivityDecision",
			mapping : "ActivityDecision"
		}
	, 
		{
			name : "ActivityReceive",
			mapping : "ActivityReceive"
		}
	, 
		{
			name : "ActivitySend",
			mapping : "ActivitySend"
		}
	, 
		{
			name : "ActivityInitial",
			mapping : "ActivityInitial"
		}
	, 
		{
			name : "ActivityFinal",
			mapping : "ActivityFinal"
		}
	, 
		{
			name : "ChiSystem",
			mapping : "ChiSystem"
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
	
	
	
	
	
	
	
	
	
	];

	
	
	this.relations = {
	

	
	
	
	};

};

Ext.extend(application.application.include.model.Counter, cwe.model.ModelClass);


application.application.include.model.Counter.prototype.getGridColumns = function() {
	return [
	
		
			{
			    header : "ChiGoal",
			    dataIndex : "ChiGoal",
			    width : 100,
			    sortable : true,
			    editor: 
	
		
			new cwe.editor.control.TextField({
				
			})
					
	

			}
		, 
			{
			    header : "ChiRequirement",
			    dataIndex : "ChiRequirement",
			    width : 100,
			    sortable : true,
			    editor: 
	
		
			new cwe.editor.control.TextField({
				
			})
					
	

			}
		, 
			{
			    header : "ChiFeature",
			    dataIndex : "ChiFeature",
			    width : 100,
			    sortable : true,
			    editor: 
	
		
			new cwe.editor.control.TextField({
				
			})
					
	

			}
		, 
			{
			    header : "ChiIssue",
			    dataIndex : "ChiIssue",
			    width : 100,
			    sortable : true,
			    editor: 
	
		
			new cwe.editor.control.TextField({
				
			})
					
	

			}
		, 
			{
			    header : "ChiBusinessUseCase",
			    dataIndex : "ChiBusinessUseCase",
			    width : 100,
			    sortable : true,
			    editor: 
	
		
			new cwe.editor.control.TextField({
				
			})
					
	

			}
		, 
			{
			    header : "ChiBusinessProcess",
			    dataIndex : "ChiBusinessProcess",
			    width : 100,
			    sortable : true,
			    editor: 
	
		
			new cwe.editor.control.TextField({
				
			})
					
	

			}
		, 
			{
			    header : "ChiBusinessUseCaseCore",
			    dataIndex : "ChiBusinessUseCaseCore",
			    width : 100,
			    sortable : true,
			    editor: 
	
		
			new cwe.editor.control.TextField({
				
			})
					
	

			}
		, 
			{
			    header : "ChiBusinessPartnerActive",
			    dataIndex : "ChiBusinessPartnerActive",
			    width : 100,
			    sortable : true,
			    editor: 
	
		
			new cwe.editor.control.TextField({
				
			})
					
	

			}
		, 
			{
			    header : "ChiBusinessPartnerPassive",
			    dataIndex : "ChiBusinessPartnerPassive",
			    width : 100,
			    sortable : true,
			    editor: 
	
		
			new cwe.editor.control.TextField({
				
			})
					
	

			}
		, 
			{
			    header : "ChiWorkerExternal",
			    dataIndex : "ChiWorkerExternal",
			    width : 100,
			    sortable : true,
			    editor: 
	
		
			new cwe.editor.control.TextField({
				
			})
					
	

			}
		, 
			{
			    header : "ChiWorkerInternal",
			    dataIndex : "ChiWorkerInternal",
			    width : 100,
			    sortable : true,
			    editor: 
	
		
			new cwe.editor.control.TextField({
				
			})
					
	

			}
		, 
			{
			    header : "ChiWorker",
			    dataIndex : "ChiWorker",
			    width : 100,
			    sortable : true,
			    editor: 
	
		
			new cwe.editor.control.TextField({
				
			})
					
	

			}
		, 
			{
			    header : "ChiBusinessPartner",
			    dataIndex : "ChiBusinessPartner",
			    width : 100,
			    sortable : true,
			    editor: 
	
		
			new cwe.editor.control.TextField({
				
			})
					
	

			}
		, 
			{
			    header : "ChiController",
			    dataIndex : "ChiController",
			    width : 100,
			    sortable : true,
			    editor: 
	
		
			new cwe.editor.control.TextField({
				
			})
					
	

			}
		, 
			{
			    header : "ChiNode",
			    dataIndex : "ChiNode",
			    width : 100,
			    sortable : true,
			    editor: 
	
		
			new cwe.editor.control.TextField({
				
			})
					
	

			}
		, 
			{
			    header : "ChiValue",
			    dataIndex : "ChiValue",
			    width : 100,
			    sortable : true,
			    editor: 
	
		
			new cwe.editor.control.TextField({
				
			})
					
	

			}
		, 
			{
			    header : "ChiView",
			    dataIndex : "ChiView",
			    width : 100,
			    sortable : true,
			    editor: 
	
		
			new cwe.editor.control.TextField({
				
			})
					
	

			}
		, 
			{
			    header : "Operation",
			    dataIndex : "Operation",
			    width : 100,
			    sortable : true,
			    editor: 
	
		
			new cwe.editor.control.TextField({
				
			})
					
	

			}
		, 
			{
			    header : "Activity",
			    dataIndex : "Activity",
			    width : 100,
			    sortable : true,
			    editor: 
	
		
			new cwe.editor.control.TextField({
				
			})
					
	

			}
		, 
			{
			    header : "ActivityDecision",
			    dataIndex : "ActivityDecision",
			    width : 100,
			    sortable : true,
			    editor: 
	
		
			new cwe.editor.control.TextField({
				
			})
					
	

			}
		, 
			{
			    header : "ActivityReceive",
			    dataIndex : "ActivityReceive",
			    width : 100,
			    sortable : true,
			    editor: 
	
		
			new cwe.editor.control.TextField({
				
			})
					
	

			}
		, 
			{
			    header : "ActivitySend",
			    dataIndex : "ActivitySend",
			    width : 100,
			    sortable : true,
			    editor: 
	
		
			new cwe.editor.control.TextField({
				
			})
					
	

			}
		, 
			{
			    header : "ActivityInitial",
			    dataIndex : "ActivityInitial",
			    width : 100,
			    sortable : true,
			    editor: 
	
		
			new cwe.editor.control.TextField({
				
			})
					
	

			}
		, 
			{
			    header : "ActivityFinal",
			    dataIndex : "ActivityFinal",
			    width : 100,
			    sortable : true,
			    editor: 
	
		
			new cwe.editor.control.TextField({
				
			})
					
	

			}
		, 
			{
			    header : "ChiSystem",
			    dataIndex : "ChiSystem",
			    width : 100,
			    sortable : true,
			    editor: 
	
		
			new cwe.editor.control.TextField({
				
			})
					
	

			}
		, 
			{
			    header : "created",
			    dataIndex : "created",
			    width : 100,
			    sortable : true,
			    editor: 
	
		
			new cwe.modelgrid.DummyField()
					
	

			}
		, 
			{
			    header : "creator",
			    dataIndex : "creator",
			    width : 100,
			    sortable : true,
			    editor: 
	
		
			new cwe.modelgrid.DummyField()
					
	

			}
		, 
			{
			    header : "last_editor",
			    dataIndex : "last_editor",
			    width : 100,
			    sortable : true,
			    editor: 
	
		
			new cwe.modelgrid.DummyField()
					
	

			}
		, 
			{
			    header : "modified",
			    dataIndex : "modified",
			    width : 100,
			    sortable : true,
			    editor: 
	
		
			new cwe.modelgrid.DummyField()
					
	

			}
		
	
	];
};



application.application.include.model.Counter.prototype.getEditorItems = function() {
	return [
	
		new cwe.editor.control.PropertiesFieldSet({
			items: [
		
			
	new cwe.editor.control.TextField({
		fieldLabel: "ChiGoal",
		name: "ChiGoal",
		dataIndex: "ChiGoal",
		
		
		toolTip: ""
	}) 

		, 
			
	new cwe.editor.control.TextField({
		fieldLabel: "ChiRequirement",
		name: "ChiRequirement",
		dataIndex: "ChiRequirement",
		
		
		toolTip: ""
	}) 

		, 
			
	new cwe.editor.control.TextField({
		fieldLabel: "ChiFeature",
		name: "ChiFeature",
		dataIndex: "ChiFeature",
		
		
		toolTip: ""
	}) 

		, 
			
	new cwe.editor.control.TextField({
		fieldLabel: "ChiIssue",
		name: "ChiIssue",
		dataIndex: "ChiIssue",
		
		
		toolTip: ""
	}) 

		, 
			
	new cwe.editor.control.TextField({
		fieldLabel: "ChiBusinessUseCase",
		name: "ChiBusinessUseCase",
		dataIndex: "ChiBusinessUseCase",
		
		
		toolTip: ""
	}) 

		, 
			
	new cwe.editor.control.TextField({
		fieldLabel: "ChiBusinessProcess",
		name: "ChiBusinessProcess",
		dataIndex: "ChiBusinessProcess",
		
		
		toolTip: ""
	}) 

		, 
			
	new cwe.editor.control.TextField({
		fieldLabel: "ChiBusinessUseCaseCore",
		name: "ChiBusinessUseCaseCore",
		dataIndex: "ChiBusinessUseCaseCore",
		
		
		toolTip: ""
	}) 

		, 
			
	new cwe.editor.control.TextField({
		fieldLabel: "ChiBusinessPartnerActive",
		name: "ChiBusinessPartnerActive",
		dataIndex: "ChiBusinessPartnerActive",
		
		
		toolTip: ""
	}) 

		, 
			
	new cwe.editor.control.TextField({
		fieldLabel: "ChiBusinessPartnerPassive",
		name: "ChiBusinessPartnerPassive",
		dataIndex: "ChiBusinessPartnerPassive",
		
		
		toolTip: ""
	}) 

		, 
			
	new cwe.editor.control.TextField({
		fieldLabel: "ChiWorkerExternal",
		name: "ChiWorkerExternal",
		dataIndex: "ChiWorkerExternal",
		
		
		toolTip: ""
	}) 

		, 
			
	new cwe.editor.control.TextField({
		fieldLabel: "ChiWorkerInternal",
		name: "ChiWorkerInternal",
		dataIndex: "ChiWorkerInternal",
		
		
		toolTip: ""
	}) 

		, 
			
	new cwe.editor.control.TextField({
		fieldLabel: "ChiWorker",
		name: "ChiWorker",
		dataIndex: "ChiWorker",
		
		
		toolTip: ""
	}) 

		, 
			
	new cwe.editor.control.TextField({
		fieldLabel: "ChiBusinessPartner",
		name: "ChiBusinessPartner",
		dataIndex: "ChiBusinessPartner",
		
		
		toolTip: ""
	}) 

		, 
			
	new cwe.editor.control.TextField({
		fieldLabel: "ChiController",
		name: "ChiController",
		dataIndex: "ChiController",
		
		
		toolTip: ""
	}) 

		, 
			
	new cwe.editor.control.TextField({
		fieldLabel: "ChiNode",
		name: "ChiNode",
		dataIndex: "ChiNode",
		
		
		toolTip: ""
	}) 

		, 
			
	new cwe.editor.control.TextField({
		fieldLabel: "ChiValue",
		name: "ChiValue",
		dataIndex: "ChiValue",
		
		
		toolTip: ""
	}) 

		, 
			
	new cwe.editor.control.TextField({
		fieldLabel: "ChiView",
		name: "ChiView",
		dataIndex: "ChiView",
		
		
		toolTip: ""
	}) 

		, 
			
	new cwe.editor.control.TextField({
		fieldLabel: "Operation",
		name: "Operation",
		dataIndex: "Operation",
		
		
		toolTip: ""
	}) 

		, 
			
	new cwe.editor.control.TextField({
		fieldLabel: "Activity",
		name: "Activity",
		dataIndex: "Activity",
		
		
		toolTip: ""
	}) 

		, 
			
	new cwe.editor.control.TextField({
		fieldLabel: "ActivityDecision",
		name: "ActivityDecision",
		dataIndex: "ActivityDecision",
		
		
		toolTip: ""
	}) 

		, 
			
	new cwe.editor.control.TextField({
		fieldLabel: "ActivityReceive",
		name: "ActivityReceive",
		dataIndex: "ActivityReceive",
		
		
		toolTip: ""
	}) 

		, 
			
	new cwe.editor.control.TextField({
		fieldLabel: "ActivitySend",
		name: "ActivitySend",
		dataIndex: "ActivitySend",
		
		
		toolTip: ""
	}) 

		, 
			
	new cwe.editor.control.TextField({
		fieldLabel: "ActivityInitial",
		name: "ActivityInitial",
		dataIndex: "ActivityInitial",
		
		
		toolTip: ""
	}) 

		, 
			
	new cwe.editor.control.TextField({
		fieldLabel: "ActivityFinal",
		name: "ActivityFinal",
		dataIndex: "ActivityFinal",
		
		
		toolTip: ""
	}) 

		, 
			
	new cwe.editor.control.TextField({
		fieldLabel: "ChiSystem",
		name: "ChiSystem",
		dataIndex: "ChiSystem",
		
		
		toolTip: ""
	}) 

		, 
			
	new cwe.editor.control.TextField({
		fieldLabel: "created",
		name: "created",
		dataIndex: "created",
		
		
			
				readOnly: true,
			
		
		toolTip: "the creation date of this object"
	}) 

		, 
			
	new cwe.editor.control.TextField({
		fieldLabel: "creator",
		name: "creator",
		dataIndex: "creator",
		
		
			
				readOnly: true,
			
		
		toolTip: "the user that created this object"
	}) 

		, 
			
	new cwe.editor.control.TextField({
		fieldLabel: "last_editor",
		name: "last_editor",
		dataIndex: "last_editor",
		
		
			
				readOnly: true,
			
		
		toolTip: "the last user that edited this object"
	}) 

		, 
			
	new cwe.editor.control.TextField({
		fieldLabel: "modified",
		name: "modified",
		dataIndex: "modified",
		
		
			
				readOnly: true,
			
		
		toolTip: "the date when this object was modified"
	}) 

		
		]})
		
		
	
	
	
 ];
};


cwe.model.ModelClassContainer.getInstance().registerClass(new application.application.include.model.Counter());
	