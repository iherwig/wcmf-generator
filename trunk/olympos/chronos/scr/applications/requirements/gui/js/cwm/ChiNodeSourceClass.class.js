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

cwm.ChiNodeSourceClass = function() {
	cwm.ChiNodeSourceClass.superclass.constructor.call(this);
	
	this.uwmClassName = "ChiNodeSource";
	this.instanceClassName = "cwm.ChiNodeSource";
	this.treeIcon = "FigureChiNodeSource";
	this.figureIcon = "FigureChiNodeSource";
	this.figureClass = "uwm.graphics.figure.RectangleFigure";
	this.description = " A Domain Object type used in Chronos. ChiNodes and ChiValues define the application data model.";
	this.helpUrl = "help/index.html#ChiNodeSource|outline";
	this.defaultLabel = "New ChiNodeSource";
	this.labelProperties = {
		Name: true
	};

	this.gridTabIconClass = "ChiNodeSourceTab";
	this.gridTabTip = "Shows all <b>ChiNodeSource</b> within selected scope";
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
			
		
		"ChiValue": {
			label: "has properties",
			invert: true,
			connectionType: 'aggregation'
		}		,				
		"NMChiNodeChiNode": {
			label: "",
			invert: true,
			connectionType: 'aggregation'
		}		,				
		"NMChiNodeChiNode": {
			label: "",
			invert: true,
			connectionType: 'aggregation'
		}		,				
		"Figure": {
			label: "",
			invert: true,
			connectionType: 'aggregation'
		}					, 								"ChiController": {
			label: "instantiates",
			invert: true,
			connectionType:  'association'
		}
	
		,					"Package": {
			label: "",
			invert: true,
			connectionType:  'association'
		}
	

	};
}

Ext.extend(cwm.ChiNodeSourceClass, uwm.model.ModelClass);

cwm.ChiNodeSourceClass.prototype.getPropertyForm = function(modelNode) {
	return new uwm.ui.PropertyForm({
		items: [	,	,	,	new uwm.ui.TextField({
fieldLabel: 'display_value',
			name: 'display_value',
			modelNode: modelNode,
			readOnly: true		}) 
,	new uwm.ui.TextField({
fieldLabel: 'parent_order',
			name: 'parent_order',
			modelNode: modelNode,
			readOnly: true		}) 
,	new uwm.ui.TextField({
fieldLabel: 'child_order',
			name: 'child_order',
			modelNode: modelNode,
			readOnly: true		}) 
,	new uwm.ui.TextField({
fieldLabel: 'pk_name',
			name: 'pk_name',
			modelNode: modelNode,
			readOnly: true		}) 
,	new uwm.ui.TextField({
fieldLabel: 'is_searchable',
			name: 'is_searchable',
			modelNode: modelNode,
			readOnly: true		}) 
,	new uwm.ui.TextField({
fieldLabel: 'orderby',
			name: 'orderby',
			modelNode: modelNode,
			readOnly: true		}) 
,	new uwm.ui.TextField({
fieldLabel: 'is_soap',
			name: 'is_soap',
			modelNode: modelNode,
			readOnly: true		}) 
,	new uwm.ui.TextField({
fieldLabel: 'initparams',
			name: 'initparams',
			modelNode: modelNode,
			readOnly: true		}) 
,	new uwm.ui.TextField({
fieldLabel: 'table_name',
			name: 'table_name',
			modelNode: modelNode,
		}) 
,	new uwm.ui.TextField({
fieldLabel: 'is_ordered',
			name: 'is_ordered',
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

cwm.ChiNodeSourceClass.prototype.getGraphics = function(label, figure) {
	return new uwm.graphics.figure.ImageFigure(label, figure, "../application/images/ChiNodeSource.PNG", 96, 95, 96, 95);
}

uwm.model.ModelNodeClassContainer.getInstance().registerClass(new cwm.ChiNodeSourceClass());

	