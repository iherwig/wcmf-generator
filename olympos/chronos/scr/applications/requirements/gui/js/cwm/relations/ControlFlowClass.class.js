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

cwm.relations.ControlFlow = function() {
	cwm.relations.ControlFlow.superclass.constructor.call(this);
	
	this.uwmClassName = "ControlFlow";
	this.instanceClassName = "cwm.relations.ControlFlow";
	this.treeIcon = "Figure";
	this.labelProperties = {};
	
	this.maskInfo = {
			"AControlFlowSource" : "Activity",
			"AControlFlowTarget" : "Activity",
			"ADControlFlowSource" : "ActivityDecision",
			"ADControlFlowTarget" : "ActivityDecision",
			"ASControlFlowSource" : "ActivitySend",
			"ASControlFlowTarget" : "ActivitySend",
			"ARControlFlowSource" : "ActivityReceive",
			"ARControlFlowTarget" : "ActivityReceive"
	};
}

Ext.extend(cwm.relations.ControlFlow, uwm.model.EditableRelationClass);

uwm.model.ModelNodeClassContainer.getInstance().registerClass(new cwm.relations.ControlFlow());
