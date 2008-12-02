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

cwm.ChiIssueClass = function() {
	uwm.model.ModelNodeClass.call(this);
	
	this.uwmClassName = "ChiIssue";
	this.instanceClassName = "cwm.ChiIssue";
	this.treeIcon = "FigureChiIssue";
	this.figureIcon = "FigureChiIssue";
	this.figureClass = "uwm.graphics.figure.RectangleFigure";
	this.description = "Issue Description";
	this.defaultLabel = "New Goal";
	
	this.connectionInfo = {
		"ChiRequirement": {
			label: "contradiced by",
			invert: true,
			connectionType: "association"
		}
	};
}

cwm.ChiIssueClass.prototype = new uwm.model.ModelClass;

cwm.ChiIssueClass.prototype.getPropertyForm = function() {
	return new uwm.ui.PropertyForm({
		items: [new Ext.form.ComboBox({
			fieldLabel: 'Author',
			name: 'Author'
		}), new Ext.form.ComboBox({
			fieldLabel: 'Responsible',
			name: 'Responsible'
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

uwm.Session.getInstance().getModelNodeClassContainer().registerClass(new cwm.ChiIssueClass());
