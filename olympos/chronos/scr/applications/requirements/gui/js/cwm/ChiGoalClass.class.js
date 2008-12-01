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
	uwm.model.ModelNodeClass.call(this);
	
	this.uwmClassName = "ChiGoal";
	this.instanceClassName = "cwm.ChiGoal";
	this.treeIcon = "FigureChiGoal";
	this.figureIcon = "FigureChiGoal";
	this.figureClass = "uwm.graphics.figure.RectangleFigure";
	this.description = "Goal Description";
	this.defaultLabel = "New Goal";
	
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

cwm.ChiGoalClass.prototype = new uwm.model.ModelClass;

cwm.ChiGoalClass.prototype.getPropertyForm = function() {
	return new uwm.ui.PropertyForm({
		items: [{
			fieldLabel: 'Priority',
			name: 'Priority'
		}, {
			fieldLabel: 'Value_Name',
			name: 'Value_Name'
		}, {
			fieldLabel: 'Value_ammount',
			name: 'Value_ammount'
		}, {
			fieldLabel: 'Value_Goal',
			name: 'Value_Goal'
		}, {
			fieldLabel: 'Alias',
			name: 'Alias'
		}, {
			fieldLabel: 'Version',
			name: 'Version'
		}, {
			fieldLabel: 'Name',
			name: 'Name'
		}, new uwm.ui.HtmlEditor({
			fieldLabel: 'Notes',
			name: 'Notes'
		}), {
			fieldLabel: 'created',
			name: 'created',
			readOnly: true
		}, {
			fieldLabel: 'creator',
			name: 'creator',
			readOnly: true
		}, {
			fieldLabel: 'last_editor',
			name: 'last_editor',
			readOnly: true
		}, {
			fieldLabel: 'modified',
			name: 'modified',
			readOnly: true
		}]
	});
}

cwm.ChiGoalClass.prototype.clearPropertiesForm = function(form) {
	var realForm = form.getForm();
	
	realForm.findField("Priority").setValue("");
	realForm.findField("Value_Name").setValue("");
	realForm.findField("Value_ammount").setValue("");
	realForm.findField("Value_Goal").setValue("");
	realForm.findField("Alias").setValue("");
	realForm.findField("Version").setValue("");
	realForm.findField("Name").setValue("");
	realForm.findField("Notes").setValue("");
	realForm.findField("created").setValue("");
	realForm.findField("creator").setValue("");
	realForm.findField("last_editor").setValue("");
	realForm.findField("modified").setValue("");
}

uwm.Session.getInstance().getModelNodeClassContainer().registerClass(new cwm.ChiGoalClass());
