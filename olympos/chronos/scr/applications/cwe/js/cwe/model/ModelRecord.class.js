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

/**
 * @class A record of a specific Model Class.
 * 
 * <p>
 * Reads the record information of the passed Model Class and creates a record
 * with the specific attributes.
 * </p>
 * 
 * @extends Ext.data.Record
 * @constructor
 * 
 * @param {cwe.model.ModelClass}
 *            modelClass The Model Class to create a record for.
 * @param {Object}
 *            data A map containing attribute names as keys and initial values
 *            as map values.
 */
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
};

Ext.extend(cwe.model.ModelRecord, Ext.data.Record);

/**
 * Returns the Model Class of this record.
 * 
 * @return The Model Class of this record.
 * @type cwe.model.ModelClass
 */
cwe.model.ModelRecord.prototype.getModelClass = function() {
	return this.modelClass;
};

/**
 * Returns the oid of this record.
 * 
 * @return The oid of this record.
 * @type String
 */
cwe.model.ModelRecord.prototype.getOid = function() {
	return this.get("oid");
};

/**
 * Sets the oid of this record.
 * 
 * <p>
 * Only required in special circumstances, as creating new objects.
 * </p>
 * 
 * @param {String}
 *            oid The oid to set.
 */
cwe.model.ModelRecord.prototype.setOid = function(oid) {
	this.set("oid", oid);
};

/**
 * Returns the label of this record.
 * 
 * <p>
 * Refers to the Model Class for extracting the label of this record.
 * </p>
 * 
 * @return The label of this record.
 * @type String
 */
cwe.model.ModelRecord.prototype.getLabel = function() {
	return this.getModelClass().getLabel(this);
};

/**
 * Sets the value of an attribute.
 * 
 * @param {String}
 *            name The name of the attribute to set.
 * @param {Mixed}
 *            value The new value of the attribute.
 */
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
};

/**
 * Persists this record.
 */
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
};
