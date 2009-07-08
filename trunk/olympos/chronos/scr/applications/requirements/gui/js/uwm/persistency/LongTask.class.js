/*
 * Copyright (c) 2008 The Olympos Development Team.
 *
 * http://sourceforge.net/projects/olympos/
 *
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html. If redistributing this code,
 * this entire header must remain intact.
 */
Ext.namespace("uwm.persistency");

/**
 * @class Implements a long task.
 * 
 * @extends uwm.persistency.Persistency.
 * @constructor
 * @param {Function}
 *            call The initial persistency call. The method must have two parameters
 *            successHandler and errorHandler, which will be used by LongTask.
 * @param {String}
 *            iFrameId The css id of an iFrame to load the final result into.
 */
uwm.persistency.LongTask = function(call, iFrameId) {
	this.call = call;
	this.iFrameId = iFrameId;
	
	// run callback functions
	this.processHandler = null;
	this.successHandler = null;
	this.errorHandler = null;
}

/**
 * Run the task. The task will do the required server calls and call the given handlers.
 */
uwm.persistency.LongTask.prototype.run = function(processHandler, successHandler, errorHandler) {
	
	this.processHandler = processHandler;
	this.successHandler = successHandler;
	this.errorHandler = errorHandler;
	
	// initial call
	if (this.call instanceof Function) {
		this.call(this.jsonSuccess.createDelegate(this), this.jsonError.createDelegate(this));
	}
}

uwm.persistency.LongTask.prototype.jsonSuccess = function(options, data) {
	
	var stepNumber = parseInt(data['stepNumber']);
	var numberOfSteps = parseInt(data['numberOfSteps']);
	var stepName = data['displayText'];
	var controller = data['controller'];

	if (stepNumber > numberOfSteps) {
		// call the success handler if the task finished
		if (this.successHandler instanceof Function) {
			this.successHandler();
		}
	}
	else if (stepNumber == numberOfSteps && this.iFrameId != null) {
		// if an iFrameId is given, the last request is loaded directly into the iFrame
		if (this.processHandler instanceof Function) {
			this.processHandler(stepName, stepNumber, numberOfSteps);
		}
		var self = this;
		var iFrame = Ext.get(this.iFrameId);
		if (iFrame) {
			iFrame.on("load", function() {
				self.onDownload.defer(10, self, [iFrame]);
			});
			iFrame.set({src:'../application/main.php?response_format=HTML&usr_action=continue&controller='+controller+'&sid='+uwm.Session.getInstance().getSid()});
			if (this.successHandler instanceof Function) {
				this.successHandler();
			}
		}
	}
	else {
		// do the proceeding calls
		if (this.processHandler instanceof Function) {
			this.processHandler(stepName, stepNumber, numberOfSteps);
		}
		uwm.persistency.Persistency.getInstance().doContinue(controller, this.jsonSuccess.createDelegate(this), this.jsonError.createDelegate(this));
	}
}

uwm.persistency.LongTask.prototype.jsonError = function(options, data) {

	// delegate to configured error handler
	if (this.errorHandler instanceof Function) {
		this.errorHandler();
	}
}

uwm.persistency.LongTask.prototype.onDownload = function(iFrame) {

	try {
		var result = Ext.util.JSON.decode(iFrame.dom.contentDocument.body.innerHTML);
		if (!result.success) {
			if (this.errorHandler instanceof Function) {
				this.errorHandler();
			}
		}
	} catch (e) {
		//do nothing, successful download of a file
	}
}
