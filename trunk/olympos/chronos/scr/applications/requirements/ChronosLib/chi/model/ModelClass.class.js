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
 * @class Describes one application class.
 * 
 * <p>
 * This class is not intended to be instantiated, but to be extended.
 * </p>
 * 
 * <p>
 * Only one instance of each concrete subclass must exist. They are registered
 * to {@link chi.model.ModelClassContainer} and can be retrieved from there by
 * their unique id.
 * </p>
 * 
 * @extends chi.model.ModelElement
 * @constructor
 */
chi.model.ModelClass = function() {
	chi.model.ModelClass.superclass.constructor.call(this, arguments);
	
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
	 * The definition of relations of this Model Class to other Model Classes.
	 * 
	 * <p>
	 * Contains a map with attribute name as key and another map as value. The
	 * inner map contains (at the moment) one field:
	 * <ul>
	 * <li><code>targetModelClassid</code> of type <code>String</code>
	 * contains the unique id of the target Model Class.</li>
	 * </ul>
	 * </p>
	 */
	this.relations = null;
};

Ext.extend(chi.model.ModelClass, chi.model.ModelElement);

/**
 * Returns the definition of a record of this Model Class.
 * 
 * @throws If
 *             this method is not overridden by subclasses.
 * @return The definition of a record of this Model Class.
 * @type Array
 */
chi.model.ModelClass.prototype.getRecordDefinition = function() {
	if (!this.recordDefinition) {
		throw "chi.model.ModelClass.recordDefinition not set in subclass";
	}
	
	return this.recordDefinition;
};

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
chi.model.ModelClass.prototype.getGridColumns = function() {
	var recordDefinition = this.getRecordDefinition();
	
	var result = [];
	
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
			    editor : new Ext.form.TextField()
			});
		}
	}
	
	return result;
};

chi.model.ModelClass.prototype.getLabelColumns = function() {
	return this.getGridColumns();
};

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
chi.model.ModelClass.prototype.getEditorItems = function() {
	throw "chi.model.ModelClass.getEditorItems not overwritten";
};

/**
 * Returns the label of an object of this Model Class.
 * 
 * @param {chi.model.ModelRecord}
 *            record The record of this Model Class to extract the label from.
 * @return The label of an object of this Model Class.
 * @type String
 */
chi.model.ModelClass.prototype.getLabel = function(record) {
	return record.get("Name");
};

/**
 * Get the related Model Classes of this Model Class.
 * 
 * @param {String}
 *            hierarchyType 'children', 'parents', 'all'.
 * @return An array of Model Classes.
 * @type Array
 */
chi.model.ModelClass.prototype.getRelatedClasses = function(hierarchyType) {
	var result = new Array();
	
	if (this.relations) {
		for ( var relationName in this.relations) {
			if (!(relationName instanceof Function)) {
				var relation = this.relations[relationName];
				if (hierarchyType == 'all' || (hierarchyType == 'children' && relation.isParent) || 
					(hierarchyType == 'parents' && !relation.isParent))
				result.push(chi.model.ModelClassContainer.getInstance().getClass(relation.targetModelClassId));
			}
		}
	}
	
	return result;
};

/**
 * Returns the target Model Class of the given field.
 * 
 * @param {String}
 *            fieldName The name of the field the target Model Class is
 *            requested.
 * @return The target Model Class of the given field.
 * @type chi.model.ModelClass
 */
chi.model.ModelClass.prototype.getTargetModelClass = function(fieldName) {
	var result = false;
	
	if (this.relations) {
		var relation = this.relations[fieldName];
		
		if (relation) {
			result = chi.model.ModelClassContainer.getInstance().getClass(relation.targetModelClassId);
		}
	}
	
	return result;
};

chi.model.ModelClass.prototype.getNewLabel = function() {
	return chi.Dict.translate("New ${1}", this.getName());
};
