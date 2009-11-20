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

cwm.relations.NMChiControllerActionKeyChiControllerClass = function() {
	cwm.relations.NMChiControllerActionKeyChiControllerClass.superclass.constructor.call(this);
	
	this.uwmClassName = "NMChiControllerActionKeyChiController";
	this.instanceClassName = "cwm.relations.NMChiControllerActionKeyChiController";
	this.treeIcon = "Figure";
	this.labelProperties = {
		Name :true
	};
	
	this.maskInfo = {
	    "ChiControllerActionKeySource" : "ChiController",
	    "ChiControllerActionKeyTarget" : "ChiController"
	};
}

Ext.extend(cwm.relations.NMChiControllerActionKeyChiControllerClass, uwm.model.EditableRelationClass);

cwm.relations.NMChiControllerActionKeyChiControllerClass.prototype.getPropertyForm = function(modelNode, isLockedByOtherUser) {
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
		    fieldLabel : 'action',
		    toolTip : "The Action which triggeres this association",
		    name : 'action',
		    
		    modelNode : modelNode,
		    
		    readOnly : isLockedByOtherUser
		}), new uwm.property.TextField( {
		    fieldLabel : 'config',
		    toolTip : "The configuration file in which this association will be placed",
		    name : 'config',
		    
		    modelNode : modelNode,
		    
		    readOnly : isLockedByOtherUser
		}), new uwm.property.TextField( {
		    fieldLabel : 'context',
		    toolTip : "The Context in which this association is valid",
		    name : 'context',
		    
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

uwm.model.ModelNodeClassContainer.getInstance().registerClass(new cwm.relations.NMChiControllerActionKeyChiControllerClass());
