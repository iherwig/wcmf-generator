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
Ext.namespace("uwm.diagram");

uwm.diagram.DiagramClass = function() {
	uwm.model.ModelNodeClass.call(this);
	
	this.uwmClassName = "Diagram";
	this.instanceClassName = "uwm.diagram.Diagram";
	this.treeIcon = "FigureDiagram";
	this.defaultLabel = "New Diagram";
}

uwm.diagram.DiagramClass.prototype = new uwm.model.ModelNodeClass;

uwm.diagram.DiagramClass.prototype.getPropertyForm = function() {
	return new uwm.ui.PropertyForm({
		items: [{
			fieldLabel: 'Width',
			name: 'Width'
		}, {
			fieldLabel: 'Height',
			name: 'Height'
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

uwm.Session.getInstance().getModelNodeClassContainer().registerClass(new uwm.diagram.DiagramClass());
