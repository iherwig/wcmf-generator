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

cwm.InputTypeClass = function() {
	cwm.InputTypeClass.superclass.constructor.call(this);
	
	this.uwmClassName = "InputType";
	this.instanceClassName = "cwm.InputType";
	this.treeIcon = "FigureInputType";
	this.figureIcon = "FigureInputType";
	this.figureClass = "uwm.graphics.figure.RectangleFigure";
	this.description = " this class hosts all the allowed input types like text, password, textarea, select, radio, checkbox, file, fileex, fckeditor, filebrowser, linkbrowser, date ...";
	this.helpUrl = "help/index.html#InputType|outline";
	this.defaultLabel = "New InputType";
	this.labelProperties = {
		Name: true
	};
	
	this.gridTabIconClass = "InputTypeTab";
	this.gridTabTip = "Shows all <b>InputType</b> within selected scope";
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
	
	this.connectionInfo = {};
}

Ext.extend(cwm.InputTypeClass, uwm.model.ModelClass);

cwm.InputTypeClass.prototype.getPropertyForm = function(modelNode) {
	return new uwm.property.PropertyForm({
		items: [new uwm.property.TextField({
			fieldLabel: 'Name',
			name: 'Name',
			modelNode: modelNode
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

cwm.InputTypeClass.prototype.getGraphics = function(label, figure) {
	return new uwm.graphics.figure.ImageFigure(label, figure, "../application/images/InputType.PNG", 96, 95, 96, 95);
}

uwm.model.ModelNodeClassContainer.getInstance().registerClass(new cwm.InputTypeClass());
