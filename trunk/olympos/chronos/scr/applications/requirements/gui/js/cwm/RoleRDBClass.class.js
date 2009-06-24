
// PROTECTED REGION ID(application/gui/js/cwm/RoleRDBClass.class.js/declaration) START

/*
 This file was generated by wCMFGenerator 2.6.1.0031 from model/requirements.xmi on 29.12.08 13:14.
 Manual modifications should be placed inside the protected regions.
 developer: <ingo@wemove.com>
 Version: 1.0
 Class: RoleRDB.Class.class.js
 Description:
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

cwm.RoleRDBClass = function() {
	cwm.RoleRDBClass.superclass.constructor.call(this);
	
	this.uwmClassName = "RoleRDB";
	this.instanceClassName = "cwm.RoleRDB";
	this.treeIcon = "FigureRoleRDB";
	this.figureIcon = "FigureRoleRDB";
	this.figureClass = "uwm.graphics.figure.RectangleFigure";
	this.description = "";
	this.helpUrl = "help/index.html#RoleRDB|outline";
	this.defaultLabel = "New RoleRDB";
	this.labelProperties = {
		Name: true
	};
	
	this.gridTabIconClass = "RoleRDBTab";
	this.gridTabTip = "Shows all <b>RoleRDB</b> within selected scope";
	this.gridFields = [{
		name: "oid",
		mapping: "oid"
	}, {
		name: "label",
		mapping: "label"
	}];
	this.gridColumns = [{
		header: "Label",
		dataIndex: "label",
		sortable: true
	}];
	
	this.connectionInfo = {

		"NMUserRole": {
			label: "",
			invert: true,
			connectionType: "composition"
		},
		"RoleRDB": {
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

Ext.extend(cwm.RoleRDBClass, uwm.model.TechnicalObjectClass);

cwm.RoleRDBClass.prototype.getPropertyForm = function(modelNode) {
	return new uwm.property.PropertyForm({
		items: [new uwm.property.TextField({
			fieldLabel: 'name',
			name: 'name',
			toolTip: '',
			modelNode: modelNode
		}), ]
	});
}

uwm.model.ModelNodeClassContainer.getInstance().registerClass(new cwm.RoleRDBClass());
// PROTECTED REGION END
