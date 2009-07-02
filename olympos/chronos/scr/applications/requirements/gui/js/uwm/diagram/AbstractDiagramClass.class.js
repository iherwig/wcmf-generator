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
 * @class <i>Singleton</i> defining common characteristics of all Diagrams or ActivitySets.
 * 
 * @extends uwm.model.ModelNodeClass
 * @constructor
 */
uwm.diagram.AbstractDiagramClass = function() {
	uwm.diagram.AbstractDiagramClass.superclass.constructor.call(this);
	
	this.uwmClassName = "AbstractDiagram";
	this.instanceClassName = "uwm.diagram.AbstractDiagram";
	this.treeIcon = "FigureDiagram";
	this.defaultLabel = "New Diagram";
	this.labelProperties = {
		Name: true
	};
}

Ext.extend(uwm.diagram.AbstractDiagramClass, uwm.model.ModelNodeClass);

uwm.diagram.AbstractDiagramClass.prototype.getPropertyForm = function(modelNode) {
	return new uwm.property.PropertyForm({
		items: [new uwm.property.TextField({
			fieldLabel: 'Name',
			name: 'Name',
			modelNode: modelNode
		}), new uwm.property.HtmlEditor({
			fieldLabel: 'Notes',
			name: 'Notes',
			modelNode: modelNode
		}), new uwm.property.TextField({
			fieldLabel: 'Width',
			name: 'Width',
			modelNode: modelNode
		}), new uwm.property.TextField({
			fieldLabel: 'Height',
			name: 'Height',
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
