/*
 *  This file was generated by wCMFGenerator 3.0.0 from src/requirements.uml on Mon Jan 12 18:10:01 CET 2009. 
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

cwm.ChiBusinessPartnerActiveClass = function() {
	cwm.ChiBusinessPartnerActiveClass.superclass.constructor.call(this);
	
	this.uwmClassName = "ChiBusinessPartnerActive";
	this.instanceClassName = "cwm.ChiBusinessPartnerActive";
	this.treeIcon = "FigureChiBusinessPartnerActive";
	this.figureIcon = "FigureChiBusinessPartnerActive";
	this.figureClass = "uwm.graphics.figure.RectangleFigure";
	this.description = " A ChiBusinesPartnerActive is a direct customer of the enterprise.";
	this.helpUrl = "help/index.html#ChiBusinessPartnerActive|outline";
	this.defaultLabel = "New ChiBusinessPartnerActive";
	this.labelProperties = {
		Name: true
	};

	this.gridTabIconClass = "ChiBusinessPartnerActiveTab";
	this.gridTabTip = "Shows all <b>ChiBusinessPartnerActive</b> within selected scope";
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
			
		
		"NMUCActor": {
			label: "",
			invert: true,
			connectionType: 'aggregation'
		}					, 			
	};
}

Ext.extend(cwm.ChiBusinessPartnerActiveClass, uwm.model.ModelClass);

cwm.ChiBusinessPartnerActiveClass.prototype.getPropertyForm = function(modelNode) {
	return new uwm.ui.PropertyForm({
		items: [	,	new uwm.ui.TextField({
fieldLabel: 'Alias',
			name: 'Alias',
			modelNode: modelNode,
		}) 
,	new uwm.ui.TextField({
fieldLabel: 'Version',
			name: 'Version',
			modelNode: modelNode,
		}) 
,	new uwm.ui.TextField({
fieldLabel: 'Name',
			name: 'Name',
			modelNode: modelNode,
		}) 
,	new uwm.ui.HtmlEditor({
fieldLabel: 'Notes',
			name: 'Notes',
			modelNode: modelNode,
		}) 
,	new uwm.ui.TextField({
fieldLabel: 'created',
			name: 'created',
			modelNode: modelNode,
			readOnly: true		}) 
,	new uwm.ui.TextField({
fieldLabel: 'creator',
			name: 'creator',
			modelNode: modelNode,
			readOnly: true		}) 
,	new uwm.ui.TextField({
fieldLabel: 'last_editor',
			name: 'last_editor',
			modelNode: modelNode,
			readOnly: true		}) 
,	new uwm.ui.TextField({
fieldLabel: 'modified',
			name: 'modified',
			modelNode: modelNode,
			readOnly: true		}) 
]
	});
}

cwm.ChiBusinessPartnerActiveClass.prototype.getGraphics = function(label, figure) {
	return new uwm.graphics.figure.ImageFigure(label, figure, "../application/images/ChiBusinessPartnerActive.PNG", 96, 95, 96, 95);
}

uwm.model.ModelNodeClassContainer.getInstance().registerClass(new cwm.ChiBusinessPartnerActiveClass());

	