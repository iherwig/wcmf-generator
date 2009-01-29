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

uwm.tabadmin.ImportPanel = Ext.extend(Ext.form.FormPanel, {
	initComponent: function() {
		var self = this;
	
		Ext.apply(this, {
			title: uwm.Dict.translate('Model Upload'),
			frame: true,
			fileUpload: true,
			items: [new Ext.form.FileUploadField({
				emptyText: uwm.Dict.translate('Select UML model'),
				allowBlank: false,
				fieldLabel: uwm.Dict.translate('File to upload'),
				name: "modelFile",
				anchor: "50%"
			}), new Ext.Button({
				text: uwm.Dict.translate('Send model'),
				handler: function() {
					self.sendForm();
				}
			})]
		});
		
		uwm.tabadmin.ImportPanel.superclass.initComponent.apply(this, arguments);
	}
});

uwm.tabadmin.ImportPanel.prototype.sendForm = function() {
	var self = this;
	
	if (this.getForm().isValid()) {
		this.getForm().submit({
			url: uwm.Session.getInstance().getJsonUrl(),
			params: {
				sid: uwm.Session.getInstance().getSid(),
				response_format: "JSON",
				usr_action: "importUWM"
			},
			waitMsg: uwm.Dict.translate('Sending the model ...'),
			success: function(form, action) {
				self.successHandler(form, action);
			},
			failure: function(form, action) {
				self.failureHandler(form, action);
			}
		});
	}
}

uwm.tabadmin.ImportPanel.prototype.successHandler = function(form, action) {
	var win = new Ext.Window({
		title: uwm.Dict.translate('Import successful'),
		layout: "fit",
		items: [new Ext.Panel({
			html: "<div class='uwm-dialogBox'><div>" + uwm.Dict.translate('Your import finished successfully. The application is going to restart.') + "</div></div>"
		})],
		buttons: [{
			text: uwm.Dict.translate('OK'),
			handler: function() {
				uwm.Uwm.getInstance().reload();
			}
		}]
	});
	
	win.show();
}

uwm.tabadmin.ImportPanel.prototype.failureHandler = function(form, action) {
	var win = new Ext.Window({
		title: uwm.Dict.translate('Import failed'),
		layout: "fit",
		items: [new Ext.Panel({
			html: "<div class='uwm-dialogBox'><div>" + uwm.Dict.translate('Your import failed. See below for errors.') + "</div><div>" + action.result.errorMsg + "</div></div>"
		})],
		buttons: [{
			text: uwm.Dict.translate('OK'),
			handler: function() {
				win.destroy();
			}
		}]
	});
	
	win.show();
}
