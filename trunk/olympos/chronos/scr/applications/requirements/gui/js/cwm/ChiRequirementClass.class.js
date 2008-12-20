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
	
	this.gridTabIconClass = "ChiRequirementTab";
	this.gridTabTip = "Shows all <b>Requirements</b> within selected scope";
	this.gridFields = [{
		name: "oid",
		mapping: "oid"
	}, {
		name: "Label",
		mapping: "Label"
	}, {
		name: "Priority",
		mapping: "Priority"
	}];
	this.gridColumns = [{
		header: "Label",
		dataIndex: "Label",
		sortable: true
	}, {
		header: "Priority",
		dataIndex: "Priority",
		sortable: true
	}];
	
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
	return new uwm.property.PropertyForm({
		items: [new uwm.property.ComboBox({
			fieldLabel: 'reqType',
			name: 'reqType',
			listType: "ChiRequirementType",
			modelNode: modelNode
		}), new uwm.property.TextField({
			fieldLabel: 'Priority',
			name: 'Priority',
			modelNode: modelNode
		}), new uwm.property.ComboBox({
			fieldLabel: 'Author',
			name: 'Author',
			listType: "ChiAuthors",
			modelNode: modelNode
		}), new uwm.property.ComboBox({
			fieldLabel: 'Proofreader',
			name: 'Proofreader',
			listType: "ChiAuthors",
			modelNode: modelNode
		}), new uwm.property.ComboBox({
			fieldLabel: 'Status',
			name: 'Status',
			listType: "ChiRequirementStatus",
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

uwm.model.ModelNodeClassContainer.getInstance().registerClass(new cwm.ChiRequirementClass());
