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
Ext.namespace("cwb");

/**
 * @class The main class of the application.
 *
 * @constructor
 */
cwb.Cwb = function() {
}

cwb.Cwb.prototype.processConfig = function() {
	document.title = cwb.Config.appTitle;
}

cwb.Cwb.prototype.startApplication = function() {
	this.installErrorHandler();
	this.installOverrides();
	
	var params = location.search.split(/&/);
	
	var sid = null;
	
	for (var i = 0; i < params.length; i++) {
		var parts = params[i].split(/=/);
		
		if (parts[0] = "sid") {
			sid = parts[1];
			break;
		}
	}
	
	if (sid) {
		cwb.Session.getInstance().init(sid);
		this.workbench = new cwb.ui.Workbench();
	} else {
		this.login = new cwb.ui.Login();
	}
}

cwb.Cwb.prototype.startSession = function(sid, lang) {
	cwb.Session.getInstance().init(sid, lang);
	
	this.login.destroy();
	
	this.defaultWorkbench = cwb.ui.Workbench.getInstance();
	
	this.viewport = this.defaultWorkbench;
}

cwb.Cwb.prototype.reload = function() {
	this.viewport.destroy();
	cwb.persistency.Persistency.getInstance().logout(function() {
		window.location.reload();
	});
}

cwb.Cwb.prototype.installErrorHandler = function() {
return;
	var self = this;
	
	var originalAddListener = Ext.EventManager.addListener;
	
	Ext.EventManager.addListener = function(element, eventName, fn, scope, options) {
		scope = scope || this;
		
		return originalAddListener(element, eventName, function() {
			try {
				fn.apply(scope || this, arguments);
			} catch (e) {
				self.handleError(e);
			}
		}, scope, options);
	}
	
	Ext.EventManager.on = Ext.EventManager.addListener;
	
	window.onerror = function(message, uri, line) {
		self.handleError(null, message, uri, line);
	}
}

cwb.Cwb.prototype.handleError = function(e, message, uri, line) {
	var data = new Object();
	
	data["file"] = uri ? uri : e && e.fileName ? e.fileName : "unknown";
	data["line number"] = line ? line : e && e.lineNumber ? e.lineNumber : "unknown";
	data["error name"] = e && e.name ? e.name : "unknown";
	data["error message"] = message ? message : e && e.message ? e.message : "unknown";
	data["stack"] = e && e.stack ? e.stack : "unknown";
	
	var plainText = "";
	for (var i in data) {
		var val = data[i];
		if (!(val instanceof Function)) {
			plainText += i + ": " + val + "\n";
		}
	}
	
	cwb.persistency.Persistency.getInstance().log("error", plainText);
	
	var html = "";
	for (var i in data) {
		var val = data[i];
		if (!(val instanceof Function)) {
			html += "<p><b>" + i + ":</b> " +
			("" + val).replace(/\n/g, "<br />") +
			"</p>";
		}
	}
	
	if (cwb.Config.debug) {
		cwb.Util.showMessage(cwb.Dict.translate("Error occured"), html, cwb.Util.messageType.ERROR);
		
		throw e;
	} else {
		var self = this;
		
		var window = new Ext.Window({
			id: cwb.Cwb.ERROR_WINDOW_ID,
			title: cwb.Dict.translate("Error occured"),
			layout: "fit",
			items: [new Ext.Panel({
				html: "<p class='cwb-errorDialogMessage'>" +
				cwb.Dict.translate("An application error occured. Your data will be saved and the application will be restarted.") +
				"</p>"
			}), new Ext.Panel({
				id: cwb.Cwb.ERROR_DETAILS_ID,
				title: cwb.Dict.translate("Error details"),
				collapsed: true,
				collapsible: true,
				animCollapse: false,
				collapseFirst: true,
				html: "<div class='cwb-errorDialogDetails'>" +
				html +
				"</div>",
				listeners: {
					"collapse": function() {
						window.center();
					},
					"expand": function() {
						window.center();
					}
				}
			})],
			buttons: [{
				text: cwb.Dict.translate("OK"),
				handler: function() {
					self.reload();
				}
			}, {
				text: cwb.Dict.translate("Continue on your own risk"),
				handler: function() {
					window.destroy();
				}
			}]
		});
		
		window.show();
	}
}

cwb.Cwb.prototype.installOverrides = function() {
	Ext.override(Ext.form.Field, {
		loadValue: function(value) {
			this.setValue(value);
			this.originalValue = this.getValue();
		}
	});
}

cwb.Cwb.getInstance = function() {
	if (!cwb.Cwb.instance) {
		cwb.Cwb.instance = new cwb.Cwb();
	}
	
	return cwb.Cwb.instance;
}

cwb.Cwb.ERROR_WINDOW_ID = "errorWindowId";
cwb.Cwb.ERROR_DETAILS_ID = "errorDetailsId";
