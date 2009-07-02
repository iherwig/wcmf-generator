/*
 *  This file was generated by wCMFGenerator 3.0.0 from src/requirements.uml on Mon Jan 12 18:10:06 CET 2009. 
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

cwm.ActorClass = function() {
	cwm.ActorClass.superclass.constructor.call(this);
	
	this.uwmClassName = "Actor";
	this.instanceClassName = "cwm.Actor";
	this.treeIcon = "FigureActor";
	this.figureIcon = "FigureActor";
	this.figureClass = "uwm.graphics.figure.RectangleFigure";
	this.description = " this class reppresent a generic actor.";
	this.helpUrl = "help/index.html#Actor|outline";
	this.defaultLabel = "New Actor";
	this.labelProperties = {
		Name: true
	};

	this.gridTabIconClass = "ActorTab";
	this.gridTabTip = "Shows all <b>Actor</b> within selected scope";
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
	
	this.connectionInfo = {
	
		"NMUCActor": {
			label: "",
			invert: true,
			connectionType: 'aggregation'
		}				
	};
}

Ext.extend(cwm.ActorClass, uwm.model.ModelClass);

cwm.ActorClass.prototype.getPropertyForm = function(modelNode) {
	return new uwm.property.PropertyForm({
		items: [new uwm.property.TextField({
			fieldLabel: 'Alias',
			name: 'Alias',
			modelNode: modelNode
		}) ,	new uwm.property.TextField({
			fieldLabel: 'Version',
			name: 'Version',
			modelNode: modelNode
		}) ,	new uwm.property.TextField({
			fieldLabel: 'Name',
			name: 'Name',
			modelNode: modelNode
		}) ,	new uwm.property.HtmlEditor({
			fieldLabel: 'Notes',
			name: 'Notes',
			modelNode: modelNode
		}) , new uwm.property.ComboBox({
			fieldLabel: 'Author',
			toolTip: "This actor's author's name and role in the project",
			name: 'Author',
			listType: "ChiAuthors",
			modelNode: modelNode,
			disabled : isLockedByOtherUser
		}), new uwm.property.ComboBox({
			fieldLabel: 'Status',
			toolTip: "",
			name: 'Status',
			listType: "ChiBaseStatus",
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
			readOnly: true		
		}) 
		]
	});
}

cwm.ActorClass.prototype.getGraphics = function(label, figure) {
	return new uwm.graphics.figure.ImageFigure(label, figure, "../application/images/Actor.PNG", 96, 95, 96, 95);
}

uwm.model.ModelNodeClassContainer.getInstance().registerClass(new cwm.ActorClass());

	