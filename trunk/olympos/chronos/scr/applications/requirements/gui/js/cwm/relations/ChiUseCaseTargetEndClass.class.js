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

cwm.relations.ChiUseCaseTargetEndClass = function(){
    cwm.relations.ChiUseCaseTargetEndClass.superclass.constructor.call(this);
    
    this.uwmClassName = "ChiUseCaseTargetEnd";
    this.instanceClassName = "cwm.relations.NMChiUseCaseChiUseCase";
    this.treeIcon = "Figure";
    this.labelProperties = {
      Name :true
    };
    
    this.realUwmClassName = "NMChiUseCaseChiUseCase";
    this.connectionEndRole = "target";
}

Ext.extend(cwm.relations.ChiUseCaseTargetEndClass, uwm.model.RelationEndClass);

uwm.model.ModelNodeClassContainer.getInstance().registerClass(new cwm.relations.ChiUseCaseTargetEndClass());