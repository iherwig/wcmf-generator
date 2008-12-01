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

cwm.ChiRequirementClass = function() {
	uwm.model.ModelNodeClass.call(this);
	
	this.uwmClassName = "ChiRequirement";
	this.instanceClassName = "cwm.ChiRequirement";
	this.treeIcon = "FigureChiRequirement";
	this.figureIcon = "FigureChiRequirement";
	this.figureClass = "uwm.graphics.figure.RectangleFigure";
	this.description = "Requirement Description";
	this.defaultLabel = "New Requirement";
	
	this.connectionInfo = {
		"ChiFeature": {
			label: "realized by",
			invert: false,
			connectionType: "association"
		},
		"ChiIssue": {
			label: "contradiced by",
			invert: false,
			connectionType: "association"
		},
		"ChiGoal": {
			label: "specified by",
			invert: true,
			connectionType: "composition"
		}
	};
}

cwm.ChiRequirementClass.prototype = new uwm.model.ModelClass;

cwm.ChiRequirementClass.prototype.getPropertyForm = function() {
	return new uwm.ui.PropertyForm({
		items: [new Ext.form.ComboBox({
			fieldLabel: 'reqType',
			name: 'reqType'
		}), {
			fieldLabel: 'Priority',
			name: 'Priority'
		}, new Ext.form.ComboBox({
			fieldLabel: 'Author',
			name: 'Author'
		}), new Ext.form.ComboBox({
			fieldLabel: 'Proofreader',
			name: 'Proofreader'
		}), new Ext.form.ComboBox({
			fieldLabel: 'Status',
			name: 'Status'
		}), {
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

cwm.ChiRequirementClass.prototype.clearPropertiesForm = function(form) {
	var realForm = form.getForm();
	
	realForm.findField("reqType").setValue("");
	realForm.findField("Priority").setValue("");
	realForm.findField("Author").setValue("");
	realForm.findField("Proofreader").setValue("");
	realForm.findField("Status").setValue("");
	realForm.findField("Alias").setValue("");
	realForm.findField("Version").setValue("");
	realForm.findField("Name").setValue("");
	realForm.findField("Notes").setValue("");
	realForm.findField("created").setValue("");
	realForm.findField("creator").setValue("");
	realForm.findField("last_editor").setValue("");
	realForm.findField("modified").setValue("");
}

uwm.Session.getInstance().getModelNodeClassContainer().registerClass(new cwm.ChiRequirementClass());
