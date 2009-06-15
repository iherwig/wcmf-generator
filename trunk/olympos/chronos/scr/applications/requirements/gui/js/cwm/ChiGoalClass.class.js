/*
 *  This file was generated by wCMFGenerator 3.0.0002 from ./model/cwm.uml on Thu Feb 05 13:16:12 CET 2009.
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

cwm.ChiGoalClass = function() {
	cwm.ChiGoalClass.superclass.constructor.call(this);
	
	this.uwmClassName = "ChiGoal";
	this.instanceClassName = "cwm.ChiGoal";
	this.treeIcon = "FigureChiGoal";
	this.figureIcon = "ChiGoalTab";
	this.figureClass = "uwm.graphics.figure.RectangleFigure";
	this.initialWidth = 150;
	this.initialHeight = 50;
	this.description = " a Measurable scope that the enterprise wants to achieve. ";
	this.helpUrl = "help/index.html#ChiGoal|outline";
	this.defaultLabel = "New ChiGoal";
	this.semanticGroup = "requirements";
	this.labelProperties = {
		Name: true
	};
	
	this.gridTabIconClass = "ChiGoalTab";
	this.gridTabTip = "Shows all <b>ChiGoal</b> within selected scope";
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
		"ChiGoal": {
			label: "contains",
			invert: false,
			connectionType: 'composition',
			cardinality: -1
		},
		
		"ChiRequirement": {
			label: "is specified by",
			invert: false,
			connectionType: 'composition',
			cardinality: -1
		}
	
	};
}

Ext.extend(cwm.ChiGoalClass, uwm.model.ModelClass);

cwm.ChiGoalClass.prototype.getPropertyForm = function(modelNode, isLockedByOtherUser) {
	return new uwm.property.PropertyForm({
		items: [new uwm.property.TextField({
			fieldLabel: 'Name',
			toolTip: "the name of this object",
			name: 'Name',
			
			modelNode: modelNode,
			
			readOnly: isLockedByOtherUser
		}), new uwm.property.HtmlEditor({
			fieldLabel: 'Notes',
			toolTip: "the actual description of the object.",
			name: 'Notes',
			
			modelNode: modelNode,
			
			readOnly: isLockedByOtherUser
		}), new uwm.property.NumberField({
			fieldLabel: 'Priority',
			toolTip: "A priority in %",
			name: 'Priority',
			allowDecimals: false,
			allowNegative: false,
			minValue: 0,
			maxValue: 100,
			modelNode: modelNode,
			readOnly: isLockedByOtherUser
		}), new uwm.property.NumberField({
			fieldLabel: 'Value_ammount',
			toolTip: "The actual amount of the value this goal intends to alter.",
			name: 'Value_ammount',
			allowDecimals: false,
			allowNegative: false,
			modelNode: modelNode,
			
			readOnly: isLockedByOtherUser
		}), new uwm.property.NumberField({
			fieldLabel: 'Value_Goal',
			toolTip: "The amount by which the value is to be altered.",
			name: 'Value_Goal',
			allowDecimals: false,
			allowNegative: false,
			modelNode: modelNode,
			
			readOnly: isLockedByOtherUser
		}), new uwm.property.TextField({
			fieldLabel: 'Value_Name',
			toolTip: "The name of the value this goal intends to alter.",
			name: 'Value_Name',
			
			modelNode: modelNode,
			
			readOnly: isLockedByOtherUser
		}), new uwm.property.ComboBox({
			fieldLabel: 'GoalType',
			toolTip: "",
			name: 'GoalType',
			listType: "ChiGoalType",
			modelNode: modelNode,
			disabled: isLockedByOtherUser
		}), new uwm.property.TextField({
			fieldLabel: 'Alias',
			toolTip: "the Project Id of this object.",
			name: 'Alias',
			
			modelNode: modelNode,
			
			readOnly: isLockedByOtherUser
		}), new uwm.property.TextField({
			fieldLabel: 'Version',
			toolTip: "the model version of this object",
			name: 'Version',
			
			modelNode: modelNode,
			
			readOnly: isLockedByOtherUser
		}), new uwm.property.ComboBox({
			fieldLabel: 'Author',
			toolTip: "This ChiGoal's author's name and role in the project",
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
		}), new uwm.property.TextField({
			fieldLabel: 'created',
			toolTip: "the creation date of this object",
			name: 'created',
			
			modelNode: modelNode,
			
			readOnly: true
		}), new uwm.property.TextField({
			fieldLabel: 'creator',
			toolTip: "the user that created this object",
			name: 'creator',
			
			modelNode: modelNode,
			
			readOnly: true
		}), new uwm.property.TextField({
			fieldLabel: 'last_editor',
			toolTip: "the last user that edited this object",
			name: 'last_editor',
			
			modelNode: modelNode,
			
			readOnly: true
		}), new uwm.property.TextField({
			fieldLabel: 'modified',
			toolTip: "the date when this object was modified",
			name: 'modified',
			
			modelNode: modelNode,
			
			readOnly: true
		})]
	});
}

uwm.model.ModelNodeClassContainer.getInstance().registerClass(new cwm.ChiGoalClass());
