/*
 *  This file was generated by wCMFGenerator 3.0.0 from src/requirements.uml on Mon Jan 12 18:10:05 CET 2009.
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

cwm.ChiWorkerInternalClass = function() {
	cwm.ChiWorkerInternalClass.superclass.constructor.call(this);
	
	this.uwmClassName = "ChiWorkerInternal";
	this.instanceClassName = "cwm.ChiWorkerInternal";
	this.treeIcon = "FigureChiWorkerInternal";
	this.figureIcon = "FigureChiWorkerInternal";
	this.figureClass = "uwm.graphics.figure.RectangleFigure";
	this.description = " A Chi  Worker Internal is an employee of the enterprise that has no contact with Business partners.";
	this.helpUrl = "help/index.html#ChiWorkerInternal|outline";
	this.defaultLabel = "New ChiWorkerInternal";
	this.semanticGroup = "UseCases";
	this.labelProperties = {
		Name: true
	};
	
	this.gridTabIconClass = "ChiWorkerInternalTab";
	this.gridTabTip = "Shows all <b>ChiWorkerInternal</b> within selected scope";
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
		
		"ChiWorkerInternal": {
			label: "associates",
			invert: true,
			connectionType: 'association'
		},
		"ChiBusinessUseCase": {
			label: "participates in",
			invert: true,
			connectionType: 'association'
		}
	};
}

Ext.extend(cwm.ChiWorkerInternalClass, uwm.model.ModelClass);

cwm.ChiWorkerInternalClass.prototype.getPropertyForm = function(modelNode, isLockedByOtherUser) {
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
			modelNode: modelNode
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

cwm.ChiWorkerInternalClass.prototype.getGraphics = function(label, figure) {
	return new uwm.graphics.figure.ImageFigure(label, figure, "../application/images/ChiWorkerInternal.png", 48,52,48,52);
}

uwm.model.ModelNodeClassContainer.getInstance().registerClass(new cwm.ChiWorkerInternalClass());

