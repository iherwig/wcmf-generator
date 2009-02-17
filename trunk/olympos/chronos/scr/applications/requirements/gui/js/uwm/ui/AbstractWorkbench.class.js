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
 * @class Abstract base class for all workbenches (perspectives).
 * 
 * @extens Ext.Panel
 * @constructor
 * @param {Object} config The configuration object.
 */
uwm.ui.AbstractWorkbench = function(config) {
	uwm.ui.AbstractWorkbench.superclass.constructor.call(this, Ext.apply(this, {
		layout: "border"
	}, config));
}

Ext.extend(uwm.ui.AbstractWorkbench, Ext.Panel);

uwm.ui.AbstractWorkbench.prototype.getEastPanel = function() {
	return this.eastPanel;
}
