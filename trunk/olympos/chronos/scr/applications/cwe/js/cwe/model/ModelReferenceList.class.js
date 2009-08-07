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
 * @class A list of Model References of one Model Class.
 * 
 * @extends Ext.util.MixedCollection
 * @constructor
 * @see cwe.model.ModelReference
 * @param {cwe.model.ModelClass}
 *            modelClass The Model Class of the contained Model References.
 */
cwe.model.ModelReferenceList = function(modelClass) {
	cwe.model.ModelReferenceList.superclass.constructor.call(this, false, function(modelReference) {
		return modelReference.getOid();
	});
	
	this.modelClass = modelClass;
};

Ext.extend(cwe.model.ModelReferenceList, Ext.util.MixedCollection);

/**
 * Returns the Model Class of the contained Model References.
 * 
 * @return The Model Class of the contained Model References.
 * @type cwe.model.ModelClass
 */
cwe.model.ModelReferenceList.prototype.getModelClass = function() {
	return this.modelClass;
};

/**
 * Returns a copy of this list, excluding the elements contained in
 * <code>otherList</code>.
 * 
 * @param {cwe.model.ModelreferenceList}
 *            otherList The list of the References to exclude.
 * 
 * @return A copy of this list, excluding the elements contained in
 *         <code>otherList</code>.
 * @type cwe.model.ModelReferenceList
 */
cwe.model.ModelReferenceList.prototype.except = function(otherList) {
	var result = new cwe.model.ModelReferenceList(this.getModelClass());
	
	this.each(function(elem) {
		if (!otherList.get(elem.getOid())) {
			result.add(elem.getOid(), elem);
		}
	});
	
	return result;
};
