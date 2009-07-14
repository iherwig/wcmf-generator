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

cwe.model.ModelClass = function() {
	cwe.model.ModelClass.superclass.constructor.call(this, arguments);
	
	this.recordDefinition = null;
}

Ext.extend(cwe.model.ModelClass, cwe.model.ModelElement);

cwe.model.ModelClass.prototype.getRecordDefinition = function() {
	if (!this.recordDefinition) {
		throw "cwe.model.ModelClass.recordDefinition not set in subclass";
	}
	
	return this.recordDefinition;
}

cwe.model.ModelClass.prototype.getGridColumns = function() {
	var result = this.gridColumns;
	
	if (!result) {
		var recordDefinition = this.getRecordDefinition();
		
		result = [];
		
		for (var i = 0; i < recordDefinition.length; i++) {
			var isRelation = false;
			if (this.relations) {
				var relation = this.relations[recordDefinition[i].mapping];
				
				if (relation) {
					isRelation = true;
				}
			}
		
			if (recordDefinition[i].mapping != "oid" && !isRelation) {
				result.push({
					header : recordDefinition[i].name,
					dataIndex : recordDefinition[i].mapping,
					width : 100,
					sortable : true
				});
			}
		}
	}
	
	return result;
}

cwe.model.ModelClass.prototype.getEditorItems = function() {
	throw "cwe.model.ModelClass.getEditorItems not overwritten";
}

cwe.model.ModelClass.prototype.getLabel = function(record) {
	return record.get("Name");
}

cwe.model.ModelClass.prototype.isParent = function(fieldName) {
	var result = false;
	
	if (this.relations) {
		var relation = this.relations[fieldName];
		
		if (relation) {
			result = relation.isParent;
		}
	}
	
	return result;
}

cwe.model.ModelClass.prototype.getTargetModelClass = function(fieldName) {
	var result = false;
	
	if (this.relations) {
		var relation = this.relations[fieldName];
		
		if (relation) {
			result = cwe.model.ModelClassContainer.getInstance().getClass(relation.targetModelClassId);
		}
	}
	
	return result;
}
