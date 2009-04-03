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
 * @class The window which shows an export assistent and allows export operations.
 *
 * @extends Ext.window
 * @constructor
 * @param object The object for which the export shall be shown.
 */

uwm.ui.ExportAssistent = function(object) {
	uwm.ui.ExportAssistent.superclass.constructor.call(this, Ext.apply(this, {
		height: 350,
		width: 550,
		title: uwm.Dict.translate('Export Assistant'),
}));
	
	this.addButton(new Ext.Button({
		window: this,
		text: uwm.Dict.translate('Export'),
		handler: function(){alert('function under construction');}
	}));
	this.addButton(new Ext.Button({
		window: this,
		text: uwm.Dict.translate('Cancel'),
		handler: function() {
			this.window.close();
		}
	}));

	this.setVisible(true);
	
}
Ext.extend(uwm.ui.ExportAssistent, Ext.Window);

uwm.ui.ExportAssistent.prototype.restoreError = function(options, data, errorMsg, callback, scope, arg) {
	this.fireEvent("loadexception", this, options, data);
	callback.call(scope, null, arg, false);
}

uwm.ui.ExportAssistent.prototype.restoreSuccess = function(options, data, object) {
	Ext.MessageBox.alert('Success', uwm.Dict.translate('Export successfully.'));
}
