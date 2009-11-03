/*
 *  This file was generated by wCMFGenerator 3.0.0004 from ./model/cwm.uml on Wed Feb 11 14:42:04 CET 2009. 
  Manual modifications should be placed inside the protected regions.
 * Copyright (c) 2009 The Olympos Development Team.
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

cwm.ActivitySendClass = function() {
	cwm.ActivitySendClass.superclass.constructor.call(this);

	this.uwmClassName = "ActivitySend";
	this.instanceClassName = "cwm.ActivitySend";
	this.treeIcon = "FigureActivitySend";
	this.figureIcon = "FigureActivitySend";
	this.figureClass = "uwm.graphics.figure.RectangleFigure";
	this.initialWidth = 80;
	this.initialHeight = 45;
	this.description = " ";
	this.helpUrl = "help/index.html#ActivitySend|outline";
	this.defaultLabel = "New ActivitySend";
	this.semanticGroup = "activity";
	this.labelProperties = {
		Name :true
	};

	this.gridTabIconClass = "ActivitySendTab";
	this.gridTabTip = "Shows all <b>ActivitySend</b> within selected scope";
	this.gridFields = [ {
		name :"oid",
		mapping :"oid"
	}, {
		name :"label",
		mapping :"label"
	} ];
	this.gridColumns = [ {
		header :"Label",
		dataIndex :"label",
		sortable :true
	} ];

	this.connectionInfo = {
		
		"ActivityReceive" : {
			nmUwmClassName : "ARControlFlowTargetEnd",
			connection: {
				label :"Associates",
				invert :false,
				connectionType :"association",
				nmSelf : true,
				cardinality: 1,
				ownUwmClassName : "ASControlFlowSource",
				otherUwmClassName : "ARControlFlowTarget"
			}
		},
		"Activity" : {
			nmUwmClassName : "AControlFlowSourceEnd",
			connection: {
				label :"Associates",
				invert :true,
				connectionType :"association",
				nmSelf : true,
				cardinality: -1,
				ownUwmClassName : "ASControlFlowTarget",
				otherUwmClassName : "AControlFlowSource"
			}
		}
	};

	this.maskInfo = {
			"AControlFlowSourceEnd" : "ControlFlow",
			"AControlFlowTargetEnd" : "ControlFlow",
			"ARControlFlowSourceEnd" : "ControlFlow",
			"ARControlFlowTargetEnd" : "ControlFlow",
			"ASControlFlowSourceEnd" : "ControlFlow",
			"ASControlFlowTargetEnd" : "ControlFlow"
	};
}

Ext.extend(cwm.ActivitySendClass, uwm.model.ModelClass);

cwm.ActivitySendClass.prototype.getPropertyForm = function(modelNode,
		isLockedByOtherUser) {
	return new uwm.property.PropertyForm( {
		items : [ new uwm.property.TextField( {
			fieldLabel :'Name',
			toolTip :"the name of this object.",
			name :'Name',

			modelNode :modelNode,

			readOnly :isLockedByOtherUser
		}), new uwm.property.HtmlEditor( {
			fieldLabel :'Notes',
			toolTip :"the actual description of the object.",
			name :'Notes',

			modelNode :modelNode,

			readOnly :isLockedByOtherUser
		}), new uwm.property.TextField( {
			fieldLabel :'Alias',
			toolTip :"the Project Id of this object.",
			name :'Alias',

			modelNode :modelNode,

			readOnly :isLockedByOtherUser
		}), new uwm.property.TextField( {
			fieldLabel :'Version',
			toolTip :"the model version of this object",
			name :'Version',

			modelNode :modelNode,

			readOnly :isLockedByOtherUser
		}), new uwm.property.ComboBox({
			fieldLabel: 'Author',
			toolTip: "This ActivitySend's author's name and role in the project",
			name: 'Author',
			listType: "ChiAuthors",
			modelNode: modelNode,
			disabled : isLockedByOtherUser
		}), new uwm.property.ComboBox({
			fieldLabel: 'Status',
			toolTip: "",
			name: 'Status',
			listType: "ChiBaseStatus",
			modelNode: modelNode,
			disabled : isLockedByOtherUser
		}), new uwm.property.TextField( {
			fieldLabel :'created',
			toolTip :"the creation date of this object",
			name :'created',

			modelNode :modelNode,

			readOnly :true
		}), new uwm.property.TextField( {
			fieldLabel :'creator',
			toolTip :"the user that created this object",
			name :'creator',

			modelNode :modelNode,

			readOnly :true
		}), new uwm.property.TextField( {
			fieldLabel :'last_editor',
			toolTip :"the last user that edited this object",
			name :'last_editor',

			modelNode :modelNode,

			readOnly :true
		}), new uwm.property.TextField( {
			fieldLabel :'modified',
			toolTip :"the date when this object was modified",
			name :'modified',

			modelNode :modelNode,

			readOnly :true
		}) ]
	});
}

cwm.ActivitySendClass.prototype.getGraphics = function(label, figure) {
	return new uwm.graphics.figure.ImageLabelCenterFigure(label, figure,
			"../application/images/ActivitySend.png", this.initialWidth, this.initialHeight, this.initialWidth, this.initialHeight);
}

uwm.model.ModelNodeClassContainer.getInstance().registerClass(
		new cwm.ActivitySendClass());
