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
Ext.namespace("uwm.Util");

uwm.Util.getUwmClassNameFromOid = function(oid) {
	return oid.match(/^[^:]+/)[0];
}

uwm.Util.showMessage = function(title, message, messageType) {
	uwm.util.showMessage(title, message);
}

uwm.Util.messageType = {
	INFO: 1,
	WARNING: 2,
	ERROR: 3
}

uwm.Util.setElementUnselectable = function(elem) {
	if (elem) {
		elem.style.MozUserSelect = "none";
		elem.style.KhtmlUserSelect = "none";
		elem.unselectable = "on";
	}
}
