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

cwm.ChiFeatureClass = function() {
	cwm.ChiFeatureClass.superclass.constructor.call(this);
	
	this.uwmClassName = "ChiFeature";
	this.instanceClassName = "cwm.ChiFeature";
	this.treeIcon = "FigureChiFeature";
	this.figureIcon = "FigureChiFeature";
	this.figureClass = "uwm.graphics.figure.RectangleFigure";
	this.description = " ";
	this.helpUrl = "help/index.html#4.3.ChiFeature|outline";
	this.defaultLabel = "New ChiFeature";
	this.labelProperties = {
		Name: true
	};
	
	this.gridTabIconClass = "ChiFeatureTab";
	this.gridTabTip = "Shows all <b>ChiFeature</b> within selected scope";
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
	
		"ChiBusinessProcess": {
			label: "Associates",
			invert: false,
			connectionType: 'associationType'
		},
		"ChiRequirement": {
			label: "Realizes",
			invert: true,
			connectionType: 'realization'
		},
		"ChiFeature": {
			label: "associates",
			invert: true,
			connectionType: 'associationType'
		},
		"ChiBusinessUseCase": {
			label: "refines",
			invert: false,
			connectionType: 'realization'
		}
	};
}

Ext.extend(cwm.ChiFeatureClass, uwm.model.ModelClass);

cwm.ChiFeatureClass.prototype.getPropertyForm = function(modelNode, islocked ) {
		return new uwm.property.PropertyForm({
		items: [new uwm.property.ComboBox({
			fieldLabel: 'Author',
			name: 'Author',
			listType: "ChiAuthors",
			modelNode: modelNode,
			//readOnly: islocked
		}), new uwm.property.ComboBox({
			fieldLabel: 'Proofreader',
			name: 'Proofreader',
			listType: "ChiAuthors",
			modelNode: modelNode,
			//readOnly: islocked
		}), new uwm.property.ComboBox({
			fieldLabel: 'Status',
			name: 'Status',
			listType: "ChiFeatureStatus",
			modelNode: modelNode,
			//readOnly: islocked
		}), new uwm.property.TextField({
			fieldLabel: 'Alias',
			name: 'Alias',
			modelNode: modelNode,
			//readOnly: islocked
		}), new uwm.property.TextField({
			fieldLabel: 'Version',
			name: 'Version',
			modelNode: modelNode,
			//readOnly: islocked
		}), new uwm.property.TextField({
			fieldLabel: 'Name',
			name: 'Name',
			modelNode: modelNode,
			//readOnly: islocked
		}), new uwm.property.HtmlEditor({
			fieldLabel: 'Notes',
			name: 'Notes',
			modelNode: modelNode,
			//readOnly: islocked
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

uwm.model.ModelNodeClassContainer.getInstance().registerClass(new cwm.ChiFeatureClass());
