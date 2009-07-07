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

Ext.namespace("cwl.model");

cwl.model.ModelElementContainer = function() {
	this.elements = new Ext.util.MixedCollection();
}

cwl.model.ModelElementContainer.prototype.registerElement = function(modelElement) {
	this.elements.add(modelElement.getId(), modelElement);
}

cwl.model.ModelElementContainer.prototype.getElement = function(cwlModelElementId) {
	return this.elements.get(cwlModelElementId);
}

cwl.model.ModelElementContainer.prototype.getAllElements = function() {
	return this.elements;
}

cwl.model.ModelElementContainer.getInstance = function() {
	if (!cwl.model.ModelElementContainer.instance) {
		cwl.model.ModelElementContainer.instance = new cwl.model.ModelElementContainer();
	}
	
	return cwl.model.ModelElementContainer.instance;
}
