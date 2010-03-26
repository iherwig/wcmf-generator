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
Ext.namespace("uwm.ui");

/**
 * @class The login form.
 * 
 * @extends Ext.Viewport
 * @constructor
 * @param {Object} config The configuration object.
 */
uwm.ui.Login = function(config){
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
			
			items: [
						/*
						 * new Ext.BoxComponent({ autoEl: { tag: "div", cls:
						 * "cwm-logo-container", children: [{ tag: "h1", html:
						 * "Chronos Web Modeler" }, { tag: "div" }, { tag: "a",
						 * target: "_blank", href:
						 * "http://sourceforge.net/projects/olympos/", html:
						 * "http://sourceforge.net/projects/olympos/" }] } }),
						 */
				new Ext.form.TextField({
						fieldLabel: uwm.Dict.translate('Login'),
						name: 'login',
						allowBlank: false,
						value: uwm.Config.defaultLogin
				}), new Ext.form.TextField({
						fieldLabel: uwm.Dict.translate('Password'),
						name: 'password',
						inputType: "password",
						allowBlank: false,
						value: uwm.Config.defaultPassword
				}),
				new uwm.i18n.LanguageListBox({
					languages: uwm.i18n.Localization.getInstance().getAllUserInterfaceLanguages(),
				}), 
				new Ext.Panel({
							cls: "uwm-revisioninfo",
							html: "<p>" + uwm.Dict.translate("Revision") + ": " + uwm.Constants.SVN_REVISION + "</p>"
						})
			],
			buttons: [{
				text: uwm.Dict.translate('Login'),
				type: 'submit',
				handler: function(btn){
						btn.disable();
						self.initSession();
				}
			}]
		});
		
		if (!Ext.isGecko3 && !Ext.isChrome) {
		this.form.add(new Ext.Panel({
			cls: "uwm-browserWarning",
				html: "<div>" +
						"<p class='nonLast'><b>Attention:</b> You're using an unsupported browser. If you continue, the application may behave strangely or work not at all.</p>" +
						"<p>Currently, the supported browser is Firefox 3.</p>" +
						"</div>"
			}));
		}

		uwm.ui.Login.superclass.constructor.call(this, Ext.apply(this, {
				id: "loginViewport",
				layout: "absolute",
				items: [this.form]
		}, config));
	}

	Ext.extend(uwm.ui.Login, Ext.Viewport);

	uwm.ui.Login.prototype.render = function(){
		uwm.ui.Login.superclass.render.apply(this, arguments);
		
		var viewportSize = this.getSize();
		var formSize = this.form.getSize();
		
		var x = viewportSize.width / 2 - formSize.width / 2;
		var y = viewportSize.height / 2 - formSize.height / 2;
		
		this.form.setPosition(x, y);
		this.form.getForm().findField("login").focus();
	}

	uwm.ui.Login.prototype.initSession = function(){
		if (this.form.getForm().isValid()) {
				var self = this;
				
				uwm.persistency.Persistency.getInstance().doLogin(this.form.getForm().findField("login").getValue(), 
					this.form.getForm().findField("password").getValue(), function(options, data) {
						self.handleLogin(options, data);
				}, function(options, data, errorMsg){
						self.handleLoginFailure(options, data, errorMsg);
				});
		}
	}

	uwm.ui.Login.prototype.handleLogin = function(options, data){
		var lang = uwm.i18n.Localization.getInstance().getDefaultModelLanguage();
		var languageField = this.form.getForm().findField("Language");
		if (languageField) {
			lang = this.form.getForm().findField("Language").getValue();
		}
		uwm.Uwm.getInstance().startSession(data.sid, lang);
	}

	uwm.ui.Login.prototype.handleLoginFailure = function(options, data, errorMsg){
		uwm.Util.showMessage("Login Failed", data.errorMsg, uwm.Util.messageType.ERROR);
		
		var passwordField = this.form.getForm().findField("password");
		
		passwordField.setValue("");
		passwordField.focus();
	}
