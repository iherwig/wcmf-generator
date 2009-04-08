/*
 * Copyright (c) 2008 The Olympos Development Team.
 * 
 * http://sourceforge.net/projects/olympos/
 * 
 * All rights reserved. This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License v1.0 which
 * accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html. If redistributing this code, this
 * entire header must remain intact.
 */
Ext.namespace("cwb.ui");

/**
 * @class The login form.
 * 
 * @extends Ext.Viewport
 * @constructor
 * @param {Object}
 *            config The configuration object.
 */
cwb.ui.Login = function(config){
    var self = this;
    
    this.form = new Ext.FormPanel({
        labelWidth: 100,
        frame: true,
        title: 'Login',
        bodyStyle: 'padding:5px 5px 0',
        width: 375,
        defaults: {
            width: 230
        },
        keys: [{
            key: [10, 13],
            handler: function(){
                self.initSession();
            }
        }],
        
        items: [        /*
						 * new Ext.BoxComponent({ autoEl: { tag: "div", cls:
						 * "cwm-logo-container", children: [{ tag: "h1", html:
						 * "Chronos Web Modeler" }, { tag: "div" }, { tag: "a",
						 * target: "_blank", href:
						 * "http://sourceforge.net/projects/olympos/", html:
						 * "http://sourceforge.net/projects/olympos/" }] } }),
						 */
        new Ext.form.TextField({
            fieldLabel: cwb.Dict.translate('Login'),
            name: 'login',
            allowBlank: false,
            value: cwb.Config.defaultLogin
        }), new Ext.form.TextField({
            fieldLabel: cwb.Dict.translate('Password'),
            name: 'password',
            inputType: "password",
            allowBlank: false,
            value: cwb.Config.defaultPassword
        }), new Ext.form.ComboBox({
            fieldLabel: cwb.Dict.translate('Language'),
            forceSelection: 'true',
            value: 'en',
            name: 'Language',
            store: new Ext.data.SimpleStore({
                fields: [{
                    name: "key",
                    mapping: "key"
                }, {
                    name: "val",
                    mapping: "val"
                }],
                data: [
					{
						key: "en",
						val: "English"
					},
					{
						key: "de",
						val: "Deutsch"
					}
				]
            }),
            displayField: 'val',
            valueField: 'key',
            mode: "local",
            triggerAction: 'all',
            editable: false,
        
        })],
         buttons: [{
            text: cwb.Dict.translate('Login'),
            type: 'submit',
            handler: function(){
                self.initSession();
            }
        }]
    });
    
    if (!Ext.isGecko3) {
		this.form.add(new Ext.Panel({
			cls: "cwb-browserWarning",
	    	html: "<div>" +
	    			"<p class='nonLast'><b>Attention:</b> You're using an unsupported browser. If you continue, the application may behave strangely or work not at all.</p>" +
	    			"<p>Currently, the supported browser is Firefox 3.</p>" +
	    			"</div>"
	    }));
    }

    cwb.ui.Login.superclass.constructor.call(this, Ext.apply(this, {
        id: "loginViewport",
        layout: "absolute",
        items: [this.form]
    }, config));
}

Ext.extend(cwb.ui.Login, Ext.Viewport);

cwb.ui.Login.prototype.render = function(){
    cwb.ui.Login.superclass.render.apply(this, arguments);
    
    var viewportSize = this.getSize();
    var formSize = this.form.getSize();
    
    var x = viewportSize.width / 2 - formSize.width / 2;
    var y = viewportSize.height / 2 - formSize.height / 2;
    
    this.form.setPosition(x, y);
    this.form.getForm().findField("login").focus();
}

cwb.ui.Login.prototype.initSession = function(){
    if (this.form.getForm().isValid()) {
        var self = this;
        
        cwb.persistency.Persistency.getInstance().doLogin(this.form.getForm().findField("login").getValue(), this.form.getForm().findField("password").getValue(), function(options, data){
            self.handleLogin(options, data);
        }, function(options, data, errorMsg){
            self.handleLoginFailure(options, data, errorMsg);
        });
    }
}

cwb.ui.Login.prototype.handleLogin = function(options, data){
    cwb.Cwb.getInstance().startSession(data.sid, this.form.getForm().findField("Language").getValue());
}

cwb.ui.Login.prototype.handleLoginFailure = function(options, data, errorMsg){
    cwb.Util.showMessage("Login Failed", data.errorMsg, cwb.Util.messageType.ERROR);
    
    var passwordField = this.form.getForm().findField("password");
    
    passwordField.setValue("");
    passwordField.focus();
}
