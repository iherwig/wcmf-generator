
// PROTECTED REGION ID(application/gui/js/cwm/UserRDBClass.class.js/declaration) START

/*
 This file was generated by wCMFGenerator 2.6.1.0031 from model/requirements.xmi on 29.12.08 13:14.
 Manual modifications should be placed inside the protected regions.
 developer: <ingo@wemove.com>
 Version: 1.0
 Class: UserRDB.Class.class.js
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

cwm.UserRDBClass = function() {
	cwm.UserRDBClass.superclass.constructor.call(this);
	
	this.uwmClassName = "UserRDB";
	this.instanceClassName = "cwm.UserRDB";
	this.treeIcon = "FigureUserRDB";
	this.figureIcon = "FigureUserRDB";
	this.figureClass = "uwm.graphics.figure.RectangleFigure";
	this.description = "";
	this.helpUrl = "help/index.html#UserRDB|outline";
	this.defaultLabel = "New UserRDB";
	this.labelProperties = {
		Name: true
	};
	
	this.gridTabIconClass = "UserRDBTab";
	this.gridTabTip = "Shows all <b>UserRDB</b> within selected scope";
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
	
	
		"NMUserRole": {
			label: "",
			invert: true,
			connectionType: "composition"
		},
		"Locktable": {
			label: "",
			invert: true,
			connectionType: "composition"
		},
		"UserRDB": {
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

Ext.extend(cwm.UserRDBClass, uwm.model.ModelClass);

cwm.UserRDBClass.prototype.getPropertyForm = function(modelNode) {
	return new uwm.property.PropertyForm({
		items: [new uwm.property.TextField({
			fieldLabel: 'login',
			name: 'login',
			toolTip: '',
			modelNode: modelNode
		}), new uwm.property.TextField({
			fieldLabel: 'password',
			name: 'password',
			toolTip: '',
			modelNode: modelNode
		}), new uwm.property.TextField({
			fieldLabel: 'name',
			name: 'name',
			toolTip: '',
			modelNode: modelNode
		}), new uwm.property.TextField({
			fieldLabel: 'firstname',
			name: 'firstname',
			toolTip: '',
			modelNode: modelNode
		})		/*,fieldLabel: 'config',
		 name: 'config',
		 toolTip: '',
		 modelNode: modelNode
		 })*/
		]
	});
}

uwm.model.ModelNodeClassContainer.getInstance().registerClass(new cwm.UserRDBClass());
// PROTECTED REGION END
