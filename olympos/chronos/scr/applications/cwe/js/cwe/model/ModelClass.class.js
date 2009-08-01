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
 * @class Describes one application class.
 * 
 * <p>
 * This class is not intended to be instantiated, but to be extended.
 * </p>
 * 
 * <p>
 * Only one instance of each concrete subclass must exist. They are registered
 * to {@link cwe.model.ModelClassContainer} and can be retrieved from there by
 * their unique id.
 * </p>
 * 
 * @extends cwe.model.ModelElement
 * @constructor
 */
cwe.model.ModelClass = function() {
	cwe.model.ModelClass.superclass.constructor.call(this, arguments);
	
	/**
	 * The definition of a record of this Model Class.
	 * 
	 * <p>
	 * Refer to Ext.data.Field for the detailed specification.
	 * </p>
	 * 
	 * @private
	 * @type Array
	 */
	this.recordDefinition = null;
	
	/**
	 * The definition of the grid columns of the model grid of this Model Class.
	 * 
	 * <p>
	 * Refer to Ext.grid.ColumnModel for the detailed specification.
	 * </p>
	 * 
	 * @private
	 * @type Array
	 */
	this.gridColumns = null;
	
	/**
	 * The definition of relations of this Model Class to other Model Classes.
	 * 
	 * <p>
	 * Contains a map with attribute name as key and another map as value. The
	 * inner map contains two fields:
	 * <ul>
	 * <li><code>isParent</code> of type <code>boolean</code> determines
	 * whether the target object is the parent object.</li>
	 * <li><code>targetModelClassid</code> of type <code>String</code>
	 * contains the unique id of the target Model Class.</li>
	 * </ul>
	 * </p>
	 */
	this.relations = null;
}

Ext.extend(cwe.model.ModelClass, cwe.model.ModelElement);

/**
 * Returns the definition of a record of this Model Class.
 * 
 * @throws If
 *             this method is not overridden by subclasses.
 * @return The definition of a record of this Model Class.
 * @type Array
 */
cwe.model.ModelClass.prototype.getRecordDefinition = function() {
	if (!this.recordDefinition) {
		throw "cwe.model.ModelClass.recordDefinition not set in subclass";
	}
	
	return this.recordDefinition;
}

/**
 * Returns the definition of the grid columns of the model grid of this Model
 * Class.
 * 
 * <p>
 * If no specific <code>gridColumn</code> configuration is given, it is
 * derived from the <code>recordDefinition</code>.
 * </p>
 * 
 * @return The definition of the grid columns of the model grid of this Model
 *         Class.
 * @type Array
 */
cwe.model.ModelClass.prototype.getGridColumns = function() {
	var result = this.gridColumns;
	
	if (!result) {
		var recordDefinition = this.getRecordDefinition();
		
		result = [];
		
		for ( var i = 0; i < recordDefinition.length; i++) {
			var isRelation = false;
			if (this.relations) {
				var relation = this.relations[recordDefinition[i].mapping];
				
				if (relation) {
					isRelation = true;
				}
			}
			
			if (recordDefinition[i].mapping != "oid" && !isRelation) {
				result.push( {
					header : recordDefinition[i].name,
					dataIndex : recordDefinition[i].mapping,
					width : 100,
					sortable : true,
					editor: new Ext.form.TextField()
				});
			}
		}
	}
	
	return result;
}

/**
 * Returns the items of the editor of this Model Class.
 * 
 * <p>
 * The items need to be recreated on every call to this method, as there may be
 * several editors of the same Model Class at the same time.
 * </p>
 * 
 * @return The items of the editor of this Model Class.
 * @type Array
 */
cwe.model.ModelClass.prototype.getEditorItems = function() {
	throw "cwe.model.ModelClass.getEditorItems not overwritten";
}

/**
 * Returns the label of an object of this Model Class.
 * 
 * @param {cwe.model.ModelRecord}
 *            record The record of this Model Class to extract the label from.
 * @return The label of an object of this Model Class.
 * @type String
 */
cwe.model.ModelClass.prototype.getLabel = function(record) {
	return record.get("Name");
}

/**
 * Returns whether the target Model Class of the given field is a parent.
 * 
 * @param {String}
 *            fieldName The name of the field of the target Model Class.
 * @return Whether the target Model Class of the given field is a parent.
 * @type boolean
 */
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

/**
 * Returns the target Model Class of the given field.
 * 
 * @param {String}
 *            fieldName The name of the field the target Model Class is
 *            requested.
 * @return The target Model Class of the given field.
 * @type cwe.model.ModelClass
 */
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
