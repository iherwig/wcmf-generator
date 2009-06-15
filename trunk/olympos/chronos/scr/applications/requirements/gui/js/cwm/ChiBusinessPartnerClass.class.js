/*
 *  This file was generated by wCMFGenerator 3.0.0 from src/requirements.uml on Mon Jan 12 18:10:07 CET 2009. 
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

cwm.ChiBusinessPartnerClass = function() {
	cwm.ChiBusinessPartnerClass.superclass.constructor.call(this);
	
	this.uwmClassName = "ChiBusinessPartner";
	this.instanceClassName = "cwm.ChiBusinessPartner";
	this.treeIcon = "FigureChiBusinessPartner";
	this.figureIcon = "FigureChiBusinessPartner";
	this.figureClass = "uwm.graphics.figure.RectangleFigure";
	this.initialWidth = 26;
	this.initialHeight = 52;
	this.description = " A ChiBusinesPartner is an external person that has a Business relation with the enterprise.";
	this.helpUrl = "help/index.html#ChiBusinessPartner|outline";
	this.defaultLabel = "New ChiBusinessPartner";
	this.semanticGroup = "UseCases";
	this.labelProperties = {
		Name: true
	};

	this.gridTabIconClass = "ChiBusinessPartnerTab";
	this.gridTabTip = "Shows all <b>ChiBusinessPartner</b> within selected scope";
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
		
		"ChiBusinessPartner": {
			label: "",
			invert: false,
			invertBackendRelation: false,
			connectionType: 'generalization',
			cardinality: 1
		},
		"ChiBusinessPartnerActive": {
			label: "",
			invert: false,
			connectionType: 'generalization',
			cardinality: -1
		},
		"ChiBusinessPartnerPassive": {
			label: "",
			invert: false,
			connectionType: 'generalization',
			cardinality: -1
		},

		"ChiBusinessUseCase": {
			label: "participates in",
			invert: false,
			connectionType: 'association',
			cardinality: -1
		},
		"ChiBusinessUseCaseCore": {
			label: "participates in",
			invert: false,
			connectionType: 'association',
			cardinality: -1
		}
	};
}

Ext.extend(cwm.ChiBusinessPartnerClass, uwm.model.ModelClass);

cwm.ChiBusinessPartnerClass.prototype.getPropertyForm = function(modelNode, isLockedByOtherUser) {
	return new uwm.property.PropertyForm({
		items: [new uwm.property.TextField({
			fieldLabel: 'Name',
			name: 'Name',
			modelNode: modelNode,
			readOnly: isLockedByOtherUser
		}) ,	new uwm.property.HtmlEditor({
			fieldLabel: 'Notes',
			name: 'Notes',
			modelNode: modelNode,
			readOnly: isLockedByOtherUser
		}) ,	new uwm.property.TextField({
			fieldLabel: 'Alias',
			name: 'Alias',
			modelNode: modelNode,
			readOnly: isLockedByOtherUser
		}) ,	new uwm.property.TextField({
			fieldLabel: 'Version',
			name: 'Version',
			modelNode: modelNode,
			readOnly: isLockedByOtherUser
		}) , new uwm.property.ComboBox({
			fieldLabel: 'Author',
			toolTip: "This ChiBusinessPartner's author's name and role in the project",
			name: 'Author',
			listType: "ChiAuthors",
			modelNode: modelNode,
			disabled : isLockedByOtherUser
		}), new uwm.property.ComboBox({
			fieldLabel: 'Status',
			toolTip: "state",
			name: 'Status',
			listType: "ChiStatus",
			modelNode: modelNode,
			disabled : isLockedByOtherUser
		}),	new uwm.property.TextField({
			fieldLabel: 'created',
			name: 'created',
			modelNode: modelNode,
			readOnly: true		
		}) ,	new uwm.property.TextField({
			fieldLabel: 'creator',
			name: 'creator',
			modelNode: modelNode,
			readOnly: true		
		}) ,	new uwm.property.TextField({
			fieldLabel: 'last_editor',
			name: 'last_editor',
			modelNode: modelNode,
			readOnly: true		
		}) ,	new uwm.property.TextField({
			fieldLabel: 'modified',
			name: 'modified',
			modelNode: modelNode,
			readOnly: true		}) 
]
	});
}

cwm.ChiBusinessPartnerClass.prototype.getGraphics = function(label, figure) {
	return new uwm.graphics.figure.ImageFigure(label, figure, "../application/images/ChiBusinessPartner.png", this.initialWidth, this.initialHeight, this.initialWidth, this.initialHeight);
}

uwm.model.ModelNodeClassContainer.getInstance().registerClass(new cwm.ChiBusinessPartnerClass());

	