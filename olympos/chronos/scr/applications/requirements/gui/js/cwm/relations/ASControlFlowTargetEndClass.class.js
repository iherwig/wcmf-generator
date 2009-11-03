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
Ext.namespace("cwm.relations");

cwm.relations.ASControlFlowTargetEndClass = function(){
    cwm.relations.ASControlFlowTargetEndClass.superclass.constructor.call(this);
    
    this.uwmClassName = "ASControlFlowTargetEnd";
    this.instanceClassName = "cwm.relations.ControlFlow";
    this.treeIcon = "Figure";
    this.labelProperties = {};
    
    this.realUwmClassName = "ControlFlow";
    this.connectionEndRole = "target";
}

Ext.extend(cwm.relations.ASControlFlowTargetEndClass, uwm.model.RelationEndClass);

uwm.model.ModelNodeClassContainer.getInstance().registerClass(new cwm.relations.ASControlFlowTargetEndClass());
