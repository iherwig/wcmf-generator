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
 * @class The main Workbench (perspective).
 * 
 * @extends uwm.ui.AbstractWorkbench
 * @constructor
 * @param {Object} config The configuration object.
 */
uwm.ui.Workbench = function(config) {

	uwm.ui.Workbench.superclass.constructor.call(this, Ext.apply(this, {
		items: [{
			region: "west",
			title: uwm.Dict.translate('Available Content'),
			collapsible: true,
			split: true,
			width: 260,
			layout: "fit",
			id: "contentContainer",
			items: new Ext.Panel({
				layout: "border",
				items: [this.accordion=new uwm.newobjects.Accordion(), new uwm.ui.ExistingContentContainer({
					Accordion: this.accordion
				})]
			})
		}, this.getEastPanel(), uwm.diagram.DiagramContainer.getInstance().getTabPanel()]
	}, config));
}

Ext.extend(uwm.ui.Workbench, uwm.ui.AbstractWorkbench);

/*
 * @see uwm.ui.AbstractWorkbench.getHightLight()
 */
uwm.ui.Workbench.prototype.getHightLight = function() {
	return "default";
}
