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
Ext.namespace("uwm.model.builtin");

/**
 * @class Defines common characteristics of all Packages.
 * 
 * @extends uwm.model.ModelNodeClass
 * @constructor
 */
uwm.model.builtin.PackageClass = function() {
	uwm.model.ModelNodeClass.call(this);
	
	this.uwmClassName = "Package";
	this.instanceClassName = "uwm.model.builtin.Package";
	this.treeIcon = "FigurePackage";
	this.defaultLabel = "New Package";
	this.labelProperties = {
		Name: true
	};
}

uwm.model.builtin.PackageClass.prototype = new uwm.model.ModelNodeClass;

uwm.model.builtin.PackageClass.prototype.getPropertyForm = function(modelNode) {
	return new uwm.property.PropertyForm({
		items: [new uwm.property.TextField({
			fieldLabel: uwm.Dict.translate('Name'),
			name: 'Name',
			modelNode: modelNode
		}), new uwm.property.HtmlEditor({
			fieldLabel: uwm.Dict.translate('Notes'),
			name: 'Notes',
			modelNode: modelNode
		}), new uwm.property.ComboBox({
			fieldLabel: 'Author',
			name: 'Author',
			listType: "ChiAuthors",
			modelNode: modelNode,
		}), new uwm.property.ComboBox({
			fieldLabel: 'Status',
			name: 'Status',
			listType: "ChiBaseStatus",
			modelNode: modelNode,
		}), new uwm.property.TextField({
			fieldLabel: uwm.Dict.translate('created'),
			name: 'created',
			modelNode: modelNode,
			readOnly: true
		}), new uwm.property.TextField({
			fieldLabel: uwm.Dict.translate('creator'),
			name: 'creator',
			modelNode: modelNode,
			readOnly: true
		}), new uwm.property.TextField({
			fieldLabel: uwm.Dict.translate('last_editor'),
			name: 'last_editor',
			modelNode: modelNode,
			readOnly: true
		}), new uwm.property.TextField({
			fieldLabel: uwm.Dict.translate('modified'),
			name: 'modified',
			modelNode: modelNode,
			readOnly: true
		})]
	});
}

uwm.model.ModelNodeClassContainer.getInstance().registerClass(new uwm.model.builtin.PackageClass());
