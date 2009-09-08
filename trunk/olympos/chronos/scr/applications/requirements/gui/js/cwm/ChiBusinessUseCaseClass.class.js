/*
 *  This file was generated by wCMFGenerator 3.0.0 from src/requirements.uml on Mon Jan 12 18:09:59 CET 2009.
 Manual modifications should be placed inside the protected regions.
 * Copyright (c) 2009 The Olympos Development Team.
 *
 * http://sourceforge.net/projects/olympos/
 *
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html. If redistributing this code,
 * this entire header must remain intact.
 */
Ext.namespace("cwm");

cwm.ChiBusinessUseCaseClass = function() {
	cwm.ChiBusinessUseCaseClass.superclass.constructor.call(this);
	
	this.uwmClassName = "ChiBusinessUseCase";
	this.instanceClassName = "cwm.ChiBusinessUseCase";
	this.treeIcon = "FigureChiBusinessUseCase";
	this.figureIcon = "FigureChiBusinessUseCase";
	this.figureClass = "uwm.graphics.figure.RectangleFigure";
	this.initialWidth = 117;
	this.initialHeight = 78;
	this.description = " A Business Use Case is part of a business process that produces an advantage to the enterprise.";
	this.helpUrl = "help/index.html#4.6.ChiBusinessUseCase|outline";
	this.defaultLabel = "New ChiBusinessUseCase";
	this.semanticGroup = "UseCases";
	this.labelProperties = {
		Name: true
	};
	
	this.gridTabIconClass = "ChiBusinessUseCaseTab";
	this.gridTabTip = "Shows all <b>ChiBusinessUseCase</b> within selected scope";
	this.gridFields = [{
		name: "oid",
		mapping: "oid"
	}, {
		name: "Label",
		mapping: "Label"
	}];
	this.gridColumns = [{
		header: "Label",
		dataIndex: "Label",
		sortable: true
	}];
	
	this.connectionInfo = {
	
		"ChiWorkerExternal": {
			label: "participates in",
			invert: true,
			connectionType: 'association',
			cardinality: -1
		},
		"ChiWorkerInternal": {
			label: "participates in",
			invert: true,
			connectionType: 'association',
			cardinality: -1
		},
		"ChiWorker": {
			label: "participates in",
			invert: true,
			connectionType: 'association',
			cardinality: -1
		},
		"ChiBusinessPartnerActive": {
			label: "participates in",
			invert: true,
			connectionType: 'association',
			cardinality: -1
		},
		"ChiBusinessPartnerPassive": {
			label: "participates in",
			invert: true,
			connectionType: 'association',
			cardinality: -1
		},
		"ChiBusinessPartner": {
			label: "participates in",
			invert: true,
			connectionType: 'association',
			cardinality: -1
		},	
		"ChiBusinessProcess": {
			label: "contains",
			invert: true,
			connectionType: 'composition',
			cardinality: 1
		},
		"ChiFeature": {
			label: "is refined by",
			invert: true,
			invertBackendRelation: true,
			connectionType: 'realization',
			cardinality: 1
		},
		"ChiController": {
			label: "refined by",
			invert: false,
			connectionType: 'composition',
			cardinality: -1
		}
	};
}

Ext.extend(cwm.ChiBusinessUseCaseClass, uwm.model.ModelClass);

cwm.ChiBusinessUseCaseClass.prototype.getPropertyForm = function(modelNode, isLockedByOtherUser) {
	return new uwm.property.PropertyForm({		
			items: [new uwm.property.TextField({
			fieldLabel: 'Name',
			toolTip: "the name of this object.",
			name: 'Name',
			modelNode: modelNode,
			readOnly: isLockedByOtherUser
		}), new uwm.property.HtmlEditor({
			fieldLabel: 'Notes',
			toolTip: "the actual description of the object.",
			name: 'Notes',
			modelNode: modelNode,
			readOnly: isLockedByOtherUser
		}), new uwm.property.ComboBox({
			fieldLabel: 'PrimaryActor',
			toolTip: "the main actor of this use case",
			name: 'PrimaryActor',
			listType: "ChiWorkerExternal,ChiWorkerInternal,ChiWorker,ChiBusinessPartner,ChiBusinessPartnerActive,ChiBusinessPartnerPassive",
			modelNode: modelNode,
			disabled : isLockedByOtherUser
		}), new uwm.property.ComboBox({
			fieldLabel: 'OtherActors',
			toolTip: "The list of actors associated with the use case. Although this information is contained in the use case itself, it helps to increase the understandability of the use case when the diagram is unavailable.",
			name: 'OtherActors',
			listType: "ChiWorkerExternal,ChiWorkerInternal,ChiWorker,ChiBusinessPartner,ChiBusinessPartnerActive,ChiBusinessPartnerPassive",
			modelNode: modelNode,
			disabled: isLockedByOtherUser,
	    }), new uwm.property.TextField({
			fieldLabel: 'GoalInContext',
			toolTip: "The goal should implicitly express the actor's intent or purpose of the use case, such as *Enrol Student in Seminar.*",
			name: 'GoalInContext',
			modelNode: modelNode,
			readOnly: isLockedByOtherUser
		}), new uwm.property.TextField({
			fieldLabel: 'Scope',
			toolTip: "Boundaries in which the use case is operated when invoked (E.g. CMS)",
			name: 'Scope',
			modelNode: modelNode,
			readOnly: isLockedByOtherUser
		}), new uwm.property.TextField({
			fieldLabel: 'Level',
			toolTip: "Authorizations for operations/actions to be performed against the Chi business objects in scope. Against every object/process 4 CRUD basic operations are possible: Create (Write), Read (Open), Update (Change), Delete  (Destroy)",
			name: 'Level',
			modelNode: modelNode,
			readOnly: isLockedByOtherUser
		}), new uwm.property.TextField({
			fieldLabel: 'Stakeholders',
			toolTip: "List of actors that have a special interest (i.e. to be informed every time) in completion of the use case",
			name: 'Stakeholders',
			modelNode: modelNode,
			readOnly: isLockedByOtherUser
		}), new uwm.property.TextField({
			fieldLabel: 'Precondition',
			toolTip: "A list of the conditions, if any, that must be met before a use case may be invoked. Can be a previous Use case or self the presence of the system in Scope.",
			name: 'Precondition',
			modelNode: modelNode,
			readOnly: isLockedByOtherUser
		}), new uwm.property.TextField({
			fieldLabel: 'Trigger',
			toolTip: "Event that is responsible for invocation of the use case.",
			name: 'Trigger',
			modelNode: modelNode,
			readOnly: isLockedByOtherUser
		}), new uwm.property.TextField({
			fieldLabel: 'MainSuccessScenario',
			toolTip: "The main path of logic an actor follows through a use case. Often referred to as the *happy path* or the *main path* because it describes how the use case works when everything works as it normally should.",
			name: 'MainSuccessScenario',
			modelNode: modelNode,
			readOnly: isLockedByOtherUser
		}), new uwm.property.TextField({
			fieldLabel: 'Extensions',
			toolTip: "Extensions",
			name: 'Extensions',
			modelNode: modelNode,
			readOnly: isLockedByOtherUser
		}), new uwm.property.TextField({
			fieldLabel: 'Alias',
			toolTip: "the Project Id of this object.",
			name: 'Alias',
			modelNode: modelNode,
			readOnly: isLockedByOtherUser
		}), new uwm.property.TextField({
			fieldLabel: 'Version',
			toolTip: "the model version of this object",
			name: 'Version',
			modelNode: modelNode,
			readOnly: isLockedByOtherUser
		}), new uwm.property.ComboBox({
			fieldLabel: 'Author',
			toolTip: "This ChiBusinessUseCaseCore's author's name and role in the project",
			name: 'Author',
			listType: "ChiAuthors",
			modelNode: modelNode,
			disabled : isLockedByOtherUser
		}), new uwm.property.ComboBox({
			fieldLabel: 'Status',
			toolTip: "state",
			name: 'Status',
			listType: "ChiBaseStatus",
			modelNode: modelNode,
			disabled : isLockedByOtherUser
		}), new uwm.property.TextField({
			fieldLabel: 'created',
			toolTip: "the creation date of this object",
			name: 'created',
			modelNode: modelNode,
			readOnly: true
		}), new uwm.property.TextField({
			fieldLabel: 'creator',
			toolTip: "the user that created this object",
			name: 'creator',
			modelNode: modelNode,
			readOnly: true
		}), new uwm.property.TextField({
			fieldLabel: 'last_editor',
			toolTip: "the last user that edited this object",
			name: 'last_editor',
			modelNode: modelNode,
			readOnly: true
		}), new uwm.property.TextField({
			fieldLabel: 'modified',
			toolTip: "the date when this object was modified",
			name: 'modified',
			modelNode: modelNode,
			readOnly: true
		})]
	});
}

cwm.ChiBusinessUseCaseClass.prototype.getGraphics = function(label, figure) {
	return new uwm.graphics.figure.ImageLabelCenterFigure(label, figure, "../application/images/ChiBusinessUseCase.PNG", this.initialWidth, this.initialHeight, this.initialWidth, this.initialHeight);
}


uwm.model.ModelNodeClassContainer.getInstance().registerClass(new cwm.ChiBusinessUseCaseClass());

