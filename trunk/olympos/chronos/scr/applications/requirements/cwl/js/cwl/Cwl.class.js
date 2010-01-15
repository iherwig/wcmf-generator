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
Ext.namespace("cwl");

/**
 * @class The main class of the application.
 * 
 * @constructor
 * @extends chi.Main
 */
cwl.Cwl = function() {
	cwl.Cwl.superclass.constructor.call(this);
	
	this.isInstallErrorHandler = false;
};

Ext.extend(cwl.Cwl, chi.Main);

/**
 * Returns the config object.
 * 
 * <p>
 * Abstract function to be implemented by subclass.
 * </p>
 * 
 * @return {Object} The config object.
 */
cwl.Cwl.prototype.getConfig = function() {
	return cwl.Config;
};

/**
 * Starts the workbench.
 * 
 * <p>
 * Abstract function to be implemented by subclass. Has to assign the viewport
 * to this.viewport.
 * </p>
 */
cwl.Cwl.prototype.startWorkbench = function() {
	//this.bootstrap();
	this.viewport = new cwl.ui.Workbench();
	
	// load/create demo rule
	var self = this;
	var actionSetLoad = new chi.persistency.ActionSet();
	actionSetLoad.addList('ProductionRule', 1, 0, 'id', 'asc', function(data) {
		if (data.records.length > 0) {
			self.viewport.textRuleTabPanel.loadRule(data.records[0].getOid());
		}
		else {
			var actionSetCreate = new chi.persistency.ActionSet();
			actionSetCreate.addCreate('ProductionRule', function(data) {
				self.viewport.textRuleTabPanel.loadRule(data.oid);
			});
			actionSetCreate.commit(
				function(request) {
				}, function(data, errorMessage) {
					chi.Log.log(errorMessage, chi.Log.ERROR);
				}
			);
		}
	});
	actionSetLoad.commit(
		function(request) {}, 
		function(data, errorMessage) {
			chi.Log.log(errorMessage, chi.Log.ERROR);
		}
	);
};

cwl.Cwl.prototype.installOverrides = function() {
	cwl.Cwl.superclass.installOverrides.call(this);
};

/**
 * Returns the instance of the application class.
 * 
 * @return {cwl.Cwl} The instance of the application class.
 */
cwl.Cwl.getInstance = function() {
	if (!cwl.Cwl.instance) {
		cwl.Cwl.instance = new cwl.Cwl();
	}
	
	return cwl.Cwl.instance;
};

/*
cwl.Cwl.prototype.bootstrap = function() {
  var modelElementContainer = cwl.model.ModelElementContainer.getInstance();
	for (var i=0; i<modelTree.length; i++) {
		this.processElement(modelTree[i], modelElementContainer);
	}

	var ruleElementContainer = cwl.rule.RuleElementContainer.getInstance();
	for (var i=0; i<ruleElements.length; i++) {
		this.processElement(ruleElements[i], ruleElementContainer);
	}
}

cwl.Cwl.prototype.processElement = function(element, container) {
	if (["Model", "Package", "ChiBusinessProcess", "ActivitySet", "ChiBusinessUseCase"].indexOf(element.type) != -1) {
		var e = new chi.model.ModelPackage();
	}
	else {
		var e = new chi.model.ModelElement();
	}

	for (var property in element) {
		e[property] = element[property];
	}
	e.cwlModelElementId = element.id || Ext.id();
		
	var parent = null;
	if (element.parentId) {
		parent = container.getElement(element.parentId);
		parent.add(e);
	}

	container.registerElement(e);

	return e;
}
*/