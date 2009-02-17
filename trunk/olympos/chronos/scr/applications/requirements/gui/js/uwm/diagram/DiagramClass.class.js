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

/**
 * @class <i>Singleton</i> defining common characteristics of all Diagrams.
 * 
 * @extends uwm.model.ModelNodeClass
 * @constructor
 */
uwm.diagram.DiagramClass = function() {
	uwm.diagram.DiagramClass.superclass.constructor.call(this);
	
	this.uwmClassName = "Diagram";
	this.instanceClassName = "uwm.diagram.Diagram";
	this.treeIcon = "FigureDiagram";
	this.defaultLabel = "New Diagram";
	this.labelProperties = {
		Name: true
	};
}

Ext.extend(uwm.diagram.DiagramClass, uwm.model.ModelNodeClass);

uwm.diagram.DiagramClass.prototype.getPropertyForm = function(modelNode) {
	return new uwm.property.PropertyForm({
		items: [new uwm.property.TextField({
			fieldLabel: 'Width',
			name: 'Width',
			modelNode: modelNode
		}), new uwm.property.TextField({
			fieldLabel: 'Height',
			name: 'Height',
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

uwm.model.ModelNodeClassContainer.getInstance().registerClass(new uwm.diagram.DiagramClass());
