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
Ext.namespace("chi");

/**
 * @class The login form.
 * 
 * @extends Ext.Viewport
 * @constructor
 * @param {Object}
 *            config The configuration object.
 */
chi.Login = function(config) {
	var self = this;
	this.appInstance = config.appInstance;
	var appConfig = chi.Config.getInstance();

	/**
	 * The form showing user, password, language selection and revision.
	 * 
	 * @type Ext.FormPanel
	 */
	this.form = new Ext.FormPanel( {
	    labelWidth : 100,
	    frame : true,
	    title : 'Login',
	    bodyStyle : 'padding:5px 5px 0',
	    width : 375,
	    defaults : {
		    width : 230
	    },
	    keys : [ {
	        key : [ 10, 13 ],
	        handler : function() {
		        self.initSession();
	        }
	    } ],

	    items : [ new Ext.form.TextField( {
	        fieldLabel : chi.Dict.translate('Login'),
	        name : 'login',
	        allowBlank : false,
	        value : appConfig.defaultLogin
	    }), new Ext.form.TextField( {
	        fieldLabel : chi.Dict.translate('Password'),
	        name : 'password',
	        inputType : "password",
	        allowBlank : false,
	        value : appConfig.defaultPassword
	    }), new Ext.form.ComboBox( {
	        fieldLabel : chi.Dict.translate('Language'),
	        forceSelection : 'true',
	        value : 'en',
	        name : 'Language',
	        store : new Ext.data.SimpleStore( {
	            fields : [ {
	                name : "key",
	                mapping : "key"
	            }, {
	                name : "val",
	                mapping : "val"
	            } ],
	            data : [ {
	                key : "en",
	                val : "English"
	            }, {
	                key : "de",
	                val : "Deutsch"
	            } ]
	        }),
	        displayField : 'val',
	        valueField : 'key',
	        mode : "local",
	        triggerAction : 'all',
	        editable : false

	    }), new Ext.Panel( {
	        cls : "chi-revisioninfo",
	        html : "<p>" + chi.Dict.translate("Revision") + ": " + appConfig.svnRevision + "</p>"
	    }) ],
	    buttons : [ {
	        text : chi.Dict.translate('Login'),
	        type : 'submit',
	        handler : function() {
		        self.initSession();
	        }
	    } ]
	});

	if (!Ext.isGecko3 && !Ext.isChrome) {
		this.form.add(new Ext.Panel( {
		    cls : "chi-browserWarning",
		    html : "<div>" + "<p class='nonLast'><b>Attention:</b> You're using an unsupported browser. If you continue, the application may behave strangely or work not at all.</p>"
		            + "<p>Currently, the supported browser is Firefox 3.</p>" + "</div>"
		}));
	}

	chi.Login.superclass.constructor.call(this, Ext.apply(this, {
	    id : "loginViewport",
	    layout : "absolute",
	    items : [ this.form ]
	}, config));
};

Ext.extend(chi.Login, Ext.Viewport);

/**
 * Positions the window at the center of the screen.
 * 
 * <p>
 * This is done only once, so no refresh on viewport resize.
 * </p>
 */
chi.Login.prototype.render = function() {
	chi.Login.superclass.render.apply(this, arguments);

	var viewportSize = this.getSize();
	var formSize = this.form.getSize();

	var x = viewportSize.width / 2 - formSize.width / 2;
	var y = viewportSize.height / 2 - formSize.height / 2;

	this.form.setPosition(x, y);
	this.form.getForm().findField("login").focus();
};

/**
 * Checks the form for validity and sends login command to backend.
 */
chi.Login.prototype.initSession = function() {
	if (this.form.getForm().isValid()) {
		var self = this;

		chi.persistency.Persistency.getInstance().login(this.form.getForm().findField("login").getValue(), this.form.getForm().findField("password").getValue(), function(data) {
			self.handleLogin(data);
		}, function(data, errorMsg) {
			self.handleLoginFailure(data, errorMsg);
		});
	}
};

/**
 * Starts session after successful login at backend.
 */
chi.Login.prototype.handleLogin = function(data) {
	this.appInstance.startSession(data.sid, this.form.getForm().findField("Language").getValue());
};

/**
 * On login failure, displays error message and resets password field.
 */
chi.Login.prototype.handleLoginFailure = function(data, errorMsg) {
	chi.Util.showMessage("Login Failed", errorMsg, chi.Util.messageType.ERROR);

	var passwordField = this.form.getForm().findField("password");

	passwordField.setValue("");
	passwordField.focus();
};
