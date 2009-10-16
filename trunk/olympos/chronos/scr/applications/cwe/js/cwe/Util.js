/*
 * Copyright (c) 2009 The Olympos Development Team.
 * 
 * http://sourceforge.net/projects/olympos/
 * 
 * All rights reserved. This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License v1.0 which
 * accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html. If redistributing this code, this
 * entire header must remain intact.
 */
Ext.namespace("cwe.Util");

cwe.Util.createChild = function(parentRecord, roleName, childClass, handler) {
	var actionSet = new chi.persistency.ActionSet();
	
	actionSet.addCreateChild(parentRecord.getOid(), roleName);
	actionSet.addRead("{" + childClass.getId() + ":?}", 0, function(data) {
		handler(data);
	});
	
	actionSet.commit();
};
