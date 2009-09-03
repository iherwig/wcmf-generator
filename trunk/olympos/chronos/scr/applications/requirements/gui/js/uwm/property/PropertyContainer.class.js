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
Ext.namespace("uwm.property");

/**
 * Container managing display/removal of properties as well as locking/unlocking
 * of shown ModelNodes.
 *
 * @extends Ext.Panel
 * @constructor
 * @param {Object}
 *            config The configuration object.
 */
uwm.property.PropertyContainer = function() {
}

uwm.property.PropertyContainer = Ext.extend(Ext.Panel, {
	initComponent: function() {
	
		var self = this;
		var loc = uwm.i18n.Localization.getInstance();
		this.language = loc.getModelLanguage();
		
		// this is the default property panel that is used for the
		// translation into the primary language
		this.mainPanel = new Ext.Panel({
			layout: "fit",
			region: "center",
			width: 250,
			autoScroll: false,
			autoHeight: true,
			border: false,
			title: self.getTitleText(),
			tools:[{
				id: 'gear',
				enableToggle: true,
				qtip: uwm.Dict.translate('Translate'),
				handler: function(event, toolEl, panel) {
					if (!self.isTranslationPanelOpen()) {
						self.openTranslationPanel();
					}
					else {
						self.closeTranslationPanel();
					}
				}
			}]
		});
		// this is the additional property panel that is used for the
		// translation into the secondary language. it is initially closed.
		this.translationPanel = new uwm.i18n.TranslationPanel({
			layout: "fit",
			region: "west",
			width: 250,
			autoScroll: false,
			autoHeight: true,
			border: false,
			/* add a separation to the next panel */
			style: "border-right:1px solid #99BBE8;",
			hidden: true
		});

		Ext.apply(this, {
			region: "center",
			layout: "border",
			border: false,
			collapsible: false,
			split: true,
			width: 250,
			autoScroll: true,
			header: false,
			items: [this.mainPanel, this.translationPanel]
		})
		
		uwm.property.PropertyContainer.instance = this;
		
		uwm.property.PropertyContainer.superclass.initComponent.apply(this, arguments);
		
		this.currentOid = null;
		this.isLockedByOtherUser = null;
		this.form = null;
		
		this.on("afterlayout", this.showInfoMask);
		this.on("resize", this.doResize);
		
		uwm.event.EventBroker.getInstance().addListener({
			"changeLabel": function(modelObject, oldLabel) {
				self.handleChangeLabelEvent(modelObject, oldLabel);
			},
			"create": function(modelObject) {
				self.handleCreateEvent(modelObject);
			},
			"delete": function(modelObject) {
				self.handleDeleteEvent(modelObject);
			}
		});
	}
})

uwm.property.PropertyContainer.prototype.showInfoMask = function() {
	this.hideForm(this.mainPanel);
	this.hideForm(this.translationPanel);
	
	this.mask = new uwm.ui.InfoMask(this.body, {
		msg: uwm.Dict.translate('This panel shows the properties of each object selected by a single click.')
	});
	this.mask.show();
	
	this.un("afterlayout", this.showInfoMask);
}

uwm.property.PropertyContainer.prototype.showLoadMask = function() {
	this.mask = new Ext.LoadMask(this.getEl());
	this.mask.show();
}

uwm.property.PropertyContainer.prototype.hideMask = function() {
	if (this.mask) {
		this.mask.hide();
	}
}

uwm.property.PropertyContainer.prototype.doResize = function() {
	var width = this.ownerCt.getWidth();
	if (this.isTranslationPanelOpen() && width > 0) {
		this.mainPanel.setWidth(width/2);
		this.translationPanel.setWidth(width/2);
	}
	else {
		this.mainPanel.setWidth(width);
	}
}

uwm.property.PropertyContainer.prototype.showProperty = function(modelNode) {
	if (modelNode != null) {
		var eastPanel = this.findParentByType(uwm.property.EastPanel);
		
		if (!eastPanel.collapsed) {
			var oid = modelNode.getOid();
			
			if (oid != null && this.currentOid != oid) {
				this.hideMask();
				
				var oldOid = this.currentOid;
				this.currentOid = modelNode.getOid();

				this.hideForm(this.mainPanel);
				this.hideForm(this.translationPanel);
				this.showLoadMask();
				
				var self = this;
				
				var actionSet = new uwm.persistency.ActionSet();
				
				if (oldOid) {
					actionSet.addUnlock(oldOid);
				}
				
				actionSet.addLock(this.currentOid, function(request, data) {
					self.setLocked(false);
				}, function(request, data) {
					self.setLocked(true);
				});
				
				uwm.model.ModelContainer.getInstance().loadByOid(this.currentOid, actionSet);
				
				actionSet.commit(function() {
					self.handleLoadFinished();
				});
			}
		}
	}
}

uwm.property.PropertyContainer.prototype.setLocked = function(isLocked) {
	this.isLockedByOtherUser = isLocked;
}

uwm.property.PropertyContainer.prototype.handleLoadFinished = function() {
	if (this.isTranslationPanelOpen()) {
		this.translationPanel.showTranslation(this.currentOid, 
			this.translationPanel.getLanguage(),
			this.isLockedByOtherUser,
			this.displayForm.createDelegate(this)
		);
	}
	else {
		this.displayForm();
	}
}

uwm.property.PropertyContainer.prototype.displayForm = function() {

	var modelNode = uwm.model.ModelContainer.getInstance().getByOid(this.currentOid);
	this.form = modelNode.getModelNodeClass().getPropertyForm(modelNode, this.isLockedByOtherUser);
	this.form.localizeControls(uwm.i18n.Localization.getInstance().getModelLanguage());
	this.mainPanel.add(this.form);
	this.doLayout();
	
	modelNode.populatePropertyForm(this.form);
	
	if (this.isTranslationPanelOpen()) {
		this.lockControls();
	}

	this.hideMask();
}

uwm.property.PropertyContainer.prototype.hideForm = function(panel) {

	var items = panel.items;
	while (items && items.getCount() > 0) {
		panel.remove(items.get(0), true);
	}
}

uwm.property.PropertyContainer.prototype.getCurrentOid = function() {
	return this.currentOid;
}

uwm.property.PropertyContainer.prototype.handleChangeLabelEvent = function(modelObject, oldLabel) {
	this.purgeStore(modelObject);
}

uwm.property.PropertyContainer.prototype.handleCreateEvent = function(modelObject) {
	this.purgeStore(modelObject);
}

uwm.property.PropertyContainer.prototype.handleDeleteEvent = function(modelObject) {
	if (modelObject) {
		if (this.currentOid == modelObject.getOid()) {
			this.showInfoMask();
		}
		this.purgeStore(modelObject);
	}
}

uwm.property.PropertyContainer.prototype.lockControls = function() {
	if (this.form != null) {
		for (var i=0; i<this.form.items.getCount(); i++) {
			this.form.items.get(i).setDisabled(true);
		}
	}
}

uwm.property.PropertyContainer.prototype.unlockControls = function() {
	if (this.form != null) {
		for (var i=0; i<this.form.items.getCount(); i++) {
			this.form.items.get(i).setDisabled(false);
		}
	}
}

uwm.property.PropertyContainer.prototype.findControlByListType = function(name) {
	if (this.form != null) {
		for (var i=0; i<this.form.items.getCount(); i++) {
			var curItem = this.form.items.get(i);
			if (curItem.listType == name) {
				return curItem;
			}
		}
	}
  return null;
}

uwm.property.PropertyContainer.prototype.purgeStore = function(modelObject) {
	if (modelObject) {
		var control = this.findControlByListType(modelObject.getUwmClassName());
		if (control && control instanceof uwm.property.ComboBox && control.getStore()) {
			control.getStore().reload();
		}
	}
}

uwm.property.PropertyContainer.prototype.getTitleText = function() {
	var loc = uwm.i18n.Localization.getInstance();
	var languageName = loc.getLanguageName(this.language, loc.getAllModelLanguages());
	return uwm.Dict.translate('Properties')+" ["+languageName+"]";
}

/**
 * Open the translation panel
 */
uwm.property.PropertyContainer.prototype.openTranslationPanel = function() {
	var targetWidth = 500;
	
	this.lockControls();

	// move splitbar
	var eastPanel = uwm.Uwm.getInstance().getActiveWorkbench().getEastPanel();
	eastPanel.setWidth(targetWidth);
	eastPanel.ownerCt.doLayout();

	// show translation panel
	this.translationPanel.setVisible(true);
	
	// load the translation
	this.showLoadMask();
	this.translationPanel.showTranslation(this.currentOid, 
		this.translationPanel.getLanguage(),
		this.isLockedByOtherUser,
		this.hideMask.createDelegate(this)
	);
}

/**
 * Close the translation panel
 */
uwm.property.PropertyContainer.prototype.closeTranslationPanel = function() {
	var targetWidth = 250;

	this.unlockControls();

	// hide translation panel and form
	this.translationPanel.setVisible(false);
	this.hideForm(this.translationPanel);

	// move splitbar
	var eastPanel = uwm.Uwm.getInstance().getActiveWorkbench().getEastPanel();
	eastPanel.setWidth(targetWidth);
	eastPanel.ownerCt.doLayout();
}

uwm.property.PropertyContainer.prototype.isTranslationPanelOpen = function() {
	return this.translationPanel.isVisible();
}

uwm.property.PropertyContainer.getInstance = function() {
	return uwm.Uwm.getInstance().getActiveWorkbench().getPropertyContainer();
}