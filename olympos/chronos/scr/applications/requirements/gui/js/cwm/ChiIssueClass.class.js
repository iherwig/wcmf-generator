/*
 *  This file was generated by wCMFGenerator 3.0.0 from src/requirements.uml on Mon Jan 12 18:10:07 CET 2009. 
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

cwm.ChiIssueClass = function() {
	cwm.ChiIssueClass.superclass.constructor.call(this);
	
	this.uwmClassName = "ChiIssue";
	this.instanceClassName = "cwm.ChiIssue";
	this.treeIcon = "FigureChiIssue";
	this.figureIcon = "ChiIssueTab";
	this.figureClass = "uwm.graphics.figure.RectangleFigure";
	this.description = "a characteristic of a system that could slow down or even completely stop the realization of a ChiRequirement";
	this.helpUrl = "help/index.html#4.4.ChiIssue|outline";
	this.defaultLabel = "New ChiIssue";
	this.semanticGroup = "requirements";
	this.labelProperties = {
		Name: true
	};

	this.gridTabIconClass = "ChiIssueTab";
	this.gridTabTip = "Shows all <b>ChiIssues</b> within selected scope";
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
 						
		"ChiRequirement": {
			label: "is negated by",
			invert: true,
			connectionType:  'associationType'
		}
	};
}

Ext.extend(cwm.ChiIssueClass, uwm.model.ModelClass);

cwm.ChiIssueClass.prototype.getPropertyForm = function(modelNode, isLockedByOtherUser) {
	return new uwm.property.PropertyForm({
		items: [new uwm.property.ComboBox({
			fieldLabel: 'Author',
			toolTip: "This issue's author's name and role in the project",
			name: 'Author',
			listType: "ChiAuthors",
			modelNode: modelNode,
			disabled : isLockedByOtherUser
		}), new uwm.property.ComboBox({
			fieldLabel: 'Responsible',
			toolTip: "The responsible to close the present issue",
			name: 'Responsible',
			listType: "ChiAuthors",
			modelNode: modelNode,
			disabled : isLockedByOtherUser
		}), new uwm.property.TextField({
			fieldLabel: 'Alias',
			toolTip: "the Project Id of this object.",
			name: 'Alias',
			modelNode: modelNode,
			readOnly: isLockedByOtherUser
		}),	new uwm.property.TextField({
			fieldLabel: 'Version',
			toolTip: "the model version of this object",
			name: 'Version',
			modelNode: modelNode,
			readOnly: isLockedByOtherUser
		}),	new uwm.property.TextField({
			fieldLabel: 'Name',
			toolTip: "the name of this object.",
			name: 'Name',
			modelNode: modelNode,
			readOnly: isLockedByOtherUser
		}),	new uwm.property.HtmlEditor({
			fieldLabel: 'Notes',
			toolTip: "the actual description of the object.",
			name: 'Notes',
			modelNode: modelNode,
			readOnly: isLockedByOtherUser
		}),	new uwm.property.TextField({
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

uwm.model.ModelNodeClassContainer.getInstance().registerClass(new cwm.ChiIssueClass());

