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
		
		// this is the default property panel that is used for the
		// translation into the primary language
		this.mainPanel = new Ext.Panel({
			layout: "fit",
			region: "center",
			width: 250,
			title: uwm.Dict.translate('Properties'),
			tools:[{
				id: 'gear',
				enableToggle: true,
				qtip: uwm.Dict.translate('Translate'),
				handler: function(event, toolEl, panel) {
					if (!self.isTranslationPanelOpen) {
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
		this.translationPanel = new Ext.Panel({
			layout: "fit",
			region: "west",
			width: 250,
			hidden: true,
			title: uwm.Dict.translate('Translation')
		});
		
		this.propertyPanel = new Ext.Panel({
			region: "center",
			layout: "border",
			border: false,
			items: [this.mainPanel, this.translationPanel]
		});
	
		Ext.apply(this, {
			region: "center",
			layout: "border",
			border: false,
			collapsible: false,
			split: false,
			width: 250,
			autoScroll: true,
			title: uwm.Dict.translate('Properties'),
			headerAsText: false,
			items: [this.propertyPanel]
		})
		
		uwm.property.PropertyContainer.instance = this;
		
		uwm.property.PropertyContainer.superclass.initComponent.apply(this, arguments);
		
		this.currentOid = null;
		this.isLockedByOtherUser = null;
		this.isTranslationPanelOpen = false;
		
		this.on("afterlayout", this.showInfoMask);
		this.on("resize", this.doResize);
		
		uwm.event.EventBroker.getInstance().addListener({
			"delete": function(modelObject) {
				self.handleDeleteEvent(modelObject);
			}
		});
	}
})

uwm.property.PropertyContainer.prototype.showInfoMask = function() {
/*
	while (this.mainPanel.items && this.mainPanel.items.getCount() > 0) {
    // ignore any errors happening while removing the panel items
    // (e.g. HTMLEditor can't save its value because the object is deleted already)
		try {
			this.remove(this.mainPanel.items.get(0), true);
		}
		catch (e) {}
	}
	*/
	this.mask = new uwm.ui.InfoMask(this.body, {
		msg: uwm.Dict.translate('This panel shows the properties of each object selected by a single click.')
	});
	this.mask.show();
	
	this.un("afterlayout", this.showInfoMask);
}

uwm.property.PropertyContainer.prototype.doResize = function() {
	var width = this.ownerCt.getWidth();
	if (this.isTranslationPanelOpen && width > 0) {
		this.mainPanel.setWidth(width/2);
		this.translationPanel.setWidth(width/2);
	}
}

uwm.property.PropertyContainer.prototype.showProperty = function(modelNode) {
	this.showPropertyInternal(modelNode, this.mainPanel);
}

uwm.property.PropertyContainer.prototype.showPropertyInternal = function(modelNode, panel) {
	if (modelNode != null) {
		var eastPanel = this.findParentByType(uwm.property.EastPanel);
		
		if (!eastPanel.isCollapsed()) {
			var oid = modelNode.getOid();
			
			if (oid != null && this.currentOid != oid) {
				if (this.mask) {
					this.mask.hide();
				}
				
				var oldOid = this.currentOid;
				
				this.currentOid = modelNode.getOid();
				
				var items = panel.items;
				while (items && items.getCount() > 0) {
					panel.remove(items.get(0), true);
				}
				
				var self = this;
				
				this.mask = new Ext.LoadMask(this.getEl());
				this.mask.show();
				
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
					self.displayForm();
				});
			}
		}
	}
}

uwm.property.PropertyContainer.prototype.setLocked = function(isLocked) {
	this.isLockedByOtherUser = isLocked;
}

uwm.property.PropertyContainer.prototype.displayForm = function() {

	var modelNode = uwm.model.ModelContainer.getInstance().getByOid(this.currentOid);
	var mainForm = this.mainPanel.add(modelNode.getModelNodeClass().getPropertyForm(modelNode, this.isLockedByOtherUser));
	var translationForm = this.translationPanel.insert(0, modelNode.getModelNodeClass().getPropertyForm(modelNode, this.isLockedByOtherUser));
	
	translationForm.add({
		xtype: 'fieldset',
		title: uwm.Dict.translate('Language'),
		autoHeight: true,
		autoWidth: true,
		items: new uwm.ui.LanguageListBox({
			hideLabel: true,
			width: 200,
			includeDefault: false
		})
	});
	
	this.doLayout();
	
	modelNode.populatePropertyForm(mainForm);
	
	this.mask.hide();
}

uwm.property.PropertyContainer.prototype.getCurrentOid = function() {
	return this.currentOid;
}

uwm.property.PropertyContainer.prototype.handleDeleteEvent = function(modelObject) {
	if (this.currentOid == modelObject.getOid()) {
		this.showInfoMask();
	}
}

/**
 * Open the translation panel
 */
uwm.property.PropertyContainer.prototype.openTranslationPanel = function() {
	var targetWidth = 500;
	
	var eastPanel = uwm.Uwm.getInstance().getActiveWorkbench().getEastPanel();
	var xDiff = targetWidth-eastPanel.getWidth();
	eastPanel.setWidth(targetWidth);
	eastPanel.setPosition(eastPanel.x-xDiff, eastPanel.y);
	eastPanel.ownerCt.doLayout();
	
	this.translationPanel.setWidth(targetWidth/2);
	this.mainPanel.setWidth(targetWidth/2);
	this.translationPanel.setVisible(true);

	this.isTranslationPanelOpen = true;
}

/**
 * Close the translation panel
 */
uwm.property.PropertyContainer.prototype.closeTranslationPanel = function() {
	var targetWidth = 250;
	
	var eastPanel = uwm.Uwm.getInstance().getActiveWorkbench().getEastPanel();
	var xDiff = targetWidth-eastPanel.getWidth();
	eastPanel.setWidth(targetWidth);
	eastPanel.setPosition(eastPanel.x-xDiff, eastPanel.y);	
	eastPanel.ownerCt.doLayout();
	
	this.mainPanel.setWidth(targetWidth);
	this.translationPanel.setWidth(0);
	this.translationPanel.setVisible(false);

	this.isTranslationPanelOpen = false;
}

uwm.property.PropertyContainer.getInstance = function() {
	return uwm.Uwm.getInstance().getActiveWorkbench().getEastPanel().getPropertyContainer();
}