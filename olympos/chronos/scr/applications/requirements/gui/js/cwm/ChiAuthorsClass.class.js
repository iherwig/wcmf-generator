/*
 *  This file was generated by wCMFGenerator 3.0.0 from src/requirements.uml on Mon Jan 12 18:10:08 CET 2009. 
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

cwm.ChiAuthorsClass = function() {
	cwm.ChiAuthorsClass.superclass.constructor.call(this);
	
	this.uwmClassName = "ChiAuthors";
	this.instanceClassName = "cwm.ChiAuthors";
	this.treeIcon = "FigureChiAuthors";
	this.figureIcon = "FigureChiAuthors";
	this.figureClass = "uwm.graphics.figure.RectangleFigure";
	this.description = " This class host all the actors actively involved in the project.";
	this.helpUrl = "help/index.html#ChiAuthors|outline";
	this.defaultLabel = "New ChiAuthors";
	this.labelProperties = {
		Name: true
	};

	this.gridTabIconClass = "ChiAuthorsTab";
	this.gridTabTip = "Shows all <b>ChiAuthors</b> within selected scope";
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
			
			, 			
	};
}

Ext.extend(cwm.ChiAuthorsClass, uwm.model.ModelClass);

cwm.ChiAuthorsClass.prototype.getPropertyForm = function(modelNode) {
	return new uwm.ui.PropertyForm({
		items: [	,	new uwm.ui.TextField({
fieldLabel: 'Role',
			name: 'Role',
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

cwm.ChiAuthorsClass.prototype.getGraphics = function(label, figure) {
	return new uwm.graphics.figure.ImageFigure(label, figure, "../application/images/ChiAuthors.PNG", 96, 95, 96, 95);
}

uwm.model.ModelNodeClassContainer.getInstance().registerClass(new cwm.ChiAuthorsClass());

	