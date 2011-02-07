/*
 * This file was generated by wCMFGenerator 3.0.0004 from ./model/cwm.uml on Thu
 * Feb 12 11:45:26 CET 2009. Manual modifications should be placed inside the
 * protected regions. Copyright (c) 2009 The Olympos Development Team.
 * 
 * http://sourceforge.net/projects/olympos/
 * 
 * All rights reserved. This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License v1.0 which
 * accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html. If redistributing this code, this
 * entire header must remain intact.
 */
Ext.namespace("cwm");

cwm.OperationClass = function() {
	cwm.OperationClass.superclass.constructor.call(this);
	
	this.uwmClassName = "Operation";
	this.instanceClassName = "cwm.Operation";
	this.treeIcon = "FigureOperation";
	this.figureIcon = "FigureOperation";
	this.figureClass = "uwm.graphics.figure.RectangleFigure";
	this.description = " ";
	this.helpUrl = "help/index.html#Operation|outline";
	this.defaultLabel = "New Operation";
	this.semanticGroup = "domain_feature";
	this.labelProperties = {
		Name : true
	};
	
	this.gridTabIconClass = "OperationTab";
	this.gridTabTip = "Shows all <b>Operation</b> within selected scope";
	this.gridFields = [ {
	    name : "oid",
	    mapping : "oid"
	}, {
	    name : "label",
	    mapping : "label"
	} ];
	this.gridColumns = [ {
	    header : "Label",
	    dataIndex : "label",
	    sortable : true
	} ];
	
	this.connectionInfo = {};
}

Ext.extend(cwm.OperationClass, uwm.model.ModelNodeClass);

cwm.OperationClass.prototype.getPropertyForm = function(modelNode, isLockedByOtherUser) {
	return new uwm.property.PropertyForm( {
		items : [ new uwm.property.TextField( {
		    fieldLabel : 'Name',
		    toolTip : "the name of this object.",
		    name : 'Name',
		    
		    modelNode : modelNode,
		    
		    readOnly : isLockedByOtherUser,
		    regex : /^[a-z][a-zA-Z0-9]*$/,
		    regexText : "the name must only contain letters and numbers and must start with a lower case letter"
		}), new uwm.property.HtmlEditor( {
		    fieldLabel : 'Notes',
		    toolTip : "the actual description of the object.",
		    name : 'Notes',
		    
		    modelNode : modelNode,
		    
		    readOnly : isLockedByOtherUser
		}),
		new uwm.property.ComboBox({
		    fieldLabel: 'visibility',
		    toolTip: "visibility",
		    name: 'visibility',
		    listType: "Visibility",
		    modelNode: modelNode,
		    disabled : isLockedByOtherUser
		}),
		new uwm.property.Checkbox( {
		    fieldLabel : 'isAbstract',
		    name : 'isAbstract',
		    modelNode : modelNode,
		    stateful : true,
		    disabled : isLockedByOtherUser
		}),
		new uwm.property.TextField( {
		    fieldLabel : 'ReturnType',
		    toolTip : "",
		    name : 'ReturnType',
		    
		    modelNode : modelNode,
		    
		    readOnly : isLockedByOtherUser
		}), new uwm.property.TextField( {
		    fieldLabel : 'Parameters',
		    toolTip : "",
		    name : 'Parameters',
		    
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

cwm.OperationClass.prototype.getGraphics = function(label, figure) {
	return new uwm.graphics.figure.ImageFigure(label, figure, "../application/images/Operation.PNG", 96, 95, 96, 95);
}

uwm.model.ModelNodeClassContainer.getInstance().registerClass(new cwm.OperationClass());
