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
Ext.namespace("chi.ui");

/**
 * @class A window that runs a {chi.persistency.LongTask}.
 * 
 * @extends Ext.Window
 * @constructor
 * @param {Object} config The configuration object.
 * @config title The window title
 * @config showText True if the text returned from the backend should be displayed on the progress
 *              bar, false, if no text should be displayed
 * @config autoAnimate True if the text returned from the backend should be displayed on the progress
 *              bar, false, if no text should be displayed
 * @config canCancel True if the process can be cancelled, false, if not
 * @config call A function with parameters successHandler and errorHandler (these will be used by LongTask)
 *              Typically a call to a Persistency method. See also {LongTask}.
 * @config progressHandler The function to call on each processing step.
 *          Parameters: data The data returned from the last server call
 * @config successHandler The function to call after the LongTask finished
 *          Parameters: data The data returned from the last server call
 * @config errorHandler The function to call when an error occurs
 *          Parameters: data The data returned from the last server call
 * @config isReturningDocument Boolean, true if the last call returns a document to be downloaded
 */
chi.ui.LongTaskRunner = function(config) {
	var self = this;
	this.iFrameId = Ext.id();
	this.showText = config.showText;
	this.autoAnimate = config.autoAnimate;
	this.canCanel = config.canCancel;
	
	this.pbar = new Ext.ProgressBar({
		text: this.showText ? chi.Dict.translate('Initializing ...') : '',
		id: 'pbar',
		cls: 'left-align',
		height: 20,
		anchor: '100%'
	});
	if (this.autoAnimate) {
		this.pbar.wait();
	}
	
	this.okButton = new Ext.Button({
		text: chi.Dict.translate("Cancel"),
		//disabled: true,
		handler: function() {
			self.destroy();
		}
	});
	if (!this.canCancel) {
		this.okButton.disable();
	}
	
	this.iFrame = new Ext.Panel({
		html: '<iframe id="'+this.iFrameId+'" src=""></iframe>' 
	});
	this.iFrame.setVisible(false);
	
	chi.ui.LongTaskRunner.superclass.constructor.call(this, Ext.apply(this, {
		layout: 'anchor',
		width:320,
		height:87,
		items: [this.pbar, 
			this.iFrame
		],
		buttons: [this.okButton],
		bodyBorder: false,
		border: false,
		closable: false,
		resizable: false,
		modal: true
	}, config));
	
	// setup the LongTask when the window shows
	this.on("render", function() {
		window.setTimeout(function() {
			if (!self.autoAnimate) {
				self.pbar.reset();
			}
			
			// create the LongTask instance that runs the action defined in the
			// call paremeter and run it
			var iFrameId = null;
			if (self.isReturningDocument)
				iFrameId = self.iFrameId;
			var task = new chi.persistency.LongTask(self.call, iFrameId);
			task.run.defer(10, task, [
				// process handler (updates the progress bar)
				function(text, i, total, data) {
					if (!self.autoAnimate) {
						self.pbar.updateProgress(i/total);
					}
					if (self.showText) {
						self.pbar.updateText(text);
					}
					if (self.progressHandler instanceof Function) {
						self.progressHandler(data);
					}
				}, 
				// success handler (calls the success handler defined in the successHandler parameter)
				function(data) {
					if (self.showText) {
						self.pbar.updateText(chi.Dict.translate("Finished"));
					}
					self.pbar.updateProgress(1);
					self.okButton.setText(chi.Dict.translate("Close"));
					if (data.summaryText && data.summaryText != "") {
						self.add(new Ext.Panel({
							html: "<div class='uwm-errorDialogDetails'>" + 
								data.summaryText.replace(/\n/g, "<br>") + 
								"</div>",
							autoScroll: true,
							height:100,
							anchor:'100%'
						}));
						self.setHeight(100+self.height);
						self.doLayout();
					}
					self.okButton.enable();
					if (self.successHandler instanceof Function) {
						self.successHandler(data);
					}
				}, 
				// error handler (calls the error handler defined in the errorHandler parameter)
				function(data) {
					self.okButton.setText(chi.Dict.translate("Close"));
					self.okButton.enable();
					if (self.errorHandler instanceof Function) {
						self.errorHandler(data);
					}
				}
      ]);
		}, 250);
	});
};

/**
 * Close the popup window
 */
chi.ui.LongTaskRunner.prototype.close = function() {
	this.destroy();
};

Ext.extend(chi.ui.LongTaskRunner, Ext.Window);