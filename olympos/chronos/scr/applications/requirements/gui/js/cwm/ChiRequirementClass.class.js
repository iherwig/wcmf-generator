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
	cwm.ChiRequirementClass.superclass.constructor.call(this);
	
	this.uwmClassName = "ChiRequirement";
	this.instanceClassName = "cwm.ChiRequirement";
	this.treeIcon = "FigureChiRequirement";
	this.figureIcon = "FigureChiRequirement";
	this.figureClass = "uwm.graphics.figure.RectangleFigure";
	this.description = "Requirement Description";
	this.defaultLabel = "New Requirement";
	this.labelProperties = {
		Name: true
	};
	
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

Ext.extend(cwm.ChiRequirementClass, uwm.model.ModelClass);

cwm.ChiRequirementClass.prototype.getPropertyForm = function(modelNode) {
	return new uwm.ui.PropertyForm({
		items: [new Ext.form.ComboBox({
			fieldLabel: 'reqType',
			name: 'reqType',
			modelNode: modelNode
		}), new uwm.ui.TextField({
			fieldLabel: 'Priority',
			name: 'Priority',
			modelNode: modelNode
		}), new Ext.form.ComboBox({
			fieldLabel: 'Author',
			name: 'Author',
			modelNode: modelNode
		}), new Ext.form.ComboBox({
			fieldLabel: 'Proofreader',
			name: 'Proofreader',
			modelNode: modelNode
		}), new Ext.form.ComboBox({
			fieldLabel: 'Status',
			name: 'Status',
			modelNode: modelNode
		}), new uwm.ui.TextField({
			fieldLabel: 'Alias',
			name: 'Alias',
			modelNode: modelNode
		}), new uwm.ui.TextField({
			fieldLabel: 'Version',
			name: 'Version',
			modelNode: modelNode
		}), new uwm.ui.TextField({
			fieldLabel: 'Name',
			name: 'Name',
			modelNode: modelNode
		}), new uwm.ui.HtmlEditor({
			fieldLabel: 'Notes',
			name: 'Notes',
			modelNode: modelNode
		}), new uwm.ui.TextField({
			fieldLabel: 'created',
			name: 'created',
			modelNode: modelNode,
			readOnly: true
		}), new uwm.ui.TextField({
			fieldLabel: 'creator',
			name: 'creator',
			modelNode: modelNode,
			readOnly: true
		}), new uwm.ui.TextField({
			fieldLabel: 'last_editor',
			name: 'last_editor',
			modelNode: modelNode,
			readOnly: true
		}), new uwm.ui.TextField({
			fieldLabel: 'modified',
			name: 'modified',
			modelNode: modelNode,
			readOnly: true
		})]
	});
}

uwm.model.ModelNodeClassContainer.getInstance().registerClass(new cwm.ChiRequirementClass());
