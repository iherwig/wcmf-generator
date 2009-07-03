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
 */
cwe.Cwe = function() {
}

cwe.Cwe.prototype.processConfig = function() {
	document.title = cwe.Config.appTitle;
}

cwe.Cwe.prototype.startApplication = function() {
	this.installErrorHandler();
	this.installOverrides();
	
	var params = location.search.split(/&/);
	
	var sid = null;
	
	for ( var i = 0; i < params.length; i++) {
		var parts = params[i].split(/=/);
		
		if (parts[0] = "sid") {
			sid = parts[1];
			break;
		}
	}
	
	if (sid) {
		this.startSession(sid, cwe.Config.defaultLang);
	} else {
		this.login = new chi.Login();
	}
}

cwe.Cwe.prototype.startSession = function(sid, lang) {
	chi.Session.getInstance().init(sid, lang, cwe.Config.jsonUrl);
	
	this.login.destroy();
	
	this.defaultWorkbench = new cwe.ui.Workbench();
	
	this.viewport = this.defaultWorkbench;
}

cwe.Cwe.prototype.reload = function() {
	this.viewport.destroy();
	chi.persistency.Persistency.getInstance().logout(function() {
		
		window.location.reload();
		
	});
}

cwe.Cwe.prototype.installErrorHandler = function() {
	var self = this;
	
	var originalAddListener = Ext.EventManager.addListener;
	
	Ext.EventManager.addListener = function(element, eventName, fn, scope, options) {
		scope = scope || this;
		
		return originalAddListener(element, eventName, function() {
			try {
				fn.apply(scope || this, arguments);
			}
			catch (e) {
				self.handleError(e);
			}
		}, scope, options);
	}

	Ext.EventManager.on = Ext.EventManager.addListener;
	
	window.onerror = function(message, uri, line) {
		self.handleError(null, message, uri, line);
	}
}

cwe.Cwe.prototype.handleError = function(e, message, uri, line) {
	var data = new Object();
	
	data["file"] = uri ? uri : e && e.fileName ? e.fileName : "unknown";
	data["line number"] = line ? line : e && e.lineNumber ? e.lineNumber : "unknown";
	data["error name"] = e && e.name ? e.name : "unknown";
	data["error message"] = message ? message : e && e.message ? e.message : "unknown";
	data["stack"] = e && e.stack ? e.stack : "unknown";
	
	var plainText = "";
	for ( var i in data) {
		var val = data[i];
		if (!(val instanceof Function)) {
			plainText += i + ": " + val + "\n";
		}
	}
	
	chi.persistency.Persistency.getInstance().log("error", plainText);
	
	var html = "";
	for ( var i in data) {
		var val = data[i];
		if (!(val instanceof Function)) {
			html += "<p><b>" + i + ":</b> " + ("" + val).replace(/\n/g, "<br />") + "</p>";
		}
	}
	
	if (cwe.Config.debug) {
		chi.Util.showMessage(chi.Dict.translate("Error occured"), html, chi.Util.messageType.ERROR);
		
		throw e;
	} else {
		var self = this;
		
		var window = new Ext.Window( {
			id : cwe.Cwe.ERROR_WINDOW_ID,
			title : chi.Dict.translate("Error occured"),
			layout : "fit",
			items : [ new Ext.Panel( {
				html : "<p class='cwe-errorDialogMessage'>" + chi.Dict.translate("An application error occured. You may continue your work, but this might lead to further errors. If you choose to restart, your data will be saved.") + "</p>"
			}), new Ext.Panel( {
				id : cwe.Cwe.ERROR_DETAILS_ID,
				title : chi.Dict.translate("Error details"),
				collapsed : true,
				collapsible : true,
				animCollapse : false,
				collapseFirst : true,
				html : "<div class='cwe-errorDialogDetails'>" + html + "</div>",
				listeners : {
					"collapse" : function() {
						window.center();
					},
					"expand" : function() {
						window.center();
					}
				}
			}) ],
			buttons : [ {
				text : chi.Dict.translate("Continue"),
				handler : function() {
					window.destroy();
				}
			}, {
				text : chi.Dict.translate("Restart"),
				handler : function() {
					self.reload();
				}
			} ]
		});
		
		window.show();
	}
}

cwe.Cwe.prototype.installOverrides = function() {
	Ext.override(Ext.form.Field, {
		loadValue : function(value) {
			this.setValue(value);
			this.originalValue = this.getValue();
		}
	});
	
	Ext.apply(Ext.EventObject, {
		within : navigator.userAgent.match(/firefox\/((\d+\.)+\d+)/i)[1] >= 3.5 ? function(el, related, allowEl) {
			try {
				if (el) {
					var t = this[related ? "getRelatedTarget" : "getTarget"]();
					return t && ((allowEl ? (t == Ext.getDom(el)) : false) || Ext.fly(el).contains(t));
				}
			}
			catch (e) {
			}
			return false;
		} : function(el, related, allowEl) {
			if (el) {
				var t = this[related ? "getRelatedTarget" : "getTarget"]();
				return t && ((allowEl ? (t == Ext.getDom(el)) : false) || Ext.fly(el).contains(t));
			}
			return false;
		}
	});
	
}

cwe.Cwe.getInstance = function() {
	if (!cwe.Cwe.instance) {
		cwe.Cwe.instance = new cwe.Cwe();
	}
	
	return cwe.Cwe.instance;
}

cwe.Cwe.ERROR_WINDOW_ID = "errorWindowId";
cwe.Cwe.ERROR_DETAILS_ID = "errorDetailsId";
