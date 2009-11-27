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

cwl.model.Property = function(owner) {
	cwl.model.Property.superclass.constructor.call(this);

	this.owner = owner;
}

Ext.extend(cwl.model.Property, chi.model.ModelElement);

cwl.model.Property.prototype.getOwner = function() {
	return this.owner;
}
