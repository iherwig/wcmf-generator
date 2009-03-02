/*
 *  This file was generated by wCMFGenerator 3.0.0 from src/requirements.uml on Mon Jan 12 18:09:58 CET 2009. 
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

cwm.ChiBusinessProcessClass = function() {
	cwm.ChiBusinessProcessClass.superclass.constructor.call(this);
	
	this.uwmClassName = "ChiBusinessProcess";
	this.instanceClassName = "cwm.ChiBusinessProcess";
	this.treeIcon = "FigureChiBusinessProcess";
	this.figureIcon = "ChiBusinessProcessTab";
	this.figureClass = "uwm.graphics.figure.RectangleFigure";
	this.initialWidth = 150;
	this.initialHeight = 50;
	this.description = " A Business Process is a sum of actions that produces a business advantage to the enterprise. It is composed by one or many ChiBusinessUseCases.";
	this.helpUrl = "help/index.html#4.5.ChiBusinessProcess|outline";
	this.defaultLabel = "New ChiBusinessProcess";
	this.semanticGroup = "UseCases";
	this.labelProperties = {
		Name: true
	};

	this.gridTabIconClass = "ChiBusinessProcessTab";
	this.gridTabTip = "Shows all <b>ChiBusinessProcess</b> within selected scope";
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
		
		"ChiBusinessUseCase": {
			label: "Contains",
			invert: false,
			connectionType: 'composition'
		},
		"ChiBusinessUseCaseCore": {
			label: "Contains",
			invert: false,
			connectionType: 'composition'
		},
		"ChiFeature": {
			label: "associates",
			invert: true,
			connectionType: 'associationType'
		}
	};
}

Ext.extend(cwm.ChiBusinessProcessClass, uwm.model.ModelClass);

cwm.ChiBusinessProcessClass.prototype.getPropertyForm = function(modelNode, isLockedByOtherUser) {
	return new uwm.property.PropertyForm({
		items: [new uwm.property.TextField({
			fieldLabel: 'Alias',
			toolTip: "the Project Id of this object.",
			name: 'Alias',
			modelNode: modelNode,
			readOnly: isLockedByOtherUser
		}) ,	new uwm.property.TextField({
			fieldLabel: 'Version',
			toolTip: "the model version of this object",
			name: 'Version',
			modelNode: modelNode,
			readOnly: isLockedByOtherUser
		}) ,	new uwm.property.TextField({
			fieldLabel: 'Name',
			toolTip: "the name of this object.",
			name: 'Name',
			modelNode: modelNode,
			readOnly: isLockedByOtherUser
		}) ,	new uwm.property.HtmlEditor({
			fieldLabel: 'Notes',
			toolTip: "the actual description of the object.",
			name: 'Notes',
			modelNode: modelNode,
			readOnly: isLockedByOtherUser
		}) ,	new uwm.property.TextField({
			fieldLabel: 'created',
			toolTip: "the creation date of this object",
			name: 'created',
			modelNode: modelNode,
			readOnly: true		
		}) ,	new uwm.property.TextField({
			fieldLabel: 'creator',
			toolTip: "the user that created this object",
			name: 'creator',
			modelNode: modelNode,
			readOnly: true		
		}) ,	new uwm.property.TextField({
			fieldLabel: 'last_editor',
			toolTip: "the last user that edited this object",
			name: 'last_editor',
			modelNode: modelNode,
			readOnly: true		
		}) ,	new uwm.property.TextField({
			fieldLabel: 'modified',
			toolTip: "the date when this object was modified",
			name: 'modified',
			modelNode: modelNode,
			readOnly: true		
		}) 
]
	});
}

uwm.model.ModelNodeClassContainer.getInstance().registerClass(new cwm.ChiBusinessProcessClass());

	