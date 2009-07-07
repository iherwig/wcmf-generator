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
Ext.namespace("cwl");

/**
 * @class The main class of the application.
 * 
 * @constructor
 */
cwl.Cwl = function() {
}

cwl.Cwl.prototype.processConfig = function() {
	document.title = cwl.Config.appTitle;
}

cwl.Cwl.prototype.startApplication = function() {
	this.installErrorHandler();
	this.installOverrides();
  this.bootstrap();
	
	var params = location.search.split(/&/);
	
	var sid = null;
	
	for ( var i = 0; i < params.length; i++) {
		var parts = params[i].split(/=/);
		
		if (parts[0] = "sid") {
			sid = parts[1];
			break;
		}
	}
	/*
	if (sid) {
		this.startSession(sid, cwl.Config.defaultLang);
	} else {
		this.login = new chi.Login();
	}
  */
	this.defaultWorkbench = new cwl.ui.Workbench();
	this.viewport = this.defaultWorkbench;
}

cwl.Cwl.prototype.startSession = function(sid, lang) {
	chi.Session.getInstance().init(sid, lang, cwl.Config.jsonUrl);
	
	this.login.destroy();
	
	this.defaultWorkbench = new cwl.ui.Workbench();
	
	this.viewport = this.defaultWorkbench;
}

cwl.Cwl.prototype.reload = function() {
	this.viewport.destroy();
	chi.persistency.Persistency.getInstance().logout(function() {
		
		window.location.reload();
		
	});
}

cwl.Cwl.prototype.installErrorHandler = function() {
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

cwl.Cwl.prototype.handleError = function(e, message, uri, line) {
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
	
	if (cwl.Config.debug) {
		chi.Util.showMessage(chi.Dict.translate("Error occured"), html, chi.Util.messageType.ERROR);
		
		throw e;
	} else {
		var self = this;
		
		var window = new Ext.Window( {
			id : cwl.Cwl.ERROR_WINDOW_ID,
			title : chi.Dict.translate("Error occured"),
			layout : "fit",
			items : [ new Ext.Panel( {
				html : "<p class='cwl-errorDialogMessage'>" + chi.Dict.translate("An application error occured. You may continue your work, but this might lead to further errors. If you choose to restart, your data will be saved.") + "</p>"
			}), new Ext.Panel( {
				id : cwl.Cwl.ERROR_DETAILS_ID,
				title : chi.Dict.translate("Error details"),
				collapsed : true,
				collapsible : true,
				animCollapse : false,
				collapseFirst : true,
				html : "<div class='cwl-errorDialogDetails'>" + html + "</div>",
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

cwl.Cwl.prototype.installOverrides = function() {
	Ext.override(Ext.form.Field, {
		loadValue : function(value) {
			this.setValue(value);
			this.originalValue = this.getValue();
		}
	});
	
	Ext.apply(Ext.EventObject, {
		within : navigator.userAgent.match(/firefox\/((\d+\.)+\d+)/i) && navigator.userAgent.match(/firefox\/((\d+\.)+\d+)/i)[1] >= 3.5 ? function(el, related, allowEl) {
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

cwl.Cwl.getInstance = function() {
	if (!cwl.Cwl.instance) {
		cwl.Cwl.instance = new cwl.Cwl();
	}
	
	return cwl.Cwl.instance;
}

cwl.Cwl.ERROR_WINDOW_ID = "errorWindowId";
cwl.Cwl.ERROR_DETAILS_ID = "errorDetailsId";



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
  if (["Model", "Package", "ChiBusinessUseCase"].indexOf(element.type) != -1) {
    var e = new cwl.model.ModelPackage();
  }
  else {
    var e = new cwl.model.ModelElement();
  }

  e.cwlModelElementId = element.id || Ext.id();
  e.name = element.name;
  e.type = element.type;
  e.description = element.description;
  e.helpUrl = element.helpUrl;
  e.treeIconClass = element.treeIconClass;
  e.semanticGroup = element.semanticGroup;
    
  var parent = null;
  if (element.parentId) {
    parent = container.getElement(element.parentId);
    parent.add(e);
  }

  container.registerElement(e);

  return e;
}