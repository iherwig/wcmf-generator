
/*
 * This file was generated by wCMFGenerator 3.0.0 from src/requirements.uml on Mon Jan 12 18:09:57 CET 2009. 
 * Manual modifications should be placed inside the protected regions.
 *
 * Copyright (c) 2008 The Olympos Development Team.
 *
 * http://sourceforge.net/projects/olympos/
 *
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html. If redistributing this code,
 * this entire header must remain intact.
 *  
 */
Ext.namespace("cwm");

cwm.Adodbseq = function(modelNodeClass) {
	cwm.Adodbseq.superclass.constructor.call(this, modelNodeClass);
}

Ext.extend(cwm.Adodbseq, uwm.model.ModelObject);

cwm.Adodbseq.prototype.initByDisplayResult = function(node) {
	cwm.Adodbseq.superclass.initByDisplayResult.call(this, node);
}

cwm.Adodbseq.prototype.populatePropertyForm = function(form) {
	var realForm = form.getForm();
}

cwm.Adodbseq.prototype.getGridData = function() {
	return {
		oid: this.getOid(),
		label: this.getLabel()
	}
}
	