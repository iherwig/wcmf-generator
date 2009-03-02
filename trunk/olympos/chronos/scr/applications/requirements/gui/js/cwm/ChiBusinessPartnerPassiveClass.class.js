/*
 *  This file was generated by wCMFGenerator 3.0.0 from src/requirements.uml on Mon Jan 12 18:10:02 CET 2009. 
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

cwm.ChiBusinessPartnerPassiveClass = function() {
	cwm.ChiBusinessPartnerPassiveClass.superclass.constructor.call(this);
	
	this.uwmClassName = "ChiBusinessPartnerPassive";
	this.instanceClassName = "cwm.ChiBusinessPartnerPassive";
	this.treeIcon = "FigureChiBusinessPartnerPassive";
	this.figureIcon = "FigureChiBusinessPartnerPassive";
	this.figureClass = "uwm.graphics.figure.RectangleFigure";
	this.initialWidth = 24;
	this.initialHeight = 52;
	this.description = " A ChiBusinesPartnerPassive is an indirect customer (typically a supplier) of the enterprise.";
	this.helpUrl = "help/index.html#ChiBusinessPartnerPassive|outline";
	this.defaultLabel = "New ChiBusinessPartnerPassive";
	this.semanticGroup = "UseCases";
	this.labelProperties = {
		Name: true
	};

	this.gridTabIconClass = "ChiBusinessPartnerPassiveTab";
	this.gridTabTip = "Shows all <b>ChiBusinessPartnerPassive</b> within selected scope";
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
	
		"ChiBusinessPartnerPassive": {
			label: "associates",
			invert: true,
			connectionType: 'association'
		},
		"ChiBusinessUseCase": {
			label: "participates in",
			invert: true,
			connectionType: 'association'
		},
		"ChiBusinessUseCaseCore": {
			label: "participates in",
			invert: true,
			connectionType: 'association'
		}				
	};
}

Ext.extend(cwm.ChiBusinessPartnerPassiveClass, uwm.model.ModelClass);

cwm.ChiBusinessPartnerPassiveClass.prototype.getPropertyForm = function(modelNode, isLockedByOtherUser) {
	return new uwm.property.PropertyForm({
		items: [new uwm.property.TextField({
			fieldLabel: 'Alias',
			name: 'Alias',
			modelNode: modelNode,
			readOnly: isLockedByOtherUser
		}) ,	new uwm.property.TextField({
			fieldLabel: 'Version',
			name: 'Version',
			modelNode: modelNode,
			readOnly: isLockedByOtherUser
		}) ,	new uwm.property.TextField({
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
			readOnly: true		
		}) 
		]
	});
}

cwm.ChiBusinessPartnerPassiveClass.prototype.getGraphics = function(label, figure) {
	return new uwm.graphics.figure.ImageFigure(label, figure, "../application/images/ChiBusinessPartnerPassive.png", this.initialWidth, this.initialHeight, this.initialWidth, this.initialHeight);
}

uwm.model.ModelNodeClassContainer.getInstance().registerClass(new cwm.ChiBusinessPartnerPassiveClass());

	