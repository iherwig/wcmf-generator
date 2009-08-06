
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
	
	this.cweModelElementId = "Adodbseq";
	this.name = "Adodbseq";
	this.treeIconClass = "AdodbseqTreeIcon16x16";
	this.owningPackageId = "application.application.include.model.wcmf.Wcmf_package";
	
	
	this.recordDefinition = [
	
	
	
	
	
	
	
	
	
	];

	
	
	this.relations = {
	

	
	
	
	};

};

Ext.extend(application.application.include.model.wcmf.Adodbseq, cwe.model.ModelClass);


application.application.include.model.wcmf.Adodbseq.prototype.getGridColumns = function() {
	return [
	
	];
};



application.application.include.model.wcmf.Adodbseq.prototype.getEditorItems = function() {
	return [
	
	
	
 ];
};


cwe.model.ModelClassContainer.getInstance().registerClass(new application.application.include.model.wcmf.Adodbseq());
	