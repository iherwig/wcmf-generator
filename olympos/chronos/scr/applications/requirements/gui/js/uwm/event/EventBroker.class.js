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
Ext.namespace("uwm.event");

uwm.event.EventBroker = function() {
	uwm.event.EventBroker.superclass.constructor.call(this);
	
	this.addEvents({
		"create": true,
		"load": true,
		"delete": true,
		"changeLabel": true,
		"changeProperty": true,
		"associate": true,
		"disassociate": true
	});
}

Ext.extend(uwm.event.EventBroker, Ext.util.Observable);

uwm.event.EventBroker.getInstance = function() {
	if (!uwm.event.EventBroker.instance) {
		uwm.event.EventBroker.instance = new uwm.event.EventBroker();
	}
	
	return uwm.event.EventBroker.instance;
}
