/*
 * Copyright (c) 2008 The Olympos Development Team.
 *
 * http://sourceforge.net/projects/olympos/
 *
 * All rights reserved. This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License v1.0 which
 * accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html. If redistributing this code, this
 * entire header must remain intact.
 */
Ext.namespace("cwm.relations");

cwm.relations.NMChiNodeChiMany2ManyClass = function() {
	cwm.relations.NMChiNodeChiMany2ManyClass.superclass.constructor.call(this);

	this.uwmClassName = "NMChiNodeChiMany2Many";
	this.instanceClassName = "cwm.relations.NMChiNodeChiMany2Many";
	this.treeIcon = "Figure";
	this.labelProperties = {
		Name :true
	};

	this.maskInfo = {
	    "NMChiNodeChiMany2ManyChiNodeEnd" : "ChiController",
	    "ChiNodeManyToMany" : "ChiNodeManyToMany"
	};
}

Ext.extend(cwm.relations.NMChiNodeChiMany2ManyClass, uwm.model.EditableRelationClass);

uwm.model.ModelNodeClassContainer.getInstance().registerClass(new cwm.relations.NMChiNodeChiMany2ManyClass());

cwm.relations.NMChiNodeChiMany2ManyClass.prototype.getPropertyForm = function(modelNode, isLockedByOtherUser) {
	return new uwm.property.PropertyForm( {
		items : [ new uwm.property.TextField( {
		    fieldLabel : 'Name',
		    toolTip : "the name of this object",
		    name : 'Name',

		    modelNode : modelNode,

		    readOnly : isLockedByOtherUser
		}), new uwm.property.HtmlEditor( {
		    fieldLabel : 'Notes',
		    toolTip : "the actual description of the object.",
		    name : 'Notes',

		    modelNode : modelNode,

		    readOnly : isLockedByOtherUser
		}), new uwm.property.TextField( {
		    fieldLabel : 'sourceName',
		    toolTip : "the name of the source end",
		    name : 'sourceName',
		    modelNode : modelNode,
		    readOnly : isLockedByOtherUser
		}), new uwm.property.ComboBox( {
		    fieldLabel : 'sourceMultiplicity',
		    toolTip : "",
		    name : 'sourceMultiplicity',
		    listType : "RelationMultiplicity",
		    modelNode : modelNode,
		    disabled : isLockedByOtherUser
		}), new uwm.property.StaticComboBox( {
		    fieldLabel : 'sourceNavigability',
		    toolTip : "",
		    name : 'sourceNavigability',
		    data : [ {
		        key : "Navigable",
		        val : "Navigable"
		    }, {
		        key : "Non-Navigable",
		        val : "Non-Navigable"
		    } ],
		    modelNode : modelNode,
		    disabled : isLockedByOtherUser
		}), new uwm.property.TextField( {
		    fieldLabel : 'targetName',
		    toolTip : "the name of the target end",
		    name : 'targetName',
		    modelNode : modelNode,
		    readOnly : isLockedByOtherUser
		}), new uwm.property.ComboBox( {
		    fieldLabel : 'targetMultiplicity',
		    toolTip : "",
		    name : 'targetMultiplicity',
		    listType : "RelationMultiplicity",
		    modelNode : modelNode,
		    disabled : isLockedByOtherUser
		}), new uwm.property.StaticComboBox( {
		    fieldLabel : 'targetNavigability',
		    toolTip : "",
		    name : 'targetNavigability',
		    data : [ {
		        key : "Navigable",
		        val : "Navigable"
		    }, {
		        key : "Non-Navigable",
		        val : "Non-Navigable"
		    } ],
		    modelNode : modelNode,
		    disabled : isLockedByOtherUser
		}), new uwm.property.TextField( {
		    fieldLabel : 'targetName',
		    toolTip : "the name of the target end",
		    name : 'targetName',
		    modelNode : modelNode,
		    readOnly : isLockedByOtherUser
		}), new uwm.property.TextField( {
		    fieldLabel : 'fk_name',
		    toolTip : "the name of the foreign key in this relation",
		    name : 'fk_name',
		    modelNode : modelNode,
		    readOnly : isLockedByOtherUser
		}), new uwm.property.TextField( {
		    fieldLabel : 'created',
		    toolTip : "the creation date of this object",
		    name : 'created',

		    modelNode : modelNode,

		    readOnly : true
		}), new uwm.property.TextField( {
		    fieldLabel : 'creator',
		    toolTip : "the user that created this object",
		    name : 'creator',

		    modelNode : modelNode,

		    readOnly : true
		}), new uwm.property.TextField( {
		    fieldLabel : 'last_editor',
		    toolTip : "the last user that edited this object",
		    name : 'last_editor',

		    modelNode : modelNode,

		    readOnly : true
		}), new uwm.property.TextField( {
		    fieldLabel : 'modified',
		    toolTip : "the date when this object was modified",
		    name : 'modified',

		    modelNode : modelNode,

		    readOnly : true
		}) ]
	});
}
