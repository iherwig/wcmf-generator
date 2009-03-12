/*
 *  This file was generated by wCMFGenerator 3.0.0 from src/requirements.uml on Mon Jan 12 18:10:03 CET 2009.
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

cwm.ChiWorkerClass = function() {
	cwm.ChiWorkerClass.superclass.constructor.call(this);
	
	this.uwmClassName = "ChiWorker";
	this.instanceClassName = "cwm.ChiWorker";
	this.treeIcon = "FigureChiWorker";
	this.figureIcon = "FigureChiWorker";
	this.figureClass = "uwm.graphics.figure.RectangleFigure";
	this.initialWidth = 52;
	this.initialHeight = 52;
	this.description = " A ChiWorker is a special actor that works within the enterprise. ";
	this.helpUrl = "help/index.html#ChiWorker|outline";
	this.defaultLabel = "New ChiWorker";
	this.semanticGroup = "UseCases";
	this.labelProperties = {
		Name: true
	};
	
	this.gridTabIconClass = "ChiWorkerTab";
	this.gridTabTip = "Shows all <b>ChiWorker</b> within selected scope";
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

		"ChiWorker": {
			label: "",
			invert: true,
			connectionType: 'generalization',
			cardinality: -1
		},
		"ChiWorkerInternal": {
			label: "",
			invert: true,
			connectionType: 'generalization',
			cardinality: -1
		},
		"ChiWorkerExternal": {
			label: "",
			invert: true,
			connectionType: 'generalization',
			cardinality: -1
		},
		"ChiBusinessUseCase": {
			label: "participates in",
			invert: true,
			connectionType: 'association',
			cardinality: -1
		},
		"ChiBusinessUseCaseCore": {
			label: "participates in",
			invert: true,
			connectionType: 'association',
			cardinality: -1
		}
	};
}

Ext.extend(cwm.ChiWorkerClass, uwm.model.ModelClass);

cwm.ChiWorkerClass.prototype.getPropertyForm = function(modelNode, isLockedByOtherUser) {
	return new uwm.property.PropertyForm({
		items: [new uwm.property.TextField({
			fieldLabel: 'Alias',
			name: 'Alias',
			modelNode: modelNode,
			readOnly: isLockedByOtherUser
		}), new uwm.property.TextField({
			fieldLabel: 'Version',
			name: 'Version',
			modelNode: modelNode,
			readOnly: isLockedByOtherUser
		}), new uwm.property.TextField({
			fieldLabel: 'Name',
			name: 'Name',
			modelNode: modelNode,
			readOnly: isLockedByOtherUser
		}), new uwm.property.HtmlEditor({
			fieldLabel: 'Notes',
			name: 'Notes',
			modelNode: modelNode,
			readOnly: isLockedByOtherUser
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

cwm.ChiWorkerClass.prototype.getGraphics = function(label, figure) {
	return new uwm.graphics.figure.ImageFigure(label, figure, "../application/images/ChiWorker.png", this.initialWidth, this.initialHeight, this.initialWidth, this.initialHeight);
}

uwm.model.ModelNodeClassContainer.getInstance().registerClass(new cwm.ChiWorkerClass());

