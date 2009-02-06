/*
 *  This file was generated by wCMFGenerator 3.0.0002 from ./model/cwm.uml on Thu Feb 05 13:16:12 CET 2009. 
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

cwm.ChiGoalClass = function() {
	cwm.ChiGoalClass.superclass.constructor.call(this);

	this.uwmClassName = "ChiGoal";
	this.instanceClassName = "cwm.ChiGoal";
	this.treeIcon = "FigureChiGoal";
	this.figureIcon = "FigureChiGoal";
	this.figureClass = "uwm.graphics.figure.RectangleFigure";
	this.description = " a Measurable scope that the enterprise wants to achieve. ";
	this.helpUrl = "help/index.html#ChiGoal|outline";
	this.defaultLabel = "New ChiGoal";
	this.semanticGroup = "requirements";
	this.labelProperties = {
		Name :true
	};

	this.gridTabIconClass = "ChiGoalTab";
	this.gridTabTip = "Shows all <b>ChiGoal</b> within selected scope";
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
		"ChiGoal" : {
			label :"contains",
			invert :true,
			connectionType :'association'
		}

		,

		"ChiGoal" : {
			label :"contains",
			invert :false,
			connectionType :'composition'
		}

		,

		"ChiRequirement" : {
			label :"is specified by",
			invert :false,
			connectionType :'composition'
		}

	};
}

Ext.extend(cwm.ChiGoalClass, uwm.model.ModelClass);

cwm.ChiGoalClass.prototype.getPropertyForm = function(modelNode,
		isLockedByOtherUser) {
	return new uwm.property.PropertyForm(
			{
				items : [
						new uwm.property.TextField( {
							fieldLabel :'Priority',
							toolTip :"A priority in %",
							name :'Priority',

							modelNode :modelNode,

							readOnly :isLockedByOtherUser
						}),
						new uwm.property.TextField(
								{
									fieldLabel :'Value_ammount',
									toolTip :"The actual amount of the value this goal intends to alter.",
									name :'Value_ammount',

									modelNode :modelNode,

									readOnly :isLockedByOtherUser
								}),
						new uwm.property.TextField(
								{
									fieldLabel :'Value_Goal',
									toolTip :"The amount by which the value is to be altered.",
									name :'Value_Goal',

									modelNode :modelNode,

									readOnly :isLockedByOtherUser
								}),
						new uwm.property.TextField(
								{
									fieldLabel :'Value_Name',
									toolTip :"The name of the value this goal intends to alter.",
									name :'Value_Name',

									modelNode :modelNode,

									readOnly :isLockedByOtherUser
								}), new uwm.property.ComboBox( {
							fieldLabel :'GoalType',
							toolTip :"",
							name :'GoalType',
							listType :"ChiGoalType",
							modelNode :modelNode,
							disabled :isLockedByOtherUser
						}), new uwm.property.TextField( {
							fieldLabel :'Alias',
							toolTip :"",
							name :'Alias',

							modelNode :modelNode,

							readOnly :isLockedByOtherUser
						}), new uwm.property.TextField( {
							fieldLabel :'Version',
							toolTip :"",
							name :'Version',

							modelNode :modelNode,

							readOnly :isLockedByOtherUser
						}), new uwm.property.TextField( {
							fieldLabel :'Name',
							toolTip :"",
							name :'Name',

							modelNode :modelNode,

							readOnly :isLockedByOtherUser
						}), new uwm.property.HtmlEditor( {
							fieldLabel :'Notes',
							toolTip :"",
							name :'Notes',

							modelNode :modelNode,

							readOnly :isLockedByOtherUser
						}), new uwm.property.TextField( {
							fieldLabel :'created',
							toolTip :"",
							name :'created',

							modelNode :modelNode,

							readOnly :true
						}), new uwm.property.TextField( {
							fieldLabel :'creator',
							toolTip :"",
							name :'creator',

							modelNode :modelNode,

							readOnly :true
						}), new uwm.property.TextField( {
							fieldLabel :'last_editor',
							toolTip :"",
							name :'last_editor',

							modelNode :modelNode,

							readOnly :true
						}), new uwm.property.TextField( {
							fieldLabel :'modified',
							toolTip :"",
							name :'modified',

							modelNode :modelNode,

							readOnly :true
						}) ]
			});
}

uwm.model.ModelNodeClassContainer.getInstance().registerClass(
		new cwm.ChiGoalClass());
