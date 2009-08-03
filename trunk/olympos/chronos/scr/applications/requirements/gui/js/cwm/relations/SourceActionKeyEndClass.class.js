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

cwm.relations.SourceActionKeyEndClass = function(){
    cwm.relations.SourceActionKeyEndClass.superclass.constructor.call(this);
    
    this.uwmClassName = "SourceActionKeyEnd";
    this.instanceClassName = "cwm.relations.NMChiControllerActionKeyChiController";
    this.treeIcon = "Figure";
    this.labelProperties = {};
    
    this.realUwmClassName = "NMChiControllerActionKeyChiController";
    this.connectionEndRole = "source";
}

Ext.extend(cwm.relations.SourceActionKeyEndClass, uwm.model.RelationEndClass);

uwm.model.ModelNodeClassContainer.getInstance().registerClass(new cwm.relations.SourceActionKeyEndClass());
