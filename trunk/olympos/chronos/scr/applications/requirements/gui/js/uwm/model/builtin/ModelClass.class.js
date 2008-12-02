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

uwm.model.builtin.ModelClass = function() {
	uwm.model.ModelNodeClass.call(this);
	
	this.uwmClassName = "Model";
	this.instanceClassName = "uwm.model.builtin.Model";
	this.treeIcon = "FigureModel";
	this.defaultLabel = "New Goal";
}

uwm.model.builtin.ModelClass.prototype = new uwm.model.ModelNodeClass;

uwm.model.builtin.ModelClass.prototype.getPropertyForm = function() {
	return new uwm.ui.PropertyForm({
		items: [{
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

uwm.Session.getInstance().getModelNodeClassContainer().registerClass(new uwm.model.builtin.ModelClass());
