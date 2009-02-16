/*
 *  This file was generated by wCMFGenerator 3.0.0004 from ./model/cwm.uml on Wed Feb 11 14:42:03 CET 2009. 
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

cwm.ActivityClass = function() {
	cwm.ActivityClass.superclass.constructor.call(this);

	this.uwmClassName = "Activity";
	this.instanceClassName = "cwm.Activity";
	this.treeIcon = "FigureActivity";
	this.figureIcon = "FigureActivity";
	this.figureClass = "uwm.graphics.figure.RectangleFigure";
	this.description = " An activity is the specification of a parameterized sequence of behaviour. An activity is shown as a round-cornered rectangle enclosing all the actions, control flows and other elements that make up the activity.";
	this.helpUrl = "help/index.html#Activity|outline";
	this.defaultLabel = "New Activity";
	this.semanticGroup = "activity";
	this.labelProperties = {
		Name :true
	};

	this.gridTabIconClass = "ActivityTab";
	this.gridTabTip = "Shows all <b>Activity</b> within selected scope";
	this.gridFields = [ {
		name :"oid",
		mapping :"oid"
	}, {
		name :"Label",
		mapping :"Label"
	} ];
	this.gridColumns = [ {
		header :"Label",
		dataIndex :"Label",
		sortable :true
	} ];

	this.connectionInfo = {
		"Activity" : {
			label :"Associates",
			invert :true,
			connectionType :"Association"
		},
		"ActivityReceive" : {
			label :"Associates",
			invert :true,
			connectionType :"Association"
		},
		"ActivityInitial" : {
			label :"Associates",
			invert :false,
			connectionType :"Association"
		}

		,

		"ActivityDecision" : {
			label :"Associates",
			invert :true,
			connectionType :"Association"
		}

		,

		"Activity" : {
			label :"Associates",
			invert :false,
			connectionType :"Association"
		}

		,

		"ActivitySend" : {
			label :"Associates",
			invert :false,
			connectionType :"Association"
		}

		,

		"ActivityFinal" : {
			label :"Associates",
			invert :false,
			connectionType :"Association"
		}

	};
}

Ext.extend(cwm.ActivityClass, uwm.model.ModelClass);

cwm.ActivityClass.prototype.getPropertyForm = function(modelNode,
		isLockedByOtherUser) {
	return new uwm.property.PropertyForm( {
		items : [ new uwm.property.TextField( {
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
		}), new uwm.property.TextField( {
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

cwm.ActivityClass.prototype.getGraphics = function(label, figure) {
	return new uwm.graphics.figure.ImageFigure(label, figure,
			"../application/images/Activity.png", 95, 60, 95, 60);
}

uwm.model.ModelNodeClassContainer.getInstance().registerClass(
		new cwm.ActivityClass());
