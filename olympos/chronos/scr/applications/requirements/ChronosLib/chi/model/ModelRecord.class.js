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
Ext.namespace("chi.model");

/**
 * @class A record of a specific Model Class.
 * 
 * <p>
 * Reads the record information of the passed Model Description and creates a record
 * with the specific attributes.
 * </p>
 * 
 * @extends Ext.data.Record
 * @constructor
 * 
 * @param {chi.model.ModelDescription}
 *            modelDescription The Model Description to create a record for.
 * @param {String}
 *            oid The object id of the instance.
 * @param {Object}
 *            data A map containing attribute names as keys and initial values
 *            as map values.
 */
chi.model.ModelRecord = function(modelDescription, oid, data) {
	if (!modelDescription) {
		throw ("No modelDescription passed to ModelRecord constructor.");
	}
	
	if (!data) {
		data = {};
	}
	
	var template = Ext.data.Record.create(modelDescription.getRecordDefinition());
	
	var result = new template(data);
	result.modelDescription = modelDescription;
	
	result.isModelRecord = true;
	
	if (oid) {
		result.oid = oid;
	} else {
		result.oid = "{" + modelDescription.getId() + ":?}";
	}
	
	for ( var currElem in this) {
		result[currElem] = this[currElem];
	}
	
	return result;
};

Ext.extend(chi.model.ModelRecord, Ext.data.Record);

/**
 * Returns the Model Description of this record.
 * 
 * @return The Model Description of this record.
 * @type chi.model.ModelDescription
 */
chi.model.ModelRecord.prototype.getModelDescription = function() {
	return this.modelDescription;
};

/**
 * Returns the oid of this record.
 * 
 * @return The oid of this record.
 * @type String
 */
chi.model.ModelRecord.prototype.getOid = function() {
	return this.oid;
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
chi.model.ModelRecord.prototype.setOid = function(oid) {
	this.oid = oid;
};

/**
 * Returns the label of this record.
 * 
 * <p>
 * Refers to the Model Description for extracting the label of this record.
 * </p>
 * 
 * @return The label of this record.
 * @type String
 */
chi.model.ModelRecord.prototype.getLabel = function() {
	return this.getModelDescription().getLabel(this);
};

/**
 * Sets the value of an attribute.
 * 
 * @param {String}
 *            name The name of the attribute to set.
 * @param {Mixed}
 *            value The new value of the attribute.
 */
chi.model.ModelRecord.prototype.set = function(name, value) {
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
chi.model.ModelRecord.prototype.commit = function(actionSet) {
	if (this.dirty) {
		var changedFields = this.getChanges();
		
		var simpleFields = {};
		var foundSimpleField = false;
		var foundField = false;
		
		var isActionSetPassed = true && actionSet;
		
		if (!actionSet) {
			actionSet = new chi.persistency.ActionSet();
		}
		
		var self = this;
		
		for ( var currField in changedFields) {
			var currValue = changedFields[currField];
			var currType = this.fields.get(currField).type;
			
			if (!(currValue instanceof Function)) {
				if (!Ext.isArray(currValue) && currValue != null && !(currValue.isModelRecord)) {
					foundField = true;
					foundSimpleField = true;
					
					if (currType == "auto" || currType == "text") {
						simpleFields[currField] = currValue;
					} else if (currValue && (!currValue.trim || currValue.trim() != "")) {
						switch (currType) {
							case "date":
								simpleFields[currField] = currValue.format("D M d H:i:s T Y");
								break;
							
							case "float":
								simpleFields[currField] = parseFloat(currValue);
								break;
							
							case "int":
								simpleFields[currField] = parseInt(currValue);
								break;
							
							case "number":
								simpleFields[currField] = Number(currValue);
								break;
							
							case "bool":
							case "boolean":
								simpleFields[currField] = true || currValue;
								break;
							
							default:
								throw "Unkonwn record attribute type: " + currType;
						}
					}
				} else {
					var oldAssociates = this.modified[currField] || [];
					if (!Ext.isArray(oldAssociates)) {
						oldAssociates = [ oldAssociates ];
					}
					
					currValue = currValue || [];					
					if (!Ext.isArray(currValue)) {
						currValue = [currValue];
					}
					
					var toDisassociate = this.except(oldAssociates, currValue);
					var toAssociate = this.except(currValue, oldAssociates);
					
					for ( var i = 0; i < toDisassociate.length; i++) {
						var currElem = toDisassociate[i];
						
						foundField = true;
						
						actionSet.addDisassociate(self.getOid(), currElem.getOid(), currField);
					}
					
					for ( var i = 0; i < toAssociate.length; i++) {
						var currElem = toAssociate[i];
						
						foundField = true;
						
						actionSet.addAssociate(self.getOid(), currElem.getOid(), currField);
					}
				}
			}
		}
		
		if (foundSimpleField) {
			actionSet.addUpdate(this.getOid(), simpleFields, function(data) {
				self.setOid(data.oid);
			});
		}
		
		if (foundField && !isActionSetPassed) {
			actionSet.commit();
		}
	}
	
	this.dirty = false;
};

chi.model.ModelRecord.prototype.except = function(completeArray, arrayToRemove) {
	var result = [];
	
	for ( var i = 0; i < completeArray.length; i++) {
		var completeOid = completeArray[i].getOid();
		
		var found = false;
		
		for ( var j = 0; j < arrayToRemove.length; j++) {
			if (completeOid == arrayToRemove[j].getOid()) {
				found = true;
				break;
			}
		}
		
		if (!found) {
			result.push(completeArray[i]);
		}
	}
	
	return result;
};