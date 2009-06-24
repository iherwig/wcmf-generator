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

cwm.EntityBaseClass = function() {
	cwm.EntityBaseClass.superclass.constructor.call(this);
	
	this.uwmClassName = "EntityBase";
	this.instanceClassName = "cwm.EntityBase";
	this.treeIcon = "FigureEntityBase";
	this.figureIcon = "FigureEntityBase";
	this.figureClass = "uwm.graphics.figure.RectangleFigure";
	this.description = " ";
	this.helpUrl = "help/index.html#EntityBase|outline";
	this.defaultLabel = "New EntityBase";
	this.labelProperties = {
		Name: true
	};
	
	this.gridTabIconClass = "EntityBaseTab";
	this.gridTabTip = "Shows all <b>EntityBase</b> within selected scope";
	this.gridFields = [{
		name: "oid",
		mapping: "oid"
	}, {
		name: "label",
		mapping: "label"
	}];
	this.gridColumns = [{
		header: "Label",
		dataIndex: "label",
		sortable: true
	}];
	
	this.connectionInfo = {};
}

Ext.extend(cwm.EntityBaseClass, uwm.model.ModelClass);

cwm.EntityBaseClass.prototype.getPropertyForm = function(modelNode) {
	return new uwm.property.PropertyForm({
		items: [new uwm.property.ComboBox({
			fieldLabel: 'Author',
			name: 'Author',
			listType: "ChiAuthors",
			modelNode: modelNode,
		}), new uwm.property.ComboBox({
			fieldLabel: 'Status',
			name: 'Status',
			listType: "ChiStatus",
			modelNode: modelNode,
		}),	new uwm.property.TextField({
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

cwm.EntityBaseClass.prototype.getGraphics = function(label, figure) {
	return new uwm.graphics.figure.ImageFigure(label, figure, "../application/images/EntityBase.PNG", 96, 95, 96, 95);
}

uwm.model.ModelNodeClassContainer.getInstance().registerClass(new cwm.EntityBaseClass());

