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
Ext.namespace("cwe.model");

cwe.model.ModelRecord = function(modelClass, data) {
	// FIXME: Temporary workaround as long as not all model elements exist
	if (!modelClass) {
		modelClass = cwe.model.ModelClassContainer.getInstance().getClass("ChiGoal");
	}
	
	if (!data) {
		data = {};
	}
	
	var template = Ext.data.Record.create(modelClass.getRecordDefinition());
	
	var result = new template(data);
	result.modelClass = modelClass;
	
	for ( var currElem in this) {
		result[currElem] = this[currElem];
	}
	
	return result;
}

Ext.extend(cwe.model.ModelRecord, Ext.data.Record);

cwe.model.ModelRecord.prototype.getModelClass = function() {
	return this.modelClass;
}

cwe.model.ModelRecord.prototype.getOid = function() {
	return this.get("oid");
}

cwe.model.ModelRecord.prototype.setOid = function(oid) {
	this.set("oid", oid);
}

cwe.model.ModelRecord.prototype.getLabel = function() {
	return this.getModelClass().getLabel(this);
}

cwe.model.ModelRecord.prototype.set = function(name, value) {
	if (String(value) !== "[object Object]" && String(this.data[name]) == String(value)) {
		return;
	}
	if (this.data[name] === value) {
		return;
	}
	this.dirty = true;
	if (!this.modified) {
		this.modified = {};
	}
	if (typeof this.modified[name] == 'undefined') {
		this.modified[name] = this.data[name];
	}
	this.data[name] = value;
	if (!this.editing && this.store) {
		this.store.afterEdit(this);
	}
}

cwe.model.ModelRecord.prototype.commit = function(silent, activitySet) {
	if (this.dirty) {
		var changedFields = this.getChanges();
		
		var simpleFields = {};
		var foundSimpleField = false;
		var foundField = false;
		
		var actionSet = new chi.persistency.ActionSet();
		
		var self = this;
		
		for ( var currField in changedFields) {
			var currValue = changedFields[currField];
			
			if (!(currValue instanceof Function)) {
				if (!(currValue instanceof cwe.model.ModelReferenceList)) {
					foundField = true;
					foundSimpleField = true;
					
					simpleFields[currField] = currValue;
				} else {
					var oldAssociates = this.modified[currField];

					if (!oldAssociates) {
						oldAssociates = new cwe.model.ModelReferenceList(this.getModelClass().getTargetModelClass(currField));
					}
					
					var toDisassociate = oldAssociates.except(currValue);
					var toAssociate = currValue.except(oldAssociates);
					
					toDisassociate.each(function(elem) {
						foundField = true;
						
						var parentOid;
						var childOid;
						
						if (self.getModelClass().isParent(currField)) {
							parentOid = elem.getOid();
							childOid = self.getOid();
						} else {
							parentOid = self.getOid();
							childOid = elem.getOid();
						}
						
						actionSet.addDisassociate(parentOid, childOid);
					});
					
					toAssociate.each(function(elem) {
						foundField = true;
						
						var parentOid;
						var childOid;
						
						if (self.getModelClass().isParent(currField)) {
							parentOid = elem.getOid();
							childOid = self.getOid();
						} else {
							parentOid = self.getOid();
							childOid = elem.getOid();
						}
						
						actionSet.addAssociate(parentOid, childOid);
					});
				}
			}
		}
		
		if (foundSimpleField) {
			actionSet.addSave(this.getOid(), simpleFields);
		}
		
		if (foundField) {
			actionSet.commit();
		}
	}
	
	this.dirty = false;
}
