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
 * @class Temporary replacement of tabs in Existing Content view by a dropdown menu.
 *
 * @extends Ext.Toolbar.MenuButton
 * @constructor
 * @param {Object} config The configuration object.
 */
uwm.ui.DropDown = function() {
}

uwm.ui.DropDown = Ext.extend(Ext.Toolbar.MenuButton, {

	initComponent: function() {
		var menue = new Ext.menu.Menu({});
		
		var groupArray = this.Accordion.getGroupArray();
		
		var subMenus = {};
		
		for (var i = 0; i < groupArray.length; i++) {
			subMenus[groupArray[i]] = {
				text: groupArray[i],
				menu: []
			};
		};
		
		for (var i = 0; i < this.existingContent.length; i++) {
			var belongsToGroup = false;
			var currContent = this.existingContent[i];
			if (currContent instanceof uwm.objectgrid.ObjectGrid) {
				var uwmClass = modelClass = uwm.model.ModelNodeClassContainer.getInstance().getClass(currContent.getUwmClassName());
				var semanticGroup = uwmClass.getSemanticGroup();
				
				for (j = 0; j < groupArray.length; j++) {
					if (semanticGroup == groupArray[j]) {
						subMenus[semanticGroup].menu.push({
							text: currContent.getName(),
							iconCls: currContent.getTreeIcon(),
							connectedPanel: currContent,
							handler: function(item) {
								item.connectedPanel.show();
							}
						});
					}
				}
			} else {
				menue.add({
					text: uwm.Dict.translate(currContent.getName()),
					iconCls: currContent.getTreeIcon(),
					connectedPanel: currContent,
					handler: function(item) {
						item.connectedPanel.show();
					}
				})
			}
		}
		
		for (var i in subMenus) {
			if (!(subMenus[i] instanceof Function)) {
				menue.add(subMenus[i]);
			}
		}
		
		Ext.apply(this, {
			text: uwm.Dict.translate("View"),
			menu: menue
		});
		
		uwm.ui.DropDown.superclass.initComponent.apply(this, arguments);
	}
});
