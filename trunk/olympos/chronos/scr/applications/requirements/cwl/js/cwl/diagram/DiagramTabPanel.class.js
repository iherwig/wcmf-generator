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
Ext.namespace("cwl.diagram");

/*
 * Note: The extension mechanism used for this class differs from all other's
 * extension mechanism. The mechanism used elsewhere led to errors in this component.
 */
/**
 * @class The tab panel of center view.
 *
 * @extends Ext.TabPanel
 * @constructor
 * @param {Object} config Configuration of this TabPanel.
 * @config diagramContainer The DigramContainer object.
 */
cwl.diagram.DiagramTabPanel = function() {
}
cwl.diagram.DiagramTabPanel = Ext.extend(Ext.TabPanel, {
	initComponent: function() {
		Ext.apply(this, {
			//region: "center",
			xtype: "tabpanel",
			enableTabScroll: true,
			activeTab: 0,
			id: cwl.diagram.DiagramTabPanel.COMPONENT_ID/*,
			items: uwm.ui.HelpViewer.getInstance()*/
		})
		
		cwl.diagram.DiagramTabPanel.superclass.initComponent.apply(this, arguments);
	}
});

/**
 * Component ID of DiagramTabPanel.
 *
 * @private
 * @type String
 */
cwl.diagram.DiagramTabPanel.COMPONENT_ID = "cwl.diagram.DiagramTablPanel.ID";
