/*
 * Copyright (c) 2008 The Olympos Development Team.
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
	this.figureIcon = "FigureChiGoal";
	this.figureClass = "uwm.graphics.figure.RectangleFigure";
	this.description = "Goal Description";
	this.helpUrl = "help/index.html#4.1.Goal|outline";
	this.defaultLabel = "New Goal";
	this.labelProperties = {
		Name: true
	};
	
	this.gridTabIconClass = "ChiGoalTab";
	this.gridTabTip = "Shows all <b>Goals</b> within selected scope";
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
			label: "depends on",
			invert: false,
			connectionType: "specialization"
		},
		"ChiRequirement": {
			label: "specified by",
			invert: false,
			connectionType: "composition"
		}
	}
}

Ext.extend(cwm.ChiGoalClass, uwm.model.ModelClass);

cwm.ChiGoalClass.prototype.getPropertyForm = function(modelNode) {
	return new uwm.property.PropertyForm({
		items: [new uwm.property.TextField({
			fieldLabel: 'Priority',
			name: 'Priority',
			toolTip: "This is the tooltip for priority. It is quite long.",
			modelNode: modelNode
		}), new uwm.property.TextField({
			fieldLabel: 'Value_Name',
			name: 'Value_Name',
			modelNode: modelNode
		}), new uwm.property.TextField({
			fieldLabel: 'Value_ammount',
			name: 'Value_ammount',
			modelNode: modelNode
		}), new uwm.property.TextField({
			fieldLabel: 'Value_Goal',
			name: 'Value_Goal',
			modelNode: modelNode
		}), new uwm.property.TextField({
			fieldLabel: 'Alias',
			name: 'Alias',
			modelNode: modelNode
		}), new uwm.property.TextField({
			fieldLabel: 'Version',
			name: 'Version',
			modelNode: modelNode
		}), new uwm.property.TextField({
			fieldLabel: 'Name',
			name: 'Name',
			modelNode: modelNode
		}), new uwm.property.HtmlEditor({
			fieldLabel: 'Notes',
			name: 'Notes',
			toolTip: "Notes is the ultimate E-Mail and workflow platform.",
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
			readOnly: true
		}), new uwm.property.TextField({
			fieldLabel: 'modified',
			name: 'modified',
			modelNode: modelNode,
			readOnly: true
		})]
	});
}

uwm.model.ModelNodeClassContainer.getInstance().registerClass(new cwm.ChiGoalClass());
