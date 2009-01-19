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
	this.description = " A Business Use Case is part of a business process that produces an advantage to the enterprise.";
	this.helpUrl = "help/index.html#ChiBusinessUseCase|outline";
	this.defaultLabel = "New ChiBusinessUseCase";
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
			label: "associates",
			invert: false,
			connectionType: 'association'
		},
		"ChiBusinessProcess": {
			label: "Contains",
			invert: true,
			connectionType: 'composition'
		}
	};
}

Ext.extend(cwm.ChiBusinessUseCaseClass, uwm.model.ModelClass);

cwm.ChiBusinessUseCaseClass.prototype.getPropertyForm = function(modelNode) {
	return new uwm.property.PropertyForm({
		items: [new uwm.property.ComboBox({
			fieldLabel: 'PrimaryActor',
			name: 'PrimaryActor',
			listType: "",
			modelNode: modelNode,
		}), new uwm.property.TextField({
			fieldLabel: 'OtherActors',
			name: 'OtherActors',
			modelNode: modelNode,
		}), new uwm.property.TextField({
			fieldLabel: 'GoalInContext',
			name: 'GoalInContext',
			modelNode: modelNode,
		}), new uwm.property.TextField({
			fieldLabel: 'Scope',
			name: 'Scope',
			modelNode: modelNode,
		}), new uwm.property.TextField({
			fieldLabel: 'Level',
			name: 'Level',
			modelNode: modelNode,
		}), new uwm.property.TextField({
			fieldLabel: 'Stakeholders',
			name: 'Stakeholders',
			modelNode: modelNode,
		}), new uwm.property.TextField({
			fieldLabel: 'Precondition',
			name: 'Precondition',
			modelNode: modelNode,
		}), new uwm.property.TextField({
			fieldLabel: 'Trigger',
			name: 'Trigger',
			modelNode: modelNode,
		}), new uwm.property.TextField({
			fieldLabel: 'MainSuccessScenario',
			name: 'MainSuccessScenario',
			modelNode: modelNode,
		}), new uwm.property.TextField({
			fieldLabel: 'Extensions',
			name: 'Extensions',
			modelNode: modelNode,
		}), new uwm.property.TextField({
			fieldLabel: 'Alias',
			name: 'Alias',
			modelNode: modelNode,
		}), new uwm.property.TextField({
			fieldLabel: 'Version',
			name: 'Version',
			modelNode: modelNode,
		}), new uwm.property.TextField({
			fieldLabel: 'Name',
			name: 'Name',
			modelNode: modelNode,
		}), new uwm.property.HtmlEditor({
			fieldLabel: 'Notes',
			name: 'Notes',
			modelNode: modelNode,
		}), new uwm.property.TextField({
			fieldLabel: 'created',
			name: 'created',
			modelNode: modelNode,
			readOnly: true
		}), new uwm.property.TextField({
			fieldLabel: 'creator',
			name: 'creator',
			modelNode: modelNode,
			readOnly: true
		}), new uwm.property.TextField({
			fieldLabel: 'last_editor',
			name: 'last_editor',
			modelNode: modelNode,
			readOnly: true
		}), new uwm.property.TextField({
			fieldLabel: 'modified',
			name: 'modified',
			modelNode: modelNode,
			readOnly: true
		})]
	});
}

cwm.ChiBusinessUseCaseClass.prototype.getGraphics = function(label, figure) {
	return new uwm.graphics.figure.ImageFigure(label, figure, "../application/images/ChiBusinessUseCase.PNG", 96, 95, 96, 95);
}


uwm.model.ModelNodeClassContainer.getInstance().registerClass(new cwm.ChiBusinessUseCaseClass());

