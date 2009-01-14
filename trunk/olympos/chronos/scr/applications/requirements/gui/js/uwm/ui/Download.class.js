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

uwm.ui.Download = function(config) {
	uwm.ui.Download.superclass.constructor.call(this, Ext.apply(this, {
		layout: "fit",
		items: [new Ext.Panel({
			html: "<div class='x-mask-loading'><div>" + uwm.Dict.translate('Please wait while your download is prepared ...') + "</p><iframe class='uwm-download-frame' id='" + uwm.ui.Download.IFRAME_ID + "' src='" + config.downloadURL + "'/></div>"
		})]
	}, config));
	
	var self = this;
	
	this.on("render", function() {
		window.setTimeout(function() {
			var iframe = Ext.get(uwm.ui.Download.IFRAME_ID);
			iframe.on("load", function() {
				window.setTimeout(function() {
					self.destroy();
				}, 250);
			});
		}, 250);
	});
}

Ext.extend(uwm.ui.Download, Ext.Window);

uwm.ui.Download.IFRAME_ID = "DownloadIFrameID";
