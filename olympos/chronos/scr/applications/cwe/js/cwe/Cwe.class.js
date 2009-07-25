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
Ext.namespace("cwe");

/**
 * @class The main class of the application.
 * 
 * @constructor
 * @extends chi.Main
 */
cwe.Cwe = function() {
	cwe.Cwe.superclass.constructor.call(this);
	
	this.isInstallErrorHandler = false;
}

Ext.extend(cwe.Cwe, chi.Main);

/**
 * Returns the config object.
 * 
 * <p>
 * Abstract function to be implemented by subclass.
 * </p>
 * 
 * @return {Object} The config object.
 */
cwe.Cwe.prototype.getConfig = function() {
	return cwe.Config;
}

/**
 * Starts the workbench.
 * 
 * <p>
 * Abstract function to be implemented by subclass. Has to assign the viewport
 * to this.viewport.
 * </p>
 */
cwe.Cwe.prototype.startWorkbench = function() {
	this.viewport = new cwe.ui.Workbench();
}

/**
 * Returns the instance of the application class.
 * 
 * @return {cwe.Cwe} The instance of the application class.
 */
cwe.Cwe.getInstance = function() {
	if (!cwe.Cwe.instance) {
		cwe.Cwe.instance = new cwe.Cwe();
	}
	
	return cwe.Cwe.instance;
}
