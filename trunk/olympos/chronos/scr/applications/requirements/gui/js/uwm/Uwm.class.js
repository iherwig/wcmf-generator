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
Ext.namespace("uwm");

/**
 * @class The main class of the application.
 *
 * @constructor
 */
uwm.Uwm = function() {
}

uwm.Uwm.prototype.processConfig = function() {
	document.title = uwm.Config.appTitle;
}

uwm.Uwm.prototype.startApplication = function() {
	this.installErrorHandler();
	this.installOverrides();
	
	var self = this;
	uwm.event.EventBroker.getInstance().addListener({
		"changeModelLanguage": function(language) {
			self.restart();
		}
	});
	
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
		this.startSession(sid, uwm.i18n.Localization.getInstance().getDefaultModelLanguage());
	} else {
		this.login = new uwm.ui.Login();
	}
}

uwm.Uwm.prototype.startSession = function(sid, lang) {
	uwm.Session.getInstance().init(sid, lang);
	
	if (this.login) {
		this.login.destroy();
	}

	var self = this;
	uwm.i18n.Localization.getInstance().loadModelLanguages(function() {
		// create viewport after the model languages are loaded
		// in order to make sure that all ui components get
		// a valid list of languages
		self.createViewport();
	});

}

uwm.Uwm.prototype.createViewport = function() {
	this.defaultWorkbench = new uwm.ui.Workbench();
	this.adminWorkbench = new uwm.tabadmin.Workbench();
	this.viewport = new Ext.Viewport({
		layout: "card",
		activeItem: 0,
		items: [this.defaultWorkbench, this.adminWorkbench]
	})
}

uwm.Uwm.prototype.switchWorkbench = function(newWorkbench) {
	switch (newWorkbench) {
		case "admin":
			if (uwm.diagram.DiagramContainer.getInstance().getTabPanel().getActiveTab().saveScrollPosition) {
				uwm.diagram.DiagramContainer.getInstance().getTabPanel().getActiveTab().saveScrollPosition();
			}
			this.viewport.getLayout().setActiveItem(1);
			break;
			
		case "default":
		default:
			this.viewport.getLayout().setActiveItem(0);
			if (uwm.diagram.DiagramContainer.getInstance().getTabPanel().getActiveTab().restoreScrollPosition) {
				uwm.diagram.DiagramContainer.getInstance().getTabPanel().getActiveTab().restoreScrollPosition();
			}
			break;
	}
}

uwm.Uwm.prototype.getActiveWorkbench = function() {
	return this.viewport.getLayout().activeItem;
}

uwm.Uwm.prototype.reload = function() {
	this.viewport.destroy();
	uwm.persistency.Persistency.getInstance().logout(function() {
		window.location.reload();
	});
}

uwm.Uwm.prototype.restart = function() {
	// destroy the viewport
	this.viewport.destroy();

	// reset singletons
	uwm.event.EventBroker.instance = null;
	uwm.hierarchytree.HierarchyTree.instance = null;
	uwm.modeltree.ModelTree.getInstance().destroy();
	uwm.objectgrid.ObjectGridContainer.instance = null;
	uwm.diagram.DiagramContainer.instance = null;
	uwm.model.ModelContainer.instance = null;
	uwm.property.PropertyContainer.instance = null;

	// reinstall event listeners
	var self = this;
	uwm.event.EventBroker.getInstance().addListener({
		"changeModelLanguage": function(language) {
			self.restart();
		}
	});
	
	// restart the application
	this.createViewport();
	this.switchWorkbench("default");
}

uwm.Uwm.prototype.installErrorHandler = function() {
	var self = this;
	
	var originalAddListener = Ext.EventManager.addListener;
	
	Ext.EventManager.addListener = function(element, eventName, fn, scope, options) {
		scope = scope || this;
		
		return originalAddListener(element, eventName, function() {
			try {
				fn.apply(scope || this, arguments);
			} catch (e) {
				// TODO: Check if this will be obsolete in a future version of ExtJs/Firefox
				if (e.message != "Permission denied to access property 'dom' from a non-chrome context") {
					self.handleError(e);
				}
			}
		}, scope, options);
	}
	
	Ext.EventManager.on = Ext.EventManager.addListener;
	
	window.onerror = function(message, uri, line) {
		self.handleError(null, message, uri, line);
	}
}

uwm.Uwm.prototype.handleError = function(e, message, uri, line) {
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
	
	uwm.persistency.Persistency.getInstance().log("error", plainText);
	
	var html = "";
	for (var i in data) {
		var val = data[i];
		if (!(val instanceof Function)) {
			html += "<p><b>" + i + ":</b> " +
			("" + val).replace(/\n/g, "<br />") +
			"</p>";
		}
	}
	
	if (uwm.Config.debug) {
		uwm.Util.showMessage(uwm.Dict.translate("Error occured"), html, uwm.Util.messageType.ERROR);
		
		throw e;
	} else {
		var self = this;
		
		var window = new Ext.Window({
			id: uwm.Uwm.ERROR_WINDOW_ID,
			title: uwm.Dict.translate("Error occured"),
			layout: "fit",
			items: [new Ext.Panel({
				html: "<p class='uwm-errorDialogMessage'>" +
				uwm.Dict.translate("An application error occured. You may continue your work, but this might lead to further errors.<br/>If you choose to restart, your data will be saved.") + "<br/><br/>" + 
				uwm.Dict.translate("To report the error click the following link to get to the ") + "<a href='http://sourceforge.net/tracker/?group_id=198381&atid=965248' target='_blank'>" +
				uwm.Dict.translate("bug tracking system") + "</a>." +
				"</p>"
			}), new Ext.Panel({
				id: uwm.Uwm.ERROR_DETAILS_ID,
				title: uwm.Dict.translate("Error details"),
				collapsed: true,
				collapsible: true,
				animCollapse: false,
				collapseFirst: true,
				titleCollapse : true,
				html: "<div class='uwm-errorDialogDetails'>" +
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
				text: uwm.Dict.translate("Continue"),
				handler: function() {
					window.destroy();
				}
			},{
				text: uwm.Dict.translate("Restart"),
				handler: function() {
					self.reload(true);
				}
			}]
		});
		
		window.show();
	}
}

uwm.Uwm.prototype.installOverrides = function() {
	Ext.override(Ext.form.Field, {
		loadValue : function(value) {
			this.setValue(value);
			this.originalValue = this.getValue();
		}
	});
	
	// Fix bug: #3204229
	// Reordering nodes in the ModelTree throw a NPE in ColorAnim
	Ext.override(Ext.lib.ColorAnim, {
		doMethod : function(attr, start, end) {
			if (end != null) {
				return doMethod.call(this);
			}
			else {
				uwm.Log.log("ColorAnimation received null value for end color", uwm.Log.WARN);
			}
		}
	});
    
	draw2d.Graphics.prototype.drawString=function(text, x, y) {
		var _x = this.xt+x*this.cosRadian-y*this.sinRadian;
		var _y = this.yt+x*this.sinRadian+y*this.cosRadian;

		if (this.sinRadian == -1) {
			_y -= parseInt(this.jsGraphics.ftSz);
		}
		
		if (this.cosRadian == -1 || this.cosRadian == 1) {
			_y -= parseInt(this.jsGraphics.ftSz) / 2;
		}
	   
		this.jsGraphics.drawString(text, _x,_y);
	}
}

uwm.Uwm.getInstance = function() {
	if (!uwm.Uwm.instance) {
		uwm.Uwm.instance = new uwm.Uwm();
	}
	
	return uwm.Uwm.instance;
}

uwm.Uwm.ERROR_WINDOW_ID = "errorWindowId";
uwm.Uwm.ERROR_DETAILS_ID = "errorDetailsId";
