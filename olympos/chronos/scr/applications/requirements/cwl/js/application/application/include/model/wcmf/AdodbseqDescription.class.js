/*
 * Copyright (c) 2009 The Olympos Development Team.
 * 
 * http://sourceforge.net/projects/olympos/
 * 
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html. If redistributing this code,
 * this entire header must remain intact.
 */
Ext.namespace("application.application.include.model.wcmf");

application.application.include.model.wcmf.AdodbseqDescription = function() {
	application.application.include.model.wcmf.AdodbseqDescription.superclass.constructor.call(this, arguments);
	
	this.chiModelElementId = "Adodbseq";
	this.name = "Adodbseq";
	this.treeIconClass = "AdodbseqTreeIcon16x16";
	this.owningPackageId = "application.application.include.model.wcmf.Wcmf_package";
	
	
	this.recordDefinition = [
	
	
	
	
	
	
	
	
	
	];

	
	
	this.relations = {
	

	
	
	
	};

};

Ext.extend(application.application.include.model.wcmf.AdodbseqDescription, chi.model.ModelDescription);


application.application.include.model.wcmf.AdodbseqDescription.prototype.getGridColumns = function() {
	return [
	
	];
};



application.application.include.model.wcmf.AdodbseqDescription.prototype.getLabelColumns = function() {
	return [
	
	];
};



application.application.include.model.wcmf.AdodbseqDescription.prototype.getEditorItems = function() {
	return [
	
	
	
 ];
};



/**
 * Returns the label of an object of the Model Class.
 * 
 * @param {chi.model.ModelRecord}
 *            record The record of the Model Class to extract the label from.
 * @return The label of an object of the Model Class.
 * @type String
 */
application.application.include.model.wcmf.AdodbseqDescription.prototype.getLabel = function(record) {
	var label = record.get("");
	if (label == undefined || label.length == 0) {
		label = record.getOid(); 
	}
	return label;
};



/**
 * Returns a newly created instance of the Model Class, which inherits {chi.model.ModelRecord}.
 * 
 * @param {String}
 *            oid The object id of the instance.
 * @param {Object}
 *            data A map containing attribute names as keys and initial values
 *            as map values.
 * @return The instance of the Model Class.
 * @type {chi.model.ModelRecord}
 */
application.application.include.model.wcmf.AdodbseqDescription.prototype.createInstance = function(oid, data) {
	return new application.application.include.model.wcmf.Adodbseq(oid, data);
};


chi.model.ModelDescriptionContainer.getInstance().registerDescription(new application.application.include.model.wcmf.AdodbseqDescription());
	