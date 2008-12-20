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
	cwm.ChiIssueClass.superclass.constructor.call(this);
	
	this.uwmClassName = "ChiIssue";
	this.instanceClassName = "cwm.ChiIssue";
	this.treeIcon = "FigureChiIssue";
	this.figureIcon = "FigureChiIssue";
	this.figureClass = "uwm.graphics.figure.RectangleFigure";
	this.description = "Issue Description";
	this.defaultLabel = "New Issue";
	this.labelProperties = {
		Name: true
	};
	
	this.connectionInfo = {
		"ChiRequirement": {
			label: "contradiced by",
			invert: true,
			connectionType: "association"
		}
	};
}

Ext.extend(cwm.ChiIssueClass, uwm.model.ModelClass);

cwm.ChiIssueClass.prototype.getPropertyForm = function(modelNode) {
	return new uwm.property.PropertyForm({
		items: [new uwm.property.ComboBox({
			fieldLabel: 'Author',
			name: 'Author',
			listType: "ChiAuthors",
			modelNode: modelNode
		}), new uwm.property.ComboBox({
			fieldLabel: 'Responsible',
			name: 'Responsible',
			listType: "ChiAuthors",
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

uwm.model.ModelNodeClassContainer.getInstance().registerClass(new cwm.ChiIssueClass());
