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
	initComponent : function() {
		Ext.apply(this, {
			region :"center",
			layout :"fit",
			collapsible :false,
			split :false,
			width :250,
			autoScroll :true,
			title :uwm.Dict.translate('Properties')
		})

		uwm.property.PropertyContainer.instance = this;

		uwm.property.PropertyContainer.superclass.initComponent.apply(this,
				arguments);

		this.currentOid = null;
		this.isLockedByOtherUser = null;

		this.on("afterlayout", this.showInfoMask);
	}
})

uwm.property.PropertyContainer.prototype.showInfoMask = function() {
	this.mask = new uwm.ui.InfoMask(
			this.body,
			{
				msg :uwm.Dict
						.translate('This panel shows the properties of each object selected by a single click.')
			});
	this.mask.show();

	this.un("afterlayout", this.showInfoMask);
}

uwm.property.PropertyContainer.prototype.showProperty = function(modelNode) {
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

				var items = this.items;
				while (items && items.getCount() > 0) {
					this.remove(items.get(0), true);
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

				uwm.model.ModelContainer.getInstance().loadByOid(
						this.currentOid, actionSet);

				actionSet.commit( function() {
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

	var modelNode = uwm.model.ModelContainer.getInstance().getByOid(
			this.currentOid);

	var form = this.add(modelNode.getModelNodeClass().getPropertyForm(
			modelNode, this.isLockedByOtherUser));

	this.doLayout();

	modelNode.populatePropertyForm(form);

	this.mask.hide();
}

uwm.property.PropertyContainer.getInstance = function() {
	return uwm.Uwm.getInstance().getActiveWorkbench().getEastPanel()
			.getPropertyContainer();
}
