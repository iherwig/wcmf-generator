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
Ext.namespace("uwm.ui");

/**
 * @class Shows a text as hint for usage of a view.
 * 
 * @extends Ext.LoadMask
 * @constructor
 * @param {Ext.Component} el The Component to show the text in.
 * @param {Object} config The configuration object.
 */
uwm.ui.InfoMask = function(el, config){
    uwm.ui.InfoMask.superclass.constructor.call(this, el, Ext.apply(this, {
		removeMask: true,
		msgCls: "uwm-infoMask"
    }, config));
}

Ext.extend(uwm.ui.InfoMask, Ext.LoadMask);
