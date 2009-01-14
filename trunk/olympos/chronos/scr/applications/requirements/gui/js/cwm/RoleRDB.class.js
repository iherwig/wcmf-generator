
// PROTECTED REGION ID(application/gui/js/cwm/RoleRDBClass.js/declaration) START
/*
 This file was generated by wCMFGenerator 2.6.1.0031 from model/requirements.xmi on 30.12.08 12:38.
 Manual modifications should be placed inside the protected regions.
 developer: <ingo@wemove.com>
 Version: 1.0
 Class: RoleRDB.Class.class.js
 Description:
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
Ext.namespace("cwm");

cwm.RoleRDB = function(modelNodeClass) {
	cwm.RoleRDB.superclass.constructor.call(this, modelNodeClass);
}

Ext.extend(cwm.RoleRDB, uwm.model.TechnicalObject);

cwm.RoleRDB.prototype.initByDisplayResult = function(node) {
	cwm.RoleRDB.superclass.initByDisplayResult.call(this, node);
	
	this.data.name = node.values[1].name;
	
}

cwm.RoleRDB.prototype.populatePropertyForm = function(form) {
	var realForm = form.getForm();
	
	realForm.findField("name").setValue(this.data.name);
}

cwm.RoleRDB.prototype.getGridData = function() {
	return {
		oid: this.getOid(),
		Label: this.getLabel()
	}
}
// PROTECTED REGION END
