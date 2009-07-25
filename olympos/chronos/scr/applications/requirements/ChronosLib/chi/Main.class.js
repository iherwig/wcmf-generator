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
Ext.namespace("chi");

/**
 * @class The main class of the application.
 * 
 * <p>
 * To be extended by the main class of each application.
 * </p>
 * 
 * <p>
 * This class is a <i>Singleton</i>.
 * </p>
 * 
 * @constructor
 */
chi.Main = function() {
	/**
	 * Whether to install error handlers.
	 * 
	 * To be overridden by extending classes. May be useful to switch of for
	 * debugging.
	 * 
	 * @type boolean
	 */
	this.isInstallErrorHandler = true;
	
	/**
	 * The viewport of the application.
	 * 
	 * @type Ext.Viewport
	 */
	this.viewport = null;
}

/**
 * Processes the config file.
 * 
 * <p>
 * To be called as last command in the config file.
 * </p>
 */
chi.Main.prototype.processConfig = function() {
	document.title = this.getConfig().appTitle;
}

/**
 * Returns the config object.
 * 
 * <p>
 * Abstract function to be implemented by subclass.
 * </p>
 * 
 * @return The config object.
 * @type Object
 */
chi.Main.prototype.getConfig = function() {
	
}

/**
 * Initializes application and shows login.
 * 
 * <p>
 * To be called from index.html. Installs error handlers and overrides. If a
 * parameter <code>sid</code> is given at the URL, it is taken as session id,
 * and login is skipped.
 * </p>
 */
chi.Main.prototype.startApplication = function() {
	if (this.isInstallErrorHandler) {
		this.installErrorHandler();
	}
	
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
		this.startSession(sid, this.getConfig().defaultLang);
	} else {
		/**
		 * The login window.
		 * 
		 * @type chi.Login
		 */
		this.login = new chi.Login();
	}
}

/**
 * Starts the session.
 * 
 * <p>
 * To be called by the login.
 * </p>
 * 
 * @param {String}
 *            sid The session id.
 * @param {String}
 *            lang The two-letter language code selected by the user.
 */
chi.Main.prototype.startSession = function(sid, lang) {
	chi.Session.getInstance().init(sid, lang, this.getConfig().jsonUrl);
	
	this.login.destroy();
	
	this.startWorkbench();
}

/**
 * Starts the workbench.
 * 
 * <p>
 * Abstract function to be implemented by subclass. Has to assign the viewport
 * to this.viewport.
 * </p>
 */
chi.Main.prototype.startWorbench = function() {
	
}

/**
 * Logs out the user and reloads the application.
 */
chi.Main.prototype.reload = function() {
	this.viewport.destroy();
	chi.persistency.Persistency.getInstance().logout(function() {
		
		window.location.reload();
		
	});
}

/**
 * Installs error handlers at all appropriate places.
 * 
 * @protected
 */
chi.Main.prototype.installErrorHandler = function() {
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

/**
 * Handler called on error.
 * 
 * <p>
 * Logs the error in the back-end.
 * </p>
 * 
 * <p>
 * If Config.debug is true, the error is shown as a message. Otherwise, a box is
 * displayed to the user, allowing to continue or restart the application.
 * </p>
 * 
 * @protected
 * 
 * @param {ErrorEvent}
 *            e The error event object.
 * @param {String}
 *            message The error message.
 * @param {String}
 *            uri The uri of the source file of the error.
 * @param {int}
 *            line The line number of the error.
 */
chi.Main.prototype.handleError = function(e, message, uri, line) {
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
	
	if (this.getConfig().debug) {
		chi.Util.showMessage(chi.Dict.translate("Error occured"), html, chi.Util.messageType.ERROR);
		
		throw e;
	} else {
		var self = this;
		
		var window = new Ext.Window( {
			id : chi.Main.ERROR_WINDOW_ID,
			title : chi.Dict.translate("Error occured"),
			layout : "fit",
			items : [ new Ext.Panel( {
				html : "<p class='chi-errorDialogMessage'>" + chi.Dict.translate("An application error occured. You may continue your work, but this might lead to further errors. If you choose to restart, your data will be saved.") + "</p>"
			}), new Ext.Panel( {
				id : chi.Main.ERROR_DETAILS_ID,
				title : chi.Dict.translate("Error details"),
				collapsed : true,
				collapsible : true,
				animCollapse : false,
				collapseFirst : true,
				html : "<div class='chi-errorDialogDetails'>" + html + "</div>",
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

/**
 * Installs useful Ext overrides.
 * 
 * @protected
 */
chi.Main.prototype.installOverrides = function() {
	Ext.override(Ext.form.Field, {
		loadValue : function(value) {
			this.setValue(value);
			this.originalValue = this.getValue();
		}
	});
	
	Ext.apply(Ext.EventObject, {
		within : function(el, related, allowEl) {
			if (el) {
				var t = this[related ? "getRelatedTarget" : "getTarget"]();
				return t && ((allowEl ? (t == Ext.getDom(el)) : false) || Ext.fly(el).contains(t));
			}
			return false;
		}
	});
	
}

/**
 * Id of the error window.
 * 
 * @protected
 * @type String
 */
chi.Main.ERROR_WINDOW_ID = "errorWindowId";

/**
 * Id of the error window details panel.
 * 
 * @protected
 * @type String
 */
chi.Main.ERROR_DETAILS_ID = "errorDetailsId";
