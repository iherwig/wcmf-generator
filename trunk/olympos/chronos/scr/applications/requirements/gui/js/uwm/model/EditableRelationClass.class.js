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

Ext.namespace("uwm.model");

/**
 * @class Common characteristics of an n:m EditableRelation Class.
 * 
 * <p>This class should not be instantiated, but extended.</p>
 * 
 * @extends uwm.model.ModelNodeClass
 * @constructor
 */
uwm.model.EditableRelationClass = function() {
	uwm.model.EditableRelationClass.superclass.constructor.call(this);
}

Ext.extend(uwm.model.EditableRelationClass, uwm.model.RelationClass);

uwm.model.EditableRelationClass.prototype.getPropertyForm = function(modelNode, isLockedByOtherUser) {
	return new uwm.property.PropertyForm({
		items: [new uwm.property.TextField({
			fieldLabel: 'Name',
			toolTip: "the name of this object",
			name: 'Name',
			
			modelNode: modelNode,
			
			readOnly: isLockedByOtherUser
		}), new uwm.property.HtmlEditor({
			fieldLabel: 'Notes',
			toolTip: "the actual description of the object.",
			name: 'Notes',
			
			modelNode: modelNode,
			
			readOnly: isLockedByOtherUser
		}), new uwm.property.NumberField({
			fieldLabel: 'sourceMultiplicity',
			toolTip: "",
			name: 'sourceMultiplicity',
			allowDecimals: false,
			allowNegative: true,
			minValue: -1,
			modelNode: modelNode,
			readOnly: isLockedByOtherUser
		}), new uwm.property.TextField({
			fieldLabel: 'sourceNavigability',
			toolTip: "",
			name: 'sourceNavigability',
			modelNode: modelNode,
			readOnly: isLockedByOtherUser
		}), new uwm.property.NumberField({
			fieldLabel: 'targetMultiplicity',
			toolTip: "",
			name: 'targetMultiplicity',
			allowDecimals: false,
			allowNegative: true,
			minValue: -1,
			modelNode: modelNode,
			readOnly: isLockedByOtherUser
		}), new uwm.property.TextField({
			fieldLabel: 'targetNavigability',
			toolTip: "",
			name: 'targetNavigability',
			modelNode: modelNode,
			readOnly: isLockedByOtherUser
		}), new uwm.property.TextField({
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
