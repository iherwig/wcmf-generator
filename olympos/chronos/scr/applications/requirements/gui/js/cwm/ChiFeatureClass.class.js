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

cwm.ChiFeatureClass = function() {
	cwm.ChiFeatureClass.superclass.constructor.call(this);
	
	this.uwmClassName = "ChiFeature";
	this.instanceClassName = "cwm.ChiFeature";
	this.treeIcon = "FigureChiFeature";
	this.figureIcon = "FigureChiFeature";
	this.figureClass = "uwm.graphics.figure.RectangleFigure";
	this.description = " ";
	this.helpUrl = "help/index.html#ChiFeature|outline";
	this.defaultLabel = "New ChiFeature";
	this.labelProperties = {
		Name: true
	};

	this.gridTabIconClass = "ChiFeatureTab";
	this.gridTabTip = "Shows all <b>ChiFeature</b> within selected scope";
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
			
		
		"NMFeatureRequirements": {
			label: "Realizes",
			invert: true,
			connectionType: 'aggregation'
		}		,				
		"Figure": {
			label: "",
			invert: true,
			connectionType: 'aggregation'
		}					, 								"Package": {
			label: "",
			invert: true,
			connectionType:  'association'
		}
	

	};
}

Ext.extend(cwm.ChiFeatureClass, uwm.model.ModelClass);

cwm.ChiFeatureClass.prototype.getPropertyForm = function(modelNode) {
	return new uwm.ui.PropertyForm({
		items: [	,	,	new uwm.ui.ComboBox({
fieldLabel: 'Author',
			name: 'Author',
			modelNode: modelNode,
		}) 
,	new uwm.ui.ComboBox({
fieldLabel: 'Proofreader',
			name: 'Proofreader',
			modelNode: modelNode,
		}) 
,	new uwm.ui.ComboBox({
fieldLabel: 'Status',
			name: 'Status',
			modelNode: modelNode,
		}) 
,	new uwm.ui.TextField({
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

cwm.ChiFeatureClass.prototype.getGraphics = function(label, figure) {
	return new uwm.graphics.figure.ImageFigure(label, figure, "../application/images/ChiFeature.PNG", 96, 95, 96, 95);
}

uwm.model.ModelNodeClassContainer.getInstance().registerClass(new cwm.ChiFeatureClass());

	