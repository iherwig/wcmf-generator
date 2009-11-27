
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
Ext.namespace("application.application.include.model.wcmf");

application.application.include.model.wcmf.Adodbseq = function() {
	application.application.include.model.wcmf.Adodbseq.superclass.constructor.call(this, arguments);
	
	this.chiModelElementId = "Adodbseq";
	this.name = "Adodbseq";
	this.treeIconClass = "AdodbseqTreeIcon16x16";
	this.owningPackageId = "application.application.include.model.wcmf.Wcmf_package";
	
	
	this.recordDefinition = [
	
	
	
	
	
	
	
	
	
	];

	
	
	this.relations = {
	

	
	
	
	};

};

Ext.extend(application.application.include.model.wcmf.Adodbseq, chi.model.ModelClass);


application.application.include.model.wcmf.Adodbseq.prototype.getGridColumns = function() {
	return [
	
	];
};



application.application.include.model.wcmf.Adodbseq.prototype.getLabelColumns = function() {
	return [
	
	];
};



application.application.include.model.wcmf.Adodbseq.prototype.getEditorItems = function() {
	return [
	
	
	
 ];
};



/**
 * Returns the label of an object of this Model Class.
 * 
 * @param {chi.model.ModelRecord}
 *            record The record of this Model Class to extract the label from.
 * @return The label of an object of this Model Class.
 * @type String
 */
application.application.include.model.wcmf.Adodbseq.prototype.getLabel = function(record) {
	var label = record.get("");
	if (label == undefined || label.length == 0) {
		label = record.getOid(); 
	}
	return label;
};


chi.model.ModelClassContainer.getInstance().registerClass(new application.application.include.model.wcmf.Adodbseq());
	