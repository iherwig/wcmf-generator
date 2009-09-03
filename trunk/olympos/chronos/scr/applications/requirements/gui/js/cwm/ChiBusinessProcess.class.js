
/*
 * This file was generated by wCMFGenerator 3.0.0 from src/requirements.uml on Mon Jan 12 18:09:58 CET 2009. 
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

cwm.ChiBusinessProcess = function(modelNodeClass) {
	cwm.ChiBusinessProcess.superclass.constructor.call(this, modelNodeClass);
}

Ext.extend(cwm.ChiBusinessProcess, uwm.model.ModelObject);

cwm.ChiBusinessProcess.prototype.initByDisplayResult = function(node) {
	cwm.ChiBusinessProcess.superclass.initByDisplayResult.call(this, node);
      this.data.Alias = node.values[1].Alias;
      this.data.Version = node.values[1].Version;
      this.data.Name = node.values[1].Name;
      this.data.Notes = node.values[1].Notes;
	  this.data.Author = node.values[1].Author;
	this.data.Status = node.values[1].Status;
      this.data.created = node.values[1].created;
      this.data.creator = node.values[1].creator;
      this.data.last_editor = node.values[1].last_editor;
      this.data.modified = node.values[1].modified;
}

cwm.ChiBusinessProcess.prototype.populatePropertyForm = function(form) {
	var realForm = form.getForm();
      realForm.findField("Alias").loadValue(this.data.Alias);
      realForm.findField("Version").loadValue(this.data.Version);
      realForm.findField("Name").loadValue(this.data.Name);
      realForm.findField("Notes").loadValue(this.data.Notes);
	  realForm.findField("Author").loadValue(this.data.Author);
	  realForm.findField("Status").loadValue(this.data.Status);
      realForm.findField("created").loadValue(this.data.created);
      realForm.findField("creator").loadValue(this.data.creator);
      realForm.findField("last_editor").loadValue(this.data.last_editor);
      realForm.findField("modified").loadValue(this.data.modified);
}

cwm.ChiBusinessProcess.prototype.getGridData = function() {
	return {
		oid: this.getOid(),
		label: this.getLabel()
	}
}
	
/**
 * uwm.model.ModelNode overrides
 */
cwm.ChiBusinessProcess.prototype.disassociate = function(otherModelObject, connectionInfo, relationObject) {

	// if a UseCase is disassociated from a BusinessProcess, move its node to the parent package of the BusinessProcess
	if (otherModelObject instanceof cwm.ChiBusinessUseCase || otherModelObject instanceof cwm.ChiBusinessUseCaseCore) {
		var processParentOids = this.getParentOids();
		if (processParentOids) {
			for (var i=0; i<processParentOids.length; i++) {
				if (uwm.Util.getUwmClassNameFromOid(processParentOids[i]) == 'Package') {
					// make sure that these two actions are both executed
					cwm.ChiBusinessProcess.superclass.disassociate.call(this, otherModelObject, connectionInfo, relationObject);
					otherModelObject.associate(uwm.model.ModelContainer.getInstance().getByOid(processParentOids[i]));
				}
			}
		}
	}
	else {
		// default behaviour
		cwm.ChiBusinessProcess.superclass.disassociate.call(this, otherModelObject, connectionInfo, relationObject);
	}
}  