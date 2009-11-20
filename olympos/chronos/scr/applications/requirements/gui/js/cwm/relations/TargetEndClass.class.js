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

cwm.relations.TargetEndClass = function(){
    cwm.relations.TargetEndClass.superclass.constructor.call(this);
    
    this.uwmClassName = "TargetEnd";
    this.instanceClassName = "cwm.relations.NMChiControllerChiController";
    this.treeIcon = "Figure";
    this.labelProperties = {
      Name :true
    };
    
    this.realUwmClassName = "NMChiControllerChiController";
    this.connectionEndRole = "target";
}

Ext.extend(cwm.relations.TargetEndClass, uwm.model.RelationEndClass);

uwm.model.ModelNodeClassContainer.getInstance().registerClass(new cwm.relations.TargetEndClass());
