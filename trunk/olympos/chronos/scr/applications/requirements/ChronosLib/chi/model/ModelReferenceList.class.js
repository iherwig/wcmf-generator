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
 * @class A list of Model References of one Model Class.
 * 
 * @extends Ext.util.MixedCollection
 * @constructor
 * @see chi.model.ModelReference
 * @param {chi.model.ModelDescription}
 *            modelDescription The Model Description of the contained Model References.
 */
chi.model.ModelReferenceList = function(modelDescription) {
	chi.model.ModelReferenceList.superclass.constructor.call(this, false, function(modelReference) {
		return modelReference.getOid();
	});
	
	this.modelDescription = modelDescription;
};

Ext.extend(chi.model.ModelReferenceList, Ext.util.MixedCollection);

/**
 * Returns the Model Description of the contained Model References.
 * 
 * @return The Model Description of the contained Model References.
 * @type chi.model.ModelDescription
 */
chi.model.ModelReferenceList.prototype.getModelDescription = function() {
	return this.modelDescription;
};

/**
 * Returns a copy of this list, excluding the elements contained in
 * <code>otherList</code>.
 * 
 * @param {chi.model.ModelreferenceList}
 *            otherList The list of the References to exclude.
 * 
 * @return A copy of this list, excluding the elements contained in
 *         <code>otherList</code>.
 * @type chi.model.ModelReferenceList
 */
chi.model.ModelReferenceList.prototype.except = function(otherList) {
	var result = new chi.model.ModelReferenceList(this.getModelDescription());
	
	this.each(function(elem) {
		if (!otherList.get(elem.getOid())) {
			result.add(elem.getOid(), elem);
		}
	});
	
	return result;
};