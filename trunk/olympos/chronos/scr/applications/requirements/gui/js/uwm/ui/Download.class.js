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
 * @class A window allowing downloading of files.
 * 
 * @extends Ext.Window
 * @constructor
 * @param {Object} config The configuration object.
 * @config downloadURL The URL to download from.
 */
uwm.ui.Download = function(config) {
	var self = this;
	
	this.okButton = new Ext.Button({
		text: uwm.Dict.translate("Close"),
		disabled: true,
		handler: function() {
			self.destroy();
		}
	});
	
	uwm.ui.Download.superclass.constructor.call(this, Ext.apply(this, {
		layout: "fit",
		items: [new Ext.Panel({
			html: "<div class='x-mask-loading'><div>" + uwm.Dict.translate('Please wait while your export is prepared ...') + "</div><iframe class='uwm-download-frame' id='" + uwm.ui.Download.IFRAME_ID + "' src='" + config.downloadURL + "'/></div>"
		})],
		buttons: [this.okButton],
		closable: false,
		resizable: false
	}, config));
	
	this.on("render", function() {
		window.setTimeout(function() {
			var iframe = Ext.get(uwm.ui.Download.IFRAME_ID);
			iframe.on("load", function() {
				window.setTimeout(function() {
					try {
						var result = Ext.util.JSON.decode(iframe.dom.contentDocument.body.innerHTML);
						
						if (!result.success) {
							uwm.Util.showMessage(uwm.Dict.translate("Error while exporting"), uwm.Dict.translate("The export was unsuccessful. Please try again."), uwm.Util.messageType.ERROR);
						}
					} catch (e) {
						//do nothing, successful download of a file
					}
					
					self.okButton.enable();
				}, 250);
			});
		}, 250);
	});
}

Ext.extend(uwm.ui.Download, Ext.Window);

uwm.ui.Download.IFRAME_ID = "DownloadIFrameID";
